# Lanzamiento SEO de PROLEGAL360 Asesores

Este documento recoge las acciones que no puede ejecutar el código y que son necesarias
para que Google descubra, evalúe y posicione el sitio. La indexación no garantiza una
posición concreta; el objetivo es eliminar barreras técnicas y construir autoridad real.

## Antes de publicar

- Sustituir el CIF provisional `B-00000000` por el dato legal real.
- Confirmar que el nombre, fotografía, número de colegiación y experiencia publicados de
  cada profesional son reales y están autorizados.
- Confirmar la dirección, teléfono, horario, cifra de clientes y testimonios. No publicar
  nombres, casos, reseñas ni resultados que no puedan acreditarse.
- Confirmar que el servicio puede prestarse en toda España. Las actuaciones presenciales
  deben anunciarse solo en las provincias donde exista cobertura real.

## Primeras 48 horas después del despliegue

1. Crear una propiedad de **dominio** para `prolegal360-asesores.com` en Google Search
   Console y verificarla mediante DNS.
2. Comprobar en producción que estas URL responden con estado 200:
   - `https://prolegal360-asesores.com/`
   - `https://prolegal360-asesores.com/departamento-juridico/`
   - `https://prolegal360-asesores.com/asesoria-laboral/`
   - `https://prolegal360-asesores.com/sitemap.xml`
   - `https://prolegal360-asesores.com/robots.txt`
3. Enviar `https://prolegal360-asesores.com/sitemap.xml` en Search Console.
4. Usar **Inspección de URL → Probar URL publicada → Solicitar indexación** una sola vez
   para la portada, abogado laboral, asesoría laboral y asesoría fiscal.
5. No usar la Indexing API de Google: no está habilitada para páginas de servicios
   jurídicos.
6. Validar la portada y la página de abogado laboral en Rich Results Test y revisar sus
   canonical en Inspección de URL.

## Perfil de Empresa de Google

- Crear o reclamar únicamente la ficha de una oficina física real y atendida.
- Usar el nombre comercial real, sin añadir palabras clave al nombre.
- Mantener exactamente iguales el teléfono, dirección y horario de la ficha y del sitio.
- Elegir la categoría principal más específica disponible y añadir fotos reales.
- Solicitar reseñas auténticas a clientes y responderlas; nunca comprar ni fabricar reseñas.
- No crear fichas ni páginas clonadas por ciudad cuando no exista una ubicación o servicio
  verdaderamente diferenciado.

## Plan editorial inicial

Cada contenido debe resolver una intención distinta, estar firmado o revisado por un
profesional identificable, indicar una fecha de revisión real y enlazar fuentes oficiales.

La web actual vende servicios a empresas y autónomos empleadores, por lo que la página
principal se ha orientado a **«abogado laboral para empresas»**. No debe prometer defensa de
trabajadores salvo que la firma preste realmente ese servicio. Si también representa a
trabajadores, conviene crear una landing separada con casos, proceso y mensajes propios para
esa intención; mezclar ambos públicos en una sola página reduce claridad y conversión.

1. **Despido de un trabajador: procedimiento y riesgos para la empresa**
2. **Carta de despido disciplinario: requisitos, pruebas y errores frecuentes**
3. **Inspección de Trabajo: documentación y plazos para la empresa**
4. **Acto de conciliación laboral (SMAC): preparación y posibles acuerdos**
5. **Reclamación de cantidad contra la empresa: cómo responder**
6. **Registro de jornada y horas extra: obligaciones y sanciones**
7. **Modificación sustancial de condiciones de trabajo: cuándo es viable**
8. **Convenio colectivo aplicable: cómo determinarlo correctamente**

Evitar artículos genéricos generados en masa. Una guía original y acreditada tiene más
valor que decenas de textos repetidos o páginas «abogado laboral + ciudad».

## Medición mensual

- Search Console: páginas indexadas, impresiones, clics, CTR y posición por consulta.
- Consultas objetivo: `abogado laboral para empresas`, `abogado laboralista empresas`,
  `abogado inspección de trabajo empresa`, `abogado despidos empresa` y variantes reales
  detectadas en Search Console.
- Conversiones: llamadas, WhatsApp, formularios y solicitudes de diagnóstico procedentes
  del tráfico orgánico.
- Core Web Vitals de campo: LCP, INP y CLS, tanto móvil como escritorio.

Revisar títulos o contenidos a partir de datos suficientes, no cada pocos días. Volver a
solicitar indexación repetidamente no acelera el proceso.
