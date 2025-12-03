import { useState } from 'react';
import { Save, Bell, Calendar, Globe, Shield, Database, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [autoWaitlist, setAutoWaitlist] = useState(true);
  const [monthlyRecalc, setMonthlyRecalc] = useState(true);

  const handleSave = () => {
    toast({
      title: 'Configuración guardada',
      description: 'Tus preferencias han sido actualizadas correctamente.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Administra las preferencias del sistema
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="schedule">Horarios</TabsTrigger>
          <TabsTrigger value="data">Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Preferencias Generales
              </CardTitle>
              <CardDescription>
                Configura las opciones básicas del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nombre de la Academia</Label>
                  <Input defaultValue="Juanjo Archery School" />
                </div>
                <div className="space-y-2">
                  <Label>Email de contacto</Label>
                  <Input type="email" defaultValue="juanjo@archery.com" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input type="tel" defaultValue="+34 600 000 000" />
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ca">Català</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Zona horaria</Label>
                <Select defaultValue="europe-madrid">
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-madrid">Europe/Madrid (UTC+1)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Configuración de Notificaciones
              </CardTitle>
              <CardDescription>
                Gestiona cómo y cuándo se envían las notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recordatorios por email</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar recordatorios de clase por correo electrónico
                  </p>
                </div>
                <Switch checked={emailReminders} onCheckedChange={setEmailReminders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recordatorios por SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar recordatorios de clase por mensaje de texto
                  </p>
                </div>
                <Switch checked={smsReminders} onCheckedChange={setSmsReminders} />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Recordatorio previo (horas)</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hora antes</SelectItem>
                      <SelectItem value="2">2 horas antes</SelectItem>
                      <SelectItem value="12">12 horas antes</SelectItem>
                      <SelectItem value="24">24 horas antes</SelectItem>
                      <SelectItem value="48">48 horas antes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Segundo recordatorio (horas)</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Desactivado</SelectItem>
                      <SelectItem value="1">1 hora antes</SelectItem>
                      <SelectItem value="2">2 horas antes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Configuración de Horarios
              </CardTitle>
              <CardDescription>
                Define las reglas de gestión de horarios e inscripciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lista de espera automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Añadir automáticamente a lista de espera cuando la clase está llena
                  </p>
                </div>
                <Switch checked={autoWaitlist} onCheckedChange={setAutoWaitlist} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recálculo mensual automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Recalcular recurrencias y limpiar inscripciones pendientes cada mes
                  </p>
                </div>
                <Switch checked={monthlyRecalc} onCheckedChange={setMonthlyRecalc} />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Capacidad por defecto</Label>
                  <Select defaultValue="4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 alumnos</SelectItem>
                      <SelectItem value="4">4 alumnos</SelectItem>
                      <SelectItem value="6">6 alumnos</SelectItem>
                      <SelectItem value="8">8 alumnos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Antelación mínima para reservar</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sin límite</SelectItem>
                      <SelectItem value="2">2 horas</SelectItem>
                      <SelectItem value="24">24 horas</SelectItem>
                      <SelectItem value="48">48 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Antelación máxima para reservar</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">1 semana</SelectItem>
                      <SelectItem value="14">2 semanas</SelectItem>
                      <SelectItem value="30">1 mes</SelectItem>
                      <SelectItem value="60">2 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Política de cancelación</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sin penalización</SelectItem>
                      <SelectItem value="2">2 horas antes</SelectItem>
                      <SelectItem value="24">24 horas antes</SelectItem>
                      <SelectItem value="48">48 horas antes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Gestión de Datos
              </CardTitle>
              <CardDescription>
                Exporta, importa y gestiona los datos del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Download className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Exportar Datos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Descarga un backup de tus horarios, alumnos e inscripciones
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm">CSV</Button>
                      <Button variant="outline" size="sm">JSON</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Importar Datos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Carga datos desde un archivo CSV o JSON
                    </p>
                    <Button variant="outline" size="sm">Seleccionar archivo</Button>
                  </CardContent>
                </Card>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Backups automáticos
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Se realizan backups diarios automáticamente
                  </p>
                </div>
                <Button variant="outline" size="sm">Ver historial</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="hero" onClick={handleSave}>
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
