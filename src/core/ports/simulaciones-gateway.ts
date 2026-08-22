import type { LineaCuota, DatosSimulacion } from '@/core/domain/calculadora';
import type { RespuestaApi } from '@/core/ports/respuesta-api';

export type { RespuestaApi };

export interface SimulacionPayload extends DatosSimulacion {
  total_primer_mes: number | null;
  total_recurrente: number | null;
  total_360: number | null;
  presupuesto_personalizado: boolean;
  desglose: LineaCuota[];
  origen: string;
}

export interface PropuestaPayload extends SimulacionPayload {
  simulacion_id: string | null;
  email: string;
}

export interface SimulacionesGateway {
  crear(payload: SimulacionPayload): Promise<RespuestaApi<{ _id: string }>>;
  actualizar(id: string, payload: SimulacionPayload): Promise<RespuestaApi>;
  enviarPropuesta(payload: PropuestaPayload): Promise<RespuestaApi>;
}
