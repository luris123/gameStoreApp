import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemeContext from "../components/ThemeContext";


const ShoppingCartScreen = () => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <View style={styles.container}>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>
            Shopping Cart
        </Text>
        </View>
    );
    }

export default ShoppingCartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      color: "white",
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
    }
});
