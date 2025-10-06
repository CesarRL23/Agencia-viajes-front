'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Separator } from "@/components/users/ui/separator"
import { Eye, EyeOff, Mail, Lock, Chrome, Github } from "lucide-react"
import { useToast } from "@/components/users/ui/use-toast"
import Link from "next/link"
import { loginWithProvider, loginWithEmail } from "@/services/authService"
import ReCAPTCHA from "react-google-recaptcha"

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  // 🟢 Login con Google / GitHub / Microsoft (Firebase)
  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true)
      const userData = await loginWithProvider(provider)

      if (!userData) {
        throw new Error("No se pudo obtener la información del usuario")
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido ${userData.name}!`,
        duration: 3000,
      })

      router.replace("/dashboard")
    } catch (error: any) {
      console.error("Error de login:", error)
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: error.message || "Hubo un problema al intentar iniciar sesión",
        duration: 5000,
      })
      localStorage.removeItem("firebaseToken")
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }

  // 🧠 Login con correo y contraseña (flujo backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaToken) {
      toast({
        variant: "destructive",
        title: "Captcha requerido",
        description: "Por favor valida que no eres un robot",
      })
      return
    }

    setIsLoading(true)
    try {
      const res = await loginWithEmail(formData.email, formData.password)

      if (res.sessionId) {
        toast({
          title: "Código enviado",
          description: "Revisa tu correo y verifica el código de autenticación.",
        })
        router.push(`/auth/verify-2fa?email=${formData.email}&sessionId=${res.sessionId}`)
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Credenciales inválidas",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
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

        {/* Password */}
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

        {/* reCAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            onChange={(token) => setRecaptchaToken(token)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      {/* Separador social login */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
        </div>
      </div>

      {/* Social buttons */}
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
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <Github className="h-4 w-4" />
          {isLoading && "github" && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">¿No tienes una cuenta? </span>
        <Link href="/auth/register" className="text-primary hover:underline">
          Regístrate
        </Link>
      </div>
    </div>
  )
}
