import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, FileText, TrendingUp } from "lucide-react"

export function PaymentsStats() {
  const stats = [
    {
      title: "Ingresos del Mes",
      value: "$125,430",
      description: "+18% vs mes anterior",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pagos Procesados",
      value: "284",
      description: "156 completados",
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "Facturas Generadas",
      value: "198",
      description: "12 pendientes",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Cuotas Activas",
      value: "67",
      description: "23 vencen esta semana",
      icon: TrendingUp,
      color: "text-orange-600",
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
