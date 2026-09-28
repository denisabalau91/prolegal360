import type { RespuestaApi } from '@/core/ports/respuesta-api';

/**
 * Endpoint de un servicio externo de formularios (Formspree, Web3Forms, Getform...).
 * Ejemplos:
 *   Formspree:  NEXT_PUBLIC_FORMS_ENDPOINT=https://formspree.io/f/XXXXXXXX
 *   Web3Forms:  NEXT_PUBLIC_FORMS_ENDPOINT=https://api.web3forms.com/submit
 *               NEXT_PUBLIC_FORMS_KEY=<access_key>
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? '';
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORMS_KEY ?? '';
/** Dirección opcional que recibe copia (CC) de cada formulario. */
const EMAIL_COPIA = process.env.NEXT_PUBLIC_FORMS_CC ?? '';

export const formularioConfigurado = ENDPOINT !== '';

export function urlMailto(destinatario: string, asunto: string, cuerpo: string): string {
  const parametros = [
    EMAIL_COPIA ? `cc=${encodeURIComponent(EMAIL_COPIA)}` : '',
    `subject=${encodeURIComponent(asunto)}`,
    `body=${encodeURIComponent(cuerpo)}`,
  ].filter(Boolean);
  return `mailto:${destinatario}?${parametros.join('&')}`;
}

export async function enviarFormulario(
  datos: Record<string, unknown>,
): Promise<RespuestaApi> {
  if (!formularioConfigurado) {
    return { ok: false, error: 'Servicio de formularios no configurado' };
  }
  try {
    const cuerpo = {
      ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
      ...(EMAIL_COPIA ? { ccemail: EMAIL_COPIA } : {}),
      ...datos,
    };
    const respuesta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(cuerpo),
    });
    if (!respuesta.ok) {
      return { ok: false, error: `El servicio respondió ${respuesta.status}` };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
