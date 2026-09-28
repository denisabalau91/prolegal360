import type { RespuestaApi } from '@/core/ports/respuesta-api';

/**
 * Endpoint de un servicio externo de formularios (Formspree, Web3Forms, Getform...).
 * Ejemplos:
 *   Formspree:  NEXT_PUBLIC_FORMS_ENDPOINT=https://formspree.io/f/XXXXXXXX
 *   Web3Forms:  NEXT_PUBLIC_FORMS_ENDPOINT=https://api.web3forms.com/submit
 *               NEXT_PUBLIC_FORMS_KEY=<access_key>[,<access_key>...]
 * Cada access key de Web3Forms entrega en un único email; con varias keys separadas
 * por comas, cada envío llega a todos sus destinatarios.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? '';
const ACCESS_KEYS = (process.env.NEXT_PUBLIC_FORMS_KEY ?? '')
  .split(',')
  .map((clave) => clave.trim())
  .filter(Boolean);

export const formularioConfigurado = ENDPOINT !== '';

export function urlMailto(destinatario: string, asunto: string, cuerpo: string): string {
  return `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

async function motivoDelServicio(respuesta: Response): Promise<string> {
  const texto = await respuesta.text();
  try {
    const cuerpo: unknown = JSON.parse(texto);
    if (cuerpo && typeof cuerpo === 'object' && 'message' in cuerpo) {
      return String(cuerpo.message);
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }
  return texto.slice(0, 200);
}

async function enviarAlServicio(cuerpo: Record<string, unknown>): Promise<RespuestaApi> {
  try {
    const respuesta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(cuerpo),
    });
    if (!respuesta.ok) {
      const motivo = await motivoDelServicio(respuesta);
      return {
        ok: false,
        error: `El servicio respondió ${respuesta.status}${motivo ? `: ${motivo}` : ''}`,
      };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Envía el formulario una vez por access key. Basta con que llegue a un destinatario
 * para darlo por enviado (reintentar duplicaría el correo en los demás); los fallos
 * parciales se registran en consola.
 */
export async function enviarFormulario(
  datos: Record<string, unknown>,
): Promise<RespuestaApi> {
  if (!formularioConfigurado) {
    return { ok: false, error: 'Servicio de formularios no configurado' };
  }
  const cuerpos = ACCESS_KEYS.length
    ? ACCESS_KEYS.map((clave) => ({ access_key: clave, ...datos }))
    : [datos];
  const respuestas = await Promise.all(cuerpos.map(enviarAlServicio));
  const errores = respuestas.flatMap((respuesta) => (respuesta.ok ? [] : [respuesta.error]));

  if (errores.length === respuestas.length) {
    return { ok: false, error: errores.join(' | ') };
  }
  if (errores.length > 0) {
    console.error('Formulario enviado solo a parte de los destinatarios:', errores.join(' | '));
  }
  return { ok: true };
}
