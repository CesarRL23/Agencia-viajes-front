"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/users/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import { Search, UserPlus, UserMinus } from "lucide-react"
import { 
  getRoles, 
  getUsers, 
  getUserRoles, 
  assignRoleToUser, 
  removeUserRole,
  type Role, 
  type UserRole 
} from "@/services/roleService"
import { getUsers as getUsersService, type User } from "@/services/userService"
import { useToast } from "@/hooks/use-toast"

interface AssignRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRoleAssigned?: () => void
}

export function AssignRoleDialog({ open, onOpenChange, onRoleAssigned }: AssignRoleDialogProps) {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [userRoles, setUserRoles] = useState<UserRole[]>([])
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Cargar datos al abrir el diálogo
  useEffect(() => {
    if (open) {
      loadData()
    }
  }, [open])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [rolesData, usersData, userRolesData] = await Promise.all([
        getRoles(),
        getUsersService(),
        getUserRoles()
      ])
      setRoles(rolesData)
      setUsers(usersData)
      setUserRoles(userRolesData)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos necesarios.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) {
      toast({
        title: "Error",
        description: "Por favor selecciona un usuario y un rol.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      await assignRoleToUser(selectedUser, selectedRole)
      await loadData()
      setSelectedUser("")
      setSelectedRole("")
      toast({
        title: "Rol asignado",
        description: "El rol ha sido asignado al usuario exitosamente.",
      })
      onRoleAssigned?.()
    } catch (error: any) {
      console.error("Error al asignar rol:", error)
      toast({
        title: "Error al asignar rol",
        description: error.message || "No se pudo asignar el rol. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveRole = async (userRoleId: string) => {
    try {
      setIsLoading(true)
      await removeUserRole(userRoleId)
      await loadData()
      toast({
        title: "Rol removido",
        description: "El rol ha sido removido del usuario exitosamente.",
      })
      onRoleAssigned?.()
    } catch (error: any) {
      console.error("Error al remover rol:", error)
      toast({
        title: "Error al remover rol",
        description: error.message || "No se pudo remover el rol. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredUserRoles = userRoles.filter((userRole) => {
    const user = users.find(u => u._id === userRole.userId)
    const role = roles.find(r => r._id === userRole.roleId)
    return (
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Gestión de Roles de Usuario</DialogTitle>
          <DialogDescription>
            Asigna y remueve roles de los usuarios del sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Sección para asignar roles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Asignar Nuevo Rol</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="user-select">Usuario</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id!}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role-select">Rol</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role._id} value={role._id!}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleAssignRole} 
                  disabled={!selectedUser || !selectedRole || isLoading}
                  className="w-full"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Asignar Rol
                </Button>
              </div>
            </div>
          </div>

          {/* Sección para ver y remover roles asignados */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Roles Asignados</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar asignaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUserRoles.map((userRole) => {
                    const user = users.find(u => u._id === userRole.userId)
                    const role = roles.find(r => r._id === userRole.roleId)
                    
                    return (
                      <TableRow key={userRole._id}>
                        <TableCell className="font-medium">{user?.name || "Usuario no encontrado"}</TableCell>
                        <TableCell>{user?.email || "N/A"}</TableCell>
                        <TableCell>{role?.name || "Rol no encontrado"}</TableCell>
                        <TableCell>{role?.description || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveRole(userRole._id!)}
                            disabled={isLoading}
                            className="text-destructive hover:text-destructive"
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
