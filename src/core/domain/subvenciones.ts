import type { FaqItem } from '@/core/domain/site';

export type SubvencionId = 'nuevos_autonomos' | 'contratacion';

export interface Subvencion {
  id: SubvencionId;
  titulo: string;
  destinatarios: string;
  descripcion: string;
  queHacemos: string[];
}

export interface PasoSubvencion {
  numero: string;
  titulo: string;
  descripcion: string;
}

export const SUBVENCIONES_VIGENTES: Subvencion[] = [
  {
    id: 'nuevos_autonomos',
    titulo: 'Ayudas para nuevos autónomos',
    destinatarios: 'Para quien se da de alta como autónomo y empieza su actividad',
    descripcion:
      'Arrancar un negocio ya cuesta bastante. Comprobamos si puedes acogerte a la ayuda al inicio de actividad y te la tramitamos sin que tengas que pelearte con la sede electrónica.',
    queHacemos: [
      'Comprobamos requisitos y plazos antes de tu alta',
      'Preparamos la solicitud y toda la documentación',
      'La presentamos y hacemos el seguimiento del expediente',
      'Te acompañamos en la justificación posterior',
    ],
  },
  {
    id: 'contratacion',
    titulo: 'Subvenciones por contratación de nuevos trabajadores',
    destinatarios: 'Para empresas y autónomos que incorporan personal a su plantilla',
    descripcion:
      'Contratar puede salirte más barato si el contrato y el perfil encajan en la convocatoria. Lo revisamos antes de firmar, que es cuando todavía se puede ajustar.',
    queHacemos: [
      'Revisamos si el contrato y el trabajador encajan en la ayuda',
      'Coordinamos el alta y el contrato con la asesoría laboral',
      'Preparamos y presentamos la solicitud dentro de plazo',
      'Controlamos el mantenimiento del empleo y la justificación',
    ],
  },
];

export const PASOS_SUBVENCION: PasoSubvencion[] = [
  {
    numero: '01',
    titulo: 'Nos cuentas tu caso',
    descripcion: 'Con el formulario o por teléfono. Nos basta con saber qué vas a hacer y cuándo.',
  },
  {
    numero: '02',
    titulo: 'Revisamos si encajas',
    descripcion:
      'Comprobamos requisitos, cuantía y plazos de la convocatoria vigente y te lo decimos por escrito.',
  },
  {
    numero: '03',
    titulo: 'Tramitamos la solicitud',
    descripcion:
      'Preparamos el expediente completo y lo presentamos. Tú solo firmas cuando todo está listo.',
  },
  {
    numero: '04',
    titulo: 'Seguimiento y justificación',
    descripcion:
      'Vigilamos las notificaciones y te avisamos de cada obligación para que no tengas que devolver la ayuda.',
  },
];

export const FAQS_SUBVENCIONES: FaqItem[] = [
  {
    pregunta: '¿Cuánto puedo recibir?',
    respuesta:
      'Depende de cada convocatoria y de tu situación personal y de empresa. Antes de presentar nada te confirmamos por escrito la cuantía a la que puedes optar, los requisitos y los plazos.',
  },
  {
    pregunta: '¿Tengo que ser cliente de la asesoría?',
    respuesta:
      'No. Tramitamos subvenciones también para empresas y autónomos que no tienen contratado otro servicio. Si ya eres cliente, coordinamos la ayuda con tu gestión laboral y fiscal.',
  },
  {
    pregunta: '¿Cuándo tengo que pedir la ayuda?',
    respuesta:
      'Cuanto antes. Muchas ayudas exigen presentarse en un plazo corto desde el alta o la contratación, y algunas requieren cumplir condiciones antes de firmar el contrato. Escríbenos antes de dar el paso.',
  },
  {
    pregunta: '¿Me avisáis si sale una convocatoria nueva?',
    respuesta:
      'Sí. Si marcas la casilla en el formulario, te escribimos cuando se abra una convocatoria que encaje con tu empresa.',
  },
];
