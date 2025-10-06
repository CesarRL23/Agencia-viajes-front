// frontend/services/userService.ts
import axiosInstance from "@/utils/axiosInstance";
import { count } from "console";


const API_URL = "/api/users"; // Actualizado para coincidir con el backend

export interface User {
  role: string;
  active: boolean;
  _id?: string;
  name: string;
  email: string;
  password: string;
}

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axiosInstance.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron cargar los usuarios');
  }
};

// Obtener usuario por ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const res = await axiosInstance.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw new Error(`No se pudo cargar el usuario con ID ${id}`);
  }
};

// Crear usuario (registro)
export const createUser = async (user: User): Promise<User> => {
  try {
    const res = await axiosInstance.post(API_URL, user);
    if (res.data) {
      console.log('Usuario creado:', res.data);
      return res.data;
    }
    throw new Error('No se recibió respuesta del servidor');
  } catch (error: any) {
    // Cuando el backend lanza un RuntimeException, llega como mensaje de error
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data);
    }
    console.error('Error al crear usuario:', error);
    throw new Error('No se pudo crear el usuario');
  }
};

// Actualizar usuario
export const updateUser = async (id: string, user: User): Promise<User> => {
  try {
    const res = await axiosInstance.put(`${API_URL}/${id}`, user);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw new Error(`No se pudo actualizar el usuario con ID ${id}`);
  }
};

// Eliminar usuario
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw new Error(`No se pudo eliminar el usuario con ID ${id}`);
  }
};

// Vincular usuario a sesión
export const matchSession = async (userId: string, sessionId: string): Promise<void> => {
  try {
    await axiosInstance.put(`${API_URL}/${userId}/session/${sessionId}`);
  } catch (error) {
    console.error(`Error al vincular el usuario con ID ${userId} a la sesión ${sessionId}:`, error);
    throw new Error(`No se pudo vincular el usuario a la sesión`);
  }

  
};

export const updateUserRole = async (userId: string, newRole: string) => {
  try {
    const response = await fetch(`/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el rol del usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
