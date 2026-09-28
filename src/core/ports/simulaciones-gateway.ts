import type { DatosSimulacion, LineaCuota, ModalidadId } from '@/core/domain/calculadora';
import type { Centimos } from '@/core/domain/importe';
import type { RespuestaApi } from '@/core/ports/respuesta-api';

export type { RespuestaApi };

export interface SimulacionPayload extends DatosSimulacion {
  modalidad: ModalidadId | null;
  cuota_mensual: Centimos | null;
  primer_mes: Centimos | null;
  descuento_pack: Centimos | null;
  presupuesto_personalizado: boolean;
  presupuesto_fiscal: boolean;
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
