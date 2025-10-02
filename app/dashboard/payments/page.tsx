import { PaymentsHeader } from "@/components/payments/payments-header"
import { PaymentsStats } from "@/components/payments/payments-stats"
import { PaymentsTable } from "@/components/payments/payments-table"

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PaymentsHeader />
      <PaymentsStats />
      <PaymentsTable />
    </div>
  )
}
