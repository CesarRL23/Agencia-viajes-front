"use client"

import { Button } from "@/components/users/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { useState } from "react"
import { CreateUserDialog } from "@/components/users/create-user-dialog"

interface UsersHeaderProps {
  onExport?: () => void
}

export function UsersHeader({ onExport }: UsersHeaderProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
          <p className="text-muted-foreground">Administra usuarios, roles y permisos del sistema</p>
        </div>
        <div className="flex space-x-2">
          {onExport && (
            <Button variant="outline" onClick={onExport} className="flex items-center space-x-2 bg-transparent">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          )}
          <CreateUserDialog />
        </div>
      </div>
    </>
  )
}
