import { Bell, UserPlus, Calendar, RefreshCw, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'enrollment',
    icon: UserPlus,
    title: 'Nueva inscripción',
    description: 'Carlos Ruiz se inscribió en la clase del miércoles',
    time: new Date(Date.now() - 1000 * 60 * 30),
    color: 'text-success bg-success/10',
  },
  {
    id: 2,
    type: 'reschedule',
    icon: RefreshCw,
    title: 'Solicitud de cambio',
    description: 'María López solicita cambiar del lunes al martes',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    color: 'text-warning bg-warning/10',
  },
  {
    id: 3,
    type: 'confirmation',
    icon: CheckCircle,
    title: 'Clase confirmada',
    description: 'Ana Martínez confirmó asistencia para mañana',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
    color: 'text-primary bg-primary/10',
  },
  {
    id: 4,
    type: 'reminder',
    icon: Bell,
    title: 'Recordatorio enviado',
    description: 'Se envió recordatorio a 4 alumnos para clase de hoy',
    time: new Date(Date.now() - 1000 * 60 * 60 * 8),
    color: 'text-target-blue bg-target-blue/10',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="relative flex gap-4 pl-10">
                  {/* Icon */}
                  <div className={cn(
                    "absolute left-0 p-2 rounded-full",
                    activity.color
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(activity.time, { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
