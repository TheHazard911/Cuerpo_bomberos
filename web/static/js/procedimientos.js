// < !--Script para cambiar el menu desplegable de tipo de procedimiento segun la division-- >
// Define las opciones por categoría
const opcionesPorCategoria = {
    "": [
        { value: "-", text: "Elige Una Division" }
    ],
    "1": [
        { value: "2", text: "Apoyo a Otras Unidades" },
        { value: "3", text: "Guardia de Prevención" },
        { value: "6", text: "Falsa Alarma" },
        { value: "7", text: "Atenciones Paramedicas" },
        { value: "9", text: "Servicios Especiales" },
        { value: "10", text: "Rescate" },
        { value: "11", text: "Incendios" },
        { value: "13", text: "Mitigación de Riesgos" },
        { value: "14", text: "Evaluación de Riesgos" },
        { value: "15", text: "Puesto de Avanzada" },
    ],
    "2": [
        { value: "1", text: "Abastecimiento de agua" },
        { value: "2", text: "Apoyo a Otras Unidades" },
        { value: "3", text: "Guardia de Prevención" },
        { value: "4", text: "Atendido No Efectuado" },
        { value: "5", text: "Despliegue de Seguridad" },
        { value: "6", text: "Falsa Alarma" },
        { value: "7", text: "Atenciones Paramedicas" },
        { value: "9", text: "Servicios Especiales" },
        { value: "10", text: "Rescate" },
        { value: "11", text: "Incendios" },
        { value: "12", text: "Fallecidos" },
        { value: "13", text: "Mitigación de Riesgos" },
        { value: "14", text: "Evaluación de Riesgos" }
    ],
    "3": [
        { value: "14", text: "Evaluacion de Riesgos" },
        { value: "17", text: "Asesoramiento" },
        { value: "18", text: "Inspeccion" },
        { value: "19", text: "Investigacion" },
        { value: "20", text: "Reinspeccion de Prevencion" },
        { value: "21", text: "Retencion Preventiva" },
        { value: "9", text: "Servicios Especiales" },
    ],
    "4": [
        { value: "1", text: "Abastecimiento de agua" },
        { value: "2", text: "Apoyo a Otras Unidades" },
        { value: "3", text: "Guardia de Prevención" },
        { value: "4", text: "Atendido No Efectuado" },
        { value: "6", text: "Falsa Alarma" },
        { value: "7", text: "Atenciones Paramedicas" },
        { value: "9", text: "Servicios Especiales" },
        { value: "10", text: "Rescate" },
        { value: "11", text: "Incendios" },
        { value: "12", text: "Fallecidos" },
        { value: "13", text: "Mitigación de Riesgos" },
        { value: "14", text: "Evaluación de Riesgos" },
        { value: "15", text: "Puesto de Avanzada" },
    ],
    "5": [
        { value: "3", text: "Guardia de Prevención" },
        { value: "4", text: "Atendido No Efectuado" },
        { value: "6", text: "Falsa Alarma" },
        { value: "7", text: "Atenciones Paramedicas" },
        { value: "9", text: "Servicios Especiales" },
        { value: "12", text: "Fallecidos" },
        { value: "15", text: "Puesto de Avanzada" },
        { value: "16", text: "Traslados" },
    ],

    "8": [
        { value: "00", text: "Terapia Psicológica" }
    ],
    // Puedes agregar más categorías según sea necesario
};

const selectOpciones = document.getElementById("id_form1-opciones");
const selectTipoProcedimiento = document.getElementById("id_form4-tipo_procedimiento");

// Función para actualizar las opciones del segundo select
function actualizarOpciones() {
    const selectedValue = selectOpciones.value;

    // Limpia las opciones actuales del segundo select
    selectTipoProcedimiento.innerHTML = '';

    // Si hay opciones para la categoría seleccionada, agrégalas
    if (opcionesPorCategoria[selectedValue]) {
        // Agrega una opción predeterminada
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione una Opción";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectTipoProcedimiento.appendChild(defaultOption);

        // Agrega las opciones correspondientes
        opcionesPorCategoria[selectedValue].forEach(optionData => {
            const optionElement = document.createElement("option");
            optionElement.value = optionData.value;
            optionElement.textContent = optionData.text;
            selectTipoProcedimiento.appendChild(optionElement);
        });
    }
}

actualizarOpciones()
// Evento cuando cambia el primer select
selectOpciones.addEventListener("change", actualizarOpciones);

// <!--Script para el manejo de formularios-- >

