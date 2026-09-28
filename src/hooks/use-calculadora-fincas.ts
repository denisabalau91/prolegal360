'use client';

import { useMemo, useState } from 'react';
import type {
  CantidadesZonas,
  DatosFinca,
  PresupuestoFinca,
  TarifaFincaId,
  TipoFinca,
  ZonaComunId,
} from '@/core/domain/fincas';
import type { DetalleSolicitud } from '@/core/ports/contacto-gateway';
import {
  calcularPresupuestoFinca,
  detallarSolicitudFinca,
} from '@/core/use-cases/calcular-presupuesto-fincas';
import { aEntero, soloDigitos } from '@/utils/validacion';

const MAXIMO_DIGITOS = 4;

export interface CampoNumerico {
  texto: string;
  valor: number;
  cambiar: (texto: string) => void;
}

export interface EstadoCalculadoraFincas {
  tipo: TipoFinca;
  setTipo: (tipo: TipoFinca) => void;
  viviendas: CampoNumerico;
  locales: CampoNumerico;
  garajes: CampoNumerico;
  portales: CampoNumerico;
  zonas: CantidadesZonas;
  alternarZona: (zona: ZonaComunId) => void;
  cambiarCantidadZona: (zona: ZonaComunId, texto: string) => void;
  presupuesto: PresupuestoFinca;
  tarifaElegida: TarifaFincaId | null;
  elegirTarifa: (tarifa: TarifaFincaId) => void;
  solicitudAbierta: boolean;
  detallesSolicitud: DetalleSolicitud[];
}

function useCampoNumerico(inicial: number, minimo: number): CampoNumerico {
  const [texto, setTexto] = useState(String(inicial));
  return {
    texto,
    valor: aEntero(texto, minimo),
    cambiar: (nuevo: string) => setTexto(soloDigitos(nuevo).slice(0, MAXIMO_DIGITOS)),
  };
}

export function useCalculadoraFincas(): EstadoCalculadoraFincas {
  const [tipo, setTipo] = useState<TipoFinca>('comunidad');
  const viviendas = useCampoNumerico(10, 0);
  const locales = useCampoNumerico(2, 0);
  const garajes = useCampoNumerico(10, 0);
  const portales = useCampoNumerico(7, 0);
  const [zonas, setZonas] = useState<CantidadesZonas>({ piscina: 1, garaje: 1, padel: 1 });
  const [tarifaElegida, setTarifaElegida] = useState<TarifaFincaId | null>(null);
  const [solicitudAbierta, setSolicitudAbierta] = useState(false);

  const alternarZona = (zona: ZonaComunId) => {
    setZonas((actuales) => {
      const siguientes = { ...actuales };
      if (siguientes[zona] === undefined) {
        siguientes[zona] = 1;
      } else {
        delete siguientes[zona];
      }
      return siguientes;
    });
  };

  const cambiarCantidadZona = (zona: ZonaComunId, texto: string) => {
    const cantidad = aEntero(soloDigitos(texto).slice(0, 2), 1);
    setZonas((actuales) => ({ ...actuales, [zona]: cantidad }));
  };

  const datos = useMemo<DatosFinca>(
    () =>
      tipo === 'comunidad'
        ? {
            tipo,
            viviendas: viviendas.valor,
            locales: locales.valor,
            garajes: garajes.valor,
          }
        : { tipo, portales: portales.valor, zonas },
    [tipo, viviendas.valor, locales.valor, garajes.valor, portales.valor, zonas],
  );

  const presupuesto = useMemo(() => calcularPresupuestoFinca(datos), [datos]);
  const detallesSolicitud = useMemo(
    () => detallarSolicitudFinca(datos, tarifaElegida),
    [datos, tarifaElegida],
  );

  const elegirTarifa = (tarifa: TarifaFincaId) => {
    setTarifaElegida(tarifa);
    setSolicitudAbierta(true);
  };

  return {
    tipo,
    setTipo,
    viviendas,
    locales,
    garajes,
    portales,
    zonas,
    alternarZona,
    cambiarCantidadZona,
    presupuesto,
    tarifaElegida,
    elegirTarifa,
    solicitudAbierta,
    detallesSolicitud,
  };
}
