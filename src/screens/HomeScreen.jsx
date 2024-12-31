import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import MoviesSlider from "../components/MoviesSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/MoviesSlice";
import CustomHeader from "../components/CustomHeader";

//ekran oranımızı alıyoruz
export const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors, toggleTheme, isDarkTheme } = useTheme();
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, navigation]);

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

  const renderGenreSection = (genre) => {
    const genreMovies = categorizeMovies(genre);

    return (
      // burası kategöriler için sağ taraftan padding yaptık
      <View key={genre} style={[styles.section, { paddingRight: 5 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {genre}
        </Text>
        <FlatList
          data={genreMovies}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, { backgroundColor: colors.card }]}
              onPress={() =>
                navigation.navigate("Details", { movieId: item.id })
              }
            >
              <Image source={{ uri: item.poster_path }} style={styles.image} />
              <View
                style={[
                  styles.overlay,
                  isDarkTheme ? { opacity: 0.9 } : { opacity: 0.9 },
                ]}
              >
                <Text
                  style={[styles.cardTitle, { color: "white" }]}
                  numberOfLines={2} // Başlık çok uzunsa 2 satırda kesilecek
                >
                  {item.original_title}
                </Text>
              </View>
              <View
                style={[
                  styles.ratingContainer,
                  isDarkTheme ? { opacity: 0.8 } : { opacity: 0.9 },
                ]}
              >
                <MaterialIcons name="star" size={12} color="#fbbf24" />
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
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderMainSection = () => (
    // burası genel kontainer
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
      {/* üst başlık kısımımız */}
      <CustomHeader />
      {/* üst başlık kısmımımz */}

      <FlatList
        ListHeaderComponent={renderMainSection}
        data={[]} // Boş veri, çünkü sadece başlık ve MoviesComponent göstereceğiz
        renderItem={null} // Veri olmadığı için renderItem yok
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    //bizim custom eklediğimiz font
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconButton: {
    padding: 0,
  },
  section: {
    marginTop: 4,
    marginBottom: 10,
    // paddingRight: 5,
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
    borderTopLeftRadius: 10, // Sol üst köşe yuvarlama
    borderTopRightRadius: 10, // Sağ üst köşe yuvarlama
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
    right: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.73)",
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "bold",
    paddingLeft: 2,
  },
});

export default HomeScreen;
