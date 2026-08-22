import type { RespuestaApi } from '@/core/ports/respuesta-api';

export interface MensajeContacto {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  plan?: string;
  forma_juridica?: string;
  num_trabajadores?: string;
  nif?: string;
  asesoria_actual?: string;
  origen: string;
}

export interface ContactoGateway {
  enviar(mensaje: MensajeContacto): Promise<RespuestaApi>;
}
