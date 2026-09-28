import { Tabla } from '@/components/ui/Tabla';
import { TRABAJADORES_EJEMPLO } from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';
import { cotizarModalidades } from '@/core/use-cases/calcular-cuota';

export function TablaModalidades() {
  return (
    <Tabla
      titulo={`Formas de contratación con ${TRABAJADORES_EJEMPLO} trabajadores`}
      columnas={[
        { titulo: 'Modalidad' },
        { titulo: 'Contenido' },
        { titulo: `Precio (${TRABAJADORES_EJEMPLO} trabajadores)`, numerica: true },
        { titulo: 'Primer mes', numerica: true },
      ]}
      filas={cotizarModalidades(TRABAJADORES_EJEMPLO).map((modalidad) => ({
        id: modalidad.id,
        resaltada: modalidad.id === 'pack',
        celdas: [
          modalidad.nombre,
          modalidad.ahorroMensual === null
            ? modalidad.contenido
            : `${modalidad.contenido} · ahorro de ${formatearImporte(modalidad.ahorroMensual)}/mes`,
          modalidad.cuotaMensual === null ? '—' : `${formatearImporte(modalidad.cuotaMensual)}/mes`,
          modalidad.primerMes === null ? '—' : formatearImporte(modalidad.primerMes),
        ],
      }))}
    />
  );
}
