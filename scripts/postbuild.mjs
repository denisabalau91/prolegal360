/**
 * Convierte la salida de `next build` (output: 'export') en el directorio que
 * publica GitHub Pages.
 *
 * Se implementa en Node —y no como comandos de shell en package.json— para que
 * funcione igual en Windows, macOS y Linux (CI).
 */
import { rmSync, renameSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const EXPORT_DIR = 'out';
const PAGES_DIR = 'docs';

if (!existsSync(EXPORT_DIR)) {
  throw new Error(`No existe "${EXPORT_DIR}": ejecuta "next build" antes del postbuild.`);
}

rmSync(PAGES_DIR, { recursive: true, force: true });
renameSync(EXPORT_DIR, PAGES_DIR);
writeFileSync(join(PAGES_DIR, '.nojekyll'), '');
