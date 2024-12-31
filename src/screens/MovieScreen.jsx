import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MoviesComponent from "../components/MoviesComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MoviesTabs from "../components/MoviesTabs";

const MovieScreen = () => {
  const { movies, status, error } = useSelector((state) => state.movies);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useEffect(() => {}, [dispatch, navigation]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          colors: colors.text,
        },
      ]}
    >
      {/* <Text style={[styles.title, { color: colors.text }]}>Filmler</Text> */}
      {/* <MoviesComponent goToDetails={goToDetails} /> */}

      <MoviesTabs />
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
