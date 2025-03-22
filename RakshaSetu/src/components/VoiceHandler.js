// src/context/VoiceHandler.js
import React, { useEffect, useContext, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { VoiceDetectionContext } from '../context/VoiceDetectionContext';

export default function VoiceHandler() {
  const navigation = useNavigation();
  const { isVoiceEnabled } = useContext(VoiceDetectionContext);
  const isVoiceEnabledRef = useRef(isVoiceEnabled);

  // Update ref whenever isVoiceEnabled changes.
  useEffect(() => {
    isVoiceEnabledRef.current = isVoiceEnabled;
  }, [isVoiceEnabled]);

  const continuouslyListenVoice = async () => {
    // Exit if voice detection is disabled.
    if (!isVoiceEnabledRef.current) return;

    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Error", "Microphone permission is required.");
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      // Record for 3 seconds (adjust if needed)
      await new Promise(resolve => setTimeout(resolve, 3000));

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      const recognizedText = await sendAudioToSpeechRecognition(uri);

      // Only trigger SOS if the recognized text is exactly "help"
      if (recognizedText.toLowerCase().trim() === 'help' && isVoiceEnabledRef.current) {
        navigation.navigate('SOS', { autoActivate: true });
      }

      // Continue listening if voice detection is still enabled.
      if (isVoiceEnabledRef.current) {
        continuouslyListenVoice();
      }
    } catch (error) {
      console.error("Error in continuous voice listening:", error);
      if (isVoiceEnabledRef.current) {
        setTimeout(() => continuouslyListenVoice(), 3000);
      }
    }
  };

  // Simulated Speech-to-Text function.
  // For testing, it returns "help" with 50% probability and "random" otherwise.
  // Replace this with your actual Speech-to-Text integration.
  const sendAudioToSpeechRecognition = async (uri) => {
    try {
      console.log("Sending audio file for transcription:", uri);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      // Simulate a random outcome.
      return Math.random() > 0.5 ? 'help' : 'random';
    } catch (error) {
      console.error("Error transcribing audio:", error);
      return '';
    }
  };

  useEffect(() => {
    if (isVoiceEnabled) {
      continuouslyListenVoice();
    }
    // Restart listening whenever the toggle changes.
  }, [isVoiceEnabled]);

  return null;
}
