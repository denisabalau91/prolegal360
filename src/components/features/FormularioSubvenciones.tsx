'use client';

import { useState } from 'react';
import { FormularioSolicitud } from '@/components/features/FormularioSolicitud';
import { Campo } from '@/components/ui/Campo';
import { Casilla } from '@/components/ui/Casilla';
import { Select } from '@/components/ui/Select';
import { SUBVENCIONES_VIGENTES, type SubvencionId } from '@/core/domain/subvenciones';
import styles from '@/components/features/FormularioSubvenciones.module.css';

const SITUACIONES = [
  'Voy a darme de alta como autónomo',
  'Ya soy autónomo',
  'Tengo una sociedad',
  'Estoy estudiando montar una empresa',
];

export function FormularioSubvenciones() {
  const [interes, setInteres] = useState<SubvencionId[]>(
    SUBVENCIONES_VIGENTES.map((subvencion) => subvencion.id),
  );
  const [situacion, setSituacion] = useState(SITUACIONES[0]);
  const [avisarConvocatorias, setAvisarConvocatorias] = useState(true);

  const alternarInteres = (id: SubvencionId) => {
    setInteres((actuales) =>
      actuales.includes(id) ? actuales.filter((actual) => actual !== id) : [...actuales, id],
    );
  };

  const subvencionesElegidas = SUBVENCIONES_VIGENTES.filter((subvencion) =>
    interes.includes(subvencion.id),
  )
    .map((subvencion) => subvencion.titulo)
    .join(', ');

  return (
    <FormularioSolicitud
      idPrefijo="subvenciones"
      origen="/subvenciones"
      asunto="Información sobre subvenciones"
      textoBoton="Quiero información"
      textoConfirmacion="Revisamos tu caso y te llamamos en menos de 24 horas laborables para decirte si encajas."
      etiquetaMensaje="Cuéntanos tu proyecto"
      placeholderMensaje="Actividad, fecha prevista de alta o de contratación, número de personas que quieres contratar…"
      validarExtra={() =>
        interes.length === 0 && !avisarConvocatorias
          ? 'Marca al menos una subvención o pide que te avisemos de nuevas convocatorias.'
          : null
      }
      detalles={[
        { etiqueta: 'Subvenciones de interés', valor: subvencionesElegidas || 'Ninguna marcada' },
        { etiqueta: 'Situación', valor: situacion },
        { etiqueta: 'Avisar de nuevas convocatorias', valor: avisarConvocatorias ? 'Sí' : 'No' },
      ]}
      campos={
        <Campo id="subvenciones-situacion" etiqueta="Tu situación">
          <Select
            id="subvenciones-situacion"
            value={situacion}
            onChange={(evento) => setSituacion(evento.target.value)}
          >
            {SITUACIONES.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </Select>
        </Campo>
      }
      camposAmplios={
        <fieldset className={styles.grupo}>
          <legend className={styles.leyenda}>¿Qué te interesa?</legend>
          {SUBVENCIONES_VIGENTES.map((subvencion) => (
            <Casilla
              key={subvencion.id}
              marcada={interes.includes(subvencion.id)}
              onCambio={() => alternarInteres(subvencion.id)}
              titulo={subvencion.titulo}
              descripcion={subvencion.destinatarios}
            />
          ))}
          <Casilla
            marcada={avisarConvocatorias}
            onCambio={() => setAvisarConvocatorias(!avisarConvocatorias)}
            titulo="Avisadme de nuevas convocatorias"
            descripcion="Te escribimos cuando se abra una ayuda que encaje con tu empresa."
          />
        </fieldset>
      }
    />
  );
}
