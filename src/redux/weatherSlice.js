import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "861c4d91fdb7007f97781e94589ba06f"; 

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("City not found");
      }
      return rejectWithValue("An error occurred");
    }
  }
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("City not found");
      }
      return rejectWithValue("An error occurred");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    forecast: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
