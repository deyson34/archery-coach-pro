# Arquitectura del Sistema - Juanjo Archery School

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + TypeScript)             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │ Landing  │  │  Login   │  │Dashboard │  │   Schedule   │    │
│  │  Page    │  │  Page    │  │  (Prof)  │  │  Management  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │ Students │  │ Settings │  │ Student  │  │   Profile    │    │
│  │   List   │  │   Page   │  │Dashboard │  │    Page      │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  Components: Navbar, Layout, WeeklyCalendar, StatsCards, etc.   │
│  Contexts: AuthContext                                           │
│  Hooks: useToast, useMobile                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LOVABLE CLOUD (Backend)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Supabase DB   │  │  Edge Functions │  │  Auth Service  │  │
│  │   (PostgreSQL)  │  │  (Serverless)   │  │   (JWT/OAuth)  │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  File Storage   │  │  Cron Jobs      │  │   Realtime     │  │
│  │   (Avatars)     │  │ (Monthly Sync)  │  │  Subscriptions │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Modelo de Datos (PostgreSQL)

### Tablas Principales

```sql
-- Usuarios (gestionado por Supabase Auth)
-- auth.users contiene: id, email, created_at

-- Perfiles de usuario
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Roles de usuario (separado por seguridad)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL, -- 'admin', 'teacher', 'student'
    UNIQUE (user_id, role)
);

-- Bloques horarios (plantilla)
CREATE TABLE time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 4,
    is_recurring BOOLEAN DEFAULT true,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Instancias de clase (generadas desde time_slots)
CREATE TABLE schedule_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    time_slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'available', -- 'available', 'full', 'cancelled', 'holiday'
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Estudiantes (extensión de profiles)
CREATE TABLE students (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    level VARCHAR(20) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    emergency_contact VARCHAR(255),
    health_notes TEXT,
    joined_at DATE DEFAULT CURRENT_DATE
);

-- Inscripciones
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    schedule_block_id UUID REFERENCES schedule_blocks(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'confirmed', 'pending', 'waitlist', 'cancelled'
    position INTEGER, -- para lista de espera
    enrolled_at TIMESTAMP DEFAULT NOW(),
    notes TEXT,
    UNIQUE (student_id, schedule_block_id)
);

-- Solicitudes de cambio de horario
CREATE TABLE reschedule_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE NOT NULL,
    from_block_id UUID REFERENCES schedule_blocks(id) NOT NULL,
    to_block_id UUID REFERENCES schedule_blocks(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    reason TEXT,
    requested_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

-- Notificaciones
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(30) NOT NULL, -- 'reminder', 'confirmation', 'cancellation', 'reschedule', 'waitlist'
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Registro de auditoría
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Endpoints API Principales

### Autenticación
```
POST /auth/login          - Iniciar sesión
POST /auth/register       - Registrar usuario
POST /auth/logout         - Cerrar sesión
POST /auth/reset-password - Restablecer contraseña
```

### Horarios (Time Slots)
```
GET    /api/time-slots              - Listar horarios
POST   /api/time-slots              - Crear horario
GET    /api/time-slots/:id          - Obtener horario
PUT    /api/time-slots/:id          - Actualizar horario
DELETE /api/time-slots/:id          - Eliminar horario
GET    /api/time-slots/:id/students - Listar inscritos
```

### Inscripciones
```
GET    /api/enrollments             - Listar inscripciones
POST   /api/enrollments             - Crear inscripción
PUT    /api/enrollments/:id         - Actualizar inscripción
DELETE /api/enrollments/:id         - Cancelar inscripción
POST   /api/enrollments/:id/confirm - Confirmar inscripción
```

### Solicitudes de Cambio
```
GET    /api/reschedule-requests           - Listar solicitudes
POST   /api/reschedule-requests           - Crear solicitud
PUT    /api/reschedule-requests/:id       - Aprobar/Rechazar
GET    /api/reschedule-requests/available - Horarios disponibles
```

### Estudiantes
```
GET    /api/students         - Listar estudiantes
POST   /api/students         - Registrar estudiante
GET    /api/students/:id     - Obtener perfil
PUT    /api/students/:id     - Actualizar perfil
DELETE /api/students/:id     - Eliminar estudiante
GET    /api/students/:id/history - Historial de clases
```

### Notificaciones
```
GET    /api/notifications           - Listar notificaciones
PUT    /api/notifications/:id/read  - Marcar como leída
POST   /api/notifications/send      - Enviar notificación
```

## Edge Functions

### send-reminder
Envía recordatorios automáticos 24h y 1h antes de cada clase.

### monthly-sync
Tarea programada mensual que:
1. Genera schedule_blocks para el mes siguiente
2. Confirma/limpia inscripciones pendientes
3. Procesa lista de espera
4. Envía resumen a profesores

### process-waitlist
Cuando un estudiante cancela, mueve al siguiente de la lista de espera.

## Flujo de Datos

### Crear Horario → Inscribir Alumno → Reprogramar

```
1. Profesor crea time_slot
   └─> Se genera schedule_block para fechas activas

2. Alumno solicita inscripción
   └─> Se verifica capacidad
   └─> Si hay espacio: enrollment.status = 'confirmed'
   └─> Si está lleno: enrollment.status = 'waitlist'

3. Alumno solicita cambio
   └─> Se crea reschedule_request.status = 'pending'
   └─> Profesor aprueba:
       └─> Actualiza enrollment original
       └─> Crea nuevo enrollment
       └─> Procesa waitlist del horario origen
       └─> Envía notificaciones

4. Sistema envía notificación
   └─> Email vía Resend
   └─> Push notification
```

## Tecnologías Utilizadas

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Estilos | Tailwind CSS + Shadcn/UI |
| Estado | React Query + Context API |
| Routing | React Router v6 |
| Backend | Lovable Cloud (Supabase) |
| Base de Datos | PostgreSQL |
| Autenticación | Supabase Auth (JWT) |
| Notificaciones | Resend (Email) |
| Fechas | date-fns |

## Seguridad

- **Autenticación**: JWT tokens con refresh
- **Autorización**: RLS policies en PostgreSQL
- **Roles**: Tabla separada, verificados server-side
- **Auditoría**: Registro completo de cambios
- **Validación**: Zod schemas en frontend y backend

## Próximos Pasos para Implementación Completa

1. Conectar Lovable Cloud para backend real
2. Implementar Edge Functions para notificaciones
3. Configurar Cron Jobs para sincronización mensual
4. Integrar pasarela de pagos (Stripe)
5. Añadir sincronización con Google Calendar
6. Implementar sistema de reportes/analytics
