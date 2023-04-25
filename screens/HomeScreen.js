import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchScreen from "./SearchScreen";
import ShoppingCartScreen from "./ShoppingCartScreen";
import ProfileScreen from "./ProfileScreen";
import CategoryScreen from "./CategoryScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={"Categories"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Categories") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Shopping") {
            iconName = focused ? "card-outline" : "card-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      ScreenOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name={"Categories"} component={CategoryScreen} options={{headerShown: false}} />
      <Tab.Screen
        name={"Search"}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name={"Profile"} component={ProfileScreen} />
      <Tab.Screen
        name={"Shopping"}
        component={ShoppingCartScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

