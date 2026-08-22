'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  DatosSimulacion,
  FormaJuridica,
  PilarId,
  RangoFacturas,
  ResultadoCuota,
} from '@/core/domain/calculadora';
import { calcularCuota } from '@/core/use-cases/calcular-cuota';
import type { SimulacionesGateway, SimulacionPayload } from '@/core/ports/simulaciones-gateway';

const RETARDO_GUARDADO_MS = 900;
const PATRON_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export interface EstadoCalculadora {
  paso: number;
  setPaso: (paso: number) => void;
  formaJuridica: FormaJuridica;
  setFormaJuridica: (forma: FormaJuridica) => void;
  trabajadoresTexto: string;
  setTrabajadoresTexto: (valor: string) => void;
  trabajadores: number;
  facturas: RangoFacturas;
  setFacturas: (rango: RangoFacturas) => void;
  pilares: PilarId[];
  alternarPilar: (pilar: PilarId) => void;
  resultado: ResultadoCuota;
  email: string;
  setEmail: (email: string) => void;
  enviandoPropuesta: boolean;
  propuestaEnviada: boolean;
  errorPropuesta: string;
  enviarPropuesta: () => Promise<void>;
}

export function useCalculadoraCuota(
  gateway: SimulacionesGateway,
  origen: string,
): EstadoCalculadora {
  const [paso, setPaso] = useState(1);
  const [formaJuridica, setFormaJuridica] = useState<FormaJuridica>('sociedad');
  const [trabajadoresTexto, setTrabajadoresTexto] = useState('3');
  const [facturas, setFacturas] = useState<RangoFacturas>('menos_50');
  const [pilares, setPilares] = useState<PilarId[]>(['laboral', 'fiscal', 'juridico']);
  const [simulacionId, setSimulacionId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [enviandoPropuesta, setEnviandoPropuesta] = useState(false);
  const [propuestaEnviada, setPropuestaEnviada] = useState(false);
  const [errorPropuesta, setErrorPropuesta] = useState('');
  const ultimaSimulacionGuardada = useRef('');

  const trabajadores =
    trabajadoresTexto === '' ? 0 : Math.max(0, parseInt(trabajadoresTexto, 10) || 0);

  const datos = useMemo<DatosSimulacion>(
    () => ({
      forma_juridica: formaJuridica,
      num_trabajadores: trabajadores,
      num_facturas: facturas,
      pilares,
    }),
    [formaJuridica, trabajadores, facturas, pilares],
  );

  const resultado = useMemo(() => calcularCuota(datos), [datos]);

  const alternarPilar = (pilar: PilarId) => {
    setPilares((actuales) =>
      actuales.includes(pilar)
        ? actuales.filter((id) => id !== pilar)
        : [...actuales, pilar],
    );
  };

  const construirPayload = useCallback(
    (): SimulacionPayload => ({
      ...datos,
      total_primer_mes: resultado.totalPrimerMes,
      total_recurrente: resultado.totalRecurrente,
      total_360: resultado.total360,
      presupuesto_personalizado: resultado.requierePresupuesto,
      desglose: resultado.lineas,
      origen,
    }),
    [datos, resultado, origen],
  );

  const guardarSimulacion = useCallback(async () => {
    const firma = JSON.stringify(datos);
    if (ultimaSimulacionGuardada.current === firma) {
      return;
    }
    ultimaSimulacionGuardada.current = firma;
    const payload = construirPayload();
    try {
      if (simulacionId) {
        const respuesta = await gateway.actualizar(simulacionId, payload);
        if (!respuesta.ok) {
          console.error('[Calculadora] No se pudo actualizar la simulación:', respuesta.error);
        }
      } else {
        const respuesta = await gateway.crear(payload);
        if (respuesta.ok && respuesta.data?._id) {
          setSimulacionId(respuesta.data._id);
        } else {
          console.error('[Calculadora] No se pudo guardar la simulación:', respuesta.error);
        }
      }
    } catch (error) {
      console.error('[Calculadora] Error guardando la simulación:', error);
    }
  }, [datos, construirPayload, simulacionId, gateway]);

  useEffect(() => {
    if (paso !== 3) {
      return;
    }
    const temporizador = setTimeout(() => {
      void guardarSimulacion();
    }, RETARDO_GUARDADO_MS);
    return () => clearTimeout(temporizador);
  }, [paso, guardarSimulacion]);

  const enviarPropuesta = async () => {
    setErrorPropuesta('');
    if (!PATRON_EMAIL.test(email)) {
      setErrorPropuesta('Introduce un email válido para enviarte la propuesta.');
      return;
    }
    setEnviandoPropuesta(true);
    try {
      const respuesta = await gateway.enviarPropuesta({
        ...construirPayload(),
        simulacion_id: simulacionId,
        email,
      });
      if (respuesta.ok) {
        setPropuestaEnviada(true);
      } else {
        console.error('[Calculadora] Error enviando la propuesta:', respuesta.error);
        setErrorPropuesta(
          'No hemos podido enviar la propuesta. Inténtalo de nuevo o escríbenos.',
        );
      }
    } catch (error) {
      console.error('[Calculadora] Error enviando la propuesta:', error);
      setErrorPropuesta(
        'No hemos podido enviar la propuesta. Inténtalo de nuevo o escríbenos.',
      );
    } finally {
      setEnviandoPropuesta(false);
    }
  };

  return {
    paso,
    setPaso,
    formaJuridica,
    setFormaJuridica,
    trabajadoresTexto,
    setTrabajadoresTexto,
    trabajadores,
    facturas,
    setFacturas,
    pilares,
    alternarPilar,
    resultado,
    email,
    setEmail,
    enviandoPropuesta,
    propuestaEnviada,
    errorPropuesta,
    enviarPropuesta,
  };
}
