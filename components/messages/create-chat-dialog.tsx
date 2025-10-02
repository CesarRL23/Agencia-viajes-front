"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CreateChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface User {
  id: string
  name: string
  role: string
  avatar?: string
  isOnline: boolean
}

export function CreateChatDialog({ open, onOpenChange }: CreateChatDialogProps) {
  const [chatType, setChatType] = useState("")
  const [chatName, setChatName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const users: User[] = [
    { id: "1", name: "Juan Pérez", role: "Cliente", avatar: "/man.jpg", isOnline: true },
    { id: "2", name: "María García", role: "Cliente", avatar: "/diverse-woman-portrait.png", isOnline: false },
    { id: "3", name: "Ana Martínez", role: "Guía Turístico", isOnline: true },
    { id: "4", name: "Carlos Rodríguez", role: "Agente de Viajes", isOnline: true },
    { id: "5", name: "Luis Pérez", role: "Guía Turístico", isOnline: false },
    { id: "6", name: "Sofia Herrera", role: "Admin Hotel", isOnline: true },
  ]

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating chat:", {
      type: chatType,
      name: chatName,
      description,
      participants: selectedUsers,
    })
    onOpenChange(false)
    // Reset form
    setChatType("")
    setChatName("")
    setDescription("")
    setSelectedUsers([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Conversación</DialogTitle>
          <DialogDescription>Inicia un chat directo o grupal con otros usuarios del sistema.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chat-type">Tipo de Chat</Label>
            <Select value={chatType} onValueChange={setChatType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Chat Directo</SelectItem>
                <SelectItem value="group">Grupo General</SelectItem>
                <SelectItem value="trip">Grupo de Viaje</SelectItem>
                <SelectItem value="support">Soporte Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(chatType === "group" || chatType === "trip") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="chat-name">Nombre del Grupo</Label>
                <Input
                  id="chat-name"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  placeholder="Ej: Equipo Guías, Aventura en Cartagena"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (Opcional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe el propósito del grupo..."
                  rows={2}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Participantes</Label>
            <ScrollArea className="h-48 border rounded-md p-2">
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserToggle(user.id)}
                    />
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-0 -right-0 w-2 h-2 bg-green-500 rounded-full border border-background"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <p className="text-xs text-muted-foreground">{selectedUsers.length} participantes seleccionados</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={selectedUsers.length === 0}>
              Crear Chat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
