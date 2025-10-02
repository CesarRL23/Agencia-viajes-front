"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MessageSquare, CreditCard, Plane, Settings, Check, X } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "message" | "payment" | "trip" | "system"
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nuevo mensaje de Juan Pérez",
      message: "¿A qué hora es el check-in mañana?",
      type: "message",
      timestamp: "hace 5 min",
      isRead: false,
    },
    {
      id: "2",
      title: "Pago procesado exitosamente",
      message: "Pago de $1,850,000 COP por Aventura en Cartagena",
      type: "payment",
      timestamp: "hace 1 hora",
      isRead: false,
    },
    {
      id: "3",
      title: "Recordatorio de viaje",
      message: "El viaje 'Aventura en Cartagena' inicia mañana",
      type: "trip",
      timestamp: "hace 2 horas",
      isRead: true,
    },
    {
      id: "4",
      title: "Actualización del sistema",
      message: "Nueva versión disponible con mejoras de seguridad",
      type: "system",
      timestamp: "hace 1 día",
      isRead: true,
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "trip":
        return <Plane className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "text-blue-600"
      case "payment":
        return "text-green-600"
      case "trip":
        return "text-purple-600"
      case "system":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div
      className={`p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
        !notification.isRead ? "bg-blue-50 dark:bg-blue-950/20" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full bg-muted ${getNotificationColor(notification.type)}`}>
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
              {notification.title}
            </h4>
            <div className="flex items-center space-x-1">
              {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <div className="flex items-center space-x-2 mt-2">
            {!notification.isRead && (
              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                <Check className="h-3 w-3 mr-1" />
                Marcar como leída
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
              <X className="h-3 w-3 mr-1" />
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notificaciones
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2 text-xs">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Marcar todas
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 m-2">
            <TabsTrigger value="all" className="text-xs">
              Todas
            </TabsTrigger>
            <TabsTrigger value="message" className="text-xs">
              Mensajes
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-xs">
              Pagos
            </TabsTrigger>
            <TabsTrigger value="trip" className="text-xs">
              Viajes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-80">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="message" className="m-0">
            <ScrollArea className="h-80">
              {notifications
                .filter((n) => n.type === "message")
                .map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="payment" className="m-0">
            <ScrollArea className="h-80">
              {notifications
                .filter((n) => n.type === "payment")
                .map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="trip" className="m-0">
            <ScrollArea className="h-80">
              {notifications
                .filter((n) => n.type === "trip")
                .map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
