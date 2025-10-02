import { RolesHeader } from "@/components/users/roles/roles-header"
import { RolesTable } from "@/components/users/roles/roles-table"
import { PermissionsMatrix } from "@/components/users/roles/permissions-matrix"

export default function RolesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <RolesHeader />
      <div className="grid gap-4 lg:grid-cols-2">
        <RolesTable />
        <PermissionsMatrix />
      </div>
    </div>
  )
}
