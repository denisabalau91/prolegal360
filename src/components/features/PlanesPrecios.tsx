'use client';

import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { IconoCheck, IconoChevronAbajo, IconoFlechaDerecha } from '@/components/ui/icons';
import {
  PROMOCION_PRIMER_MES_JURIDICO,
  TARIFA_LABORAL,
  TRABAJADORES_EJEMPLO,
  type CotizacionModalidad,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';
import { AHORRO_PACK_POR_TRABAJADOR, PLANES, type Plan } from '@/core/domain/site';
import { cotizarModalidades } from '@/core/use-cases/calcular-cuota';
import styles from '@/components/features/PlanesPrecios.module.css';

const [PRIMER_TRAMO_LABORAL] = TARIFA_LABORAL;
const COTIZACIONES = cotizarModalidades(TRABAJADORES_EJEMPLO);

interface PrecioPlan {
  importe: string;
  sufijo: string;
  nota: string;
  destacado?: string;
}

function precioDelPlan(plan: Plan, cotizacion: CotizacionModalidad | undefined): PrecioPlan {
  if (!cotizacion || cotizacion.cuotaMensual === null) {
    return {
      importe: 'Presupuesto',
      sufijo: 'en 24 h',
      nota: 'Cerrado y por escrito, según tu contabilidad',
    };
  }
  const nota = `Ejemplo con ${TRABAJADORES_EJEMPLO} trabajadores · + IVA o IGIC`;
  const precio = { importe: formatearImporte(cotizacion.cuotaMensual), sufijo: '/mes', nota };

  if (plan.id === 'laboral') {
    return {
      ...precio,
      destacado: `${formatearImporte(PRIMER_TRAMO_LABORAL.nomina)} nómina + ${formatearImporte(
        PRIMER_TRAMO_LABORAL.gestion,
      )} gestión por trabajador`,
    };
  }
  if (cotizacion.ahorroMensual !== null) {
    return {
      ...precio,
      destacado: `Ahorras ${formatearImporte(cotizacion.ahorroMensual)}/mes (${AHORRO_PACK_POR_TRABAJADOR} por trabajador)`,
    };
  }
  return {
    ...precio,
    destacado: cotizacion.primerMes === 0 ? PROMOCION_PRIMER_MES_JURIDICO : undefined,
  };
}

interface TarjetaPlanProps {
  plan: Plan;
}

function TarjetaPlan({ plan }: TarjetaPlanProps) {
  const [noIncluyeAbierto, setNoIncluyeAbierto] = useState(false);
  const precio = precioDelPlan(
    plan,
    COTIZACIONES.find((cotizacion) => cotizacion.id === plan.id),
  );

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
          {precio.importe}
          <span className={styles.precioSufijo}>{precio.sufijo}</span>
        </p>
        <p className={styles.precioNota}>{precio.nota}</p>
        {precio.destacado && <p className={styles.precioExtra}>{precio.destacado}</p>}
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
          href={plan.contratacion.href}
          className={plan.destacado ? styles.botonContratarDestacado : styles.botonContratar}
        >
          {plan.contratacion.texto}
        </ButtonLink>
        <ButtonLink href={plan.href} variant="ghost" size="sm" className={styles.botonDetalle}>
          Ver detalle <IconoFlechaDerecha className={styles.iconoDetalle} />
        </ButtonLink>
      </div>
    </article>
  );
}

export function PlanesPrecios() {
  return (
    <div className={styles.rejilla}>
      {PLANES.map((plan) => (
        <TarjetaPlan key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
