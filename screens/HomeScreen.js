import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThemeContext from "../components/ThemeContext";
import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchScreen from './SearchScreen';
import ShoppingCartScreen from './ShoppingCartScreen';
import ProfileScreen from './ProfileScreen';
import CategoryScreen from './CategoryScreen';

import { useNavigation } from '@react-navigation/core'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeScreen = () => {
  const navigation = useNavigation();

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const getGenres = async () => {
      const response = await axios.get('https://europe-west1-gamestoreapp-69869.cloudfunctions.net/getAllGenres');
      //console.log(response.data);
    }
    getGenres();
  }, [])


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
            iconName = focused ? "card-outline" : "card-outline"
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
      <Tab.Screen name={"Categories"} component={CategoryScreen} />
      <Tab.Screen name={"Search"} component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name={"Profile"} component={ProfileScreen} />
      <Tab.Screen name={"Shopping"} component={ShoppingCartScreen} options={{ headerShown: false }} />
    </Tab.Navigator>

  );

};


export default HomeScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textLight: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  textDark: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "lightgrey",
  },
  logoutButton: {
    backgroundColor: "#2c6bed",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
