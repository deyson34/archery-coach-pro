import { useState } from 'react';
import { Plus, Search, Filter, Clock, Users, Trash2, Edit, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { WeeklyCalendar } from '@/components/calendar/WeeklyCalendar';
import { mockTimeSlots, weekDays } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Schedule() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState('1');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [capacity, setCapacity] = useState('4');
  const [isRecurring, setIsRecurring] = useState(true);
  const { toast } = useToast();

  const handleCreateSlot = () => {
    toast({
      title: 'Horario creado',
      description: `Nuevo bloque horario creado para ${weekDays[parseInt(selectedDay)]} ${startTime}-${endTime}`,
    });
    setShowCreateDialog(false);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Gestión de Horarios</h1>
          <p className="text-muted-foreground">
            Administra los bloques horarios de tus clases
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="h-4 w-4" />
              Nuevo Horario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Horario</DialogTitle>
              <DialogDescription>
                Define un nuevo bloque horario para tus clases
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Día de la semana</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.slice(1).map((day, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hora inicio</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Hora fin</Label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Capacidad máxima</Label>
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} alumnos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Horario recurrente</Label>
                  <p className="text-sm text-muted-foreground">
                    Se repite cada semana
                  </p>
                </div>
                <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
              <Button variant="hero" onClick={handleCreateSlot}>
                Crear Horario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar horarios..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>

      {/* Calendar View */}
      <WeeklyCalendar />

      {/* Time Slots List */}
      <Card>
        <CardHeader>
          <CardTitle>Horarios Configurados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTimeSlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm",
                    slot.isActive 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted-foreground/10 text-muted-foreground"
                  )}>
                    {weekDays[slot.dayOfWeek].slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">
                        {slot.startTime} - {slot.endTime}
                      </span>
                      {slot.isRecurring && (
                        <Badge variant="secondary" className="text-xs">
                          Semanal
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Users className="h-4 w-4" />
                      <span>Capacidad: {slot.capacity} alumnos</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={slot.isActive ? "default" : "outline"}>
                    {slot.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
