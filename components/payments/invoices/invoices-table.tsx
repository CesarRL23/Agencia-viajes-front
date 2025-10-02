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
import { MoreHorizontal, Search, Eye, Download, Send, FileText } from "lucide-react"

interface Invoice {
  id: string
  number: string
  customer: string
  concept: string
  amount: number
  status: "paid" | "pending" | "overdue" | "cancelled"
  issueDate: string
  dueDate: string
  paymentDate?: string
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    customer: "Juan Pérez",
    concept: "Aventura en Cartagena",
    amount: 1850000,
    status: "paid",
    issueDate: "2024-02-15",
    dueDate: "2024-02-25",
    paymentDate: "2024-02-20",
  },
  {
    id: "2",
    number: "INV-2024-002",
    customer: "María García",
    concept: "Hospedaje Hotel Las Américas",
    amount: 320000,
    status: "pending",
    issueDate: "2024-02-14",
    dueDate: "2024-02-24",
  },
  {
    id: "3",
    number: "INV-2024-003",
    customer: "Carlos López",
    concept: "Tour Europeo",
    amount: 8500000,
    status: "paid",
    issueDate: "2024-02-13",
    dueDate: "2024-02-23",
    paymentDate: "2024-02-18",
  },
  {
    id: "4",
    number: "INV-2024-004",
    customer: "Ana Rodríguez",
    concept: "Ruta del Café",
    amount: 1200000,
    status: "paid",
    issueDate: "2024-02-12",
    dueDate: "2024-02-22",
    paymentDate: "2024-02-16",
  },
  {
    id: "5",
    number: "INV-2024-005",
    customer: "Luis Martínez",
    concept: "Expedición Amazónica",
    amount: 2450000,
    status: "overdue",
    issueDate: "2024-01-15",
    dueDate: "2024-01-25",
  },
]

export function InvoicesTable() {
  const [invoices] = useState<Invoice[]>(mockInvoices)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.concept.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagada"
      case "pending":
        return "Pendiente"
      case "overdue":
        return "Vencida"
      case "cancelled":
        return "Cancelada"
      default:
        return status
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
          <CardTitle>Facturas Electrónicas</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar facturas..."
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
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Vencimiento</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {invoice.number}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{invoice.customer}</TableCell>
                <TableCell>{invoice.concept}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(invoice.status)}>{getStatusText(invoice.status)}</Badge>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(invoice.amount)}</TableCell>
                <TableCell className="text-sm">
                  <div>{new Date(invoice.dueDate).toLocaleDateString("es-CO")}</div>
                  {invoice.paymentDate && (
                    <div className="text-muted-foreground text-xs">
                      Pagada: {new Date(invoice.paymentDate).toLocaleDateString("es-CO")}
                    </div>
                  )}
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Factura
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar por Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {invoice.status === "pending" && <DropdownMenuItem>Marcar como Pagada</DropdownMenuItem>}
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
