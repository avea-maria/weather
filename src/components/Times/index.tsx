import moment from 'moment-timezone';
import { useEffect, useState } from 'react';

interface ITimeProps {
  timeZone: string;
}

export const Time: React.FC<ITimeProps> = ({ timeZone }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(moment().tz(timeZone).format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeZone]);

  return <span className="text-lg">{time}</span>;
};
