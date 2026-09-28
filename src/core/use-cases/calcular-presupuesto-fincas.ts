import {
  PORTAL_REFERENCIA,
  PRECIO_ZONA_COMUN,
  TARIFAS_FINCA,
  nombreZonaComun,
  type CantidadesZonas,
  type ConceptoPresupuesto,
  type DatosComunidad,
  type DatosFinca,
  type DatosMancomunidad,
  type PresupuestoFinca,
  type PresupuestoTarifaFinca,
  type TarifaFinca,
  type TarifaFincaId,
  type ZonaComunId,
} from '@/core/domain/fincas';
import { formatearImporte, type Centimos } from '@/core/domain/importe';
import type { DetalleSolicitud } from '@/core/ports/contacto-gateway';

function normalizarCantidad(valor: number | undefined): number {
  return valor !== undefined && Number.isFinite(valor) && valor > 0 ? Math.floor(valor) : 0;
}

export function contarZonasComunes(zonas: CantidadesZonas): number {
  return Object.values(zonas).reduce((total, cantidad) => total + normalizarCantidad(cantidad), 0);
}

export function calcularPrecioPortal(tarifa: TarifaFinca): Centimos {
  return (
    tarifa.vivienda * PORTAL_REFERENCIA.viviendas +
    tarifa.localGaraje * (PORTAL_REFERENCIA.locales + PORTAL_REFERENCIA.garajes)
  );
}

function concepto(cantidad: number, unidad: string, precioUnitario: Centimos): ConceptoPresupuesto {
  const unidades = normalizarCantidad(cantidad);
  return { cantidad: unidades, unidad, precioUnitario, importe: unidades * precioUnitario };
}

function conceptosComunidad(tarifa: TarifaFinca, datos: DatosComunidad): ConceptoPresupuesto[] {
  const localesGarajes = normalizarCantidad(datos.locales) + normalizarCantidad(datos.garajes);
  return [
    concepto(datos.viviendas, 'viviendas', tarifa.vivienda),
    concepto(localesGarajes, 'locales y garajes', tarifa.localGaraje),
  ];
}

function conceptosMancomunidad(
  tarifa: TarifaFinca,
  datos: DatosMancomunidad,
): ConceptoPresupuesto[] {
  return [
    concepto(datos.portales, 'portales', calcularPrecioPortal(tarifa)),
    concepto(contarZonasComunes(datos.zonas), 'zonas comunes', PRECIO_ZONA_COMUN),
  ];
}

function presupuestarTarifa(tarifa: TarifaFinca, datos: DatosFinca): PresupuestoTarifaFinca {
  const conceptos =
    datos.tipo === 'comunidad'
      ? conceptosComunidad(tarifa, datos)
      : conceptosMancomunidad(tarifa, datos);
  return {
    tarifa,
    conceptos,
    cuotaMensual: conceptos.reduce((total, actual) => total + actual.importe, 0),
  };
}

export function calcularPresupuestoFinca(datos: DatosFinca): PresupuestoFinca {
  return {
    tipo: datos.tipo,
    presupuestos: TARIFAS_FINCA.map((tarifa) => presupuestarTarifa(tarifa, datos)),
  };
}

function detallarZonas(zonas: CantidadesZonas): string {
  const lista = Object.entries(zonas)
    .filter(([, cantidad]) => normalizarCantidad(cantidad) > 0)
    .map(([id, cantidad]) => `${nombreZonaComun(id as ZonaComunId)} (${cantidad})`);
  return lista.length > 0 ? lista.join(', ') : 'Ninguna';
}

function detallarDatos(datos: DatosFinca): DetalleSolicitud[] {
  if (datos.tipo === 'mancomunidad') {
    return [
      { etiqueta: 'Tipo de finca', valor: 'Mancomunidad' },
      { etiqueta: 'Portales', valor: String(normalizarCantidad(datos.portales)) },
      { etiqueta: 'Zonas comunes', valor: detallarZonas(datos.zonas) },
    ];
  }
  return [
    { etiqueta: 'Tipo de finca', valor: 'Comunidad' },
    { etiqueta: 'Viviendas', valor: String(normalizarCantidad(datos.viviendas)) },
    { etiqueta: 'Locales', valor: String(normalizarCantidad(datos.locales)) },
    { etiqueta: 'Plazas de garaje', valor: String(normalizarCantidad(datos.garajes)) },
  ];
}

function describirPresupuesto(presupuesto: PresupuestoTarifaFinca): string {
  const desglose = presupuesto.conceptos
    .map((linea) => `${linea.cantidad} ${linea.unidad} × ${formatearImporte(linea.precioUnitario)}`)
    .join(' + ');
  return `${presupuesto.tarifa.nombre} ${formatearImporte(presupuesto.cuotaMensual)}/mes (${desglose})`;
}

export function detallarSolicitudFinca(
  datos: DatosFinca,
  tarifaElegida: TarifaFincaId | null,
): DetalleSolicitud[] {
  const { presupuestos } = calcularPresupuestoFinca(datos);
  const elegido = presupuestos.find((opcion) => opcion.tarifa.id === tarifaElegida);
  return [
    ...detallarDatos(datos),
    {
      etiqueta: 'Tarifa elegida',
      valor: elegido ? describirPresupuesto(elegido) : 'Sin decidir',
    },
    {
      etiqueta: 'Presupuestos calculados',
      valor: presupuestos
        .map((opcion) => `${opcion.tarifa.nombre} ${formatearImporte(opcion.cuotaMensual)}/mes`)
        .join(' · '),
    },
  ];
}
