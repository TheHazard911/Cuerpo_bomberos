from django.shortcuts import render, redirect
from django.http import HttpRequest
from .models import Usuarios

# Create your views here.
def Home(request):
    if request.method == "GET":
        return render(request, "index.html")
    else:
        usuario = request.POST["user"]
        contrasena = request.POST["password"]
        users = Usuarios.objects.values()
        
        for user in users:
            if usuario == user["user"] and contrasena == user["password"]:
                print("YES")
                return redirect("/dashboard/")
            else:
                print("NO")
        return redirect("/home/", {
            "respuesta": False
        })

def Dashboard(request):
    return render(request, "dashboard.html")