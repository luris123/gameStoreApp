import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { auth } from "../firebase";
import ThemeContext from "../components/ThemeContext";
import SwitchWithText from "../components/SwitchWithText";

const ProfileScreen = ({ navigation }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
      <Text
        style={
          theme === "light" ? styles.profileTextLight : styles.profileTextDark
        }
      >
        Email: {auth.currentUser.email}
      </Text>
      <SwitchWithText
        text="Dark Mode"
        value={theme === "dark"}
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
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  profileTextLight: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  profileTextDark: {
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
  },
});
