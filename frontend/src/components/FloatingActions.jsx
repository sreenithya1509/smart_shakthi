import { Bot, LifeBuoy, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FloatingActions = () => (
  <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
    <Link
      to="/assistant"
      className="grid h-12 w-12 place-items-center rounded-full bg-violet-600 text-white shadow-2xl shadow-violet-600/25 transition hover:-translate-y-0.5"
      aria-label="Open AI safety assistant"
      title="AI safety assistant"
    >
      <Bot size={22} />
    </Link>
    <Link
      to="/map"
      className="grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/20 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
      aria-label="Open live guardian map"
      title="Live guardian map"
    >
      <MapPin size={22} />
    </Link>
    <Link
      to="/sos"
      className="grid h-14 w-14 place-items-center rounded-full bg-rose-600 text-white shadow-2xl shadow-rose-600/35 transition hover:-translate-y-0.5"
      aria-label="Open emergency SOS"
      title="Emergency SOS"
    >
      <LifeBuoy size={25} />
    </Link>
  </div>
);
