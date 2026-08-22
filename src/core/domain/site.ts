export interface Marca {
  nombre: string;
  nombreCorto: string;
  dominio: string;
  url: string;
  grupoUrl: string;
  sello: string;
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

export type PlanId = 'laboral' | 'fiscal' | 'juridico' | '360_integral';

export interface Plan {
  id: PlanId;
  nombre: string;
  precioDesde: string;
  precioSufijo: string;
  precioExtra?: string;
  resumen: string;
  incluye: string[];
  noIncluye: string;
  href: string;
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

export const PLANES: Plan[] = [
  {
    id: 'laboral',
    nombre: 'LABORAL',
    precioDesde: '45 €',
    precioSufijo: '/mes',
    precioExtra: '+ 12 € / nómina',
    resumen:
      'Toda la gestión laboral de tu plantilla, con los plazos controlados y sin sustos con la Seguridad Social.',
    incluye: [
      'Nóminas mensuales',
      'Seguros sociales (RLC y RNT)',
      'Contratos de trabajo',
      'Altas y bajas en la Seguridad Social',
      'Aplicación de convenios colectivos',
      'Certificados de empresa para el SEPE',
    ],
    noIncluye:
      'No incluye la representación en procedimientos judiciales ni la asistencia a juicio. Las actuaciones puntuales (despidos, inspecciones, expedientes sancionadores) se presupuestan aparte, siempre por escrito y con precio cerrado antes de empezar.',
    href: '/asesoria-laboral',
  },
  {
    id: 'fiscal',
    nombre: 'FISCAL',
    precioDesde: 'desde 99 €',
    precioSufijo: '/mes',
    resumen:
      'Cerramos el ejercicio y presentamos tus impuestos a partir de la contabilidad que tú aportas. Impuesto sobre Sociedades incluido.',
    incluye: [
      'Cierre y revisión fiscal sobre la contabilidad aportada por el cliente',
      'IVA (modelos 303, 349 y 390)',
      'IRPF y retenciones (111, 115, 190)',
      'Pagos fraccionados (130 y 202)',
      'Notificaciones electrónicas vigiladas',
      'Calendario fiscal personalizado',
      'Impuesto sobre Sociedades incluido sin cargo extra',
    ],
    noIncluye:
      'No incluye el registro contable diario ni el depósito de cuentas anuales en el Registro Mercantil. Tampoco incluye auditoría de cuentas: la contabilidad es responsabilidad de la empresa.',
    href: '/asesoria-fiscal',
  },
  {
    id: 'juridico',
    nombre: 'JURÍDICO',
    precioDesde: 'desde 39 €',
    precioSufijo: '/mes',
    precioExtra: '1.er mes gratis',
    resumen:
      'Un abogado propio dentro de tu cuota. Cuando llega el problema, lo llevamos nosotros desde el minuto uno.',
    incluye: [
      'Consultas jurídicas ilimitadas',
      'Cartas de despido y de sanción',
      'Revisión de contratos',
      'Contestación a requerimientos de la AEAT y la TGSS',
      'Alegaciones ante la Inspección de Trabajo',
      'Asistencia al acto de conciliación (SMAC)',
    ],
    noIncluye:
      'No incluye procedimientos judiciales, tasas ni costas. Estas actuaciones se presupuestan aparte, con precio cerrado por adelantado y un 30 % de descuento por ser cliente con plan jurídico.',
    href: '/departamento-juridico',
  },
  {
    id: '360_integral',
    nombre: '360 INTEGRAL',
    precioDesde: 'desde 199 €',
    precioSufijo: '/mes',
    resumen:
      'Los tres pilares en una sola cuota, con descuento por agrupación y un único interlocutor para todo.',
    incluye: [
      'Todo el plan LABORAL',
      'Todo el plan FISCAL',
      'Todo el plan JURÍDICO',
      'Descuento por agrupación de los tres pilares',
      'Interlocutor único para laboral, fiscal y jurídico',
      'Toda tu documentación organizada y siempre disponible',
    ],
    noIncluye:
      'No incluye el registro contable diario, el depósito de cuentas anuales, los procedimientos judiciales, las tasas ni las costas. Las actuaciones puntuales se presupuestan aparte, por escrito y con un 30 % de descuento.',
    href: '/precios',
    destacado: true,
    etiqueta: 'El más contratado',
  },
];

export const DISCLAIMER_CUOTA =
  'Cuota orientativa. Promoción válida para nuevas altas: el primer mes de servicio jurídico es gratuito y a partir del segundo mes se aplica la tarifa según los trabajadores en alta. Sin permanencia. La tarifa se revisa si varía la plantilla. Precios sin IVA. El servicio fiscal se presta a partir de la contabilidad aportada por el cliente y no incluye el registro contable diario ni el depósito de cuentas anuales.';

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
        label: 'Asesoría fiscal',
        href: '/asesoria-fiscal',
        desc: 'Cierre, impuestos e IS incluido',
      },
      {
        label: 'Abogado laboral',
        href: '/departamento-juridico',
        desc: 'Defensa laboral para empresas',
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
      { label: 'Sobre nosotros', href: '/sobre-nosotros', desc: 'Equipo y trayectoria' },
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
