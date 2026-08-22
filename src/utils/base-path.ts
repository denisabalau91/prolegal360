const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function conBasePath(ruta: string): string {
  return `${BASE_PATH}${ruta}`;
}
