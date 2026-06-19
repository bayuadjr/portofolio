import { useState } from 'react';
import styles from './Hero.module.css';

const TAGLINES = [
  'antropologi × chaos',
  'kost × filsafat',
  'data × balatro',
  'thrift × parfum × stoicism',
];

const NAME_PARTS = [
  { text: 'Bayu', accent: false, spacing: '-0.06em', rotate: -1.5 },
  { text: 'Adji', accent: true, spacing: '0.14em', rotate: 2.2 },
  { text: 'Ramadhan', accent: false, spacing: '-0.09em', rotate: -0.8 },
];

function MonkeyMascot() {
  return (
    <svg
      className={styles.monkeySvg}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* peeking arm — left */}
      <path
        d="M18 130 C 8 110, 4 90, 20 72 C 32 58, 48 62, 52 78"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* waving arm — right */}
      <path
        d="M168 68 C 188 48, 198 32, 192 18 C 186 6, 170 10, 164 26"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* ear left */}
      <circle cx="52" cy="88" r="22" fill="currentColor" opacity="0.85" />
      <circle cx="52" cy="88" r="12" fill="var(--terracotta)" />
      {/* ear right */}
      <circle cx="148" cy="88" r="22" fill="currentColor" opacity="0.85" />
      <circle cx="148" cy="88" r="12" fill="var(--terracotta)" />
      {/* head */}
      <ellipse cx="100" cy="108" rx="62" ry="58" fill="currentColor" />
      {/* face patch */}
      <ellipse cx="100" cy="118" rx="38" ry="32" fill="var(--cream)" />
      {/* eyes — mischievous squint */}
      <ellipse cx="82" cy="108" rx="9" ry="5" fill="var(--ink)" transform="rotate(-8 82 108)" />
      <ellipse cx="118" cy="108" rx="9" ry="5" fill="var(--ink)" transform="rotate(8 118 108)" />
      {/* grin */}
      <path
        d="M78 128 Q 100 148 122 128"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M88 132 Q 100 138 112 132"
        stroke="var(--terracotta)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* peeking body hint */}
      <path
        d="M60 162 C 72 178, 128 178, 140 162"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Hero() {
  const [tagline] = useState(
    () => TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
  );

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.dotGrid} aria-hidden="true" />

      {/* broken grid lines */}
      <div className={styles.gridLineVertical} aria-hidden="true" />
      <div className={styles.gridLineHorizontal} aria-hidden="true" />
      <div className={styles.gridLineDiagonal} aria-hidden="true" />

      {/* right zone — gradient texture */}
      <div className={styles.rightZone} aria-hidden="true">
        <div className={styles.gradientLayer} />
        <div className={styles.gradientNoise} />
        <span className={styles.zoneLabel}>Malang · est. 2005</span>
      </div>

      {/* floating whitespace marker */}
      <span className={styles.floatingNote} aria-hidden="true">∞ curious</span>

      <div className={styles.content}>
        <div className={styles.tagline}>
          <span className={styles.taglineDash} />
          <span className={styles.taglineText}>{tagline}</span>
        </div>

        <h1 className={styles.name}>
          {NAME_PARTS.map((part, i) => (
            <span key={part.text} className={styles.nameChunk}>
              {i > 0 && <span className={styles.nameSlash}>/</span>}
              <span
                className={part.accent ? styles.nameAccent : undefined}
                style={{
                  letterSpacing: part.spacing,
                  transform: `rotate(${part.rotate}deg)`,
                }}
              >
                {part.text}
              </span>
            </span>
          ))}
        </h1>

        <p className={styles.subtitle}>
          I study humans through the lens of data — an anthropology student
          building toward computational social science, one dataset at a time.
        </p>

        <div className={styles.pills}>
          <span className={`${styles.pill} ${styles.pillAccent} ${styles.pillOffset1}`}>
            open to collab
          </span>
          <span className={`${styles.pill} ${styles.pillOffset2}`}>Data Science</span>
          <span className={`${styles.pill} ${styles.pillOffset3}`}>Ethnography</span>
          <span className={`${styles.pill} ${styles.pillOffset4}`}>Social Science</span>
        </div>

        <p className={styles.currentInfo}>
          Currently: Universitas Brawijaya · Anthropology &apos;25
        </p>
      </div>

      {/* monkey peeking from edge */}
      <div className={styles.monkeyWrap}>
        <div className={styles.monkeyPeek}>
          <MonkeyMascot />
          <span className={styles.monkeyLabel}>heh.</span>
        </div>
      </div>
    </section>
  );
}
