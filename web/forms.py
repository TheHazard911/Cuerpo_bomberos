from django import forms
from.models import *

def Asignar_ops_Personal():
    personal = Personal.objects.all()
    op = [("0", "Seleccione Una Opcion")]
    for persona in personal:
        op.append((str(persona.id), f"{persona.jerarquia} {persona.nombres} {persona.apellidos}"))
    return op

def Asignar_op_Municipios():
    municipios = Municipios.objects.all()
    op = [("0", "Seleccione Una Opcion")]
    for municipio in municipios:
        op.append((str(municipio.id), municipio))
    return op

def Asignar_op_Tipos_Procedimientos():
    procedimientos = Tipos_Procedimientos.objects.all()
    op = [("0", "Seleccione Una Opcion")]
    for procedimiento in procedimientos:
        op.append((str(procedimiento.id), procedimiento))
    return op

def Asignar_opc_tipos_suministros():
     procedimientos = Tipo_Institucion.objects.all()
     op = [("0", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op
   
def Asignar_opc_tipos_apoyos():
     procedimientos = Tipo_apoyo.objects.all()
     op = [("0", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op
 
def Asignar_opc_motivo_prevencion():
     procedimientos = Motivo_Prevencion.objects.all()
     op = [("0", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op

def Asignar_opc_motivo_despliegue():
     procedimientos = Motivo_Despliegue.objects.all()
     op = [("0", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((str(procedimiento.id), procedimiento))
     return op
 
def Asignar_opc_motivo_fals_alarm():
   procedimientos = Motivo_Alarma.objects.all()
   op = [("0", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.motivo))
   return op

def Asignar_opc_tipo_servicios():
   procedimientos = Tipo_servicios.objects.all()
   op = [("0", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.serv_especiales))
   return op

def Asignar_opc_tipo_rescate():
   procedimientos = Tipo_Rescate.objects.all()
   op = [("0", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_rescate))
   return op

def Asignar_opc_tipo_incendio():
   procedimientos = Tipo_Incendio.objects.all()
   op = [("0", "Seleccione Una Opcion")]
   for procedimiento in procedimientos:
       op.append((str(procedimiento.id), procedimiento.tipo_incendio))
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
        required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'})
    )

# Form2 
class SeleccionarInfo(forms.Form):
    solicitante = forms.ChoiceField(choices=Asignar_ops_Personal(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))
    unidad = forms.CharField(max_length=30)
    efectivos_enviados = forms.CharField()
    jefe_comision = forms.ChoiceField(choices=Asignar_ops_Personal(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))

# Form3
class Datos_Ubicacion(forms.Form):
    opc = [("0", "Seleccione una Opcion"),
        ("1", "La Concordia"),
        ("2", "Pedro Maria Morantes"),
        ("3", "San Juan Bautista"),
        ("4", "San Sebastian")
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
    hora = forms.TimeField()

# Form4
class Selecc_Tipo_Procedimiento(forms.Form):
    tipo_procedimiento = forms.ChoiceField(choices=Asignar_op_Tipos_Procedimientos(), required=True,
        widget=forms.Select(attrs={'class': 'disable-first-option'}))

# Formulario Abastecimiento de Agua -- :D
class formulario_abastecimiento_agua(forms.Form):
     tipo_servicio = forms.ChoiceField(choices=Asignar_opc_tipos_suministros(), widget=forms.Select(attrs={'class': 'disable-first-option'}))
     nombres = forms.CharField(max_length=40, required=False)
     apellidos = forms.CharField(max_length=40, required=False)
     cedula = forms.CharField(max_length=10, required=False)
     ltrs_agua = forms.CharField(max_length=10, required=False)
     personas_atendidas = forms.CharField(max_length=10, required=False)
     descripcion = forms.CharField(max_length=40, required=False)
     material_utilizado = forms.CharField(max_length=40, required=False)
     status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Apoyo a otras Unidades
class Formulario_apoyo_unidades(forms.Form):
    tipo_apoyo = forms.ChoiceField(choices=Asignar_opc_tipos_apoyos(), widget=forms.Select(attrs={"class": "disable-first-option"}))
    unidad_apoyada = forms.CharField(max_length=50, required=False)
    descripcion = forms.CharField(max_length=50, required=False)
    material_utilizado = forms.CharField(max_length=50, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Guardia de Prevencion
class Formulario_guardia_prevencion(forms.Form):
     motivo_prevencion = forms.ChoiceField(choices=Asignar_opc_motivo_prevencion(), widget=forms.Select(attrs={"class": "disable-first-option"}))
     descripcion = forms.CharField(max_length=50, required=False)
     material_utilizado = forms.CharField(max_length=50, required=False)
     status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Atendido no Efectuado 
class Formulario_atendido_no_efectuado(forms.Form):
     descripcion = forms.CharField(max_length=50, required=False)
     material_utilizado = forms.CharField(max_length=50, required=False)
     status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Despliegue de Seguridad 
class Formulario_despliegue_seguridad(forms.Form):
     motv_despliegue = forms.ChoiceField(choices=Asignar_opc_motivo_despliegue(),label="Motivo Despliegue", widget=forms.Select(attrs={"class": "disable-first-option"}))
     descripcion = forms.CharField(max_length=50, required=False)
     material_utilizado = forms.CharField(max_length=50, required=False)
     status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Falsa Alarma 
class Formulario_falsa_alarma(forms.Form):
   motv_alarma = forms.ChoiceField(choices=Asignar_opc_motivo_fals_alarm(),label="Motivo Alarma", widget=forms.Select(attrs={"class": "disable-first-option"}))
   descripcion = forms.CharField(max_length=50, required=False)
   material_utilizado = forms.CharField(max_length=50, required=False)
   status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))
   
# Formulario Servicios Especiales
class Formulario_Servicios_Especiales(forms.Form):
   tipo_servicio = forms.ChoiceField(choices=Asignar_opc_tipo_servicios(),label="Motivo Servicio", widget=forms.Select(attrs={"class": "disable-first-option"}))
   descripcion = forms.CharField(max_length=50, required=False)
   material_utilizado = forms.CharField(max_length=50, required=False)
   status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulatio Fallecidos
class Formulario_Fallecidos(forms.Form):
    motivo_fallecimiento = forms.CharField(max_length=50, required=False)
    nom_fallecido = forms.CharField(max_length=40, required=False)
    apellido_fallecido = forms.CharField(max_length=40, required=False)
    cedula_fallecido = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)
    sexo = forms.CharField(max_length=10, required=False)
    descripcion = forms.CharField(max_length=50, required=False)
    material_utilizado = forms.CharField(max_length=50, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))

# Formulario Rescate
class Formulario_Rescate(forms.Form):
    material_utilizado = forms.CharField(max_length=50, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))
    tipo_rescate = forms.ChoiceField(choices=Asignar_opc_tipo_rescate, widget=forms.Select(attrs={"class": "disable-first-option"}))
    
class Formulario_Rescate_Persona(forms.Form):
    nombre_persona = forms.CharField(max_length=30, required=False)
    apellido_persona = forms.CharField(max_length=30, required=False)
    cedula_persona = forms.CharField(max_length=10, required=False)
    edad_persona = forms.CharField(max_length=3, required=False)
    sexo_persona = forms.CharField(max_length=10, required=False)
    descripcion = forms.CharField(max_length=40, required=False)
    
class Formulario_Rescate_Animal(forms.Form):
    especie = forms.CharField(max_length=30, required=False)
    descripcion = forms.CharField(max_length=40, required=False)

# Formulario de Incendio
class Formulario_Incendio(forms.Form):
    tipo_incendio = forms.ChoiceField(choices=Asignar_opc_tipo_incendio, widget=forms.Select(attrs={"class": "disable-first-option"}))
    descripcion = forms.CharField(max_length=30, required=False)
    material_utilizado = forms.CharField(max_length=30, required=False)
    status = forms.ChoiceField(choices=[("-", "Seleccione Una Opcion"), ("Culminado", "Culminado"), ("En Proceso", "En Proceso")], widget=forms.Select(attrs={"class": "disable-first-option"}))
    check_agregar_persona = forms.BooleanField()
    check_agregar_vehiculo = forms.BooleanField()
    
class Formulario_Persona_Presente(forms.Form):
    nombre = forms.CharField(max_length=30, required=False)
    apellido = forms.CharField(max_length=30, required=False)
    cedula = forms.CharField(max_length=10, required=False)
    edad = forms.CharField(max_length=3, required=False)

class Formulario_Detalles_Vehiculos(forms.Form):
    modelo = forms.CharField(max_length=40, required=40)
    marca = forms.CharField(max_length=40, required=40)
    color = forms.CharField(max_length=40, required=40)
    año = forms.CharField(max_length=40, required=40)
    placas = forms.CharField(max_length=40, required=40)
    