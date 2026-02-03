import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { type AppDispatch } from './store';
import { fetchWeatherData, isReadySelector } from './store/weatherSlice';
import { DropContainer } from './components/DropContainer';
import { Spinner } from './components/Spinner';

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
      {isReady ? (
        <DropContainer />
      ) : (
        <>
          <Spinner />
        </>
      )}
    </div>
  );
};
