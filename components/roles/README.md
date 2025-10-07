# Roles Management System

Este módulo proporciona una gestión completa de roles y asignaciones de usuarios en el sistema de agencia de viajes.

## Estructura de Archivos

```
components/roles/
├── index.ts                     # Exportaciones de todos los componentes
├── roles-table.tsx             # Tabla principal de roles
├── roles-header.tsx            # Encabezado con acciones principales
├── roles-stats.tsx             # Estadísticas de roles y usuarios
├── roles-form.tsx              # Formulario reutilizable para roles
├── create-role-dialog.tsx      # Diálogo para crear nuevos roles
├── edit-role-dialog.tsx        # Diálogo para editar roles existentes
├── delete-role-dialog.tsx      # Diálogo para eliminar roles
├── role-selection-dialog.tsx   # Diálogo para seleccionar roles
├── assign-role-dialog.tsx      # Diálogo para asignar/remover roles de usuarios
├── role-actions-menu.tsx       # Menú de acciones para cada rol
└── README.md                   # Esta documentación
```

## Servicios

### roleService.ts
Ubicado en `services/roleService.ts`, proporciona todas las funciones para interactuar con la API:

#### Gestión de Roles
- `getRoles()` - Obtener todos los roles
- `getRoleById(id)` - Obtener rol por ID
- `createRole(role)` - Crear nuevo rol
- `updateRole(id, role)` - Actualizar rol existente
- `deleteRole(id)` - Eliminar rol

#### Gestión de Asignaciones Usuario-Rol
- `getUserRoles()` - Obtener todas las asignaciones
- `getUserRoleById(id)` - Obtener asignación por ID
- `getRolesByUser(userId)` - Obtener roles de un usuario específico
- `getUsersByRole(roleId)` - Obtener usuarios con un rol específico
- `assignRoleToUser(userId, roleId)` - Asignar rol a usuario
- `removeUserRole(id)` - Remover asignación de rol

## Contexto

### RoleContext.tsx
Ubicado en `contexts/RoleContext.tsx`, proporciona estado global para la gestión de roles:

```typescript
interface RoleContextType {
  roles: Role[]
  refreshRoles: () => Promise<void>
  isLoading: boolean
  error: string | null
}
```

## Página Principal

### app/dashboard/roles/page.tsx
Página principal que integra todos los componentes de roles:

```typescript
export default function RolesPage() {
  return (
    <RoleProvider>
      <div className="space-y-6">
        <RolesHeader />
        <RolesStats />
        <RolesTable />
      </div>
    </RoleProvider>
  )
}
```

## Funcionalidades

### 1. Gestión de Roles
- ✅ Listar todos los roles
- ✅ Crear nuevos roles
- ✅ Editar roles existentes
- ✅ Eliminar roles
- ✅ Búsqueda y filtrado

### 2. Asignación de Roles
- ✅ Asignar roles a usuarios
- ✅ Remover roles de usuarios
- ✅ Ver asignaciones existentes
- ✅ Búsqueda de asignaciones

### 3. Estadísticas
- ✅ Total de roles
- ✅ Total de usuarios
- ✅ Usuarios con roles asignados
- ✅ Usuarios sin roles

## API Endpoints

El sistema utiliza los siguientes endpoints del backend:

### Roles
- `GET /api/roles` - Listar roles
- `GET /api/roles/{id}` - Obtener rol por ID
- `POST /api/roles` - Crear rol
- `PUT /api/roles/{id}` - Actualizar rol
- `DELETE /api/roles/{id}` - Eliminar rol

### Asignaciones Usuario-Rol
- `GET /api/user-role` - Listar asignaciones
- `GET /api/user-role/{id}` - Obtener asignación por ID
- `GET /api/user-role/user/{userId}` - Roles por usuario
- `GET /api/user-role/role/{roleId}` - Usuarios por rol
- `POST /api/user-role/user/{userId}/role/{roleId}` - Asignar rol
- `DELETE /api/user-role/{id}` - Remover asignación

## Modelos de Datos

### Role
```typescript
interface Role {
  _id?: string
  name: string
  description: string
}
```

### UserRole
```typescript
interface UserRole {
  _id?: string
  userId: string
  roleId: string
  user?: {
    _id: string
    name: string
    email: string
  }
  role?: {
    _id: string
    name: string
    description: string
  }
}
```

## Uso

### Importar Componentes
```typescript
import { RolesTable, RolesHeader, RolesStats } from "@/components/roles"
```

### Usar Contexto
```typescript
import { useRoles } from "@/contexts/RoleContext"

function MyComponent() {
  const { roles, refreshRoles, isLoading, error } = useRoles()
  // ...
}
```

### Usar Servicios
```typescript
import { getRoles, createRole, assignRoleToUser } from "@/services/roleService"

// Obtener roles
const roles = await getRoles()

// Crear rol
const newRole = await createRole({ name: "Editor", description: "Puede editar contenido" })

// Asignar rol
await assignRoleToUser("userId", "roleId")
```

## Características Técnicas

- **TypeScript**: Completamente tipado
- **React Hooks**: Uso de hooks modernos
- **Context API**: Estado global para roles
- **Error Handling**: Manejo robusto de errores
- **Loading States**: Estados de carga en todas las operaciones
- **Toast Notifications**: Notificaciones de éxito/error
- **Responsive Design**: Diseño adaptable a diferentes pantallas
- **Accessibility**: Componentes accesibles
- **Form Validation**: Validación de formularios
- **Search & Filter**: Búsqueda y filtrado en tiempo real

## Dependencias

- `@/components/users/ui/*` - Componentes UI base
- `@/services/roleService` - Servicios de API
- `@/contexts/RoleContext` - Contexto de roles
- `@/hooks/use-toast` - Hook para notificaciones
- `lucide-react` - Iconos
- `axios` - Cliente HTTP
