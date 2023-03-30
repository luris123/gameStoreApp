import React, { useEffect, useContext, useState }  from "react";
import { SafeAreaView, ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../components/ThemeContext";
//import { auth, functions } from '../firebase'
//import { httpsCallable } from 'firebase/functions';
import axios from 'axios';

//const getDetailsAboutTheGame = httpsCallable(functions, 'getDetailsAboutTheGame');

const GameScreen = ({navigation, route}) => {

  const {id} = route.params
  console.log(id)
  
  const { theme } = useContext(ThemeContext);

  const [game, setGame] = useState({});

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get('https://us-central1-gamestoreapp-69869.cloudfunctions.net/getDetailsAboutTheGame?id='+id)

      let tagArray =  response.data.data.tags
      for (let i = 0; i < tagArray.length; i++) {
        tagArray[i] = tagArray[i].name+" ";
      }
      setGame({
        name: response.data.data.name,
        image: response.data.data.background_image,
        description: response.data.data.description_raw,
        rating: response.data.data.rating,
        developer: response.data.data.developers[0].name,
        publisher: response.data.data.publishers[0].name,
        releaseDate: response.data.data.released,
        tags: tagArray,
      });
    }
    getGames();
  }, []);
    
  return (
    <SafeAreaView>
    <Text style={theme === "light" ? styles.textMainLightHeader : styles.textMainDarkHeader}>{game.name}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.homeContainer}>
          <Image source={{uri: game.image}} style = {{width: 400, height: 200, resizeMode: 'contain',}}/>
          <Text style={theme === "light" ? styles.textLight : styles.textDark}>{game.description}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Rating: {game.rating}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Reviews</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Publisher: {game.publisher}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Developer: {game.developer}</Text>
          <Text style={theme === "light" ? styles.textLightHeader : styles.textDarkHeader}>Released: {game.releaseDate}</Text>
          <Text style={theme === "light" ? styles.textLight : styles.textDark}>{game.tags}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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