import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { UserProvider } from "./src/context/UserContext";
import { ShakeDetectionProvider } from "./src/context/ShakeDetectionContext";
import { VoiceDetectionContext, VoiceDetectionProvider } from "./src/context/VoiceDetectionContext";
import './src/i18n'; // Ensure this file exists

const App = () => {
  return (
    <UserProvider>
      <ShakeDetectionProvider>
        <VoiceDetectionProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
        </VoiceDetectionProvider>
      </ShakeDetectionProvider>
    </UserProvider>
  );
};

export default App;
