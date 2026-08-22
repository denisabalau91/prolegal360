import type { LabelHTMLAttributes } from 'react';
import styles from '@/components/ui/Label.module.css';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return <label className={[styles.label, className].filter(Boolean).join(' ')} {...props} />;
}
