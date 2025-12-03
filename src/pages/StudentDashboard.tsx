import { Calendar, Clock, Target, Bell, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { format, addDays, addHours } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const myClasses = [
  {
    id: 1,
    date: new Date(),
    time: '17:00',
    endTime: '18:00',
    status: 'confirmed',
    teacher: 'Juanjo García',
  },
  {
    id: 2,
    date: addDays(new Date(), 2),
    time: '18:00',
    endTime: '19:00',
    status: 'confirmed',
    teacher: 'Juanjo García',
  },
  {
    id: 3,
    date: addDays(new Date(), 5),
    time: '17:00',
    endTime: '18:00',
    status: 'pending',
    teacher: 'Juanjo García',
  },
];

const notifications = [
  {
    id: 1,
    type: 'reminder',
    title: 'Recordatorio de clase',
    message: 'Tu clase de hoy es a las 17:00',
    time: addHours(new Date(), -2),
    isRead: false,
  },
  {
    id: 2,
    type: 'confirmation',
    title: 'Clase confirmada',
    message: 'Tu inscripción para el miércoles ha sido confirmada',
    time: addDays(new Date(), -1),
    isRead: true,
  },
];

const statusColors = {
  confirmed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusLabels = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  cancelled: 'Cancelada',
};

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">
            ¡Hola, {user?.name?.split(' ')[0]}! 🎯
          </h1>
          <p className="text-muted-foreground">
            Aquí puedes ver y gestionar tus clases de tiro con arco
          </p>
        </div>
        <Button variant="hero">
          <Calendar className="h-4 w-4" />
          Reservar Clase
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold font-display">3</div>
                <div className="text-xs text-muted-foreground">Clases esta semana</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold font-display">12</div>
                <div className="text-xs text-muted-foreground">Clases completadas</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/50">
                <Target className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold font-display">Int.</div>
                <div className="text-xs text-muted-foreground">Tu nivel</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-target-blue/10">
                <Clock className="h-5 w-5 text-target-blue" />
              </div>
              <div>
                <div className="text-2xl font-bold font-display">18h</div>
                <div className="text-xs text-muted-foreground">Horas practicadas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Mis Próximas Clases
              </CardTitle>
              <Button variant="ghost" size="sm">Ver todas</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {myClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px] p-3 rounded-xl bg-primary/10">
                      <div className="text-xs font-medium text-primary uppercase">
                        {format(classItem.date, 'EEE', { locale: es })}
                      </div>
                      <div className="text-2xl font-bold font-display text-primary">
                        {format(classItem.date, 'd')}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Clase de Tiro con Arco</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {classItem.time} - {classItem.endTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Profesor: {classItem.teacher}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={cn(statusColors[classItem.status as keyof typeof statusColors])}
                    >
                      {statusLabels[classItem.status as keyof typeof statusLabels]}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Cambiar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-xl border transition-colors",
                  notification.isRead 
                    ? "bg-background border-border" 
                    : "bg-primary/5 border-primary/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    notification.type === 'reminder' 
                      ? "bg-warning/10 text-warning" 
                      : "bg-success/10 text-success"
                  )}>
                    {notification.type === 'reminder' ? (
                      <Bell className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(notification.time, "d MMM, HH:mm", { locale: es })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
