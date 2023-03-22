import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./firebase";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import ThemeContext from "./components/ThemeContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(false);
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  if (user === false) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NavigationContainer theme={theme === "light" ? lightTheme : darkTheme}>
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
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer theme={theme === "light" ? lightTheme : darkTheme}>
        <Tab.Navigator
          initialRouteName={"Home"}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "search-outline";
              }

              // You can return any component that you like here!
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
          <Tab.Screen name={"Home"} component={HomeScreen} />
          <Tab.Screen name={"Search"} component={SearchScreen} />
          <Tab.Screen name={"Profile"} component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
