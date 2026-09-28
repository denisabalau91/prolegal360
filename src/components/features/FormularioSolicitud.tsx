'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Campo } from '@/components/ui/Campo';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { IconoCargando, IconoCheck } from '@/components/ui/icons';
import type { DetalleSolicitud, MensajeContacto } from '@/core/ports/contacto-gateway';
import { useFormularioSolicitud } from '@/hooks/use-formulario-solicitud';
import { contactoWeb } from '@/infrastructure/contacto-web';
import styles from '@/components/features/FormularioSolicitud.module.css';

interface FormularioSolicitudProps {
  idPrefijo: string;
  origen: string;
  asunto: string;
  textoBoton: string;
  detalles?: DetalleSolicitud[];
  camposExtra?: Partial<MensajeContacto>;
  validarExtra?: () => string | null;
  etiquetaEmpresa?: string;
  etiquetaMensaje?: string;
  placeholderMensaje?: string;
  ocultarMensaje?: boolean;
  textoConfirmacion?: string;
  campos?: ReactNode;
  camposAmplios?: ReactNode;
}

export function FormularioSolicitud({
  idPrefijo,
  origen,
  asunto,
  textoBoton,
  detalles = [],
  camposExtra,
  validarExtra,
  etiquetaEmpresa = 'Empresa',
  etiquetaMensaje = '¿En qué podemos ayudarte?',
  placeholderMensaje,
  ocultarMensaje = false,
  textoConfirmacion = 'Te llamamos en menos de 24 horas laborables.',
  campos,
  camposAmplios,
}: FormularioSolicitudProps) {
  const formulario = useFormularioSolicitud(contactoWeb, {
    origen,
    asunto,
    detalles,
    validarExtra,
    camposExtra,
  });
  const id = (campo: string) => `${idPrefijo}-${campo}`;

  if (formulario.enviado) {
    return (
      <div className={styles.confirmacion}>
        <IconoCheck className={styles.iconoConfirmacion} />
        <div>
          <p className={styles.tituloConfirmacion}>Solicitud enviada</p>
          <p className={styles.textoConfirmacion}>
            Gracias, {formulario.nombre}. {textoConfirmacion}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={formulario.manejarEnvio} className={styles.formulario} noValidate>
      <div className={styles.fila}>
        <Campo id={id('nombre')} etiqueta="Nombre y apellidos" obligatorio>
          <Input
            id={id('nombre')}
            autoComplete="name"
            required
            value={formulario.nombre}
            onChange={(evento) => formulario.setNombre(evento.target.value)}
          />
        </Campo>
        <Campo id={id('empresa')} etiqueta={etiquetaEmpresa}>
          <Input
            id={id('empresa')}
            autoComplete="organization"
            value={formulario.empresa}
            onChange={(evento) => formulario.setEmpresa(evento.target.value)}
          />
        </Campo>
        <Campo id={id('telefono')} etiqueta="Teléfono" obligatorio>
          <Input
            id={id('telefono')}
            type="tel"
            autoComplete="tel"
            required
            value={formulario.telefono}
            onChange={(evento) => formulario.setTelefono(evento.target.value)}
          />
        </Campo>
        <Campo id={id('email')} etiqueta="Email" obligatorio>
          <Input
            id={id('email')}
            type="email"
            autoComplete="email"
            required
            value={formulario.email}
            onChange={(evento) => formulario.setEmail(evento.target.value)}
          />
        </Campo>
        {campos}
      </div>

      {camposAmplios}

      {!ocultarMensaje && (
        <Campo id={id('mensaje')} etiqueta={etiquetaMensaje}>
          <Textarea
            id={id('mensaje')}
            value={formulario.mensaje}
            onChange={(evento) => formulario.setMensaje(evento.target.value)}
            placeholder={placeholderMensaje}
            className={styles.areaTexto}
          />
        </Campo>
      )}

      <label className={styles.consentimiento}>
        <input
          type="checkbox"
          checked={formulario.aceptaPrivacidad}
          onChange={(evento) => formulario.setAceptaPrivacidad(evento.target.checked)}
          className={styles.casilla}
        />
        <span className={styles.textoConsentimiento}>
          He leído y acepto la{' '}
          <Link href="/privacidad" className={styles.enlaceConsentimiento}>
            política de privacidad
          </Link>
          . Trataremos tus datos para responder a tu solicitud, según se detalla en dicha
          política.
        </span>
      </label>

      {formulario.error && <p className={styles.error}>{formulario.error}</p>}

      <div>
        <Button
          type="submit"
          size="lg"
          className={styles.botonEnviar}
          disabled={formulario.enviando}
        >
          {formulario.enviando ? (
            <IconoCargando className={`${styles.iconoBoton} ${styles.girando}`} />
          ) : (
            textoBoton
          )}
        </Button>
      </div>
    </form>
  );
}
