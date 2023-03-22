import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import React, { useContext } from "react";
import { auth } from "../firebase";
import ThemeContext from "../components/ThemeContext";

const ProfileScreen = ({ navigation }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => alert(error.message));
  };



  return (
    <View style={styles.profileContainer}>
      <Text style={styles.emailText}>Profile</Text>
      <Text style={styles.emailText}>Email: {auth.currentUser.email}</Text>
      <Switch
        value={theme === "light" ? false : true}
        onValueChange={toggleTheme}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  darkTheme: {
    backgroundColor: "#000",
    color: "#fff",
  },
  lightTheme: {
    backgroundColor: "#fff",
    color: "#000",
  },

  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  emailText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
});