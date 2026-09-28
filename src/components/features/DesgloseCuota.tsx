import { ButtonLink } from '@/components/ui/Button';
import { IconoTrianguloAlerta } from '@/components/ui/icons';
import {
  DESCUENTO_PACK_POR_TRABAJADOR,
  DESCUENTO_PRIMER_MES_JURIDICO_PORCENTAJE,
  MAXIMO_TRABAJADORES_TARIFA,
  etiquetaTrabajadores,
  type LineaCuota,
  type ResultadoCuota,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';
import { AHORRO_PACK_POR_TRABAJADOR, CONDICION_PROMOCION_JURIDICO } from '@/core/domain/site';
import styles from '@/components/features/DesgloseCuota.module.css';

interface DesgloseCuotaProps {
  resultado: ResultadoCuota;
}

function textoImporteLinea(linea: LineaCuota): string {
  if (linea.importe !== null) {
    return formatearImporte(linea.importe);
  }
  return linea.servicio === 'fiscal' ? 'En 24 h' : 'A medida';
}

export function DesgloseCuota({ resultado }: DesgloseCuotaProps) {
  const {
    trabajadores,
    lineas,
    modalidad,
    descuentoPack,
    cuotaMensual,
    primerMes,
    descuentoPrimerMes,
    requierePresupuesto,
    incluyeFiscal,
  } = resultado;

  if (lineas.length === 0) {
    return (
      <div className={styles.vacio}>
        <p className={styles.tituloVacio}>Marca al menos un servicio</p>
        <p className={styles.textoVacio}>
          Elige laboral, departamento jurídico o fiscal y verás tu cuota al instante.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.desglose}>
      <ul className={styles.lineas}>
        {lineas.map((linea) => (
          <li key={linea.servicio} className={styles.linea}>
            <div className={styles.lineaTextos}>
              <p className={styles.lineaEtiqueta}>{linea.etiqueta}</p>
              <p className={styles.lineaDetalle}>{linea.detalle}</p>
            </div>
            <span
              className={[
                styles.lineaImporte,
                linea.importe === null ? styles.lineaImportePendiente : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {textoImporteLinea(linea)}
            </span>
          </li>
        ))}
        {descuentoPack !== null && (
          <li className={`${styles.linea} ${styles.lineaDescuento}`}>
            <div className={styles.lineaTextos}>
              <p className={styles.lineaEtiqueta}>Descuento pack laboral + jurídico</p>
              <p className={styles.lineaDetalle}>
                {etiquetaTrabajadores(trabajadores)} × {formatearImporte(DESCUENTO_PACK_POR_TRABAJADOR)}{' '}
                menos en la asesoría laboral
              </p>
            </div>
            <span className={styles.lineaImporte}>−{formatearImporte(descuentoPack)}</span>
          </li>
        )}
      </ul>

      {modalidad === 'laboral' && (
        <div className={styles.aviso}>
          <IconoTrianguloAlerta className={styles.iconoAviso} />
          <p className={styles.textoAviso}>
            Sin departamento jurídico, cada carta de despido, requerimiento o inspección se
            presupuesta aparte. Añádelo en el pack y la laboral te cuesta{' '}
            {AHORRO_PACK_POR_TRABAJADOR} menos por trabajador.
          </p>
        </div>
      )}

      {requierePresupuesto && (
        <div className={styles.bloqueMedida}>
          <p className={styles.tituloMedida}>
            Más de {MAXIMO_TRABAJADORES_TARIFA} trabajadores: presupuesto personalizado
          </p>
          <p className={styles.textoMedida}>
            Con {etiquetaTrabajadores(trabajadores)} calculamos tu cuota a medida y te la
            enviamos por escrito, con precio cerrado, en menos de 24 h laborables.
          </p>
          <ButtonLink href="/contacto?origen=calculadora" className={styles.botonMedida}>
            Pedir presupuesto personalizado
          </ButtonLink>
        </div>
      )}

      {cuotaMensual !== null && (
        <div className={styles.totales}>
          <div className={styles.totalPrincipal}>
            <p className={styles.totalTitulo}>Cuota mensual</p>
            <p className={styles.totalImporte}>
              {formatearImporte(cuotaMensual)}
              <span className={styles.totalSufijo}>/mes</span>
            </p>
            <p className={styles.totalNota}>+ IVA o IGIC · Sin permanencia</p>
          </div>
          {primerMes !== null && descuentoPrimerMes !== null && (
            <div className={styles.totalPrimerMes}>
              <p className={styles.totalTitulo}>Primer mes</p>
              <p className={styles.totalImporteSecundario}>
                {formatearImporte(primerMes)}
              </p>
              <p className={styles.totalNota}>
                Nuevas altas: {DESCUENTO_PRIMER_MES_JURIDICO_PORCENTAJE} % de descuento en el
                departamento jurídico (−{formatearImporte(descuentoPrimerMes)}).
              </p>
            </div>
          )}
        </div>
      )}

      {modalidad === 'pack' && (
        <p className={styles.notaPromocion}>{CONDICION_PROMOCION_JURIDICO}</p>
      )}

      {incluyeFiscal && (
        <p className={styles.notaFiscal}>
          {modalidad === null
            ? 'La asesoría fiscal y contable no tiene tarifa genérica: la presupuestamos a partir de tu contabilidad y te enviamos el precio cerrado en 24 h laborables.'
            : 'La asesoría fiscal y contable se suma aparte: te enviamos su presupuesto cerrado en 24 h laborables.'}
        </p>
      )}
    </div>
  );
}
