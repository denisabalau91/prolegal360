import { MARCA } from '@/core/domain/site';
import type { ContactoGateway, MensajeContacto } from '@/core/ports/contacto-gateway';
import { enviarFormulario, formularioConfigurado } from '@/infrastructure/formularios-web';

function cuerpoCorreo(mensaje: MensajeContacto): string {
  return [
    `Nombre: ${mensaje.nombre}`,
    `Email: ${mensaje.email}`,
    mensaje.telefono ? `Teléfono: ${mensaje.telefono}` : '',
    mensaje.empresa ? `Empresa: ${mensaje.empresa}` : '',
    mensaje.plan ? `Plan elegido: ${mensaje.plan}` : '',
    '',
    mensaje.mensaje,
  ]
    .filter(Boolean)
    .join('\n');
}

export const contactoWeb: ContactoGateway = {
  async enviar(mensaje: MensajeContacto) {
    if (formularioConfigurado) {
      return enviarFormulario({
        subject: mensaje.plan
          ? `Solicitud de alta — plan ${mensaje.plan}`
          : 'Nuevo mensaje de contacto — PROLEGAL360',
        ...mensaje,
      });
    }

    const asunto = mensaje.plan
      ? `Solicitud de alta — plan ${mensaje.plan}`
      : 'Consulta desde la web';
    window.location.href = `mailto:${MARCA.email}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpoCorreo(mensaje))}`;
    return { ok: true };
  },
};
