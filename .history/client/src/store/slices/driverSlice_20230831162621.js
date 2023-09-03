// slices/driverSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDrivers = createAsyncThunk(
  "drivers/fetchDrivers",
  async () => {
    const response = await axios.get("http://localhost:5000/driver"); // Change the URL to match your API endpoint
    return response.data;
  }
);

const driverSlice = createSlice({
  name: "drivers",
  initialState: {
    drivers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default driverSlice.reducer;
