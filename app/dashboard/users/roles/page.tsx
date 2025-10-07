"use client";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { assignRoleToUser, getRoles, getUsersByRole, getRolesByUser } from "@/services/roleService";
import { getUsers } from "@/services/userService";
import type { User as ServiceUser } from "@/services/userService";
import type { Role as ServiceRole } from "@/services/roleService";
import { useRouter } from "next/navigation";

type User = ServiceUser;
type Role = ServiceRole;

export default function RolesPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [assignedRoles, setAssignedRoles] = useState<
    { userName: string; role: string }[]
  >([]);

  // Estados para búsquedas
  const [nameQuery, setNameQuery] = useState<string>("");
  const [roleSearchId, setRoleSearchId] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{ userName: string; roleName: string }[]>([]);


  // ✅ Cargar los usuarios desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Cargar roles desde el backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al cargar los roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      // Enviar al backend
      await assignRoleToUser(selectedUser, selectedRole);

      const user = users.find((u) => u._id === selectedUser);
      if (!user) return;

      // Mostrar en la tabla local (visual)
      const roleName = roles.find(r => r._id === selectedRole)?.name || selectedRole;
      const newAssignment = { userName: user.name, role: roleName };
      setAssignedRoles((prev) => [...prev, newAssignment]);

      // Limpiar los selects
      setSelectedUser("");
      setSelectedRole("");

      alert("✅ Rol asignado correctamente");
    } catch (error) {
      console.error("Error al asignar el rol:", error);
      alert("❌ No se pudo asignar el rol");
    }
  };

  // 🔎 Buscar usuarios por nombre (cliente llama endpoint de usuarios)
  const handleSearchByName = async () => {
    try {
      const allUsers = await getUsers();
      const matchingUsers = allUsers.filter(u => u.name?.toLowerCase().includes(nameQuery.trim().toLowerCase()));

      // Para cada usuario, consultar sus roles y concatenar los nombres
      const rows = await Promise.all(
        matchingUsers.map(async (u) => {
          try {
            const userRoles = await getRolesByUser(u._id as string);
            const roleNames = (userRoles || [])
              .map((ur: any) => ur?.role?.name)
              .filter(Boolean)
              .join(", ");
            return { userName: u.name, roleName: roleNames };
          } catch {
            return { userName: u.name, roleName: "" };
          }
        })
      );

      setSearchResults(rows);
    } catch (error) {
      console.error("Error en búsqueda por nombre:", error);
      setSearchResults([]);
    }
  };

  // 🔎 Buscar usuarios por rol (servidor: /api/user-role/role/{roleId})
  const handleSearchByRole = async () => {
    if (!roleSearchId) return;
    try {
      const list = await getUsersByRole(roleSearchId);
      const rows = list.map((ur: any) => ({
        userName: ur?.user?.name || "",
        roleName: ur?.role?.name || roles.find(r => r._id === roleSearchId)?.name || "",
      }));
      setSearchResults(rows);
    } catch (error) {
      console.error("Error en búsqueda por rol:", error);
      setSearchResults([]);
    }
  };

  const handleGoToRolesManagement = () => {
    router.push("/dashboard/roles");
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Roles</h1>
      </div>

      {/* Buscadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Buscar por nombre */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Buscar usuario por nombre</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: Juan"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearchByName}
            className="whitespace-nowrap bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Buscar usuario
          </button>
        </div>

        {/* Buscar por rol */}
        <div className="flex items-end gap-2 md:col-span-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Buscar usuarios por rol</label>
            <Select
              label="Seleccionar Rol"
              selectedKeys={roleSearchId ? [roleSearchId] : []}
              onSelectionChange={(keys) => setRoleSearchId(Array.from(keys)[0] as string)}
              classNames={{ popoverContent: "bg-white shadow-md" }}
            >
              {roles.map((role) => (
                <SelectItem key={role._id} value={role._id}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <button
            onClick={handleSearchByRole}
            className="whitespace-nowrap bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Buscar por rol
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Select de usuarios */}
        <Select
          label="Seleccionar Usuario"
          selectedKeys={selectedUser ? [selectedUser] : []}
          onSelectionChange={(keys) => setSelectedUser(Array.from(keys)[0] as string)}
          classNames={{
            popoverContent: "bg-white shadow-md", // 👈 fondo blanco al desplegar
          }}
        >
          {users.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              {user.name} ({user.email})
            </SelectItem>
          ))}
        </Select>

        {/* Select de roles */}
        <Select
              label="Seleccionar Rol"
              selectedKeys={selectedRole ? [selectedRole] : []}
              onSelectionChange={(keys) => setSelectedRole(Array.from(keys)[0] as string)}
              classNames={{
                popoverContent: "bg-white shadow-md",
              }}
            >
              {roles.map((role) => (
                <SelectItem key={role._id} value={role._id}>
                  {role.name}
                </SelectItem>
              ))}
        </Select>

      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAssignRole}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Asignar Rol
        </button>
        
        <button
          onClick={handleGoToRolesManagement}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Gestión Completa de Roles
        </button>
      </div>  

      {/* Resultados de búsqueda */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Resultados</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Usuario</th>
            <th className="border px-4 py-2 text-left">Rol Asignado</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.userName}</td>
              <td className="border px-4 py-2">{item.roleName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla histórica local de asignaciones hechas en esta sesión */}
  
      
    </div>
  );
}
