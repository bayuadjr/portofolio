import { createContext, useContext, useState, useEffect } from 'react';

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [mood, setMood] = useState(() => {
    // Default to 'joker' if not stored
    return localStorage.getItem('bayu-portfolio-mood') || 'joker';
  });

  useEffect(() => {
    // Apply data-mood to html element so CSS selectors can style based on active mood
    document.documentElement.setAttribute('data-mood', mood);
    localStorage.setItem('bayu-portfolio-mood', mood);
  }, [mood]);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
