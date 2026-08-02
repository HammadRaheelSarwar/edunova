import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edunova_user');
    return saved ? JSON.parse(saved) : {
      id: 'demo-admin',
      name: 'Hammad Raheel',
      email: 'admin@edunova.edu',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('edunova_token') || 'demo_jwt_token_2026');

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('edunova_user', JSON.stringify(userData));
    localStorage.setItem('edunova_token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('edunova_user');
    localStorage.removeItem('edunova_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
