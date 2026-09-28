import type { RespuestaApi } from '@/core/ports/respuesta-api';

export interface DetalleSolicitud {
  etiqueta: string;
  valor: string;
}

export interface MensajeContacto {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  asunto?: string;
  detalles?: DetalleSolicitud[];
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
