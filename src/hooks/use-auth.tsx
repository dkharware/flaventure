'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
});

export function AuthProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AuthContextType;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
