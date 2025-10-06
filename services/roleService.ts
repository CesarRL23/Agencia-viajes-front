import axiosInstance from "@/utils/axiosInstance";

export interface Role {
  id: string;
  name: string;
  description: string;
}

export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await axiosInstance.get('/api/roles');
    return response.data;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw new Error('No se pudieron cargar los roles');
  }
};

export const assignRole = async (userId: string, roleId: string): Promise<void> => {
  try {
    await axiosInstance.post(`/api/user-role/user/${userId}/role/${roleId}`);
  } catch (error) {
    console.error('Error al asignar rol:', error);
    throw new Error('No se pudo asignar el rol al usuario');
  }
};

export const getUsersWithRoles = async () => {
  try {
    const response = await axiosInstance.get('/api/users/with-roles');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios con roles:', error);
    throw new Error('No se pudieron cargar los usuarios con sus roles');
  }
};