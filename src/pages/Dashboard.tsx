import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { WeeklyCalendar } from '@/components/calendar/WeeklyCalendar';
import { UpcomingClasses } from '@/components/dashboard/UpcomingClasses';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">
            ¡Hola, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Aquí tienes un resumen de tu academia
          </p>
        </div>
        <Button variant="hero">
          <Plus className="h-4 w-4" />
          Nueva Clase
        </Button>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <WeeklyCalendar />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <UpcomingClasses />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
