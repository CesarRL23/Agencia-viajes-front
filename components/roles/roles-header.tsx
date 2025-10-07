"use client"

import { Button } from "@/components/users/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { CreateRoleDialog } from "@/components/roles/create-role-dialog"

interface RolesHeaderProps {
  onExport?: () => void
  onRoleCreated?: () => void
}

export function RolesHeader({ onExport, onRoleCreated }: RolesHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Roles</h2>
          <p className="text-muted-foreground">Administra roles y permisos del sistema</p>
        </div>
        <div className="flex space-x-2">
          {onExport && (
            <Button variant="outline" onClick={onExport} className="flex items-center space-x-2 bg-transparent">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          )}
          <CreateRoleDialog onRoleCreated={onRoleCreated} />
        </div>
      </div>
    </>
  )
}
