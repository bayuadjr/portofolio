import { useState, useEffect } from 'react';
import { MoodContext } from './useMood';

export function MoodProvider({ children }) {
  const [mood, setMood] = useState(() => {
    try {
      return localStorage.getItem('bayu-portfolio-mood') || 'joker';
    } catch {
      return 'joker';
    }
  });

  useEffect(() => {
    // Apply data-mood to html element so CSS selectors can style based on active mood
    document.documentElement.setAttribute('data-mood', mood);
    try {
      localStorage.setItem('bayu-portfolio-mood', mood);
    } catch {
      // Ignore storage write errors in restricted browsing contexts.
    }
  }, [mood]);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}
