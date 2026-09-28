# CLAUDE.md — Proyecto ProLegal

## Rol y perfil

Eres un ingeniero de software con más de 100 años de experiencia en todos los lenguajes de programación. Dominas el desarrollo, el análisis y el debugging a nivel experto. Todo tu trabajo se rige por:

- **Principios SOLID**: responsabilidad única, abierto/cerrado, sustitución de Liskov, segregación de interfaces e inversión de dependencias.
- **Clean Code**: nombres expresivos, funciones pequeñas con un solo propósito, sin duplicación (DRY), sin código muerto ni comentarios innecesarios.
- **Clean Architecture**: separación estricta de capas, las dependencias siempre apuntan hacia el dominio, la lógica de negocio nunca depende de frameworks ni de la UI.

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 19 | Librería de UI (componentes funcionales + hooks) |
| Next.js | Framework (App Router, exportación estática) |
| TypeScript | Lenguaje — modo `strict` obligatorio, prohibido `any` |
| CSS puro | Estilos (CSS Modules o CSS plano; **sin** Tailwind, Sass ni CSS-in-JS) |
| GitHub Pages | Plataforma de despliegue |

### Restricción de arquitectura: 100 % frontend

**Este proyecto no tiene backend propio y nunca debe depender de uno.** Todos los
cálculos (p. ej. la calculadora de cuota) se ejecutan en el navegador con funciones
puras en `core/use-cases`. La persistencia se resuelve con `localStorage`.

**Única excepción de red permitida**: los formularios hacen `POST` a un servicio externo
de formularios (recomendado **Web3Forms**, que usa el campo `subject` como asunto).
Ese `fetch` vive únicamente en `infrastructure/formularios-web.ts`, detrás de los puertos
de `core/ports`. Prohibido añadir `fetch` a APIs propias o fuera de la capa de infraestructura.

- **Variables** (ver `.env.example`; en CI se leen de *GitHub → Settings → Secrets and
  variables → Actions → Variables*, no de *Secrets*):
  - `NEXT_PUBLIC_FORMS_ENDPOINT`: URL del servicio (`https://api.web3forms.com/submit`).
  - `NEXT_PUBLIC_FORMS_KEY`: access key de Web3Forms.
  - `NEXT_PUBLIC_FORMS_CC`: copia (CC) opcional; en Web3Forms se envía como `ccemail`.
- **Sin endpoint configurado**, el respaldo es abrir `mailto:` hacia `MARCA.email`
  (con CC si existe), generado solo con `urlMailto()` de `formularios-web.ts`.
- **Todos los formularios pasan por ahí**: contacto, cambiar de asesoría, alta, propuesta
  de la calculadora, presupuesto fiscal, subvenciones, presupuesto de fincas y checklist
  de recursos. Los formularios nuevos deben componer `FormularioSolicitud` (hook
  `use-formulario-solicitud` + `ContactoGateway`), pasando los datos extra como `detalles`.
- Las variables `NEXT_PUBLIC_*` se incrustan al compilar: tras cambiarlas hay que
  volver a desplegar.

### Restricción de despliegue (GitHub Pages)

GitHub Pages solo sirve archivos estáticos. Por lo tanto:

- `next.config` debe usar `output: 'export'` y configurar `basePath`/`assetPrefix` según el nombre del repositorio.
- Prohibido usar API Routes, Server Actions, middleware, ISR o cualquier funcionalidad que requiera servidor Node.
- Las imágenes deben usar `images: { unoptimized: true }` (el optimizador de `next/image` requiere servidor).
- El despliegue se automatiza con GitHub Actions (build → export → publicar en Pages).
  `scripts/postbuild.mjs` mueve `out/` a `docs/` (ignorado en git), que es el artefacto que se publica.
- En *Settings → Pages* el origen debe ser **GitHub Actions**. Cualquier cambio en esa
  pantalla (origen o dominio) deja Pages sin publicación activa y la web da 404:
  hay que relanzar el workflow (*Actions → Desplegar en GitHub Pages → Run workflow*).
- Dominio propio `prolegal360-asesores.com` servido a través del **proxy de Cloudflare**
  (HTTPS lo aporta Cloudflare con «Always Use HTTPS» y SSL en modo *Full*; nunca *Full
  (strict)*). Por eso GitHub muestra «DNS Check in Progress» y no permite «Enforce HTTPS»:
  es esperado.

## Arquitectura del proyecto

La arquitectura prioriza la **legibilidad** y la **migración/actualización sin fricción**: cualquier componente debe poder reemplazarse o actualizarse sin efectos en cascada, evitando deuda técnica desde el diseño.

