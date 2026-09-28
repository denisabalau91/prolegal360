import { Tabla } from '@/components/ui/Tabla';
import {
  MAXIMO_TRABAJADORES_TARIFA,
  TARIFA_LABORAL,
  etiquetaTramo,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';

const PRESUPUESTO = 'Presupuesto personalizado';

export function TablaTarifaLaboral() {
  return (
    <Tabla
      titulo="Tarifa laboral por trabajador y mes"
      columnas={[
        { titulo: 'Plantilla' },
        { titulo: 'Nómina', numerica: true },
        { titulo: 'Gestión', numerica: true },
        { titulo: 'Total por trabajador', numerica: true },
      ]}
      filas={[
        ...TARIFA_LABORAL.map((tramo) => ({
          id: `${tramo.desde}`,
          celdas: [
            etiquetaTramo(tramo),
            formatearImporte(tramo.nomina),
            formatearImporte(tramo.gestion),
            formatearImporte(tramo.nomina + tramo.gestion),
          ],
        })),
        {
          id: 'mas',
          celdas: [`Más de ${MAXIMO_TRABAJADORES_TARIFA} trabajadores`, '—', '—', PRESUPUESTO],
        },
      ]}
    />
  );
}
