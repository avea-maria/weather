import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { fetchWeatherApi } from 'openmeteo';
import type { IStore } from '.';
import { countries } from '../types';

type TGetWeatherData = IGetWeatherData | null;

export interface IWeatherReducerState {
  isReady: boolean;
  date: number;
  data: TGetWeatherData[];
}

const initialState: IWeatherReducerState = {
  isReady: false,
  date: Date.now(),
  data: [],
};

interface IGetWeatherData {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  rain: number;
  precipitation: number;
  showers: number;
  snowfall: number;
  surface_pressure: number;
  cloud_cover: number;
}

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (_, { rejectWithValue }) => {
    try {
      const params = {
        latitude: countries.map((item) => item.latitude),
        longitude: countries.map((item) => item.longitude),
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'wind_speed_10m',
          'wind_direction_10m',
          'rain',
          'precipitation',
          'showers',
          'snowfall',
          'surface_pressure',
          'cloud_cover',
        ],
        timeformat: 'unixtime',
        wind_speed_unit: 'ms',
      };
      const url = 'https://api.open-meteo.com/v1/forecast';
      const responses = await fetchWeatherApi(url, params);

      return responses.map((response) => {
        const current = response.current();
        if (!current) return null;

        return {
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          apparent_temperature: current.variables(2)!.value(),
          wind_speed_10m: current.variables(3)!.value(),
          wind_direction_10m: current.variables(4)!.value(),
          rain: current.variables(5)!.value(),
          precipitation: current.variables(6)!.value(),
          showers: current.variables(7)!.value(),
          snowfall: current.variables(8)!.value(),
          surface_pressure: current.variables(9)!.value(),
          cloud_cover: current.variables(10)!.value(),
        };
      });
    } catch (error) {
      return rejectWithValue(String(error));
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchWeatherData.fulfilled,
      (state, action: PayloadAction<TGetWeatherData[]>) => {
        state.isReady = true;
        state.data = action.payload;
      },
    );
  },
});

export const isReadySelector = (state: IStore): boolean => {
  return state.weatherReducer.isReady;
};

const weatherDataSelector = (state: IStore) => state.weatherReducer.data;

const weatherDateSelector = (state: IStore) => state.weatherReducer.date;

export const weatherDataByIndexCreateSelector = () =>
  createSelector(
    [
      weatherDataSelector,
      weatherDateSelector,
      (_: IStore, index: number) => index,
    ],
    (weatherDatas, weatherDate, index) => {
      const weatherData = weatherDatas[index];
      if (!weatherData) return null;

      return {
        timeZone: countries[index].timeZone,
        city: countries[index].city,
        country: countries[index].country,
        date: weatherDate,
        rain: weatherData.rain,
        showers: weatherData.showers,
        snowfall: weatherData.snowfall,
        temperature: weatherData.temperature_2m,
        precipitation: weatherData.precipitation,
        relativeHumidity: weatherData.relative_humidity_2m,
        apparentTemperature: weatherData.apparent_temperature,
        windSpeed: weatherData.wind_speed_10m,
        windDirection: weatherData.wind_direction_10m,
        surface_pressure: weatherData.surface_pressure,
        cloud_cover: weatherData.cloud_cover,
      };
    },
  );

export const weatherDataSelector2 = (index: number) => (state: IStore) => {
  const weatherData = state.weatherReducer.data[index];
  if (!weatherData) return null;

  return {
    timeZone: countries[index].timeZone,
    city: countries[index].city,
    country: countries[index].country,
    date: state.weatherReducer.date,
    rain: weatherData.rain,
    showers: weatherData.showers,
    snowfall: weatherData.snowfall,
    temperature: weatherData.temperature_2m,
    precipitation: weatherData.precipitation,
    relativeHumidity: weatherData.relative_humidity_2m,
    apparentTemperature: weatherData.apparent_temperature,
    windSpeed: weatherData.wind_speed_10m,
    windDirection: weatherData.wind_direction_10m,
    surface_pressure: weatherData.surface_pressure,
    cloud_cover: weatherData.cloud_cover,
  };
};

export const weatherReducer = weatherSlice.reducer;
