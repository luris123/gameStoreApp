import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import ThemeContext from "./ThemeContext";

const SwitchWithText = ({ text, value, onValueChange }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={theme === "light" ? styles.textLight : styles.textDark}>{text}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default SwitchWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textLight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
  textDark: {
    fontSize: 20,
    fontWeight: "bold",
    color: "lightgrey",
    marginRight: 10,
  },
});
