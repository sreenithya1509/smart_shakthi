import { Save, UserRound } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    trustedCode: user?.trustedCode || '',
    safetyStatus: user?.safetyStatus || 'safe'
  });

  const save = async (event) => {
    event.preventDefault();
    try {
      await updateUser(form);
    } catch (error) {
      toast.error(error.message || 'Profile update failed');
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-bold text-rose-600">Account</p>
        <h1 className="text-3xl font-extrabold">Profile</h1>
      </section>
      <form onSubmit={save} className="card max-w-3xl p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
            <UserRound size={30} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">{user?.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="input" placeholder="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
          <input className="input" placeholder="Trusted code" value={form.trustedCode} onChange={(e) => setForm({ ...form, trustedCode: e.target.value })} />
          <select className="input" value={form.safetyStatus} onChange={(e) => setForm({ ...form, safetyStatus: e.target.value })}>
            <option value="safe">Safe</option>
            <option value="watching">Watching</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
        <button className="btn-primary mt-5"><Save size={18} /> Save profile</button>
      </form>
    </div>
  );
};
