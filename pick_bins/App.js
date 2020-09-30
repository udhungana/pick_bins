// import * as React from 'react';
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Rootnavigation from "./Rootnavigation";

//const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Rootnavigation />
    </NavigationContainer>
  );
}

export default App;
