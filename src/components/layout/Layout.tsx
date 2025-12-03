import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && <Navbar />}
      <main className={isAuthenticated ? "container py-6" : ""}>
        {children}
      </main>
    </div>
  );
}
