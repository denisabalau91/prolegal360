'use client';

import { DesgloseCuota } from '@/components/features/DesgloseCuota';
import { ModalidadesCuota } from '@/components/features/ModalidadesCuota';
import { PropuestaEmail } from '@/components/features/PropuestaEmail';
import { ButtonLink } from '@/components/ui/Button';
import { Campo } from '@/components/ui/Campo';
import { Casilla } from '@/components/ui/Casilla';
import { SelectorNumerico } from '@/components/ui/SelectorNumerico';
import { IconoFlechaDerecha } from '@/components/ui/icons';
import {
  MAXIMO_TRABAJADORES_TARIFA,
  MODALIDADES,
  OPCIONES_SERVICIOS,
  etiquetaTrabajadores,
  type ModalidadId,
} from '@/core/domain/calculadora';
import { AHORRO_PACK_POR_TRABAJADOR, DISCLAIMER_CUOTA } from '@/core/domain/site';
import { useCalculadoraCuota } from '@/hooks/use-calculadora-cuota';
import { simulacionesLocal } from '@/infrastructure/simulaciones-local';
import styles from '@/components/features/CalculadoraCuota.module.css';

interface CalculadoraCuotaProps {
  origen?: string;
}

function hrefAlta(modalidad: ModalidadId, trabajadores: number, conFiscal: boolean): string {
  const parametros = new URLSearchParams({ plan: modalidad, trabajadores: String(trabajadores) });
  if (conFiscal) {
    parametros.set('fiscal', '1');
  }
  return `/alta?${parametros.toString()}`;
}

export function CalculadoraCuota({ origen = '/calculadora' }: CalculadoraCuotaProps) {
  const calculadora = useCalculadoraCuota(simulacionesLocal, origen);
  const { resultado, trabajadores } = calculadora;
  const nombreModalidad = MODALIDADES.find((opcion) => opcion.id === resultado.modalidad)?.nombre;
  const puedeContratar = resultado.modalidad !== null && !resultado.requierePresupuesto;

  return (
    <div className={styles.contenedor}>
      <div className={styles.rejilla}>
        <div className={styles.panelDatos}>
          <div>
            <h3 className={styles.tituloPanel}>1 · Tu plantilla</h3>
            <p className={styles.subtituloPanel}>
              Sin email ni teléfono. El resultado se actualiza al momento.
            </p>
          </div>

          <Campo
            id="calc-trabajadores"
            etiqueta="Número de trabajadores"
            ayuda={`Tramos: 1–10, 11–50 y 51–${MAXIMO_TRABAJADORES_TARIFA}. Con más de ${MAXIMO_TRABAJADORES_TARIFA}, presupuesto personalizado.`}
          >
            <SelectorNumerico
              id="calc-trabajadores"
              valor={calculadora.trabajadoresTexto}
              minimo={1}
              onCambio={calculadora.setTrabajadoresTexto}
              etiquetaAccesible="número de trabajadores"
            />
          </Campo>

          <fieldset className={styles.servicios}>
            <legend className={styles.tituloPanel}>2 · Qué necesitas</legend>
            <div className={styles.listaServicios}>
              {OPCIONES_SERVICIOS.map((servicio) => (
                <Casilla
                  key={servicio.id}
                  marcada={calculadora.servicios.includes(servicio.id)}
                  onCambio={() => calculadora.alternarServicio(servicio.id)}
                  titulo={servicio.label}
                  descripcion={servicio.descripcion}
                  etiqueta={servicio.etiqueta}
                />
              ))}
            </div>
            <p className={styles.pista}>
              Laboral + jurídico juntos:{' '}
              <strong>{AHORRO_PACK_POR_TRABAJADOR} menos por trabajador</strong>, todos los meses.
            </p>
          </fieldset>
        </div>

        <div className={styles.panelResultado} aria-live="polite">
          <div>
            <h3 className={styles.tituloPanel}>3 · Tu cuota</h3>
            <p className={styles.subtituloPanel}>
              {etiquetaTrabajadores(trabajadores)}
              {nombreModalidad ? ` · ${nombreModalidad}` : ''}
            </p>
          </div>

          <DesgloseCuota resultado={resultado} />

          {(puedeContratar || resultado.incluyeFiscal) && (
            <div className={styles.acciones}>
              {puedeContratar && resultado.modalidad && (
                <ButtonLink
                  href={hrefAlta(resultado.modalidad, trabajadores, resultado.incluyeFiscal)}
                  size="lg"
                  className={styles.botonContratar}
                >
                  Contratar {nombreModalidad?.toLowerCase()}
                  <IconoFlechaDerecha className={styles.iconoBoton} />
                </ButtonLink>
              )}
              {resultado.incluyeFiscal && (
                <ButtonLink
                  href="/asesoria-fiscal#presupuesto"
                  size="lg"
                  variant="outline"
                  className={styles.botonFiscal}
                >
                  Pedir presupuesto fiscal
                </ButtonLink>
              )}
            </div>
          )}

          {resultado.lineas.length > 0 && (
            <PropuestaEmail
              email={calculadora.email}
              onCambioEmail={calculadora.setEmail}
              enviando={calculadora.enviandoPropuesta}
              enviada={calculadora.propuestaEnviada}
              error={calculadora.errorPropuesta}
              onEnviar={calculadora.enviarPropuesta}
            />
          )}
        </div>
      </div>

      <ModalidadesCuota
        trabajadores={trabajadores}
        modalidades={calculadora.modalidades}
        modalidadActiva={resultado.modalidad}
        onElegir={calculadora.elegirModalidad}
      />

      <div className={styles.notaLegal}>
        <p className={styles.notaLegalTexto}>{DISCLAIMER_CUOTA}</p>
      </div>
    </div>
  );
}
