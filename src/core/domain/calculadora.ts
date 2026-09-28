import type { Centimos } from '@/core/domain/importe';

export type ServicioEmpresaId = 'laboral' | 'juridico' | 'fiscal';

export type ModalidadId = 'laboral' | 'juridico' | 'pack';

export interface TramoPlantilla {
  desde: number;
  hasta: number;
}

export interface TramoLaboral extends TramoPlantilla {
  nomina: Centimos;
  gestion: Centimos;
}

export interface TramoJuridico extends TramoPlantilla {
  cuota: Centimos;
  perfil: string;
}

export interface OpcionServicio {
  id: ServicioEmpresaId;
  label: string;
  descripcion: string;
  etiqueta?: string;
}

export interface Modalidad {
  id: ModalidadId;
  nombre: string;
  contenido: string;
  servicios: ServicioEmpresaId[];
}

export interface DatosSimulacion {
  num_trabajadores: number;
  servicios: ServicioEmpresaId[];
}

export interface LineaCuota {
  servicio: ServicioEmpresaId;
  etiqueta: string;
  detalle: string;
  importe: Centimos | null;
}

export interface CotizacionModalidad extends Modalidad {
  cuotaMensual: Centimos | null;
  primerMes: Centimos | null;
  ahorroMensual: Centimos | null;
}

export interface ResultadoCuota {
  trabajadores: number;
  lineas: LineaCuota[];
  modalidad: ModalidadId | null;
  descuentoPack: Centimos | null;
  cuotaMensual: Centimos | null;
  descuentoPrimerMes: Centimos | null;
  primerMes: Centimos | null;
  requierePresupuesto: boolean;
  incluyeFiscal: boolean;
  incluyeJuridico: boolean;
}

/** Tarifa laboral por trabajador y mes, según el tamaño total de la plantilla. */
export const TARIFA_LABORAL: TramoLaboral[] = [
  { desde: 1, hasta: 10, nomina: 1500, gestion: 1000 },
  { desde: 11, hasta: 50, nomina: 1200, gestion: 700 },
  { desde: 51, hasta: 100, nomina: 1200, gestion: 500 },
];

/** Cuota mensual del departamento jurídico según el número de trabajadores en alta. */
export const TARIFA_JURIDICA: TramoJuridico[] = [
  { desde: 1, hasta: 10, cuota: 14997, perfil: 'Microempresa' },
  { desde: 11, hasta: 25, cuota: 19997, perfil: 'Pequeña empresa' },
  { desde: 26, hasta: 50, cuota: 24997, perfil: 'Empresa en crecimiento' },
  { desde: 51, hasta: 75, cuota: 29997, perfil: 'Empresa consolidada' },
  { desde: 76, hasta: 100, cuota: 34997, perfil: 'Mediana empresa' },
];

/** A partir de esta plantilla, laboral y jurídico se presupuestan a medida. */
export const MAXIMO_TRABAJADORES_TARIFA = 100;

/**
 * Pack laboral + jurídico: el departamento jurídico mantiene su tarifa y la asesoría
 * laboral se abarata por cada trabajador (10 trabajadores: 399,97 € → 339,97 €).
 */
export const DESCUENTO_PACK_POR_TRABAJADOR: Centimos = 600;

/** Promoción para nuevas altas del departamento jurídico contratado sin el pack. */
export const DESCUENTO_PRIMER_MES_JURIDICO_PORCENTAJE = 20;

export const PROMOCION_PRIMER_MES_JURIDICO = `${DESCUENTO_PRIMER_MES_JURIDICO_PORCENTAJE} % de descuento el 1.er mes`;

/** Plantilla de referencia para los precios de ejemplo publicados. */
export const TRABAJADORES_EJEMPLO = 10;

export const OPCIONES_SERVICIOS: OpcionServicio[] = [
  {
    id: 'laboral',
    label: 'Asesoría laboral',
    descripcion: 'Nóminas, seguros sociales, contratos, altas y bajas',
  },
  {
    id: 'juridico',
    label: 'Departamento jurídico',
    descripcion: 'Consultas, cartas de despido y sanción, requerimientos e inspecciones',
    etiqueta: PROMOCION_PRIMER_MES_JURIDICO,
  },
  {
    id: 'fiscal',
    label: 'Asesoría fiscal y contabilidad',
    descripcion: 'IVA o IGIC, IRPF, cierre del ejercicio e Impuesto sobre Sociedades',
    etiqueta: 'Presupuesto en 24 h',
  },
];

export const MODALIDADES: Modalidad[] = [
  {
    id: 'laboral',
    nombre: 'Solo laboral',
    contenido: 'Nóminas y gestión',
    servicios: ['laboral'],
  },
  {
    id: 'juridico',
    nombre: 'Solo jurídico',
    contenido: 'Departamento jurídico',
    servicios: ['juridico'],
  },
  {
    id: 'pack',
    nombre: 'Pack laboral + jurídico',
    contenido: 'Ambos, con descuento',
    servicios: ['laboral', 'juridico'],
  },
];

export function etiquetaTramo(tramo: TramoPlantilla): string {
  return `${tramo.desde} – ${tramo.hasta} trabajadores`;
}

export function etiquetaTrabajadores(trabajadores: number): string {
  return `${trabajadores} ${trabajadores === 1 ? 'trabajador' : 'trabajadores'}`;
}
