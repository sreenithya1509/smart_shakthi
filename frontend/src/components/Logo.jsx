import { ShieldCheck } from 'lucide-react';

export const Logo = ({ compact = false }) => (
  <div className="flex items-center gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-lg bg-rose-600 text-white shadow-lg shadow-rose-600/25">
      <ShieldCheck size={22} />
    </div>
    {!compact && (
      <div>
        <p className="text-base font-extrabold leading-5 tracking-normal">Smart Shakthi</p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Safety in realtime</p>
      </div>
    )}
  </div>
);
