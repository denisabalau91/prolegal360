import type { FaqItem } from '@/core/domain/site';
import styles from '@/components/features/Faq.module.css';

interface FaqProps {
  faqs: FaqItem[];
}

export function Faq({ faqs }: FaqProps) {
  return (
    <div className={styles.lista}>
      {faqs.map((faq, indice) => {
        return (
          <details key={faq.pregunta} className={styles.item} open={indice === 0}>
            <summary className={styles.boton}>
              <span className={styles.pregunta}>{faq.pregunta}</span>
              <span className={styles.icono} aria-hidden="true" />
            </summary>
            <p className={styles.respuesta}>{faq.respuesta}</p>
          </details>
        );
      })}
    </div>
  );
}
