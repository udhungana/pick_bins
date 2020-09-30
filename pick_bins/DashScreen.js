import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Dashboard from "./Dashboard";
import Pickup from "./Pickup";
import Support from "./Support";
import Account from "./Account";

const Tab = createMaterialBottomTabNavigator();

const DashScreen = (props) => {
  <View style={styles.container}>
    <Text>DashScreen</Text>
  </View>;

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor="#00A600"
      inactiveColor="#00A600"
      style={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "white",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Pickup"
        component={Pickup}
        options={{
          tabBarLabel: "Pickup",
          tabBarColor: "white",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="truck" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarLabel: "Support",
          tabBarColor: "white",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="phone" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarColor: "white",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default DashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
