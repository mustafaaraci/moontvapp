import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import MoviesSlider from "../components/MoviesSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/MoviesSlice";
import CustomHeader from "../components/CustomHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { useToast } from "react-native-toast-notifications";

// Ekran oranımızı alıyoruz
export const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { movies } = useSelector((state) => state.movies);
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const genres = ["Yeni Eklenenler", "Popüler"];

  // En popüler 10 filmi seçtik.
  const topMovies = [...movies]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  const categorizeMovies = (genre) => {
    switch (genre) {
      case "Popüler":
        return topMovies; // Popüler filmleri döndür
      case "Yeni Eklenenler":
        return movies;
      default:
        return [];
    }
  };

  // Favori durumu
  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFavorite(movie)); // Favoriden çıkar
      toast.show(`${movie.original_title} favorilerden çıkarıldı!`, {
        type: "success",
        duration: 3000,
        placement: "top",
        animationType: "slide-in",
      });
    } else {
      dispatch(addFavorite(movie)); // Favorilere ekle
      toast.show(`${movie.original_title} favorilere eklendi!`, {
        type: "success",
        duration: 3000,
        placement: "top",
        animationType: "slide-in",
      });
    }
  };

  const renderGenreSection = (genre) => {
    const genreMovies = categorizeMovies(genre);

    return (
      <View key={genre} style={[styles.section]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {genre}
        </Text>
        <FlatList
          data={genreMovies}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Pressable
                onPress={() =>
                  navigation.navigate("Details", { movieId: item.id })
                }
              >
                <Image
                  source={{ uri: item.poster_path }}
                  style={styles.image}
                />
                <View style={styles.overlay}>
                  <Text
                    style={[styles.cardTitle, { color: "white" }]}
                    numberOfLines={2} // Başlık çok uzunsa 2 satırda kesilecek
                  >
                    {item.original_title}
                  </Text>
                </View>
              </Pressable>

              {/* Sol üstte IMDb ve sağ üstte kalp ikonu */}
              <View style={styles.ratingContainer}>
                <View style={styles.imdbContainer}>
                  <MaterialIcons name="star" size={12} color="#fbbf24" />
                  <Text style={[styles.ratingText, { color: "white" }]}>
                    IMDb
                  </Text>
                  <Text style={[styles.ratingText, { color: "white" }]}>
                    {item.vote_average}
                  </Text>
                </View>
                <Pressable
                  style={styles.favoriteButtonContainer}
                  onPress={() => toggleFavorite(item)} // Favori değerini değiştir
                >
                  <TouchableOpacity>
                    <Entypo
                      name="heart"
                      size={28}
                      style={[
                        styles.favoritesIcon,
                        {
                          color: favorites.some((fav) => fav.id === item.id)
                            ? "#FFC000"
                            : "rgb(255, 255, 255)",
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderMainSection = () => (
    <View>
      <View style={[styles.section]}>
        <MoviesSlider />
      </View>
      <View style={styles.section}>
        {genres.map((genre) => renderGenreSection(genre))}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <CustomHeader />

      <FlatList
        ListHeaderComponent={renderMainSection}
        data={[]} // Boş veri, çünkü sadece başlık ve MoviesComponent göstereceğiz
        renderItem={null} // Veri olmadığı için renderItem yok
        keyExtractor={(item) => item.toString()} // Benzersiz anahtar
        scrollEnabled={true}
        extraData={favorites} // Favori durumunu izlemek için
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  card: {
    width: width / 3,
    borderRadius: 8,
    marginHorizontal: 5,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.73)",
    padding: 8,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.73)",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: "center",
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "bold",
    paddingLeft: 2,
  },
  favoriteButtonContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.73)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 0,
    padding: 6,
    left: 10,
    bottom: 10,
  },

  favoritesIcon: {
    padding: 2,
  },
});

export default HomeScreen;
