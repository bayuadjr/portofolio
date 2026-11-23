import { useMood } from '../../context/useMood';
import styles from './MoodSwitcher.module.css';

const CARDS_DATA = [
  {
    id: 'joker',
    title: 'THE CHAOS JOKER',
    subtitle: 'Legendary Joker',
    desc: 'Default chaotic layout. Mustard × terracotta. Unlocks asymmetric text, peeking monkey, and random taglines.',
    mult: 'x100 Chaos',
    rarity: 'legendary',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="var(--acid)" opacity="0.2" />
        {/* Abstract cute monkey smiling */}
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="38" cy="45" r="4" fill="currentColor" />
        <circle cx="62" cy="45" r="4" fill="currentColor" />
        <path d="M40 60 Q 50 72 60 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M35 30 L 42 38 M 65 30 L 58 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'anthropologist',
    title: 'THE OBSERVER',
    subtitle: 'Rare Tarot',
    desc: 'Transform page into typewriter-parchment. Serif fonts & thick margins. Focuses on qualitative ethnography.',
    mult: '+4 Fieldwork',
    rarity: 'rare',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="var(--terracotta)" opacity="0.15" />
        {/* Book and Quill */}
        <path d="M30 65 V 35 C 30 30, 45 30, 50 35 C 55 30, 70 30, 70 35 V 65 C 70 60, 55 60, 50 65 C 45 60, 30 60, 30 65 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M50 35 V 65" stroke="currentColor" strokeWidth="2" />
        <path d="M60 40 H 65 M 60 48 H 65 M 60 56 H 65 M 35 40 H 40 M 35 48 H 40 M 35 56 H 40" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'data',
    title: 'THE ALGORITHM',
    subtitle: 'Uncommon Code',
    desc: 'Switch layout to terminal mode. Monospace typography, green/cyan accents. Highlights Python, Pandas, & AI.',
    mult: '+120 Chips',
    rarity: 'uncommon',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="var(--sky)" opacity="0.15" />
        {/* Code brackets and graph */}
        <path d="M32 40 L 22 50 L 32 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M68 40 L 78 50 L 68 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M54 35 L 46 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'hustler',
    title: 'THE CATALYST',
    subtitle: 'Common Business',
    desc: 'Switch to a sleek minimalist layout. High-contrast corporate sans-serif. Highlights events, startups, and leadership.',
    mult: 'x1.5 Mult',
    rarity: 'common',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="var(--ink-light)" opacity="0.15" />
        {/* Startup rocket/lightning bolt */}
        <path d="M50 22 L 62 48 L 52 48 L 56 78 L 38 48 L 48 48 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export default function MoodSwitcher() {
  const { mood, setMood } = useMood();

  const handleCardClick = (id) => {
    setMood(id);
    // Simple haptic feedback if supported
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  return (
    <div className={styles.deckContainer}>
      <h3 className={styles.deckTitle}>Play a Card to Shift the Vibe</h3>
      <div className={styles.hand}>
        {CARDS_DATA.map((card) => {
          const isActive = mood === card.id;
          return (
            <button
              key={card.id}
              className={`${styles.card} ${styles[card.rarity]} ${isActive ? styles.active : ''}`}
              onClick={() => handleCardClick(card.id)}
              aria-label={`Switch theme to ${card.title}`}
            >
              <div className={styles.cardInner}>
                {/* Rarity Stamp */}
                <span className={styles.rarityLabel}>{card.subtitle}</span>

                {/* Card Title */}
                <h4 className={styles.cardName}>{card.title}</h4>

                {/* Art Area */}
                <div className={styles.artArea}>
                  {card.icon}
                </div>

                {/* Card Description */}
                <div className={styles.descBox}>
                  <p>{card.desc}</p>
                </div>

                {/* Stats Footer */}
                <div className={styles.cardFooter}>
                  <span className={styles.statLabel}>{card.mult}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
