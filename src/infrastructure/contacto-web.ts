import { MARCA } from '@/core/domain/site';
import type {
  ContactoGateway,
  DetalleSolicitud,
  MensajeContacto,
} from '@/core/ports/contacto-gateway';
import { enviarFormulario, formularioConfigurado } from '@/infrastructure/formularios-web';

function asuntoMensaje(mensaje: MensajeContacto): string {
  if (mensaje.asunto) {
    return mensaje.asunto;
  }
  return mensaje.plan
    ? `Solicitud de alta — plan ${mensaje.plan}`
    : `Nuevo mensaje de contacto — ${MARCA.nombreCorto}`;
}

function lineasDetalles(detalles: DetalleSolicitud[] = []): string[] {
  return detalles.map((detalle) => `${detalle.etiqueta}: ${detalle.valor}`);
}

function cuerpoCorreo(mensaje: MensajeContacto): string {
  const datos = [
    mensaje.nombre ? `Nombre: ${mensaje.nombre}` : '',
    `Email: ${mensaje.email}`,
    mensaje.telefono ? `Teléfono: ${mensaje.telefono}` : '',
    mensaje.empresa ? `Empresa: ${mensaje.empresa}` : '',
    mensaje.plan ? `Plan elegido: ${mensaje.plan}` : '',
    ...lineasDetalles(mensaje.detalles),
  ].filter(Boolean);
  return mensaje.mensaje ? [...datos, '', mensaje.mensaje].join('\n') : datos.join('\n');
}

function detallesComoCampos(detalles: DetalleSolicitud[] = []): Record<string, string> {
  return Object.fromEntries(detalles.map((detalle) => [detalle.etiqueta, detalle.valor]));
}

export const contactoWeb: ContactoGateway = {
  async enviar(mensaje: MensajeContacto) {
    const asunto = asuntoMensaje(mensaje);

    if (formularioConfigurado) {
      const { detalles, ...campos } = mensaje;
      return enviarFormulario({
        ...campos,
        subject: asunto,
        ...detallesComoCampos(detalles),
        resumen: cuerpoCorreo(mensaje),
      });
    }

    window.location.href = `mailto:${MARCA.email}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpoCorreo(mensaje))}`;
    return { ok: true };
  },
};
