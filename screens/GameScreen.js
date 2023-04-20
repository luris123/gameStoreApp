import React, { useEffect, useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../components/ThemeContext";
import axios from "axios";
import ProductContext from "../components/ProductContext";
import ProductCartContext from "../components/ProductContext";

//const getDetailsAboutTheGame = httpsCallable(functions, 'getDetailsAboutTheGame');

const GameScreen = ({ navigation, route }) => {
  const { id } = route.params;
  console.log(id);

  const { product, setProduct } = useContext(ProductCartContext);

  const { theme } = useContext(ThemeContext);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [showFullInfo, setShowFullInfo] = useState(false);

  const toggleInfo = () => {
    setShowFullInfo(!showFullInfo);
  };

  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const randomPrice = Math.floor(Math.random() * 20 + 40)

  const getGames = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://europe-west1-gamestoreapp-69869.cloudfunctions.net/getDetailsAboutTheGame?id=" +
        id
    );

    let genreArray = response.data.results.genres;
    for (let i = 0; i < genreArray.length; i++) {
      genreArray[i] = genreArray[i].name + ", ";
    }
    let platformsArray = response.data.results.platforms;
    for (let i = 0; i < platformsArray.length; i++) {
      platformsArray[i] = platformsArray[i].platform.name + ", ";
    }
    setGame({
      name: response.data.results.name,
      image: response.data.results.background_image,
      description: response.data.results.description_raw,
      developer: response.data.results.developers[0].name,
      publisher: response.data.results.publishers[0].name,
      releaseDate: response.data.results.released,
      rating: response.data.results.rating,
      genres: genreArray,
      platforms: platformsArray,
      price: randomPrice

    });
    setIsLoading(false);
  };

  useEffect(() => {
    getGames();
  }, []);

  const handleAddGameToCart = () => {
    if (product.find((item) => item.id === id) === undefined) {
      setProduct([...product, { id: id, name: game.name, image: game.image, price: game.price }]);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={
          theme === "light"
            ? styles.textMainLightHeader
            : styles.textMainDarkHeader
        }
      >
        {game.name}
      </Text>
      <ScrollView>
        <Image source={{ uri: game.image }} style={styles.img} />

        <TouchableOpacity onPress={toggleDescription}>
          <View
            style={
              theme === "light"
                ? styles.descriptionContainerLight
                : styles.descriptionContainerDark
            }
          >
            <Text
              style={
                theme === "light"
                  ? styles.descriptionLight
                  : styles.descriptionDark
              }
              numberOfLines={showFullDescription ? undefined : 2}
            >
              Description
            </Text>
            {showFullDescription && (
              <Text
                style={
                  theme === "light"
                    ? styles.descriptionMoreLight
                    : styles.descriptionMoreDark
                }
              >
                {game.description}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleInfo}>
          <View style={theme === "light" ? styles.infoContainerLight : styles.infoContainerDark}>
            <Text style={theme === "light" ? styles.InfoHeaderLight : styles.InfoHeaderDark} numberOfLines={showFullInfo ? undefined : 2}>
              Info
            </Text>
            {showFullInfo && (
            <>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Price:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.price}€
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Rating:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.rating}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Genres:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.genres}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Release Date:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.releaseDate}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Developer:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.developer}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Publisher:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.publisher}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={theme === "light" ? styles.infoLabelLight : styles.infoLabelDark}>
                  Platforms:
                </Text>
                <Text style={theme === "light" ? styles.infoValueLight : styles.infoValueDark}>
                  {game.platforms}
                </Text>
              </View>
            </>
            )}
          </View>
        </TouchableOpacity>
        <Button
            title="Add to shopping cart"
            onPress={handleAddGameToCart}
        ></Button>
      </ScrollView>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainerLight: {
    borderRadius: 5,
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  infoContainerDark: {
    borderRadius: 5,
    padding: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabelLight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  infoLabelDark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "lightgrey",
  },
  infoValueLight: {
    fontSize: 16,
    marginLeft: 10,
    //padding: 5,
    color: "black",
  },
  infoValueDark: {
    fontSize: 16,
    marginLeft: 10,
    //padding: 5,
    color: "lightgrey",
  },
  InfoHeaderLight: {
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
  },
  InfoHeaderDark: {
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 10,
    color: "lightgrey",
    fontWeight: "bold",
  },

  descriptionContainerLight: {
    borderRadius: 5,
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  descriptionContainerDark: {
    borderRadius: 5,
    padding: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  descriptionLight: {
    fontSize: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  descriptionDark: {
    fontSize: 20,
    marginBottom: 10,
    color: "lightgrey",
    fontWeight: "bold",
  },
  descriptionMoreLight: {
    fontSize: 16,
    color: "black",
  },
  descriptionMoreDark: {
    fontSize: 16,
    color: "lightgrey",
  },

  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: "lightblue"
  },
  priceLabel: {
    alignSelf: "center",
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textMainLightHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    color: "black",
    alignSelf: "center",
  },
  textMainDarkHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    color: "lightgrey",
    alignSelf: "center",
  },
});
