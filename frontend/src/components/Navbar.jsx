import { Bell, ChevronDown, LogOut, Menu, Settings, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useSocket } from '../context/SocketContext.jsx';
import { Logo } from './Logo.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

const publicLinks = [
  { label: 'Features', to: '/#features' },
  { label: 'Live Map', to: '/map' },
  { label: 'SOS', to: '/sos' }
];

const privateLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'SOS', to: '/sos' },
  { label: 'Contacts', to: '/contacts' },
  { label: 'Live Map', to: '/map' },
  { label: 'Assistant', to: '/assistant' },
  { label: 'Profile', to: '/profile' }
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { notifications } = useSocket();
  const navigate = useNavigate();
  const links = isAuthenticated ? privateLinks : publicLinks;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/86">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="transition hover:opacity-90" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                aria-label="Open notifications"
                title="Realtime notifications"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-extrabold text-white">
                    {notifications.length}
                  </span>
                )}
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
                    {user?.name?.charAt(0) || <UserRound size={16} />}
                  </span>
                  <span className="max-w-28 truncate">{user?.name || 'Profile'}</span>
                  <ChevronDown size={16} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    <Link className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" to="/profile" onClick={() => setProfileOpen(false)}>
                      <UserRound size={16} /> Profile
                    </Link>
                    <Link className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" to="/settings" onClick={() => setProfileOpen(false)}>
                      <Settings size={16} /> Settings
                    </Link>
                    <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30" onClick={handleLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-secondary py-2.5" to="/login">
                Login
              </Link>
              <Link className="btn-primary py-2.5" to="/signup">
                Get Started
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              aria-label="Open notifications"
            >
              <Bell size={18} />
              {notifications.length > 0 && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-rose-600" />}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="mt-2 grid gap-2">
                <Link className="btn-secondary justify-start" to="/settings" onClick={() => setOpen(false)}>
                  <Settings size={16} /> Settings
                </Link>
                <button type="button" className="btn-secondary justify-start" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link className="btn-secondary" to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link className="btn-primary" to="/signup" onClick={() => setOpen(false)}>
                  Start
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
