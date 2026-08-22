import type { TextareaHTMLAttributes } from 'react';
import styles from '@/components/ui/Textarea.module.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea className={[styles.textarea, className].filter(Boolean).join(' ')} {...props} />
  );
}
