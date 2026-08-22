---
name: download-images
description: Descarga una lista de URLs de imágenes al directorio public/images del proyecto. Úsala cuando el usuario pida descargar imágenes de una web o pegue una lista de enlaces de imágenes.
---

# Descargar imágenes al proyecto

Recibes una lista de URLs de imágenes (una por línea, o separadas por espacios/comas) como argumento o en el mensaje del usuario.

## Pasos

1. Asegúrate de que exista el directorio destino: `public/images/` (créalo si no existe). Si el usuario indica un subdirectorio (p. ej. `hero`, `team`, `logos`), usa `public/images/<subdirectorio>/`.
2. Para cada URL, deriva el nombre de archivo desde la propia URL (último segmento de la ruta, sin query string). Si el nombre no tiene extensión o colisiona con uno ya descargado, renómbralo de forma descriptiva (`hero-01.webp`, `logo.svg`, ...) manteniendo la extensión real del contenido.
3. Descarga todas las imágenes en un solo comando Bash con curl:

```bash
cd public/images && \
  curl -sL --fail -A "Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0" \
    -o "<nombre1>" "<url1>" \
  && curl -sL --fail -A "Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0" \
    -o "<nombre2>" "<url2>"
```

4. Verifica el resultado con `file public/images/*` — cada archivo debe ser una imagen real (no HTML de error) y pesar más de 0 bytes. Re-descarga las que fallen; si una URL falla 2 veces, repórtala al usuario.
5. Termina mostrando una tabla con: nombre de archivo guardado, tamaño y URL de origen.

## Reglas

- Nunca guardes imágenes fuera de `public/` sin que el usuario lo pida.
- Usa siempre nombres en `kebab-case`, sin espacios ni caracteres especiales.
- No optimices ni conviertas formatos salvo petición expresa.
