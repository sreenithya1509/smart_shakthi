import { Crosshair, Navigation, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MapPanel } from '../components/MapPanel.jsx';
import { useSocket } from '../context/SocketContext.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { locationApi } from '../services/api.js';

export const LiveMap = () => {
  const { socket } = useSocket();
  const { getLocation, location } = useGeolocation();
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) return undefined;
    const timer = setInterval(async () => {
      try {
        const next = await getLocation();
        socket?.emit('liveLocationUpdate', next);
        socket?.emit('guardianTrackingUpdate', { location: next, status: 'watching' });
        await locationApi.update(next);
      } catch {
        setTracking(false);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [tracking, getLocation, socket]);

  const start = async () => {
    try {
      const next = await getLocation();
      await locationApi.update(next);
      socket?.emit('liveLocationUpdate', next);
      setTracking(true);
      toast.success('Guardian tracking started');
    } catch (error) {
      toast.error(error.message || 'Location unavailable');
    }
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-rose-600">Live Guardian Tracking</p>
          <h1 className="text-3xl font-extrabold">Realtime GPS Safety Map</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Share live movement, safe zones, nearby help points, and guardian route context.</p>
        </div>
        <button className="btn-primary" onClick={start}>
          <Crosshair size={18} /> {tracking ? 'Refresh Tracking' : 'Start Tracking'}
        </button>
      </section>
      <div className="card overflow-hidden">
        <MapPanel location={location} height="640px" />
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          [Radio, tracking ? 'Broadcasting' : 'Paused', 'Realtime location socket status'],
          [Navigation, 'Safe route', 'Emergency route assistance enabled'],
          [Crosshair, location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Awaiting GPS', 'Current precision coordinate']
        ].map(([Icon, value, label]) => (
          <div className="card p-5" key={label}>
            <Icon className="text-rose-600" />
            <p className="mt-4 text-xl font-extrabold">{value}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
