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