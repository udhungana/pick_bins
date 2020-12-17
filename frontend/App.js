// import * as React from 'react';
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Rootnavigation from "./Rootnavigation";

/**
 * Initial start page which calls root navigation component that regulates navigation between screens.
 */

function App() {
  return (
    <NavigationContainer>
      <Rootnavigation />
    </NavigationContainer>
  );
}

export default App;
