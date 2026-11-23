import { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';

const TEMPLATES = [
  {
    id: 'research',
    label: 'Research Collaboration',
    subject: 'Research Collaboration Discussion',
    body: `Hello Bayu,

I am interested in your research focus in computational social science and digital anthropology. I would like to discuss the possibility of research collaboration regarding:

[Write your research topic or idea here]

Best regards,
[Your Name]`,
  },
  {
    id: 'project',
    label: 'Project Opportunities',
    subject: 'Project Opportunities & Data Science Discussion',
    body: `Hello Bayu,

I saw your portfolio and am interested in discussing cooperation opportunities or projects regarding:

[Describe the project needs or data analysis here]

Best regards,
[Your Name]`,
  },
  {
    id: 'hello',
    label: 'Say Hello',
    subject: 'Hello Bayu — Exchanging Thoughts',
    body: `Hello Bayu,

I've been following the work and writing in your portfolio, and would like to simply exchange thoughts regarding:

[Write your discussion topic or question here]

Best regards,
[Your Name]`,
  },
];

export default function Contact() {
  const emailTarget = import.meta.env.VITE_EMAIL || 'bayuadji500@gmail.com';
  const [activeTemplate, setActiveTemplate] = useState('research');
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
            Open to research discussions, project collaborations, or just exchanging thoughts.
          </h1>
          <p className={styles.subheading}>
            Choose a relevant draft message below, adjust the content if needed, then click the send button to directly open your email client.
          </p>

          {/* Interactive Email Composer */}
          <div className={styles.composerBox}>
            <div className={styles.composerHeader}>
              <span className={styles.composerTitle}>Select Message Template:</span>
              <div className={styles.templateTabs}>
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
                Email Subject
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
                Message Body
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
                Send Message Now →
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleCopy}
              >
                {copied ? '✓ Draft Copied' : 'Copy Draft Message'}
              </button>
              {copied && (
                <span className={styles.copySuccess}>
                  Ready to paste into your email client
                </span>
              )}
              {copyError && (
                <span className={styles.copySuccess} role="status">
                  Could not copy automatically — please copy the text manually.
                </span>
              )}
            </div>
          </div>

          {/* Direct channels */}
          <div className={styles.linksSectionTitle}>Direct Channels</div>
          <div className={styles.contactLinks}>
            <a href={`mailto:${emailTarget}`} className={styles.linkRow}>
              <span>Email</span>
              <div className={styles.linkMeta}>
                <span className={styles.linkSub}>{emailTarget}</span>
                <span className={styles.linkArrow}>↗</span>
              </div>
            </a>
            <a
              href="https://github.com/bayuadjr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkRow}
            >
              <span>GitHub</span>
              <div className={styles.linkMeta}>
                <span className={styles.linkSub}>github.com/bayuadjr</span>
                <span className={styles.linkArrow}>↗</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/bayu-adji-ramadhan-886652236/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkRow}
            >
              <span>LinkedIn</span>
              <div className={styles.linkMeta}>
                <span className={styles.linkSub}>Bayu Adji Ramadhan</span>
                <span className={styles.linkArrow}>↗</span>
              </div>
            </a>
            <a
              href="https://www.instagram.com/bayuadjr/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkRow}
            >
              <span>Instagram</span>
              <div className={styles.linkMeta}>
                <span className={styles.linkSub}>@bayuadjr</span>
                <span className={styles.linkArrow}>↗</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
