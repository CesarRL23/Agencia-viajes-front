"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { AlertTriangle } from "lucide-react"
import { type Role } from "@/services/roleService"

interface DeleteRoleDialogProps {
  role: Role | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
}

export function DeleteRoleDialog({ role, open, onOpenChange, onConfirm }: DeleteRoleDialogProps) {
  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Eliminar Rol
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar el rol <strong>{role?.name}</strong>?
            <br />
            <br />
            Esta acción no se puede deshacer. Todos los usuarios que tengan asignado este rol
            perderán sus permisos asociados.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Eliminar Rol
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
