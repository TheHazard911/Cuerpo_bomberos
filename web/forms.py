from django import forms
from.models import *

def Asignar_ops_Personal():
    personal = Personal.objects.all()
    op = [("", "Seleccione Una Opcion")]
    for persona in personal:
        op.append((str(persona.id), f"{persona.jerarquia} {persona.nombres} {persona.apellidos}"))
    return op

def Asignar_op_Municipios():
    municipios = Municipios.objects.all()
    op = [("", "Seleccione Una Opcion")]
    for municipio in municipios:
        op.append((str(municipio.id), municipio))
    return op

def Asignar_op_Tipos_Procedimientos():
    procedimientos = Tipos_Procedimientos.objects.all()
    op = [("", "Seleccione Una Opcion")]
    for procedimiento in procedimientos:
        op.append((str(procedimiento.id), procedimiento))
    return op

def Asignar_opc_tipos_suministros():
     procedimientos = Tipo_Institucion.objects.all()
     op = [("", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op
   
def Asignar_opc_tipos_apoyos():
     procedimientos = Tipo_apoyo.objects.all()
     op = [("", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op
 
def Asignar_opc_motivo_prevencion():
     procedimientos = Motivo_Prevencion.objects.all()
     op = [("", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op

def Asignar_opc_motivo_despliegue():
     procedimientos = Motivo_Despliegue.objects.all()
     op = [("", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op
 
def Asignar_opc_motivo_fals_alarm():
   procedimientos = Motivo_Alarma.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.motivo))
   return op

def Asignar_opc_tipo_servicios():
   procedimientos = Tipo_servicios.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.serv_especiales))
   return op

def Asignar_opc_tipo_rescate():
   procedimientos = Tipo_Rescate.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_rescate))
   return op

def Asignar_opc_tipo_incendio():
   procedimientos = Tipo_Incendio.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_incendio))
   return op

def Asignar_opc_tipo_accidente():
   procedimientos = Tipo_Accidente.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_accidente))
   return op

def Asignar_opc_motivos_riesgo():
   procedimientos = Motivo_Riesgo.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_riesgo))
   return op

def Asignar_opc_motivos_riesgo_mitigacion():
   procedimientos = Mitigacion_riesgo.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_servicio))
   return op

def Asignar_opc_unidades():
   procedimientos = Unidades.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.nombre_unidad))
   return op

def Asignar_opc_avanzada():
   procedimientos = Motivo_Avanzada.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_servicio))
   return op

def Asignar_opc_traslados():
   procedimientos = Tipos_Traslado.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_traslado))
   return op

def Asignar_opc_cilindros():
   procedimientos = Tipo_Cilindro.objects.all()
   op = [("", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.nombre_cilindro))
   return op

# Form1
class SelectorDivision(forms.Form):
    op = [
        ("", "Seleccione una Opción"),
        ("1", "Rescate"),
        ("2", "Operaciones"),
        ("3", "Prevención"),
        ("4", "GRUMAE"),
        ("5", "Prehospitalaria"),
        ("6", "Enfermería"),
        ("7", "Servicios Médicos"),
        ("8", "Psicología"),
        ("9", "Capacitación"),
    ]
    opciones = forms.ChoiceField(
        label="Seleccionar División",
        choices=op,
        required=True, widget=forms.Select(attrs={"class": "disable-first-option"})
    )

# Form2 
class SeleccionarInfo(forms.Form):
    solicitante = forms.ChoiceField(choices=Asignar_ops_Personal(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))
    unidad = forms.ChoiceField(choices=Asignar_opc_unidades(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))
    efectivos_enviados = forms.CharField()
    jefe_comision = forms.ChoiceField(choices=Asignar_ops_Personal(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))

# Form3
class Datos_Ubicacion(forms.Form):
    opc = [("", "Seleccione una Opcion"),
        ("1", "La Concordia"),
        ("2", "Pedro Maria Morantes"),
        ("3", "San Juan Bautista"),
        ("4", "San Sebastian"),
        ("6", "Francisco Romero Lobo"),
    ]
    
    municipio = forms.ChoiceField(choices=Asignar_op_Municipios(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))
    parroquia = forms.ChoiceField(choices=opc, required=False,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))
    direccion = forms.CharField(max_length=100)
    fecha =  forms.DateField(
        label="Fecha",
        widget=forms.DateInput(attrs={'type': 'date'})
    )
    hora = forms.TimeField(
        widget=forms.TimeInput(attrs={'type': 'time'}, format='%H:%M'))  # Especificar explícitamente el tipo de input

