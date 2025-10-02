"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  Plane,
  MapPin,
  Hotel,
  CreditCard,
  MessageSquare,
  BarChart3,
  FileText,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Viajes",
    href: "/dashboard/trips",
    icon: Plane,
  },
  {
    name: "Destinos",
    href: "/dashboard/destinations",
    icon: MapPin,
  },
  {
    name: "Hospedaje",
    href: "/dashboard/accommodation",
    icon: Hotel,
  },
  {
    name: "Pagos",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    name: "Mensajes",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Reportes",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Políticas",
    href: "/dashboard/policies",
    icon: FileText,
  },
  {
    name: "Citas",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    name: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-xl font-bold text-primary">TravelPro</h1>}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
