export const notificationSupport = {
  firebaseConfigured: Boolean(import.meta.env.VITE_FIREBASE_VAPID_KEY),
  vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || ''
};

export const requestBrowserNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return { supported: false, permission: 'unsupported' };
  }

  const permission = await Notification.requestPermission();
  return { supported: true, permission };
};

// Firebase Cloud Messaging can be connected here once Firebase app credentials are added.
// The UI and backend service are already structured so push tokens can be sent later.
export const registerPushToken = async () => ({
  registered: false,
  reason: notificationSupport.firebaseConfigured
    ? 'Firebase client package is ready to be wired'
    : 'VITE_FIREBASE_VAPID_KEY not configured'
});
