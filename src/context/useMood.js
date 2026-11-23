import { createContext, useContext } from 'react';

export const MoodContext = createContext();

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
