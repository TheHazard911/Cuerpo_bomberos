import pandas as pd
from openpyxl import load_workbook
from django.core.management.base import BaseCommand
from web.models import *

class Command(BaseCommand):
    help = 'Exporta los procedimientos a un archivo Excel'

    def add_row(self, data, base_row, additional_data):
        data.append({**base_row, **additional_data})

    def handle(self, *args, **kwargs):
        data = []
        procedimientos = Procedimientos.objects.all()

        for procedimiento in procedimientos:
            # Base row data
            jefe_comision = (f"{procedimiento.id_jefe_comision.jerarquia} {procedimiento.id_jefe_comision.nombres} {procedimiento.id_jefe_comision.apellidos}" 
                             if procedimiento.id_jefe_comision and procedimiento.id_jefe_comision.id != 0 else "")

            parroquia = procedimiento.id_parroquia.parroquia if procedimiento.id_parroquia and procedimiento.id_parroquia.id != 0 else ""

            base_row = {
                'Division': procedimiento.id_division.division,
                'Unidad': procedimiento.unidad.nombre_unidad if procedimiento.id_division.id not in [6, 7, 8, 9] else "",
                'Jefe Comision / Instructor': jefe_comision,
                'Municipio': procedimiento.id_municipio.municipio,
                'Parroquia': parroquia,
                'Fecha': procedimiento.fecha,
                'Hora': procedimiento.hora,
                'Direccion': procedimiento.direccion,
                'Tipo de Procedimiento': procedimiento.id_tipo_procedimiento.tipo_procedimiento,
            }


            # Variable para rastrear si se agregó una fila
            row_added = False

            # Se comprueba y se añade filas solo si hay datos asociados
            if (abastecimientos := Abastecimiento_agua.objects.filter(id_procedimiento=procedimiento)).exists():
                for abastecimiento in abastecimientos:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{abastecimiento.nombres} {abastecimiento.apellidos} V-{abastecimiento.cedula}",
                    })
                    row_added = True
                    break

            if (fallecidos := Fallecidos.objects.filter(id_procedimiento=procedimiento)).exists():
                for fallecido in fallecidos:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{fallecido.nombres} {fallecido.apellidos} V-{fallecido.cedula}",
                    })
                    row_added = True
                    break

            if (rescates := Rescate.objects.filter(id_procedimientos=procedimiento)).exists():
                for rescate in rescates:
                    # Filtrar personas presentes para este rescate
                    rescate_persona = Rescate_Persona.objects.filter(id_rescate=rescate)
                    if rescate_persona.exists():
                        for persona in rescate_persona:
                            # Solo agregar si no se ha agregado una fila
                            if not row_added:
                                self.add_row(data, base_row, {
                                    'Persona Presente': f"{persona.nombre} {persona.apellidos} V-{persona.cedula}",
                                })
                                row_added = True
                        # Romper después de procesar el primer rescate
                    break  # Romper aquí para evitar duplicados

            if (incendios := Incendios.objects.filter(id_procedimientos=procedimiento)).exists():
                for incendio in incendios:
                    if (incendios_persona := Persona_Presente.objects.filter(id_incendio=incendio)).exists():
                        for incendio_per in incendios_persona:
                            self.add_row(data, base_row, {
                                'Persona Presente': f"{incendio_per.nombre} {incendio_per.apellidos} V-{incendio_per.cedula}",
                            })
                            row_added = True
                            break
                    break

            if (atenciones := Atenciones_Paramedicas.objects.filter(id_procedimientos=procedimiento)).exists():
                for atencion in atenciones:
                    if (emergencia := Emergencias_Medicas.objects.filter(id_atencion=atencion)).exists():
                        for emer in emergencia:
                            self.add_row(data, base_row, {
                                'Persona Presente': f"{emer.nombres} {emer.apellidos} V-{emer.cedula}",
                            })
                            row_added = True
                            break

                    if (accidentes := Accidentes_Transito.objects.filter(id_atencion=atencion)).exists():
                        for accidente in accidentes:
                            if (lesionados := Lesionados.objects.filter(id_accidente=accidente)).exists():
                                for lesionado in lesionados:
                                    self.add_row(data, base_row, {
                                        'Persona Presente': f"{lesionado.nombres} {lesionado.apellidos} V-{lesionado.cedula}",
                                    })
                                    row_added = True
                                    break
                    break

            if (traslados := Traslado_Prehospitalaria.objects.filter(id_procedimiento=procedimiento)).exists():
                for traslado in traslados:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{traslado.nombre} {traslado.apellido} V-{traslado.cedula}",
                    })
                    row_added = True
                    break

            if (evaluaciones := Evaluacion_Riesgo.objects.filter(id_procedimientos=procedimiento)).exists():
                for evaluacion in evaluaciones:
                    if (persona_presente := Persona_Presente_Eval.objects.filter(id_persona=evaluacion)).exists():
                        for persona in persona_presente:
                            self.add_row(data, base_row, {
                                'Persona Presente': f"{persona.nombre} {persona.apellidos} V-{persona.cedula}",
                            })
                            row_added = True
                            break
                    break

            if (asesoramientos := Asesoramiento.objects.filter(id_procedimiento=procedimiento)).exists():
                for asesoramiento in asesoramientos:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{asesoramiento.nombres} {asesoramiento.apellidos} V-{asesoramiento.cedula}",
                        'Comercio': f"{asesoramiento.nombre_comercio} {asesoramiento.rif_comercio}",
                    })
                    row_added = True
                    break

            if (reinspecciones := Reinspeccion_Prevencion.objects.filter(id_procedimiento=procedimiento)).exists():
                for reinspeccion in reinspecciones:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{reinspeccion.nombre} {reinspeccion.apellidos} V-{reinspeccion.cedula}",
                        'Comercio': f"{reinspeccion.nombre_comercio} {reinspeccion.rif_comercio}",
                    })
                    row_added = True
                    break

            if (artificios := Artificios_Pirotecnicos.objects.filter(id_procedimiento=procedimiento)).exists():
                for artificio in artificios:
                    self.add_row(data, base_row, {
                        'Comercio': f"{artificio.nombre_comercio} {artificio.rif_comerciante}",
                    })
                    row_added = True
                    break

            if (inspecciones := Inspeccion_Establecimiento_Art.objects.filter(id_proc_artificio=procedimiento)).exists():
                for inspeccion in inspecciones:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{inspeccion.encargado_nombre} {inspeccion.encargado_apellidos} V-{inspeccion.encargado_cedula}",
                        'Comercio': f"{inspeccion.nombre_comercio} {inspeccion.rif_comercio}",
                    })
                    row_added = True
                    break

            if (valoraciones := Valoracion_Medica.objects.filter(id_procedimientos=procedimiento)).exists():
                for valoracion in valoraciones:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{valoracion.nombre} {valoracion.apellido} V-{valoracion.cedula}",
                    })
                    row_added = True
                    break

            if (detalles := Detalles_Enfermeria.objects.filter(id_procedimientos=procedimiento)).exists():
                for detalle in detalles:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{detalle.nombre} {detalle.apellido} V-{detalle.cedula}",
                    })
                    row_added = True
                    break

            if (psicologia := Procedimientos_Psicologia.objects.filter(id_procedimientos=procedimiento)).exists():
                for psic in psicologia:
                    self.add_row(data, base_row, {
                        'Persona Presente': f"{psic.nombre} {psic.apellido} V-{psic.cedula}",
                    })
                    row_added = True
                    break

            if (capacitaciones := Procedimientos_Capacitacion.objects.filter(id_procedimientos=procedimiento)).exists():
                for capacitacion in capacitaciones:
                    self.add_row(data, base_row, {
                        'Tipo Capacitacion': capacitacion.tipo_capacitacion,
                        'Clasificacion': capacitacion.tipo_clasificacion,
                    })
                    row_added = True
                    break

            # Solo agrega el base_row si no se ha agregado ninguna fila adicional
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
                column_letter = column[0].column_letter  # get column name
                for cell in worksheet[column_letter]:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(str(cell.value))
                    except:
                        pass
                adjusted_width = (max_length + 2)
                worksheet.column_dimensions[column_letter].width = adjusted_width

        self.stdout.write(self.style.SUCCESS('Exportación completada: procedimientos_export.xlsx'))
