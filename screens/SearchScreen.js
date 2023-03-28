import React from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Button,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import ThemeContext from "../components/ThemeContext";

const ProductCard = ({ game, bg }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity style={{ width: "100%", marginVertical: 14 }}>
      <View style={styles.bodyContainer}>
        <View style={styles.innerProductCard}></View>

        <Image style={styles.img} source={{ uri: bg }} />
      </View>

      <Text
        style={{
          fontSize: 12,
          backgroundColor: "#dfe6e0",
          fontWeight: "600",
          marginBottom: 2,
          color: theme === "light" ? "black" : "lightgrey",
        }}
      >
        {game}
      </Text>
    </TouchableOpacity>
  );
};

const SearchScreen = () => {
  const { theme } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [game, setGame] = useState();

  useEffect(() => {
    
    getGames();
    changePageNumber();
  }, []);

  const getGames = async () => {
    const response = await axios.get(
      `https://us-central1-gamestoreapp-69869.cloudfunctions.net/getAllGames?how_many_pages=${pageNumber}`
    );
    setGame(response.data.data);
  };

  const changePageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  const matchedGames = game?.filter((games) =>
    games.name.toLowerCase().includes(search.toLowerCase())
  );

  if (game != undefined) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="chevron-left" color="#FFF" size={25} />
          </TouchableOpacity>
          <Feather name="filter" color="#FFF" size={25} />
        </View>

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
              style={styles.search}
              placeholder="Search"
            />
          </View>
        </View>

        <View style={styles.cont3}>
          <Text style={styles.textHeader}>Products</Text>
          <Button title="Load More" onPress={() => {
            getGames();
            changePageNumber();
          }} />

          <FlatList
            data={matchedGames}
            renderItem={({ item }) => (
              <ProductCard game={item.name} bg={item.background_image} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          ></View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="chevron-left" color="#FFF" size={25} />
          </TouchableOpacity>
          <Feather name="filter" color="#FFF" size={25} />
        </View>

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
              style={styles.search}
              placeholder="Search"
            />
          </View>
        </View>

        <View style={styles.cont3}>
          <Text style={styles.textHeader}>Products</Text>

          <Text>Loading...</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          ></View>
        </View>
      </View>
    );
  }
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#1c73ba",
  },

  header: {
    flex: 0.05,
    //height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    //backgroundColor: "#1bab42",
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
    color: "lightgrey",
  },

  headerContainer: {
    //backgroundColor: "#a30b0b",
    flex: 0.1,
    alignContent: "center",
    //alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  searchBarStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 225,
    paddingHorizontal: 20,
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    padding: 10,
  },

  cont3: {
    alignItems: "center",
    flex: 0.85,
    //backgroundColor: "#19b342",
    backgroundColor: "#f2f2f2",
    width: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    //borderRadius: 50,
    // paddingHorizontal: 20,
    //marginTop: 50,
  },

  bodyContainer: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#d9dbda",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  innerProductCard: {
    width: "20%",
    height: "24%",
    backgroundColor: "#d9dbda",
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textHeader: {
    paddingTop: 20,
    paddingStart: 20,
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
    fontWeight: "bold",
  },

  textDescription: {
    fontSize: 12,
    backgroundColor: "#dfe6e0",
    letterSpacing: 1,
    fontWeight: "bold",
  },

  btn: {
    backgroundColor: "#E2443B",
    paddingHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 20,
    color: "#FFF",
  },

  cont1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 40,
  },

  img: {
    height: "80%",
    width: "80%",
    resizeMode: "cover",
  },
});
