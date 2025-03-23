import 'react-native-get-random-values'; // Add this line at the very top
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { UserProvider } from "./src/context/UserContext";
import { ShakeDetectionProvider } from "./src/context/ShakeDetectionContext";
import { VoiceDetectionProvider } from "./src/context/VoiceDetectionContext";
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