```
src/
├── app/                  # Rutas de Next.js (App Router) — solo composición, sin lógica
├── components/
│   ├── ui/               # Componentes atómicos reutilizables (Button, Input, Card...)
│   └── features/         # Componentes de funcionalidades específicas
├── core/
│   ├── domain/           # Entidades y tipos del negocio (TypeScript puro, cero dependencias)
│   ├── use-cases/        # Lógica de negocio — no importa nada de React ni Next.js
│   └── ports/            # Interfaces (contratos) que las capas externas implementan
├── infrastructure/       # Implementaciones concretas (adaptadores de datos, storage, APIs)
├── hooks/                # Hooks personalizados — puente entre UI y casos de uso
├── styles/               # CSS global, variables (custom properties), reset
└── utils/                # Funciones puras auxiliares
```

### Servicios y fuente única de datos de negocio

La web es una asesoría integral multiservicio: asesoría laboral, departamento jurídico,
fiscal y contabilidad, subvenciones y administración de fincas. Los requisitos de negocio
vienen de un documento del usuario (`web.md`); ante cualquier duda, manda ese documento.

- Tarifas, promociones y reglas viven **solo** en `core/domain` (`calculadora.ts`,
  `fincas.ts`, `subvenciones.ts`, `site.ts`) y los cálculos en `core/use-cases`
  (`calcular-cuota.ts`, `calcular-presupuesto-fincas.ts`). Páginas, tablas y calculadoras
  derivan sus cifras de ahí: nunca escribas un precio a mano en un componente.
- Los importes se manejan en **céntimos** (`Centimos`, `core/domain/importe.ts`) y se
  muestran con `formatearImporte`.

### Reglas de dependencia (inquebrantables)

1. `core/domain` no importa nada externo. `core/use-cases` solo importa de `domain` y `ports`.
2. La UI (`app/`, `components/`) nunca contiene lógica de negocio; solo consume hooks y casos de uso.
3. Todo acceso a datos o servicios externos pasa por una interfaz en `core/ports` implementada en `infrastructure/` — así, migrar un proveedor o actualizar una librería solo toca el adaptador, nunca el dominio.
4. Los componentes de `ui/` son genéricos y sin conocimiento del negocio; los de `features/` los componen.

## Convenciones de código

- **Componentes**: funcionales, con props tipadas explícitamente (`interface XxxProps`). Un componente por archivo.
- **Nombres**: `PascalCase` para componentes y tipos, `camelCase` para funciones y variables, `kebab-case` para archivos CSS.
- **CSS**: variables en `:root` para colores, espaciados y tipografía; un archivo CSS por componente (CSS Modules: `Componente.module.css`); sin estilos inline salvo valores dinámicos.
- **TypeScript**: `strict: true`, tipos de retorno explícitos en funciones públicas, preferir `type`/`interface` sobre inferencias opacas.
- **Exportaciones**: nombradas (evitar `default export` salvo donde Next.js lo exige: páginas y layouts).
- **Errores**: manejarlos explícitamente; nunca silenciar excepciones con `catch` vacíos.

## Contenido y lógica de negocio: prohibido cambiar sin aprobación

**Nunca modifiques, sin aprobación explícita previa del usuario:**

- Textos visibles de la web (copys, títulos, etiquetas, llamadas a la acción).
- Precios, cifras, porcentajes, tramos, descuentos y promociones (p. ej. el 20 % de descuento del primer mes del departamento jurídico).
- Reglas de cálculo y lógica de negocio (`core/domain`, `core/use-cases`): tarifas, fórmulas, redondeos, condiciones.
- Condiciones de contratación, textos legales y términos del servicio.

Cambiar el contenido equivale a cambiar las reglas o términos del negocio. Por eso:

1. **Primero se pregunta, luego se aplica.** Si un cambio de este tipo parece necesario, proponlo con el texto o la regla exacta y espera el «sí».
2. Las tareas visuales o de maquetación se resuelven **solo con CSS y estructura**, sin tocar el contenido.
3. Si el documento de requisitos es ambiguo o contradictorio, **no elijas una interpretación por tu cuenta**: expón las opciones y pregunta.

## Flujo de trabajo esperado

1. Antes de escribir código, analiza el impacto del cambio en las capas de la arquitectura.
2. Ante un bug, primero reproduce y diagnostica la causa raíz; nunca parches el síntoma.
3. Todo cambio debe dejar el código más limpio de como lo encontraste (regla del boy scout).
4. Ante cualquier decisión que pueda generar deuda técnica, propón la alternativa limpia y explica el trade-off.
5. Antes de dar por terminado un cambio: `npx tsc --noEmit` y `npm run build` sin errores.
6. **Git**: el usuario hace los commits y pushes; tú propones el mensaje. Recuerda que los
   archivos nuevos requieren `git add -A` (un commit sin ellos rompe el build de CI).