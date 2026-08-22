'use client';

import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { IconoCheck, IconoChevronAbajo, IconoFlechaDerecha } from '@/components/ui/icons';
import { PLANES, type Plan } from '@/core/domain/site';
import styles from '@/components/features/PlanesPrecios.module.css';

interface TarjetaPlanProps {
  plan: Plan;
}

function TarjetaPlan({ plan }: TarjetaPlanProps) {
  const [noIncluyeAbierto, setNoIncluyeAbierto] = useState(false);

  return (
    <article
      className={[styles.tarjeta, plan.destacado ? styles.tarjetaDestacada : '']
        .filter(Boolean)
        .join(' ')}
    >
      {plan.etiqueta && <span className={styles.etiqueta}>{plan.etiqueta}</span>}
      <h3 className={styles.nombre}>{plan.nombre}</h3>
      <div className={styles.precioBloque}>
        <p className={styles.precio}>
          {plan.precioDesde}
          <span className={styles.precioSufijo}>{plan.precioSufijo}</span>
        </p>
        {plan.precioExtra && <p className={styles.precioExtra}>{plan.precioExtra}</p>}
      </div>
      <p className={styles.resumen}>{plan.resumen}</p>
      <ul className={styles.listaIncluye}>
        {plan.incluye.map((concepto) => (
          <li key={concepto} className={styles.itemIncluye}>
            <IconoCheck className={styles.iconoCheck} strokeWidth={2.5} />
            <span className={styles.textoIncluye}>{concepto}</span>
          </li>
        ))}
      </ul>
      <div className={styles.bloqueNoIncluye}>
        <button
          type="button"
          onClick={() => setNoIncluyeAbierto(!noIncluyeAbierto)}
          aria-expanded={noIncluyeAbierto}
          className={styles.botonNoIncluye}
        >
          Qué NO incluye
          <IconoChevronAbajo
            className={[styles.iconoChevron, noIncluyeAbierto ? styles.iconoChevronAbierto : '']
              .filter(Boolean)
              .join(' ')}
          />
        </button>
        {noIncluyeAbierto && <p className={styles.textoNoIncluye}>{plan.noIncluye}</p>}
      </div>
      <div className={styles.acciones}>
        <ButtonLink
          href={`/alta?plan=${plan.id}`}
          className={plan.destacado ? styles.botonContratarDestacado : styles.botonContratar}
        >
          Contratar
        </ButtonLink>
        <ButtonLink href={plan.href} variant="ghost" size="sm" className={styles.botonDetalle}>
          Ver detalle <IconoFlechaDerecha className={styles.iconoDetalle} />
        </ButtonLink>
      </div>
    </article>
  );
}

interface PlanesPreciosProps {
  soloPilares?: boolean;
}

export function PlanesPrecios({ soloPilares = false }: PlanesPreciosProps) {
  const planes = soloPilares ? PLANES.filter((plan) => plan.id !== '360_integral') : PLANES;

  return (
    <div
      className={[styles.rejilla, soloPilares ? styles.rejillaTresColumnas : '']
        .filter(Boolean)
        .join(' ')}
    >
      {planes.map((plan) => (
        <TarjetaPlan key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
