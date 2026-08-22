'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { IconoCargando, IconoCheck, IconoDescarga } from '@/components/ui/icons';
import { contactoWeb } from '@/infrastructure/contacto-web';
import styles from '@/components/features/FormularioRecurso.module.css';

const PATRON_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface FormularioRecursoProps {
  recurso: string;
}

export function FormularioRecurso({ recurso }: FormularioRecursoProps) {
  const [email, setEmail] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError('');

    if (!PATRON_EMAIL.test(email)) {
      setError('Introduce un email válido para enviarte el documento.');
      return;
    }
    if (!aceptaPrivacidad) {
      setError('Debes aceptar la política de privacidad para recibir el documento.');
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await contactoWeb.enviar({
        nombre: '',
        email: email.trim(),
        telefono: '',
        empresa: '',
        mensaje: `Solicitud del recurso descargable: ${recurso}`,
        origen: '/recursos',
      });
      if (respuesta.ok) {
        setEnviado(true);
      } else {
        console.error('[Recursos] Error solicitando el documento:', respuesta.error);
        setError('No hemos podido registrar tu solicitud. Inténtalo de nuevo.');
      }
    } catch (excepcion) {
      console.error('[Recursos] Error solicitando el documento:', excepcion);
      setError('No hemos podido registrar tu solicitud. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className={styles.confirmacion}>
        <IconoCheck className={styles.iconoConfirmacion} />
        <div>
          <p className={styles.tituloConfirmacion}>Solicitud registrada</p>
          <p className={styles.textoConfirmacion}>
            Te enviaremos el checklist en PDF a <strong>{email}</strong>. Revisa también la
            carpeta de spam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className={styles.formulario} noValidate>
      <div>
        <Label htmlFor="recurso-email" className={styles.etiqueta}>
          Tu email profesional
        </Label>
        <Input
          id="recurso-email"
          type="email"
          placeholder="tu@empresa.com"
          autoComplete="email"
          required
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          className={styles.control}
        />
      </div>

      <label className={styles.consentimiento}>
        <input
          type="checkbox"
          checked={aceptaPrivacidad}
          onChange={(evento) => setAceptaPrivacidad(evento.target.checked)}
          className={styles.casilla}
        />
        <span className={styles.textoConsentimiento}>
          Acepto la{' '}
          <Link href="/privacidad" className={styles.enlaceConsentimiento}>
            política de privacidad
          </Link>{' '}
          y recibir el documento por email. Puedes darte de baja en cualquier momento.
        </span>
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" size="lg" className={styles.botonDescargar} disabled={enviando}>
        {enviando ? (
          <IconoCargando className={`${styles.iconoBoton} ${styles.girando}`} />
        ) : (
          <IconoDescarga className={styles.iconoBoton} />
        )}
        Descargar el checklist gratis
      </Button>
      <p className={styles.nota}>
        Sin registro, sin llamada comercial. Solo el email para enviarte el documento.
      </p>
    </form>
  );
}
