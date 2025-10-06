"use client"

import { Button } from "@/components/users/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/users/ui/dialog"
import { Select } from "@/components/users/ui/select"
import { useState } from "react"
import { assignRole } from "@/services/roleService"
import { toast } from "@/components/users/ui/use-toast"

interface AssignRoleDialogProps {
  userId: string
  userName: string
  currentRole: string
  availableRoles: Array<{
    id: string
    name: string
    description: string
  }>
  onRoleAssigned: () => void
}

export function AssignRoleDialog({
  userId,
  userName,
  currentRole,
  availableRoles,
  onRoleAssigned
}: AssignRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState(currentRole)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAssignRole = async () => {
    try {
      setIsLoading(true)
      await assignRole(userId, selectedRole)
      toast({
        title: "Rol asignado",
        description: `Se ha asignado el rol exitosamente a ${userName}`,
      })
      onRoleAssigned()
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo asignar el rol",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Asignar Rol</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Rol a {userName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Select
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              {availableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name} - {role.description}
                </option>
              ))}
            </Select>
          </div>
          <Button 
            onClick={handleAssignRole} 
            disabled={isLoading}
          >
            {isLoading ? "Asignando..." : "Asignar Rol"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}