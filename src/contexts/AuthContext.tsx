import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<UserRole, User> = {
  teacher: {
    id: '1',
    email: 'juanjo@archery.com',
    name: 'Juanjo García',
    role: 'teacher',
    createdAt: new Date(),
  },
  student: {
    id: '2',
    email: 'alumno@test.com',
    name: 'María López',
    role: 'student',
    createdAt: new Date(),
  },
  admin: {
    id: '3',
    email: 'admin@archery.com',
    name: 'Administrador',
    role: 'admin',
    createdAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in production this would call the API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email.includes('teacher') || email.includes('juanjo')) {
      setUser(mockUsers.teacher);
    } else if (email.includes('admin')) {
      setUser(mockUsers.admin);
    } else {
      setUser(mockUsers.student);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        logout,
        switchRole 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
