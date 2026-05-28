import { Edit3, PhoneCall, Plus, Search, Star, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { contactApi } from '../services/api.js';

const emptyForm = { name: '', phone: '', email: '', relationship: 'Guardian', priority: 1, favorite: false, alertEnabled: true };

export const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    const response = await contactApi.list();
    setContacts(response.data.contacts);
  };

  useEffect(() => {
    load().catch((error) => toast.error(error.message || 'Could not load contacts'));
  }, []);

  const filtered = useMemo(
    () => contacts.filter((contact) => `${contact.name} ${contact.phone} ${contact.relationship}`.toLowerCase().includes(query.toLowerCase())),
    [contacts, query]
  );

  const openModal = (contact = null) => {
    setEditing(contact);
    setForm(contact || emptyForm);
    setModalOpen(true);
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      if (editing) await contactApi.update(editing._id, form);
      else await contactApi.create(form);
      toast.success(editing ? 'Contact updated' : 'Contact added');
      setModalOpen(false);
      await load();
    } catch (error) {
      toast.error(error.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    await contactApi.remove(id);
    toast.success('Contact removed');
    load();
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-rose-600">Trusted network</p>
          <h1 className="text-3xl font-extrabold">Emergency Contacts</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage guardians who receive alerts and tracking updates.</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={18} /> Add Contact
        </button>
      </section>

      <div className="card flex items-center gap-3 p-3">
        <Search size={18} className="text-slate-400" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search guardians..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <Star className="mx-auto text-rose-500" size={36} />
          <h2 className="mt-4 text-xl font-extrabold">No guardians found</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Add family, friends, or responders to your emergency network.</p>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((contact) => (
            <article key={contact._id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-rose-50 text-lg font-extrabold text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-extrabold">{contact.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{contact.relationship}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {contact.favorite && <Star className="fill-amber-400 text-amber-400" size={17} />}
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950/40 dark:text-teal-200">P{contact.priority}</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold">{contact.phone}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{contact.email || 'No email added'}</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <a className="btn-secondary py-2" href={`tel:${contact.phone}`} title="Call guardian"><PhoneCall size={16} /></a>
                <button className="btn-secondary py-2" onClick={() => openModal(contact)} title="Edit contact"><Edit3 size={16} /></button>
                <button className="btn-secondary py-2 text-rose-600" onClick={() => remove(contact._id)} title="Delete contact"><Trash2 size={16} /></button>
              </div>
            </article>
          ))}
        </section>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur">
          <form onSubmit={save} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-soft dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">{editing ? 'Edit guardian' : 'Add guardian'}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input" placeholder="Relationship" value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} />
              <input className="input" type="number" min="1" max="5" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} />
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700">
                <input type="checkbox" checked={form.favorite} onChange={(e) => setForm({ ...form, favorite: e.target.checked })} />
                Favorite guardian
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700">
                <input type="checkbox" checked={form.alertEnabled} onChange={(e) => setForm({ ...form, alertEnabled: e.target.checked })} />
                Alerts enabled
              </label>
            </div>
            <button className="btn-primary mt-5 w-full">{editing ? 'Save changes' : 'Create contact'}</button>
          </form>
        </div>
      )}
    </div>
  );
};
