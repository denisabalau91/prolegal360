import type { FaqItem } from '@/core/domain/site';

export interface Pilar {
  nombre: string;
  descripcion: string;
  precio: string;
  precioSufijo: string;
  precioExtra?: string;
  href: string;
}

export type EscenarioIcono = 'shield-alert' | 'landmark' | 'file-warning' | 'gavel';

export interface Escenario {
  icono: EscenarioIcono;
  titulo: string;
  situacion: string;
  respuesta: string;
}

export interface Paso {
  numero: string;
  titulo: string;
  descripcion: string;
}

export interface Testimonio {
  cita: string;
  nombre: string;
  cargo: string;
  empresa: string;
}

export const PILARES: Pilar[] = [
  {
    nombre: 'LABORAL',
    descripcion:
      'Toda la gestión laboral de tu plantilla, con los plazos controlados y sin sustos con la Seguridad Social.',
    precio: '45 €',
    precioSufijo: '/mes',
    precioExtra: '+ 12 € / nómina',
    href: '/asesoria-laboral',
  },
  {
    nombre: 'FISCAL',
    descripcion:
      'Cerramos el ejercicio y presentamos tus impuestos a partir de la contabilidad que tú aportas. Impuesto sobre Sociedades incluido.',
    precio: 'desde 99 €',
    precioSufijo: '/mes',
    href: '/asesoria-fiscal',
  },
  {
    nombre: 'JURÍDICO',
    descripcion:
      'Un abogado propio dentro de tu cuota. Cuando llega el problema, lo llevamos nosotros desde el minuto uno.',
    precio: 'desde 39 €',
    precioSufijo: '/mes',
    precioExtra: '1.er mes gratis',
    href: '/departamento-juridico',
  },
];

export const ESCENARIOS: Escenario[] = [
  {
    icono: 'shield-alert',
    titulo: 'Llega una Inspección de Trabajo',
    situacion: 'Te citan con requerimiento de documentación y diez días para contestar.',
    respuesta:
      'Preparamos las alegaciones, revisamos la documentación laboral y comparecemos por ti.',
  },
  {
    icono: 'landmark',
    titulo: 'Un requerimiento de Hacienda',
    situacion: 'La AEAT te pide justificar el IVA deducido de todo un ejercicio.',
    respuesta:
      'Contestamos el requerimiento con el soporte documental y defendemos el criterio aplicado.',
  },
  {
    icono: 'file-warning',
    titulo: 'Un despido impugnado',
    situacion: 'El trabajador presenta papeleta de conciliación y reclama improcedencia.',
    respuesta:
      'Redactamos la carta, calculamos la indemnización y asistimos al SMAC contigo.',
  },
  {
    icono: 'gavel',
    titulo: 'Una sanción de la Seguridad Social',
    situacion: 'Te notifican un acta de liquidación con propuesta de sanción económica.',
    respuesta:
      'Analizamos el acta, presentamos alegaciones y agotamos la vía administrativa.',
  },
];

export const CONCLUSION_ESCENARIOS =
  'Con una asesoría normal: te derivan a un abogado externo y pagas aparte, desde 1.500 €. Con PROLEGAL360: lo llevamos nosotros desde el minuto uno, con presupuesto cerrado por adelantado y un 30 % de descuento por ser cliente.';

export const COMPARATIVA: string[] = [
  'Precio publicado en la web',
  'Servicio jurídico propio',
  'Sin permanencia',
  'Respuesta en 24 h laborables',
  'Documentación siempre disponible',
  'Sin minutas sorpresa',
];

export const PASOS: Paso[] = [
  {
    numero: '01',
    titulo: 'Diagnóstico gratuito',
    descripcion:
      '20 minutos para revisar tu situación laboral, fiscal y jurídica. Te decimos qué estás pagando de más y qué riesgos tienes abiertos. Sin compromiso.',
  },
  {
    numero: '02',
    titulo: 'Traspaso sin coste',
    descripcion:
      'Pedimos nosotros la documentación a tu asesoría anterior y hacemos un mes de solapamiento sin coste. Tú no tienes que dar ninguna explicación incómoda.',
  },
  {
    numero: '03',
    titulo: 'Gestión mensual',
    descripcion:
      'Calendario de obligaciones, avisos de vencimientos y toda tu documentación organizada y disponible cuando la necesites. Con el departamento jurídico desde el primer día.',
  },
];

