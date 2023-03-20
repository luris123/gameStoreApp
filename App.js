import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import { auth } from './firebase';

import React, { useEffect, useState } from 'react'
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeName = "Home";
const searchName = "Search";
const profileName = "Profile";


export default function App() {

  const [userNav, setUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
         if(user){
             setUser(true)

         }
     });

 }, []);

  if (userNav === false){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>

      </NavigationContainer>
      
    )
  }

  return (


    <NavigationContainer>

      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';

            } else if (rn === searchName) {
              iconName = focused ? 'search' : 'search-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        ScreenOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={searchName} component={SearchScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />

      </Tab.Navigator>


    </NavigationContainer>
    
  
  

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
