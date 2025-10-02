"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface CreatePaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePaymentDialog({ open, onOpenChange }: CreatePaymentDialogProps) {
  const [formData, setFormData] = useState({
    customer: "",
    concept: "",
    amount: "",
    method: "",
    installments: "",
    generateInvoice: true,
    sendEmail: true,
    notes: "",
  })

  const paymentMethods = [
    { value: "credit_card", label: "Tarjeta de Crédito" },
    { value: "debit_card", label: "Tarjeta de Débito" },
    { value: "bank_transfer", label: "Transferencia Bancaria" },
    { value: "cash", label: "Efectivo" },
    { value: "installments", label: "Pago en Cuotas" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Processing payment:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      customer: "",
      concept: "",
      amount: "",
      method: "",
      installments: "",
      generateInvoice: true,
      sendEmail: true,
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Procesar Nuevo Pago</DialogTitle>
          <DialogDescription>Completa la información para procesar un pago.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Cliente</Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              placeholder="Nombre del cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="concept">Concepto</Label>
            <Input
              id="concept"
              value={formData.concept}
              onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
              placeholder="Ej: Viaje a Cartagena, Hospedaje, etc."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto (COP)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="1500000"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Método de Pago</Label>
              <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona método" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.method === "installments" && (
            <div className="space-y-2">
              <Label htmlFor="installments">Número de Cuotas</Label>
              <Select
                value={formData.installments}
                onValueChange={(value) => setFormData({ ...formData, installments: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona cuotas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 cuotas</SelectItem>
                  <SelectItem value="3">3 cuotas</SelectItem>
                  <SelectItem value="6">6 cuotas</SelectItem>
                  <SelectItem value="12">12 cuotas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Información adicional sobre el pago..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="generateInvoice"
                checked={formData.generateInvoice}
                onCheckedChange={(checked) => setFormData({ ...formData, generateInvoice: checked as boolean })}
              />
              <Label htmlFor="generateInvoice" className="text-sm">
                Generar factura electrónica
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendEmail"
                checked={formData.sendEmail}
                onCheckedChange={(checked) => setFormData({ ...formData, sendEmail: checked as boolean })}
              />
              <Label htmlFor="sendEmail" className="text-sm">
                Enviar confirmación por email
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Procesar Pago</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
