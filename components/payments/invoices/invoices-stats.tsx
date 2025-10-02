import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function InvoicesStats() {
  const stats = [
    {
      title: "Total Facturas",
      value: "198",
      description: "+24 este mes",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Pagadas",
      value: "186",
      description: "94% del total",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pendientes",
      value: "12",
      description: "6% del total",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Vencidas",
      value: "3",
      description: "Requieren seguimiento",
      icon: AlertCircle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
