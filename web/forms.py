from django import forms
from.models import Personal

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
    opciones = forms.ChoiceField(choices=op)
    
class SeleccionarInfo(forms.Form):
    personal = Personal.objects.all()
    i = 1
    op = []
    for persona in personal:
        op.append((i, f"{persona.jerarquia} {persona.nombres} {persona.apellidos}"))
        i+=1
    print(op)
    
    opciones = forms.ChoiceField(choices=op)