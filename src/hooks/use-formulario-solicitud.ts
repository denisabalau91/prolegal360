'use client';

import { useState, type FormEvent } from 'react';
import type {
  ContactoGateway,
  DetalleSolicitud,
  MensajeContacto,
} from '@/core/ports/contacto-gateway';
import { esEmailValido } from '@/utils/validacion';

const ERROR_ENVIO = 'No hemos podido enviar la solicitud. Inténtalo de nuevo o llámanos.';

export interface ConfiguracionSolicitud {
  origen: string;
  asunto: string;
  detalles: DetalleSolicitud[];
  validarExtra?: () => string | null;
  camposExtra?: Partial<MensajeContacto>;
}

export interface EstadoFormularioSolicitud {
  nombre: string;
  setNombre: (valor: string) => void;
  empresa: string;
  setEmpresa: (valor: string) => void;
  telefono: string;
  setTelefono: (valor: string) => void;
  email: string;
  setEmail: (valor: string) => void;
  mensaje: string;
  setMensaje: (valor: string) => void;
  aceptaPrivacidad: boolean;
  setAceptaPrivacidad: (valor: boolean) => void;
  enviando: boolean;
  enviado: boolean;
  error: string;
  manejarEnvio: (evento: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useFormularioSolicitud(
  gateway: ContactoGateway,
  configuracion: ConfiguracionSolicitud,
): EstadoFormularioSolicitud {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const validar = (): string | null => {
    if (!nombre.trim() || !telefono.trim()) {
      return 'Rellena los campos obligatorios marcados con *.';
    }
    if (!esEmailValido(email)) {
      return 'Introduce un email válido para poder responderte.';
    }
    const errorExtra = configuracion.validarExtra?.();
    if (errorExtra) {
      return errorExtra;
    }
    if (!aceptaPrivacidad) {
      return 'Debes aceptar la política de privacidad para enviar el formulario.';
    }
    return null;
  };

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const errorValidacion = validar();
    setError(errorValidacion ?? '');
    if (errorValidacion) {
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await gateway.enviar({
        ...configuracion.camposExtra,
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        empresa: empresa.trim(),
        mensaje: mensaje.trim(),
        asunto: configuracion.asunto,
        detalles: configuracion.detalles,
        origen: configuracion.origen,
      });
      if (respuesta.ok) {
        setEnviado(true);
      } else {
        console.error(`[${configuracion.origen}] Error enviando la solicitud:`, respuesta.error);
        setError(ERROR_ENVIO);
      }
    } catch (excepcion) {
      console.error(`[${configuracion.origen}] Error enviando la solicitud:`, excepcion);
      setError(ERROR_ENVIO);
    } finally {
      setEnviando(false);
    }
  };

  return {
    nombre,
    setNombre,
    empresa,
    setEmpresa,
    telefono,
    setTelefono,
    email,
    setEmail,
    mensaje,
    setMensaje,
    aceptaPrivacidad,
    setAceptaPrivacidad,
    enviando,
    enviado,
    error,
    manejarEnvio,
  };
}
