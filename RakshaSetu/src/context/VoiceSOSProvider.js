// VoiceSOSProvider.js
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';

export const VoiceSOSContext = createContext();

export const VoiceSOSProvider = ({ children, triggerSOSGlobal }) => {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Continuous voice listening function.
  const continuouslyListenVoice = async () => {
    try {
      // Request microphone permission if not already granted
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('common.error'), "Microphone permission is required.");
        return;
      }
      setIsListening(true);
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      // Record for a fixed duration (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));

      await recording.stopAndUnloadAsync();
      setIsListening(false);
      const uri = recording.getURI();
      setIsProcessing(true);
      const recognizedText = await sendAudioToSpeechRecognition(uri);
      setIsProcessing(false);

      if (recognizedText.toLowerCase().trim() === 'help') {
        // When keyword is detected, trigger SOS.
        triggerSOSGlobal();
      }
      // Immediately start listening again.
      continuouslyListenVoice();
    } catch (error) {
      console.error("Error in continuous voice listening:", error);
      // In case of error, retry after a delay.
      setTimeout(() => continuouslyListenVoice(), 3000);
    }
  };

  // Placeholder for sending audio to a Speech-to-Text API.
  // Replace this with your actual API integration.
  const sendAudioToSpeechRecognition = async (uri) => {
    try {
      console.log("Sending audio file for transcription:", uri);
      // Simulate network delay.
      await new Promise(resolve => setTimeout(resolve, 2000));
      // For demo purposes, always return 'help'
      return 'help';
    } catch (error) {
      console.error("Error transcribing audio:", error);
      return '';
    }
  };

  // Start the continuous listening when the provider mounts.
  useEffect(() => {
    continuouslyListenVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VoiceSOSContext.Provider value={{ isListening, isProcessing }}>
      {children}
    </VoiceSOSContext.Provider>
  );
};
