import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import { useTheme } from "../context/ThemeContext";
import { Entypo } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const { colors } = useTheme();
  const toast = useToast();

  const showToast = (favorites) => {
    toast.show("Favorilerden çıkarıldı !", {
      type: "success",
      duration: 3000,
      placement: "top",
      animationType: "slide-in",
    });
  };

  const goToDetails = (item) => {
    navigation.navigate("Details", { movieId: item.id });
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Pressable onPress={() => goToDetails(item)}>
        <Image source={{ uri: item.poster_path }} style={styles.image} />
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {item.original_title}
        </Text>
      </Pressable>
      <TouchableOpacity
        style={styles.favoriteButtonContainer}
        onPress={() => {
          dispatch(removeFavorite(item));
          showToast();
        }}
      >
        <Text style={styles.removeFavoriteText}>Favoriden Çıkar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Favori Filmler</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Entypo name="heart-outlined" size={64} color={colors.text} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Favori filmleriniz bulunmamaktadır.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key={favorites.length}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 12,
    overflow: "hidden",
    padding: 10,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  favoriteButtonContainer: {
    marginTop: 4,
    padding: 6,
    backgroundColor: "#e74c3c",
    borderRadius: 5,
  },
  removeFavoriteText: {
    color: "#fff",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
});
