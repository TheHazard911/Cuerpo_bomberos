from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Usuarios, Divisiones, Procedimientos
# from django.utils import timezone
# from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import Selecc_Tipo_Procedimiento
from .forms import SelectorDivision, SeleccionarInfo, Datos_Ubicacion, Selecc_Tipo_Procedimiento
from .models import Procedimientos, Personal, Tipos_Procedimientos, Municipios, Parroquias
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json

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
            return render(request, 'index.html', {'error': True})
          
def Dashboard(request):
    user = request.session.get('user')
    
    if not user:
        return redirect('/')
    
    concordia = Procedimientos.objects.filter(id_parroquia = 1).count()
    pedro_m = Procedimientos.objects.filter(id_parroquia = 2).count()
    san_juan = Procedimientos.objects.filter(id_parroquia = 3).count()
    san_sebastian = Procedimientos.objects.filter(id_parroquia = 4).count()
    
    return render(request, "dashboard.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "concordia": concordia,
        "pedro_m": pedro_m,
        "san_juan": san_juan,
        "san_sebastian": san_sebastian,
    })

# Vista de archivo para hacer pruebas de backend
def Prueba(request):
    
    if request.method == 'POST':
        form = Selecc_Tipo_Procedimiento(request.POST)
        if form.is_valid():
            
            usuarios = Usuarios.objects.all()
            divisiones = Divisiones.objects.all()
            procedimientos = Procedimientos.objects.all()
            
            valor_seleccionado = form.cleaned_data['tipo_procedimiento']
            # Aquí puedes hacer algo con el valor seleccionado
            print(valor_seleccionado)
            return render(request, "prueba.html", {
            "usuarios": usuarios,
            "divisiones": divisiones,
            "procedimientos": procedimientos,
            "form": Selecc_Tipo_Procedimiento(),
            })
    else:
        form = Selecc_Tipo_Procedimiento(),
    
        usuarios = Usuarios.objects.all()
        divisiones = Divisiones.objects.all()
        procedimientos = Procedimientos.objects.all()
        
        return render(request, "prueba.html", {
            "usuarios": usuarios,
            "divisiones": divisiones,
            "procedimientos": procedimientos,
            "form": Selecc_Tipo_Procedimiento(),
            })
  
# Vista de archivo para hacer pruebas de backend
def View_Procedimiento(request):
    user = request.session.get('user')    
    if not user:
        return redirect('/')

    if request.method == 'POST':
        form = SelectorDivision(request.POST, prefix='form1')
        form2 = SeleccionarInfo(request.POST, prefix='form2')
        form3 = Datos_Ubicacion(request.POST, prefix='form3')
        form4 = Selecc_Tipo_Procedimiento(request.POST, prefix='form4')

        # Imprimir request.POST para depuración
        
        #  Imprimir errores de validación
        if not form.is_valid():
             print("Errores en form1:", form.errors)
        if not form2.is_valid():
             print("Errores en form2:", form2.errors)
        if not form3.is_valid():
             print("Errores en form3:", form3.errors)
        if not form4.is_valid():
             print("Errores en form4:", form4.errors)

        if form.is_valid() and form2.is_valid() and form3.is_valid() and form4.is_valid():
            division = form.cleaned_data["opciones"]
            solicitante = form2.cleaned_data["solicitante"]
            unidad = form2.cleaned_data["unidad"]
            efectivos_enviados = form2.cleaned_data["efectivos_enviados"]
            jefe_comision = form2.cleaned_data["jefe_comision"]
            municipio = form3.cleaned_data["municipio"]
            direccion = form3.cleaned_data["direccion"]
            fecha = form3.cleaned_data["fecha"]
            hora = form3.cleaned_data["hora"]
            tipo_procedimiento = form4.cleaned_data["tipo_procedimiento"]
            parroquia = form3.cleaned_data["parroquia"]

            print(form3.cleaned_data)  # Añade esta línea para ver los datos limpiados
            print(parroquia)  # Añade esta línea para ver el valor de parroquia

            division_instance = Divisiones.objects.get(id=division)
            solicitante_instance = Personal.objects.get(id=solicitante)
            jefe_comision_instance = Personal.objects.get(id=jefe_comision)
            municipio_instance = Municipios.objects.get(id=municipio)
            tipo_procedimiento_instance = Tipos_Procedimientos.objects.get(id=tipo_procedimiento)

            # Crear una nueva instancia del modelo Procedimientos
            nuevo_procedimiento = Procedimientos(
                id_division=division_instance,
                id_solicitante=solicitante_instance,
                unidad=unidad,
                efectivos_enviados=efectivos_enviados,
                id_jefe_comision=jefe_comision_instance,
                id_municipio=municipio_instance,
                direccion=direccion,
                fecha=fecha,
                hora=hora,
                id_tipo_procedimiento=tipo_procedimiento_instance
            )

            # Solo asignar parroquia si está presente
            if parroquia:
                parroquia_instance = Parroquias.objects.get(id=parroquia)
                nuevo_procedimiento.id_parroquia = parroquia_instance

            nuevo_procedimiento.save()
            
            # Aquí puedes hacer algo con los valores validados
            return redirect("/dashboard/")
    
    else:
        form = SelectorDivision(prefix='form1')
        form2 = SeleccionarInfo(prefix='form2')
        form3 = Datos_Ubicacion(prefix='form3')
        form4 = Selecc_Tipo_Procedimiento(prefix='form4')

    return render(request, "procedimientos.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "form": form,
        "form2": form2,
        "form3": form3,
        "form4": form4,
    })
    
# Vista de la Seccion de Estadisticas
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
    
# Vista de la Seccion de Operaciones
def View_Operaciones(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 2)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/operaciones.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

# Funcion para eliminar (NO TOCAR)
# def eliminar_procedimiento(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         id = data.get('id')
#         procedimiento = get_object_or_404(Procedimientos, id=id)
#         try:
#             procedimiento.delete()
#             return JsonResponse({'success': True})
#         except Exception as e:
#             return JsonResponse({'success': False, 'error': str(e)})