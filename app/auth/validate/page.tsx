"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ValidatePage() {
  const router = useRouter()
  const params = useSearchParams()
  const sessionId = params.get("sessionId")
  const userId = params.get("userId")

  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8080/validate2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, sessionId, code }),
      })

      if (!res.ok) throw new Error("Error en validación")

      const data = await res.json()
      // Guardar JWT
      localStorage.setItem("token", data.token)

      router.push("/dashboard") // redirigir al home
    } catch (err) {
      console.error(err)
      alert("Código inválido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Validación 2FA</h1>
          <p className="text-muted-foreground">Ingresa el código enviado a tu correo</p>
        </div>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Validar Código</CardTitle>
            <CardDescription className="text-center">
              Revisa tu correo e ingresa el código para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleValidate} className="space-y-4">
              <Input
                type="text"
                placeholder="Código 2FA"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Validando..." : "Validar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
