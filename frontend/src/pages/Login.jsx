import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1fr_520px]">
      <section className="hidden bg-[radial-gradient(circle_at_25%_25%,rgba(244,63,94,.35),transparent_28%),radial-gradient(circle_at_78%_62%,rgba(20,184,166,.22),transparent_25%),#020617] p-10 lg:block">
        <Logo />
        <div className="mt-28 max-w-xl">
          <ShieldCheck className="mb-6 text-rose-300" size={44} />
          <h1 className="text-5xl font-extrabold leading-tight">Realtime safety, ready before the emergency.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Sign in to manage guardians, live tracking, alerts, and AI-powered guidance from one secure command center.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10">
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 text-slate-950 shadow-soft dark:bg-slate-900 dark:text-white"
        >
          <Link to="/" className="mb-8 inline-block lg:hidden">
            <Logo />
          </Link>
          <h2 className="text-2xl font-extrabold">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Continue your protected Smart Shakthi session.</p>
          <div className="mt-6 space-y-4">
            <input className="input" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn-primary mt-6 w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Login securely'}
          </button>
          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            New here? <Link className="font-bold text-rose-600" to="/signup">Create account</Link>
          </p>
        </motion.form>
      </section>
    </div>
  );
};
