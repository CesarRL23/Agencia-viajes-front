import { TripDetails } from "@/components/trips/trip-details"
import { TripItinerary } from "@/components/trips/trip-itinerary"
import { TripParticipants } from "@/components/trips/trip-participants"
import { TripActions } from "@/components/trips/trip-actions"

export default function TripDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <TripActions tripId={params.id} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <TripDetails tripId={params.id} />
          <TripItinerary tripId={params.id} />
        </div>
        <div>
          <TripParticipants tripId={params.id} />
        </div>
      </div>
    </div>
  )
}