document
    .getElementById("id_form4-tipo_procedimiento")
    .addEventListener("change", function () {
        const elementsToHide = [
            "abast_agua",
            "apoyo_unid",
            "guard_prev",
            "atend_no_efect",
            "desp_seguridad",
            "falsa_alarm",
            "serv_especiales",
            "fallecidos",
            "rescate",
            "rescate_animal",
            "rescate_persona",
            "incendio_form",
            "persona_presente",
            "detalles_vehiculo",
            "atenciones_paramedicas",
            "emergencias_medicas",
            "traslados_emergencias",
            "accidentes_transito",
            "vehiculo_accidente",
            "otro_vehiculo_accidente",
            "otro_vehiculo_accidente2",
            "lesionado_accidente",
            "traslado_accidente",
            "evaluacion_riesgo",
            "mitigacion_riesgo",
            "puesto_avanzada",
            "traslados_prehospitalaria",
            "asesoramiento_form",
            "form_persona_presente",
            "reinspeccion_prevencion",
            "retencion_preventiva",
        ];

        const showElements = (elements) => {
            elementsToHide.forEach(
                (id) => (document.getElementById(id).style.display = "none")
            );
            elements.forEach(
                (id) => (document.getElementById(id).style.display = "block")
            );
        };

        switch (this.value) {
            case "1":
                showElements(["abast_agua"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "2":
                showElements(["apoyo_unid"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "3":
                showElements(["guard_prev"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "4":
                showElements(["atend_no_efect"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "5":
                showElements(["desp_seguridad"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "6":
                showElements(["falsa_alarm"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "7":
                showElements(["atenciones_paramedicas"]);
                document.getElementById("button_submit").style.display = "none";

                document
                    .getElementById("id_atenciones_paramedicas-tipo_atencion")
                    .addEventListener("change", function () {
                        if (this.value === "Emergencias Medicas") {
                            showElements(["atenciones_paramedicas", "emergencias_medicas"]);
                            document.getElementById("button_submit").style.display = "block";

                            document
                                .getElementById("id_emergencias_medicas-trasladado")
                                .addEventListener("change", function () {
                                    document.getElementById(
                                        "traslados_emergencias"
                                    ).style.display = this.checked ? "block" : "none";
                                });
                        }
                        else if (this.value === "Accidentes de Transito") {
                            showElements(["atenciones_paramedicas", "accidentes_transito"]);

                            document
                                .getElementById(
                                    "id_formulario_accidentes_transito-agg_vehiculo"
                                )
                                .addEventListener("change", function () {
                                    document.getElementById(
                                        "vehiculo_accidente"
                                    ).style.display = this.checked ? "block" : "none";
                                    document.getElementById("button_submit").style.display = "block";

                                    document
                                        .getElementById(
                                            "id_detalles_vehiculos_accidentes-agg_vehiculo"
                                        )
                                        .addEventListener("change", function () {
                                            document.getElementById(
                                                "otro_vehiculo_accidente"
                                            ).style.display = this.checked ? "block" : "none";

                                            document
                                                .getElementById(
                                                    "id_detalles_vehiculos_accidentes2-agg_vehiculo"
                                                )
                                                .addEventListener("change", function () {
                                                    document.getElementById(
                                                        "otro_vehiculo_accidente2"
                                                    ).style.display = this.checked ? "block" : "none";
                                                });
                                        });
                                });

                            document
                                .getElementById(
                                    "id_formulario_accidentes_transito-agg_lesionado"
                                )
                                .addEventListener("change", function () {
                                    document.getElementById(
                                        "lesionado_accidente"
                                    ).style.display = this.checked ? "block" : "none";

                                    document
                                        .getElementById(
                                            "id_detalles_lesionados_accidentes-trasladado"
                                        )
                                        .addEventListener("change", function () {
                                            document.getElementById(
                                                "traslado_accidente"
                                            ).style.display = this.checked ? "block" : "none";
                                        });
                                });
                        }
                    });
                break;
            case "9":
                showElements(["serv_especiales"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "10":
                showElements(["rescate"]);
                document.getElementById("button_submit").style.display = "none";

                document
                    .getElementById("id_rescate_form-tipo_rescate")
                    .addEventListener("change", function () {
                        if (this.value == "1") {
                            showElements(["rescate", "rescate_animal"]);
                            document.getElementById("button_submit").style.display = "block";
                        } else if (this.value == "2") {
                            showElements(["rescate", "rescate_persona"]);
                            document.getElementById("button_submit").style.display = "block";
                        }
                    });
                break;
            case "11":
                showElements(["incendio_form"]);
                document
                    .getElementById("id_incendio_form-check_agregar_persona")
                    .addEventListener("change", function () {
                        document.getElementById("persona_presente").style.display = this
                            .checked
                            ? "block"
                            : "none";
                    });
                document
                    .getElementById("id_incendio_form-check_agregar_vehiculo")
                    .addEventListener("change", function () {
                        document.getElementById("detalles_vehiculo").style.display = this
                            .checked
                            ? "block"
                            : "none";
                    });
                document.getElementById("button_submit").style.display = "block";
                break;
            case "12":
                showElements(["fallecidos"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "13":
                showElements(["mitigacion_riesgo"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "14":
                showElements(["evaluacion_riesgo"]);
                document.getElementById("button_submit").style.display = "block";

                query = document.getElementById("id_form1-opciones")
                if (query.value === "3") {
                    showElements(["evaluacion_riesgo", "form_persona_presente"])
                }
                break;
            case "15":
                showElements(["puesto_avanzada"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "16":
                showElements(["traslados_prehospitalaria"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "17":
                showElements(["asesoramiento_form"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "20":
                showElements(["reinspeccion_prevencion"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            case "21":
                showElements(["retencion_preventiva"]);
                document.getElementById("button_submit").style.display = "block";
                break;
            default:
                elementsToHide.forEach(
                    (id) => (document.getElementById(id).style.display = "none")
                );
                document.getElementById("button_submit").style.display = "none";
                break;
        }
    });

{/* <!--select input validation-- > */ }
document
    .getElementById("id_form3-municipio")
    .addEventListener("change", function () {
        var select2 = document.getElementById("id_form3-parroquia");
        if (this.value != "1") {
            select2.disabled = true;
        } else {
            select2.disabled = false;
        }
    });

{/* <!--desactivar primera casilla de select-- > */ }
document.addEventListener("DOMContentLoaded", function () {
    const selects = document.querySelectorAll(".disable-first-option");
    selects.forEach((select) => {
        select.options[0].disabled = true;
    });
});
