from django.shortcuts import render, redirect
from django.http import HttpRequest
from .models import Usuarios, Personal, Divisiones, Procedimientos
# from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib import messages


# Create your views here.

# Vista de la Ventana Inicial (Login)
def Home(request):
    if request.method == "GET":
        return render(request, "index.html")
    else:
        usuario = request.POST["user"]
        contrasena = request.POST["password"]
        try:
            user = Usuarios.objects.get(user=usuario, password=contrasena)
            encargado = user.encargado  # Obtener el encargado relacionado
            # Guardar datos en la sesión
            request.session['user'] = {
                "user": user.user,
                "jerarquia": encargado.jerarquia,
                "nombres": encargado.nombres,
                "apellidos": encargado.apellidos,
            }
            return redirect("/dashboard/")
        except Usuarios.DoesNotExist:
            messages.error(request, 'Usuario o contraseña incorrectos')
            return redirect("/")
          
@login_required
def Dashboard(request):
    user = request.session.get('user')
    
    if not user:
        return redirect('/')
    
    return render(request, "dashboard.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
    })

# Vista de archivo para hacer pruebas de backend
def Prueba(request):
  usuarios = Usuarios.objects.all()
  divisiones = Divisiones.objects.all()
  procedimientos = Procedimientos.objects.all()

  return render(request, "prueba.html", {
    "usuarios": usuarios,
    "divisiones": divisiones,
    "procedimientos": procedimientos,
  })
  
# Vista de archivo para hacer pruebas de backend
@login_required
def View_Procedimiento(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')

    return render(request, "procedimientos.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
    })
@login_required
def View_Estadisticas(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')

    return render(request, "estadisticas.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
    })
    
@login_required
def View_Operaciones(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')

    return render(request, "Divisiones/operaciones.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
    })