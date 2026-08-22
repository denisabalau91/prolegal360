import type { ReactNode } from 'react';
import styles from '@/components/features/PaginaLegal.module.css';

export interface ApartadoLegal {
  id: string;
  indice: string;
  titulo: string;
  contenido: ReactNode;
}

interface PaginaLegalProps {
  apartados: ApartadoLegal[];
  fechaActualizacion: string;
}

export function PaginaLegal({ apartados, fechaActualizacion }: PaginaLegalProps) {
  return (
    <div className={styles.rejilla}>
      <nav aria-label="Índice del documento" className={styles.indice}>
        <p className={styles.tituloIndice}>Contenido</p>
        <ul className={styles.listaIndice}>
          {apartados.map((apartado) => (
            <li key={apartado.id}>
              <a href={`#${apartado.id}`} className={styles.enlaceIndice}>
                {apartado.indice}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.fecha}>Última actualización: {fechaActualizacion}</p>
      </nav>

      <div className={`prosa ${styles.contenido}`}>
        {apartados.map((apartado) => (
          <section key={apartado.id} id={apartado.id} className={styles.apartado}>
            <h2 className={styles.tituloApartado}>{apartado.titulo}</h2>
            <div className={styles.cuerpoApartado}>{apartado.contenido}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
