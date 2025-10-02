"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText, CreditCard } from "lucide-react"
import { useState } from "react"
import { CreatePaymentDialog } from "./create-payment-dialog"

export function PaymentsHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Pagos</h2>
          <p className="text-muted-foreground">Procesa pagos, gestiona cuotas y genera facturas electrónicas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/payments/invoices")}>
            <FileText className="mr-2 h-4 w-4" />
            Facturas
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/payments/installments")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Cuotas
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Pago
          </Button>
        </div>
      </div>

      <CreatePaymentDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
