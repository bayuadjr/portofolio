import { useState, useRef, useEffect } from 'react';
import styles from './DemoCredentials.module.css';

export default function DemoCredentials({ credentials, compact = false }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [failedKey, setFailedKey] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  if (!credentials?.email && !credentials?.password) {
    return null;
  }

  const copyValue = async (key, value) => {
    if (!value) return;
    clearTimeout(timerRef.current);
    setFailedKey(null);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) {
          throw new Error('Fallback copy command failed');
        }
      }
      setCopiedKey(key);
      timerRef.current = setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy demo credential:', err);
      setCopiedKey(null);
      setFailedKey(key);
      timerRef.current = setTimeout(() => setFailedKey(null), 2500);
    }
  };

  return (
    <div className={`${styles.box} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>Try the demo</span>
        <span className={styles.hint}>Public test login</span>
      </div>

      <div className={styles.rows}>
        {credentials.email && (
          <div className={styles.row}>
            <div className={styles.field}>
              <span className={styles.key}>Email</span>
              <code className={styles.value}>{credentials.email}</code>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyValue('email', credentials.email)}
              aria-label="Copy demo email"
            >
              {copiedKey === 'email' ? 'Copied' : failedKey === 'email' ? 'Failed' : 'Copy'}
            </button>
          </div>
        )}

        {credentials.password && (
          <div className={styles.row}>
            <div className={styles.field}>
              <span className={styles.key}>Password</span>
              <code className={styles.value}>{credentials.password}</code>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyValue('password', credentials.password)}
              aria-label="Copy demo password"
            >
              {copiedKey === 'password' ? 'Copied' : failedKey === 'password' ? 'Failed' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
