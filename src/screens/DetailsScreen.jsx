import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

//ekranın genişliğini alıyoruz
const { width } = Dimensions.get("window");

const DetailsScreen = () => {
  const route = useRoute();
  const { movieId } = route.params;
  const { colors } = useTheme();
  const movieDetail = useSelector((state) =>
    state.movies.movies.find((m) => m.id === movieId)
  );
  const [showAllCast, setShowAllCast] = useState(false); // Tüm cast'i göstermek için state

  if (!movieDetail) {
    return <Text style={{ color: colors.text }}>Movie not found</Text>;
  }

  // İlk 5 cast'i aldık
  const displayedCasts = showAllCast
    ? movieDetail.casts
    : movieDetail.casts.slice(0, 5);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.headerBackground }]}
    >
      <Image source={{ uri: movieDetail.poster_path }} style={styles.poster} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {movieDetail.original_title}
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {movieDetail.overview}
        </Text>
        <Text style={[styles.releaseDate, { color: colors.text }]}>
          Release Date: {movieDetail.release_date}
        </Text>
        <Text style={[styles.voteAverage, { color: colors.text }]}>
          Rating: {movieDetail.vote_average}
        </Text>
        <View style={styles.castContainer}>
          <Text style={[styles.castTitle, { color: colors.text }]}>
            Oyuncular:
          </Text>
          {displayedCasts && displayedCasts.length > 0 ? (
            displayedCasts.map((cast) => (
              <View key={cast.id} style={styles.castItem}>
                <Image
                  source={{ uri: cast.profile_path }}
                  style={styles.castImage}
                />
                <View style={styles.castInfo}>
                  <Text style={[styles.castName, { color: colors.text }]}>
                    {cast.name}
                  </Text>
                  <Text style={[styles.castCharacter, { color: colors.text }]}>
                    as {cast.character}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={{ color: colors.text }}>Cast bilgisi yok.</Text>
          )}

          {/* Eğer cast sayısı 5'ten fazla ise "Daha fazla göster" butonu ekleyin */}
          {movieDetail.casts &&
            movieDetail.casts.length > 5 &&
            !showAllCast && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => setShowAllCast(true)}
              >
                <Text style={[styles.showMoreText, { color: colors.text }]}>
                  Daha fazla göster
                </Text>
                <Feather name="chevron-down" size={30} color={colors.text} />
              </TouchableOpacity>
            )}

          {/* Tüm castler gösterildiyse, "Daha az göster" butonu ekleyin */}
          {showAllCast && movieDetail.casts.length > 5 && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => setShowAllCast(false)}
            >
              <Text style={[styles.showMoreText, { color: colors.text }]}>
                Daha az göster
              </Text>
              <Feather name="chevron-up" size={30} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: width,
    height: width * 1.5,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 14,
    marginBottom: 10,
  },
  voteAverage: {
    fontSize: 14,
    marginBottom: 20,
  },
  castContainer: {
    marginTop: 20,
  },
  castTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  castItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  castImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  castInfo: {
    flex: 1,
  },
  castName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  castCharacter: {
    fontSize: 14,
    color: "#888",
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  showMoreText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default DetailsScreen;
