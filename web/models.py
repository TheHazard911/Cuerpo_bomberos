from django.db import models

# Crear Modelos (Bases de datos) propios.
class Usuarios(models.Model):
    user = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    