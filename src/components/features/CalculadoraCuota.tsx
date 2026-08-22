'use client';

import { Button, ButtonLink } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  IconoCargando,
  IconoCheck,
  IconoCorreo,
  IconoFlechaDerecha,
  IconoTrianguloAlerta,
} from '@/components/ui/icons';
import {
  OPCIONES_FACTURAS,
  OPCIONES_PILARES,
  etiquetaFacturas,
  formatearImporte,
  type FormaJuridica,
} from '@/core/domain/calculadora';
import { DISCLAIMER_CUOTA } from '@/core/domain/site';
import { useCalculadoraCuota } from '@/hooks/use-calculadora-cuota';
import { simulacionesLocal } from '@/infrastructure/simulaciones-local';
import styles from '@/components/features/CalculadoraCuota.module.css';

const PASOS_CALCULADORA = [
  { numero: 1, etiqueta: 'Tu empresa' },
  { numero: 2, etiqueta: 'Qué necesitas' },
  { numero: 3, etiqueta: 'Resultado' },
];

const OPCIONES_FORMA: { id: FormaJuridica; etiqueta: string; descripcion: string }[] = [
  { id: 'autonomo', etiqueta: 'Autónomo', descripcion: 'Persona física' },
  { id: 'sociedad', etiqueta: 'Sociedad', descripcion: 'SL o SA' },
];

interface CalculadoraCuotaProps {
  origen?: string;
}

