import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Dashboard from "./Dashboard";
import Pickup from "./Pickup";
import Support from "./Support";
import Account from "./Account";
import SignInScreen from "./SignInScreen";

const Tab = createMaterialBottomTabNavigator();

const logoutClicked = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // Prevent default behavior
      e.preventDefault()
      AsyncStorage.getItem('token').then((response) => {
        console.log('###############')
        console.log('token from async')
        console.log(response);
        console.log('###############')
        axios
          .post("http://192.168.1.176:4000/user/logout", {}, {
            headers: { Authorization: `Bearer ${response}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              navigation.navigate("SignInScreen");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }, []);
};


const DashScreen = () => {


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
        //children={() => <Dashboard date={date} time={time} location={location} userName={userName} />}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "white",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
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
      <Tab.Screen
        tabBarOnPress={() => (logoutClicked)}
        name="Logout"
        component={""}//{logoutClicked}
        options={{
          tabBarLabel: "Logout",
          tabBarColor: "white",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="logout" color="red" size={26} />
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
