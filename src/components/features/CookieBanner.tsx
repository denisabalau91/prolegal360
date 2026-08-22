'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from '@/components/features/CookieBanner.module.css';

const CLAVE_CONSENTIMIENTO = 'pl360_consentimiento_cookies';

type Decision = 'aceptadas' | 'rechazadas' | 'personalizado';

interface Preferencias {
  analitica: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [preferencias, setPreferencias] = useState<Preferencias>({
    analitica: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CLAVE_CONSENTIMIENTO)) {
        setVisible(true);
      }
    } catch (error) {
      console.error('[Cookies] No se pudo leer el consentimiento almacenado:', error);
      setVisible(true);
    }
  }, []);

  const guardarConsentimiento = (decision: Decision, prefs: Preferencias) => {
    try {
      window.localStorage.setItem(
        CLAVE_CONSENTIMIENTO,
        JSON.stringify({ decision, preferencias: prefs, fecha: new Date().toISOString() }),
      );
    } catch (error) {
      console.error('[Cookies] No se pudo guardar el consentimiento:', error);
    }
    setVisible(false);
    setConfigurando(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.interior}>
        <div className={styles.contenido}>
          <div className={styles.textos}>
            <h2 className={styles.titulo}>Usamos cookies (y te pedimos permiso antes)</h2>
            <p className={styles.descripcion}>
              Utilizamos cookies técnicas necesarias para que la web funcione y, solo si lo
              autorizas, cookies analíticas y de marketing para entender cómo se usa el
              sitio. No se instala ninguna cookie no necesaria hasta que aceptes. Puedes
              consultar el detalle en la{' '}
              <Link href="/cookies" className={styles.enlace}>
                política de cookies
              </Link>{' '}
              y en la{' '}
              <Link href="/privacidad" className={styles.enlace}>
                política de privacidad
              </Link>
              .
            </p>
            {configurando && (
              <div className={styles.preferencias}>
                <label className={styles.opcion}>
                  <input type="checkbox" checked disabled className={styles.casilla} />
                  <span>
                    <span className={styles.opcionTitulo}>Cookies técnicas necesarias</span>
                    <span className={styles.opcionDescripcion}>
                      Imprescindibles para la navegación y el formulario de contacto.
                      Siempre activas.
                    </span>
                  </span>
                </label>
                <label className={styles.opcion}>
                  <input
                    type="checkbox"
                    checked={preferencias.analitica}
                    onChange={(evento) =>
                      setPreferencias({ ...preferencias, analitica: evento.target.checked })
                    }
                    className={styles.casilla}
                  />
                  <span>
                    <span className={styles.opcionTitulo}>Cookies analíticas</span>
                    <span className={styles.opcionDescripcion}>
                      Medición agregada de visitas para mejorar los contenidos.
                    </span>
                  </span>
                </label>
                <label className={styles.opcion}>
                  <input
                    type="checkbox"
                    checked={preferencias.marketing}
                    onChange={(evento) =>
                      setPreferencias({ ...preferencias, marketing: evento.target.checked })
                    }
                    className={styles.casilla}
                  />
                  <span>
                    <span className={styles.opcionTitulo}>Cookies de marketing</span>
                    <span className={styles.opcionDescripcion}>
                      Medición de campañas publicitarias.
                    </span>
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className={styles.acciones}>
            <Button
              type="button"
              className={styles.botonAceptar}
              onClick={() =>
                guardarConsentimiento('aceptadas', { analitica: true, marketing: true })
              }
            >
              Aceptar todas
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                guardarConsentimiento('rechazadas', { analitica: false, marketing: false })
              }
            >
              Rechazar todas
            </Button>
            {configurando ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => guardarConsentimiento('personalizado', preferencias)}
              >
                Guardar selección
              </Button>
            ) : (
              <Button type="button" variant="ghost" onClick={() => setConfigurando(true)}>
                Configurar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
