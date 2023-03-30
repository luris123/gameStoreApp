import React, { useEffect, useContext, useState }  from "react";
import { SafeAreaView, ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../components/ThemeContext";
//import { auth, functions } from '../firebase'
//import { httpsCallable } from 'firebase/functions';
import axios from 'axios';

//const getDetailsAboutTheGame = httpsCallable(functions, 'getDetailsAboutTheGame');

const GameScreen = ({navigation}) => {

  const { theme } = useContext(ThemeContext);

  const [gameID, setGameID] = useState('223');

  const [gameName, setGameName] = useState("?");
  const [gameImage, setGameImage] = useState("https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg");
  const [gameDescription, setGameDescription] = useState("?");
  const [gameRating, setGameRating] = useState("?");
  const [gameRatings, setGameRatings] = useState("?");
  const [gameDeveloper, setGameDeveloper] = useState("?");
  const [gamePublisher, setGamePublisher] = useState("?");
  const [gameReleaseDate, setGameReleaseDate] = useState("?");
  const [gameTags, setGameTags] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get('https://us-central1-gamestoreapp-69869.cloudfunctions.net/getDetailsAboutTheGame?id='+gameID)
      setGameName(response.data.data.name)
      setGameImage(response.data.data.background_image)
      setGameDescription(response.data.data.description_raw)
      setGameRating(response.data.data.rating)
      setGameDeveloper(response.data.data.developers[0].name)
      setGamePublisher(response.data.data.publishers[0].name)
      setGameReleaseDate(response.data.data.released)
      let tagArray =  response.data.data.tags
      for (let i = 0; i < tagArray.length; i++) {
        tagArray[i] = tagArray[i].name+" ";
      }
      setGameTags(tagArray)
    }
    getGames();
  }, []);
    
  return (
    <SafeAreaView>
    <Text style={theme === "light" ? styles.textMainLightHeader : styles.textMainDarkHeader}>{gameName}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.homeContainer}>
          <Image source={{uri:gameImage}} style = {{width: 400, height: 200, resizeMode: 'contain',}}/>
          <Text style={theme === "light" ? styles.textLight : styles.textDark}>{gameDescription}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Rating: {gameRating}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Reviews</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Publisher: {gamePublisher}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Developer: {gameDeveloper}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Released: {gameReleaseDate}</Text>
          <Text style={theme === "light" ? styles.textLight : styles.textDark}>{gameTags}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
//<Text style={theme === "light" ? styles.textLight : styles.textDark}>{gameDescription}</Text>

export default GameScreen

const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
    },
    scrollView: {
      //padding: 5,
      paddingLeft: 10,
      paddingRight: 5,
      marginBottom: 80,
    },
    textLight: {
      fontSize: 11,
      fontWeight: "bold",
      marginBottom: 10,
      color: "black",
    },
    textDark: {
      fontSize: 11,
      fontWeight: "bold",
      marginBottom: 10,
      color: "lightgrey",
    },
    textMainLightHeader: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 5,
      color: "black",
      alignSelf: "center",
    },
    textMainDarkHeader: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 5,
      color: "lightgrey",
      alignSelf: "center",
    },
    textLightHeader: {
      fontSize: 24,
      marginBottom: 15,
      color: "black",
    },
    textDarkHeader: {
      fontSize: 24,
      marginBottom: 15,
      color: "lightgrey",
    },
})