import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import moviesReducer from "../redux/MoviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // SerializableStateInvariantMiddleware'i devre dışı bıraktık.
    }),
});
