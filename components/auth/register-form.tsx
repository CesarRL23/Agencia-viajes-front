"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, Chrome, Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { registerUser, loginWithProvider } from "@/services/authService"

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "La contraseña debe tener al menos 6 caracteres",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      toast({
        title: "Cuenta creada exitosamente",
        description: `Bienvenido ${response.name}! Tu cuenta ha sido creada correctamente.`,
        duration: 3000,
      })

      // Redirigir al login después del registro exitoso
      router.push("/auth/login")
    } catch (error: any) {
      console.error("Error en registro:", error)
      toast({
        variant: "destructive",
        title: "Error al crear cuenta",
        description: error.message || "Hubo un problema al crear tu cuenta",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true)
      const userData = await loginWithProvider(provider)

      if (!userData) {
        throw new Error("No se pudo obtener la información del usuario")
      }

      toast({
        title: "Registro exitoso",
        description: `Bienvenido ${userData.name}! Tu cuenta ha sido creada correctamente.`,
        duration: 3000,
      })

      router.replace("/dashboard")
    } catch (error: any) {
      console.error("Error de registro:", error)
      toast({
        variant: "destructive",
        title: "Error al registrarse",
        description: error.message || "Hubo un problema al crear tu cuenta",
        duration: 5000,
      })
      localStorage.removeItem("firebaseToken")
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              className="pl-10"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="pl-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O regístrate con</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin("google")} 
          className="w-full"
          disabled={isLoading}
        >
          <Chrome className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin("microsoft")} 
          className="w-full"
          disabled={isLoading}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
          </svg>
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin("github")} 
          className="w-full"
          disabled={isLoading}
        >
          <Github className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">¿Ya tienes una cuenta? </span>
        <Link href="/auth/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </div>
    </div>
  )
}
