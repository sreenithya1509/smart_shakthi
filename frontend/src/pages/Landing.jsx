import { ArrowRight, BellRing, Map, RadioTower, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx';

const features = [
  {
    icon: BellRing,
    title: 'One-tap SOS',
    body: 'Trigger emergency alerts with live coordinates, severity, and instant guardian notifications.'
  },
  {
    icon: Map,
    title: 'Live guardian map',
    body: 'Share precise location updates, safe zones, nearby help points, and route-aware tracking.'
  },
  {
    icon: RadioTower,
    title: 'Realtime response',
    body: 'Socket.IO-powered presence, alerts, live feed updates, and emergency status transitions.'
  }
];

export const Landing = () => (
  <div className="page-shell overflow-hidden">
    <Navbar />
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(251,113,133,.22),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(20,184,166,.18),transparent_24%),linear-gradient(180deg,#fff,rgba(248,250,252,.95))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(251,113,133,.16),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(20,184,166,.12),transparent_24%),linear-gradient(180deg,#020617,#0f172a)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-20 lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-3 py-1.5 text-sm font-bold text-rose-700 shadow-sm dark:border-rose-900 dark:bg-slate-900/70 dark:text-rose-200">
            <Sparkles size={16} /> AI-powered emergency response
          </div>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Smart Shakthi — AI-Powered Women Safety Platform
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Realtime emergency response, intelligent safety assistance, and live guardian tracking in one secure platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary">
              Start Safety Workspace <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary">
              Open Dashboard
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <div className="glass-panel absolute inset-x-4 top-6 rounded-lg p-5 sm:inset-x-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Guardian Command</p>
                <p className="mt-1 text-xl font-extrabold">Emergency watch active</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
                Online
              </span>
            </div>
            <div className="mt-5 rounded-lg bg-slate-950 p-4 text-white">
              <div className="mb-4 flex items-center gap-3">
                <div className="relative grid h-12 w-12 place-items-center rounded-full bg-rose-600">
                  <span className="absolute h-16 w-16 animate-pulseSoft rounded-full bg-rose-500" />
                  <ShieldCheck className="relative" size={24} />
                </div>
                <div>
                  <p className="font-bold">SOS route locked</p>
                  <p className="text-sm text-slate-300">3 guardians notified • 12 sec ago</p>
                </div>
              </div>
              <div className="h-44 rounded-lg bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:28px_28px]">
                <div className="relative h-full">
                  <span className="absolute left-[22%] top-[58%] h-4 w-4 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50" />
                  <span className="absolute left-[64%] top-[32%] h-4 w-4 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />
                  <span className="absolute left-[28%] top-[61%] h-1 w-[44%] -rotate-[24deg] rounded-full bg-rose-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel absolute bottom-4 left-0 right-0 mx-auto max-w-sm rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="text-teal-600" />
              <div>
                <p className="font-bold">Trusted network</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Family, friends, and responders stay synchronized.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="card p-6">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
              <feature.icon size={24} />
            </div>
            <h2 className="text-lg font-extrabold">{feature.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-lg bg-slate-950 p-6 text-white md:grid-cols-4 lg:p-8">
        {[
          ['24/7', 'Realtime safety monitoring'],
          ['<3s', 'Emergency event dispatch'],
          ['5+', 'Guardian priority levels'],
          ['100%', 'Responsive mobile workflows']
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-3xl font-extrabold">{value}</p>
            <p className="mt-2 text-sm text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </section>

    <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      Smart Shakthi • AI-powered safety, built for fast response and trusted care.
    </footer>
  </div>
);
