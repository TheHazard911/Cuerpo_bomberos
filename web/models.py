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

class Tipo_Institucion(models.Model):
  nombre_institucion = models.CharField(max_length=50)
  
  def __str__(self):
     return self.nombre_institucion
  
class Tipo_apoyo(models.Model):
  tipo_apoyo = models.CharField(max_length=50)
  
  def __str__(self):
    return self.tipo_apoyo

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

class Abastecimiento_agua(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  id_tipo_servicio = models.ForeignKey(Tipo_Institucion, on_delete=models.CASCADE)
  nombres = models.CharField(max_length=40, default="Nombre_1 Nombre_2")
  apellidos = models.CharField(max_length=40, default="Apellido_1 Apellido_2")
  cedula = models.CharField(max_length=10, default="V-00000000")
  ltrs_agua = models.CharField(max_length=10, default="0L")
  personas_atendidas = models.CharField(max_length=10, default="0")
  descripcion = models.CharField(max_length=40, default="Aqui va la Descripcion")
  material_utilizado = models.CharField(max_length=40, default="Materiales Usados")
  status = models.CharField(max_length=20, default="...")
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + " -- " + self.tipo_servicio + " -- " + self.nombres + " -- " + self.apellidos + " -- " + self.cedula + " -- " + self.ltrs_agua + " -- " + self.personas_atendidas + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status
  
class Apoyo_Unidades(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  tipo_apoyo = models.CharField(max_length=50)
  unidad_apoyada = models.CharField(max_length=50)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + " -- " + self.tipo_apoyo + " -- " + self.unidad_apoyada + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status
  
class Guardia_prevencion(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  motivo_prevencion = models.CharField(max_length=40)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status

