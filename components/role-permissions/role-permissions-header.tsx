"use client"

import { Button } from "@/components/users/ui/button"
import { FileSpreadsheet } from "lucide-react"

interface RolePermissionsHeaderProps {
  onExport?: () => void
}

export function RolePermissionsHeader({ onExport }: RolePermissionsHeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Roles y Permisos</h2>
        <p className="text-muted-foreground">Administra las asociaciones entre roles y permisos del sistema</p>
      </div>
      {onExport && (
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onExport} className="flex items-center space-x-2 bg-transparent">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      )}
    </div>
  )
}
