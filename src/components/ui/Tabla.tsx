import type { ReactNode } from 'react';
import styles from '@/components/ui/Tabla.module.css';

export interface ColumnaTabla {
  titulo: string;
  numerica?: boolean;
}

export interface FilaTabla {
  id: string;
  celdas: ReactNode[];
  resaltada?: boolean;
}

interface TablaProps {
  titulo: string;
  columnas: ColumnaTabla[];
  filas: FilaTabla[];
}

export function Tabla({ titulo, columnas, filas }: TablaProps) {
  const claseCelda = (indice: number) =>
    columnas[indice]?.numerica ? `${styles.celda} ${styles.celdaNumerica}` : styles.celda;

  return (
    <div className={styles.contenedor}>
      <table className={styles.tabla}>
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr className={styles.filaCabecera}>
            {columnas.map((columna, indice) => (
              <th key={columna.titulo} scope="col" className={claseCelda(indice)}>
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr
              key={fila.id}
              className={[styles.fila, fila.resaltada ? styles.filaResaltada : '']
                .filter(Boolean)
                .join(' ')}
            >
              {fila.celdas.map((celda, indice) =>
                indice === 0 ? (
                  <th
                    key={indice}
                    scope="row"
                    className={`${claseCelda(indice)} ${styles.celdaConcepto}`}
                  >
                    {celda}
                  </th>
                ) : (
                  <td key={indice} className={claseCelda(indice)}>
                    {celda}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
