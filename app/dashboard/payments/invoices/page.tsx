import { InvoicesHeader } from "@/components/payments/invoices/invoices-header"
import { InvoicesTable } from "@/components/payments/invoices/invoices-table"
import { InvoicesStats } from "@/components/payments/invoices/invoices-stats"

export default function InvoicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <InvoicesHeader />
      <InvoicesStats />
      <InvoicesTable />
    </div>
  )
}
