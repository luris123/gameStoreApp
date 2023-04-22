import React from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import ThemeContext from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ game, bg, id }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Game", { id, game })}>
      <View style={[styles.productItem]}>
        <Image style={[styles.productImage]} source={{ uri: bg }} />
        <Text style={[styles.productName]}>{game}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGames();
    changePageNumber();
  }, []);

  const getGames = async () => {
    if (search.length == 0) {
      setLoading(true);
      const response = await axios.get(
        `https://europe-west1-gamestoreapp-69869.cloudfunctions.net/getGames?page=${pageNumber}`
      );
      setGames((prevGames) => [...prevGames, ...response.data.results]);
      setLoading(false);

      //if there is a next page, increment the page number
      if (response.data.next == true) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  const changePageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  const matchedGames = games?.filter((games) =>
    games.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchBarStyle}>
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1, marginRight: 4 }}
          />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={[styles.search, { width: "100%" }]}
            placeholder="Search"
          />
        </View>
      </View>
      <View style={theme === "light" ? styles.cont3Light : styles.cont3Dark}>
        <Text
          style={
            theme === "light" ? styles.textHeaderLight : styles.textHeaderDark
          }
        >
          Products
        </Text>
        {games != undefined ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={matchedGames}
            renderItem={({ item }) => (
              <ProductCard
                game={item.name}
                bg={item.background_image}
                id={item.id}
              />
            )}
            ListFooterComponent={renderFooter}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            onEndReached={getGames}
            onEndReachedThreshold={0.5}
            columnWrapperStyle={styles.categoriesContainer}
          ></FlatList>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#1c73ba",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
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
    color: "white",
  },

  headerContainer: {
    paddingTop: 40,
    flex: 0.12,
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },

  searchBarStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    paddingHorizontal: 20,
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    padding: 10,
  },

  cont3Light: {
    flex: 0.88,
    backgroundColor: "#f2f2f2",
    width: "100%",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },

  cont3Dark: {
    flex: 0.88,
    backgroundColor: "#121212",
    width: "100%",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },

  categoriesContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  productItem: {
    flex: 1,
    width: 175,
    height: 175,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },

  productImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  productName: {
    position: "relative",
    zIndex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  textHeaderLight: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 20,
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
    fontWeight: "bold",
  },

  textHeaderDark: {
    paddingTop: 20,
    paddingStart: 20,
    paddingBottom: 20,
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
    fontWeight: "bold",
    color: "white",
  },
});
