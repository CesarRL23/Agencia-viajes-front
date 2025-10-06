"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/users/ui/dialog"
import { Input } from "@/components/users/ui/input"
import { Button } from "@/components/users/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/users/ui/avatar"
import { Search, User } from "lucide-react"
import { User as UserType } from "@/services/userService"

interface UserSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserSelect: (user: UserType) => void
  users: UserType[]
  title: string
  description: string
  actionButtonText: string
  actionButtonIcon: React.ReactNode
}

export function UserSelectionDialog({
  open,
  onOpenChange,
  onUserSelect,
  users,
  title,
  description,
  actionButtonText,
  actionButtonIcon
}: UserSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user)
  }

  const handleConfirm = () => {
    if (selectedUser) {
      onUserSelect(selectedUser)
      setSelectedUser(null)
      setSearchTerm("")
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setSelectedUser(null)
    setSearchTerm("")
    onOpenChange(false)
  }

  // Limpiar selección cuando se cierra el diálogo
  useEffect(() => {
    if (!open) {
      setSelectedUser(null)
      setSearchTerm("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuario por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de usuarios */}
          <div className="max-h-[400px] overflow-y-auto border rounded-md">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {searchTerm ? "No se encontraron usuarios" : "No hay usuarios disponibles"}
              </div>
            ) : (
              <div className="divide-y">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedUser?._id === user._id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      {selectedUser?._id === user._id && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del usuario seleccionado */}
          {selectedUser && (
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Usuario seleccionado:</strong> {selectedUser.name} ({selectedUser.email})
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedUser}
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
