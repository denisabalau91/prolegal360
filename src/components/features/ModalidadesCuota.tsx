import {
  DESCUENTO_PRIMER_MES_JURIDICO_PORCENTAJE,
  etiquetaTrabajadores,
  type CotizacionModalidad,
  type ModalidadId,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';
import styles from '@/components/features/ModalidadesCuota.module.css';

interface ModalidadesCuotaProps {
  trabajadores: number;
  modalidades: CotizacionModalidad[];
  modalidadActiva: ModalidadId | null;
  onElegir: (modalidad: ModalidadId) => void;
}

export function ModalidadesCuota({
  trabajadores,
  modalidades,
  modalidadActiva,
  onElegir,
}: ModalidadesCuotaProps) {
  return (
    <div className={styles.bloque}>
      <div className={styles.cabecera}>
        <h3 className={styles.titulo}>Compara las tres formas de contratar</h3>
        <p className={styles.subtitulo}>
          Precios para {etiquetaTrabajadores(trabajadores)}, sin IVA ni IGIC.
        </p>
      </div>
      <div className={styles.rejilla}>
        {modalidades.map((modalidad) => {
          const activa = modalidad.id === modalidadActiva;
          return (
            <article
              key={modalidad.id}
              className={[
                styles.tarjeta,
                modalidad.id === 'pack' ? styles.tarjetaPack : '',
                activa ? styles.tarjetaActiva : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {modalidad.ahorroMensual !== null && (
                <span className={styles.ahorro}>
                  Ahorras {formatearImporte(modalidad.ahorroMensual)}/mes
                </span>
              )}
              <p className={styles.nombre}>{modalidad.nombre}</p>
              <p className={styles.contenido}>{modalidad.contenido}</p>
              <p className={styles.precio}>
                {modalidad.cuotaMensual === null ? (
                  <span className={styles.precioMedida}>Presupuesto personalizado</span>
                ) : (
                  <>
                    {formatearImporte(modalidad.cuotaMensual)}
                    <span className={styles.sufijo}>/mes</span>
                  </>
                )}
              </p>
              {modalidad.primerMes !== null &&
                modalidad.cuotaMensual !== null &&
                modalidad.primerMes < modalidad.cuotaMensual && (
                  <p className={styles.primerMes}>
                    1.er mes: {formatearImporte(modalidad.primerMes)} (−
                    {DESCUENTO_PRIMER_MES_JURIDICO_PORCENTAJE} %)
                  </p>
                )}
              <button
                type="button"
                onClick={() => onElegir(modalidad.id)}
                aria-pressed={activa}
                className={[styles.boton, activa ? styles.botonActivo : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {activa ? 'Seleccionada' : 'Elegir esta opción'}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
