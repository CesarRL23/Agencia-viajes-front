"use client";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { assignRole } from "@/services/roleService";

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
      await assignRole(selectedUser, selectedRole);

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

      <button
        onClick={handleAssignRole}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Asignar Rol
      </button>

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
