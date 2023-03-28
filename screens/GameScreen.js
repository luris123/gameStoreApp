import React, { useEffect, useContext, useState }  from "react";
import { TextInput, StyleSheet, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../components/ThemeContext";
//import { auth, functions } from '../firebase'
//import { httpsCallable } from 'firebase/functions';
import axios from 'axios';

//const getDetailsAboutTheGame = httpsCallable(functions, 'getDetailsAboutTheGame');

const GameScreen = ({navigation}) => {

  const { theme } = useContext(ThemeContext);

  const [gameID, setGameID] = useState('1011');

  const [gameName, setGameName] = useState("?");
  const [gameImage, setGameImage] = useState("https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg");
  const [gameDescription, setGameDescription] = useState("?");
  const [gameRating, setGameRating] = useState("?");
  const [gameRatings, setGameRatings] = useState("?");
  const [gameDeveloper, setGameDeveloper] = useState("?");
  const [gamePublisher, setGamePublisher] = useState("?");

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get('https://us-central1-gamestoreapp-69869.cloudfunctions.net/getDetailsAboutTheGame?id='+gameID)
      setGameName(response.data.data.name)
      setGameImage(response.data.data.background_image)
      setGameDescription(response.data.data.description_raw)
      setGameRating(response.data.data.rating)
      setGameDeveloper(response.data.data.developers[0].name)
      setGamePublisher(response.data.data.publishers[0].name)
    }
    getGames();
  }, []);
    
  return (
    <View style={styles.homeContainer}>
        <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>{gameName}</Text>
        <Image source={{uri:gameImage}} style = {{ width: 400, height: 200 }}/>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Rating: {gameRating}</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Reviews</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Publisher: {gamePublisher}</Text>
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>Developer: {gameDeveloper}</Text>
    </View>
  )
}
//<Text style={theme === "light" ? styles.textLight : styles.textDark}>{gameDescription}</Text>

export default GameScreen

const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
      alignItems: "center",
    },
    textLight: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
      color: "black",
    },
    textDark: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
      color: "lightgrey",
    },
    textLightHeader: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 20,
      color: "black",
    },
    textDarkHeader: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 20,
      color: "lightgrey",
    },
})