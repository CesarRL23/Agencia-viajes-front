"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import { Search } from "lucide-react"
import { type Role } from "@/services/roleService"

interface RoleSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRoleSelect: (role: Role) => void
  roles: Role[]
  title: string
  description: string
  actionButtonText: string
  actionButtonIcon: React.ReactNode
}

export function RoleSelectionDialog({
  open,
  onOpenChange,
  onRoleSelect,
  roles,
  title,
  description,
  actionButtonText,
  actionButtonIcon,
}: RoleSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
  }

  const handleConfirm = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
      setSelectedRole(null)
      setSearchTerm("")
    }
  }

  const handleClose = () => {
    setSelectedRole(null)
    setSearchTerm("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow
                    key={role._id}
                    className={`cursor-pointer ${
                      selectedRole?._id === role._id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <input
                        type="radio"
                        checked={selectedRole?._id === role._id}
                        onChange={() => handleRoleSelect(role)}
                        className="h-4 w-4"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedRole}
              className="flex items-center space-x-2"
            >
              {actionButtonIcon}
              <span>{actionButtonText}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
