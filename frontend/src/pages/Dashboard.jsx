import { motion } from 'framer-motion';
import { AlertTriangle, Bot, MapPin, PhoneCall, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MapPanel } from '../components/MapPanel.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { activityApi, contactApi, locationApi, sosApi } from '../services/api.js';

export const Dashboard = () => {
  const { user } = useAuth();
  const { getLocation, location } = useGeolocation();
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [contactRes, sosRes, activityRes] = await Promise.all([
          contactApi.list(),
          sosApi.history(),
          activityApi.list()
        ]);
        setContacts(contactRes.data.contacts);
        setAlerts(sosRes.data.alerts);
        setActivity(activityRes.data.activity);
      } catch (error) {
        toast.error(error.message || 'Dashboard data failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeAlert = useMemo(() => alerts.find((alert) => alert.status === 'active'), [alerts]);

  const shareLocation = async () => {
    try {
      const next = await getLocation();
      await locationApi.update(next);
      toast.success('Live location shared with guardians');
    } catch (error) {
      toast.error(error.message || 'Unable to fetch location');
    }
  };

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-slate-950 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-rose-200">Safety command center</p>
            <h1 className="mt-2 text-3xl font-extrabold">Hi {user?.name?.split(' ')[0] || 'there'}, your safety network is ready.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Monitor live status, trigger emergency workflows, talk to the AI assistant, and keep guardians synced in realtime.
            </p>
          </div>
          <Link to="/sos" className="btn-primary bg-white text-rose-700 hover:bg-rose-50">
            <AlertTriangle size={18} /> Trigger SOS
          </Link>
        </div>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ShieldCheck} value={activeAlert ? 'Emergency' : 'Safe'} label="Current safety status" tone={activeAlert ? 'rose' : 'teal'} />
        <StatCard icon={Users} value={contacts.length} label="Trusted guardians" tone="sky" />
        <StatCard icon={AlertTriangle} value={alerts.length} label="SOS records" tone="rose" />
        <StatCard icon={Bot} value="AI Ready" label="Safety assistant" tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <div>
              <h2 className="font-extrabold">Live Location Widget</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Guardian tracking preview with safe-place markers.</p>
            </div>
            <button className="btn-secondary py-2" onClick={shareLocation}>
              <MapPin size={16} /> Share
            </button>
          </div>
          <MapPanel location={location} height="420px" />
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-extrabold">Quick Actions</h2>
            <div className="mt-4 grid gap-3">
              <Link to="/assistant" className="btn-secondary justify-start"><Bot size={18} /> Ask AI Assistant</Link>
              <Link to="/contacts" className="btn-secondary justify-start"><Users size={18} /> Manage Contacts</Link>
              <button className="btn-secondary justify-start" onClick={() => contactApi.alert({ message: 'Please check on me.' }).then(() => toast.success('Guardian alert sent'))}>
                <PhoneCall size={18} /> Alert Guardians
              </button>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="font-extrabold">Live Activity</h2>
            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="h-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              ) : activity.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700">No activity yet.</p>
              ) : (
                activity.slice(0, 5).map((item) => (
                  <div key={item._id} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
