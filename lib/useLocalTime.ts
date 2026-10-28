import { useEffect, useState } from 'react';
import { personal } from '../data/personal';

const format = () =>
  new Date().toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: personal.timezone,
  });

/** Live Bengaluru time, whatever the visitor's timezone. */
export const useLocalTime = () => {
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};
