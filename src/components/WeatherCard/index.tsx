import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { weatherDataByIndexCreateSelector } from '../../store/weatherSlice';
import { WeatherImage } from '../WeatherImage';
import { WeatherParam } from '../WeatherParam';
import { Time } from '../Times';
import type { IStore } from '../../store';
import { useMemo } from 'react';

interface IweatherCard {
  index: number;
}
export const WeatherCard: React.FC<IweatherCard> = ({ index }) => {
  const weatherDataByIndexSelector = useMemo(
    () => weatherDataByIndexCreateSelector(),
    []
  );
  const weatherData = useSelector((state: IStore) =>
    weatherDataByIndexSelector(state, index)
  );
  if (!weatherData) return null;

  return (
    <div
      className="grid grid-cols-1 place-items-center py-8 px-1 gap-4 w-90 h-auto text-sm cursor-pointer
     sm:w-70 sm:gap-2 sm:text-xs text-zinc-50 bg-white/10 rounded-2xl border border-solid border-white/50"
    >
      <div className="grid grid-cols-1 place-items-center gap-1">
        <span>{moment().tz(weatherData.timeZone).format('D MMMM')}</span>
        <Time timeZone={weatherData.timeZone} />
      </div>
      <span className="text-lg text-white">{weatherData.city}</span>
      <div className="grid grid-cols-1 place-items-center gap-1">
        <WeatherImage
          rain={weatherData.rain}
          showers={weatherData.showers}
          snowfall={weatherData.snowfall}
          cloud={weatherData.cloud_cover}
        />
        <span className="text-xs uppercase text-zinc-200">
          {weatherData.country}
        </span>
      </div>
      <div className="grid grid-cols-1 place-items-center gap-4">
        <div className="align-middle">
          <span>
            {weatherData.temperature > 0 ? '+' : ''}
            {Math.round(weatherData.temperature)}&deg;C
          </span>
          <span className="ml-4">
            Ощущается как&nbsp;
            {weatherData.apparentTemperature > 0 ? '+' : ''}
            {Math.round(weatherData.apparentTemperature)}&deg;C
          </span>
        </div>
        <WeatherParam
          windSpeed={weatherData.windSpeed}
          precipitation={weatherData.precipitation}
          relativeHumidity={weatherData.relativeHumidity}
          surfacePressure={weatherData.surface_pressure}
          windDirection={weatherData.windDirection}
        />
      </div>
    </div>
  );
};
