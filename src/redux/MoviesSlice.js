import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// veri çekme işlemi
//pagination yapısı kullanılacak ve her seferinde belirli bir  film sayısı çekilecek
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("https://jsonfakery.com/movies/paginated", {
    responseType: "json",
  });
  return response.data.data;
});

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
