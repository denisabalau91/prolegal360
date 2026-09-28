import { Tabla } from '@/components/ui/Tabla';
import { TARIFAS_FINCA } from '@/core/domain/fincas';
import { formatearImporte } from '@/core/domain/importe';

export function TablaTarifasFincas() {
  return (
    <Tabla
      titulo="Tarifas de administración de fincas por unidad y mes"
      columnas={[
        { titulo: 'Tarifa' },
        { titulo: 'Vivienda', numerica: true },
        { titulo: 'Local y garaje', numerica: true },
      ]}
      filas={TARIFAS_FINCA.map((tarifa) => ({
        id: tarifa.id,
        resaltada: tarifa.destacada,
        celdas: [
          <>
            <strong>{tarifa.nombre}</strong> · {tarifa.contenido.toLowerCase()}
          </>,
          formatearImporte(tarifa.vivienda),
          formatearImporte(tarifa.localGaraje),
        ],
      }))}
    />
  );
}
