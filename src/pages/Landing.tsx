import { Link } from 'react-router-dom';
import { ArrowRight, Target, Calendar, Users, Bell, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import logo from '@/assets/logo.png';

const features = [
  {
    icon: Calendar,
    title: 'Gestión de Horarios',
    description: 'Crea y administra tus clases con horarios recurrentes, capacidad por clase y reglas de disponibilidad.',
  },
  {
    icon: Users,
    title: 'Control de Inscripciones',
    description: 'Gestiona inscripciones, listas de espera automáticas y cambios de horario de forma sencilla.',
  },
  {
    icon: Bell,
    title: 'Notificaciones Automáticas',
    description: 'Recordatorios por email, confirmaciones y alertas para ti y tus alumnos.',
  },
  {
    icon: Target,
    title: 'Panel del Alumno',
    description: 'Tus alumnos pueden ver sus clases, solicitar cambios y recibir notificaciones.',
  },
  {
    icon: Shield,
    title: 'Seguridad y Auditoría',
    description: 'Autenticación segura, roles de usuario y registro completo de cambios.',
  },
  {
    icon: Award,
    title: 'Reportes y Estadísticas',
    description: 'Visualiza asistencia, ocupación e ingresos con reportes detallados.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative container py-6">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-16">
            <img src={logo} alt="Juanjo Archery" className="h-14" />
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link to="/login">
                <Button variant="hero">
                  Comenzar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Target className="h-4 w-4" />
                Sistema de Gestión de Clases
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Gestiona tus clases de{' '}
                <span className="text-gradient">tiro con arco</span>{' '}
                de forma profesional
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Sistema completo para administrar horarios, inscripciones, 
                notificaciones y comunicación con tus alumnos. Todo en un solo lugar.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button variant="hero" size="xl">
                    Acceder al Sistema
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  Ver Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-display font-bold text-primary">24+</div>
                  <div className="text-sm text-muted-foreground">Alumnos activos</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Clases mensuales</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative hidden lg:block animate-float">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Target circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full border-8 border-primary/20 flex items-center justify-center">
                    <div className="w-60 h-60 rounded-full border-8 border-primary/30 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border-8 border-target-blue/40 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-8 border-target-cyan/50 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-accent shadow-glow-yellow" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2">
                  <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rotate-45 transform -translate-x-1" />
                  <div className="h-1 bg-gradient-to-r from-transparent via-foreground to-foreground w-[60%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Todo lo que necesitas para gestionar tu academia
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un sistema completo diseñado específicamente para profesores 
              de tiro con arco y sus alumnos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-primary-foreground rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-primary-foreground rounded-full" />
        </div>
        
        <div className="relative container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            ¿Listo para optimizar tu academia?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Comienza a gestionar tus clases de forma profesional hoy mismo.
          </p>
          <Link to="/login">
            <Button variant="accent" size="xl">
              Comenzar Ahora
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo} alt="Juanjo Archery" className="h-10" />
          <p className="text-sm text-muted-foreground">
            © 2024 Juanjo Archery & Language School. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
