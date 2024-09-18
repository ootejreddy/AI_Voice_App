'use client';

import React, { createContext, useContext, useState } from 'react';

interface NotesContextType {
  updateTrigger: number;
  triggerUpdate: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const triggerUpdate = () => setUpdateTrigger(prev => prev + 1);

  return (
    <NotesContext.Provider value={{ updateTrigger, triggerUpdate }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}