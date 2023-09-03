import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for fetching location managers
export const fetchLocationManagers = createAsyncThunk(
  "locationManagers/fetchLocationManagers",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/locationmanagers"
      ); // Change the URL to match your API endpoint for fetching location managers
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const locationManagerSlice = createSlice({
  name: "locationManagers",
  initialState: {
    locationManagers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationManagers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocationManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.locationManagers = action.payload;
      })
      .addCase(fetchLocationManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationManagerSlice.reducer;
