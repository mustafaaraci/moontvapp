import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import moviesReducer from "../redux/MoviesSlice";
import favoritesReducer from "../redux/favoritesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // SerializableStateInvariantMiddleware'i devre dışı bıraktık.
    }),
});
