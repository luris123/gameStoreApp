import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.emailText}>Home Screen</Text>
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
