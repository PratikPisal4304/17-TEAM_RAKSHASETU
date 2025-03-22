import React from "react";

 import { NavigationContainer } from "@react-navigation/native";
 import Routes from "./src/routes";
 
 import './src/i18n';
 
 const App = () => {
   return (
       <NavigationContainer>
        <Routes />
       </NavigationContainer>
   );
 };
 
 export default App;