import React, { createContext, useState, useContext } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  const triggerScroll = () => setShouldScroll(true);
  const resetScroll = () => setShouldScroll(false);

  return (
    <ScrollContext.Provider value={{ shouldScroll, triggerScroll, resetScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);