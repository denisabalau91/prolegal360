'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/features/Logo';
import { Button, ButtonLink } from '@/components/ui/Button';
import {
  IconoCerrar,
  IconoChevronAbajo,
  IconoMenu,
  IconoTelefono,
} from '@/components/ui/icons';
import { MARCA, NAV_ITEMS } from '@/core/domain/site';
import styles from '@/components/features/SiteHeader.module.css';

export function SiteHeader() {
  const rutaActual = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState<string | null>(null);

  useEffect(() => {
    setMenuAbierto(false);
    setDesplegableAbierto(null);
  }, [rutaActual]);

  const esRutaActiva = (href: string) =>
    rutaActual === href || (href !== '/' && rutaActual.startsWith(href));

  const claseEnlaceNav = (href: string) =>
    [styles.navEnlace, esRutaActiva(href) ? styles.navEnlaceActivo : '']
      .filter(Boolean)
      .join(' ');

  return (
    <header className={styles.header}>
      <div className={styles.barraSuperior}>
        <div className={styles.barraSuperiorInterior}>
          <p className={styles.lema}>Parte del grupo PROLEGAL360 · Despacho de abogados</p>
          <div className={styles.contactos}>
            <a href={`tel:${MARCA.telefonoLimpio}`} className={styles.contacto}>
              <IconoTelefono className={styles.iconoContacto} />
              {MARCA.telefono}
            </a>
            <a href={`mailto:${MARCA.email}`} className={styles.contacto}>
              {MARCA.email}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.barraPrincipal}>
        <div className={styles.barraPrincipalInterior}>
          <Logo />

          <nav className={styles.nav} aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => item.hijos && setDesplegableAbierto(item.label)}
                onMouseLeave={() => item.hijos && setDesplegableAbierto(null)}
              >
                {item.hijos ? (
                  <button
                    type="button"
                    onClick={() =>
                      setDesplegableAbierto(
                        desplegableAbierto === item.label ? null : item.label,
                      )
                    }
                    aria-expanded={desplegableAbierto === item.label}
                    className={claseEnlaceNav(item.href)}
                  >
                    {item.label}
                    <IconoChevronAbajo className={styles.iconoChevron} />
                  </button>
                ) : (
                  <Link href={item.href} className={claseEnlaceNav(item.href)}>
                    {item.label}
                  </Link>
                )}
                {item.hijos && desplegableAbierto === item.label && (
                  <div className={styles.desplegable}>
                    {item.hijos.map((hijo) => (
                      <Link
                        key={hijo.href}
                        href={hijo.href}
                        className={styles.desplegableEnlace}
                      >
                        <span className={styles.desplegableTitulo}>{hijo.label}</span>
                        <span className={styles.desplegableDescripcion}>{hijo.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className={styles.acciones}>
            <ButtonLink href="/calculadora" className={styles.ctaEscritorio}>
              Calcula tu cuota
            </ButtonLink>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={styles.botonMovil}
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuAbierto}
            >
              {menuAbierto ? (
                <IconoCerrar className={styles.botonMenu} />
              ) : (
                <IconoMenu className={styles.botonMenu} />
              )}
            </Button>
          </div>
        </div>
        <div className={styles.selloMovil}>{MARCA.sello}</div>
      </div>

      {menuAbierto && (
        <div className={styles.menuMovil}>
          <nav className={styles.menuMovilInterior} aria-label="Navegación móvil">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className={styles.menuMovilGrupo}>
                <Link href={item.href} className={styles.menuMovilEnlace}>
                  {item.label}
                </Link>
                {item.hijos && (
                  <div className={styles.menuMovilHijos}>
                    {item.hijos.map((hijo) => (
                      <Link key={hijo.href} href={hijo.href} className={styles.menuMovilHijo}>
                        {hijo.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className={styles.menuMovilAcciones}>
              <ButtonLink href="/calculadora" className={styles.ctaMovil}>
                Calcula tu cuota en 1 minuto
              </ButtonLink>
              <ButtonLink href="/contacto" variant="outline">
                Reserva 20 min gratis
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
