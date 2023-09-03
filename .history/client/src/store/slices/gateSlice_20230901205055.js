import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for fetching gates
export const fetchGates = createAsyncThunk("gates/fetchGates", async () => {
  try {
    const response = await axios.get("http://localhost:5000/gate"); // Change the URL to match your API endpoint for fetching gates
    return response.data;
  } catch (error) {
    throw error;
  }
});

const gateSlice = createSlice({
  name: "gates",
  initialState: {
    gates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGates.fulfilled, (state, action) => {
        state.loading = false;
        state.gates = action.payload;
      })
      .addCase(fetchGates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gateSlice.reducer;
