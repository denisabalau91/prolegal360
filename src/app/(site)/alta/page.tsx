import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FormularioAlta } from '@/components/features/FormularioAlta';
import { PageHero, Section } from '@/components/features/blocks';
import { IconoCheck } from '@/components/ui/icons';
import { MARCA } from '@/core/domain/site';
import styles from '@/app/(site)/alta/alta.module.css';

export const metadata: Metadata = {
  title: `Formulario de alta | ${MARCA.nombre}`,
  description:
    'Rellena los datos de tu empresa y en menos de 24 horas laborables te enviamos la hoja de encargo con el precio cerrado.',
};

const GARANTIAS: string[] = [
  'Traspaso gratuito desde tu asesoría actual',
  'Un mes de solapamiento sin coste',
  'Sin permanencia ni coste de cancelación',
  'Primer mes de servicio jurídico gratuito',
  'Precio cerrado por escrito antes de empezar',
];

export default function AltaPage() {
  return (
    <>
      <PageHero
        antetitulo="Alta de cliente"
        titulo="Contrata tu plan y nosotros nos ocupamos del resto"
        descripcion="Rellena los datos de tu empresa y en menos de 24 horas laborables te enviamos la hoja de encargo con el precio cerrado. Del traspaso nos encargamos nosotros."
      />

      <Section fondo="base">
        <div className={styles.rejilla}>
          <div className={styles.tarjetaFormulario}>
            <Suspense fallback={null}>
              <FormularioAlta />
            </Suspense>
          </div>

          <div className={styles.tarjetaGarantias}>
            <h2 className={styles.tituloGarantias}>Lo que te garantizamos</h2>
            <ul className={styles.listaGarantias}>
              {GARANTIAS.map((garantia) => (
                <li key={garantia} className={styles.garantia}>
                  <span className={styles.insigniaGarantia}>
                    <IconoCheck className={styles.iconoGarantia} />
                  </span>
                  {garantia}
                </li>
              ))}
            </ul>
            <p className={styles.notaGarantias}>
              Enviar el formulario no supone ninguna contratación: recibirás primero la hoja
              de encargo con el detalle del servicio y el precio, y el alta solo se activa
              cuando la firmas.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
