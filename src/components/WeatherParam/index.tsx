import { getWindDirection } from '../../utils/getWindDirection';

interface IWeatherParamProps {
  windSpeed: number;
  precipitation: number;
  relativeHumidity: number;
  windDirection: number;
  surfacePressure: number;
}

export const WeatherParam: React.FC<IWeatherParamProps> = ({
  windSpeed,
  precipitation,
  relativeHumidity,
  windDirection,
  surfacePressure,
}) => {
  return (
    <div className="grid grid-cols-13 place-items-center whitespace-nowrap">
      <div className="align-middle col-span-4">
        <img src="./wind-24.png" alt="ветер" className="inline size-4" />
        <span className="ml-1">
          {getWindDirection(windDirection)} {Math.round(windSpeed)} м/с
        </span>
      </div>
      <div className="align-middle col-span-3">
        <img
          src="./precipitation-24.png"
          alt="осадки"
          className="inline size-4"
        />
        <span className="ml-1">{Math.round(precipitation * 100)} %</span>
      </div>
      <div className="align-middle col-span-3">
        <img
          src="./relativeHumidity-24.png"
          alt="влажность"
          className="inline size-4"
        />
        <span className="text-nowrap ml-1">
          {Math.round(relativeHumidity)} %
        </span>
      </div>
      <div className="align-middle col-span-3">
        <img src="./pressure-24.png" alt="давление" className="inline size-4" />
        <span className="ml-1">{Math.round(surfacePressure)}</span>
      </div>
    </div>
  );
};
