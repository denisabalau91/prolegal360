'use client';

import { useState } from 'react';
import { FormularioSolicitud } from '@/components/features/FormularioSolicitud';
import { Campo } from '@/components/ui/Campo';
import { Casilla } from '@/components/ui/Casilla';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { TipoFinca } from '@/core/domain/fincas';
import { MARCA, urlWhatsApp } from '@/core/domain/site';
import type { DetalleSolicitud } from '@/core/ports/contacto-gateway';
import { soloDigitos } from '@/utils/validacion';
import styles from '@/components/features/SolicitudFincas.module.css';

const CARGOS = ['Presidente/a de la comunidad', 'Propietario/a', 'Administrador/a', 'Otro'];

interface SolicitudFincasProps {
  tipo: TipoFinca;
  detallesPresupuesto: DetalleSolicitud[];
}

export function SolicitudFincas({ tipo, detallesPresupuesto }: SolicitudFincasProps) {
  const [direccion, setDireccion] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [cargo, setCargo] = useState(CARGOS[0]);
  const [viviendasTotales, setViviendasTotales] = useState('');
  const [honorariosActuales, setHonorariosActuales] = useState('');
  const [ajustarPresupuesto, setAjustarPresupuesto] = useState(false);

  const detalles: DetalleSolicitud[] = [
    ...detallesPresupuesto,
    { etiqueta: 'Dirección de la finca', valor: direccion.trim() },
    { etiqueta: 'Municipio', valor: municipio.trim() || 'No indicado' },
    { etiqueta: 'Quién solicita', valor: cargo },
    ...(tipo === 'mancomunidad' && viviendasTotales
      ? [{ etiqueta: 'Viviendas totales (aprox.)', valor: viviendasTotales }]
      : []),
    {
      etiqueta: 'Honorarios actuales',
      valor: honorariosActuales ? `${honorariosActuales} €/mes` : 'No indicado',
    },
    {
      etiqueta: 'Ajustarse al presupuesto actual',
      valor: ajustarPresupuesto ? 'Sí, enviará recibo o contrato' : 'No',
    },
  ];

  return (
    <FormularioSolicitud
      idPrefijo="fincas"
      origen="/administracion-de-fincas"
      asunto={`Presupuesto de administración de fincas — ${
        tipo === 'comunidad' ? 'Comunidad' : 'Mancomunidad'
      }`}
      textoBoton="Solicitar presupuesto por escrito"
      textoConfirmacion="Te enviamos el presupuesto por escrito en menos de 24 horas laborables."
      etiquetaEmpresa="Nombre de la comunidad"
      etiquetaMensaje="Observaciones"
      placeholderMensaje="Ascensores, portería, obras previstas, morosidad, fecha de la próxima junta…"
      detalles={detalles}
      validarExtra={() =>
        direccion.trim() ? null : 'Indica la dirección de la finca para poder presupuestarla.'
      }
      campos={
        <>
          <Campo id="fincas-direccion" etiqueta="Dirección de la finca" obligatorio>
            <Input
              id="fincas-direccion"
              autoComplete="street-address"
              value={direccion}
              onChange={(evento) => setDireccion(evento.target.value)}
            />
          </Campo>
          <Campo id="fincas-municipio" etiqueta="Municipio">
            <Input
              id="fincas-municipio"
              autoComplete="address-level2"
              value={municipio}
              onChange={(evento) => setMunicipio(evento.target.value)}
            />
          </Campo>
          <Campo id="fincas-cargo" etiqueta="¿Quién solicita el presupuesto?">
            <Select
              id="fincas-cargo"
              value={cargo}
              onChange={(evento) => setCargo(evento.target.value)}
            >
              {CARGOS.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </Select>
          </Campo>
          {tipo === 'mancomunidad' && (
            <Campo id="fincas-viviendas" etiqueta="Viviendas totales (aprox.)">
              <Input
                id="fincas-viviendas"
                inputMode="numeric"
                value={viviendasTotales}
                onChange={(evento) => setViviendasTotales(soloDigitos(evento.target.value))}
              />
            </Campo>
          )}
          <Campo
            id="fincas-honorarios"
            etiqueta="¿Cuánto pagáis ahora? (€/mes)"
            ayuda="Opcional. Nos ayuda a ajustar la propuesta."
          >
            <Input
              id="fincas-honorarios"
              inputMode="decimal"
              value={honorariosActuales}
              onChange={(evento) =>
                setHonorariosActuales(evento.target.value.replace(/[^0-9.,]/g, ''))
              }
            />
          </Campo>
        </>
      }
      camposAmplios={
        <div className={styles.ajuste}>
          <Casilla
            marcada={ajustarPresupuesto}
            onCambio={() => setAjustarPresupuesto(!ajustarPresupuesto)}
            titulo="Quiero que os ajustéis a mi presupuesto actual"
            descripcion="Te pediremos el último recibo de honorarios o el contrato con tu administrador."
          />
          {ajustarPresupuesto && (
            <p className={styles.nota}>
              Envíanoslo a{' '}
              <a href={`mailto:${MARCA.email}`} className={styles.enlace}>
                {MARCA.email}
              </a>{' '}
              o por{' '}
              <a
                href={urlWhatsApp(
                  'Hola, os envío el recibo de honorarios de mi comunidad para que ajustéis el presupuesto.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enlace}
              >
                WhatsApp
              </a>{' '}
              después de enviar este formulario.
            </p>
          )}
        </div>
      }
    />
  );
}
