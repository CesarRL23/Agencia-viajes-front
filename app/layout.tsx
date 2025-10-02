import type React from "react"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ChatbotWidget } from "@/components/messages/chatbot-widget"
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata = {
  title: "TravelPro - Sistema de Gestión de Agencia de Viajes",
  description: "Sistema completo para la gestión de agencias de viajes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <UserProvider>
          {children}
          <ChatbotWidget />
        </UserProvider>
      </body>
    </html>
  )
}
