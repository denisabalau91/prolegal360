import type { Metadata } from 'next';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
import { CtaFinal, PageHero, Section } from '@/components/features/blocks';
import { crearMetadata } from '@/utils/seo';

export const metadata: Metadata = crearMetadata({
  titulo: 'Calculadora de coste laboral y departamento jurídico',
  descripcion:
    'Calcula al instante el coste de tus nóminas y gestión laboral, añade el departamento jurídico y compara las tres formas de contratar. Sin registro.',
  ruta: '/calculadora',
});

export default function CalculadoraPage() {
  return (
    <>
      <PageHero
        antetitulo="Calculadora de coste laboral"
        titulo="Conoce tu coste laboral al instante"
        descripcion="Sin registro, sin llamada y sin dejar tus datos. Indica tu plantilla, añade el departamento jurídico si lo quieres y compara solo laboral, solo jurídico o el pack con descuento."
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
