from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Usuarios, Divisiones, Procedimientos
# from django.utils import timezone
# from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import *
from .models import *
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
            "form": formulario_abastecimiento_agua(),
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
            "form": formulario_abastecimiento_agua(),
            })
  
# Vista de archivo para hacer pruebas de backend
def View_Procedimiento(request):
    user = request.session.get('user')    
    if not user:
        return redirect('/')

    result = None

    if request.method == 'POST':
        form = SelectorDivision(request.POST, prefix='form1')
        form2 = SeleccionarInfo(request.POST, prefix='form2')
        form3 = Datos_Ubicacion(request.POST, prefix='form3')
        form4 = Selecc_Tipo_Procedimiento(request.POST, prefix='form4')
        abast_agua = formulario_abastecimiento_agua(request.POST, prefix='abast_agua')
        apoyo_unid = Formulario_apoyo_unidades(request.POST, prefix='apoyo_unid')
        guard_prev = Formulario_guardia_prevencion(request.POST, prefix='guard_prev')   
        atend_no_efec = Formulario_atendido_no_efectuado(request.POST, prefix='atend_no_efec')   

        # Imprimir request.POST para depuración

        if not form.is_valid():
            print("Errores en form1:", form.errors)
            result = True
        if not form2.is_valid():
            print("Errores en form2:", form2.errors)
            result = True
        if not form3.is_valid():
            print("Errores en form3:", form3.errors)
            result = True
        if not form4.is_valid():
            print("Errores en form4:", form4.errors)
            result = True

        if form.is_valid() and form2.is_valid() and form3.is_valid() and form4.is_valid():
            result = False
            
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
            
            if tipo_procedimiento == "1" and abast_agua.is_valid():
                id_tipo_servicio = abast_agua.cleaned_data["tipo_servicio"]          
                nombres = abast_agua.cleaned_data["nombres"]
                apellidos = abast_agua.cleaned_data["apellidos"]
                cedula = abast_agua.cleaned_data["cedula"]
                ltrs_agua = abast_agua.cleaned_data["ltrs_agua"]
                personas_atendidas = abast_agua.cleaned_data["personas_atendidas"]
                descripcion = abast_agua.cleaned_data["descripcion"]
                material_utilizado = abast_agua.cleaned_data["material_utilizado"]
                status = abast_agua.cleaned_data["status"]
                
                tipo_servicio_instance = Tipo_Institucion.objects.get(id=id_tipo_servicio)
               
                # Crear y guardar la instancia de Abastecimiento_agua
                nuevo_abast_agua = Abastecimiento_agua(
                    id_procedimiento=nuevo_procedimiento,
                    id_tipo_servicio=tipo_servicio_instance,
                    nombres=nombres,
                    apellidos=apellidos,
                    cedula=cedula,
                    ltrs_agua=ltrs_agua,
                    personas_atendidas=personas_atendidas,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                nuevo_abast_agua.save()
            
                return redirect('/dashboard/')
        
            if tipo_procedimiento == "2" and apoyo_unid.is_valid():
                tipo_apoyo = apoyo_unid.cleaned_data["tipo_apoyo"]          
                unidad_apoyada = apoyo_unid.cleaned_data["unidad_apoyada"]
                descripcion = apoyo_unid.cleaned_data["descripcion"]
                material_utilizado = apoyo_unid.cleaned_data["material_utilizado"]
                status = apoyo_unid.cleaned_data["status"]
                
                tipo_apoyo_instance = Tipo_apoyo.objects.get(id=tipo_apoyo)
                print("Datos Obtenidos")
                
                nuevo_apoyo_unidad = Apoyo_Unidades(
                    id_procedimiento=nuevo_procedimiento,
                    id_tipo_apoyo=tipo_apoyo_instance,
                    unidad_apoyada=unidad_apoyada,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nuevo_apoyo_unidad)
                nuevo_apoyo_unidad.save()
            
                return redirect('/dashboard/')
                
            if tipo_procedimiento == "3" and guard_prev.is_valid():
                mot_prevencion = guard_prev.cleaned_data["motivo_prevencion"]          
                descripcion = guard_prev.cleaned_data["descripcion"]
                material_utilizado = guard_prev.cleaned_data["material_utilizado"]
                status = guard_prev.cleaned_data["status"]
                
                Tipo_Motivo_instance = Motivo_Prevencion.objects.get(id=mot_prevencion)
                print("Datos Obtenidos")
                
                nuevo_guard_prevencion = Guardia_prevencion(
                    id_procedimiento=nuevo_procedimiento,
                    id_motivo_prevencion=Tipo_Motivo_instance,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nuevo_guard_prevencion)
                nuevo_guard_prevencion.save()
            
                return redirect('/dashboard/')
                
            if tipo_procedimiento == "4" and atend_no_efec.is_valid():          
                descripcion = atend_no_efec.cleaned_data["descripcion"]
                material_utilizado = atend_no_efec.cleaned_data["material_utilizado"]
                status = atend_no_efec.cleaned_data["status"]
                
                print("Datos Obtenidos")
                
                nuevo_atend_no_efect = Atendido_no_Efectuado(
                    id_procedimiento=nuevo_procedimiento,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nuevo_atend_no_efect)
                nuevo_atend_no_efect.save()
            
                return redirect('/dashboard/')
                
    else:
        form = SelectorDivision(prefix='form1')
        form2 = SeleccionarInfo(prefix='form2')
        form3 = Datos_Ubicacion(prefix='form3')
        form4 = Selecc_Tipo_Procedimiento(prefix='form4')
        abast_agua = formulario_abastecimiento_agua(prefix='abast_agua')
        apoyo_unid = Formulario_apoyo_unidades(prefix='apoyo_unid')
        guard_prev = Formulario_guardia_prevencion(prefix='guard_prev')
        atend_no_efec = Formulario_atendido_no_efectuado(prefix='atend_no_efec')

    return render(request, "procedimientos.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "form": form,
        "form2": form2,
        "form3": form3,
        "form4": form4,
        "errors": result,
        "form_abastecimiento_agua": abast_agua,
        "form_apoyo_unidades": apoyo_unid,
        "form_guardia_prevencion": guard_prev,
        "form_atendido_no_efectuado": atend_no_efec,
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

# Vista de la Seccion de Operaciones
def View_Rescate(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 1)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/rescate.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_Prevencion(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 3)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/prevencion.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_grumae(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 4)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/grumae.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_prehospitalaria(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 5)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/prehospitalaria.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_capacitacion(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 9)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/capacitacion.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_enfermeria(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 6)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/enfermeria.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_serviciosmedicos(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 7)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/serviciosmedicos.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "datos": datos,
    })

def View_psicologia(request):
    user = request.session.get('user')    
    if not user:
            return redirect('/')
        
    datos = Procedimientos.objects.filter(id_division = 8)

    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        procedimiento = get_object_or_404(Procedimientos, id=id)
        try:
            procedimiento.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return render(request, "Divisiones/psicologia.html", {
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
