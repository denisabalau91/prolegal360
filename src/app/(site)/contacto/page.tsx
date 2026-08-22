import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FormularioContacto } from '@/components/features/FormularioContacto';
import { PageHero, Section } from '@/components/features/blocks';
import {
  IconoCorreo,
  IconoMensajeCirculo,
  IconoReloj,
  IconoTelefono,
  IconoUbicacion,
} from '@/components/ui/icons';
import { MARCA, urlWhatsApp } from '@/core/domain/site';
import { crearMetadata } from '@/utils/seo';
import styles from '@/app/(site)/contacto/contacto.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Contacto con abogados y asesores de empresas',
  descripcion:
    'Habla con un abogado o asesor de empresas. Reserva una llamada de diagnóstico de 20 minutos, sin compromiso.',
  ruta: '/contacto',
});

const PASOS_DESPUES: string[] = [
  'Te llamamos en menos de 24 horas laborables.',
  'Revisamos contigo qué llevas ahora en laboral, fiscal y jurídico.',
  'Te decimos por escrito qué cuota tendrías y qué riesgos vemos abiertos.',
  'Si te encaja, arrancamos el traspaso. Si no, te quedas con el diagnóstico.',
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        antetitulo="Contacto"
        titulo="Reserva 20 minutos gratis con un asesor"
        descripcion="Una llamada de diagnóstico, sin compromiso y sin discurso comercial. Salimos de ella con tu cuota y tus riesgos abiertos por escrito."
      />

      <Section fondo="base">
        <div className={styles.rejilla}>
          <div className={styles.tarjetaFormulario}>
            <h2 className={styles.tituloTarjeta}>Cuéntanos tu caso</h2>
            <p className={styles.subtituloTarjeta}>
              Los campos marcados con * son obligatorios. Cuanta más información nos des,
              más concreta será la propuesta.
            </p>
            <div className={styles.cuerpoFormulario}>
              <Suspense fallback={null}>
                <FormularioContacto
                  variante="contacto"
                  origen="/contacto"
                  textoBoton="Reservar 20 minutos gratis"
                />
              </Suspense>
            </div>
          </div>

          <div className={styles.lateral}>
            <div className={styles.tarjetaDatos}>
              <h2 className={styles.tituloDatos}>Datos de contacto</h2>
              <ul className={styles.listaDatos}>
                <li className={styles.dato}>
                  <IconoTelefono className={styles.iconoDato} />
                  <div>
                    <p className={styles.etiquetaDato}>Teléfono</p>
                    <a href={`tel:${MARCA.telefonoLimpio}`} className={styles.telefonoDato}>
                      {MARCA.telefono}
                    </a>
                  </div>
                </li>
                <li className={styles.dato}>
                  <IconoMensajeCirculo className={styles.iconoDato} />
                  <div>
                    <p className={styles.etiquetaDato}>WhatsApp</p>
                    <a
                      href={urlWhatsApp()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.enlaceDato}
                    >
                      Escríbenos por WhatsApp
                    </a>
                  </div>
                </li>
                <li className={styles.dato}>
                  <IconoCorreo className={styles.iconoDato} />
                  <div>
                    <p className={styles.etiquetaDato}>Email</p>
                    <a href={`mailto:${MARCA.email}`} className={styles.enlaceDato}>
                      {MARCA.email}
                    </a>
                  </div>
                </li>
                <li className={styles.dato}>
                  <IconoUbicacion className={styles.iconoDato} />
                  <div>
                    <p className={styles.etiquetaDato}>Oficina</p>
                    <p className={styles.textoDato}>
                      {MARCA.direccion}
                      <br />
                      {MARCA.codigoPostal} {MARCA.ciudad}
                    </p>
                  </div>
                </li>
                <li className={styles.dato}>
                  <IconoReloj className={styles.iconoDato} />
                  <div>
                    <p className={styles.etiquetaDato}>Horario</p>
                    <p className={styles.textoDato}>{MARCA.horario}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.tarjetaPasos}>
              <h2 className={styles.tituloDatos}>Qué pasa después de escribirnos</h2>
              <ol className={styles.listaPasos}>
                {PASOS_DESPUES.map((paso, indice) => (
                  <li key={paso} className={styles.paso}>
                    <span className={styles.numeroPaso}>
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span>{paso}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
