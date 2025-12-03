import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Alumnos Activos',
    value: '24',
    change: '+3 este mes',
    icon: Users,
    trend: 'up',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Clases Esta Semana',
    value: '18',
    change: '6 disponibles',
    icon: Calendar,
    trend: 'neutral',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    title: 'Ocupación Media',
    value: '78%',
    change: '+5% vs anterior',
    icon: TrendingUp,
    trend: 'up',
    color: 'text-accent-foreground',
    bgColor: 'bg-accent/50',
  },
  {
    title: 'Horas Impartidas',
    value: '142h',
    change: 'Este mes',
    icon: Clock,
    trend: 'neutral',
    color: 'text-target-blue',
    bgColor: 'bg-target-blue/10',
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-display">{stat.value}</div>
              <p className={cn(
                "text-xs mt-1",
                stat.trend === 'up' ? "text-success" : "text-muted-foreground"
              )}>
                {stat.change}
              </p>
            </CardContent>
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1",
                stat.bgColor
              )}
            />
          </Card>
        );
      })}
    </div>
  );
}
