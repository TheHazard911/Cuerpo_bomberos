from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Usuarios)
admin.site.register(Personal)
admin.site.register(Divisiones)
admin.site.register(Municipios)
admin.site.register(Parroquias)
admin.site.register(Tipos_Procedimientos)
admin.site.register(Procedimientos)
admin.site.register(Abastecimiento_agua)
admin.site.register(Apoyo_Unidades)
admin.site.register(Guardia_prevencion)
admin.site.register(Tipo_Institucion)
admin.site.register(Tipo_apoyo)
admin.site.register(Motivo_Prevencion)
admin.site.register(Atendido_no_Efectuado)
admin.site.register(Despliegue_Seguridad)
admin.site.register(Motivo_Despliegue)
admin.site.register(Fallecidos)
admin.site.register(Falsa_Alarma)
admin.site.register(Servicios_Especiales)
admin.site.register(Rescate)
admin.site.register(Tipo_Rescate)
admin.site.register(Rescate_Persona)
admin.site.register(Rescate_Animal)
admin.site.register(Tipo_servicios)

