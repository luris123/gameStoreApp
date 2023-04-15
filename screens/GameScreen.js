import React, { useEffect, useContext, useState }  from "react";
import { SafeAreaView, ScrollView, StyleSheet, Image, Text, View, Button } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../components/ThemeContext";
import axios from 'axios';
import ProductContext from "../components/ProductContext";
import ProductCartContext from "../components/ProductContext";


//const getDetailsAboutTheGame = httpsCallable(functions, 'getDetailsAboutTheGame');

const GameScreen = ({navigation, route}) => {

  const {id} = route.params
  console.log(id)

  const { product, setProduct } = useContext(ProductCartContext)

  const { theme } = useContext(ThemeContext);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [game, setGame] = useState({});

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get('https://europe-west1-gamestoreapp-69869.cloudfunctions.net/getDetailsAboutTheGame?id='+id)

      let genreArray =  response.data.data.genres
      for (let i = 0; i < genreArray.length; i++) {
        genreArray[i] = genreArray[i].name+", ";
      }
      let platformsArray =  response.data.data.platforms
      for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i] = platformsArray[i].platform.name+", ";
      }
      setGame({
        name: response.data.data.name,
        image: response.data.data.background_image,
        description: response.data.data.description_raw,
        developer: response.data.data.developers[0].name,
        publisher: response.data.data.publishers[0].name,
        releaseDate: response.data.data.released,
        rating: response.data.data.rating,
        genres: genreArray,
        platforms: platformsArray,
      });
    }
    getGames();
  }, []);

  const handleAddGameToCart = () => {
    console.log(product.length);
    setProduct([...product, game]);
  }

  
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={{paddingHorizontal: 16, paddingTop: 50}} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" color="#701711" size={25} />
      </TouchableOpacity>
      <Text style={theme === "light" ? styles.textMainLightHeader : styles.textMainDarkHeader}>{game.name}</Text>
      <ScrollView>
        <Image source={{uri: game.image}} style = {styles.img}/>
        
        <TouchableOpacity onPress={toggleDescription}>
          <View style={theme === "light" ? styles.descriptionContainerLight : styles.descriptionContainerDark}>
            <Text style={theme === "light" ? styles.descriptionLight : styles.descriptionDark} numberOfLines={showFullDescription ? undefined : 2}>
              Description
            </Text>
            {showFullDescription && (
              <Text style={theme === "light" ? styles.descriptionMoreLight : styles.descriptionMoreDark}>
                {game.description}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>Rating:</Text>
            <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>{game.rating}</Text>
          </View>
          <View style={styles.info}>
            <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>Developer:</Text>
            <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>{game.developer}</Text>
          </View>
          <View style={styles.info}>
            <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>Publisher:</Text>
            <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>{game.publisher}</Text>
          </View>
          <View style={styles.info}>
            <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>Release Date:</Text>
            <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>{game.releaseDate}</Text>
          </View>
          <View style={styles.info}>
            <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>Platforms:</Text>
            <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>{game.platforms}</Text>
          </View>
          <View style={styles.info}>
            <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>Genres:</Text>
            <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>{game.genres}</Text>
          </View>

          <Button title="Add to shopping cart" onPress={handleAddGameToCart}></Button>
        </View>

        
        
      </ScrollView>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    img: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
    },
    infoContainer: {
      marginVertical: 10,
      alignSelf: 'stretch',
      margin: 20
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    infoLabelLight: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "black",
    },
    infoLabelDark: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "lightgrey",
    },
    infoValueLight: {
      fontSize: 16,
      marginLeft: 8,
      padding: 5,
      color: "black",
    },
    infoValueDark: {
      fontSize: 16,
      marginLeft: 8,
      padding: 5,
      color: "lightgrey",
    },

    descriptionContainerLight: {
      borderRadius: 5,
      padding: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginBottom: 20,
    },
    descriptionContainerDark: {
      borderRadius: 5,
      padding: 10,
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
      marginBottom: 20,
    },
    descriptionLight: {
      fontSize: 20,
      color: "black",
    },
    descriptionDark: {
      fontSize: 20,
      color: "lightgrey",
    },
    descriptionMoreLight: {
      fontSize: 16,
      marginTop: 10,
      color: "black",
    },
    descriptionMoreDark: {
      fontSize: 16,
      marginTop: 10,
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
})
