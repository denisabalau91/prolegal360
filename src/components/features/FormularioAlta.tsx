'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { IconoCargando, IconoCheck } from '@/components/ui/icons';
import { PLANES, type PlanId } from '@/core/domain/site';
import { contactoWeb } from '@/infrastructure/contacto-web';
import styles from '@/components/features/FormularioAlta.module.css';

const PATRON_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function FormularioAlta() {
  const parametros = useSearchParams();
  const planInicial = parametros.get('plan');
  const esPlanValido = PLANES.some((plan) => plan.id === planInicial);

  const [plan, setPlan] = useState<PlanId>(
    esPlanValido ? (planInicial as PlanId) : '360_integral',
  );
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [nif, setNif] = useState('');
  const [formaJuridica, setFormaJuridica] = useState('sl');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [trabajadores, setTrabajadores] = useState('');
  const [asesoriaActual, setAsesoriaActual] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [aceptaCondiciones, setAceptaCondiciones] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setError('');

    if (!nombre.trim() || !empresa.trim() || !telefono.trim()) {
      setError('Rellena los campos obligatorios marcados con *.');
      return;
    }
    if (!PATRON_EMAIL.test(email)) {
      setError('Introduce un email válido para poder enviarte la hoja de encargo.');
      return;
    }
    if (!aceptaCondiciones) {
      setError(
        'Debes aceptar las condiciones de contratación y la política de privacidad.',
      );
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await contactoWeb.enviar({
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        empresa: empresa.trim(),
        mensaje: comentarios.trim(),
        plan,
        forma_juridica: formaJuridica,
        num_trabajadores: trabajadores || undefined,
        nif: nif.trim() || undefined,
        asesoria_actual: asesoriaActual.trim() || undefined,
        origen: '/alta',
      });
      if (respuesta.ok) {
        setEnviado(true);
      } else {
        console.error('[Alta] Error enviando la solicitud:', respuesta.error);
        setError('No hemos podido enviar la solicitud. Inténtalo de nuevo o llámanos.');
      }
    } catch (excepcion) {
      console.error('[Alta] Error enviando la solicitud:', excepcion);
      setError('No hemos podido enviar la solicitud. Inténtalo de nuevo o llámanos.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className={styles.confirmacion}>
        <IconoCheck className={styles.iconoConfirmacion} />
        <div>
          <p className={styles.tituloConfirmacion}>Solicitud de alta enviada</p>
          <p className={styles.textoConfirmacion}>
            Gracias, {nombre}. En menos de 24 horas laborables recibirás la hoja de encargo
            con el precio cerrado en {email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className={styles.formulario} noValidate>
      <fieldset>
        <legend className={styles.leyenda}>Plan que quieres contratar</legend>
        <div className={styles.selectorPlan}>
          {PLANES.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setPlan(opcion.id)}
              aria-pressed={plan === opcion.id}
              className={[
                styles.opcionPlan,
                plan === opcion.id ? styles.opcionPlanActiva : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.nombrePlan}>{opcion.nombre}</span>
              <span className={styles.precioPlan}>
                {opcion.precioDesde}
                {opcion.precioSufijo}
                {opcion.precioExtra ? ` · ${opcion.precioExtra}` : ''}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.fila}>
        <div className={styles.campo}>
          <Label htmlFor="alta-nombre" className={styles.etiqueta}>
            Nombre y apellidos *
          </Label>
          <Input
            id="alta-nombre"
            autoComplete="name"
            required
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-empresa" className={styles.etiqueta}>
            Empresa *
          </Label>
          <Input
            id="alta-empresa"
            autoComplete="organization"
            required
            value={empresa}
            onChange={(evento) => setEmpresa(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-nif" className={styles.etiqueta}>
            NIF / CIF
          </Label>
          <Input
            id="alta-nif"
            placeholder="B12345678"
            value={nif}
            onChange={(evento) => setNif(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-forma" className={styles.etiqueta}>
            Forma jurídica
          </Label>
          <Select
            id="alta-forma"
            value={formaJuridica}
            onChange={(evento) => setFormaJuridica(evento.target.value)}
          >
            <option value="autonomo">Autónomo</option>
            <option value="sl">Sociedad limitada (SL)</option>
            <option value="sa">Sociedad anónima (SA)</option>
            <option value="otra">Otra</option>
          </Select>
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-email" className={styles.etiqueta}>
            Email *
          </Label>
          <Input
            id="alta-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-telefono" className={styles.etiqueta}>
            Teléfono *
          </Label>
          <Input
            id="alta-telefono"
            type="tel"
            autoComplete="tel"
            required
            value={telefono}
            onChange={(evento) => setTelefono(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-trabajadores" className={styles.etiqueta}>
            Número de trabajadores
          </Label>
          <Input
            id="alta-trabajadores"
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Ej. 12"
            value={trabajadores}
            onChange={(evento) => setTrabajadores(evento.target.value)}
            className={styles.control}
          />
        </div>
        <div className={styles.campo}>
          <Label htmlFor="alta-asesoria" className={styles.etiqueta}>
            Asesoría actual
          </Label>
          <Input
            id="alta-asesoria"
            placeholder="Si vienes de otra asesoría, indícanos cuál"
            value={asesoriaActual}
            onChange={(evento) => setAsesoriaActual(evento.target.value)}
            className={styles.control}
          />
        </div>
      </div>

      <div className={styles.campo}>
        <Label htmlFor="alta-mensaje" className={styles.etiqueta}>
          Comentarios
        </Label>
        <Textarea
          id="alta-mensaje"
          value={comentarios}
          onChange={(evento) => setComentarios(evento.target.value)}
          placeholder="¿Tienes algún asunto abierto (inspección, requerimiento, despido) o alguna fecha límite que debamos conocer?"
          className={styles.areaTexto}
        />
      </div>

      <label className={styles.consentimiento}>
        <input
          type="checkbox"
          checked={aceptaCondiciones}
          onChange={(evento) => setAceptaCondiciones(evento.target.checked)}
          className={styles.casilla}
        />
        <span className={styles.textoConsentimiento}>
          He leído y acepto las{' '}
          <Link href="/condiciones" className={styles.enlaceConsentimiento}>
            condiciones de contratación
          </Link>{' '}
          y la{' '}
          <Link href="/privacidad" className={styles.enlaceConsentimiento}>
            política de privacidad
          </Link>
          . El alta no supone ningún cargo hasta que aceptes la propuesta por escrito.
        </span>
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <div>
        <Button type="submit" size="lg" className={styles.botonEnviar} disabled={enviando}>
          {enviando ? (
            <IconoCargando className={`${styles.iconoBoton} ${styles.girando}`} />
          ) : (
            'Enviar solicitud de alta'
          )}
        </Button>
      </div>
    </form>
  );
}
