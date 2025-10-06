import axiosInstance from "@/utils/axiosInstance"

const API_URL = "/api/permissions"

export interface Permission {
  _id?: string
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
}

// Obtener todos los permisos
export const getPermissions = async (): Promise<Permission[]> => {
  try {
    const res = await axiosInstance.get(API_URL)
    return res.data
  } catch (error) {
    console.error("Error al obtener permisos:", error)
    throw new Error("No se pudieron cargar los permisos")
  }
}

// Obtener permiso por ID
export const getPermissionById = async (id: string): Promise<Permission> => {
  try {
    const res = await axiosInstance.get(`${API_URL}/${id}`)
    return res.data
  } catch (error) {
    console.error(`Error al obtener el permiso con ID ${id}:`, error)
    throw new Error(`No se pudo cargar el permiso con ID ${id}`)
  }
}

// Crear permiso
export const createPermission = async (permission: Permission): Promise<Permission> => {
  try {
    const res = await axiosInstance.post(API_URL, permission)
    if (res.data) {
      console.log("Permiso creado:", res.data)
      return res.data
    }
    throw new Error("No se recibió respuesta del servidor")
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data)
    }
    console.error("Error al crear permiso:", error)
    throw new Error("No se pudo crear el permiso")
  }
}

// Actualizar permiso
export const updatePermission = async (id: string, permission: Permission): Promise<Permission> => {
  try {
    const res = await axiosInstance.put(`${API_URL}/${id}`, permission)
    return res.data
  } catch (error) {
    console.error(`Error al actualizar el permiso con ID ${id}:`, error)
    throw new Error(`No se pudo actualizar el permiso con ID ${id}`)
  }
}

// Eliminar permiso
export const deletePermission = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error(`Error al eliminar el permiso con ID ${id}:`, error)
    throw new Error(`No se pudo eliminar el permiso con ID ${id}`)
  }
}
