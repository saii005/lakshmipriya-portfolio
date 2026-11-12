import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('priya_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('priya_token');
      const storedUser = localStorage.getItem('priya_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (e) {
          localStorage.removeItem('priya_token');
          localStorage.removeItem('priya_user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data?.success && res.data.user) {
      const { token: receivedToken, ...userData } = res.data.user;
      localStorage.setItem('priya_token', receivedToken);
      localStorage.setItem('priya_user', JSON.stringify(userData));
      setUser(userData);
      setToken(receivedToken);
      return res.data;
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('priya_token');
    localStorage.removeItem('priya_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
