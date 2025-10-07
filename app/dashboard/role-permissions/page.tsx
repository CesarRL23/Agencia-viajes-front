"use client"

import { RolePermissionsHeader } from "@/components/role-permissions/role-permissions-header"
import { RolePermissionsStats } from "@/components/role-permissions/role-permissions-stats"
import { RolePermissionsTable } from "@/components/role-permissions/role-permissions-table"

export default function RolePermissionsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <RolePermissionsHeader />
      <RolePermissionsStats />
      <RolePermissionsTable />
    </div>
  )
}
