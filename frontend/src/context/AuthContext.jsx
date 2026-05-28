import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../services/api.js';
import { storage } from '../utils/storage.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());
  const [booting, setBooting] = useState(Boolean(storage.getToken()));

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setBooting(false);
        return;
      }

      try {
        const response = await authApi.me();
        setUser(response.data.user);
        storage.setUser(response.data.user);
      } catch {
        storage.clearToken();
        storage.clearUser();
        setToken(null);
        setUser(null);
      } finally {
        setBooting(false);
      }
    };

    loadProfile();
  }, [token]);

  const commitSession = (payload) => {
    storage.setToken(payload.token);
    storage.setUser(payload.user);
    setToken(payload.token);
    setUser(payload.user);
  };

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    commitSession(response.data);
    toast.success('Welcome back to Smart Shakthi');
  };

  const signup = async (payload) => {
    const response = await authApi.signup(payload);
    commitSession(response.data);
    toast.success('Your safety workspace is ready');
  };

  const logout = async () => {
    try {
      if (token) await authApi.logout();
    } finally {
      storage.clearToken();
      storage.clearUser();
      setToken(null);
      setUser(null);
      toast.success('Signed out safely');
    }
  };

  const updateUser = async (payload) => {
    const response = await authApi.updateProfile(payload);
    setUser(response.data.user);
    storage.setUser(response.data.user);
    toast.success('Profile updated');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      booting,
      isAuthenticated: Boolean(token),
      login,
      signup,
      logout,
      updateUser
    }),
    [user, token, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
