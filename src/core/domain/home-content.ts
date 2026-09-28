import { TARIFAS_FINCA } from '@/core/domain/fincas';
import { formatearImporte } from '@/core/domain/importe';
import {
  AHORRO_PACK_POR_TRABAJADOR,
  PRECIO_JURIDICO_DESDE,
  PRECIO_LABORAL_POR_TRABAJADOR,
  type FaqItem,
} from '@/core/domain/site';

export interface ServicioDestacado {
  nombre: string;
  descripcion: string;
  precio: string;
  precioSufijo: string;
  precioExtra: string;
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

const [TARIFA_FINCA_BASICA] = TARIFAS_FINCA;

export const SERVICIOS: ServicioDestacado[] = [
  {
    nombre: 'LABORAL + JURÍDICO',
    descripcion:
      'Nóminas y gestión laboral con el departamento jurídico detrás. Contrátalos por separado o juntos con descuento.',
    precio: PRECIO_LABORAL_POR_TRABAJADOR,
    precioSufijo: '/trabajador',
    precioExtra: `Jurídico desde ${PRECIO_JURIDICO_DESDE}/mes · 1.er mes −20 %`,
    href: '/asesoria-laboral',
  },
  {
    nombre: 'FISCAL Y CONTABILIDAD',
    descripcion:
      'Impuestos y cierre a partir de la contabilidad que nos aportas. Impuesto sobre Sociedades incluido.',
    precio: 'Presupuesto',
    precioSufijo: 'en 24 h',
    precioExtra: 'Cerrado y por escrito',
    href: '/asesoria-fiscal',
  },
  {
    nombre: 'SUBVENCIONES',
    descripcion:
      'Te decimos si encajas, preparamos la solicitud y la presentamos en plazo. Sin que pierdas una ayuda por desconocerla.',
    precio: 'Vigentes',
    precioSufijo: 'ahora',
    precioExtra: 'Nuevos autónomos · Contratación',
    href: '/subvenciones',
  },
  {
    nombre: 'ADMINISTRACIÓN DE FINCAS',
    descripcion:
      'Tres tarifas claras para tu comunidad o mancomunidad, con el presupuesto calculado al momento.',
    precio: formatearImporte(TARIFA_FINCA_BASICA.vivienda),
    precioSufijo: '/vivienda',
    precioExtra: 'Básica, Estándar o Zen',
    href: '/administracion-de-fincas',
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
      'Redactamos la carta y calculamos la indemnización. Si hay que ir al SEMAC, te damos antes presupuesto cerrado.',
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
  'Con una asesoría normal: te derivan a un abogado externo que no conoce tu empresa y empiezas de cero. Con PROLEGAL360: tu departamento jurídico ya está dentro del expediente desde el minuto uno. Y si el asunto llega a juicio o al SEMAC, te damos presupuesto cerrado por escrito antes de empezar.';

export const COMPARATIVA: string[] = [
  'Tarifas publicadas en la web',
  'Departamento jurídico propio',
  'Sin tarifa procesal fija en la cuota',
  'Presupuesto fiscal cerrado en 24 h',
  'Sin permanencia',
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
    pregunta: '¿Por qué publicáis los precios?',
    respuesta:
      'Porque la gestión laboral, el departamento jurídico y la administración de fincas se pueden calcular: dependen del número de trabajadores o de viviendas. Publicarlo te permite saber lo que pagarías en un minuto, sin llamada comercial de tanteo.',
  },
  {
    pregunta: '¿Qué significa «departamento jurídico incluido»?',
    respuesta:
      'Que por una cuota fija mensual tienes consultas jurídicas ilimitadas, cartas de despido y sanción, revisión de contratos, contestación a requerimientos de la AEAT y la TGSS y alegaciones ante la Inspección de Trabajo. La asistencia a juicios o al SEMAC no forma parte de la cuota: se presupuesta aparte, por escrito y antes de empezar.',
  },
  {
    pregunta: '¿Puedo contratar solo la asesoría laboral?',
    respuesta: `Sí. La asesoría laboral se contrata sola, sin departamento jurídico. También puedes contratar solo el departamento jurídico, o ambos juntos en el pack: el jurídico mantiene su precio y la laboral te cuesta ${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador, todos los meses.`,
  },
  {
    pregunta: '¿Qué promociones tenéis?',
    respuesta: `Si contratas el departamento jurídico, el primer mes tiene un 20 % de descuento para nuevas altas. A partir del segundo mes se aplica la tarifa que corresponda según los trabajadores en alta. En el pack laboral + jurídico no se suma esta promoción: su ventaja son los ${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador cada mes. Sin permanencia.`,
  },
  {
    pregunta: '¿Por qué la asesoría fiscal no tiene precio publicado?',
    respuesta:
      'Porque depende de tu contabilidad: volumen de operaciones, régimen de IVA o IGIC y actividad. En lugar de una tarifa genérica que te haga pagar de más, te enviamos un presupuesto cerrado en 24 horas laborables. Presentamos también el Impuesto sobre Sociedades.',
  },
  {
    pregunta: '¿Tengo que llevar yo la contabilidad?',
    respuesta:
      'Sí. La asesoría fiscal se presta a partir de la contabilidad que aporta el cliente: nos basta con el balance y el balance de sumas y saldos. Con eso revisamos, cerramos el ejercicio y presentamos los impuestos.',
  },
  {
    pregunta: '¿Hay permanencia?',
    respuesta:
      'No. Ninguno de nuestros servicios tiene permanencia. Si decides irte, te entregamos toda tu documentación en formato digital y colaboramos con la nueva asesoría.',
  },
  {
    pregunta: '¿Los precios llevan impuestos?',
    respuesta:
      'Todos los precios publicados son sin impuestos. Se factura mensualmente con el IVA o el IGIC que corresponda según tu territorio.',
  },
];