export function CalculadoraCuota({ origen = '/calculadora' }: CalculadoraCuotaProps) {
  const calculadora = useCalculadoraCuota(simulacionesLocal, origen);
  const {
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
  } = calculadora;

  const planSeleccionado = resultado.aplica360 ? '360_integral' : pilares[0] || 'laboral';

  return (
    <div className={styles.contenedor}>
      <div className={styles.pestanas}>
        {PASOS_CALCULADORA.map((pestana) => (
          <button
            key={pestana.numero}
            type="button"
            onClick={() => setPaso(pestana.numero)}
            className={[styles.pestana, paso === pestana.numero ? styles.pestanaActiva : '']
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.numeroPestana}>{pestana.numero}</span>
            <span className={styles.etiquetaPestana}>{pestana.etiqueta}</span>
          </button>
        ))}
      </div>

      <div className={styles.cuerpo}>
        {paso === 1 && (
          <div className={styles.paso}>
            <div>
              <h3 className={styles.tituloPaso}>Paso 1 · Tu empresa</h3>
              <p className={styles.subtituloPaso}>
                Tres datos y tenemos tu cuota. No pedimos ni email ni teléfono.
              </p>
            </div>

            <fieldset>
              <legend className={styles.leyenda}>Forma jurídica</legend>
              <div className={styles.opcionesForma}>
                {OPCIONES_FORMA.map((opcion) => (
                  <button
                    key={opcion.id}
                    type="button"
                    onClick={() => setFormaJuridica(opcion.id)}
                    aria-pressed={formaJuridica === opcion.id}
                    className={[
                      styles.opcion,
                      formaJuridica === opcion.id ? styles.opcionActiva : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className={styles.opcionTitulo}>{opcion.etiqueta}</span>
                    <span className={styles.opcionDescripcion}>{opcion.descripcion}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <Label htmlFor="calc-trabajadores" className={styles.etiquetaCampo}>
                Número de trabajadores
              </Label>
              <Input
                id="calc-trabajadores"
                type="number"
                min={0}
                inputMode="numeric"
                value={trabajadoresTexto}
                onChange={(evento) =>
                  setTrabajadoresTexto(evento.target.value.replace(/[^0-9]/g, ''))
                }
                placeholder="0"
                className={styles.campoTrabajadores}
              />
              <p className={styles.ayudaCampo}>
                Trabajadores en alta en la Seguridad Social. Si no tienes plantilla, deja 0.
              </p>
            </div>

            <fieldset>
              <legend className={styles.leyenda}>Facturas al mes</legend>
              <div className={styles.opcionesFacturas}>
                {OPCIONES_FACTURAS.map((opcion) => (
                  <button
                    key={opcion.value}
                    type="button"
                    onClick={() => setFacturas(opcion.value)}
                    aria-pressed={facturas === opcion.value}
                    className={[
                      styles.opcionFactura,
                      facturas === opcion.value ? styles.opcionFacturaActiva : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {opcion.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <Button
                type="button"
                size="lg"
                className={styles.botonPrimario}
                onClick={() => setPaso(2)}
              >
                Siguiente <IconoFlechaDerecha className={styles.iconoBoton} />
              </Button>
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className={styles.paso}>
            <div>
              <h3 className={styles.tituloPaso}>Paso 2 · Qué necesitas</h3>
              <p className={styles.subtituloPaso}>
                Marca los pilares que quieres contratar. Con los tres se aplica el plan 360
                INTEGRAL.
              </p>
            </div>

            <div className={styles.listaPilares}>
              {OPCIONES_PILARES.map((pilar) => {
                const marcado = pilares.includes(pilar.id);
                return (
                  <button
                    key={pilar.id}
                    type="button"
                    onClick={() => alternarPilar(pilar.id)}
                    aria-pressed={marcado}
                    className={[styles.pilar, marcado ? styles.pilarActivo : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span
                      className={[
                        styles.casillaPilar,
                        marcado ? styles.casillaPilarActiva : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {marcado && <IconoCheck className={styles.iconoCasilla} strokeWidth={3} />}
                    </span>
                    <span className={styles.pilarTextos}>
                      <span className={styles.pilarCabecera}>
                        <span className={styles.pilarNombre}>{pilar.label}</span>
                        {pilar.etiqueta && (
                          <span className={styles.pilarEtiqueta}>{pilar.etiqueta}</span>
                        )}
                      </span>
                      <span className={styles.pilarDescripcion}>{pilar.descripcion}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={styles.accionesPaso}>
              <Button type="button" variant="outline" onClick={() => setPaso(1)}>
                Atrás
              </Button>
              <Button
                type="button"
                size="lg"
                className={styles.botonVerCuota}
                onClick={() => setPaso(3)}
                disabled={pilares.length === 0}
              >
                Ver mi cuota <IconoFlechaDerecha className={styles.iconoBoton} />
              </Button>
            </div>
            {pilares.length === 0 && (
              <p className={styles.avisoError}>
                Marca al menos un servicio para calcular tu cuota.
              </p>
            )}
          </div>
        )}

        {paso === 3 && (
          <div className={styles.paso}>
            <div>
              <h3 className={styles.tituloPaso}>Paso 3 · Tu cuota, línea a línea</h3>
              <p className={styles.subtituloPaso}>
                {formaJuridica === 'autonomo' ? 'Autónomo' : 'Sociedad'} · {trabajadores}{' '}
                {trabajadores === 1 ? 'trabajador' : 'trabajadores'} ·{' '}
                {etiquetaFacturas(facturas).toLowerCase()} facturas al mes
              </p>
            </div>

            <div className={styles.desglose}>
              {resultado.lineas.map((linea) => {
                const importeTachado =
                  linea.desmarcado || (linea.pilar === 'juridico' && !linea.desmarcado);
                return (
                  <div key={linea.pilar} className={styles.lineaDesglose}>
                    <div className={styles.lineaTextos}>
                      <p
                        className={[
                          styles.lineaEtiqueta,
                          linea.desmarcado ? styles.lineaEtiquetaTachada : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {linea.etiqueta}
                      </p>
                      <p className={styles.lineaDetalle}>{linea.detalle}</p>
                    </div>
                    <div className={styles.lineaImportes}>
                      <span
                        className={[
                          styles.lineaImporte,
                          importeTachado ? styles.lineaImporteTachado : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {linea.presupuesto ? 'A presupuestar' : formatearImporte(linea.importe)}
                      </span>
                      {linea.pilar === 'juridico' && !linea.desmarcado && !linea.presupuesto && (
                        <span className={styles.chipGratis}>0 € el primer mes</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {resultado.juridicoDesmarcado && (
              <div className={styles.avisoJuridico}>
                <IconoTrianguloAlerta className={styles.iconoAvisoJuridico} />
                <p className={styles.textoAvisoJuridico}>
                  Sin departamento jurídico. Cada consulta o actuación se factura aparte, sin
                  descuento de cliente.
                </p>
              </div>
            )}

            {resultado.requierePresupuesto ? (
              <div className={styles.bloquePresupuesto}>
                <p className={styles.tituloPresupuesto}>
                  Tu caso necesita un presupuesto personalizado
                </p>
                <p className={styles.textoPresupuesto}>
                  Por volumen de facturación o tamaño de plantilla, tu cuota se calcula a
                  medida con precio cerrado. Te lo damos por escrito en menos de 24 h
                  laborables.
                </p>
                <ButtonLink
                  href="/contacto?origen=calculadora"
                  className={styles.botonPresupuesto}
                >
                  Pedir presupuesto cerrado
                </ButtonLink>
              </div>
            ) : (
              <div className={styles.totales}>
                <div className={styles.totalPrimerMes}>
                  <p className={styles.totalTitulo}>Pagas el primer mes</p>
                  <p className={styles.totalImporteGrande}>
                    {formatearImporte(resultado.totalPrimerMes)}
                  </p>
                  <p className={styles.totalNota}>
                    Con el servicio jurídico gratuito el primer mes.
                  </p>
                </div>
                <div className={styles.totalRecurrente}>
                  <p className={styles.totalTituloRecurrente}>Cuota a partir del 2.º mes</p>
                  <p className={styles.totalImporteMedio}>
                    {formatearImporte(resultado.totalRecurrente)}
                    <span className={styles.sufijoMes}>/mes</span>
                  </p>
                  {resultado.aplica360 && resultado.total360 !== null && (
                    <p className={styles.nota360}>
                      Con plan 360 INTEGRAL: {formatearImporte(resultado.total360)}/mes —{' '}
                      <span className={styles.ahorro360}>
                        AHORRAS {formatearImporte(resultado.ahorro360)}/mes
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <p className={styles.notaCondiciones}>Sin permanencia · IVA no incluido</p>

            <div className={styles.accionesFinales}>
              <div>
                <ButtonLink
                  href={`/alta?plan=${planSeleccionado}`}
                  size="lg"
                  className={styles.botonContratar}
                >
                  Contratar este plan <IconoFlechaDerecha className={styles.iconoBoton} />
                </ButtonLink>
                <p className={styles.notaContratar}>
                  Te confirmamos el alta en menos de 24 h laborables.
                </p>
              </div>

              <div>
                {propuestaEnviada ? (
                  <div className={styles.confirmacionEmail}>
                    <IconoCheck className={styles.iconoConfirmacion} />
                    <span>
                      Propuesta preparada para <strong>{email}</strong>. Se ha abierto tu
                      cliente de correo con el desglose.
                    </span>
                  </div>
                ) : (
                  <form
                    onSubmit={(evento) => {
                      evento.preventDefault();
                      void enviarPropuesta();
                    }}
                    className={styles.formularioEmail}
                  >
                    <Label htmlFor="calc-email" className={styles.etiquetaCampo}>
                      Recibir esta propuesta por email
                    </Label>
                    <div className={styles.filaEmail}>
                      <Input
                        id="calc-email"
                        type="email"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        placeholder="tu@empresa.com"
                        autoComplete="email"
                      />
                      <Button type="submit" variant="outline" disabled={enviandoPropuesta}>
                        {enviandoPropuesta ? (
                          <IconoCargando className={`${styles.iconoEnviar} ${styles.girando}`} />
                        ) : (
                          <IconoCorreo className={styles.iconoEnviar} />
                        )}
                        <span className={styles.textoEnviar}>Enviar</span>
                      </Button>
                    </div>
                    {errorPropuesta && <p className={styles.avisoError}>{errorPropuesta}</p>}
                    <p className={styles.notaEmail}>
                      Solo te pedimos el email. Nada de llamadas insistentes.
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className={styles.pieCambiarDatos}>
              <Button type="button" variant="ghost" onClick={() => setPaso(1)}>
                Cambiar los datos
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.notaLegal}>
        <p className={styles.notaLegalTexto}>{DISCLAIMER_CUOTA}</p>
      </div>
    </div>
  );
}
