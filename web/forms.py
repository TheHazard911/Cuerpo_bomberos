from django import forms
from.models import Personal, Municipios, Tipos_Procedimientos, Tipo_Institucion

def Asignar_ops_Personal():
    personal = Personal.objects.all()
    i = 1
    op = [("0", "Seleccione Una Opcion")]
    for persona in personal:
        op.append((i, f"{persona.jerarquia} {persona.nombres} {persona.apellidos}"))
        i+=1
    return op

def Asignar_op_Municipios():
    municipios = Municipios.objects.all()
    i = 1
    op = [("0", "Seleccione Una Opcion")]
    for municipio in municipios:
        op.append((i, municipio))
        i+=1
    return op

def Asignar_op_Tipos_Procedimientos():
    procedimientos = Tipos_Procedimientos.objects.all()
    i = 1
    op = [("0", "Seleccione Una Opcion")]
    for procedimiento in procedimientos:
        op.append((i, procedimiento))
        i+=1
    return op

def Asignar_opc_tipos_suministros():
     procedimientos = Tipo_Institucion.objects.all()
     i = 1
     op = [("0", "Seleccione Una Opcion")]
     for procedimiento in procedimientos:
         op.append((i, procedimiento))
         i+=1
     return op

# Form1
class SelectorDivision(forms.Form):
    op = [
        ("", "Seleccione una Opción"),
        ("1", "Rescate"),
        ("2", "Operaciones"),
        ("3", "Prevención"),
        ("4", "Prehospitalaria"),
        ("5", "Enfermería"),
        ("6", "Servicios Médicos"),
        ("7", "Psicología"),
        ("8", "Capacitación"),
        ("9", "GRUMAE"),
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
    
     tipo_servicio = forms.ChoiceField(choices=Asignar_opc_tipos_suministros(), required=True, widget=forms.Select(attrs={'class': 'disable-first-option'}))
     nombres = forms.CharField(max_length=40)
     apellidos = forms.CharField(max_length=40)
     cedula = forms.CharField(max_length=10)
     ltrs_agua = forms.CharField(max_length=10)
     personas_atendidas = forms.CharField(max_length=10)
     descripcion = forms.CharField(max_length=40)
     material_utilizado = forms.CharField(max_length=40)
     status = forms.CharField(max_length=20)