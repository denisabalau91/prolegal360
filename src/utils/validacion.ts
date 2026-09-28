const PATRON_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function esEmailValido(email: string): boolean {
  return PATRON_EMAIL.test(email.trim());
}

export function soloDigitos(valor: string): string {
  return valor.replace(/[^0-9]/g, '');
}

export function aEntero(valor: string, minimo = 0): number {
  const numero = parseInt(valor, 10);
  return Number.isFinite(numero) ? Math.max(minimo, numero) : minimo;
}
