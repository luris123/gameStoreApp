import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../components/ThemeContext";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.homeContainer}>
      <Text style={theme === "light" ? styles.textLight : styles.textDark}>
        Home Screen
      </Text>
    </View>
  );
};

export default HomeScreen;

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
  },
});
