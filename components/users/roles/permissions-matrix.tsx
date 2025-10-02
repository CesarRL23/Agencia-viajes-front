"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

const permissions: Permission[] = [
  { id: "users.create", name: "Crear Usuarios", description: "Crear nuevos usuarios", category: "Usuarios" },
  { id: "users.read", name: "Ver Usuarios", description: "Ver lista de usuarios", category: "Usuarios" },
  { id: "users.update", name: "Editar Usuarios", description: "Modificar usuarios existentes", category: "Usuarios" },
  { id: "users.delete", name: "Eliminar Usuarios", description: "Eliminar usuarios del sistema", category: "Usuarios" },
  { id: "trips.create", name: "Crear Viajes", description: "Crear nuevos viajes", category: "Viajes" },
  { id: "trips.read", name: "Ver Viajes", description: "Ver información de viajes", category: "Viajes" },
  { id: "trips.update", name: "Editar Viajes", description: "Modificar viajes existentes", category: "Viajes" },
  { id: "trips.delete", name: "Eliminar Viajes", description: "Eliminar viajes del sistema", category: "Viajes" },
  {
    id: "accommodation.create",
    name: "Crear Hospedaje",
    description: "Crear reservas de hospedaje",
    category: "Hospedaje",
  },
  { id: "accommodation.read", name: "Ver Hospedaje", description: "Ver reservas de hospedaje", category: "Hospedaje" },
  {
    id: "accommodation.update",
    name: "Editar Hospedaje",
    description: "Modificar reservas de hospedaje",
    category: "Hospedaje",
  },
  {
    id: "accommodation.delete",
    name: "Eliminar Hospedaje",
    description: "Eliminar reservas de hospedaje",
    category: "Hospedaje",
  },
  { id: "payments.read", name: "Ver Pagos", description: "Ver información de pagos", category: "Pagos" },
  { id: "payments.process", name: "Procesar Pagos", description: "Procesar transacciones", category: "Pagos" },
  { id: "messages.read", name: "Ver Mensajes", description: "Ver mensajes del chat", category: "Comunicación" },
  {
    id: "messages.create",
    name: "Enviar Mensajes",
    description: "Enviar mensajes en el chat",
    category: "Comunicación",
  },
  { id: "reports.read", name: "Ver Reportes", description: "Acceder a reportes y estadísticas", category: "Reportes" },
]

const categories = [...new Set(permissions.map((p) => p.category))]

export function PermissionsMatrix() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Matriz de Permisos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{category}</Badge>
            </div>
            <div className="space-y-2 pl-4">
              {permissions
                .filter((p) => p.category === category)
                .map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-3">
                    <Checkbox id={permission.id} />
                    <div className="flex-1">
                      <label
                        htmlFor={permission.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.name}
                      </label>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
