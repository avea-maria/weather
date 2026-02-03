import { configureStore } from '@reduxjs/toolkit';
import { weatherReducer, type IWeatherReducerState } from './weatherSlice';

export interface IStore {
  weatherReducer: IWeatherReducerState;
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore<IStore>({
  reducer: {
    weatherReducer,
  },
});
