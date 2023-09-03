import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for fetching locations
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    try {
      const response = await axios.get("/api/locations"); // Change the URL to match your API endpoint for fetching locations
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
