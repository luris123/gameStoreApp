import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import ThemeContext from "./components/ThemeContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductContext } from "./components/ProductContext";
import GamesByGenreScreen from "./screens/GamesByGenreScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const currentUser = auth.currentUser;

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

    const email = await AsyncStorage.getItem("@email");
    const password = await AsyncStorage.getItem("@password");

    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with", user.email);
        })
        .catch((error) => alert(error.message));
    } else {
      console.log("App.js: Credentials not stored");
      setUser(false);
    }
  };

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

  useEffect(() => {
    if (currentUser === null) return;
    get(ref(getDatabase(), "users/" + currentUser.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.darkMode) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }
    });
  }, [currentUser]);

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
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (user === true) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ProductContext>
          <NavigationContainer
            theme={theme === "light" ? lightTheme : darkTheme}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GamesByGenre"
                component={GamesByGenreScreen}
                options={({route}) => ({title: route.params.genre ,headerShown: true })}
              />
              <Stack.Screen
                name="Game"
                component={GameScreen}
                options={({route}) => ({title: route.params.game ,headerShown: true })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProductContext>
      </ThemeContext.Provider>
    );
  }
}
