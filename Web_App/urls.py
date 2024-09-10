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
from web.views import Home, Dashboard, Prueba,View_Procedimiento,View_Estadisticas,View_Operaciones

#Se crean las rutas que se podran visitar en la aplicacion web.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Home),
    path('dashboard/', Dashboard),
    path('prueba/', Prueba),
    path('procedimientos/', View_Procedimiento),
    path('estadisticas/', View_Estadisticas),
    path('operaciones/', View_Operaciones),
]
