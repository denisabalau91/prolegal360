/** Importe monetario expresado en céntimos de euro para evitar errores de coma flotante. */
export type Centimos = number;

const FORMATO_ENTERO = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 });
const FORMATO_DECIMAL = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatearImporte(centimos: Centimos): string {
  const euros = centimos / 100;
  const formato = Number.isInteger(euros) ? FORMATO_ENTERO : FORMATO_DECIMAL;
  return `${formato.format(euros)} €`;
}

export function aEuros(centimos: Centimos): number {
  return centimos / 100;
}
