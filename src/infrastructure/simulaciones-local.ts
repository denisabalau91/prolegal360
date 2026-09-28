import { formatearImporte, type Centimos } from '@/core/domain/importe';
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

function importeEnTexto(centimos: Centimos | null): string {
  return centimos === null ? 'presupuesto personalizado' : formatearImporte(centimos);
}

function cuerpoPropuesta(payload: PropuestaPayload): string {
  const desglose = payload.desglose.map(
    (linea) =>
      `- ${linea.etiqueta} (${linea.detalle}): ${
        linea.importe === null ? 'a presupuestar' : formatearImporte(linea.importe)
      }`,
  );
  if (payload.descuento_pack !== null) {
    desglose.push(`- Descuento pack laboral + jurídico: −${formatearImporte(payload.descuento_pack)}`);
  }

  const totales = [
    `Cuota mensual: ${importeEnTexto(payload.cuota_mensual)}`,
    `Primer mes: ${importeEnTexto(payload.primer_mes)}`,
  ];
  if (payload.presupuesto_fiscal) {
    totales.push('Quiero también el presupuesto de asesoría fiscal y contabilidad.');
  }

  return [
    `Hola, soy ${payload.email} y me gustaría recibir esta propuesta:`,
    '',
    `Trabajadores: ${payload.num_trabajadores}`,
    '',
    ...desglose,
    '',
    ...totales,
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
