// src/context/VoiceDetectionContext.js
import React, { createContext, useState } from 'react';

export const VoiceDetectionContext = createContext();

export const VoiceDetectionProvider = ({ children }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  return (
    <VoiceDetectionContext.Provider value={{ isVoiceEnabled, setIsVoiceEnabled }}>
      {children}
    </VoiceDetectionContext.Provider>
  );
};
