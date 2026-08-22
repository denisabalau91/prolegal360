interface DatosEstructuradosProps {
  datos: Record<string, unknown>;
  id: string;
}

export function DatosEstructurados({ datos, id }: DatosEstructuradosProps) {
  const contenido = JSON.stringify(datos).replace(/</g, '\\u003c');

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: contenido }}
    />
  );
}
