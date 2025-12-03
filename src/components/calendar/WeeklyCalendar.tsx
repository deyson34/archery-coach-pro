import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  addDays, 
  startOfWeek, 
  format, 
  isSameDay,
  setHours,
  setMinutes,
  addWeeks,
  subWeeks 
} from 'date-fns';
import { es } from 'date-fns/locale';
import { mockTimeSlots, weekDaysShort } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ClassSlot {
  id: string;
  time: string;
  endTime: string;
  enrolled: number;
  capacity: number;
  students: string[];
}

interface WeeklyCalendarProps {
  onSlotClick?: (slot: ClassSlot, date: Date) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 - 19:00

export function WeeklyCalendar({ onSlotClick }: WeeklyCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const getSlotForDay = (dayIndex: number, hour: number) => {
    const slot = mockTimeSlots.find(s => {
      const [slotHour] = s.startTime.split(':').map(Number);
      return s.dayOfWeek === dayIndex && slotHour === hour;
    });

    if (!slot) return null;

    const enrolled = Math.floor(Math.random() * (slot.capacity + 1));
    return {
      id: slot.id,
      time: slot.startTime,
      endTime: slot.endTime,
      enrolled,
      capacity: slot.capacity,
      students: ['María', 'Carlos', 'Ana'].slice(0, enrolled),
    };
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1));
  };

  return (
    <Card className="p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold ml-2">
            {format(weekStart, "d 'de' MMMM", { locale: es })} - {format(addDays(weekStart, 6), "d 'de' MMMM, yyyy", { locale: es })}
          </h2>
        </div>
        <Button variant="outline" onClick={() => setCurrentWeek(new Date())}>
          Hoy
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="h-12" /> {/* Empty corner */}
            {days.map((day, i) => {
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={i}
                  className={cn(
                    "text-center py-2 rounded-lg",
                    isToday && "bg-primary text-primary-foreground"
                  )}
                >
                  <div className="text-xs font-medium opacity-80">
                    {weekDaysShort[day.getDay()]}
                  </div>
                  <div className="text-lg font-bold">{format(day, 'd')}</div>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="space-y-1">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-1">
                {/* Time Label */}
                <div className="flex items-center justify-end pr-2 text-xs text-muted-foreground font-medium">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                
                {/* Day Cells */}
                {days.map((day, dayIndex) => {
                  const actualDayIndex = day.getDay();
                  const slot = getSlotForDay(actualDayIndex, hour);
                  
                  if (!slot) {
                    return (
                      <div 
                        key={dayIndex} 
                        className="h-16 bg-muted/30 rounded-lg border border-border/50"
                      />
                    );
                  }

                  const isFull = slot.enrolled >= slot.capacity;
                  
                  return (
                    <button
                      key={dayIndex}
                      onClick={() => onSlotClick?.(slot, day)}
                      className={cn(
                        "h-16 rounded-lg p-2 text-left transition-all hover:scale-[1.02] hover:shadow-md",
                        isFull 
                          ? "bg-primary/10 border-2 border-primary/30 hover:border-primary/50"
                          : "bg-success/10 border-2 border-success/30 hover:border-success/50"
                      )}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <Clock className="h-3 w-3" />
                          {slot.time}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="h-3 w-3" />
                            <span className={cn(
                              "font-semibold",
                              isFull ? "text-primary" : "text-success"
                            )}>
                              {slot.enrolled}/{slot.capacity}
                            </span>
                          </div>
                          {isFull && (
                            <Badge variant="destructive" className="text-[10px] px-1 py-0">
                              Lleno
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
