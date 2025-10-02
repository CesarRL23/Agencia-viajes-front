import { TripTrackingMap } from "@/components/trips/trip-tracking-map"
import { VehicleStatus } from "@/components/trips/vehicle-status"
import { TrackingControls } from "@/components/trips/tracking-controls"

export default function TripTrackingPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Seguimiento GPS</h2>
          <p className="text-muted-foreground">Ubicación en tiempo real de vehículos y participantes</p>
        </div>
        <TrackingControls tripId={params.id} />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <TripTrackingMap tripId={params.id} />
        </div>
        <div>
          <VehicleStatus tripId={params.id} />
        </div>
      </div>
    </div>
  )
}
