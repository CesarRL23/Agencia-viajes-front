"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { ScrollArea } from "@/components/users/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/users/ui/avatar"
import { Bot, Send, X, Minimize2 } from "lucide-react"

interface ChatbotMessage {
  id: string
  content: string
  isBot: boolean
  timestamp: string
  suggestions?: string[]
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    {
      id: "1",
      content: "¡Hola! Soy TravelBot, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: "14:00",
      suggestions: [
        "Información sobre viajes",
        "Estado de mi reserva",
        "Políticas de cancelación",
        "Contactar con un agente",
      ],
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatbotMessage = {
        id: Date.now().toString(),
        content: message,
        isBot: false,
        timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatbotMessage = {
          id: (Date.now() + 1).toString(),
          content: getBotResponse(message),
          isBot: true,
          timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase()

    if (msg.includes("reserva") || msg.includes("booking")) {
      return "Para consultar el estado de tu reserva, necesito tu número de confirmación. También puedes revisar tus reservas en la sección 'Mis Viajes' de tu cuenta."
    }

    if (msg.includes("cancelar") || msg.includes("cancelación")) {
      return "Las políticas de cancelación varían según el tipo de servicio. Para viajes: 48 horas antes sin costo, para hospedaje: 24 horas antes. ¿Necesitas cancelar algo específico?"
    }

    if (msg.includes("pago") || msg.includes("factura")) {
      return "Aceptamos tarjetas de crédito, débito, transferencias bancarias y pagos en cuotas. Todas las facturas se envían automáticamente por email. ¿Tienes algún problema con un pago?"
    }

    if (msg.includes("agente") || msg.includes("humano")) {
      return "Te conectaré con uno de nuestros agentes. Por favor espera un momento mientras busco un agente disponible."
    }

    return "Entiendo tu consulta. Para brindarte la mejor asistencia, ¿podrías ser más específico sobre lo que necesitas? También puedo conectarte con un agente humano si prefieres."
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <Button className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50" onClick={() => setIsOpen(true)}>
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-80 shadow-lg z-50 transition-all ${isMinimized ? "h-14" : "h-96"}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Bot className="h-4 w-4 mr-2" />
          TravelBot
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsMinimized(!isMinimized)}>
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`flex items-end space-x-2 max-w-[80%] ${
                      msg.isBot ? "" : "flex-row-reverse space-x-reverse"
                    }`}
                  >
                    {msg.isBot && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        msg.isBot ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${msg.isBot ? "text-muted-foreground" : "text-primary-foreground/70"}`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {messages[messages.length - 1]?.suggestions && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Sugerencias:</p>
                  {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 mr-1 mb-1 bg-transparent"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="text-sm"
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
