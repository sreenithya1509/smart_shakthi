import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext.jsx';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) {
      setSocket(null);
      setOnlineUsers([]);
      return undefined;
    }

    const client = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    client.on('connect', () => setSocket(client));
    client.on('userOnline', (payload) => setOnlineUsers(payload.onlineUsers || []));
    client.on('userOffline', (payload) => setOnlineUsers(payload.onlineUsers || []));
    client.on('emergencyTriggered', (payload) => {
      const note = {
        id: crypto.randomUUID(),
        type: 'sos',
        title: 'Emergency SOS triggered',
        message: payload?.alert?.message || 'Realtime emergency alert received',
        createdAt: new Date().toISOString()
      };
      setNotifications((current) => [note, ...current].slice(0, 10));
      toast.error(note.title);
    });
    client.on('guardianAlert', (payload) => {
      const note = {
        id: crypto.randomUUID(),
        type: 'guardian',
        title: 'Guardian alert',
        message: payload?.message || 'Trusted contacts were notified',
        createdAt: new Date().toISOString()
      };
      setNotifications((current) => [note, ...current].slice(0, 10));
      toast(note.title);
    });

    return () => {
      client.disconnect();
      setSocket(null);
    };
  }, [token]);

  const value = useMemo(
    () => ({
      socket,
      onlineUsers,
      notifications,
      clearNotifications: () => setNotifications([])
    }),
    [socket, onlineUsers, notifications]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