# Form4
class Selecc_Tipo_Procedimiento(forms.Form):
    tipo_procedimiento = forms.ChoiceField(choices=Asignar_op_Tipos_Procedimientos(), required=True, widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Abastecimiento de Agua -- :D
class formulario_abastecimiento_agua(forms.Form):
     tipo_servicio = forms.ChoiceField(choices=Asignar_opc_tipos_suministros(), widget=forms.Select(attrs={'class': 'disable-first-option'}), required=False)
     nombres = forms.CharField(max_length=40, required=False)
     apellidos = forms.CharField(max_length=40, required=False)
     cedula = forms.CharField(max_length=10, required=False)
     ltrs_agua = forms.CharField(max_length=10, required=False)
     personas_atendidas = forms.CharField(max_length=10, required=False)
     descripcion = forms.CharField(max_length=40, required=False)
     material_utilizado = forms.CharField(max_length=40, required=False)
     status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulario Apoyo a otras Unidades
class Formulario_apoyo_unidades(forms.Form):
    tipo_apoyo = forms.ChoiceField(choices=Asignar_opc_tipos_apoyos(), widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    unidad_apoyada = forms.CharField(max_length=50, required=False)
    descripcion = forms.CharField(max_length=50, required=False)
    material_utilizado = forms.CharField(max_length=50, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulario Guardia de Prevencion
class Formulario_guardia_prevencion(forms.Form):
     motivo_prevencion = forms.ChoiceField(choices=Asignar_opc_motivo_prevencion(), widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
     descripcion = forms.CharField(max_length=50, required=False)
     material_utilizado = forms.CharField(max_length=50, required=False)
     status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulario Atendido no Efectuado 
class Formulario_atendido_no_efectuado(forms.Form):
     descripcion = forms.CharField(max_length=50, required=False)
     material_utilizado = forms.CharField(max_length=50, required=False)
     status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulario Despliegue de Seguridad 
class Formulario_despliegue_seguridad(forms.Form):
     motv_despliegue = forms.ChoiceField(choices=Asignar_opc_motivo_despliegue(),label="Motivo Despliegue", widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
     descripcion = forms.CharField(max_length=50, required=False)
     material_utilizado = forms.CharField(max_length=50, required=False)
     status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulario Falsa Alarma 
class Formulario_falsa_alarma(forms.Form):
   motv_alarma = forms.ChoiceField(choices=Asignar_opc_motivo_fals_alarm(),label="Motivo Alarma", widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
   descripcion = forms.CharField(max_length=50, required=False)
   material_utilizado = forms.CharField(max_length=50, required=False)
   status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
   
# Formulario Servicios Especiales
class Formulario_Servicios_Especiales(forms.Form):
   tipo_servicio = forms.ChoiceField(choices=Asignar_opc_tipo_servicios(),label="Motivo Servicio", widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
   descripcion = forms.CharField(max_length=50, required=False)
   material_utilizado = forms.CharField(max_length=50, required=False)
   status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulatio Fallecidos
class Formulario_Fallecidos(forms.Form):
    motivo_fallecimiento = forms.CharField(max_length=50, required=False)
    nom_fallecido = forms.CharField(max_length=40, required=False)
    apellido_fallecido = forms.CharField(max_length=40, required=False)
    cedula_fallecido = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)
    sexo = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Masculino", "Masculino"), ("Femenino", "Femenino")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    descripcion = forms.CharField(max_length=50, required=False)
    material_utilizado = forms.CharField(max_length=50, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

# Formulario Rescate
class Formulario_Rescate(forms.Form):
    material_utilizado = forms.CharField(max_length=50, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    tipo_rescate = forms.ChoiceField(choices=Asignar_opc_tipo_rescate, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    
class Formulario_Rescate_Persona(forms.Form):
    nombre_persona = forms.CharField(max_length=30, required=False)
    apellido_persona = forms.CharField(max_length=30, required=False)
    cedula_persona = forms.CharField(max_length=10, required=False)
    edad_persona = forms.CharField(max_length=3, required=False)
    sexo_persona = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Masculino", "Masculino"), ("Femenino", "Femenino")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    descripcion = forms.CharField(max_length=40, required=False)
    
class Formulario_Rescate_Animal(forms.Form):
    especie = forms.CharField(max_length=30, required=False)
    descripcion = forms.CharField(max_length=40, required=False)

# Formulario de Incendio
class Formulario_Incendio(forms.Form):
    tipo_incendio = forms.ChoiceField(choices=Asignar_opc_tipo_incendio, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    descripcion = forms.CharField(max_length=30, required=False)
    material_utilizado = forms.CharField(max_length=30, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    check_agregar_persona = forms.BooleanField(required=False)
    check_agregar_vehiculo = forms.BooleanField(required=False)
    
class Formulario_Persona_Presente(forms.Form):
    nombre = forms.CharField(max_length=30, required=False)
    apellido = forms.CharField(max_length=30, required=False)
    cedula = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)

class Formulario_Detalles_Vehiculos_Incendio(forms.Form):
    modelo = forms.CharField(max_length=40, required=False)
    marca = forms.CharField(max_length=40, required=False)
    color = forms.CharField(max_length=40, required=False)
    año = forms.CharField(max_length=40, required=False)
    placas = forms.CharField(max_length=40, required=False)

# Formulario de Atenciones Paramedicas
class Formulario_Atenciones_Paramedicas(forms.Form):
    tipo_atencion = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Emergencias Medicas", "Emergencias Medicas"), ("Accidentes de Transito", "Accidentes de Transito")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    
class Formulario_Emergencias_Medicas(forms.Form):
    nombre = forms.CharField(max_length=40, required=False)
    apellido = forms.CharField(max_length=40, required=False)
    cedula = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)
    sexo = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Masculino", "Masculino"), ("Femenino", "Femenino")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    idx = forms.CharField(max_length=40, required=False)
    descripcion = forms.CharField(max_length=120, required=False)
    material_utilizado = forms.CharField(max_length=100, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    trasladado = forms.BooleanField(required=False)

class Formulario_Traslados(forms.Form):
    hospital_trasladado = forms.CharField(max_length=50, required=False)
    medico_receptor = forms.CharField(max_length=50, required=False)
    mpps_cmt = forms.CharField(max_length=20, required=False)
    
# Formulario de Accidentes de Transito
class Formulario_Accidentes_Transito(forms.Form):
    tipo_accidente = forms.ChoiceField(choices=Asignar_opc_tipo_accidente, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    cantidad_lesionado = forms.CharField(max_length=4, required=False)
    material_utilizado = forms.CharField(max_length=30, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    agg_vehiculo = forms.BooleanField(required=False)
    agg_lesionado = forms.BooleanField(required=False)
    
class Formulario_Detalles_Vehiculos(forms.Form):
    modelo = forms.CharField(max_length=30, required=False)
    marca = forms.CharField(max_length=30, required=False)
    color = forms.CharField(max_length=30, required=False)
    año = forms.CharField(max_length=30, required=False)
    placas = forms.CharField(max_length=30, required=False)
    agg_vehiculo = forms.BooleanField(required=False)

class Formulario_Detalles_Vehiculos2(forms.Form):
    modelo = forms.CharField(max_length=30, required=False)
    marca = forms.CharField(max_length=30, required=False)
    color = forms.CharField(max_length=30, required=False)
    año = forms.CharField(max_length=30, required=False)
    placas = forms.CharField(max_length=30, required=False)
    agg_vehiculo = forms.BooleanField(required=False)
    
class Formulario_Detalles_Vehiculos3(forms.Form):
    modelo = forms.CharField(max_length=30, required=False)
    marca = forms.CharField(max_length=30, required=False)
    color = forms.CharField(max_length=30, required=False)
    año = forms.CharField(max_length=30, required=False)
    placas = forms.CharField(max_length=30, required=False)

class Formulario_Detalles_Lesionados(forms.Form):
    nombre = forms.CharField(max_length=40, required=False)
    apellido = forms.CharField(max_length=40, required=False)
    cedula = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)
    sexo = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Masculino", "Masculino"), ("Femenino", "Femenino")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    idx = forms.CharField(max_length=40, required=False)
    descripcion = forms.CharField(max_length=40, required=False)
    trasladado = forms.BooleanField(required=False)

class Formulario_Traslado_Accidente(forms.Form):
    hospital_trasladado = forms.CharField(max_length=50, required=False)
    medico_receptor = forms.CharField(max_length=50, required=False)
    mpps_cmt = forms.CharField(max_length=20, required=False)
    
class Forulario_Evaluacion_Riesgo(forms.Form):
    tipo_riesgo = forms.ChoiceField(choices=Asignar_opc_motivos_riesgo, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    descripcion = forms.CharField(max_length=100, required=False)
    material_utilizado = forms.CharField(max_length=100, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    
class Formulario_Mitigacion_Riesgos(forms.Form):
    tipo_riesgo = forms.ChoiceField(choices=Asignar_opc_motivos_riesgo_mitigacion, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    descripcion = forms.CharField(max_length=100, required=False)
    material_utilizado = forms.CharField(max_length=100, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

class Formulario_Puesto_Avanzada(forms.Form):
    tipo_avanzada = forms.ChoiceField(choices=Asignar_opc_avanzada, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    descripcion = forms.CharField(max_length=100, required=False)
    material_utilizado = forms.CharField(max_length=100, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

class Formulario_Traslados_Prehospitalaria(forms.Form):
    tipo_traslado = forms.ChoiceField(choices=Asignar_opc_traslados, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    nombre = forms.CharField(max_length=40, required=False)
    apellido = forms.CharField(max_length=40, required=False)
    cedula = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)
    sexo = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Masculino", "Masculino"), ("Femenino", "Femenino")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    idx = forms.CharField(max_length=40, required=False)
    hospital_trasladado = forms.CharField(max_length=50, required=False)
    medico_receptor = forms.CharField(max_length=50, required=False)
    mpps_cmt = forms.CharField(max_length=20, required=False)
    descripcion = forms.CharField(max_length=120, required=False)
    material_utilizado = forms.CharField(max_length=120, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

class Formulario_Asesoramiento(forms.Form):
  nombres = forms.CharField(max_length=30, required=False)
  apellidos = forms.CharField(max_length=30, required=False)
  cedula = forms.CharField(max_length=10, required=False)
  telefono = forms.CharField(max_length=12, required=False)
  descripcion = forms.CharField(max_length=100, required=False)
  material_utilizado = forms.CharField(max_length=100, required=False)
  status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

class Formularia_Persona_Presente_Eval(forms.Form):
  nombre = forms.CharField(max_length=40, required=False)
  apellidos = forms.CharField(max_length=40, required=False)
  cedula = forms.CharField(max_length=10, required=False)
  telefono = forms.CharField(max_length=20, required=False)

class Formulario_Reinspeccion_Prevencion(forms.Form):
  nombre = forms.CharField(max_length=40, required=False)
  apellidos = forms.CharField(max_length=40, required=False)
  cedula = forms.CharField(max_length=10, required=False)
  telefono = forms.CharField(max_length=20, required=False)
  descripcion = forms.CharField(max_length=100, required=False)
  material_utilizado = forms.CharField(max_length=100, required=False)
  status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)

class Formulario_Retencion_Preventiva(forms.Form):
    tipo_cilindro = forms.ChoiceField(choices=Asignar_opc_cilindros, widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
    capacidad = forms.CharField(max_length=50, required=False)
    serial = forms.CharField(max_length=50, required=False)
    nro_constancia_retencion = forms.CharField(max_length=50, required=False)
    descripcion = forms.CharField(max_length=100, required=False)
    material_utilizado = forms.CharField(max_length=100, required=False)
    status = forms.ChoiceField(choices=[("", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}), required=False)
