import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from './store';
import { fetchWeatherData, isReadySelector } from './store/weatherSlice';
import { DropContainer } from './components/DropContainer';
import { Spinner } from './components/Spinner';
import './index.css';

const FETCH_WEATHER_INTERVAL_IN_MS = 10 * 60 * 1000;

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWeatherData());

    const timerId = setInterval(() => {
      dispatch(fetchWeatherData());
    }, FETCH_WEATHER_INTERVAL_IN_MS);

    return () => {
      clearInterval(timerId);
    };
  }, [dispatch]);

  const isReady = useSelector(isReadySelector);

  return (
    <div className="grid place-content-center">
      {isReady ? <DropContainer /> : <Spinner />}
    </div>
  );
};
