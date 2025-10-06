"use client"

import { Button } from "@/components/users/ui/button"
import { RefreshCw, Download, Settings, AlertTriangle } from "lucide-react"
import { useState } from "react"

interface TrackingControlsProps {
  tripId: string
}

export function TrackingControls({ tripId }: TrackingControlsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
        <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        {isRefreshing ? "Actualizando..." : "Actualizar"}
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Exportar Ruta
      </Button>
      <Button variant="outline">
        <Settings className="mr-2 h-4 w-4" />
        Configurar
      </Button>
      <Button variant="outline">
        <AlertTriangle className="mr-2 h-4 w-4" />
        Alertas
      </Button>
    </div>
  )
}
