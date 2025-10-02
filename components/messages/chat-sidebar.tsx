"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, Bot } from "lucide-react"

interface Chat {
  id: string
  name: string
  type: "direct" | "group" | "trip" | "support"
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  participants: string[]
  avatar?: string
  isOnline?: boolean
}

export function ChatSidebar() {
  const [selectedChat, setSelectedChat] = useState<string>("1")

  const directChats: Chat[] = [
    {
      id: "1",
      name: "Juan Pérez",
      type: "direct",
      lastMessage: "¿A qué hora es el check-in mañana?",
      lastMessageTime: "14:30",
      unreadCount: 2,
      participants: ["Juan Pérez"],
      avatar: "/man.jpg",
      isOnline: true,
    },
    {
      id: "2",
      name: "María García",
      type: "direct",
      lastMessage: "Gracias por la información del hotel",
      lastMessageTime: "13:45",
      unreadCount: 0,
      participants: ["María García"],
      avatar: "/diverse-woman-portrait.png",
      isOnline: false,
    },
    {
      id: "3",
      name: "Ana Martínez (Guía)",
      type: "direct",
      lastMessage: "El grupo está listo para salir",
      lastMessageTime: "12:20",
      unreadCount: 1,
      participants: ["Ana Martínez"],
      isOnline: true,
    },
  ]

  const groupChats: Chat[] = [
    {
      id: "4",
      name: "Aventura en Cartagena",
      type: "trip",
      lastMessage: "Nos vemos en el lobby a las 8:00 AM",
      lastMessageTime: "15:20",
      unreadCount: 5,
      participants: ["Juan Pérez", "María García", "Carlos López", "Ana Martínez"],
    },
    {
      id: "5",
      name: "Equipo Guías",
      type: "group",
      lastMessage: "Actualización de itinerarios para mañana",
      lastMessageTime: "11:30",
      unreadCount: 0,
      participants: ["Ana Martínez", "Carlos Rodríguez", "Luis Pérez"],
    },
    {
      id: "6",
      name: "Soporte Técnico",
      type: "support",
      lastMessage: "Ticket #1234 resuelto",
      lastMessageTime: "10:15",
      unreadCount: 0,
      participants: ["Soporte TravelPro"],
    },
  ]

  const getChatIcon = (type: string) => {
    switch (type) {
      case "group":
      case "trip":
        return <Users className="h-4 w-4" />
      case "support":
        return <Bot className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getChatTypeColor = (type: string) => {
    switch (type) {
      case "trip":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "group":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "support":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const ChatItem = ({ chat }: { chat: Chat }) => (
    <div
      className={`p-3 cursor-pointer hover:bg-muted/50 border-l-2 transition-colors ${
        selectedChat === chat.id ? "bg-muted border-l-primary" : "border-l-transparent"
      }`}
      onClick={() => setSelectedChat(chat.id)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
            <AvatarFallback>
              {chat.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {chat.isOnline && (
            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium truncate">{chat.name}</h4>
              {chat.type !== "direct" && (
                <Badge variant="secondary" className={`text-xs ${getChatTypeColor(chat.type)}`}>
                  {getChatIcon(chat.type)}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
              {chat.unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs min-w-[1.25rem] h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="w-80 h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
      <Tabs defaultValue="all" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="direct">Directos</TabsTrigger>
          <TabsTrigger value="groups">Grupos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {[...directChats, ...groupChats].map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="direct" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {directChats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {groupChats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
