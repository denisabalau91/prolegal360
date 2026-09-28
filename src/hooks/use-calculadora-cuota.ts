'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MODALIDADES,
  TRABAJADORES_EJEMPLO,
  type CotizacionModalidad,
  type DatosSimulacion,
  type ModalidadId,
  type ResultadoCuota,
  type ServicioEmpresaId,
} from '@/core/domain/calculadora';
import { calcularCuota, cotizarModalidades } from '@/core/use-cases/calcular-cuota';
import type { SimulacionesGateway, SimulacionPayload } from '@/core/ports/simulaciones-gateway';
import { aEntero, esEmailValido, soloDigitos } from '@/utils/validacion';

const RETARDO_GUARDADO_MS = 900;
const MAXIMO_TRABAJADORES_ENTRADA = 9999;
const ERROR_PROPUESTA = 'No hemos podido enviar la propuesta. Inténtalo de nuevo o escríbenos.';

export interface EstadoCalculadora {
  trabajadoresTexto: string;
  setTrabajadoresTexto: (valor: string) => void;
  trabajadores: number;
  servicios: ServicioEmpresaId[];
  alternarServicio: (servicio: ServicioEmpresaId) => void;
  elegirModalidad: (modalidad: ModalidadId) => void;
  resultado: ResultadoCuota;
  modalidades: CotizacionModalidad[];
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
  const [trabajadoresTexto, setTrabajadoresTextoCrudo] = useState(String(TRABAJADORES_EJEMPLO));
  const [servicios, setServicios] = useState<ServicioEmpresaId[]>(['laboral', 'juridico']);
  const [interactuado, setInteractuado] = useState(false);
  const [simulacionId, setSimulacionId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [enviandoPropuesta, setEnviandoPropuesta] = useState(false);
  const [propuestaEnviada, setPropuestaEnviada] = useState(false);
  const [errorPropuesta, setErrorPropuesta] = useState('');
  const ultimaSimulacionGuardada = useRef('');

  const trabajadores = Math.min(aEntero(trabajadoresTexto, 1), MAXIMO_TRABAJADORES_ENTRADA);

  const setTrabajadoresTexto = (valor: string) => {
    setTrabajadoresTextoCrudo(soloDigitos(valor).slice(0, 4));
    setInteractuado(true);
  };

  const alternarServicio = (servicio: ServicioEmpresaId) => {
    setServicios((actuales) =>
      actuales.includes(servicio)
        ? actuales.filter((id) => id !== servicio)
        : [...actuales, servicio],
    );
    setInteractuado(true);
  };

  const elegirModalidad = (modalidad: ModalidadId) => {
    const serviciosModalidad = MODALIDADES.find((opcion) => opcion.id === modalidad)?.servicios;
    if (!serviciosModalidad) {
      return;
    }
    setServicios((actuales) => [
      ...serviciosModalidad,
      ...(actuales.includes('fiscal') ? (['fiscal'] as const) : []),
    ]);
    setInteractuado(true);
  };

  const datos = useMemo<DatosSimulacion>(
    () => ({ num_trabajadores: trabajadores, servicios }),
    [trabajadores, servicios],
  );

  const resultado = useMemo(() => calcularCuota(datos), [datos]);
  const modalidades = useMemo(() => cotizarModalidades(trabajadores), [trabajadores]);

  const construirPayload = useCallback(
    (): SimulacionPayload => ({
      ...datos,
      modalidad: resultado.modalidad,
      cuota_mensual: resultado.cuotaMensual,
      primer_mes: resultado.primerMes,
      descuento_pack: resultado.descuentoPack,
      presupuesto_personalizado: resultado.requierePresupuesto,
      presupuesto_fiscal: resultado.incluyeFiscal,
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
        return;
      }
      const respuesta = await gateway.crear(payload);
      if (respuesta.ok && respuesta.data?._id) {
        setSimulacionId(respuesta.data._id);
      } else {
        console.error('[Calculadora] No se pudo guardar la simulación:', respuesta.error);
      }
    } catch (error) {
      console.error('[Calculadora] Error guardando la simulación:', error);
    }
  }, [datos, construirPayload, simulacionId, gateway]);

  useEffect(() => {
    if (!interactuado || datos.servicios.length === 0) {
      return;
    }
    const temporizador = setTimeout(() => {
      void guardarSimulacion();
    }, RETARDO_GUARDADO_MS);
    return () => clearTimeout(temporizador);
  }, [interactuado, datos, guardarSimulacion]);

  const enviarPropuesta = async () => {
    setErrorPropuesta('');
    if (!esEmailValido(email)) {
      setErrorPropuesta('Introduce un email válido para enviarte la propuesta.');
      return;
    }
    setEnviandoPropuesta(true);
    try {
      const respuesta = await gateway.enviarPropuesta({
        ...construirPayload(),
        simulacion_id: simulacionId,
        email: email.trim(),
      });
      if (respuesta.ok) {
        setPropuestaEnviada(true);
      } else {
        console.error('[Calculadora] Error enviando la propuesta:', respuesta.error);
        setErrorPropuesta(ERROR_PROPUESTA);
      }
    } catch (error) {
      console.error('[Calculadora] Error enviando la propuesta:', error);
      setErrorPropuesta(ERROR_PROPUESTA);
    } finally {
      setEnviandoPropuesta(false);
    }
  };

  return {
    trabajadoresTexto,
    setTrabajadoresTexto,
    trabajadores,
    servicios,
    alternarServicio,
    elegirModalidad,
    resultado,
    modalidades,
    email,
    setEmail,
    enviandoPropuesta,
    propuestaEnviada,
    errorPropuesta,
    enviarPropuesta,
  };
}
