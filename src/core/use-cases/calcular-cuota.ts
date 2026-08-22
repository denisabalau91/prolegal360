import {
  etiquetaFacturas,
  type DatosSimulacion,
  type FormaJuridica,
  type LineaCuota,
  type PilarId,
  type RangoFacturas,
  type ResultadoCuota,
} from '@/core/domain/calculadora';

const CUOTA_BASE_LABORAL = 45;
const PRECIO_POR_NOMINA = 12;
const DESCUENTO_360 = 0.85;
const MINIMO_360 = 199;

function importeFiscal(forma: FormaJuridica, facturas: RangoFacturas): number | null {
  if (forma === 'autonomo') {
    if (facturas === 'menos_50') return 59;
    if (facturas === '50_100') return 89;
    return null;
  }
  if (facturas === 'menos_50') return 99;
  if (facturas === '50_100') return 149;
  if (facturas === '101_200') return 199;
  return null;
}

function importeJuridico(trabajadores: number): number | null {
  const n = Number.isFinite(trabajadores) && trabajadores > 0 ? Math.floor(trabajadores) : 0;
  if (n === 0) return 39;
  if (n <= 5) return 59;
  if (n <= 10) return 89;
  if (n <= 25) return 139;
  if (n <= 50) return 199;
  return null;
}

export function calcularCuota(datos: DatosSimulacion): ResultadoCuota {
  const { forma_juridica, num_trabajadores, num_facturas, pilares } = datos;
  const trabajadores =
    Number.isFinite(num_trabajadores) && num_trabajadores > 0
      ? Math.floor(num_trabajadores)
      : 0;
  const incluye = (pilar: PilarId) => pilares.includes(pilar);

  const laboral = CUOTA_BASE_LABORAL + PRECIO_POR_NOMINA * trabajadores;
  const fiscal = importeFiscal(forma_juridica, num_facturas);
  const juridico = importeJuridico(trabajadores);

  const lineas: LineaCuota[] = [
    {
      pilar: 'laboral',
      etiqueta: 'Asesoría laboral',
      detalle: `${CUOTA_BASE_LABORAL} € de cuota base + ${PRECIO_POR_NOMINA} € × ${trabajadores} ${
        trabajadores === 1 ? 'nómina' : 'nóminas'
      }`,
      importe: laboral,
      presupuesto: false,
      desmarcado: !incluye('laboral'),
    },
    {
      pilar: 'fiscal',
      etiqueta: 'Asesoría fiscal',
      detalle: `${forma_juridica === 'autonomo' ? 'Autónomo' : 'Sociedad'} · ${etiquetaFacturas(
        num_facturas,
      ).toLowerCase()} facturas al mes`,
      importe: fiscal,
      presupuesto: fiscal === null,
      desmarcado: !incluye('fiscal'),
    },
    {
      pilar: 'juridico',
      etiqueta: 'Departamento jurídico',
      detalle:
        trabajadores === 0
          ? 'Sin trabajadores en alta'
          : `${trabajadores} ${trabajadores === 1 ? 'trabajador' : 'trabajadores'} en alta`,
      importe: juridico,
      presupuesto: juridico === null,
      desmarcado: !incluye('juridico'),
      gratisPrimerMes: true,
    },
  ];

  const activas = lineas.filter((linea) => !linea.desmarcado);
  const requierePresupuesto = activas.some((linea) => linea.presupuesto);

  let subtotal: number | null = null;
  if (!requierePresupuesto) {
    subtotal = activas.reduce((suma, linea) => suma + (linea.importe ?? 0), 0);
  }

  const aplica360 =
    incluye('laboral') && incluye('fiscal') && incluye('juridico') && !requierePresupuesto;

  let total360: number | null = null;
  let ahorro360: number | null = null;
  if (aplica360 && fiscal !== null && juridico !== null) {
    total360 = Math.max(
      MINIMO_360,
      10 * Math.round(((laboral + fiscal + juridico) * DESCUENTO_360) / 10),
    );
    ahorro360 = Math.max(0, (subtotal ?? 0) - total360);
  }

  const juridicoActivo = incluye('juridico');
  const totalRecurrente = requierePresupuesto ? null : aplica360 ? total360 : subtotal;
  const totalPrimerMes =
    totalRecurrente === null
      ? null
      : Math.max(0, totalRecurrente - (juridicoActivo && juridico !== null ? juridico : 0));

  return {
    lineas,
    subtotal,
    totalRecurrente,
    totalPrimerMes,
    total360,
    ahorro360,
    importeJuridico: juridico,
    aplica360,
    requierePresupuesto,
    juridicoDesmarcado: !juridicoActivo,
  };
}
