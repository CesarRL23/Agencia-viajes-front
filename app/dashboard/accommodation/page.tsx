import { AccommodationHeader } from "@/components/accommodation/accommodation-header"
import { AccommodationStats } from "@/components/accommodation/accommodation-stats"
import { AccommodationTable } from "@/components/accommodation/accommodation-table"

export default function AccommodationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <AccommodationHeader />
      <AccommodationStats />
      <AccommodationTable />
    </div>
  )
}
