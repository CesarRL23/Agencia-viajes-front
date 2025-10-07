import axiosInstance from "@/utils/axiosInstance"
import type { Role } from "./roleService"
import type { Permission } from "./permissionService"

export type { Role, Permission }

export interface RolePermission {
  _id: string
  role: Role
  permission: Permission
}

const API_URL = "/api/role-permission"

// Get all permissions for a specific role
export async function getPermissionsByRole(roleId: string): Promise<RolePermission[]> {
  try {
    const res = await axiosInstance.get(`${API_URL}/role/${roleId}`)
    return res.data
  } catch (error) {
    console.error(`Error al obtener permisos del rol ${roleId}:`, error)
    throw new Error("Error al obtener permisos del rol")
  }
}

// Create a new role-permission association
export async function createRolePermission(roleId: string, permissionId: string): Promise<RolePermission> {
  try {
    const res = await axiosInstance.post(`${API_URL}/role/${roleId}/permission/${permissionId}`)
    return res.data
  } catch (error) {
    console.error(`Error al crear asociación rol-permiso:`, error)
    throw new Error("Error al crear la asociación rol-permiso")
  }
}

// Delete a role-permission association
export async function deleteRolePermission(id: string): Promise<void> {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error(`Error al eliminar asociación con ID ${id}:`, error)
    throw new Error("Error al eliminar la asociación rol-permiso")
  }
}

// Re-export functions from other services for convenience
export { getRoles } from "./roleService"
export { getPermissions } from "./permissionService"
