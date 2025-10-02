"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Bot } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "system" | "bot"
  isOwn: boolean
  avatar?: string
}

export function ChatInterface() {
  const [message, setMessage] = useState("")
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Juan Pérez",
      content: "Hola, tengo una pregunta sobre el viaje a Cartagena",
      timestamp: "14:25",
      type: "text",
      isOwn: false,
      avatar: "/man.jpg",
    },
    {
      id: "2",
      sender: "Tú",
      content: "¡Hola Juan! Claro, dime en qué te puedo ayudar",
      timestamp: "14:26",
      type: "text",
      isOwn: true,
    },
    {
      id: "3",
      sender: "Juan Pérez",
      content: "¿A qué hora es el check-in en el hotel mañana?",
      timestamp: "14:27",
      type: "text",
      isOwn: false,
      avatar: "/man.jpg",
    },
    {
      id: "4",
      sender: "TravelBot",
      content:
        "El check-in en el Hotel Boutique Casa del Arzobispado es a partir de las 15:00. ¿Necesitas información adicional sobre el hotel?",
      timestamp: "14:28",
      type: "bot",
      isOwn: false,
    },
    {
      id: "5",
      sender: "Tú",
      content:
        "Exacto, como dice nuestro asistente, el check-in es a las 3:00 PM. Si llegas antes, puedes dejar el equipaje en recepción.",
      timestamp: "14:29",
      type: "text",
      isOwn: true,
    },
    {
      id: "6",
      sender: "Juan Pérez",
      content: "¿A qué hora es el check-in mañana?",
      timestamp: "14:30",
      type: "text",
      isOwn: false,
      avatar: "/man.jpg",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex-1 h-full rounded-none border-0 flex flex-col">
      {/* Chat Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/man.jpg" alt="Juan Pérez" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h3 className="font-semibold">Juan Pérez</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">En línea</p>
              <Badge variant="secondary" className="text-xs">
                Cliente
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver perfil</DropdownMenuItem>
              <DropdownMenuItem>Buscar en chat</DropdownMenuItem>
              <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Bloquear usuario</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-end space-x-2 max-w-[70%] ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {!msg.isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.sender} />
                      <AvatarFallback>
                        {msg.type === "bot" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          msg.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        )}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      msg.isOwn
                        ? "bg-primary text-primary-foreground"
                        : msg.type === "bot"
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                          : "bg-muted"
                    }`}
                  >
                    {!msg.isOwn && msg.type !== "system" && (
                      <div className="flex items-center space-x-1 mb-1">
                        <p className="text-xs font-medium">{msg.sender}</p>
                        {msg.type === "bot" && <Bot className="h-3 w-3" />}
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
