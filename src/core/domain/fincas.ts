import type { Centimos } from '@/core/domain/importe';

export type TipoFinca = 'comunidad' | 'mancomunidad';

export type TarifaFincaId = 'basica' | 'estandar' | 'zen';

export type ZonaComunId =
  | 'piscina'
  | 'garaje'
  | 'padel'
  | 'tenis'
  | 'jardines'
  | 'parque_infantil'
  | 'gimnasio'
  | 'local_social'
  | 'otra';

export interface TarifaFinca {
  id: TarifaFincaId;
  nombre: string;
  contenido: string;
  incluye: string[];
  vivienda: Centimos;
  localGaraje: Centimos;
  destacada?: boolean;
}

export interface ZonaComun {
  id: ZonaComunId;
  nombre: string;
}

export type CantidadesZonas = Partial<Record<ZonaComunId, number>>;

export interface DatosComunidad {
  tipo: 'comunidad';
  viviendas: number;
  locales: number;
  garajes: number;
}

export interface DatosMancomunidad {
  tipo: 'mancomunidad';
  portales: number;
  zonas: CantidadesZonas;
}

export type DatosFinca = DatosComunidad | DatosMancomunidad;

export interface ConceptoPresupuesto {
  cantidad: number;
  unidad: string;
  precioUnitario: Centimos;
  importe: Centimos;
}

export interface PresupuestoTarifaFinca {
  tarifa: TarifaFinca;
  conceptos: ConceptoPresupuesto[];
  cuotaMensual: Centimos;
}

export interface PresupuestoFinca {
  tipo: TipoFinca;
  presupuestos: PresupuestoTarifaFinca[];
}

/** Precios por unidad y mes. Los locales y las plazas de garaje comparten precio. */
export const TARIFAS_FINCA: TarifaFinca[] = [
  {
    id: 'basica',
    nombre: 'Básica',
    contenido: 'Solo contabilidad',
    incluye: [
      'Registro contable de ingresos y gastos de la comunidad',
      'Estado de cuentas periódico',
      'Liquidación anual de cuentas',
    ],
    vivienda: 350,
    localGaraje: 150,
  },
  {
    id: 'estandar',
    nombre: 'Estándar',
    contenido: 'Contabilidad + administración',
    incluye: [
      'Todo lo de la tarifa Básica',
      'Emisión de recibos y control de cobros',
      'Convocatoria, asistencia y actas de las juntas',
      'Gestión de proveedores, seguros e incidencias',
    ],
    vivienda: 680,
    localGaraje: 350,
    destacada: true,
  },
  {
    id: 'zen',
    nombre: 'Zen',
    contenido: 'Contabilidad + administración + jurídico',
    incluye: [
      'Todo lo de la tarifa Estándar',
      'Asesoramiento jurídico en propiedad horizontal',
      'Requerimientos a propietarios morosos',
      'Revisión de contratos con proveedores',
    ],
    vivienda: 850,
    localGaraje: 550,
  },
];

/**
 * Las mancomunidades se tarifican por portal, no por vivienda: cada portal se cobra como
 * este portal tipo en la tarifa elegida (Estándar: 10 × 6,80 € + 12 × 3,50 € = 110 €).
 */
export const PORTAL_REFERENCIA = { viviendas: 10, locales: 2, garajes: 10 } as const;

/** Cada zona común de una mancomunidad (piscina, garaje, pista...) suma una cuota fija. */
export const PRECIO_ZONA_COMUN: Centimos = 5000;

export const ZONAS_COMUNES: ZonaComun[] = [
  { id: 'piscina', nombre: 'Piscina' },
  { id: 'garaje', nombre: 'Garaje' },
  { id: 'padel', nombre: 'Pista de pádel' },
  { id: 'tenis', nombre: 'Pista de tenis' },
  { id: 'jardines', nombre: 'Jardines y zonas verdes' },
  { id: 'parque_infantil', nombre: 'Parque infantil' },
  { id: 'gimnasio', nombre: 'Gimnasio' },
  { id: 'local_social', nombre: 'Local social' },
  { id: 'otra', nombre: 'Otra zona común' },
];

export const OPCIONES_TIPO_FINCA: { valor: TipoFinca; etiqueta: string; descripcion: string }[] = [
  { valor: 'comunidad', etiqueta: 'Comunidad', descripcion: 'Un edificio o portal' },
  { valor: 'mancomunidad', etiqueta: 'Mancomunidad', descripcion: 'Varios portales y zonas comunes' },
];

export function nombreZonaComun(id: ZonaComunId): string {
  return ZONAS_COMUNES.find((zona) => zona.id === id)?.nombre ?? id;
}
