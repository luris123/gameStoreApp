import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const CategoryScreen = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);

  // Define an array of categories
  useEffect(() => {
    const getGenres = async () => {
      const response = await axios.get(
        "https://europe-west1-gamestoreapp-69869.cloudfunctions.net/getAllGenres"
      );
      setCategories(response.data.results);
    };
    getGenres();
  }, []);

  // Render a category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("GamesByGenre", { genre: item.name })}
    >
      <View style={[styles.categoryItem]}>
        <Image
          style={[styles.categoryImage]}
          source={{ uri: item.image_background }}
        />
        <Text style={[styles.categoryName]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.categoriesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  categoriesContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  categoryItem: {
    flex: 1,
    width: 175,
    height: 175,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  categoryImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  categoryName: {
    position: "relative",
    zIndex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default CategoryScreen;
