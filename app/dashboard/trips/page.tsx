import { TripsHeader } from "@/components/trips/trips-header"
import { TripsStats } from "@/components/trips/trips-stats"
import { TripsTable } from "@/components/trips/trips-table"

export default function TripsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <TripsHeader />
      <TripsStats />
      <TripsTable />
    </div>
  )
}
