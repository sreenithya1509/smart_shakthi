// Firebase Cloud Messaging can be wired here without changing controllers.
// Keep this dependency-free for portfolio demos where Firebase credentials are not configured.
export const sendPushNotification = async ({ tokens = [], title, body, data = {} }) => {
  if (!process.env.FCM_SERVER_KEY || tokens.length === 0) {
    return {
      provider: 'fcm',
      delivered: 0,
      skipped: true,
      reason: 'FCM_SERVER_KEY or device tokens not configured'
    };
  }

  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization: `key=${process.env.FCM_SERVER_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      registration_ids: tokens,
      notification: { title, body },
      data
    })
  });

  if (!response.ok) {
    throw new Error('Firebase Cloud Messaging request failed');
  }

  const payload = await response.json();
  return {
    provider: 'fcm',
    delivered: payload.success || 0,
    failed: payload.failure || 0
  };
};
