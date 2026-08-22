# Etapa 1: build estático (output: 'export' → docs/)
FROM node:26-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Variables públicas inyectadas en tiempo de build (Next las inlinea en el bundle).
# En Coolify el sitio se sirve en la raíz del dominio: BASE_PATH vacío.
ARG NEXT_PUBLIC_BASE_PATH=
ARG NEXT_PUBLIC_FORMS_ENDPOINT=
ARG NEXT_PUBLIC_FORMS_KEY=
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_FORMS_ENDPOINT=$NEXT_PUBLIC_FORMS_ENDPOINT \
    NEXT_PUBLIC_FORMS_KEY=$NEXT_PUBLIC_FORMS_KEY

RUN npm run build

# Etapa 2: servidor estático
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docs /usr/share/nginx/html
EXPOSE 80
