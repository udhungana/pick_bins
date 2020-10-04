import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FirstScreen from "./FirstScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import DashScreen from "./DashScreen";
import Dashboard from "./Dashboard";
import Pickup from "./Pickup";
import Support from "./Support";
import Account from "./Account";
import DriverScreen from "./DriverScreen";

const RootStack = createStackNavigator();

const Rootnavigation = ({ navigation }) => (
  <RootStack.Navigator>
    <RootStack.Screen name="FirstScreen" component={FirstScreen} />
    <RootStack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={{ headerLeft: null }}
    />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen
      name="DashScreen"
      component={DashScreen}
      options={{ headerLeft: null, headerShown: false }}
    />
    <RootStack.Screen
      name="Pickup"
      component={Pickup}
      options={{ headerLeft: null, headerShown: false }}
    />
    <RootStack.Screen
      name="DriverScreen"
      component={DriverScreen}
      options={{ headerLeft: null, headerShown: false }}
    />
    {/* <RootStack.Screen name="Dashboard" component={Dashboard} />
    <RootStack.Screen name="Pickup" component={Pickup} />
    <RootStack.Screen name="Support" component={Support} />
    <RootStack.Screen name="Account" component={Account} /> */}
  </RootStack.Navigator>
);

export default Rootnavigation;
