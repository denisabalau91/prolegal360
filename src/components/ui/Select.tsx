import type { SelectHTMLAttributes } from 'react';
import styles from '@/components/ui/Select.module.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select className={[styles.select, className].filter(Boolean).join(' ')} {...props} />
  );
}