export const TESTIMONIOS: Testimonio[] = [
  {
    cita: 'Nos llegó una Inspección de Trabajo por horas extra en agosto. Nuestra antigua asesoría nos pasó el teléfono de un abogado externo que pedía 1.800 € solo por empezar. Aquí lo llevó el departamento jurídico sin coste añadido.',
    nombre: 'Marta Ruiz',
    cargo: 'Gerente',
    empresa: 'Hostelería · 18 trabajadores',
  },
  {
    cita: 'Lo que más valoro es saber lo que voy a pagar cada mes. Está publicado en la web, sin llamadas para pedir presupuesto ni sorpresas al final del ejercicio.',
    nombre: 'Javier Ortega',
    cargo: 'Administrador',
    empresa: 'Construcción · 34 trabajadores',
  },
  {
    cita: 'El traspaso lo hicieron ellos entero. Yo no llamé a mi antiguo asesor ni una vez. En dos semanas tenían todo mi histórico al día.',
    nombre: 'Lucía Ferrer',
    cargo: 'Socia fundadora',
    empresa: 'Comercio · 6 trabajadores',
  },
  {
    cita: 'Con 62 personas en plantilla, las altas y bajas son diarias. Responden siempre dentro del mismo día laborable y eso, en este sector, vale dinero.',
    nombre: 'Ignacio Salas',
    cargo: 'Director de operaciones',
    empresa: 'Seguridad y limpieza · 62 trabajadores',
  },
];

export const FAQS_HOME: FaqItem[] = [
  {
    pregunta: '¿Por qué publicáis los precios y otras asesorías no?',
    respuesta:
      'Porque el precio de una asesoría se puede calcular: depende de la forma jurídica, del número de trabajadores y del volumen de facturas. Publicarlo evita la llamada comercial de tanteo y te permite compararnos en un minuto con nuestra calculadora de cuota.',
  },
  {
    pregunta: '¿Qué significa que el departamento jurídico está incluido?',
    respuesta:
      'Que las consultas jurídicas ilimitadas, las cartas de despido y sanción, la revisión de contratos, la contestación a requerimientos de la AEAT y la TGSS, las alegaciones ante la Inspección de Trabajo y la asistencia al SMAC entran en tu cuota mensual. No incluye procedimientos judiciales, tasas ni costas, que se presupuestan aparte con precio cerrado y un 30 % de descuento.',
  },
  {
    pregunta: '¿El primer mes de servicio jurídico es realmente gratuito?',
    respuesta:
      'Sí. La promoción es válida para nuevas altas: el primer mes del plan jurídico es gratuito y a partir del segundo mes se aplica la tarifa que corresponda según los trabajadores en alta. Sin permanencia.',
  },
  {
    pregunta: '¿Incluís el Impuesto sobre Sociedades?',
    respuesta:
      'Sí, el Impuesto sobre Sociedades (modelos 200 y 202) está incluido en el plan fiscal sin cargo extra. Lo que no incluye el plan fiscal es el registro contable diario ni el depósito de cuentas anuales.',
  },
  {
    pregunta: '¿Tengo que llevar yo la contabilidad?',
    respuesta:
      'El plan fiscal se presta a partir de la contabilidad que aporta el cliente: tú registras el día a día y nosotros revisamos, ajustamos, cerramos el ejercicio y presentamos los impuestos. Si necesitas que también llevemos el registro contable diario, lo presupuestamos aparte.',
  },
  {
    pregunta: '¿Hay permanencia?',
    respuesta:
      'No. Ninguno de nuestros planes tiene permanencia. Si decides irte, te entregamos toda tu documentación en formato digital y colaboramos con la nueva asesoría.',
  },
  {
    pregunta: '¿Cómo funciona el cambio desde mi asesoría actual?',
    respuesta:
      'El traspaso es gratuito y lo gestionamos nosotros: pedimos la documentación a tu asesor anterior y mantenemos un mes de solapamiento sin coste para que no se quede ningún trámite en el aire.',
  },
  {
    pregunta: '¿Los precios llevan IVA?',
    respuesta:
      'Todos los precios publicados son sin IVA. Se factura mensualmente con el IVA vigente aplicable a los servicios profesionales.',
  },
];
