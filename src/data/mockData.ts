import { Student, TimeSlot, ScheduleBlock, Enrollment, Notification, CalendarEvent } from '@/types';
import { addDays, setHours, setMinutes, startOfWeek, format } from 'date-fns';

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 1 });

export const mockStudents: Student[] = [
  {
    id: 's1',
    email: 'maria@email.com',
    name: 'María López',
    phone: '+34 612 345 678',
    role: 'student',
    level: 'intermediate',
    createdAt: new Date('2024-01-15'),
    enrollments: [],
  },
  {
    id: 's2',
    email: 'carlos@email.com',
    name: 'Carlos Ruiz',
    phone: '+34 623 456 789',
    role: 'student',
    level: 'beginner',
    createdAt: new Date('2024-02-20'),
    enrollments: [],
  },
  {
    id: 's3',
    email: 'ana@email.com',
    name: 'Ana Martínez',
    phone: '+34 634 567 890',
    role: 'student',
    level: 'advanced',
    createdAt: new Date('2023-11-10'),
    enrollments: [],
  },
  {
    id: 's4',
    email: 'pedro@email.com',
    name: 'Pedro Sánchez',
    phone: '+34 645 678 901',
    role: 'student',
    level: 'beginner',
    createdAt: new Date('2024-03-05'),
    enrollments: [],
  },
  {
    id: 's5',
    email: 'lucia@email.com',
    name: 'Lucía García',
    phone: '+34 656 789 012',
    role: 'student',
    level: 'intermediate',
    createdAt: new Date('2024-01-28'),
    enrollments: [],
  },
];

export const mockTimeSlots: TimeSlot[] = [
  {
    id: 'ts1',
    teacherId: '1',
    dayOfWeek: 1, // Monday
    startTime: '10:00',
    endTime: '11:00',
    capacity: 4,
    isRecurring: true,
    startDate: new Date('2024-01-01'),
    isActive: true,
  },
  {
    id: 'ts2',
    teacherId: '1',
    dayOfWeek: 1,
    startTime: '17:00',
    endTime: '18:00',
    capacity: 4,
    isRecurring: true,
    startDate: new Date('2024-01-01'),
    isActive: true,
  },
  {
    id: 'ts3',
    teacherId: '1',
    dayOfWeek: 2, // Tuesday
    startTime: '10:00',
    endTime: '11:00',
    capacity: 4,
    isRecurring: true,
    startDate: new Date('2024-01-01'),
    isActive: true,
  },
  {
    id: 'ts4',
    teacherId: '1',
    dayOfWeek: 3, // Wednesday
    startTime: '18:00',
    endTime: '19:00',
    capacity: 6,
    isRecurring: true,
    startDate: new Date('2024-01-01'),
    isActive: true,
  },
  {
    id: 'ts5',
    teacherId: '1',
    dayOfWeek: 4, // Thursday
    startTime: '17:00',
    endTime: '18:00',
    capacity: 4,
    isRecurring: true,
    startDate: new Date('2024-01-01'),
    isActive: true,
  },
  {
    id: 'ts6',
    teacherId: '1',
    dayOfWeek: 5, // Friday
    startTime: '16:00',
    endTime: '17:00',
    capacity: 4,
    isRecurring: true,
    startDate: new Date('2024-01-01'),
    isActive: true,
  },
];

export function generateCalendarEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  
  mockTimeSlots.forEach((slot, index) => {
    const date = addDays(weekStart, slot.dayOfWeek);
    const [startHour, startMin] = slot.startTime.split(':').map(Number);
    const [endHour, endMin] = slot.endTime.split(':').map(Number);
    
    const start = setMinutes(setHours(date, startHour), startMin);
    const end = setMinutes(setHours(date, endHour), endMin);
    
    const enrolled = Math.floor(Math.random() * (slot.capacity + 1));
    const isFull = enrolled >= slot.capacity;
    
    events.push({
      id: `event-${slot.id}`,
      title: `Clase de Tiro con Arco`,
      start,
      end,
      backgroundColor: isFull ? 'hsl(358, 82%, 50%)' : 'hsl(142, 76%, 36%)',
      borderColor: isFull ? 'hsl(358, 82%, 42%)' : 'hsl(142, 76%, 30%)',
      extendedProps: {
        enrolledCount: enrolled,
        capacity: slot.capacity,
        status: isFull ? 'full' : 'available',
      },
    });
  });
  
  return events;
}

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'reminder',
    title: 'Recordatorio de clase',
    message: 'Tienes una clase programada mañana a las 10:00',
    isRead: false,
    createdAt: new Date(),
  },
  {
    id: 'n2',
    userId: '1',
    type: 'reschedule',
    title: 'Solicitud de cambio',
    message: 'María López ha solicitado cambiar su clase del lunes al martes',
    isRead: false,
    createdAt: addDays(new Date(), -1),
  },
  {
    id: 'n3',
    userId: '1',
    type: 'confirmation',
    title: 'Nueva inscripción',
    message: 'Carlos Ruiz se ha inscrito en la clase del miércoles 18:00',
    isRead: true,
    createdAt: addDays(new Date(), -2),
  },
];

export const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const weekDaysShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
