import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(form);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white lg:grid-cols-[540px_1fr]">
      <section className="flex items-center justify-center px-4 py-10">
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <Link to="/" className="mb-8 inline-block">
            <Logo />
          </Link>
          <h2 className="text-2xl font-extrabold">Create your safety workspace</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Set up realtime SOS, guardians, and AI assistance.</p>
          <div className="mt-6 space-y-4">
            <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="input" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="input" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn-primary mt-6 w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            Already protected? <Link className="font-bold text-rose-600" to="/login">Login</Link>
          </p>
        </motion.form>
      </section>
      <section className="hidden bg-[radial-gradient(circle_at_30%_20%,rgba(225,29,72,.25),transparent_28%),radial-gradient(circle_at_72%_72%,rgba(14,165,233,.2),transparent_25%),#020617] p-10 text-white lg:block">
        <div className="mt-28 max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-tight">A polished emergency platform for the moments that matter.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Smart Shakthi combines live GPS, realtime guardian communication, SOS workflows, and AI guidance in a recruiter-ready full-stack product.
          </p>
        </div>
      </section>
    </div>
  );
};
