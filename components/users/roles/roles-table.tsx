"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Badge } from "@/components/users/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/users/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Users } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrador",
    description: "Acceso completo al sistema",
    userCount: 8,
    permissions: [
      "users.create",
      "users.read",
      "users.update",
      "users.delete",
      "trips.create",
      "trips.read",
      "trips.update",
      "trips.delete",
      "reports.read",
    ],
  },
  {
    id: "2",
    name: "Agente de Viajes",
    description: "Gestión de viajes y clientes",
    userCount: 45,
    permissions: ["trips.create", "trips.read", "trips.update", "clients.read", "clients.update"],
  },
  {
    id: "3",
    name: "Guía Turístico",
    description: "Acceso a itinerarios y comunicación",
    userCount: 32,
    permissions: ["trips.read", "messages.read", "messages.create"],
  },
  {
    id: "4",
    name: "Admin Hotel",
    description: "Gestión de reservas de hospedaje",
    userCount: 18,
    permissions: ["accommodation.create", "accommodation.read", "accommodation.update", "accommodation.delete"],
  },
  {
    id: "5",
    name: "Cliente",
    description: "Acceso básico para clientes",
    userCount: 53,
    permissions: ["trips.read", "messages.read", "messages.create", "payments.read"],
  },
]

export function RolesTable() {
  const [roles] = useState<Role[]>(mockRoles)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles del Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rol</TableHead>
              <TableHead>Usuarios</TableHead>
              <TableHead>Permisos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{role.userCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{role.permissions.length} permisos</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Ver Usuarios
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
