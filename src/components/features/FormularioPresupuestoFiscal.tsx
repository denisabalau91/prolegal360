'use client';

import { useState } from 'react';
import { FormularioSolicitud } from '@/components/features/FormularioSolicitud';
import { Campo } from '@/components/ui/Campo';
import { Select } from '@/components/ui/Select';

const FORMAS_JURIDICAS = [
  'Sociedad limitada (SL)',
  'Sociedad anónima (SA)',
  'Autónomo',
  'Otra',
];
const IMPUESTOS_INDIRECTOS = ['IGIC (Canarias)', 'IVA (península y Baleares)', 'No lo sé'];
const VOLUMENES_FACTURAS = [
  'Menos de 50 facturas al mes',
  'Entre 50 y 100 facturas al mes',
  'Entre 100 y 200 facturas al mes',
  'Más de 200 facturas al mes',
];
const LLEVANZA_CONTABILIDAD = [
  'La llevamos internamente',
  'La lleva una gestoría o asesoría',
  'Todavía no llevamos contabilidad',
];

interface SelectorFiscalProps {
  id: string;
  etiqueta: string;
  opciones: string[];
  valor: string;
  onCambio: (valor: string) => void;
}

function SelectorFiscal({ id, etiqueta, opciones, valor, onCambio }: SelectorFiscalProps) {
  return (
    <Campo id={id} etiqueta={etiqueta}>
      <Select id={id} value={valor} onChange={(evento) => onCambio(evento.target.value)}>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </Select>
    </Campo>
  );
}

export function FormularioPresupuestoFiscal() {
  const [formaJuridica, setFormaJuridica] = useState(FORMAS_JURIDICAS[0]);
  const [impuesto, setImpuesto] = useState(IMPUESTOS_INDIRECTOS[0]);
  const [facturas, setFacturas] = useState(VOLUMENES_FACTURAS[0]);
  const [contabilidad, setContabilidad] = useState(LLEVANZA_CONTABILIDAD[0]);

  return (
    <FormularioSolicitud
      idPrefijo="fiscal"
      origen="/asesoria-fiscal"
      asunto="Solicitud de presupuesto — Asesoría fiscal y contabilidad"
      textoBoton="Pedir presupuesto en 24 h"
      textoConfirmacion="En menos de 24 horas laborables recibirás el presupuesto cerrado por escrito."
      etiquetaMensaje="¿Algo más que debamos saber?"
      placeholderMensaje="Actividad, operaciones con el extranjero, subvenciones recibidas, fechas límite…"
      camposExtra={{ forma_juridica: formaJuridica }}
      detalles={[
        { etiqueta: 'Impuesto indirecto', valor: impuesto },
        { etiqueta: 'Volumen de facturas', valor: facturas },
        { etiqueta: 'Contabilidad', valor: contabilidad },
      ]}
      campos={
        <>
          <SelectorFiscal
            id="fiscal-forma"
            etiqueta="Forma jurídica"
            opciones={FORMAS_JURIDICAS}
            valor={formaJuridica}
            onCambio={setFormaJuridica}
          />
          <SelectorFiscal
            id="fiscal-impuesto"
            etiqueta="Impuesto indirecto"
            opciones={IMPUESTOS_INDIRECTOS}
            valor={impuesto}
            onCambio={setImpuesto}
          />
          <SelectorFiscal
            id="fiscal-facturas"
            etiqueta="Volumen de facturas"
            opciones={VOLUMENES_FACTURAS}
            valor={facturas}
            onCambio={setFacturas}
          />
          <SelectorFiscal
            id="fiscal-contabilidad"
            etiqueta="¿Quién lleva tu contabilidad?"
            opciones={LLEVANZA_CONTABILIDAD}
            valor={contabilidad}
            onCambio={setContabilidad}
          />
        </>
      }
    />
  );
}
