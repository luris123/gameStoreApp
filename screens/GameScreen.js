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
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text
              style={
                theme === "light" ? styles.infoLabelLight : styles.infoLabelDark
              }
            >
              Rating:
            </Text>
            <Text
              style={
                theme === "light" ? styles.infoValueLight : styles.infoValueDark
              }
            >
              {game.rating}
            </Text>
          </View>
          <View style={styles.info}>
            <Text
              style={
                theme === "light" ? styles.infoLabelLight : styles.infoLabelDark
              }
            >
              Developer:
            </Text>
            <Text
              style={
                theme === "light" ? styles.infoValueLight : styles.infoValueDark
              }
            >
              {game.developer}
            </Text>
          </View>
          <View style={styles.info}>
            <Text
              style={
                theme === "light" ? styles.infoLabelLight : styles.infoLabelDark
              }
            >
              Publisher:
            </Text>
            <Text
              style={
                theme === "light" ? styles.infoValueLight : styles.infoValueDark
              }
            >
              {game.publisher}
            </Text>
          </View>
          <View style={styles.info}>
            <Text
              style={
                theme === "light" ? styles.infoLabelLight : styles.infoLabelDark
              }
            >
              Release Date:
            </Text>
            <Text
              style={
                theme === "light" ? styles.infoValueLight : styles.infoValueDark
              }
            >
              {game.releaseDate}
            </Text>
          </View>
          <View style={styles.info}>
            <Text
              style={
                theme === "light" ? styles.infoLabelLight : styles.infoLabelDark
              }
            >
              Platforms:
            </Text>
            <Text
              style={
                theme === "light" ? styles.infoValueLight : styles.infoValueDark
              }
            >
              {game.platforms}
            </Text>
          </View>
          <View style={styles.info}>
            <Text
              style={
                theme === "light" ? styles.infoLabelLight : styles.infoLabelDark
              }
            >
              Genres:
            </Text>
            <Text
              style={
                theme === "light" ? styles.infoValueLight : styles.infoValueDark
              }
            >
              {game.genres}
            </Text>
          </View>

          <Button
            title="Add to shopping cart"
            onPress={handleAddGameToCart}
          ></Button>
        </View>
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
  infoContainer: {
    marginVertical: 10,
    alignSelf: "stretch",
    margin: 20,
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
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  descriptionContainerDark: {
    borderRadius: 5,
    padding: 10,
    borderBottomColor: "lightgrey",
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
});
