"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Label } from "@/components/users/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/users/ui/select"
import { createRolePermission, getRoles, getPermissions } from "@/services/rolePermissionService"
import { Plus } from "lucide-react"
import type { Role, Permission } from "@/services/rolePermissionService"

interface CreateRolePermissionDialogProps {
  onSuccess: () => void
}

function CreateRolePermissionDialog({ onSuccess }: CreateRolePermissionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedPermission, setSelectedPermission] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      loadData()
    }
  }, [open])

  const loadData = async () => {
    try {
      const [rolesData, permissionsData] = await Promise.all([getRoles(), getPermissions()])
      setRoles(rolesData)
      setPermissions(permissionsData)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      setError("Error al cargar roles y permisos")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole || !selectedPermission) {
      setError("Debes seleccionar un rol y un permiso")
      return
    }

    setIsLoading(true)
    setError("")
    try {
      await createRolePermission(selectedRole, selectedPermission)
      onSuccess()
      setSelectedRole("")
      setSelectedPermission("")
      setOpen(false)
    } catch (error) {
      console.error("Error al crear asociación:", error)
      setError("Error al crear la asociación rol-permiso")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Asignar Permiso a Rol
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Permiso a Rol</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role._id ?? ""} value={role._id ?? ""}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="permission">Permiso</Label>
            <Select value={selectedPermission} onValueChange={setSelectedPermission}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar permiso" />
              </SelectTrigger>
              <SelectContent>
                {permissions.map((permission) => (
                  <SelectItem key={permission._id ?? ""} value={permission._id ?? ""}>
                    {permission.method} - {permission.url}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Asociación"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRolePermissionDialog
