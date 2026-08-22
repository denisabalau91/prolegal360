'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { IconoCargando, IconoCheck } from '@/components/ui/icons';
import { contactoWeb } from '@/infrastructure/contacto-web';
import styles from '@/components/features/FormularioContacto.module.css';

const PATRON_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [formaJuridica, setFormaJuridica] = useState('sl');
  const [trabajadores, setTrabajadores] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError('');

    if (!nombre.trim() || !telefono.trim()) {
      setError('Rellena los campos obligatorios marcados con *.');
      return;
    }
    if (!PATRON_EMAIL.test(email)) {
      setError('Introduce un email válido para poder responderte.');
      return;
    }
    if (!aceptaPrivacidad) {
      setError('Debes aceptar la política de privacidad para enviar el formulario.');
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await contactoWeb.enviar({
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        empresa: empresa.trim(),
        mensaje: mensaje.trim(),
        forma_juridica: variante === 'contacto' ? formaJuridica : undefined,
        num_trabajadores: trabajadores || undefined,
        origen,
      });
      if (respuesta.ok) {
        setEnviado(true);
      } else {
        console.error('[Contacto] Error enviando el formulario:', respuesta.error);
        setError('No hemos podido enviar el formulario. Inténtalo de nuevo o llámanos.');
      }
    } catch (excepcion) {
      console.error('[Contacto] Error enviando el formulario:', excepcion);
      setError('No hemos podido enviar el formulario. Inténtalo de nuevo o llámanos.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className={styles.confirmacion}>
        <IconoCheck className={styles.iconoConfirmacion} />
        <div>
          <p className={styles.tituloConfirmacion}>Solicitud enviada</p>
          <p className={styles.textoConfirmacion}>
            Gracias, {nombre}. Te llamamos en menos de 24 horas laborables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className={styles.formulario} noValidate>
      <div className={styles.fila}>
        <div className={styles.campo}>
          <Label htmlFor="nombre" className={styles.etiqueta}>
            Nombre y apellidos *
          </Label>
          <Input
            id="nombre"
            autoComplete="name"
            required
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="empresa" className={styles.etiqueta}>
            Empresa
          </Label>
          <Input
            id="empresa"
            autoComplete="organization"
            value={empresa}
            onChange={(evento) => setEmpresa(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="telefono" className={styles.etiqueta}>
            Teléfono *
          </Label>
          <Input
            id="telefono"
            type="tel"
            autoComplete="tel"
            required
            value={telefono}
            onChange={(evento) => setTelefono(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="email" className={styles.etiqueta}>
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            className={styles.control}
          />
        </div>
        {variante === 'contacto' && (
          <div className={styles.campo}>
            <Label htmlFor="forma_juridica" className={styles.etiqueta}>
              Forma jurídica
            </Label>
            <Select
              id="forma_juridica"
              value={formaJuridica}
              onChange={(evento) => setFormaJuridica(evento.target.value)}
            >
              <option value="autonomo">Autónomo</option>
              <option value="sl">Sociedad limitada (SL)</option>
              <option value="sa">Sociedad anónima (SA)</option>
              <option value="otra">Otra</option>
            </Select>
          </div>
        )}
        <div className={styles.campo}>
          <Label htmlFor="num_trabajadores" className={styles.etiqueta}>
            Número de trabajadores
          </Label>
          <Input
            id="num_trabajadores"
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Ej. 12"
            value={trabajadores}
            onChange={(evento) => setTrabajadores(evento.target.value)}
            className={styles.control}
          />
        </div>
      </div>

      {variante === 'contacto' && (
        <div className={styles.campo}>
          <Label htmlFor="mensaje" className={styles.etiqueta}>
            ¿En qué podemos ayudarte?
          </Label>
          <Textarea
            id="mensaje"
            value={mensaje}
            onChange={(evento) => setMensaje(evento.target.value)}
            placeholder="Cuéntanos brevemente tu situación: qué servicios necesitas, con qué asesoría estás ahora, si tienes algún asunto abierto…"
            className={styles.areaTexto}
          />
        </div>
      )}

      <label className={styles.consentimiento}>
        <input
          type="checkbox"
          checked={aceptaPrivacidad}
          onChange={(evento) => setAceptaPrivacidad(evento.target.checked)}
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

      {error && <p className={styles.error}>{error}</p>}

      <div>
        <Button type="submit" size="lg" className={styles.botonEnviar} disabled={enviando}>
          {enviando ? (
            <IconoCargando className={`${styles.iconoBoton} ${styles.girando}`} />
          ) : (
            textoBoton
          )}
        </Button>
      </div>
    </form>
  );
}
