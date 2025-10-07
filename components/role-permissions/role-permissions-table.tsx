"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Input } from "@/components/users/ui/input"
import { Button } from "@/components/users/ui/button"
import { Search, Shield, Trash2 } from "lucide-react"
import { deleteRolePermission, getPermissionsByRole, getRoles } from "@/services/rolePermissionService"
import type { RolePermission, Role } from "@/services/rolePermissionService"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/users/ui/select"
import { Label } from "@/components/users/ui/label"
import CreateRolePermissionDialog from "@/components/role-permissions/create-role-permission-dialog"
import { DeleteRolePermissionDialog } from "@/components/role-permissions/delete-role-permission-dialog"

export function RolePermissionsTable() {
  const { toast } = useToast()
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedRoleId, setSelectedRoleId] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingRolePermission, setDeletingRolePermission] = useState<RolePermission | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadRoles()
  }, [])

  useEffect(() => {
    if (selectedRoleId) {
      loadRolePermissions()
    } else {
      setRolePermissions([])
    }
  }, [selectedRoleId])

  const loadRoles = async () => {
    try {
      const rolesData = await getRoles()
      setRoles(rolesData)
      if (rolesData.length > 0 && rolesData[0]._id) {
        setSelectedRoleId(rolesData[0]._id)
      }
    } catch (error) {
      console.error("Error al cargar roles:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los roles",
        variant: "destructive",
      })
    }
  }

  const loadRolePermissions = async () => {
    if (!selectedRoleId) return

    try {
      setIsLoading(true)
      const data = await getPermissionsByRole(selectedRoleId)
      setRolePermissions(data)
    } catch (error) {
      console.error("Error al cargar permisos del rol:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los permisos del rol",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRolePermission = async () => {
    if (!deletingRolePermission?._id) {
      console.error("No se encontró ID de la asociación")
      return
    }

    try {
      setIsLoading(true)
      await deleteRolePermission(deletingRolePermission._id)
      await loadRolePermissions()
      toast({
        title: "Asociación eliminada",
        description: `Se eliminó el permiso ${deletingRolePermission.permission.url} del rol ${deletingRolePermission.role.name}`,
      })
      setDeletingRolePermission(null)
    } catch (error: any) {
      console.error("Error al eliminar asociación:", error)
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar la asociación. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredRolePermissions = rolePermissions.filter(
    (rp) =>
      rp.permission.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rp.permission.method.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedRole = roles.find((r) => r._id === selectedRoleId)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Permisos por Rol</CardTitle>
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
              <CreateRolePermissionDialog onSuccess={loadRolePermissions} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <Label htmlFor="role-select">Seleccionar Rol</Label>
            <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
              <SelectTrigger id="role-select" className="w-full max-w-md">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role._id ?? ""} value={role._id ?? ""}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>{role.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Cargando permisos...</p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rol</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRolePermissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      {selectedRole
                        ? `No hay permisos asignados al rol ${selectedRole.name}`
                        : "Selecciona un rol para ver sus permisos"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRolePermissions.map((rp) => (
                    <TableRow key={rp._id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{rp.role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{rp.permission.url}</code>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rp.permission.method === "GET"
                              ? "bg-blue-100 text-blue-800"
                              : rp.permission.method === "POST"
                                ? "bg-green-100 text-green-800"
                                : rp.permission.method === "PUT"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : rp.permission.method === "DELETE"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {rp.permission.method}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingRolePermission(rp)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <DeleteRolePermissionDialog
        rolePermission={deletingRolePermission}
        open={!!deletingRolePermission}
        onOpenChange={(open) => !open && setDeletingRolePermission(null)}
        onConfirm={handleDeleteRolePermission}
      />
    </>
  )
}
