"""
URL configuration for Web_App project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from web.views import *

#Se crean las rutas que se podran visitar en la aplicacion web.
urlpatterns = [
    path('alpha04/', admin.site.urls),
    path('login/', Home, name="home"),
    path('', Blog, name="blog"),
    path('dashboard/', Dashboard,name='dashboard') ,
    path('personal/', View_personal) ,
    path('prueba/', Prueba),
    path('tablageneral/', tabla_general),
    path('procedimientos/', View_Procedimiento, name='view_procedimiento'),
    path('estadisticas/', View_Estadisticas),
    path('rescate/', View_Rescate),
    path('operaciones/', View_Operaciones),
    path('prevencion/', View_Prevencion),
    path('prehospitalaria/', View_prehospitalaria),
    path('grumae/', View_grumae),
    path('capacitacion/', View_capacitacion),
    path('enfermeria/', View_enfermeria),
    path('serviciosmedicos/', View_serviciosmedicos),
    path('psicologia/', View_psicologia),
    path('api/procedimientos/<int:id>/', obtener_procedimiento, name='obtener_procedimiento'),
    path('api/meses/', obtener_meses, name='obtener_meses'),
    path('api/porcentajes/<str:periodo>/', obtener_porcentajes, name='api_porcentajes'),
    path('logout/', logout, name='logout'),
    path('api/parroquias/', obtener_procedimientos_parroquias, name='obtener_parroquias'),
    path('api/divisiones/', obtener_divisiones, name='obtener_divisiones'),
    path('descargar-excel/', generar_excel, name='descargar_excel'),
]
