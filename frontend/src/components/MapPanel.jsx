import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api';
import { Crosshair, MapPin } from 'lucide-react';

const fallbackCenter = { lat: 12.9716, lng: 77.5946 };

const safePlaces = [
  { name: 'Police Help Desk', lat: 12.9766, lng: 77.5993 },
  { name: '24x7 Clinic', lat: 12.9688, lng: 77.5898 },
  { name: 'Metro Safe Point', lat: 12.974, lng: 77.605 }
];

export const MapPanel = ({ location, height = '520px' }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const center = location || fallbackCenter;
  const path = location ? [location, safePlaces[0]] : [fallbackCenter, safePlaces[0]];

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
        style={{ height }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,.16)_1px,transparent_1px),linear-gradient(rgba(148,163,184,.16)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute left-6 top-6 rounded-lg bg-white/90 p-4 shadow-soft dark:bg-slate-950/90">
          <div className="flex items-center gap-2 text-sm font-bold">
            <MapPin size={18} className="text-rose-600" /> Google Maps key needed
          </div>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Add `VITE_GOOGLE_MAPS_API_KEY` to render the production map. This preview keeps layout and live controls ready.
          </p>
        </div>
        <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose-600 text-white shadow-2xl shadow-rose-600/30">
          <Crosshair size={28} />
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" style={{ height }} />;
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800" style={{ height }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'simplified' }] }
          ]
        }}
      >
        <MarkerF position={center} title="Your live location" />
        {safePlaces.map((place) => (
          <MarkerF key={place.name} position={{ lat: place.lat, lng: place.lng }} title={place.name} />
        ))}
        <PolylineF
          path={path}
          options={{
            strokeColor: '#e11d48',
            strokeOpacity: 0.86,
            strokeWeight: 4
          }}
        />
      </GoogleMap>
      <div className="absolute left-4 top-4 rounded-lg bg-white/92 p-3 shadow-soft backdrop-blur dark:bg-slate-950/90">
        <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Live tracking</p>
        <p className="mt-1 text-sm font-extrabold">Guardian route active</p>
      </div>
    </div>
  );
};
