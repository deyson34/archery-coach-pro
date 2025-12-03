import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Target, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Credenciales incorrectas. Intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'teacher' | 'student') => {
    setIsLoading(true);
    try {
      await login(role === 'teacher' ? 'teacher@demo.com' : 'student@demo.com', 'demo');
      toast({
        title: `¡Bienvenido ${role === 'teacher' ? 'Profesor' : 'Alumno'}!`,
        description: 'Sesión de demostración iniciada.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo iniciar la sesión de demo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-60 h-60 border-4 border-primary-foreground rounded-full" />
          <div className="absolute bottom-20 right-20 w-80 h-80 border-4 border-primary-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-primary-foreground rounded-full" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <img src={logo} alt="Juanjo Archery" className="h-20 w-auto mb-8" />
          <h1 className="text-4xl font-display font-bold mb-4">
            Sistema de Gestión de Clases
          </h1>
          <p className="text-lg opacity-90 max-w-md">
            Administra horarios, inscripciones y comunicación con tus alumnos 
            de forma profesional y eficiente.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <span>Gestión completa de horarios</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <span>Inscripciones y lista de espera</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <span>Notificaciones automáticas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex justify-center mb-8">
            <img src={logo} alt="Juanjo Archery" className="h-16" />
          </Link>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-display">Bienvenido</CardTitle>
              <CardDescription>
                Inicia sesión para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-muted-foreground">Recordarme</span>
                      </label>
                      <a href="#" className="text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                      {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          O prueba con demo
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleDemoLogin('teacher')}
                        disabled={isLoading}
                      >
                        Demo Profesor
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleDemoLogin('student')}
                        disabled={isLoading}
                      >
                        Demo Alumno
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="register">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Contraseña</Label>
                      <Input id="reg-password" type="password" placeholder="••••••••" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono (opcional)</Label>
                      <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                    </div>
                    <Button type="submit" className="w-full" variant="hero">
                      Crear Cuenta
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
