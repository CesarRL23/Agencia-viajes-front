// services/roleService.ts
import axiosInstance from "@/utils/axiosInstance";

const API_URL = "/api/roles";

export interface Role {
  _id?: string;
  name: string;
  description: string;
}

export interface UserRole {
  _id?: string;
  userId: string;
  roleId: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  role?: {
    _id: string;
    name: string;
    description: string;
  };
}

// Obtener todos los roles
export const getRoles = async (): Promise<Role[]> => {
  try {
    const res = await axiosInstance.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw new Error('No se pudieron cargar los roles');
  }
};

// Obtener rol por ID
export const getRoleById = async (id: string): Promise<Role> => {
  try {
    const res = await axiosInstance.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el rol con ID ${id}:`, error);
    throw new Error(`No se pudo cargar el rol con ID ${id}`);
  }
};

// Crear nuevo rol
export const createRole = async (role: Role): Promise<Role> => {
  try {
    const res = await axiosInstance.post(API_URL, role);
    if (res.data) {
      console.log('Rol creado:', res.data);
      return res.data;
    }
    throw new Error('No se recibió respuesta del servidor');
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data);
    }
    console.error('Error al crear rol:', error);
    throw new Error('No se pudo crear el rol');
  }
};

// Actualizar rol
export const updateRole = async (id: string, role: Role): Promise<Role> => {
  try {
    const res = await axiosInstance.put(`${API_URL}/${id}`, role);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar el rol con ID ${id}:`, error);
    throw new Error(`No se pudo actualizar el rol con ID ${id}`);
  }
};

// Eliminar rol
export const deleteRole = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el rol con ID ${id}:`, error);
    throw new Error(`No se pudo eliminar el rol con ID ${id}`);
  }
};

// User-Role Management
const USER_ROLE_API_URL = "/api/user-role";

// Obtener todas las asignaciones de roles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const res = await axiosInstance.get(USER_ROLE_API_URL);
    return res.data;
  } catch (error) {
    console.error('Error al obtener asignaciones de roles:', error);
    throw new Error('No se pudieron cargar las asignaciones de roles');
  }
};

// Obtener asignación por ID
export const getUserRoleById = async (id: string): Promise<UserRole> => {
  try {
    const res = await axiosInstance.get(`${USER_ROLE_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener la asignación con ID ${id}:`, error);
    throw new Error(`No se pudo cargar la asignación con ID ${id}`);
  }
};

// Obtener roles por usuario
export const getRolesByUser = async (userId: string): Promise<UserRole[]> => {
  try {
    const res = await axiosInstance.get(`${USER_ROLE_API_URL}/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener roles del usuario ${userId}:`, error);
    throw new Error(`No se pudieron cargar los roles del usuario`);
  }
};

// Obtener usuarios por rol
export const getUsersByRole = async (roleId: string): Promise<UserRole[]> => {
  try {
    const res = await axiosInstance.get(`${USER_ROLE_API_URL}/role/${roleId}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener usuarios del rol ${roleId}:`, error);
    throw new Error(`No se pudieron cargar los usuarios del rol`);
  }
};

// Asignar rol a usuario
export const assignRoleToUser = async (userId: string, roleId: string): Promise<UserRole> => {
  try {
    const res = await axiosInstance.post(`${USER_ROLE_API_URL}/user/${userId}/role/${roleId}`);
    return res.data;
  } catch (error) {
    console.error(`Error al asignar rol ${roleId} al usuario ${userId}:`, error);
    throw new Error(`No se pudo asignar el rol al usuario`);
  }
};

// Remover asignación de rol
export const removeUserRole = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${USER_ROLE_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la asignación con ID ${id}:`, error);
    throw new Error(`No se pudo eliminar la asignación de rol`);
  }
};