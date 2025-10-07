"use client"

import { RolesHeader } from "@/components/roles/roles-header"
import { RolesStats } from "@/components/roles/roles-stats"
import { RolesTable } from "@/components/roles/roles-table"
import { RoleProvider } from "@/contexts/RoleContext"

export default function RolesPage() {
  const handleExport = () => {
    // Implementar exportación de roles
    console.log("Exportando roles...")
  }

  const handleRoleCreated = () => {
    // Los roles se refrescarán automáticamente a través del contexto
    console.log("Rol creado exitosamente")
  }

  return (
    <RoleProvider>
      <div className="space-y-6">
        <RolesHeader onExport={handleExport} onRoleCreated={handleRoleCreated} />
        <RolesStats />
        <RolesTable />
      </div>
    </RoleProvider>
  )
}
