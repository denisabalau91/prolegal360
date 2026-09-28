'use client';

import { useEffect, useRef } from 'react';
import { SolicitudFincas } from '@/components/features/SolicitudFincas';
import { Button } from '@/components/ui/Button';
import { Campo } from '@/components/ui/Campo';
import { Casilla } from '@/components/ui/Casilla';
import { SelectorNumerico } from '@/components/ui/SelectorNumerico';
import { SelectorSegmentado } from '@/components/ui/SelectorSegmentado';
import { IconoCheck } from '@/components/ui/icons';
import {
  OPCIONES_TIPO_FINCA,
  PORTAL_REFERENCIA,
  PRECIO_ZONA_COMUN,
  ZONAS_COMUNES,
  type PresupuestoFinca,
  type TarifaFincaId,
} from '@/core/domain/fincas';
import { formatearImporte } from '@/core/domain/importe';
import { useCalculadoraFincas, type CampoNumerico } from '@/hooks/use-calculadora-fincas';
import styles from '@/components/features/CalculadoraFincas.module.css';

interface EntradaNumericaProps {
  id: string;
  etiqueta: string;
  campo: CampoNumerico;
  ayuda?: string;
}

function EntradaNumerica({ id, etiqueta, campo, ayuda }: EntradaNumericaProps) {
  return (
    <Campo id={id} etiqueta={etiqueta} ayuda={ayuda}>
      <SelectorNumerico
        id={id}
        valor={campo.texto}
        minimo={0}
        onCambio={campo.cambiar}
        etiquetaAccesible={etiqueta.toLowerCase()}
      />
    </Campo>
  );
}

interface PresupuestosFincaProps {
  presupuesto: PresupuestoFinca;
  tarifaElegida: TarifaFincaId | null;
  onElegir: (tarifa: TarifaFincaId) => void;
}

function PresupuestosFinca({ presupuesto, tarifaElegida, onElegir }: PresupuestosFincaProps) {
  return (
    <div className={styles.rejillaTarifas}>
      {presupuesto.presupuestos.map(({ tarifa, conceptos, cuotaMensual }) => {
        const elegida = tarifa.id === tarifaElegida;
        return (
          <article
            key={tarifa.id}
            className={[
              styles.tarjeta,
              tarifa.destacada ? styles.tarjetaDestacada : '',
              elegida ? styles.tarjetaElegida : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {tarifa.destacada && <span className={styles.etiqueta}>Recomendada</span>}
            <p className={styles.nombreTarifa}>{tarifa.nombre}</p>
            <p className={styles.contenidoTarifa}>{tarifa.contenido}</p>
            <p className={styles.importe}>
              {formatearImporte(cuotaMensual)}
              <span className={styles.sufijo}>/mes</span>
            </p>
            <ul className={styles.desglose}>
              {conceptos.map((linea) => (
                <li key={linea.unidad}>
                  {linea.cantidad} {linea.unidad} × {formatearImporte(linea.precioUnitario)} ={' '}
                  {formatearImporte(linea.importe)}
                </li>
              ))}
            </ul>
            <ul className={styles.incluye}>
              {tarifa.incluye.map((item) => (
                <li key={item} className={styles.itemIncluye}>
                  <IconoCheck className={styles.iconoCheck} strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              type="button"
              onClick={() => onElegir(tarifa.id)}
              aria-pressed={elegida}
              className={tarifa.destacada || elegida ? styles.botonPrincipal : styles.botonSecundario}
            >
              {elegida ? 'Tarifa elegida' : `Solicitar la tarifa ${tarifa.nombre}`}
            </Button>
          </article>
        );
      })}
    </div>
  );
}

const AYUDA_PORTALES = `Cada portal se cobra como un portal tipo de ${PORTAL_REFERENCIA.viviendas} viviendas, ${PORTAL_REFERENCIA.locales} locales y ${PORTAL_REFERENCIA.garajes} garajes.`;

export function CalculadoraFincas() {
  const calculadora = useCalculadoraFincas();
  const { tipo, presupuesto, zonas, solicitudAbierta, tarifaElegida } = calculadora;
  const refSolicitud = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (solicitudAbierta) {
      refSolicitud.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [solicitudAbierta, tarifaElegida]);

  return (
    <div className={styles.contenedor}>
      <div className={styles.datos}>
        <SelectorSegmentado
          leyenda="¿Qué tipo de finca es?"
          opciones={OPCIONES_TIPO_FINCA}
          valor={tipo}
          onCambio={calculadora.setTipo}
        />

        {tipo === 'comunidad' ? (
          <div className={styles.rejillaCampos}>
            <EntradaNumerica id="finca-viviendas" etiqueta="Viviendas" campo={calculadora.viviendas} />
            <EntradaNumerica id="finca-locales" etiqueta="Locales" campo={calculadora.locales} />
            <EntradaNumerica
              id="finca-garajes"
              etiqueta="Plazas de garaje"
              campo={calculadora.garajes}
            />
          </div>
        ) : (
          <div className={styles.mancomunidad}>
            <EntradaNumerica
              id="finca-portales"
              etiqueta="Portales"
              campo={calculadora.portales}
              ayuda={AYUDA_PORTALES}
            />
            <fieldset className={styles.zonas}>
              <legend className={styles.leyenda}>
                Zonas comunes · {formatearImporte(PRECIO_ZONA_COMUN)}/mes cada una
              </legend>
              <div className={styles.rejillaZonas}>
                {ZONAS_COMUNES.map((zona) => {
                  const cantidad = zonas[zona.id];
                  return (
                    <Casilla
                      key={zona.id}
                      marcada={cantidad !== undefined}
                      onCambio={() => calculadora.alternarZona(zona.id)}
                      titulo={zona.nombre}
                      complemento={
                        cantidad !== undefined && (
                          <SelectorNumerico
                            id={`zona-${zona.id}`}
                            valor={String(cantidad)}
                            minimo={1}
                            compacto
                            onCambio={(valor) => calculadora.cambiarCantidadZona(zona.id, valor)}
                            etiquetaAccesible={`cantidad de ${zona.nombre.toLowerCase()}`}
                          />
                        )
                      }
                    />
                  );
                })}
              </div>
            </fieldset>
          </div>
        )}
      </div>

      <div className={styles.resultado} aria-live="polite">
        <p className={styles.tituloResultado}>
          {tipo === 'comunidad'
            ? 'Los tres presupuestos de tu comunidad'
            : 'Los tres presupuestos de tu mancomunidad'}
        </p>
        <PresupuestosFinca
          presupuesto={presupuesto}
          tarifaElegida={tarifaElegida}
          onElegir={calculadora.elegirTarifa}
        />
        <p className={styles.notaPrecios}>
          Precios mensuales sin IVA ni IGIC. ¿Ya tienes administrador? Envíanos tu último recibo
          o tu contrato y nos ajustamos a tu presupuesto actual.
        </p>
      </div>

      {solicitudAbierta && (
        <div ref={refSolicitud} className={styles.solicitud}>
          <p className={styles.tituloResultado}>Recibe el presupuesto por escrito</p>
          <p className={styles.subtituloSolicitud}>
            Con estos datos preparamos la propuesta definitiva para tu {tipo}.
          </p>
          <div className={styles.cuerpoSolicitud}>
            <SolicitudFincas tipo={tipo} detallesPresupuesto={calculadora.detallesSolicitud} />
          </div>
        </div>
      )}
    </div>
  );
}
