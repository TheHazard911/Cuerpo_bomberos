import pandas as pd
from openpyxl import load_workbook
from django.core.management.base import BaseCommand
from web.models import (
    Procedimientos,
    Abastecimiento_agua,
    Apoyo_Unidades,
    Guardia_prevencion,
    Atendido_no_Efectuado,
    Despliegue_Seguridad,
    Fallecidos,
    Falsa_Alarma,
    Servicios_Especiales,
    Rescate,
    Incendios,
    Atenciones_Paramedicas,
    Traslado_Prehospitalaria,
    Accidentes_Transito,
    Evaluacion_Riesgo,
    Mitigacion_Riesgos,
    Puesto_Avanzada,
    Asesoramiento,
    Reinspeccion_Prevencion,
    Retencion_Preventiva,
    Artificios_Pirotecnicos,
    Inspeccion_Establecimiento_Art,
    Valoracion_Medica,
    Detalles_Enfermeria,
    Procedimientos_Psicologia,
    Procedimientos_Capacitacion,
)

class Command(BaseCommand):
    help = 'Exporta los procedimientos a un archivo Excel'

    def handle(self, *args, **kwargs):
        data = []
        procedimientos = Procedimientos.objects.all()

        for procedimiento in procedimientos:
            # Determinar el valor del solicitante
            if procedimiento.id_solicitante.id == 0:
                solicitante = procedimiento.solicitante_externo
            else:
                solicitante = f"{procedimiento.id_solicitante.jerarquia} {procedimiento.id_solicitante.nombres} {procedimiento.id_solicitante.apellidos}"

            # Determinar el valor del jefe de comisión
            if procedimiento.id_jefe_comision.id == 0:
                jefe_comision = ""
            else:
                jefe_comision = f"{procedimiento.id_jefe_comision.jerarquia} {procedimiento.id_jefe_comision.nombres} {procedimiento.id_jefe_comision.apellidos}"

            # Determinar el valor de la parroquia
            if procedimiento.id_parroquia.id == 0:
                parroquia = ""
            else:
                parroquia = procedimiento.id_parroquia.parroquia

            base_row = {
                'Division': procedimiento.id_division.division,
                'Tipo de Servicio Medico': procedimiento.tipo_servicio,
                'Solicitante / Jefe de Area': solicitante,
                'Unidad': procedimiento.unidad.nombre_unidad,
                'Jefe Comision / Instructor': jefe_comision,
                'Dependencia': procedimiento.dependencia,
                'Municipio': procedimiento.id_municipio.municipio,
                'Parroquia': parroquia,
                'Fecha': procedimiento.fecha,
                'Hora': procedimiento.hora,
                'Direccion': procedimiento.direccion,
                'Tipo de Procedimiento': procedimiento.id_tipo_procedimiento.tipo_procedimiento,
            }



            row_added = False

            def add_row(data, base_row, additional_data):
                data.append({**base_row, **additional_data})

            # Abastecimiento de agua
            abastecimientos = Abastecimiento_agua.objects.filter(id_procedimiento=procedimiento)
            if abastecimientos.exists():
                for abastecimiento in abastecimientos:
                    if not row_added:
                        add_row(data, base_row, {
                            'Comunidad Abastecida': abastecimiento.id_tipo_servicio.nombre_institucion,
                        })
                        row_added = True

            # Apoyo a unidades
            apoyos = Apoyo_Unidades.objects.filter(id_procedimiento=procedimiento)
            if apoyos.exists():
                for apoyo in apoyos:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Apoyo': apoyo.id_tipo_apoyo.tipo_apoyo,
                            'Unidad Apoyada': apoyo.unidad_apoyada,
                        })
                        row_added = True

            # Guardia de prevención
            guardias = Guardia_prevencion.objects.filter(id_procedimiento=procedimiento)
            if guardias.exists():
                for guardia in guardias:
                    if not row_added:
                        add_row(data, base_row, {
                            'Motivo Prevencion': guardia.id_motivo_prevencion.motivo,
                        })
                        row_added = True

            # Despliegue de Seguridad
            despliegues = Despliegue_Seguridad.objects.filter(id_procedimiento=procedimiento)
            if despliegues.exists():
                for despliegue in despliegues:
                    if not row_added:
                        add_row(data, base_row, {
                            'Motivo Despliegue': despliegue.motivo_despliegue.motivo,
                        })
                        row_added = True

            # Fallecidos
            fallecidos = Fallecidos.objects.filter(id_procedimiento=procedimiento)
            if fallecidos.exists():
                for fallecido in fallecidos:
                    if not row_added:
                        add_row(data, base_row, {
                            'Causa del Fallecimiento': fallecido.motivo_fallecimiento,
                        })
                        row_added = True

            # Falsa alarma
            falsas_alarmas = Falsa_Alarma.objects.filter(id_procedimiento=procedimiento)
            if falsas_alarmas.exists():
                for falsa in falsas_alarmas:
                    if not row_added:
                        add_row(data, base_row, {
                            'Motivo del la Falsa Alarma': falsa.motivo_alarma.motivo,
                        })
                        row_added = True

            # Servicios Especiales
            servicios_especiales = Servicios_Especiales.objects.filter(id_procedimientos=procedimiento)
            if servicios_especiales.exists():
                for servicio in servicios_especiales:
                    if not row_added:
                        add_row(data, base_row, {
                            'Otros Servicios': servicio.tipo_servicio.serv_especiales,
                        })
                        row_added = True

            # Rescate
            rescates = Rescate.objects.filter(id_procedimientos=procedimiento)
            if rescates.exists():
                for rescate in rescates:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Rescate': rescate.tipo_rescate.tipo_rescate,
                        })
                        row_added = True

            # Incendios
            incendios = Incendios.objects.filter(id_procedimientos=procedimiento)
            if incendios.exists():
                for incendio in incendios:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Incendio': incendio.id_tipo_incendio.tipo_incendio,
                        })
                        row_added = True

            # Atenciones Paramedicas y Accidentes de Tránsito
            atenciones = Atenciones_Paramedicas.objects.filter(id_procedimientos=procedimiento)
            if atenciones.exists():
                for atencion in atenciones:
                    additional_data = {
                        'Tipo de Atencion Paramedica': atencion.tipo_atencion,
                    }
                    
                    # Accidentes de Tránsito
                    accidentes = Accidentes_Transito.objects.filter(id_atencion__id_procedimientos=procedimiento)
                    if accidentes.exists():
                        for accidente in accidentes:
                            additional_data['Tipo de Accidente'] = accidente.tipo_de_accidente.tipo_accidente
                    
                    add_row(data, base_row, additional_data)
                    row_added = True

            # Traslado Prehospitalaria
            traslados = Traslado_Prehospitalaria.objects.filter(id_procedimiento=procedimiento)
            if traslados.exists():
                for traslado in traslados:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Traslado': traslado.id_tipo_traslado.tipo_traslado,
                        })
                        row_added = True

            # Evaluacion de Riesgo
            evaluaciones = Evaluacion_Riesgo.objects.filter(id_procedimientos=procedimiento)
            if evaluaciones.exists():
                for evaluacion in evaluaciones:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Riesgo': evaluacion.id_tipo_riesgo.tipo_riesgo,
                            'Tipo de Estructura': evaluacion.tipo_estructura,
                        })
                        row_added = True

            # Mitigacion de Riesgos
            mitigaciones = Mitigacion_Riesgos.objects.filter(id_procedimientos=procedimiento)
            if mitigaciones.exists():
                for mitigacion in mitigaciones:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Mitigacion': mitigacion.id_tipo_servicio.tipo_servicio,
                        })
                        row_added = True

            # Puesto de Avanzada
            puestos = Puesto_Avanzada.objects.filter(id_procedimientos=procedimiento)
            if puestos.exists():
                for puesto in puestos:
                    if not row_added:
                        add_row(data, base_row, {
                            'Motivo de Servicio': puesto.id_tipo_servicio.tipo_servicio,
                        })
                        row_added = True

            # Asesoramiento
            asesoramientos = Asesoramiento.objects.filter(id_procedimiento=procedimiento)
            if asesoramientos.exists():
                for asesoramiento in asesoramientos:
                    if not row_added:
                        add_row(data, base_row, {
                            'Nombre Comercio (Asesoramiento)': asesoramiento.nombre_comercio,
                            'RIF Comercio (Asesoramiento)': asesoramiento.rif_comercio,
                        })
                        row_added = True

            # Reinspeccion de Prevencion
            reinspecciones = Reinspeccion_Prevencion.objects.filter(id_procedimiento=procedimiento)
            if reinspecciones.exists():
                for reinspeccion in reinspecciones:
                    if not row_added:
                        add_row(data, base_row, {
                            'Nombre Comercio (Reinspeccion)': reinspeccion.nombre_comercio,
                            'RIF Comercio (Reinspeccions)': reinspeccion.rif_comercio,
                        })
                        row_added = True

            # Retencion Preventiva
            retenciones = Retencion_Preventiva.objects.filter(id_procedimiento=procedimiento)
            if retenciones.exists():
                for retencion in retenciones:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Cilindro': retencion.tipo_cilindro,
                            'Capacidad': retencion.capacidad,
                        })
                        row_added = True

            # Artificios Pirotécnicos
            artificios = Artificios_Pirotecnicos.objects.filter(id_procedimiento=procedimiento)
            if artificios.exists():
                for artificio in artificios:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo de Procedimiento Por Artificios': artificio.tipo_procedimiento.tipo,
                        })
                        row_added = True

            # Inspección de Establecimiento
            inspecciones = Inspeccion_Establecimiento_Art.objects.filter(id_proc_artificio=procedimiento)
            if inspecciones.exists():
                for inspeccion in inspecciones:
                    if not row_added:
                        add_row(data, base_row, {
                            'Nombre Comercio (Inspecciones por Artificios)': inspeccion.nombre_comercio,
                            'RIF Comercio (Inspeccion por Artificios)': inspeccion.rif_comercio,
                        })
                        row_added = True

            # Valoración Médica
            valoraciones = Valoracion_Medica.objects.filter(id_procedimientos=procedimiento)
            if valoraciones.exists():
                for valoracion in valoraciones:
                    if not row_added:
                        add_row(data, base_row, {})
                        row_added = True

            # Detalles de Enfermería
            detalles = Detalles_Enfermeria.objects.filter(id_procedimientos=procedimiento)
            if detalles.exists():
                for detalle in detalles:
                    if not row_added:
                        add_row(data, base_row, {})
                        row_added = True

            # Procedimientos de Psicología
            psicologia = Procedimientos_Psicologia.objects.filter(id_procedimientos=procedimiento)
            if psicologia.exists():
                for psic in psicologia:
                    if not row_added:
                        add_row(data, base_row, {})
                        row_added = True

            # Procedimientos de Capacitación
            capacitaciones = Procedimientos_Capacitacion.objects.filter(id_procedimientos=procedimiento)
            if capacitaciones.exists():
                for capacitacion in capacitaciones:
                    if not row_added:
                        add_row(data, base_row, {
                            'Tipo Capacitacion': capacitacion.tipo_capacitacion,
                            'Clasificacion': capacitacion.tipo_clasificacion,
                        })
                        row_added = True

            if not row_added:
                data.append(base_row)

        # Crear un DataFrame de pandas
        df = pd.DataFrame(data)

        # Ordenar el DataFrame por el campo 'Tipo de Procedimiento'
        df = df.sort_values(by='Tipo de Procedimiento')

        # Ajustar el ancho de las columnas
        with pd.ExcelWriter('procedimientos_export.xlsx', engine='openpyxl') as writer:
            df.to_excel(writer, index=False)
            worksheet = writer.sheets['Sheet1']
            for column in worksheet.columns:
                max_length = 0
                column = column[0].column_letter  # get column name
                for cell in worksheet[column]:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(str(cell.value))
                    except:
                        pass
                adjusted_width = (max_length + 2)
                worksheet.column_dimensions[column].width = adjusted_width

        self.stdout.write(self.style.SUCCESS('Exportación completada: procedimientos_export.xlsx'))
