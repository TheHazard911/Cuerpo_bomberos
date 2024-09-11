from django import forms
from.models import Personal, Municipios, Parroquias, Tipos_Procedimientos

def Asignar_ops_Personal():
    personal = Personal.objects.all()
    i = 1
    op = [("0", "Seleccionar Una Opcion")]
    for persona in personal:
        op.append((i, f"{persona.jerarquia} {persona.nombres} {persona.apellidos}"))
        i+=1
    return op

def Asignar_op_Municipios():
    municipios = Municipios.objects.all()
    i = 1
    op = [("0", "Seleccionar Una Opcion")]
    for municipio in municipios:
        op.append((i, municipio))
        i+=1
    return op

def Asignar_op_Tipos_Procedimientos():
    procedimientos = Tipos_Procedimientos.objects.all()
    i = 1
    op = [("0", "Seleccionar Una Opcion")]
    for procedimiento in procedimientos:
        op.append((i, procedimiento))
        i+=1
    return op

# Creacion de Formularios que se podran mostrar en el sitio web.
class PruebaForm(forms.Form):
    nombre = forms.CharField(max_length=100)
    correo = forms.EmailField()
    edad = forms.IntegerField()
    acepto_terminos = forms.BooleanField()
    fecha_nacimiento = forms.DateField(widget=forms.SelectDateWidget)
    fecha_evento = forms.DateTimeField()
    opciones = forms.ChoiceField(choices=[('1', 'Opción 1'), ('2', 'Opción 2')])
    categorias = forms.MultipleChoiceField(choices=[('a', 'Categoría A'), ('b', 'Categoría B')])
    sitio_web = forms.URLField()
    archivo = forms.FileField()
    imagen = forms.ImageField()
    comentario = forms.CharField(widget=forms.Textarea)
    contraseña = forms.CharField(widget=forms.PasswordInput)
    genero = forms.ChoiceField(choices=[('M', 'Masculino'), ('F', 'Femenino')], widget=forms.RadioSelect)
    
class SelectorDivision(forms.Form):
    op = [("0", "Seleccione una Opcion"),
          ("1", "Rescate"),
          ("2", "Operaciones"),
          ("3", "Prevencion"),
          ("4", "Prehospitalaria"),
          ("5", "Enfermeria"),
          ("6", "Servicios Medicos"),
          ("7", "Psicologia"),
          ("8", "Capacitacion"),
          ("9", "GRUMAE"),
          ]
    opciones = forms.ChoiceField(label="Seleccionar Division", initial="0", choices=op)
    
class SeleccionarInfo(forms.Form):
    solicitante = forms.ChoiceField(choices=Asignar_ops_Personal())
    unidad = forms.CharField(max_length=30)
    efectivos_enviados = forms.CharField()
    jefe_comision = forms.ChoiceField(choices=Asignar_ops_Personal())

class Datos_Ubicacion(forms.Form):
    opc = [("0", "Seleccione una Opcion"),
        ("1", "La Concordia"),
        ("2", "Pedro Maria Morantes"),
        ("3", "San Juan Bautista"),
        ("4", "San Sebastian")
    ]
    
    municipio = forms.ChoiceField(choices=Asignar_op_Municipios())
    parroquia = forms.ChoiceField(choices=opc, required=False)
    direccion = forms.CharField(max_length=100)
    fecha =  forms.DateField(
        label="Fecha",
        widget=forms.DateInput(attrs={'type': 'date'})
    )
    hora = forms.TimeField()
    
class Selecc_Tipo_Procedimiento(forms.Form):
    tipo_procedimiento = forms.ChoiceField(choices=Asignar_op_Tipos_Procedimientos())