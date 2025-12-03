import { Clock, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, addHours } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const upcomingClasses = [
  {
    id: 1,
    time: new Date(),
    duration: 60,
    students: ['María L.', 'Carlos R.', 'Ana M.'],
    capacity: 4,
    level: 'intermediate',
  },
  {
    id: 2,
    time: addHours(new Date(), 3),
    duration: 60,
    students: ['Pedro S.', 'Lucía G.'],
    capacity: 4,
    level: 'beginner',
  },
  {
    id: 3,
    time: addHours(new Date(), 24),
    duration: 60,
    students: ['Juan M.', 'Elena P.', 'David R.', 'Sofia T.'],
    capacity: 4,
    level: 'advanced',
  },
];

const levelColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-accent/50 text-accent-foreground border-accent/30',
  advanced: 'bg-primary/10 text-primary border-primary/20',
};

const levelLabels = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export function UpcomingClasses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Próximas Clases
        </CardTitle>
        <Button variant="ghost" size="sm">Ver todas</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingClasses.map((classItem) => {
          const isFull = classItem.students.length >= classItem.capacity;
          return (
            <div
              key={classItem.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              {/* Time */}
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-bold font-display">
                  {format(classItem.time, 'HH:mm')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(classItem.time, 'EEE d', { locale: es })}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-border" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", levelColors[classItem.level])}
                  >
                    {levelLabels[classItem.level]}
                  </Badge>
                  {isFull && (
                    <Badge variant="destructive" className="text-xs">
                      Completo
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="truncate">
                    {classItem.students.join(', ')}
                  </span>
                </div>
              </div>

              {/* Capacity */}
              <div className="text-right">
                <div className={cn(
                  "text-lg font-bold",
                  isFull ? "text-primary" : "text-success"
                )}>
                  {classItem.students.length}/{classItem.capacity}
                </div>
                <div className="text-xs text-muted-foreground">plazas</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
