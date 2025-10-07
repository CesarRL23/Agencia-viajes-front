"use client";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { assignRoleToUser } from "@/services/roleService";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Role {
  id: string;
  name: string;
}

export default function RolesPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [assignedRoles, setAssignedRoles] = useState<
    { userName: string; role: string }[]
  >([]);

  const roles: Role[] = [
  { id: "68c32a54748c5b1db0d503bf", name: "Administrador" },
  { id: "68e4344c08bd244ede55532d", name: "Cliente" },
  { id: "68e4343b08bd244ede55532c", name: "Guía Turístico" },
];


  // ✅ Cargar los usuarios desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      // Enviar al backend
      await assignRoleToUser(selectedUser, selectedRole);

      const user = users.find((u) => u._id === selectedUser);
      if (!user) return;

      // Mostrar en la tabla local (visual)
      const newAssignment = { userName: user.name, role: selectedRole };
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

  const handleGoToRolesManagement = () => {
    router.push("/dashboard/roles");
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Roles</h1>
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
                <SelectItem key={role.id} value={role.id}>
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

      <table className="w-full mt-6 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Usuario</th>
            <th className="border px-4 py-2 text-left">Rol Asignado</th>
          </tr>
        </thead>
        <tbody>
          {assignedRoles.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.userName}</td>
              <td className="border px-4 py-2">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
