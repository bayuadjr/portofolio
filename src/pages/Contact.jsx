import { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';

const TEMPLATES = [
  {
    id: 'hello',
    label: 'Say hi',
    subject: 'Hello Bayu',
    body: `Hi Bayu,

I saw your notes and wanted to say hi or ask about:

[Write your message here]

Best,
[Your Name]`,
  },
  {
    id: 'project',
    label: 'Talk about a project',
    subject: 'Project discussion',
    body: `Hi Bayu,

I wanted to reach out about a project or idea around:

[Describe what you are working on]

Best,
[Your Name]`,
  },
  {
    id: 'notes',
    label: 'Compare notes',
    subject: 'Comparing notes',
    body: `Hi Bayu,

I have been reading or working on something similar and wanted to trade notes on:

[Write your topic or question here]

Best,
[Your Name]`,
  },
];

export default function Contact() {
  const emailTarget = import.meta.env.VITE_EMAIL || 'bayuadji500@gmail.com';
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0].id);
  const [subject, setSubject] = useState(TEMPLATES[0].subject);
  const [message, setMessage] = useState(TEMPLATES[0].body);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(copyTimerRef.current);
  }, []);

  const handleSelectTemplate = (tmpl) => {
    setActiveTemplate(tmpl.id);
    setSubject(tmpl.subject);
    setMessage(tmpl.body);
    setCopied(false);
    setCopyError(false);
  };

  const handleSend = () => {
    const mailtoUrl = `mailto:${emailTarget}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    clearTimeout(copyTimerRef.current);
    setCopyError(false);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = message;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copiedFallback = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!copiedFallback) {
          throw new Error('Fallback copy command failed');
        }
      }
      setCopied(true);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy message:', err);
      setCopied(false);
      setCopyError(true);
      copyTimerRef.current = setTimeout(() => setCopyError(false), 3000);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.label}>Contact</div>

        <div className={styles.mainContent}>
          <h1 className={styles.heading}>
            Always happy to trade notes or talk through an idea.
          </h1>

          <div className={styles.composerBox}>
            <div className={styles.composerHeader}>
              <span className={styles.composerTitle}>Starter note</span>
              <div className={styles.templateTabs} role="group" aria-label="Message starters">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    className={`${styles.tabBtn} ${activeTemplate === tmpl.id ? styles.tabActive : ''}`}
                    onClick={() => handleSelectTemplate(tmpl)}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                className={styles.input}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className={styles.composerActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleSend}
              >
                Send email
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleCopy}
              >
                {copied ? 'Draft copied' : 'Copy draft'}
              </button>
              {copied && (
                <span className={styles.copyStatus} role="status">
                  Ready to paste into your email client.
                </span>
              )}
              {copyError && (
                <span className={styles.copyStatus} role="status">
                  Could not copy automatically. Please select and copy the text manually.
                </span>
              )}
            </div>
          </div>

          <div className={styles.linksSectionTitle}>Elsewhere</div>
          <div className={styles.contactLinks}>
            <a
              href="https://github.com/bayuadjr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkRow}
            >
              <span>GitHub</span>
              <span className={styles.linkSub}>github.com/bayuadjr</span>
            </a>
            <a
              href="https://www.linkedin.com/in/bayu-adji-ramadhan-886652236/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkRow}
            >
              <span>LinkedIn</span>
              <span className={styles.linkSub}>linkedin.com/in/bayu-adji-ramadhan</span>
            </a>
            <a
              href="https://www.instagram.com/bayuadjr/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkRow}
            >
              <span>Instagram</span>
              <span className={styles.linkSub}>@bayuadjr</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
