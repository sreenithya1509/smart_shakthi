import { motion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  Bot,
  CheckCircle2,
  Map,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
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
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-3 py-1.5 text-sm font-bold text-rose-700 shadow-sm dark:border-rose-900 dark:bg-slate-900/70 dark:text-rose-200">
            <Sparkles size={16} /> AI-powered emergency response
          </div>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Smart Shakthi - AI-Powered Women Safety Platform
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Realtime emergency response, intelligent guardian tracking, and AI-powered safety assistance in one secure platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary">
              Start Safety Workspace <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary">
              Open Dashboard
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative min-h-[420px]">
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
                  <p className="text-sm text-slate-300">3 guardians notified - 12 sec ago</p>
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
        </motion.div>
      </div>
    </section>

    <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.08 }}
            className="card p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
              <feature.icon size={24} />
            </div>
            <h2 className="text-lg font-extrabold">{feature.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.body}</p>
          </motion.article>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold text-rose-600">Dashboard preview</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-normal">A realtime command center, not a CRUD screen.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Smart Shakthi blends active SOS state, guardian presence, live GPS telemetry, AI suggestions, and emergency communications into a calm operational view.
          </p>
          <div className="mt-6 grid gap-3">
            {['Guardian presence and alert feed', 'AI safety assistant with quick actions', 'Live map and route-aware emergency context'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold">
                <CheckCircle2 className="text-teal-600" size={18} /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <div className="rounded-lg bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Safety score</p>
                  <p className="mt-1 text-4xl font-extrabold">92</p>
                </div>
                <ShieldCheck className="text-teal-300" size={38} />
              </div>
              <div className="mt-5 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[92%] rounded-full bg-teal-400" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-lg bg-white/10 p-3">GPS live</div>
                <div className="rounded-lg bg-white/10 p-3">3 guardians</div>
                <div className="rounded-lg bg-white/10 p-3">AI ready</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-rose-50 p-4 text-rose-800 dark:bg-rose-950/35 dark:text-rose-100">
                <BellRing size={20} />
                <p className="mt-2 text-sm font-extrabold">Emergency feed</p>
                <p className="mt-1 text-xs">SOS event stream ready.</p>
              </div>
              <div className="rounded-lg bg-violet-50 p-4 text-violet-800 dark:bg-violet-950/35 dark:text-violet-100">
                <Bot size={20} />
                <p className="mt-2 text-sm font-extrabold">AI guidance</p>
                <p className="mt-1 text-xs">Suggested next steps and calm support.</p>
              </div>
            </div>
          </div>
        </div>
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
      Smart Shakthi - AI-powered safety, built for fast response and trusted care.
    </footer>
  </div>
);
