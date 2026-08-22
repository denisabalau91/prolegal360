import type { Metadata } from 'next';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
import { CtaFinal, PageHero, Section } from '@/components/features/blocks';
import { crearMetadata } from '@/utils/seo';

export const metadata: Metadata = crearMetadata({
  titulo: 'Calculadora de precios de asesoría para empresas',
  descripcion:
    'Calcula en un minuto el precio de tu asesoría laboral, fiscal y jurídica. Resultado inmediato, sin registro y sin dejar tus datos.',
  ruta: '/calculadora',
});

export default function CalculadoraPage() {
  return (
    <>
      <PageHero
        antetitulo="Calculadora de cuota"
        titulo="Calcula tu cuota en 1 minuto"
        descripcion="Sin registro, sin llamada y sin dejar tus datos. Tres preguntas y ves el desglose completo, con el primer mes de servicio jurídico ya descontado."
      />
      <Section fondo="base">
        <CalculadoraCuota origen="/calculadora" />
      </Section>
      <CtaFinal
        titulo="¿Te encaja la cuota?"
        descripcion="Contrata online en dos minutos o reserva 20 minutos con nosotros para revisar tu caso antes de decidir."
      />
    </>
  );
}
