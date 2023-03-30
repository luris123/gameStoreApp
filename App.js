import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import GameScreen from "./screens/GameScreen";
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import ThemeContext from "./components/ThemeContext";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const lightTheme = {
    colors: {
      primary: "#6200EE",
      background: "#FFFFFF",
      card: "#F5F5F5",
      text: "#333333",
      border: "#DDDDDD",
    },
  };

  const darkTheme = {
    colors: {
      primary: "#BB86FC",
      background: "#121212",
      card: "#1E1E1E",
      text: "#FFFFFF",
      border: "#333333",
    },
  };


  const tryLogin = async () => {
    console.log("App.js: Checking if email and password are stored");

    const email = await AsyncStorage.getItem('@email');
    const password = await AsyncStorage.getItem('@password');

    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          console.log('Logged in with', user.email);
        })
        .catch(error => alert(error.message));
    }
    else {
      console.log("App.js: Credentials not stored");
      setUser(false);
    }
  }

  useEffect(() => {
    tryLogin();
  }, []);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(true);
    } else {
      setTimeout(() => {
        setUser(false);
      }, 1000);
    }
  });


  if (user === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (user === true) {

    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NavigationContainer theme={theme === "light" ? lightTheme : darkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    )
  }
};
