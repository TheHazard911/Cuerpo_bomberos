from django.db import models

# Crear Modelos (Bases de datos) propios.
class Personal(models.Model):
  nombres = models.CharField(max_length=50)
  apellidos = models.CharField(max_length=50)
  jerarquia = models.CharField(max_length=50)
  cargo = models.CharField(max_length=50)

  def __str__(self):
    return self.nombres + " -- " + self.apellidos + " -- " + self.jerarquia + " -- " + self.cargo

class Usuarios(models.Model):
    user = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    encargado = models.ForeignKey(Personal, on_delete=models.CASCADE)
    
    def __str__(self):
      return self.user + " -- " + self.password + " -- " + self.encargado.nombres + " " + self.encargado.apellidos

class Divisiones(models.Model):
    division = models.CharField(max_length=20)
    
    def __str__(self):
      return self.division

class Municipios(models.Model):
    municipio = models.CharField(max_length=40)
    
    def __str__(self):
      return self.municipio

class Parroquias(models.Model):
    parroquia = models.CharField(max_length=40)
    
    def __str__(self):
      return self.parroquia

class Tipos_Procedimientos(models.Model):
    tipo_procedimiento = models.CharField(max_length=40)
    
    def __str__(self):
      return self.tipo_procedimiento

class Procedimientos(models.Model):
    id_division  = models.ForeignKey(Divisiones, on_delete=models.CASCADE, default=0)
    id_solicitante = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name="personal1")
    unidad = models.CharField(max_length=40)
    id_jefe_comision = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name="personal2")
    efectivos_enviados = models.CharField(max_length=40)
    id_municipio = models.ForeignKey(Municipios, on_delete=models.CASCADE)
    id_parroquia = models.ForeignKey(Parroquias, on_delete=models.CASCADE, default="0")
    fecha = models.DateField(default="1999-01-01")
    hora = models.TimeField(default="00:00")
    direccion = models.CharField(max_length=50)
    id_tipo_procedimiento = models.ForeignKey(Tipos_Procedimientos, on_delete=models.CASCADE)
 
    def __str__(self):
      return self.id_division.division + " -- " + self.id_solicitante.jerarquia + " " + self.id_solicitante.nombres + " " + self.id_solicitante.apellidos + " -- " + self.unidad + " -- " + self.id_jefe_comision.jerarquia + " " + self.id_jefe_comision.nombres + " " + self.id_jefe_comision.apellidos + " -- " + self.efectivos_enviados + " -- " + self.id_municipio.municipio + " -- " + self.id_parroquia.parroquia + " -- " + str(self.fecha) + " " + str(self.hora) + " -- " + self.direccion + " -- " + self.id_tipo_procedimiento.tipo_procedimiento
