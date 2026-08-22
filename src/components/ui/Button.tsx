import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '@/components/ui/Button.module.css';

type Variante = 'default' | 'outline' | 'ghost';
type Tamano = 'default' | 'sm' | 'lg' | 'icon';

const clasesVariante: Record<Variante, string> = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  ghost: styles.variantGhost,
};

const clasesTamano: Record<Tamano, string> = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
};

interface BaseProps {
  variant?: Variante;
  size?: Tamano;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = BaseProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  >;

function clases(variant: Variante, size: Tamano, className?: string): string {
  return [styles.button, clasesVariante[variant], clasesTamano[size], className]
    .filter(Boolean)
    .join(' ');
}

export function Button({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={clases(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'default',
  size = 'default',
  className,
  href,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={clases(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
