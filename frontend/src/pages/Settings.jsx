import { Bell, Cloud, Lock, MessageSquare, Smartphone } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { notificationSupport, requestBrowserNotificationPermission } from '../services/notifications.js';

const settings = [
  [Bell, 'Realtime notifications', 'Socket.IO alerts and toast notifications are enabled.'],
  [Smartphone, 'Firebase Cloud Messaging', 'Optional structure ready for push notification integration.'],
  [Lock, 'Secure API access', 'JWT protected routes and password hashing are active.'],
  [Cloud, 'Deployment ready', 'Vercel, Render/Railway, and MongoDB Atlas configuration included.'],
  [MessageSquare, 'AI assistant', 'OpenAI key support with fallback guidance for demos.']
];

export const Settings = () => {
  const [permission, setPermission] = useState(typeof Notification === 'undefined' ? 'unsupported' : Notification.permission);

  const enableNotifications = async () => {
    const result = await requestBrowserNotificationPermission();
    setPermission(result.permission);
    toast(result.permission === 'granted' ? 'Browser notifications enabled' : 'Notification permission not enabled');
  };

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-bold text-rose-600">Configuration</p>
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Production switches and integration readiness for Smart Shakthi.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {settings.map(([Icon, title, body]) => (
          <article key={title} className="card p-5">
            <Icon className="text-rose-600" />
            <h2 className="mt-4 font-extrabold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>
          </article>
        ))}
      </section>
      <section className="card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-extrabold">Push Notification Readiness</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Browser permission: {permission}. FCM key configured: {notificationSupport.firebaseConfigured ? 'yes' : 'no'}.
            </p>
          </div>
          <button className="btn-primary" onClick={enableNotifications}>
            <Bell size={18} /> Enable Notifications
          </button>
        </div>
      </section>
    </div>
  );
};
