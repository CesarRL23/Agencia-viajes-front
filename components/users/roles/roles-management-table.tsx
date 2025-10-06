"use client"

import { Table } from "@/components/users/ui/table"
import { Button } from "@/components/users/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/users/ui/select"
import React from "react"

interface RoleTableProps {
  users: {
    id: string
    name: string
    email: string
    role: string
  }[]
  roles: { value: string; label: string }[]
  onRoleChange: (userId: string, newRole: string) => void
}

export function RolesManagementTable({ users, roles, onRoleChange }: RoleTableProps) {
  return (
    <div className="w-full">
      <Table>
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Select
                  value={user.role}
                  onValueChange={(value) => onRoleChange(user.id, value)} // ✅ cambio aquí
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td>
                <Button variant="outline">Guardar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
