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
from datetime import datetime

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
    
    # Obtener la fecha de hoy
    hoy = datetime.now().date()

    # Consultas de procedimientos para cada parroquia
    otros_municipios = Procedimientos.objects.filter(id_parroquia=0)
    concordia = Procedimientos.objects.filter(id_parroquia=1)
    pedro_m = Procedimientos.objects.filter(id_parroquia=2)
    san_juan = Procedimientos.objects.filter(id_parroquia=3)
    san_sebastian = Procedimientos.objects.filter(id_parroquia=4)

    # Filtrar procedimientos por la fecha de hoy para cada parroquia
    otros_municipios_hoy = otros_municipios.filter(fecha=hoy).count()
    concordia_hoy = concordia.filter(fecha=hoy).count()
    pedro_m_hoy = pedro_m.filter(fecha=hoy).count()
    san_juan_hoy = san_juan.filter(fecha=hoy).count()
    san_sebastian_hoy = san_sebastian.filter(fecha=hoy).count()

    # Renderizar la página con los datos
    return render(request, "dashboard.html", {
        "user": user,
        "jerarquia": user["jerarquia"],
        "nombres": user["nombres"],
        "apellidos": user["apellidos"],
        "concordia": concordia_hoy,
        "pedro_m": pedro_m_hoy,
        "san_juan": san_juan_hoy,
        "san_sebastian": san_sebastian_hoy,
        "otros_municipios": otros_municipios_hoy,
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
            "form": Formulario_Incendio(),
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
            "form": Formulario_Traslado_Accidente(),
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
        desp_seguridad = Formulario_despliegue_seguridad(request.POST, prefix='desp_seguridad')   
        fals_alarm = Formulario_falsa_alarma(request.POST, prefix='fals_alarm')   
        serv_especial = Formulario_Servicios_Especiales(request.POST, prefix='serv_especial')   
        form_fallecido = Formulario_Fallecidos(request.POST, prefix='form_fallecido')   
        rescate_form = Formulario_Rescate(request.POST, prefix='rescate_form')
        incendio_form = Formulario_Incendio(request.POST, prefix='incendio_form')
        atenciones_paramedicas = Formulario_Atenciones_Paramedicas(request.POST, prefix='atenciones_paramedicas')
        
        emergencias_medicas = Formulario_Emergencias_Medicas(request.POST, prefix='emergencias_medicas')
        traslados_emergencias = Formulario_Traslados(request.POST, prefix='traslados_emergencias')
        
        persona_presente_form = Formulario_Persona_Presente(request.POST, prefix='persona_presente_form')
        detalles_vehiculo_form = Formulario_Detalles_Vehiculos(request.POST, prefix='detalles_vehiculo_form')
        
        formulario_accidentes_transito = Formulario_Accidentes_Transito(request.POST, prefix='formulario_accidentes_transito')
        detalles_lesionados_accidentes = Formulario_Detalles_Lesionados(request.POST, prefix='detalles_lesionados_accidentes')
        traslados_accidentes = Formulario_Traslado_Accidente(request.POST, prefix='traslados_accidentes')
        detalles_vehiculo_accidentes = Formulario_Detalles_Vehiculos(request.POST, prefix='detalles_vehiculos_accidentes')
        detalles_vehiculo_accidentes2 = Formulario_Detalles_Vehiculos2(request.POST, prefix='detalles_vehiculos_accidentes2')
        detalles_vehiculo_accidentes3 = Formulario_Detalles_Vehiculos3(request.POST, prefix='detalles_vehiculos_accidentes3')
        
        rescate_form_persona = Formulario_Rescate_Persona(request.POST, prefix='rescate_form_persona')   
        rescate_form_animal = Formulario_Rescate_Animal(request.POST, prefix='rescate_form_animal')   

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
            
            # # Crear una nueva instancia del modelo Procedimientos
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
            
            # # Solo asignar parroquia si está presente
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
            
            if tipo_procedimiento == "5" and desp_seguridad.is_valid():          
                descripcion = desp_seguridad.cleaned_data["descripcion"]
                material_utilizado = desp_seguridad.cleaned_data["material_utilizado"]
                status =desp_seguridad.cleaned_data["status"]
                motv_despliegue = desp_seguridad.cleaned_data["motv_despliegue"]
                
                Tipo_Motivo_instance = Motivo_Despliegue.objects.get(id=motv_despliegue)
                print("Datos Obtenidos")
                
                desp_seguridad = Despliegue_Seguridad(
                    id_procedimiento=nuevo_procedimiento,
                    motivo_despliegue = Tipo_Motivo_instance,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(desp_seguridad)
                desp_seguridad.save()
            
                return redirect('/dashboard/')
            
            if tipo_procedimiento == "6" and fals_alarm.is_valid():          
                descripcion = fals_alarm.cleaned_data["descripcion"]
                material_utilizado = fals_alarm.cleaned_data["material_utilizado"]
                status = fals_alarm.cleaned_data["status"]
                motv_alarma = fals_alarm.cleaned_data["motv_alarma"]
                
                Tipo_Motivo_instance = Motivo_Alarma.objects.get(id=motv_alarma)
                print("Datos Obtenidos")
                
                nueva_falsa_alarma = Falsa_Alarma(
                    id_procedimiento=nuevo_procedimiento,
                    motivo_alarma = Tipo_Motivo_instance,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nueva_falsa_alarma)
                nueva_falsa_alarma.save()
            
                return redirect('/dashboard/')
                
            if tipo_procedimiento == "7" and atenciones_paramedicas.is_valid():          
                
                tipo_atencion = atenciones_paramedicas.cleaned_data["tipo_atencion"]
                
                nueva_atencion_paramedica = Atenciones_Paramedicas(
                  id_procedimientos = nuevo_procedimiento,
                  tipo_atencion = tipo_atencion
                )
                nueva_atencion_paramedica.save()
                
                print(tipo_atencion, "Todo chido aqui tambien")
                
                if tipo_atencion == "Emergencias Medicas" and emergencias_medicas.is_valid():
                    nombre = emergencias_medicas.cleaned_data["nombre"]
                    apellido = emergencias_medicas.cleaned_data["apellido"]
                    cedula = emergencias_medicas.cleaned_data["cedula"]
                    edad = emergencias_medicas.cleaned_data["edad"]
                    sexo = emergencias_medicas.cleaned_data["sexo"]
                    idx = emergencias_medicas.cleaned_data["idx"]
                    descripcion = emergencias_medicas.cleaned_data["descripcion"]
                    material_utilizado = emergencias_medicas.cleaned_data["material_utilizado"]
                    status = emergencias_medicas.cleaned_data["status"]
                    trasladado = emergencias_medicas.cleaned_data["trasladado"]
                    
                    print("Todo Chido en emeergencias Medicas")
                    nueva_emergencia_medica = Emergencias_Medicas(
                       id_atencion = nueva_atencion_paramedica,
                       nombres = nombre,
                       apellidos = apellido,
                       cedula = cedula,
                       edad = edad,
                       sexo = sexo,
                       idx = idx,
                       descripcion = descripcion,
                       material_utilizado = material_utilizado,
                       status = status,
                    )
                    nueva_emergencia_medica.save()
                
                    print(trasladado)
                    
                    if trasladado == True and traslados_emergencias.is_valid():
                        hospital = traslados_emergencias.cleaned_data["hospital_trasladado"]
                        medico = traslados_emergencias.cleaned_data["medico_receptor"]
                        mpps_cmt = traslados_emergencias.cleaned_data["mpps_cmt"]
                        
                        print("Todo Chido En el Traslado")
                        
                        nuevo_traslado_emergencia = Traslado(
                           id_lesionado = nueva_emergencia_medica,
                           hospital_trasladado = hospital,
                           medico_receptor = medico,
                           mpps_cmt = mpps_cmt,
                        )
                        nuevo_traslado_emergencia.save()
                
                if tipo_atencion == "Accidentes de Transito" and formulario_accidentes_transito.is_valid():
                    tipo_accidente = formulario_accidentes_transito.cleaned_data["tipo_accidente"]
                    cantidad_lesionado = formulario_accidentes_transito.cleaned_data["cantidad_lesionado"]
                    material_utilizado = formulario_accidentes_transito.cleaned_data["material_utilizado"]
                    status = formulario_accidentes_transito.cleaned_data["status"]
                    agg_vehiculo = formulario_accidentes_transito.cleaned_data["agg_vehiculo"]
                    agg_lesionado = formulario_accidentes_transito.cleaned_data["agg_lesionado"]
                    
                    tipo_accidente_instance = Tipo_Accidente.objects.get(id=tipo_accidente)
                    
                    print("Todo Chido Accidentes de Transito:  ", agg_vehiculo, agg_lesionado)
                    
                    nuevo_accidente_transito = Accidentes_Transito(
                      id_atencion = nueva_atencion_paramedica,
                      tipo_de_accidente = tipo_accidente_instance,
                      cantidad_lesionados = cantidad_lesionado,
                      material_utilizado = material_utilizado,
                      status = status,
                    )
                    nuevo_accidente_transito.save()
                    
                    if agg_vehiculo == True and detalles_vehiculo_accidentes.is_valid():
                        modelo1 = detalles_vehiculo_accidentes.cleaned_data["modelo"]
                        marca1 = detalles_vehiculo_accidentes.cleaned_data["marca"]
                        color1 = detalles_vehiculo_accidentes.cleaned_data["color"]
                        año1 = detalles_vehiculo_accidentes.cleaned_data["año"]
                        placas1 = detalles_vehiculo_accidentes.cleaned_data["placas"]
                        agg_vehiculo2 = detalles_vehiculo_accidentes.cleaned_data["agg_vehiculo"]
                        
                        nuevo_vehiculo_accidente = Detalles_Vehiculos_Accidente(
                            id_vehiculo = nuevo_accidente_transito,
                            modelo = modelo1,
                            marca = marca1,
                            color = color1,
                            año = año1,
                            placas = placas1,
                        )
                        nuevo_vehiculo_accidente.save()
                        print("Vehiculo 1 Guardado")
                        
                        if agg_vehiculo2 == True and detalles_vehiculo_accidentes2.is_valid():
                            modelo2 = detalles_vehiculo_accidentes2.cleaned_data["modelo"]
                            marca2 = detalles_vehiculo_accidentes2.cleaned_data["marca"]
                            color2 = detalles_vehiculo_accidentes2.cleaned_data["color"]
                            año2 = detalles_vehiculo_accidentes2.cleaned_data["año"]
                            placas2 = detalles_vehiculo_accidentes2.cleaned_data["placas"]
                            agg_vehiculo3 = detalles_vehiculo_accidentes2.cleaned_data["agg_vehiculo"]
                            
                            nuevo_vehiculo_accidente2 = Detalles_Vehiculos_Accidente(
                                id_vehiculo = nuevo_accidente_transito,
                                modelo = modelo2,
                                marca = marca2,
                                color = color2,
                                año = año2,
                                placas = placas2,
                            )
                            nuevo_vehiculo_accidente2.save()
                            print("Vehiculo 2 Guardado")
                            
                            if agg_vehiculo3 == True and detalles_vehiculo_accidentes3.is_valid():
                                modelo3 = detalles_vehiculo_accidentes3.cleaned_data["modelo"]
                                marca3 = detalles_vehiculo_accidentes3.cleaned_data["marca"]
                                color3 = detalles_vehiculo_accidentes3.cleaned_data["color"]
                                año3 = detalles_vehiculo_accidentes3.cleaned_data["año"]
                                placas3 = detalles_vehiculo_accidentes3.cleaned_data["placas"]
                                
                                nuevo_vehiculo_accidente3 = Detalles_Vehiculos_Accidente(
                                    id_vehiculo = nuevo_accidente_transito,
                                    modelo = modelo3,
                                    marca = marca3,
                                    color = color3,
                                    año = año3,
                                    placas = placas3,
                                )
                                nuevo_vehiculo_accidente3.save()
                                print("Vehiculo 3 Guardado")
                        
                
                    if agg_lesionado == True and detalles_lesionados_accidentes.is_valid():
                        nombre = detalles_lesionados_accidentes.cleaned_data["nombre"]
                        apellido = detalles_lesionados_accidentes.cleaned_data["apellido"]
                        cedula = detalles_lesionados_accidentes.cleaned_data["cedula"]
                        edad = detalles_lesionados_accidentes.cleaned_data["edad"]
                        sexo = detalles_lesionados_accidentes.cleaned_data["sexo"]
                        idx = detalles_lesionados_accidentes.cleaned_data["idx"]
                        descripcion = detalles_lesionados_accidentes.cleaned_data["descripcion"]
                        trasladado = detalles_lesionados_accidentes.cleaned_data["trasladado"]

                        nuevo_lesionado = Lesionados(
                            id_accidente = nuevo_accidente_transito,
                            nombres = nombre,
                            apellidos = apellido,
                            cedula = cedula,
                            edad = edad,
                            sexo = sexo,
                            idx = idx,
                            descripcion = descripcion,
                        )
                        nuevo_lesionado.save()
                        print("Lesionado Guardado")
                        
                        if trasladado == True and traslados_accidentes.is_valid():
                            hospital = traslados_accidentes.cleaned_data["hospital_trasladado"]
                            medico = traslados_accidentes.cleaned_data["medico_receptor"]
                            mpps_cmt = traslados_accidentes.cleaned_data["mpps_cmt"]
                            
                            nuevo_traslado_accidente = Traslado_Accidente(
                                id_lesionado = nuevo_lesionado,
                                hospital_trasladado = hospital,
                                medico_receptor = medico,
                                mpps_cmt = mpps_cmt
                            )
                            nuevo_traslado_accidente.save()
                            print("Traslado Guardado")
                        
                print("Todo Guardado Con Exito Guardado")
                return redirect('/dashboard/')
                
            if tipo_procedimiento == "9" and serv_especial.is_valid():          
                descripcion = serv_especial.cleaned_data["descripcion"]
                material_utilizado = serv_especial.cleaned_data["material_utilizado"]
                status = serv_especial.cleaned_data["status"]
                tipo_servicio = serv_especial.cleaned_data["tipo_servicio"]
                
                tipo_servicio_instance = Tipo_servicios.objects.get(id=tipo_servicio)
                print("Datos Obtenidos")
                
                nuevo_Servicio_especial = Servicios_Especiales(
                    id_procedimientos=nuevo_procedimiento,
                    tipo_servicio = tipo_servicio_instance,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nuevo_Servicio_especial)
                nuevo_Servicio_especial.save()
            
                return redirect('/dashboard/')
         
            if tipo_procedimiento == "10" and rescate_form.is_valid():  
                material_utilizado = rescate_form.cleaned_data["material_utilizado"]
                status = rescate_form.cleaned_data["status"]
                id_tipo_rescate = rescate_form.cleaned_data["tipo_rescate"]
                
                
                tipo_rescate_instance = Tipo_Rescate.objects.get(id=id_tipo_rescate)
                
                print("Datos Obtenidos")
                
                nuevo_proc_rescate = Rescate(
                    id_procedimientos = nuevo_procedimiento,
                    material_utilizado=material_utilizado,
                    tipo_rescate = tipo_rescate_instance,
                    status=status
                )
                print(nuevo_proc_rescate)
                nuevo_proc_rescate.save()
                
                if id_tipo_rescate == "1" and rescate_form_animal.is_valid():
                    especie = rescate_form_animal.cleaned_data["especie"]
                    descripcion = rescate_form_animal.cleaned_data["descripcion"]

                    new_rescate_animal = Rescate_Animal(
                        id_rescate = nuevo_proc_rescate,
                        especie = especie,
                        descripcion = descripcion,
                    )
                
                    print(new_rescate_animal)
                    new_rescate_animal.save()
                    
                    return redirect('/dashboard/')
                
                if id_tipo_rescate == "2" and rescate_form_persona.is_valid():
                    nombre_persona = rescate_form_persona.cleaned_data["nombre_persona"]
                    apellido_persona = rescate_form_persona.cleaned_data["apellido_persona"]
                    cedula_persona = rescate_form_persona.cleaned_data["cedula_persona"]
                    edad_persona = rescate_form_persona.cleaned_data["edad_persona"]
                    sexo_persona = rescate_form_persona.cleaned_data["sexo_persona"]
                    descripcion = rescate_form_persona.cleaned_data["descripcion"]

                    new_rescate_persona = Rescate_Persona(
                        id_rescate = nuevo_proc_rescate,
                        nombre = nombre_persona,
                        apellidos = apellido_persona,
                        cedula = cedula_persona,
                        edad = edad_persona,
                        sexo = sexo_persona,
                        descripcion = descripcion,
                    )
                
                    print(new_rescate_persona)
                    new_rescate_persona.save()
                    
                    return redirect('/dashboard/')
         
            if tipo_procedimiento == "11" and incendio_form.is_valid():
                id_tipo_incendio = incendio_form.cleaned_data["tipo_incendio"]
                descripcion = incendio_form.cleaned_data["descripcion"]
                material_utilizado = incendio_form.cleaned_data["material_utilizado"]
                status = incendio_form.cleaned_data["status"]
                
                tipo_incendio_instance = Tipo_Incendio.objects.get(id=id_tipo_incendio)
                
                print("Datos Obtenidos")
                
                nuevo_proc_incendio = Incendios(
                    id_procedimientos = nuevo_procedimiento,
                    id_tipo_incendio = tipo_incendio_instance,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nuevo_proc_incendio)
                nuevo_proc_incendio.save()
                
                check_agregar_persona = incendio_form.cleaned_data["check_agregar_persona"]
                
                if check_agregar_persona == True and persona_presente_form.is_valid():
                    nombre = persona_presente_form.cleaned_data["nombre"]
                    apellido = persona_presente_form.cleaned_data["apellido"]
                    cedula = persona_presente_form.cleaned_data["cedula"]
                    edad = persona_presente_form.cleaned_data["edad"]

                    new_persona_presente = Persona_Presente(
                        id_incendio = nuevo_proc_incendio,
                        nombre = nombre,
                        apellidos = apellido,
                        cedula = cedula,
                        edad = edad,
                    )
                
                    print(new_persona_presente)
                    new_persona_presente.save()
                    
                    
                check_agregar_vehiculos = incendio_form.cleaned_data["check_agregar_vehiculo"]
                
                if check_agregar_vehiculos == True and detalles_vehiculo_form.is_valid():
                    modelo = detalles_vehiculo_form.cleaned_data["modelo"]
                    marca = detalles_vehiculo_form.cleaned_data["marca"]
                    color = detalles_vehiculo_form.cleaned_data["color"]
                    año = detalles_vehiculo_form.cleaned_data["año"]
                    placas = detalles_vehiculo_form.cleaned_data["placas"]

                    new_agregar_vehiculo = Detalles_Vehiculos(
                        id_vehiculo = nuevo_proc_incendio,
                        modelo = modelo,
                        marca = marca,
                        color = color,
                        año = año,
                        placas = placas,
                    )
                
                    print(new_agregar_vehiculo)
                    new_agregar_vehiculo.save()
                    
                return redirect('/dashboard/')
         
            if tipo_procedimiento == "12" and form_fallecido.is_valid():  
                motivo_fallecimiento = form_fallecido.cleaned_data["motivo_fallecimiento"]       
                nom_fallecido = form_fallecido.cleaned_data["nom_fallecido"]
                apellido_fallecido = form_fallecido.cleaned_data["apellido_fallecido"]
                cedula_fallecido = form_fallecido.cleaned_data["cedula_fallecido"]
                edad = form_fallecido.cleaned_data["edad"]
                sexo = form_fallecido.cleaned_data["sexo"]
                descripcion = form_fallecido.cleaned_data["descripcion"]
                material_utilizado = form_fallecido.cleaned_data["material_utilizado"]
                status = form_fallecido.cleaned_data["status"]
                
                print("Datos Obtenidos")
                
                nuevo_proc_fallecido = Fallecidos(
                    id_procedimiento = nuevo_procedimiento,
                    motivo_fallecimiento = motivo_fallecimiento,
                    nombres = nom_fallecido,
                    apellidos = apellido_fallecido,
                    cedula = cedula_fallecido,
                    edad = edad,
                    sexo = sexo,
                    descripcion=descripcion,
                    material_utilizado=material_utilizado,
                    status=status
                )
                print(nuevo_proc_fallecido)
                nuevo_proc_fallecido.save()
            
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
        desp_seguridad = Formulario_despliegue_seguridad(prefix='desp_seguridad')
        fals_alarm = Formulario_falsa_alarma(prefix='fals_alarm')
        serv_especial = Formulario_Servicios_Especiales(prefix='serv_especial')
        form_fallecido = Formulario_Fallecidos(prefix='form_fallecido')
        rescate_form = Formulario_Rescate(prefix='rescate_form')
        incendio_form = Formulario_Incendio(prefix='incendio_form')
        atenciones_paramedicas = Formulario_Atenciones_Paramedicas(request.POST, prefix='atenciones_paramedicas')
        
        emergencias_medicas = Formulario_Emergencias_Medicas(request.POST, prefix='emergencias_medicas')
        traslados_emergencias = Formulario_Traslados(request.POST, prefix='traslados_emergencias')
        
        
        persona_presente_form = Formulario_Persona_Presente(prefix='persona_presente_form')
        detalles_vehiculo_form = Formulario_Detalles_Vehiculos(prefix='detalles_vehiculo_form')
        
        formulario_accidentes_transito = Formulario_Accidentes_Transito(request.POST, prefix='formulario_accidentes_transito')
        detalles_vehiculo_accidentes = Formulario_Detalles_Vehiculos(request.POST, prefix='detalles_vehiculos_accidentes')
        detalles_lesionados_accidentes = Formulario_Detalles_Lesionados(request.POST, prefix='detalles_lesionados_accidentes')
        traslados_accidentes = Formulario_Traslado_Accidente(request.POST, prefix='traslados_accidentes')
        detalles_vehiculo_accidentes2 = Formulario_Detalles_Vehiculos2(request.POST, prefix='detalles_vehiculos_accidentes2')
        detalles_vehiculo_accidentes3 = Formulario_Detalles_Vehiculos3(request.POST, prefix='detalles_vehiculos_accidentes3')
        
        rescate_form_persona = Formulario_Rescate_Persona(prefix='rescate_form_persona')   
        rescate_form_animal = Formulario_Rescate_Animal(prefix='rescate_form_animal')   

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
        "form_despliegue_seguridad": desp_seguridad,
        "form_falsa_alarma": fals_alarm,
        "form_servicios_especiales": serv_especial,
        "form_fallecido": form_fallecido,
        "rescate_form": rescate_form,
        "rescate_form_animal": rescate_form_animal,
        "rescate_form_persona": rescate_form_persona,
        "incendio_form": incendio_form,
        "persona_presente_form": persona_presente_form,
        "detalles_vehiculo_form": detalles_vehiculo_form,
        "atenciones_paramedicas": atenciones_paramedicas,
        "emergencias_medicas": emergencias_medicas,
        "traslados_emergencias": traslados_emergencias,
        "formulario_accidentes_transito": formulario_accidentes_transito,
        "detalles_vehiculo_accidentes":  detalles_vehiculo_accidentes,
        "detalles_vehiculo_accidentes2":  detalles_vehiculo_accidentes2,
        "detalles_vehiculo_accidentes3":  detalles_vehiculo_accidentes3,
        "detalles_lesionados_accidentes": detalles_lesionados_accidentes,
        "traslados_accidentes": traslados_accidentes,
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
        
    datos = Procedimientos.objects.filter(id_division=2)
    total = datos.count()

    # Obtener la fecha de hoy
    hoy = datetime.now().date()

    # Filtrar procedimientos con la fecha de hoy
    fechas = datos.values_list("fecha", flat=True)
    procedimientos_hoy = [fecha for fecha in fechas if fecha == hoy]
    
    hoy = len(procedimientos_hoy)
    

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
        "total": total,
        "hoy": hoy
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

def obtener_procedimiento(request, id):
    procedimiento = get_object_or_404(Procedimientos, pk=id)
    data = {
        'id': procedimiento.id,
        'division': procedimiento.id_division.division,
        'solicitante': f"{procedimiento.id_solicitante.jerarquia} {procedimiento.id_solicitante.nombres} {procedimiento.id_solicitante.apellidos}",
        'jefe_comision': f"{procedimiento.id_jefe_comision.jerarquia} {procedimiento.id_jefe_comision.nombres} {procedimiento.id_jefe_comision.apellidos}",
        'unidad': procedimiento.unidad,
        'efectivos': procedimiento.efectivos_enviados,
        'parroquia': procedimiento.id_parroquia.parroquia,
        'municipio': procedimiento.id_municipio.municipio,
        'direccion': procedimiento.direccion,
        'fecha': procedimiento.fecha,
        'hora': procedimiento.hora,
        'tipo_procedimiento': procedimiento.id_tipo_procedimiento.tipo_procedimiento,
    }
    
    
    if str(procedimiento.id_tipo_procedimiento.id) == "1":
        detalle_procedimiento = get_object_or_404(Abastecimiento_agua, id_procedimiento=id)
        
        data = dict(data,
                    tipo_servicio = detalle_procedimiento.id_tipo_servicio.nombre_institucion,
                    nombres = detalle_procedimiento.nombres,
                    apellidos = detalle_procedimiento.apellidos,
                    cedula = detalle_procedimiento.cedula,
                    ltrs_agua = detalle_procedimiento.ltrs_agua,
                    personas_atendidas = detalle_procedimiento.personas_atendidas,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status)
    
    if str(procedimiento.id_tipo_procedimiento.id) == "2":
        detalle_procedimiento = get_object_or_404(Apoyo_Unidades, id_procedimiento=id)
        data = dict(data,
                    tipo_apoyo = detalle_procedimiento.id_tipo_apoyo.tipo_apoyo,
                    unidad_apoyada = detalle_procedimiento.unidad_apoyada,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )
        
    if str(procedimiento.id_tipo_procedimiento.id) == "3":
        detalle_procedimiento = get_object_or_404(Guardia_prevencion, id_procedimiento=id)
        data = dict(data,
                    motivo_prevencion = detalle_procedimiento.id_motivo_prevencion.motivo,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )
        
    if str(procedimiento.id_tipo_procedimiento.id) == "4":
        detalle_procedimiento = get_object_or_404(Atendido_no_Efectuado, id_procedimiento=id)
        data = dict(data,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )
        
    if str(procedimiento.id_tipo_procedimiento.id) == "5":
        detalle_procedimiento = get_object_or_404(Despliegue_Seguridad, id_procedimiento=id)
        data = dict(data,
                    motivo_despliegue = detalle_procedimiento. motivo_despliegue.motivo,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )
    
    if str(procedimiento.id_tipo_procedimiento.id) == "6":
        detalle_procedimiento = get_object_or_404(Falsa_Alarma, id_procedimiento=id)
        data = dict(data,
                    motivo_alarma = detalle_procedimiento.motivo_alarma.motivo,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )

    if str(procedimiento.id_tipo_procedimiento.id) == "7":
        # Obtener el detalle del procedimiento
        detalle_procedimiento = get_object_or_404(Atenciones_Paramedicas, id_procedimientos=id)
        
        # Agregar detalles del procedimiento a los datos
        data = dict(data,
                    tipo_atencion=detalle_procedimiento.tipo_atencion,
                    )
        
        if detalle_procedimiento.tipo_atencion == "Emergencias Medicas": 
            emergencia = Emergencias_Medicas.objects.get(id_atencion=detalle_procedimiento.id)
            data = dict(data,
                nombres = emergencia.nombres,
                apellidos = emergencia.apellidos,
                cedula = emergencia.cedula,
                edad = emergencia.edad,
                sexo = emergencia.sexo,
                idx = emergencia.idx,
                descripcion = emergencia.descripcion,
                material_utilizado = emergencia.material_utilizado,
                status = emergencia.status,
            )
            
            if Traslado.objects.filter(id_lesionado=emergencia.id).exists():
                traslado = Traslado.objects.get(id_lesionado = emergencia.id)
                
                data = dict(data, 
                            hospital = traslado.hospital_trasladado,
                            medico = traslado.medico_receptor,
                            mpps_cmt = traslado.mpps_cmt,
                        )          
            
            print(data)

    if str(procedimiento.id_tipo_procedimiento.id) == "9":
        detalle_procedimiento = get_object_or_404(Servicios_Especiales, id_procedimientos=id)
        data = dict(data,
                    tipo_servicio = detalle_procedimiento.tipo_servicio.serv_especiales,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )
    
    if str(procedimiento.id_tipo_procedimiento.id) == "10":
        detalle_procedimiento = get_object_or_404(Rescate, id_procedimientos=id)
        data = dict(data,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    tipo_rescate = detalle_procedimiento.tipo_rescate.tipo_rescate,
                    )
    
        if detalle_procedimiento.tipo_rescate.tipo_rescate == "Animal":
            detalle_tipo_rescate = get_object_or_404(Rescate_Animal, id_rescate=detalle_procedimiento.id)
            print(detalle_tipo_rescate)
            data = dict(data,
                        especie = detalle_tipo_rescate.especie, 
                        descripcion = detalle_tipo_rescate.descripcion,
                        )
            
        if detalle_procedimiento.tipo_rescate.tipo_rescate == "Persona":
            detalle_tipo_rescate = get_object_or_404(Rescate_Persona, id_rescate=detalle_procedimiento.id)
            data = dict(data,
                        nombres = detalle_tipo_rescate.nombre, 
                        apellidos = detalle_tipo_rescate.apellidos, 
                        cedula = detalle_tipo_rescate.cedula,
                        edad = detalle_tipo_rescate.edad,
                        sexo = detalle_tipo_rescate.sexo,
                        descripcion = detalle_tipo_rescate.descripcion,
                        )
        
    if str(procedimiento.id_tipo_procedimiento.id) == "11":
      # Obtener el detalle del procedimiento
      detalle_procedimiento = get_object_or_404(Incendios, id_procedimientos=id)
      print(detalle_procedimiento)
      
      # Agregar detalles del procedimiento a los datos
      data = dict(data,
                  tipo_incendio=detalle_procedimiento.id_tipo_incendio.tipo_incendio,
                  descripcion=detalle_procedimiento.descripcion,
                  status=detalle_procedimiento.status,
                  material_utilizado=detalle_procedimiento.material_utilizado,
                )
      
      if Persona_Presente.objects.filter(id_incendio=detalle_procedimiento.id).exists():
          print("Si existe el elemento")
          persona_presente_detalles = Persona_Presente.objects.get(id_incendio=detalle_procedimiento.id)
          data.update({
              "persona": True,
              "nombre": persona_presente_detalles.nombre,
              "apellidos": persona_presente_detalles.apellidos,
              "cedula": persona_presente_detalles.cedula,
              "edad": persona_presente_detalles.edad,
          })
      else:
          print("No Existe este Elemento")
          
      if Detalles_Vehiculos.objects.filter(id_vehiculo=detalle_procedimiento.id).exists():
          vehiculo_detalles = Detalles_Vehiculos.objects.get(id_vehiculo=detalle_procedimiento.id)
          print("Si existe el elemento")
          data.update({
              "vehiculo": True,
              "modelo": vehiculo_detalles.modelo,
              "marca": vehiculo_detalles.marca,
              "color": vehiculo_detalles.color,
              "año": vehiculo_detalles.año,
              "placas": vehiculo_detalles.placas,
          })
      else:
          print("No Existe este Elemento")
        
    if str(procedimiento.id_tipo_procedimiento.id) == "12":
        detalle_procedimiento = get_object_or_404(Fallecidos, id_procedimiento=id)
        data = dict(data,
                    motivo_fallecimiento = detalle_procedimiento.motivo_fallecimiento,
                    nombres = detalle_procedimiento.nombres,
                    apellidos = detalle_procedimiento.apellidos,
                    cedula = detalle_procedimiento.cedula,
                    edad = detalle_procedimiento.edad,
                    sexo = detalle_procedimiento.sexo,
                    descripcion = detalle_procedimiento.descripcion,
                    material_utilizado = detalle_procedimiento.material_utilizado,
                    status = detalle_procedimiento.status,
                    )

    # nombre_diccionario = dict(nombre_diccionario, key=valor, kay=valor)
    
    return JsonResponse(data)