import {
  DESCUENTO_PACK_POR_TRABAJADOR,
  MAXIMO_TRABAJADORES_TARIFA,
  TARIFA_JURIDICA,
  TARIFA_LABORAL,
  type ModalidadId,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';

export interface Marca {
  nombre: string;
  nombreCorto: string;
  dominio: string;
  url: string;
  grupoUrl: string;
  sello: string;
  lema: string;
  lemaDestacado: string;
  telefono: string;
  telefonoLimpio: string;
  whatsapp: string;
  whatsappMensaje: string;
  email: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
  horario: string;
  cif: string;
}

export type PlanId = ModalidadId | 'fiscal';

export interface Plan {
  id: PlanId;
  nombre: string;
  resumenPrecio: string;
  resumen: string;
  incluye: string[];
  noIncluye: string;
  href: string;
  contratacion: { texto: string; href: string };
  destacado?: boolean;
  etiqueta?: string;
}

export interface NavHijo {
  label: string;
  href: string;
  desc: string;
}

export interface NavItem {
  label: string;
  href: string;
  hijos?: NavHijo[];
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export const MARCA: Marca = {
  nombre: 'PROLEGAL360 ASESORES',
  nombreCorto: 'PROLEGAL360',
  dominio: 'prolegal360-asesores.com',
  url: 'https://prolegal360-asesores.com',
  grupoUrl: 'https://prolegal360.com',
  sello: '⚖️ Departamento jurídico incluido',
  lema: 'No solo gestionamos tus nóminas.',
  lemaDestacado: 'Respaldamos jurídicamente a tu empresa.',
  telefono: '+34 625 814 620',
  telefonoLimpio: '+34625814620',
  whatsapp: '34625814620',
  whatsappMensaje:
    'Hola, me gustaría información sobre los servicios de PROLEGAL360 Asesores.',
  email: 'gestion@prolegal360.com',
  direccion: 'Calle Maninidra 114',
  ciudad: 'Arinaga',
  codigoPostal: '35118',
  provincia: 'Las Palmas',
  pais: 'ES',
  horario: 'Lunes a viernes, de 9:00 a 17:00',
  cif: 'B-00000000',
};

const [PRIMER_TRAMO_LABORAL] = TARIFA_LABORAL;
const [PRIMER_TRAMO_JURIDICO] = TARIFA_JURIDICA;

export const PRECIO_LABORAL_POR_TRABAJADOR = formatearImporte(
  PRIMER_TRAMO_LABORAL.nomina + PRIMER_TRAMO_LABORAL.gestion,
);

export const PRECIO_JURIDICO_DESDE = formatearImporte(PRIMER_TRAMO_JURIDICO.cuota);

export const AHORRO_PACK_POR_TRABAJADOR = formatearImporte(DESCUENTO_PACK_POR_TRABAJADOR);

export const CONDICION_PROMOCION_JURIDICO =
  'El primer mes gratis es para nuevas altas que contratan el departamento jurídico sin el pack; el pack tiene su propio descuento, todos los meses.';

export const NO_INCLUYE_ACTUACIONES =
  'No incluye la asistencia a juicios ni al SEMAC, ni tasas, costas o procuradores. Estas actuaciones se presupuestan aparte, por escrito y con precio cerrado antes de empezar: tu cuota no lleva ninguna tarifa procesal fija.';

export const PLANES: Plan[] = [
  {
    id: 'laboral',
    nombre: 'SOLO LABORAL',
    resumenPrecio: `${PRECIO_LABORAL_POR_TRABAJADOR}/trabajador`,
    resumen:
      'Nóminas y gestión laboral de tu plantilla, con los plazos controlados. Se puede contratar sola, sin departamento jurídico.',
    incluye: [
      'Nóminas mensuales',
      'Seguros sociales (RLC y RNT)',
      'Contratos de trabajo',
      'Altas y bajas en la Seguridad Social',
      'Aplicación de convenios colectivos',
      'Certificados de empresa para el SEPE',
    ],
    noIncluye:
      'No incluye el departamento jurídico: cartas de despido, requerimientos o inspecciones se presupuestan aparte. Tampoco incluye la asistencia a juicios ni al SEMAC.',
    href: '/asesoria-laboral',
    contratacion: { texto: 'Contratar', href: '/alta?plan=laboral' },
  },
  {
    id: 'juridico',
    nombre: 'SOLO JURÍDICO',
    resumenPrecio: `desde ${PRECIO_JURIDICO_DESDE}/mes`,
    resumen:
      'Tu departamento jurídico por una cuota fija mensual. Cuando llega el problema, ya conocemos tu empresa.',
    incluye: [
      'Consultas jurídicas ilimitadas',
      'Cartas de despido y de sanción',
      'Revisión de contratos',
      'Contestación a requerimientos de la AEAT y la TGSS',
      'Alegaciones ante la Inspección de Trabajo',
      'Estrategia y negociación previa en conflictos laborales',
    ],
    noIncluye: NO_INCLUYE_ACTUACIONES,
    href: '/departamento-juridico',
    contratacion: { texto: 'Contratar', href: '/alta?plan=juridico' },
  },
  {
    id: 'pack',
    nombre: 'PACK LABORAL + JURÍDICO',
    resumenPrecio: `${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador`,
    resumen:
      'Nóminas, gestión y departamento jurídico en una sola cuota, con descuento y un único interlocutor.',
    incluye: [
      'Todo SOLO LABORAL',
      'Todo SOLO JURÍDICO',
      `${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador en la laboral, todos los meses`,
      'Interlocutor único para laboral y jurídico',
      'El jurídico ya conoce tus nóminas y contratos',
    ],
    noIncluye: NO_INCLUYE_ACTUACIONES,
    href: '/precios',
    contratacion: { texto: 'Contratar el pack', href: '/alta?plan=pack' },
    destacado: true,
    etiqueta: `Ahorra ${AHORRO_PACK_POR_TRABAJADOR} por trabajador`,
  },
  {
    id: 'fiscal',
    nombre: 'FISCAL Y CONTABILIDAD',
    resumenPrecio: 'Presupuesto cerrado en 24 h',
    resumen:
      'Presentamos tus impuestos a partir de la contabilidad que nos aportas. Impuesto sobre Sociedades incluido.',
    incluye: [
      'Trabajamos sobre tu balance y tu balance de sumas y saldos',
      'IVA o IGIC, IRPF y retenciones',
      'Pagos fraccionados',
      'Cierre fiscal del ejercicio',
      'Impuesto sobre Sociedades',
      'Notificaciones electrónicas vigiladas',
    ],
    noIncluye:
      'No incluye el registro contable diario ni el depósito de cuentas anuales en el Registro Mercantil. Tampoco es una auditoría: la contabilidad es responsabilidad de la empresa.',
    href: '/asesoria-fiscal',
    contratacion: { texto: 'Pedir presupuesto', href: '/asesoria-fiscal#presupuesto' },
  },
];

export const DISCLAIMER_CUOTA = `Cuota orientativa calculada con las tarifas publicadas. La asesoría laboral se factura por trabajador y mes según el tramo de plantilla, y el departamento jurídico con una cuota mensual según los trabajadores en alta. Con más de ${MAXIMO_TRABAJADORES_TARIFA} trabajadores, presupuesto personalizado. En el pack laboral + jurídico, el departamento jurídico mantiene su tarifa y la asesoría laboral cuesta ${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador y mes. Promoción para nuevas altas: primer mes gratis del departamento jurídico contratado sin el pack, no acumulable al descuento del pack; a partir del segundo mes se aplica la tarifa completa. La asistencia a juicios o al SEMAC se presupuesta aparte. La asesoría fiscal y contable se presupuesta a medida en 24 h laborables. Sin permanencia. Precios sin IVA ni IGIC.`;

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Servicios',
    href: '/precios',
    hijos: [
      {
        label: 'Asesoría laboral',
        href: '/asesoria-laboral',
        desc: 'Nóminas, seguros sociales y contratos',
      },
      {
        label: 'Departamento jurídico',
        href: '/departamento-juridico',
        desc: 'Respaldo jurídico recurrente para tu empresa',
      },
      {
        label: 'Fiscal y contabilidad',
        href: '/asesoria-fiscal',
        desc: 'Presupuesto cerrado en 24 h',
      },
      {
        label: 'Subvenciones',
        href: '/subvenciones',
        desc: 'Nuevos autónomos y contratación',
      },
      {
        label: 'Administración de fincas',
        href: '/administracion-de-fincas',
        desc: 'Tres tarifas y presupuesto al instante',
      },
      {
        label: 'Sectores',
        href: '/sectores',
        desc: 'Hostelería, construcción, comercio y más',
      },
    ],
  },
  { label: 'Precios', href: '/precios' },
  { label: 'Calculadora', href: '/calculadora' },
  { label: 'Cambiar de asesoría', href: '/cambiar-de-asesoria' },
  {
    label: 'La firma',
    href: '/sobre-nosotros',
    hijos: [
      { label: 'Sobre nosotros', href: '/sobre-nosotros', desc: 'Equipo y forma de trabajar' },
      { label: 'Casos de éxito', href: '/casos-de-exito', desc: 'Testimonios de clientes' },
      { label: 'Recursos', href: '/recursos', desc: 'Checklist de cierre fiscal' },
    ],
  },
  { label: 'Contacto', href: '/contacto' },
];

export function urlWhatsApp(mensaje?: string): string {
  return `https://wa.me/${MARCA.whatsapp}?text=${encodeURIComponent(
    mensaje || MARCA.whatsappMensaje,
  )}`;
}
