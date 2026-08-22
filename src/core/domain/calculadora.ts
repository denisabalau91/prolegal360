export type FormaJuridica = 'autonomo' | 'sociedad';

export type RangoFacturas = 'menos_50' | '50_100' | '101_200' | 'mas_200';

export type PilarId = 'laboral' | 'fiscal' | 'juridico';

export interface OpcionFacturas {
  value: RangoFacturas;
  label: string;
}

export interface OpcionPilar {
  id: PilarId;
  label: string;
  descripcion: string;
  etiqueta?: string;
}

export interface DatosSimulacion {
  forma_juridica: FormaJuridica;
  num_trabajadores: number;
  num_facturas: RangoFacturas;
  pilares: PilarId[];
}

export interface LineaCuota {
  pilar: PilarId;
  etiqueta: string;
  detalle: string;
  importe: number | null;
  presupuesto: boolean;
  desmarcado: boolean;
  gratisPrimerMes?: boolean;
}

export interface ResultadoCuota {
  lineas: LineaCuota[];
  subtotal: number | null;
  totalRecurrente: number | null;
  totalPrimerMes: number | null;
  total360: number | null;
  ahorro360: number | null;
  importeJuridico: number | null;
  aplica360: boolean;
  requierePresupuesto: boolean;
  juridicoDesmarcado: boolean;
}

export const OPCIONES_FACTURAS: OpcionFacturas[] = [
  { value: 'menos_50', label: 'Menos de 50' },
  { value: '50_100', label: 'Entre 50 y 100' },
  { value: '101_200', label: 'Entre 101 y 200' },
  { value: 'mas_200', label: 'Más de 200' },
];

export const OPCIONES_PILARES: OpcionPilar[] = [
  {
    id: 'laboral',
    label: 'Asesoría laboral',
    descripcion: 'Nóminas, seguros sociales, contratos, altas y bajas',
  },
  {
    id: 'fiscal',
    label: 'Asesoría fiscal',
    descripcion: 'IVA, IRPF, pagos fraccionados e Impuesto sobre Sociedades',
  },
  {
    id: 'juridico',
    label: 'Departamento jurídico',
    descripcion: 'Consultas ilimitadas, despidos, inspecciones y requerimientos',
    etiqueta: '1.er mes gratis',
  },
];

export function etiquetaFacturas(valor: RangoFacturas): string {
  return OPCIONES_FACTURAS.find((opcion) => opcion.value === valor)?.label ?? valor;
}

export function formatearImporte(importe: number | null): string {
  if (importe == null) {
    return 'Presupuesto personalizado';
  }
  return `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(importe)} €`;
}
