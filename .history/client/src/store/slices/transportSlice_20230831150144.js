import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransports = createAsyncThunk(
  "transports/fetchTransports",
  async () => {
    const response = await axios.get("http://localhost:5000/transport"); // Change the URL to match your API endpoint
    console.log(response.data);
    return response.data;
  }
);

const transportSlice = createSlice({
  name: "transports",
  initialState: {
    transports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransports.fulfilled, (state, action) => {
        state.loading = false;
        state.transports = action.payload;
      })
      .addCase(fetchTransports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transportSlice.reducer;
