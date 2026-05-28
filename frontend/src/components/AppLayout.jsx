import { Outlet } from 'react-router-dom';
import { Bell, Radio, Wifi } from 'lucide-react';
import { Navbar } from './Navbar.jsx';
import { useSocket } from '../context/SocketContext.jsx';
import { FloatingActions } from './FloatingActions.jsx';

export const AppLayout = () => {
  const { notifications, onlineUsers } = useSocket();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <Outlet />
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <section className="card p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold">Realtime Command</h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <Wifi size={14} /> Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Online</p>
                  <p className="mt-1 text-2xl font-extrabold">{onlineUsers.length}</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-3 text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
                  <p className="text-xs">Alerts</p>
                  <p className="mt-1 text-2xl font-extrabold">{notifications.length}</p>
                </div>
              </div>
            </section>

            <section className="card p-4">
              <div className="mb-4 flex items-center gap-2">
                <Bell size={18} className="text-rose-600" />
                <h2 className="text-sm font-bold">Activity Feed</h2>
              </div>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    No realtime alerts yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                      <div className="flex items-start gap-2">
                        <Radio size={16} className="mt-0.5 text-rose-600" />
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </aside>
      </main>
      <FloatingActions />
    </div>
  );
};
