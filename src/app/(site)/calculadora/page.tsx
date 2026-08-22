import type { Metadata } from 'next';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
import { CtaFinal, PageHero, Section } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';

export const metadata: Metadata = {
  title: `Calculadora de cuota | ${MARCA.nombre}`,
  description:
    'Calcula tu cuota en 1 minuto, sin registro y sin dejar tus datos. Tres preguntas y ves el desglose completo.',
};

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
