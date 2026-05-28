import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, MapPin, MessageSquare, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { sosApi } from '../services/api.js';

export const SOS = () => {
  const { getLocation, loading: geoLoading } = useGeolocation();
  const [alerts, setAlerts] = useState([]);
  const [roomMessages, setRoomMessages] = useState([
    { id: 'system-1', author: 'Smart Shakthi', text: 'Emergency room standby. Trigger SOS to broadcast location and update guardians.' }
  ]);
  const [roomText, setRoomText] = useState('');
  const [triggering, setTriggering] = useState(false);

  const loadHistory = async () => {
    const response = await sosApi.history();
    setAlerts(response.data.alerts);
  };

  useEffect(() => {
    loadHistory().catch(() => null);
  }, []);

  const trigger = async () => {
    setTriggering(true);
    try {
      const location = await getLocation();
      await sosApi.trigger({ location, message: 'Emergency SOS triggered from Smart Shakthi' });
      setRoomMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), author: 'System', text: `SOS broadcast with live location ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}.` }
      ]);
      toast.error('SOS broadcast sent to guardians');
      await loadHistory();
    } catch (error) {
      toast.error(error.message || 'SOS trigger failed');
    } finally {
      setTriggering(false);
    }
  };

  const sendRoomMessage = (event) => {
    event.preventDefault();
    if (!roomText.trim()) return;
    setRoomMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), author: 'You', text: roomText.trim() }
    ]);
    setRoomText('');
  };

  const resolve = async (id) => {
    await sosApi.resolve(id);
    toast.success('Emergency marked resolved');
    loadHistory();
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="card grid min-h-[560px] place-items-center p-6 text-center">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            onClick={trigger}
            disabled={triggering || geoLoading}
            className="relative grid h-64 w-64 place-items-center rounded-full bg-rose-600 text-white shadow-2xl shadow-rose-600/30 transition disabled:opacity-60"
          >
            <span className="absolute h-80 w-80 animate-pulseSoft rounded-full bg-rose-500" />
            <span className="relative">
              <AlertTriangle className="mx-auto mb-4" size={52} />
              <span className="block text-5xl font-extrabold">SOS</span>
              <span className="mt-2 block text-sm font-bold">{triggering || geoLoading ? 'Broadcasting...' : 'Tap for emergency'}</span>
            </span>
          </motion.button>
          <p className="mt-6 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Smart Shakthi fetches your live location, stores the emergency event, broadcasts it through Socket.IO, and updates your guardian feed.
          </p>
        </div>

        <div className="card p-5">
          <h1 className="text-xl font-extrabold">Emergency History</h1>
          <div className="mt-4 space-y-3">
            {alerts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700">No SOS alerts yet.</div>
            ) : (
              alerts.map((alert) => (
                <div key={alert._id} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold">{alert.status === 'active' ? 'Active emergency' : 'Resolved alert'}</p>
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">{alert.severity}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={14} /> {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                  </p>
                  {alert.status === 'active' && (
                    <button className="btn-secondary mt-3 w-full py-2" onClick={() => resolve(alert._id)}>
                      <CheckCircle2 size={16} /> Mark resolved
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
              <MessageSquare size={21} />
            </div>
            <div>
              <h2 className="font-extrabold">Live Emergency Communication Room</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">A focused realtime-style feed for guardian coordination during active alerts.</p>
            </div>
          </div>
          <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200 sm:inline-flex">
            <Radio size={14} /> Ready
          </span>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[1fr_280px]">
          <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
            {roomMessages.map((item) => (
              <div key={item.id} className="rounded-lg bg-white p-3 shadow-sm dark:bg-slate-900">
                <p className="text-xs font-bold uppercase text-slate-400">{item.author}</p>
                <p className="mt-1 text-sm leading-6">{item.text}</p>
              </div>
            ))}
            <form onSubmit={sendRoomMessage} className="flex gap-2">
              <input className="input" value={roomText} onChange={(event) => setRoomText(event.target.value)} placeholder="Send guardian status update..." />
              <button className="btn-primary px-4">Send</button>
            </form>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <h3 className="font-extrabold">Response Checklist</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p>1. Location captured through browser GPS.</p>
              <p>2. Emergency stored in MongoDB.</p>
              <p>3. Socket event broadcast to guardians.</p>
              <p>4. Activity feed updated for follow-up.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
