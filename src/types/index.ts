export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  teacherId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;
  capacity: number;
  isRecurring: boolean;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface ScheduleBlock {
  id: string;
  timeSlotId: string;
  date: Date;
  status: 'available' | 'full' | 'cancelled' | 'holiday';
  enrolledCount: number;
  waitlistCount: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  scheduleBlockId: string;
  status: 'confirmed' | 'pending' | 'waitlist' | 'cancelled';
  enrolledAt: Date;
  notes?: string;
}

export interface Student extends User {
  level: 'beginner' | 'intermediate' | 'advanced';
  enrollments: Enrollment[];
  emergencyContact?: string;
  healthNotes?: string;
}

export interface RescheduleRequest {
  id: string;
  enrollmentId: string;
  studentId: string;
  fromBlockId: string;
  toBlockId: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  resolvedAt?: Date;
  reason?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'confirmation' | 'cancellation' | 'reschedule' | 'waitlist';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps?: {
    enrolledCount: number;
    capacity: number;
    status: string;
  };
}
