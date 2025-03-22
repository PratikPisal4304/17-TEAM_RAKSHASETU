import React from "react";

 import { NavigationContainer } from "@react-navigation/native";
 import Routes from "./src/routes";
import EditProfileScreen from "./src/screens/EditProfileScreen";

 
 const App = () => {
   return (
       <NavigationContainer>
        <Routes />
       </NavigationContainer>
   );
 };
 
 export default App;