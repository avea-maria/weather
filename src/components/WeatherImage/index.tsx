interface IWeatherImageProps {
  rain: number;
  snowfall: number;
  showers: number;
  cloud: number;
}

export const WeatherImage: React.FC<IWeatherImageProps> = ({
  rain,
  snowfall,
  showers,
  cloud,
}) => {
  if (rain) return <img src="./rain.png" alt="дождь" className="size-20" />;
  if (snowfall)
    return <img src="./snow.png" alt="снегопад" className="size-20" />;
  if (showers)
    return <img src="./showers.png" alt="ливень" className="size-20" />;
  if (cloud)
    return <img src="./cloudy.png" alt="облачно" className="size-20" />;

  return <img src="./sunny.png" alt="ясно" className="size-20" />;
};
