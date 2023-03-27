import React, { useEffect, useContext }  from "react";
import { TextInput, StyleSheet, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../components/ThemeContext";

const GameScreen = ({navigation}) => {

  const { theme } = useContext(ThemeContext);
    
  return (
    <View style={styles.container}>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Gamename</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Picture</Text>
        <Image source={require('../assets/favicon.png')}/>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Description</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>
            ajsndoa asondoasn  oansjodsa onasjodnoa osandjoans  aosjndoan
        </Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Ratings</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>
            1.5/5
        </Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Reviews</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>
            as,d.asl,dasdp,a,sdp
        </Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Publisher</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>
            PublisherGames
        </Text>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textLight: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 20,
      color: "black",
    },
    textDark: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 20,
      color: "lightgrey",
    },
})