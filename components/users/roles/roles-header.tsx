"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateRoleDialog } from "./create-role-dialog"

export function RolesHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles y Permisos</h2>
          <p className="text-muted-foreground">Gestiona los roles del sistema y sus permisos asociados</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Rol
        </Button>
      </div>

      <CreateRoleDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
