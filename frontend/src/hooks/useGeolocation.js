import { useCallback, useState } from 'react';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const getLocation = useCallback(() => {
    setLoading(true);
    setError('');

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = 'Geolocation is not supported by this browser';
        setError(message);
        setLoading(false);
        reject(new Error(message));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nextLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            speed: position.coords.speed,
            heading: position.coords.heading
          };
          setLocation(nextLocation);
          setLoading(false);
          resolve(nextLocation);
        },
        (geoError) => {
          setError(geoError.message);
          setLoading(false);
          reject(geoError);
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 10000 }
      );
    });
  }, []);

  return { getLocation, location, loading, error };
};
