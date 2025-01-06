import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const itemExists = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        state.favorites.push(action.payload); // Favorilere ekle
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      ); // Favorilerden çıkar
    },
    clearFavorites: (state) => {
      state.favorites = []; // Tüm favorileri temizle
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
