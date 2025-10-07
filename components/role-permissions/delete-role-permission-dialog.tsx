"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/users/ui/alert-dialog"

import type { RolePermission } from "@/services/rolePermissionService"

interface DeleteRolePermissionDialogProps {
  rolePermission: RolePermission | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteRolePermissionDialog({
  rolePermission,
  open,
  onOpenChange,
  onConfirm,
}: DeleteRolePermissionDialogProps) {
  if (!rolePermission) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la asociación entre el rol{" "}
            <strong>{rolePermission.role.name}</strong> y el permiso <strong>{rolePermission.permission.url}</strong> (
            {rolePermission.permission.method}).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar Asociación
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
