"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Settings, Bell } from "lucide-react"
import { useState } from "react"
import { CreateChatDialog } from "./create-chat-dialog"

export function MessagesHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mensajería</h2>
          <p className="text-muted-foreground">Chat en tiempo real con clientes, guías y administradores</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversaciones..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Chat
          </Button>
        </div>
      </div>

      <CreateChatDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
