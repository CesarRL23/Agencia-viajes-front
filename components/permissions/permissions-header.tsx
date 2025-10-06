"use client"

import { Button } from "@/components/users/ui/button"
import { FileSpreadsheet } from "lucide-react"

interface PermissionsHeaderProps {
  onExport?: () => void
  onCreatePermission?: () => void
}

export function PermissionsHeader({ onExport, onCreatePermission }: PermissionsHeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Permisos</h2>
        <p className="text-muted-foreground">Administra permisos, URLs y métodos del sistema</p>
      </div>
      <div className="flex space-x-2">
        {onExport && (
          <Button variant="outline" onClick={onExport} className="flex items-center space-x-2 bg-transparent">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        )}
        {onCreatePermission && (
          <Button onClick={onCreatePermission} className="flex items-center space-x-2">
            <span>Crear Permiso</span>
          </Button>
        )}
      </div>
    </div>
  )
}
