from django.db import models

# Modelos Para Agregar Datos Aparte

# Tabla personal cuerpo de bomberos
class Personal(models.Model):
  nombres = models.CharField(max_length=50)
  apellidos = models.CharField(max_length=50)
  jerarquia = models.CharField(max_length=50)
  cargo = models.CharField(max_length=50)

  def __str__(self):
    return self.nombres + " -- " + self.apellidos + " -- " + self.jerarquia + " -- " + self.cargo

# Tabla de usuarios que pueden entrar a la pagina
class Usuarios(models.Model):
    user = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    encargado = models.ForeignKey(Personal, on_delete=models.CASCADE)
    
    def __str__(self):
      return self.user + " -- " + self.password + " -- " + self.encargado.nombres + " " + self.encargado.apellidos

# Tabla de divisiones del cuerpo de bomberos
class Divisiones(models.Model):
    division = models.CharField(max_length=20)
    
    def __str__(self):
      return self.division

# tabla de municipios
class Municipios(models.Model):
    municipio = models.CharField(max_length=40)
    
    def __str__(self):
      return self.municipio

# tabla de parroquias
class Parroquias(models.Model):
    parroquia = models.CharField(max_length=40)
    
    def __str__(self):
      return self.parroquia

# tabla de posibles motivos para guardias de prevencion
class Motivo_Prevencion(models.Model):
    motivo = models.CharField(max_length=40)
    
    def __str__(self):
      return self.motivo

# tabla de lugares de suministros de agua
class Tipo_Institucion(models.Model):
  nombre_institucion = models.CharField(max_length=50)
  
  def __str__(self):
     return self.nombre_institucion

# tabla de posibles apoyos a otras unidades
class Tipo_apoyo(models.Model):
  tipo_apoyo = models.CharField(max_length=50)
  
  def __str__(self):
    return self.tipo_apoyo

# tabla de tipos de procedimientos
class Tipos_Procedimientos(models.Model):
    tipo_procedimiento = models.CharField(max_length=40)
    
    def __str__(self):
      return self.tipo_procedimiento

# tabla de posibles motivos para Despliegues de seguridad
class Motivo_Despliegue(models.Model):
  motivo = models.CharField(max_length=50)
  
  def __str__(self):
    return self.motivo

# tabla de posibles tipos de rescate
class Tipo_Rescate(models.Model):
  tipo_rescate = models.CharField(max_length=30)
  
  def __str__(self):
    return self.tipo_rescate

# tabla de posibles tipos de servicios especiales
class Tipo_servicios(models.Model):
  serv_especiales = models.CharField(max_length=30)
  
  def __str__(self):
    return self.serv_especiales
  
# tabla de posibles motivos de falsa alarma
class Motivo_Alarma(models.Model):
  motivo = models.CharField(max_length=30)
  
  def __str__(self):
    return self.motivo

# tabla de posibles motivos de evaluacion de riesgo
class Motivo_Riesgo(models.Model):
  tipo_riesgo = models.CharField(max_length=100)
  
  def __str__(self):
    return self.tipo_riesgo

# tabla de listado de unidades del cuerpo de bomberos
class Unidades(models.Model):
  nombre_unidad = models.CharField(max_length=40)
  
  def __str__(self):
    return self.nombre_unidad

class Tipo_Incendio(models.Model):
  tipo_incendio = models.CharField(max_length=40)

  def __str__(self):
    return self.tipo_incendio
    
# Modelo Proncipal para todos los Procedimientos
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

# Modelos de los detalles por procedimiento

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
    return self.id_procedimiento.id_division.division + " -- " + self.id_tipo_servicio.nombre_institucion + " -- " + self.nombres + " -- " + self.apellidos + " -- " + self.cedula + " -- " + self.ltrs_agua + " -- " + self.personas_atendidas + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status
  
