"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Eye, FileText, CreditCard, Download } from "lucide-react"

interface Payment {
  id: string
  customer: string
  concept: string
  amount: number
  method: "credit_card" | "debit_card" | "bank_transfer" | "cash" | "installments"
  status: "completed" | "pending" | "failed" | "refunded"
  date: string
  invoiceNumber?: string
  installments?: number
  trip?: string
}

const mockPayments: Payment[] = [
  {
    id: "1",
    customer: "Juan Pérez",
    concept: "Aventura en Cartagena",
    amount: 1850000,
    method: "credit_card",
    status: "completed",
    date: "2024-02-15 10:30:00",
    invoiceNumber: "INV-2024-001",
    trip: "Aventura en Cartagena",
  },
  {
    id: "2",
    customer: "María García",
    concept: "Hospedaje Hotel Las Américas",
    amount: 320000,
    method: "installments",
    status: "pending",
    date: "2024-02-14 15:45:00",
    installments: 3,
    invoiceNumber: "INV-2024-002",
  },
  {
    id: "3",
    customer: "Carlos López",
    concept: "Tour Europeo",
    amount: 8500000,
    method: "bank_transfer",
    status: "completed",
    date: "2024-02-13 09:20:00",
    invoiceNumber: "INV-2024-003",
    trip: "Tour Europeo",
  },
  {
    id: "4",
    customer: "Ana Rodríguez",
    concept: "Ruta del Café",
    amount: 1200000,
    method: "debit_card",
    status: "completed",
    date: "2024-02-12 14:15:00",
    invoiceNumber: "INV-2024-004",
    trip: "Ruta del Café",
  },
  {
    id: "5",
    customer: "Luis Martínez",
    concept: "Expedición Amazónica",
    amount: 2450000,
    method: "installments",
    status: "pending",
    date: "2024-02-11 11:00:00",
    installments: 6,
    invoiceNumber: "INV-2024-005",
  },
]

export function PaymentsTable() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "pending":
        return "Pendiente"
      case "failed":
        return "Fallido"
      case "refunded":
        return "Reembolsado"
      default:
        return status
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Tarjeta de Crédito"
      case "debit_card":
        return "Tarjeta de Débito"
      case "bank_transfer":
        return "Transferencia"
      case "cash":
        return "Efectivo"
      case "installments":
        return "Cuotas"
      default:
        return method
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Historial de Pagos</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pagos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{payment.customer}</div>
                    {payment.invoiceNumber && (
                      <div className="text-sm text-muted-foreground">{payment.invoiceNumber}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{payment.concept}</div>
                    {payment.installments && (
                      <div className="text-sm text-muted-foreground">{payment.installments} cuotas</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    {getMethodText(payment.method)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(payment.status)}>{getStatusText(payment.status)}</Badge>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(payment.amount)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(payment.date).toLocaleString("es-CO")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/payments/${payment.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      {payment.invoiceNumber && (
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Ver Factura
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar Recibo
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {payment.status === "completed" && (
                        <DropdownMenuItem className="text-destructive">Procesar Reembolso</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
