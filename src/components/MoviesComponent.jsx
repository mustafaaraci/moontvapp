import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../redux/MoviesSlice";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

const MoviesComponent = () => {
  const { movies, status, error } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors, toggleTheme, isDarkTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, navigation]);

  const goToDetails = (item) => {
    navigation.navigate("Details", { movieId: item.id });
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => goToDetails(item)}
    >
      <Image source={{ uri: item.poster_path }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={[styles.title, { color: colors.text }]}>
          {item.original_title}
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {item.overview.length > 100
            ? `${item.overview.substring(0, 100)}...`
            : item.overview}
        </Text>
      </View>
    </Pressable>
  );

  if (status === "loading") {
    return (
      <ActivityIndicator size="large" color="gray" style={styles.loader} />
    );
  }

  if (status === "failed") {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      initialNumToRender={10} // İlk başta 10 öğe render et
      maxToRenderPerBatch={20} // Her batch'te 20 öğe render et
      windowSize={21} // Gözlemlenen pencere büyüklüğü
      style={{ paddingHorizontal: 5, paddingVertical: 5 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    //resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 12,
    color: "#888",
  },
  voteAverage: {
    fontSize: 12,
    color: "#888",
  },
});

export default MoviesComponent;
