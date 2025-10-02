"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download, Filter } from "lucide-react"

export function InvoicesHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Facturas Electrónicas</h2>
        <p className="text-muted-foreground">Gestiona y genera facturas electrónicas para todos los pagos</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Factura
        </Button>
      </div>
    </div>
  )
}
