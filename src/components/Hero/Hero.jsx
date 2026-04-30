import { useState, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-15 to 15 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* ── Left Column ── */}
      <div className={styles.left}>
        <div className={styles.tagline}>
          <span className={styles.taglineDash} />
          anthropology × data × ideas
        </div>

        <h1 className={styles.name}>
          Bayu<span className={styles.nameSeparator}> / </span>
          <span className={styles.nameAccent}>Adji</span>
          <span className={styles.nameSeparator}> / </span>
          Ramadhan
        </h1>

        <p className={styles.subtitle}>
          I study humans through the lens of data — an anthropology student
          building toward computational social science, one dataset at a time.
        </p>

        <div className={styles.pills}>
          <span className={`${styles.pill} ${styles.pillAccent}`}>
            open to collab
          </span>
          <span className={styles.pill}>Malang → Germany?</span>
          <span className={styles.pill}>Kaggle learner</span>
          <span className={styles.pill}>Scrum alum</span>
        </div>

        <p className={styles.currentInfo}>
          Currently: Universitas Brawijaya · Anthropology '27
        </p>
      </div>

      {/* ── Right Column (Mascot) ── */}
      <div 
        className={styles.right}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className={`${styles.cornerText} ${styles.cornerTopRight}`}>
          Malang, Indonesia
          <br />
          Est. 2005
        </span>

        <div 
          className={styles.mascot}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <div className={styles.outerRing} />
          <div className={styles.innerRing} />
          <div className={styles.core}>
            <span className={styles.initials}>BAR</span>
            <span className={styles.pulsingDot} />
          </div>
          <div className={styles.orbitContainer}>
            <div className={styles.orbitDot1} />
            <div className={styles.orbitDot2} />
          </div>
        </div>

        <span className={`${styles.cornerText} ${styles.cornerBottomLeft}`}>
          ∞ curious
        </span>
      </div>
    </section>
  );
}
