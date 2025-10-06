"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2 } from "lucide-react"
import { EditUserDialog } from "@/components/users/edit-user-dialog"
import { DeleteUserDialog } from "@/components/users/delete-user-dialog"
import { CreateUserDialog } from "@/components/users/create-user-dialog"
import { UserSelectionDialog } from "@/components/users/user-selection-dialog"
import UserActionsMenu from "@/components/users/user-actions-menu"
import { deleteUser, updateUser, type User } from "@/services/userService"
import { useUsers } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"

export function UsersTable() {
  const { users, refreshUsers } = useUsers()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showUserSelection, setShowUserSelection] = useState(false)
  const [selectionAction, setSelectionAction] = useState<'edit' | 'delete' | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Función para manejar la eliminación de usuario
  const handleDeleteUser = async (user: User) => {
    if (!user._id) {
      console.error("No se encontró ID del usuario")
      return
    }

    try {
      setIsLoading(true)
      console.log("Eliminando usuario:", user)
      await deleteUser(user._id)
      await refreshUsers()
      toast({
        title: "Usuario eliminado",
        description: `El usuario ${user.name} ha sido eliminado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al eliminar usuario:", error)
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el usuario. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar la actualización de usuario
  const handleUpdateUser = async (updatedUser: User) => {
    if (!updatedUser._id) {
      console.error("No se encontró ID del usuario")
      return
    }

    try {
      setIsLoading(true)
      console.log("Actualizando usuario:", updatedUser)
      await updateUser(updatedUser._id, updatedUser)
      await refreshUsers()
      toast({
        title: "Usuario actualizado",
        description: `El usuario ${updatedUser.name} ha sido actualizado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al actualizar usuario:", error)
      toast({
        title: "Error al actualizar",
        description: error.message || "No se pudo actualizar el usuario. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para abrir el diálogo de selección
  const handleOpenUserSelection = (action: 'edit' | 'delete') => {
    setSelectionAction(action)
    setShowUserSelection(true)
  }

  // Función para manejar la selección de usuario
  const handleUserSelected = (user: User) => {
    if (selectionAction === 'edit') {
      setEditingUser(user)
    } else if (selectionAction === 'delete') {
      setDeletingUser(user)
    }
    setSelectionAction(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando usuarios...</p>
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
            <CardTitle>Lista de Usuarios</CardTitle>
            <div className="flex space-x-2">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => handleOpenUserSelection('edit')}
                className="flex items-center space-x-2"
                disabled={users.length === 0}
              >
                <Edit className="h-4 w-4" />
                <span>Actualizar</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOpenUserSelection('delete')}
                className="flex items-center space-x-2 text-destructive hover:text-destructive"
                disabled={users.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                <span>Eliminar</span>
              </Button>
              <CreateUserDialog />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={"/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{"********"}</TableCell>
                  <TableCell className="text-right">
                    <UserActionsMenu
                      onEdit={() => {
                        console.log("Editando usuario:", user)
                        setEditingUser(user)
                      }}
                      onDelete={() => {
                        console.log("Eliminando usuario:", user)
                        setDeletingUser(user)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditUserDialog
        user={editingUser}
        open={!!editingUser}
        onOpenChange={(open) => {
          if (!open) {
            setEditingUser(null)
          }
        }}
        onSave={async (updatedUser) => {
          await handleUpdateUser(updatedUser)
          setEditingUser(null)
        }}
      />

      <DeleteUserDialog
        user={deletingUser}
        open={!!deletingUser}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingUser(null)
          }
        }}
        onConfirm={async () => {
          if (deletingUser) {
            await handleDeleteUser(deletingUser)
            setDeletingUser(null)
          }
        }}
      />

      <UserSelectionDialog
        open={showUserSelection}
        onOpenChange={setShowUserSelection}
        onUserSelect={handleUserSelected}
        users={users}
        title={selectionAction === 'edit' ? 'Seleccionar Usuario para Editar' : 'Seleccionar Usuario para Eliminar'}
        description={selectionAction === 'edit' 
          ? 'Busca y selecciona el usuario que deseas editar.' 
          : 'Busca y selecciona el usuario que deseas eliminar. Esta acción no se puede deshacer.'
        }
        actionButtonText={selectionAction === 'edit' ? 'Editar Usuario' : 'Eliminar Usuario'}
        actionButtonIcon={selectionAction === 'edit' ? <Edit className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
      />
    </>
  )
}
