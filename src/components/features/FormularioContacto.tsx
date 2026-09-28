'use client';

import { useState } from 'react';
import { FormularioSolicitud } from '@/components/features/FormularioSolicitud';
import { Campo } from '@/components/ui/Campo';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { soloDigitos } from '@/utils/validacion';

const SERVICIOS_INTERES = [
  'Pack laboral + jurídico',
  'Asesoría laboral',
  'Departamento jurídico',
  'Asesoría fiscal y contabilidad',
  'Subvenciones',
  'Administración de fincas',
  'Aún no lo sé',
];

const FORMAS_JURIDICAS: Record<string, string> = {
  autonomo: 'Autónomo',
  sl: 'Sociedad limitada (SL)',
  sa: 'Sociedad anónima (SA)',
  otra: 'Otra',
};

interface FormularioContactoProps {
  variante?: 'contacto' | 'cambiar';
  origen: string;
  textoBoton: string;
}

export function FormularioContacto({
  variante = 'contacto',
  origen,
  textoBoton,
}: FormularioContactoProps) {
  const [servicio, setServicio] = useState(SERVICIOS_INTERES[0]);
  const [formaJuridica, setFormaJuridica] = useState('sl');
  const [trabajadores, setTrabajadores] = useState('');
  const esContacto = variante === 'contacto';

  return (
    <FormularioSolicitud
      idPrefijo={variante}
      origen={origen}
      asunto={
        esContacto
          ? `Consulta desde la web — ${servicio}`
          : 'Solicitud de cambio de asesoría'
      }
      textoBoton={textoBoton}
      ocultarMensaje={!esContacto}
      placeholderMensaje="Cuéntanos brevemente tu situación: qué servicios necesitas, con qué asesoría estás ahora, si tienes algún asunto abierto…"
      detalles={esContacto ? [{ etiqueta: 'Servicio de interés', valor: servicio }] : []}
      camposExtra={{
        forma_juridica: esContacto ? FORMAS_JURIDICAS[formaJuridica] : undefined,
        num_trabajadores: trabajadores || undefined,
      }}
      campos={
        <>
          {esContacto && (
            <Campo id={`${variante}-servicio`} etiqueta="Servicio que te interesa">
              <Select
                id={`${variante}-servicio`}
                value={servicio}
                onChange={(evento) => setServicio(evento.target.value)}
              >
                {SERVICIOS_INTERES.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </Select>
            </Campo>
          )}
          {esContacto && (
            <Campo id={`${variante}-forma`} etiqueta="Forma jurídica">
              <Select
                id={`${variante}-forma`}
                value={formaJuridica}
                onChange={(evento) => setFormaJuridica(evento.target.value)}
              >
                {Object.entries(FORMAS_JURIDICAS).map(([valor, etiqueta]) => (
                  <option key={valor} value={valor}>
                    {etiqueta}
                  </option>
                ))}
              </Select>
            </Campo>
          )}
          <Campo id={`${variante}-trabajadores`} etiqueta="Número de trabajadores">
            <Input
              id={`${variante}-trabajadores`}
              inputMode="numeric"
              placeholder="Ej. 12"
              value={trabajadores}
              onChange={(evento) => setTrabajadores(soloDigitos(evento.target.value))}
            />
          </Campo>
        </>
      }
    />
  );
}
