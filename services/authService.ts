import { auth } from '@/config/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  OAuthProvider,
  UserCredential
} from 'firebase/auth';
import axiosInstance from '@/utils/axiosInstance';

export interface AuthResponse {
  uid: string;
  email: string;
  name: string;
  picture: string; // URL de la imagen del usuario
  provider: string;
  systemUserId: string;
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
// Agregar scopes específicos de GitHub
githubProvider.addScope('user');
githubProvider.addScope('user:email');
githubProvider.addScope('read:user');
const microsoftProvider = new OAuthProvider('microsoft.com');

// Agregar scopes necesarios
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Función auxiliar para verificar si estamos en el cliente
const isClient = typeof window !== 'undefined';

export const loginWithProvider = async (providerName: string): Promise<AuthResponse> => {
  if (!isClient) {
    throw new Error('Esta función solo puede ejecutarse en el cliente');
  }
  
  try {
    let provider;
    switch (providerName) {
      case 'google':
        provider = googleProvider;
        break;
      case 'github':
        provider = githubProvider;
        // Forzar re-autenticación para GitHub
        provider.setCustomParameters({
          prompt: 'select_account'
        });
        break;
      case 'microsoft':
        provider = microsoftProvider;
        break;
      default:
        throw new Error('Proveedor no soportado');
    }

    if (!auth) {
      throw new Error('Firebase Auth no está inicializado');
    }
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    // Verificar que tenemos todos los datos necesarios
    if (!result.user.email) {
      throw new Error('No se pudo obtener el email del usuario');
    }

    let userData = {
      name: result.user.displayName || result.user.email.split('@')[0],
      email: result.user.email,
      picture: result.user.photoURL || '',
      provider: providerName
    };

    
    try {
      // Llamar a tu backend con el token de Firebase
      const response = await axiosInstance.post<AuthResponse>('/api/auth/firebase-login', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Guardar datos completos
      const userDataComplete = {
        ...response.data,
        ...userData
      };

      localStorage.setItem('firebaseToken', token);
      localStorage.setItem('user', JSON.stringify(userDataComplete));

      return userDataComplete;
    } catch (backendError) {
      console.error('Error en el backend:', backendError);
      // Si falla el backend, al menos guardar los datos básicos
      localStorage.setItem('firebaseToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData as AuthResponse;
    }

  } catch (error: any) {
    console.error('Error detallado:', error);
    
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('La ventana de inicio de sesión se cerró');
    }
    
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('Este email ya está registrado con otro método de inicio de sesión');
    }
    
    if (error.code === 'auth/popup-blocked') {
      throw new Error('El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio');
    }

    throw new Error(error.message || 'Error al iniciar sesión');
  }
};
// =========================
// 🔐 Login con correo y contraseña (flujo backend)
// =========================

interface LoginResponse {
  message?: string;
  sessionId?: string;
  token?: string;
  user?: any;
}

// Paso 1: Enviar email y password al backend (genera código y sesión)
export const loginWithEmail = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      '/api/public/security/login',
      { email, password }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error en login:', error);
    throw new Error(error.response?.data?.message || 'Credenciales inválidas');
  }
};

// Paso 2: Validar el código 2FA recibido por correo
export const validate2FA = async (email: string, code2FA: string, sessionId: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      '/api/public/security/validate2fa',
      { email, code2FA, sessionId }
    );

    if (response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error: any) {
    console.error('Error en validación 2FA:', error);
    throw new Error(error.response?.data?.message || 'Código incorrecto o expirado');
  }
};



export const logout = async (): Promise<void> => {
  if (!isClient) {
    throw new Error('Esta función solo puede ejecutarse en el cliente');
  }

  try {
    await auth?.signOut();
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw new Error('Error al cerrar sesión');
  }
};

export const checkAuth = (): boolean => {
  if (!isClient) return false;
  const token = localStorage.getItem('firebaseToken');
  return !!token;
};

export const getCurrentUser = (): AuthResponse | null => {
  if (!isClient) return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};