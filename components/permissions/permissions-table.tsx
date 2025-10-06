"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Search, Edit, Trash2 } from "lucide-react"
import { EditPermissionDialog } from "./edit-permission-dialog"
import { DeletePermissionDialog } from "./delete-permission-dialog"
import { CreatePermissionDialog } from "./create-permission-dialog"
import { PermissionSelectionDialog } from "./permission-selection-dialog"
import PermissionActionsMenu from "./permission-actions-menu"
import { getPermissions, updatePermission, deletePermission, type Permission } from "@/services/permissionService"
import { useToast } from "@/hooks/use-toast"

export function PermissionsTable() {
  const { toast } = useToast()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [deletingPermission, setDeletingPermission] = useState<Permission | null>(null)
  const [showPermissionSelection, setShowPermissionSelection] = useState(false)
  const [selectionAction, setSelectionAction] = useState<"edit" | "delete" | null>(null)

  const refreshPermissions = async () => {
    try {
      setIsLoading(true)
      const data = await getPermissions()
      setPermissions(data)
    } catch (error) {
      console.error("Error al cargar permisos:", error)
      setError("No se pudieron cargar los permisos")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshPermissions()
  }, [])

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.method.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUpdatePermission = async (updatedPermission: Permission) => {
    if (!updatedPermission._id) {
      console.error("No se encontró ID del permiso")
      return
    }

    try {
      setIsLoading(true)
      console.log("Actualizando permiso:", updatedPermission)
      await updatePermission(updatedPermission._id, updatedPermission)
      await refreshPermissions()
      toast({
        title: "Permiso actualizado",
        description: `El permiso ${updatedPermission.url} ha sido actualizado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al actualizar permiso:", error)
      toast({
        title: "Error al actualizar",
        description: error.message || "No se pudo actualizar el permiso. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePermission = async (permission: Permission) => {
    if (!permission._id) {
      console.error("No se encontró ID del permiso")
      return
    }

    try {
      setIsLoading(true)
      console.log("Eliminando permiso:", permission)
      await deletePermission(permission._id)
      await refreshPermissions()
      toast({
        title: "Permiso eliminado",
        description: `El permiso ${permission.url} ha sido eliminado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al eliminar permiso:", error)
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el permiso. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenPermissionSelection = (action: "edit" | "delete") => {
    setSelectionAction(action)
    setShowPermissionSelection(true)
  }

  const handlePermissionSelected = (permission: Permission) => {
    if (selectionAction === "edit") {
      setEditingPermission(permission)
    } else if (selectionAction === "delete") {
      setDeletingPermission(permission)
    }
    setSelectionAction(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando permisos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Permisos</CardTitle>
            <div className="flex space-x-2">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar permisos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => handleOpenPermissionSelection("edit")}
                className="flex items-center space-x-2"
                disabled={permissions.length === 0}
              >
                <Edit className="h-4 w-4" />
                <span>Actualizar</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOpenPermissionSelection("delete")}
                className="flex items-center space-x-2 text-destructive hover:text-destructive"
                disabled={permissions.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                <span>Eliminar</span>
              </Button>
              <CreatePermissionDialog onSuccess={refreshPermissions} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Método</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission._id}>
                  <TableCell className="font-mono text-xs">{permission._id}</TableCell>
                  <TableCell>{permission.url}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {permission.method}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <PermissionActionsMenu
                      onEdit={() => {
                        console.log("Editando permiso:", permission)
                        setEditingPermission(permission)
                      }}
                      onDelete={() => {
                        console.log("Eliminando permiso:", permission)
                        setDeletingPermission(permission)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditPermissionDialog
        permission={editingPermission}
        open={!!editingPermission}
        onOpenChange={(open) => {
          if (!open) {
            setEditingPermission(null)
          }
        }}
        onSave={async (updatedPermission) => {
          await handleUpdatePermission(updatedPermission)
          setEditingPermission(null)
        }}
      />

      <DeletePermissionDialog
        permission={deletingPermission}
        open={!!deletingPermission}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingPermission(null)
          }
        }}
        onConfirm={async () => {
          if (deletingPermission) {
            await handleDeletePermission(deletingPermission)
            setDeletingPermission(null)
          }
        }}
      />

      <PermissionSelectionDialog
        open={showPermissionSelection}
        onOpenChange={setShowPermissionSelection}
        onPermissionSelect={handlePermissionSelected}
        title={selectionAction === "edit" ? "Seleccionar Permiso para Editar" : "Seleccionar Permiso para Eliminar"}
        description={
          selectionAction === "edit"
            ? "Busca y selecciona el permiso que deseas editar."
            : "Busca y selecciona el permiso que deseas eliminar. Esta acción no se puede deshacer."
        }
        actionButtonText={selectionAction === "edit" ? "Editar Permiso" : "Eliminar Permiso"}
        actionButtonIcon={selectionAction === "edit" ? <Edit className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
      />
    </>
  )
}
