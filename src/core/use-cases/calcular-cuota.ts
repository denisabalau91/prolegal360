import {
  DESCUENTO_PACK_POR_TRABAJADOR,
  MAXIMO_TRABAJADORES_TARIFA,
  MODALIDADES,
  TARIFA_JURIDICA,
  TARIFA_LABORAL,
  etiquetaTramo,
  type CotizacionModalidad,
  type DatosSimulacion,
  type LineaCuota,
  type ModalidadId,
  type ResultadoCuota,
  type ServicioEmpresaId,
  type TramoJuridico,
  type TramoLaboral,
  type TramoPlantilla,
} from '@/core/domain/calculadora';
import { formatearImporte, type Centimos } from '@/core/domain/importe';

export interface CuotaLaboral {
  tramo: TramoLaboral;
  nominas: Centimos;
  gestion: Centimos;
  total: Centimos;
}

export function normalizarTrabajadores(valor: number): number {
  return Number.isFinite(valor) && valor >= 1 ? Math.floor(valor) : 1;
}

function buscarTramo<T extends TramoPlantilla>(tramos: T[], trabajadores: number): T | null {
  return tramos.find((tramo) => trabajadores >= tramo.desde && trabajadores <= tramo.hasta) ?? null;
}

export function calcularCuotaLaboral(trabajadores: number): CuotaLaboral | null {
  const n = normalizarTrabajadores(trabajadores);
  const tramo = buscarTramo(TARIFA_LABORAL, n);
  if (!tramo) {
    return null;
  }
  const nominas = tramo.nomina * n;
  const gestion = tramo.gestion * n;
  return { tramo, nominas, gestion, total: nominas + gestion };
}

export function buscarTramoJuridico(trabajadores: number): TramoJuridico | null {
  return buscarTramo(TARIFA_JURIDICA, normalizarTrabajadores(trabajadores));
}

export function calcularDescuentoPack(trabajadores: number): Centimos {
  return DESCUENTO_PACK_POR_TRABAJADOR * normalizarTrabajadores(trabajadores);
}

export function modalidadDeServicios(servicios: ServicioEmpresaId[]): ModalidadId | null {
  const laboral = servicios.includes('laboral');
  const juridico = servicios.includes('juridico');
  if (laboral && juridico) return 'pack';
  if (laboral) return 'laboral';
  if (juridico) return 'juridico';
  return null;
}

function buscarModalidad(id: ModalidadId) {
  const modalidad = MODALIDADES.find((candidata) => candidata.id === id);
  if (!modalidad) {
    throw new Error(`Modalidad desconocida: ${id}`);
  }
  return modalidad;
}

export function cotizarModalidad(id: ModalidadId, trabajadores: number): CotizacionModalidad {
  const modalidad = buscarModalidad(id);
  const laboral = calcularCuotaLaboral(trabajadores)?.total ?? null;
  const juridico = buscarTramoJuridico(trabajadores)?.cuota ?? null;
  const sinTarifa = { ...modalidad, cuotaMensual: null, primerMes: null, ahorroMensual: null };

  if (id === 'laboral') {
    return laboral === null
      ? sinTarifa
      : { ...modalidad, cuotaMensual: laboral, primerMes: laboral, ahorroMensual: null };
  }

  if (juridico === null) {
    return sinTarifa;
  }

  if (id === 'juridico') {
    return { ...modalidad, cuotaMensual: juridico, primerMes: 0, ahorroMensual: null };
  }

  if (laboral === null) {
    return sinTarifa;
  }
  const ahorroMensual = calcularDescuentoPack(trabajadores);
  const cuotaMensual = laboral + juridico - ahorroMensual;
  return { ...modalidad, cuotaMensual, primerMes: cuotaMensual, ahorroMensual };
}

export function cotizarModalidades(trabajadores: number): CotizacionModalidad[] {
  return MODALIDADES.map((modalidad) => cotizarModalidad(modalidad.id, trabajadores));
}

const DETALLE_SIN_TARIFA = `Más de ${MAXIMO_TRABAJADORES_TARIFA} trabajadores: presupuesto personalizado`;

function lineaLaboral(trabajadores: number): LineaCuota {
  const cuota = calcularCuotaLaboral(trabajadores);
  const detalle = cuota
    ? `${trabajadores} × ${formatearImporte(cuota.tramo.nomina)} de nómina + ${trabajadores} × ${formatearImporte(
        cuota.tramo.gestion,
      )} de gestión`
    : DETALLE_SIN_TARIFA;
  return {
    servicio: 'laboral',
    etiqueta: 'Asesoría laboral',
    detalle,
    importe: cuota?.total ?? null,
  };
}

function lineaJuridica(trabajadores: number): LineaCuota {
  const tramo = buscarTramoJuridico(trabajadores);
  return {
    servicio: 'juridico',
    etiqueta: 'Departamento jurídico',
    detalle: tramo ? `Tramo de ${etiquetaTramo(tramo)}` : DETALLE_SIN_TARIFA,
    importe: tramo?.cuota ?? null,
  };
}

const LINEA_FISCAL: LineaCuota = {
  servicio: 'fiscal',
  etiqueta: 'Asesoría fiscal y contabilidad',
  detalle: 'Presupuesto cerrado en 24 h laborables, según tu contabilidad',
  importe: null,
};

export function calcularCuota(datos: DatosSimulacion): ResultadoCuota {
  const trabajadores = normalizarTrabajadores(datos.num_trabajadores);
  const incluye = (servicio: ServicioEmpresaId) => datos.servicios.includes(servicio);

  const lineas: LineaCuota[] = [];
  if (incluye('laboral')) lineas.push(lineaLaboral(trabajadores));
  if (incluye('juridico')) lineas.push(lineaJuridica(trabajadores));
  if (incluye('fiscal')) lineas.push(LINEA_FISCAL);

  const modalidad = modalidadDeServicios(datos.servicios);
  const cotizacion = modalidad ? cotizarModalidad(modalidad, trabajadores) : null;
  const requierePresupuesto = cotizacion !== null && cotizacion.cuotaMensual === null;
  const cuotaMensual = cotizacion?.cuotaMensual ?? null;
  const primerMes = cotizacion?.primerMes ?? null;

  return {
    trabajadores,
    lineas,
    modalidad,
    descuentoPack: modalidad === 'pack' ? (cotizacion?.ahorroMensual ?? null) : null,
    cuotaMensual,
    descuentoPrimerMes:
      cuotaMensual !== null && primerMes !== null && primerMes < cuotaMensual
        ? cuotaMensual - primerMes
        : null,
    primerMes,
    requierePresupuesto,
    incluyeFiscal: incluye('fiscal'),
    incluyeJuridico: incluye('juridico'),
  };
}
