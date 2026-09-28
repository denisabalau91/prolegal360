import { Tabla } from '@/components/ui/Tabla';
import {
  MAXIMO_TRABAJADORES_TARIFA,
  TARIFA_JURIDICA,
  etiquetaTramo,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';

export function TablaTarifaJuridica() {
  return (
    <Tabla
      titulo="Cuota mensual del departamento jurídico según plantilla"
      columnas={[
        { titulo: 'Plantilla' },
        { titulo: 'Perfil' },
        { titulo: 'Cuota mensual', numerica: true },
      ]}
      filas={[
        ...TARIFA_JURIDICA.map((tramo) => ({
          id: `${tramo.desde}`,
          celdas: [
            etiquetaTramo(tramo),
            tramo.perfil,
            formatearImporte(tramo.cuota),
          ],
        })),
        {
          id: 'mas',
          celdas: [
            `Más de ${MAXIMO_TRABAJADORES_TARIFA} trabajadores`,
            'Gran empresa',
            'Presupuesto personalizado',
          ],
        },
      ]}
    />
  );
}
