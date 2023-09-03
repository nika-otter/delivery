import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransportSchedules = createAsyncThunk(
  "transportSchedules/fetchTransportSchedules",
  async () => {
    const response = await axios.get("http://localhost:5000/transportSchedule"); // Change the URL to match your API endpoint
    return response.data;
  }
);

export const addTransportSchedule = createAsyncThunk(
  "transportSchedules/addTransportSchedule",
  async (newScheduleData, { rejectWithValue }) => {
    try {
      console.log(newScheduleData);
      const response = await axios.post(
        "http://localhost:5000/transportSchedule",
        newScheduleData
      ); // Change the URL to match your API endpoint for adding schedules
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle the error and pass it to the rejection action
    }
  }
);

const transportScheduleSlice = createSlice({
  name: "transportSchedules",
  initialState: {
    transportSchedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransportSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransportSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.transportSchedules = action.payload;
      })
      .addCase(fetchTransportSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transportScheduleSlice.reducer;
