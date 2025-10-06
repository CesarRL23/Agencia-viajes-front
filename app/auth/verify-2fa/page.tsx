'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { validate2FA } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function Verify2FA() {
  const [code, setCode] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const email = searchParams.get('email') || '';
  const sessionId = searchParams.get('sessionId') || '';

  const handleVerify = async () => {
    try {
      const res = await validate2FA(email, code, sessionId);

      if (res.token) {
        toast({ title: 'Inicio de sesión exitoso', description: 'Bienvenido de nuevo!' });
        router.replace('/dashboard');
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error de validación',
        description: err.message || 'Código inválido',
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-semibold text-center">Verificación 2FA</h1>
      <Input
        placeholder="Ingresa el código enviado a tu correo"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button className="w-full" onClick={handleVerify}>
        Verificar
      </Button>
    </div>
  );
}