class Apoyo_Unidades(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  id_tipo_apoyo = models.ForeignKey(Tipo_apoyo, on_delete=models.CASCADE)
  unidad_apoyada = models.CharField(max_length=50)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + " -- " + self.id_tipo_apoyo.tipo_apoyo + " -- " + self.unidad_apoyada + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status
  
class Guardia_prevencion(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  id_motivo_prevencion = models.ForeignKey(Motivo_Prevencion, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + "--" + self.id_motivo_prevencion.motivo + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status

class Atendido_no_Efectuado(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status

class Despliegue_Seguridad(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  motivo_despliegue = models.ForeignKey(Motivo_Despliegue, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  
  def __str__(self):
    return self.id_procedimiento.id_division.division + " -- " + self.motivo_despliegue.motivo + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status
  
class Fallecidos(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  motivo_fallecimiento = models.CharField(max_length=50)
  nombres = models.CharField(max_length=50)
  apellidos = models.CharField(max_length=50)
  cedula = models.CharField(max_length=12)
  edad = models.CharField(max_length=4)
  sexo = models.CharField(max_length=10)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=20)
  
  def __str__(self):
   return self.id_procedimiento.id_division.division + " -- " + self.motivo_fallecimiento + " -- " + self.nombres + " -- " + self.apellidos + " -- " + self.cedula + " -- " + self.edad + " -- " + self.sexo + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status

class Falsa_Alarma(models.Model):
  id_procedimiento = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  motivo_alarma = models.ForeignKey(Motivo_Alarma, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=20)
  
  def __str__(self):
   return self.id_procedimiento.id_division.division + " -- " + self.motivo_alarma.motivo + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status

class Servicios_Especiales(models.Model):
  id_procedimientos = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  tipo_servicio = models.ForeignKey(Tipo_servicios, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=50)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=20)
  
  def __str__(self):
   return self.id_procedimientos.id_division.division + " -- " + self.tipo_servicio.serv_especiales + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status

class Rescate(models.Model):
  id_procedimientos = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  material_utilizado = models.CharField(max_length=50)
  status = models.CharField(max_length=50)
  tipo_rescate = models.ForeignKey(Tipo_Rescate, on_delete=models.CASCADE)
  
  def __str__(self):
    return self.id_procedimientos.id_division.division + " -- " + self.material_utilizado + " -- " + self.status + " -- " + self.tipo_rescate.tipo_rescate
  
class Rescate_Persona(models.Model):
  id_rescate = models.ForeignKey(Rescate, on_delete=models.CASCADE)
  nombre = models.CharField(max_length=30)
  apellidos = models.CharField(max_length=30)
  cedula = models.CharField(max_length=10)
  edad = models.CharField(max_length=3)
  sexo = models.CharField(max_length=30)
  descripcion = models.CharField(max_length=30)
  
  def __str__(self):
    return self.id_rescate.tipo_rescate.tipo_rescate  + " -- " + self.nombre  + " -- " + self.apellidos  + " -- " + self.cedula  + " -- " + self.edad  + " -- " + self.sexo  + " -- " + self.descripcion  
  
class Rescate_Animal(models.Model):
  id_rescate = models.ForeignKey(Rescate, on_delete=models.CASCADE)
  especie = models.CharField(max_length=40)
  descripcion = models.CharField(max_length=40, )
  
  def __str__(self):
    return self.id_rescate.tipo_rescate.tipo_rescate  + " -- " + self.especie + " -- " + self.descripcion

class Incendios(models.Model): 
  id_procedimientos = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  id_tipo_incendio = models.ForeignKey(Tipo_Incendio, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=40)
  material_utilizado = models.CharField(max_length=40)
  status = models.CharField(max_length=40)
  
  def __str__(self):
    return self.id_procedimientos.id_tipo_procedimiento.tipo_procedimiento + " -- " + self.id_tipo_incendio.tipo_incendio + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status
  
class Persona_Presente(models.Model):
  id_incendio = models.ForeignKey(Incendios, on_delete=models.CASCADE)
  nombre = models.CharField(max_length=40)
  apellidos = models.CharField(max_length=40)
  cedula = models.CharField(max_length=10)
  edad = models.CharField(max_length=3)
  
  def __str__(self):
    return self.id_incendio.id_tipo_incendio.tipo_incendio + " -- " + self.nombre + " -- " + self.apellidos + " -- " + self.cedula + " -- " + self.edad
  
class Detalles_Vehiculos(models.Model):
  id_vehiculo = models.ForeignKey(Incendios, on_delete=models.CASCADE)
  modelo = models.CharField(max_length=40)
  marca = models.CharField(max_length=40)
  color = models.CharField(max_length=40)
  año = models.CharField(max_length=40)
  placas = models.CharField(max_length=40)
  
  def __str__(self):
    return self.id_vehiculo.id_tipo_incendio.tipo_incendio + " -- " + self.modelo + " -- " + self.marca + " -- " + self.color + " -- " + self.año + " -- " + self.placas

 
class Atenciones_Paramedicas(models.Model):
  id_procedimientos = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  tipo_atencion = models.CharField(max_length=30)
  
  def __str__(self):
    return self.id_procedimientos.id_tipo_procedimiento.tipo_procedimiento + " -- "  + self.tipo_atencion

# tabla de Emergencias Medicas para procedmiento atenciones paramedicas
class Emergencias_Medicas(models.Model):
  id_atencion = models.ForeignKey(Atenciones_Paramedicas, on_delete=models.CASCADE)
  nombres = models.CharField(max_length=30)
  apellidos = models.CharField(max_length=30)
  cedula = models.CharField(max_length=10)
  edad = models.CharField(max_length=3)
  sexo = models.CharField(max_length=12)
  idx = models.CharField(max_length=40)
  descripcion = models.CharField(max_length=40)
  material_utilizado = models.CharField(max_length=30)
  status = models.CharField(max_length=20)
  
  def __str__(self):
    return self.id_atencion.tipo_atencion + " -- " + self.nombres + " -- " + self.apellidos + " -- " + self.cedula + " -- " + self.edad + " -- " + self.sexo + " -- " + self.idx + " -- " + self.descripcion + " -- " +  self.material_utilizado + " -- " + self.status
  
class Traslado(models.Model):
  id_lesionado = models.ForeignKey(Emergencias_Medicas, on_delete=models.CASCADE)
  hospital_trasladado = models.CharField(max_length=40)
  medico_receptor = models.CharField(max_length=40)
  mpps_cmt = models.CharField(max_length=20)
  
  def __str__(self):
    return self.hospital_trasladado + " -- " + self.medico_receptor + " -- " + self.mpps_cmt

# tabla de accidentes de transito para procedimiento atenciones paramedicas
class Tipo_Accidente(models.Model):
  tipo_accidente = models.CharField(max_length=40)
  
  def __str__(self):
    return self.tipo_accidente

class Accidentes_Transito(models.Model):
  id_atencion = models.ForeignKey(Atenciones_Paramedicas, on_delete=models.CASCADE)
  tipo_de_accidente = models.ForeignKey(Tipo_Accidente, on_delete=models.CASCADE)
  cantidad_lesionados = models.CharField(max_length=20)
  material_utilizado = models.CharField(max_length=30)
  status = models.CharField(max_length=20)
  
  def __str__(self):
    return self.id_atencion.tipo_atencion + " -- " + self.tipo_de_accidente.tipo_accidente + " -- " + self.cantidad_lesionados

class Detalles_Vehiculos_Accidente(models.Model):
  id_vehiculo = models.ForeignKey(Accidentes_Transito, on_delete=models.CASCADE)
  modelo = models.CharField(max_length=40)
  marca = models.CharField(max_length=40)
  color = models.CharField(max_length=40)
  año = models.CharField(max_length=40)
  placas = models.CharField(max_length=40)
  
  def __str__(self):
    return self.id_vehiculo.tipo_de_accidente.tipo_accidente + " -- " + self.modelo + " -- " + self.marca + " -- " + self.color + " -- " + self.año + " -- " + self.placas
  
class Lesionados(models.Model):
    id_accidente = models.ForeignKey(Accidentes_Transito, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    cedula = models.CharField(max_length=10)
    edad = models.CharField(max_length=3)
    sexo = models.CharField(max_length=12)
    idx = models.CharField(max_length=40)
    descripcion = models.CharField(max_length=40)
    
    def __str__(self):
      return self.id_accidente.tipo_de_accidente.tipo_accidente + " -- " + self.nombres + " -- " + self.apellidos + " -- " + self.cedula + " -- " + self.edad + " -- " + self.sexo + " -- " + self.idx + " -- " + self.descripcion
    
class Traslado_Accidente(models.Model):
  id_lesionado = models.ForeignKey(Lesionados, on_delete=models.CASCADE)
  hospital_trasladado = models.CharField(max_length=40)
  medico_receptor = models.CharField(max_length=40)
  mpps_cmt = models.CharField(max_length=20)
  
  def __str__(self):
    return self.hospital_trasladado + " -- " + self.medico_receptor + " -- " + self.mpps_cmt

# Tabla Eevaluacion de Riesgo
class Evaluacion_Riesgo(models.Model):
  id_procedimientos = models.ForeignKey(Procedimientos, on_delete=models.CASCADE)
  id_tipo_riesgo = models.ForeignKey(Motivo_Riesgo, on_delete=models.CASCADE)
  descripcion = models.CharField(max_length=100)
  material_utilizado = models.CharField(max_length=100)
  status = models.CharField(max_length=100)
  
  def __str__(self):
    return self.id_procedimientos.id_tipo_procedimiento.tipo_procedimiento + " -- " + self.id_tipo_riesgo.tipo_riesgo + " -- " + self.descripcion + " -- " + self.material_utilizado + " -- " + self.status