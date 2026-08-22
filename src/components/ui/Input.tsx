import type { InputHTMLAttributes } from 'react';
import styles from '@/components/ui/Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={[styles.input, className].filter(Boolean).join(' ')} {...props} />;
}
