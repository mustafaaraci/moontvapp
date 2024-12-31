import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

//çalışmasında biraz sıkıntı yaşanıyor daha optizasyon yapılması gerekiyor
const MoviesSlider = () => {
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors, isDarkTheme } = useTheme();

  useEffect(() => {}, [dispatch, navigation]);

  // En popüler 10 filmi seçtik.
  const topMovies = [...movies]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  // Reanimated loglama yapılandırması
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.slide}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    >
      <Image source={{ uri: item.poster_path }} style={styles.image} />
      <View
        style={[
          styles.ratingContainer,
          isDarkTheme ? { opacity: 0.8 } : { opacity: 0.9 },
        ]}
      >
        <MaterialIcons name="star" size={16} color="#fbbf24" />
        <Text
          style={[
            styles.ratingText,
            isDarkTheme ? { color: colors.text } : { color: "white" },
          ]}
        >
          IMDb
        </Text>
        <Text
          style={[
            styles.ratingText,
            isDarkTheme ? { color: colors.text } : { color: "white" },
          ]}
        >
          {item.vote_average}
        </Text>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={1}>
          {item.original_title}
        </Text>
        <Text style={styles.description}>
          {item.overview.length > 100
            ? `${item.overview.substring(0, 100)}...`
            : item.overview}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <Carousel
      width={width}
      height={300}
      data={topMovies}
      renderItem={renderItem}
      loop={true}
      autoPlay={true}
      autoPlayInterval={4000}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },

  ratingContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 5,
    right: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.73)",
    alignItems: "center",
  },
  ratingText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MoviesSlider;
