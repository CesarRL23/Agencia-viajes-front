"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/users/ui/dialog"
import { Input } from "@/components/users/ui/input"
import { Button } from "@/components/users/ui/button"
import { Search, Shield } from "lucide-react"
import { getPermissions, type Permission } from "@/services/permissionService"

interface PermissionSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPermissionSelect: (permission: Permission) => void
  title: string
  description: string
  actionButtonText: string
  actionButtonIcon: React.ReactNode
}

export function PermissionSelectionDialog({
  open,
  onOpenChange,
  onPermissionSelect,
  title,
  description,
  actionButtonText,
  actionButtonIcon,
}: PermissionSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)
  const [permissions, setPermissions] = useState<Permission[]>([])

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const data = await getPermissions()
        setPermissions(data)
      } catch (error) {
        console.error("Error al cargar permisos:", error)
      }
    }

    if (open) {
      loadPermissions()
    }
  }, [open])

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.method.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePermissionSelect = (permission: Permission) => {
    setSelectedPermission(permission)
  }

  const handleConfirm = () => {
    if (selectedPermission) {
      onPermissionSelect(selectedPermission)
      setSelectedPermission(null)
      setSearchTerm("")
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setSelectedPermission(null)
    setSearchTerm("")
    onOpenChange(false)
  }

  // Limpiar selección cuando se cierra el diálogo
  useEffect(() => {
    if (!open) {
      setSelectedPermission(null)
      setSearchTerm("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar permiso por URL o método..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de permisos */}
          <div className="max-h-[400px] overflow-y-auto border rounded-md">
            {filteredPermissions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {searchTerm ? "No se encontraron permisos" : "No hay permisos disponibles"}
              </div>
            ) : (
              <div className="divide-y">
                {filteredPermissions.map((permission) => (
                  <div
                    key={permission._id}
                    onClick={() => handlePermissionSelect(permission)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedPermission?._id === permission._id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{permission.url}</p>
                        <p className="text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {permission.method}
                          </span>
                        </p>
                      </div>
                      {selectedPermission?._id === permission._id && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Shield className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del permiso seleccionado */}
          {selectedPermission && (
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Permiso seleccionado:</strong> {selectedPermission.url} [{selectedPermission.method}]
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedPermission} className="flex items-center space-x-2">
              {actionButtonIcon}
              <span>{actionButtonText}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
