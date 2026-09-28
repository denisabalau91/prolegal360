import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { IconoCargando, IconoCheck, IconoCorreo } from '@/components/ui/icons';
import styles from '@/components/features/PropuestaEmail.module.css';

interface PropuestaEmailProps {
  email: string;
  onCambioEmail: (email: string) => void;
  enviando: boolean;
  enviada: boolean;
  error: string;
  onEnviar: () => Promise<void>;
}

export function PropuestaEmail({
  email,
  onCambioEmail,
  enviando,
  enviada,
  error,
  onEnviar,
}: PropuestaEmailProps) {
  if (enviada) {
    return (
      <div className={styles.confirmacion}>
        <IconoCheck className={styles.iconoConfirmacion} />
        <span>
          Propuesta preparada para <strong>{email}</strong>, con el desglose completo. Te
          respondemos en menos de 24 h laborables.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        void onEnviar();
      }}
      className={styles.formulario}
    >
      <Label htmlFor="calc-email" className={styles.etiqueta}>
        Recibir esta propuesta por email
      </Label>
      <div className={styles.fila}>
        <Input
          id="calc-email"
          type="email"
          value={email}
          onChange={(evento) => onCambioEmail(evento.target.value)}
          placeholder="tu@empresa.com"
          autoComplete="email"
        />
        <Button type="submit" variant="outline" disabled={enviando}>
          {enviando ? (
            <IconoCargando className={`${styles.icono} ${styles.girando}`} />
          ) : (
            <IconoCorreo className={styles.icono} />
          )}
          <span className={styles.textoBoton}>Enviar</span>
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.nota}>Solo te pedimos el email. Nada de llamadas insistentes.</p>
    </form>
  );
}
