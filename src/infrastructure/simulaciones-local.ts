import { formatearImporte } from '@/core/domain/calculadora';
import { MARCA } from '@/core/domain/site';
import type {
  PropuestaPayload,
  RespuestaApi,
  SimulacionesGateway,
  SimulacionPayload,
} from '@/core/ports/simulaciones-gateway';
import { enviarFormulario, formularioConfigurado } from '@/infrastructure/formularios-web';

const CLAVE_SIMULACIONES = 'pl360_simulaciones';

interface SimulacionGuardada extends SimulacionPayload {
  _id: string;
  fecha: string;
}

function leerSimulaciones(): SimulacionGuardada[] {
  try {
    const crudo = window.localStorage.getItem(CLAVE_SIMULACIONES);
    return crudo ? (JSON.parse(crudo) as SimulacionGuardada[]) : [];
  } catch {
    return [];
  }
}

function escribirSimulaciones(simulaciones: SimulacionGuardada[]): RespuestaApi {
  try {
    window.localStorage.setItem(CLAVE_SIMULACIONES, JSON.stringify(simulaciones));
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function cuerpoPropuesta(payload: PropuestaPayload): string {
  const lineas = payload.desglose
    .filter((linea) => !linea.desmarcado)
    .map(
      (linea) =>
        `- ${linea.etiqueta} (${linea.detalle}): ${
          linea.presupuesto ? 'a presupuestar' : formatearImporte(linea.importe)
        }`,
    );

  return [
    `Hola, soy ${payload.email} y me gustaría recibir esta propuesta:`,
    '',
    `Forma jurídica: ${payload.forma_juridica === 'autonomo' ? 'Autónomo' : 'Sociedad'}`,
    `Trabajadores: ${payload.num_trabajadores}`,
    `Facturas al mes: ${payload.num_facturas}`,
    '',
    ...lineas,
    '',
    `Primer mes: ${formatearImporte(payload.total_primer_mes)}`,
    `Cuota recurrente: ${formatearImporte(payload.total_recurrente)}/mes`,
  ].join('\n');
}

export const simulacionesLocal: SimulacionesGateway = {
  async crear(payload: SimulacionPayload) {
    const simulacion: SimulacionGuardada = {
      ...payload,
      _id: crypto.randomUUID(),
      fecha: new Date().toISOString(),
    };
    const resultado = escribirSimulaciones([...leerSimulaciones(), simulacion]);
    return resultado.ok
      ? { ok: true, data: { _id: simulacion._id } }
      : { ok: false, error: resultado.error };
  },

  async actualizar(id: string, payload: SimulacionPayload) {
    const simulaciones = leerSimulaciones();
    const indice = simulaciones.findIndex((simulacion) => simulacion._id === id);
    if (indice === -1) {
      return { ok: false, error: 'Simulación no encontrada' };
    }
    simulaciones[indice] = { ...simulaciones[indice], ...payload };
    return escribirSimulaciones(simulaciones);
  },

  async enviarPropuesta(payload: PropuestaPayload) {
    const asunto = 'Propuesta de cuota — Calculadora PROLEGAL360';

    if (formularioConfigurado) {
      return enviarFormulario({
        subject: asunto,
        resumen: cuerpoPropuesta(payload),
        ...payload,
      });
    }

    const destino = `mailto:${MARCA.email}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpoPropuesta(payload))}`;
    window.location.href = destino;
    return { ok: true };
  },
};
