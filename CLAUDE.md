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

**Única excepción de red permitida**: los formularios (contacto, alta, propuesta de la
calculadora) hacen `POST` a un servicio externo de formularios (Formspree, Web3Forms...)
configurado vía `NEXT_PUBLIC_FORMS_ENDPOINT` / `NEXT_PUBLIC_FORMS_KEY` (ver
`.env.example`). Ese `fetch` vive únicamente en `infrastructure/formularios-web.ts`,
detrás de los puertos de `core/ports`; si no está configurado, el respaldo es abrir
`mailto:`. Prohibido añadir `fetch` a APIs propias o fuera de la capa de infraestructura.

### Restricción de despliegue (GitHub Pages)

GitHub Pages solo sirve archivos estáticos. Por lo tanto:

- `next.config` debe usar `output: 'export'` y configurar `basePath`/`assetPrefix` según el nombre del repositorio.
- Prohibido usar API Routes, Server Actions, middleware, ISR o cualquier funcionalidad que requiera servidor Node.
- Las imágenes deben usar `images: { unoptimized: true }` (el optimizador de `next/image` requiere servidor).
- El despliegue se automatiza con GitHub Actions (build → export → publicar en Pages).

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

## Flujo de trabajo esperado

1. Antes de escribir código, analiza el impacto del cambio en las capas de la arquitectura.
2. Ante un bug, primero reproduce y diagnostica la causa raíz; nunca parches el síntoma.
3. Todo cambio debe dejar el código más limpio de como lo encontraste (regla del boy scout).
4. Ante cualquier decisión que pueda generar deuda técnica, propón la alternativa limpia y explica el trade-off.
