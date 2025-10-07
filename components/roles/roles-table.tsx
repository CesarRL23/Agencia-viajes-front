"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Search, Edit, Trash2, Users } from "lucide-react"
import { EditRoleDialog } from "@/components/roles/edit-role-dialog"
import { DeleteRoleDialog } from "@/components/roles/delete-role-dialog"
import { CreateRoleDialog } from "@/components/roles/create-role-dialog"
import { RoleSelectionDialog } from "@/components/roles/role-selection-dialog"
import { AssignRoleDialog } from "@/components/roles/assign-role-dialog"
import RoleActionsMenu from "@/components/roles/role-actions-menu"
import { deleteRole, updateRole, getRoles, type Role } from "@/services/roleService"
import { useToast } from "@/hooks/use-toast"

export function RolesTable() {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [deletingRole, setDeletingRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [selectionAction, setSelectionAction] = useState<'edit' | 'delete' | null>(null)
  const [showAssignRole, setShowAssignRole] = useState(false)

  // Cargar roles al montar el componente
  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      setIsLoading(true)
      const rolesData = await getRoles()
      setRoles(rolesData)
    } catch (error: any) {
      console.error("Error al cargar roles:", error)
      setError(error.message || "No se pudieron cargar los roles")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Función para manejar la eliminación de rol
  const handleDeleteRole = async (role: Role) => {
    if (!role._id) {
      console.error("No se encontró ID del rol")
      return
    }

    try {
      setIsLoading(true)
      console.log("Eliminando rol:", role)
      await deleteRole(role._id)
      await loadRoles()
      toast({
        title: "Rol eliminado",
        description: `El rol ${role.name} ha sido eliminado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al eliminar rol:", error)
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el rol. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar la actualización de rol
  const handleUpdateRole = async (updatedRole: Role) => {
    if (!updatedRole._id) {
      console.error("No se encontró ID del rol")
      return
    }

    try {
      setIsLoading(true)
      console.log("Actualizando rol:", updatedRole)
      await updateRole(updatedRole._id, updatedRole)
      await loadRoles()
      toast({
        title: "Rol actualizado",
        description: `El rol ${updatedRole.name} ha sido actualizado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al actualizar rol:", error)
      toast({
        title: "Error al actualizar",
        description: error.message || "No se pudo actualizar el rol. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para abrir el diálogo de selección
  const handleOpenRoleSelection = (action: 'edit' | 'delete') => {
    setSelectionAction(action)
    setShowRoleSelection(true)
  }

  // Función para manejar la selección de rol
  const handleRoleSelected = (role: Role) => {
    if (selectionAction === 'edit') {
      setEditingRole(role)
    } else if (selectionAction === 'delete') {
      setDeletingRole(role)
    }
    setSelectionAction(null)
  }

  if (isLoading && roles.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando roles...</p>
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
            <CardTitle>Lista de Roles</CardTitle>
            <div className="flex space-x-2">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAssignRole(true)}
                className="flex items-center space-x-2"
                disabled={roles.length === 0}
              >
                <Users className="h-4 w-4" />
                <span>Asignar Roles</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOpenRoleSelection('edit')}
                className="flex items-center space-x-2"
                disabled={roles.length === 0}
              >
                <Edit className="h-4 w-4" />
                <span>Actualizar</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOpenRoleSelection('delete')}
                className="flex items-center space-x-2 text-destructive hover:text-destructive"
                disabled={roles.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                <span>Eliminar</span>
              </Button>
              <CreateRoleDialog onRoleCreated={loadRoles} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role._id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell className="text-right">
                    <RoleActionsMenu
                      onEdit={() => {
                        console.log("Editando rol:", role)
                        setEditingRole(role)
                      }}
                      onDelete={() => {
                        console.log("Eliminando rol:", role)
                        setDeletingRole(role)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditRoleDialog
        role={editingRole}
        open={!!editingRole}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditingRole(null)
          }
        }}
        onSave={async (updatedRole: Role) => {
          await handleUpdateRole(updatedRole)
          setEditingRole(null)
        }}
      />

      <DeleteRoleDialog
        role={deletingRole}
        open={!!deletingRole}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setDeletingRole(null)
          }
        }}
        onConfirm={async () => {
          if (deletingRole) {
            await handleDeleteRole(deletingRole)
            setDeletingRole(null)
          }
        }}
      />

      <RoleSelectionDialog
        open={showRoleSelection}
        onOpenChange={setShowRoleSelection}
        onRoleSelect={handleRoleSelected}
        roles={roles}
        title={selectionAction === 'edit' ? 'Seleccionar Rol para Editar' : 'Seleccionar Rol para Eliminar'}
        description={selectionAction === 'edit' 
          ? 'Busca y selecciona el rol que deseas editar.' 
          : 'Busca y selecciona el rol que deseas eliminar. Esta acción no se puede deshacer.'
        }
        actionButtonText={selectionAction === 'edit' ? 'Editar Rol' : 'Eliminar Rol'}
        actionButtonIcon={selectionAction === 'edit' ? <Edit className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
      />

      <AssignRoleDialog
        open={showAssignRole}
        onOpenChange={setShowAssignRole}
        onRoleAssigned={loadRoles}
      />
    </>
  )
}
