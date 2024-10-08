// < !--Script para cambiar el menu desplegable de tipo de procedimiento segun la division-- >
// Define las opciones por categoría

var inputExterno = document.getElementById("id_form2-solicitante_externo");

// Luego selecciona el div que es el padre del input
var divContainer = inputExterno.parentElement;

// Ocultar el div
divContainer.style.display = "none";
inputExterno.removeAttribute("required")

document
  .getElementById("id_form2-solicitante")
  .addEventListener("change", function () {

    if (this.value == "0") {  // Ajusta el valor de "1" según tu lógica
      divContainer.style.display = "flex";
      inputExterno.setAttribute("required", "required")
    } else {
      divContainer.style.display = "none";   // Ocultar solicitante_externo
      inputExterno.removeAttribute("required")
    }
  });

const opcionesPorCategoria = {
  "": [{ value: "-", text: "Elige Una Division" }],
  1: [
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
  2: [
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
    { value: "14", text: "Evaluación de Riesgos" },
  ],
  3: [
    { value: "14", text: "Evaluacion de Riesgos" },
    { value: "17", text: "Asesoramiento" },
    { value: "18", text: "Inspeccion" },
    { value: "19", text: "Investigacion" },
    { value: "20", text: "Reinspeccion de Prevencion" },
    { value: "21", text: "Retencion Preventiva" }
  ],
  4: [
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
  5: [
    { value: "3", text: "Guardia de Prevención" },
    { value: "4", text: "Atendido No Efectuado" },
    { value: "6", text: "Falsa Alarma" },
    { value: "7", text: "Atenciones Paramedicas" },
    { value: "9", text: "Servicios Especiales" },
    { value: "12", text: "Fallecidos" },
    { value: "15", text: "Puesto de Avanzada" },
    { value: "16", text: "Traslados" },
  ],

  8: [{ value: "00", text: "Terapia Psicológica" }],
  // Puedes agregar más categorías según sea necesario
};

const selectOpciones = document.getElementById("id_form1-opciones");
const selectTipoProcedimiento = document.getElementById(
  "id_form4-tipo_procedimiento"
);

// Función para actualizar las opciones del segundo select
function actualizarOpciones() {
  hideAllForms()
  const selectedValue = selectOpciones.value;

  // Limpia las opciones actuales del segundo select
  selectTipoProcedimiento.innerHTML = "";

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
    opcionesPorCategoria[selectedValue].forEach((optionData) => {
      const optionElement = document.createElement("option");
      optionElement.value = optionData.value;
      optionElement.textContent = optionData.text;
      selectTipoProcedimiento.appendChild(optionElement);
    });
  }
}

actualizarOpciones();
// Evento cuando cambia el primer select
selectOpciones.addEventListener("change", actualizarOpciones);

function hideAllForms() {
  const forms = document.querySelectorAll(".disp-none");
  forms.forEach(form => {
    form.style.display = "none";
  });
}

function requiredFalse() {
  const campos = document
    .getElementById("detalles-form")
    .querySelectorAll("select, input");
  campos.forEach((campo) => {
    campo.removeAttribute("required");
  });
}
function requiredExceptions(elements) {
  const campos = elements;
  campos.forEach((campo) => {
    campo.removeAttribute("required");
  });
}

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
      "lesionado_accidente2",
      "lesionado_accidente3",
      "traslado_accidente",
      "traslado_accidente2",
      "traslado_accidente3",
      "evaluacion_riesgo",
      "mitigacion_riesgo",
      "puesto_avanzada",
      "traslados_prehospitalaria",
      "asesoramiento_form",
      "form_persona_presente",
      "reinspeccion_prevencion",
      "retencion_preventiva",
    ];

    const showElements = (elementsToShow) => {
      // Primero ocultamos todos los elementos, usando la clase 'non-visible'
      elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.style.display = "none";
        }
      });

      // Luego mostramos los elementos específicos, usando la clase 'visible'
      elementsToShow.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.style.display = "block";
        }
      });
    };

    let campos;
    switch (this.value) {
      case "1":
        requiredFalse();
        showElements(["abast_agua"]);
        campos = document
          .getElementById("abast_agua")
          .querySelectorAll("select, input");
        setRequired(campos, true); // Agregar required a la nueva sección
        document.getElementById("button_submit").style.display = "block";
        break;
      case "2":
        requiredFalse();
        showElements(["apoyo_unid"]);
        campos = document
          .getElementById("apoyo_unid")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "3":
        requiredFalse();
        showElements(["guard_prev"]);
        campos = document
          .getElementById("guard_prev")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "4":
        requiredFalse();
        showElements(["atend_no_efect"]);
        campos = document
          .getElementById("atend_no_efect")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "5":
        requiredFalse();
        showElements(["desp_seguridad"]);
        campos = document
          .getElementById("desp_seguridad")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "6":
        requiredFalse();
        showElements(["falsa_alarm"]);
        campos = document
          .getElementById("falsa_alarm")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "7":
        requiredFalse();
        showElements(["atenciones_paramedicas"]);
        document.getElementById("button_submit").style.display = "none";

        // Obtener los campos de "atenciones_paramedicas"
        campos = document
          .getElementById("atenciones_paramedicas")
          .querySelectorAll("select, input");
        setRequired(campos, true); // Establecer required en true para los campos de la sección actual

        document
          .getElementById("id_atenciones_paramedicas-tipo_atencion")
          .addEventListener("change", function () {
            // Remover required de los campos de "atenciones_paramedicas" cuando se cambie la opción
            // setRequired(campos, false);

            if (this.value === "Emergencias Medicas") {
              requiredFalse();
              showElements(["atenciones_paramedicas", "emergencias_medicas"]);
              document.getElementById("button_submit").style.display = "block";

              // Obtener los campos de "emergencias_medicas" y establecer required
              let emergenciaCampos = document
                .getElementById("emergencias_medicas")
                .querySelectorAll("select, input");
              let accidentesTransito = document
                .getElementById("accidentes_transito")
                .querySelectorAll("select, input");
              let emergenciaCampos_no = document
                .getElementById("emergencias_medicas")
                .querySelectorAll("input[type='checkbox']");

              setRequired(emergenciaCampos, true);
              requiredExceptions(emergenciaCampos_no);
              requiredExceptions(accidentesTransito);

              document
                .getElementById("traslados_emergencias")
                .querySelectorAll("select, input")
                .forEach((ele) => {
                  ele.removeAttribute("required");
                });

              document
                .getElementById("id_emergencias_medicas-trasladado")
                .addEventListener("change", function () {
                  if (this.checked) {
                    document.getElementById(
                      "traslados_emergencias"
                    ).style.display = "block";
                    document
                      .getElementById("traslados_emergencias")
                      .querySelectorAll("select, input")
                      .forEach((ele) => {
                        ele.setAttribute("required", true);
                      });
                  } else {
                    document.getElementById(
                      "traslados_emergencias"
                    ).style.display = "none";
                    document
                      .getElementById("traslados_emergencias")
                      .querySelectorAll("select, input")
                      .forEach((ele) => {
                        ele.removeAttribute("required");
                      });
                  }
                });
            } else if (this.value === "Accidentes de Transito") {
              requiredFalse();
              showElements(["atenciones_paramedicas", "accidentes_transito"]);
              document.getElementById("button_submit").style.display = "block";

              // Obtener los campos de "accidentes_transito" y establecer required
              let accidenteCampos = document
                .getElementById("accidentes_transito")
                .querySelectorAll("select, input");
              let emergenciaCampos = document
                .getElementById("emergencias_medicas")
                .querySelectorAll("select, input");
              let accidenteCampos_no = document
                .getElementById("accidentes_transito")
                .querySelectorAll("input[type='checkbox']");

              setRequired(accidenteCampos, true);
              requiredExceptions(accidenteCampos_no);
              requiredExceptions(emergenciaCampos);

              requiredExceptions(
                document
                  .getElementById("vehiculo_accidente")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("otro_vehiculo_accidente")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("lesionado_accidente")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("lesionado_accidente2")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("lesionado_accidente3")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("traslado_accidente")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("traslado_accidente2")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("traslado_accidente3")
                  .querySelectorAll("select, input")
              );
              requiredExceptions(
                document
                  .getElementById("otro_vehiculo_accidente2")
                  .querySelectorAll("select, input")
              );

              document
                .getElementById(
                  "id_formulario_accidentes_transito-agg_vehiculo"
                )
                .addEventListener("change", function () {
                  if (this.checked) {
                    document.getElementById(
                      "vehiculo_accidente"
                    ).style.display = "flex";

                    document
                      .getElementById("vehiculo_accidente")
                      .querySelectorAll("select, input")
                      .forEach((ele) => {
                        ele.setAttribute("required", true);
                      });

                    requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                  } else {
                    document.getElementById("vehiculo_accidente").style.display = "none"
                    document
                      .getElementById("vehiculo_accidente")
                      .querySelectorAll("select, input")
                      .forEach((ele) => {
                        ele.removeAttribute("required");
                      });
                  }

                  document
                    .getElementById(
                      "id_detalles_vehiculos_accidentes-agg_vehiculo"
                    )
                    .addEventListener("change", function () {
                      if (this.checked) {
                        document
                          .getElementById("otro_vehiculo_accidente")
                          .querySelectorAll("select, input")
                          .forEach((ele) => {
                            ele.setAttribute("required", true);
                          });
                        document.getElementById(
                          "otro_vehiculo_accidente"
                        ).style.display = "flex";
                        requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                      } else {
                        document
                          .getElementById("otro_vehiculo_accidente")
                          .querySelectorAll("select, input")
                          .forEach((ele) => {
                            ele.removeAttribute("required");
                          });
                        document.getElementById(
                          "otro_vehiculo_accidente"
                        ).style.display = "none";
                      }
                    });
                  document
                    .getElementById(
                      "id_detalles_vehiculos_accidentes2-agg_vehiculo"
                    )
                    .addEventListener("change", function () {
                      if (this.checked) {
                        document
                          .getElementById("otro_vehiculo_accidente2")
                          .querySelectorAll("select, input")
                          .forEach((ele) => {
                            ele.setAttribute("required", true);
                          });
                        document.getElementById(
                          "otro_vehiculo_accidente2"
                        ).style.display = "flex";
                        requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                      } else {
                        document
                          .getElementById("otro_vehiculo_accidente2")
                          .querySelectorAll("select, input")
                          .forEach((ele) => {
                            ele.removeAttribute("required");
                          });
                        document.getElementById(
                          "otro_vehiculo_accidente2"
                        ).style.display = "none";
                      }
                    });
                });

              document
                .getElementById(
                  "id_formulario_accidentes_transito-agg_lesionado"
                )
                .addEventListener("change", function () {
                  if (this.checked) {
                    document
                      .getElementById("lesionado_accidente")
                      .querySelectorAll("select, input")
                      .forEach((ele) => {
                        ele.setAttribute("required", true);
                      });
                    document.getElementById(
                      "lesionado_accidente"
                    ).style.display = "flex";

                    requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));

                    document
                      .getElementById(
                        "id_detalles_lesionados_accidentes-otro_lesionado"
                      )
                      .addEventListener("change", function () {
                        if (this.checked) {
                          document
                            .getElementById("lesionado_accidente2")
                            .querySelectorAll("select, input")
                            .forEach((ele) => {
                              ele.setAttribute("required", true);
                            });
                          document.getElementById(
                            "lesionado_accidente2"
                          ).style.display = "flex";

                          requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));

                          document
                            .getElementById(
                              "id_detalles_lesionados_accidentes2-otro_lesionado"
                            )
                            .addEventListener("change", function () {
                              if (this.checked) {
                                document
                                  .getElementById("lesionado_accidente3")
                                  .querySelectorAll("select, input")
                                  .forEach((ele) => {
                                    ele.setAttribute("required", true);
                                  });
                                document.getElementById(
                                  "lesionado_accidente3"
                                ).style.display = "flex";
                                requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                              } else {
                                document
                                  .getElementById("lesionado_accidente3")
                                  .querySelectorAll("select, input")
                                  .forEach((ele) => {
                                    ele.removeAttribute("required");
                                  });
                                document.getElementById(
                                  "lesionado_accidente3"
                                ).style.display = "none";
                              }
                            })

                          document
                            .getElementById(
                              "id_detalles_lesionados_accidentes3-trasladado"
                            )
                            .addEventListener("change", function () {
                              if (this.checked) {
                                document
                                  .getElementById("traslado_accidente3")
                                  .querySelectorAll("select, input")
                                  .forEach((ele) => {
                                    ele.setAttribute("required", true);
                                  });
                                document.getElementById(
                                  "traslado_accidente3"
                                ).style.display = "flex";
                                requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                              } else {
                                document
                                  .getElementById("traslado_accidente3")
                                  .querySelectorAll("select, input")
                                  .forEach((ele) => {
                                    ele.removeAttribute("required");
                                  });
                                document.getElementById(
                                  "traslado_accidente3"
                                ).style.display = "none";
                              }
                            });


                        } else {
                          document
                            .getElementById("lesionado_accidente2")
                            .querySelectorAll("select, input")
                            .forEach((ele) => {
                              ele.removeAttribute("required");
                            });
                          document.getElementById(
                            "lesionado_accidente2"
                          ).style.display = "none";
                        }
                      })

                    document
                      .getElementById(
                        "id_detalles_lesionados_accidentes2-trasladado"
                      )
                      .addEventListener("change", function () {
                        if (this.checked) {
                          document
                            .getElementById("traslado_accidente2")
                            .querySelectorAll("select, input")
                            .forEach((ele) => {
                              ele.setAttribute("required", true);
                            });
                          requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                          document.getElementById(
                            "traslado_accidente2"
                          ).style.display = "flex";
                        } else {
                          document
                            .getElementById("traslado_accidente2")
                            .querySelectorAll("select, input")
                            .forEach((ele) => {
                              ele.removeAttribute("required");
                            });
                          document.getElementById(
                            "traslado_accidente2"
                          ).style.display = "none";
                        }
                      });



                  } else {
                    document
                      .getElementById("lesionado_accidente")
                      .querySelectorAll("select, input")
                      .forEach((ele) => {
                        ele.removeAttribute("required");
                      });
                    document.getElementById(
                      "lesionado_accidente"
                    ).style.display = "none";
                  }

                  document
                    .getElementById(
                      "id_detalles_lesionados_accidentes-trasladado"
                    )
                    .addEventListener("change", function () {
                      if (this.checked) {
                        document
                          .getElementById("traslado_accidente")
                          .querySelectorAll("select, input")
                          .forEach((ele) => {
                            ele.setAttribute("required", true);
                          });
                        document.getElementById(
                          "traslado_accidente"
                        ).style.display = "flex";
                        requiredExceptions(document.getElementById("accidentes_transito").querySelectorAll("input[type='checkbox']"));
                      } else {
                        document
                          .getElementById("traslado_accidente")
                          .querySelectorAll("select, input")
                          .forEach((ele) => {
                            ele.removeAttribute("required");
                          });
                        document.getElementById(
                          "traslado_accidente"
                        ).style.display = "none";
                      }
                    });
                });
            }

            // // Al final, establecer required en true para los campos de la sección activa
            // campos = document.getElementById("atenciones_paramedicas").querySelectorAll("select, input");
            // setRequired(campos, true);
          });
        break;
      case "9":
        requiredFalse();
        showElements(["serv_especiales"]);
        campos = document
          .getElementById("serv_especiales")
          .querySelectorAll("select, input");
        setRequired(campos, true); // Agregar required a la nueva sección
        document.getElementById("button_submit").style.display = "block";
        break;
      case "10":
        requiredFalse();
        showElements(["rescate"]);
        campos = document.getElementById("rescate").querySelectorAll("select, input");
        console.log(campos)
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "none";
        document.
          getElementById("id_rescate_form-tipo_rescate")
          .addEventListener("change", function () {
            if (this.value == "1") {
              requiredExceptions(
                document.getElementById("rescate_persona").querySelectorAll("select, input")
              );
              showElements(["rescate", "rescate_animal"]);
              let campos2 = document.getElementById("rescate_animal").querySelectorAll("select, input");
              setRequired(campos2, true);
              document.getElementById("button_submit").style.display = "block";
            } else if (this.value == "2") {
              requiredExceptions(
                document
                  .getElementById("rescate_animal")
                  .querySelectorAll("select, input")
              );
              showElements(["rescate", "rescate_persona"]);
              let campos2 = document
                .getElementById("rescate_persona")
                .querySelectorAll("select, input");
              setRequired(campos2, true);
              document.getElementById("button_submit").style.display = "block";
            }
          });
        break;
      case "11":
        requiredFalse()
        showElements(["incendio_form"]);
        campos = document.getElementById("incendio_form").querySelectorAll("select, input")
        setRequired(campos, true)
        requiredExceptions(document.getElementById("detalles_vehiculo").querySelectorAll("select, input"))
        requiredExceptions(document.getElementById("persona_presente").querySelectorAll("select, input"))

        document
          .getElementById("id_incendio_form-check_agregar_persona")
          .addEventListener("change", function () {

            if (this.checked) {
              let campo2 = document.getElementById("persona_presente").querySelectorAll("select, input")
              setRequired(campo2, true)
              document.getElementById("persona_presente").style.display = "block"
            } else {
              let campo2 = document.getElementById("persona_presente").querySelectorAll("select, input")
              requiredExceptions(campo2)
              document.getElementById("persona_presente").style.display = "none"
            }

          });
        document
          .getElementById("id_incendio_form-check_agregar_vehiculo")
          .addEventListener("change", function () {

            if (this.checked) {
              let campo2 = document.getElementById("detalles_vehiculo").querySelectorAll("select, input")
              setRequired(campo2, true)
              document.getElementById("detalles_vehiculo").style.display = "block"
            } else {
              let campo2 = document.getElementById("detalles_vehiculo").querySelectorAll("select, input")
              requiredExceptions(campo2)
              document.getElementById("detalles_vehiculo").style.display = "none"
            }

          });
        document.getElementById("button_submit").style.display = "block";
        break;
      case "12":
        requiredFalse();
        showElements(["fallecidos"]);
        campos = document
          .getElementById("fallecidos")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "13":
        requiredFalse();
        showElements(["mitigacion_riesgo"]);
        campos = document
          .getElementById("mitigacion_riesgo")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "14":
        requiredFalse();
        showElements(["evaluacion_riesgo"]);
        campos = document
          .getElementById("evaluacion_riesgo")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        let campos2 = document
          .getElementById("form_persona_presente")
          .querySelectorAll("select, input");

        query = document.getElementById("id_form1-opciones");
        if (query.value === "3") {
          showElements(["evaluacion_riesgo", "form_persona_presente"]);
          setRequired(campos2, true);
        } else {
          requiredExceptions(campos2);
        }
        break;
      case "15":
        requiredFalse();
        showElements(["puesto_avanzada"]);
        campos = document
          .getElementById("puesto_avanzada")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "16":
        requiredFalse();
        showElements(["traslados_prehospitalaria"]);
        campos = document
          .getElementById("traslados_prehospitalaria")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "17":
        requiredFalse();
        showElements(["asesoramiento_form"]);
        campos = document
          .getElementById("asesoramiento_form")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "20":
        requiredFalse();
        showElements(["reinspeccion_prevencion"]);
        campos = document
          .getElementById("reinspeccion_prevencion")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      case "21":
        requiredFalse();
        showElements(["retencion_preventiva"]);
        campos = document
          .getElementById("retencion_preventiva")
          .querySelectorAll("select, input");
        setRequired(campos, true);
        document.getElementById("button_submit").style.display = "block";
        break;
      default:
        elementsToHide.forEach((id) => {
          document.getElementById(id).style.display = "none";
          campos = document
            .getElementById(id)
            .querySelectorAll("select, input");
          setRequired(campos, false); // Remover required de los campos ocultos
        });
        break;
    }

    // Función para establecer el atributo required
    function setRequired(campos, isRequired) {
      campos.forEach((campo) => {
        if (isRequired) {
          campo.setAttribute("required", true);
        } else {
          campo.removeAttribute("required");
        }
      });
    }
  });

{
  /* <!--select input validation-- > */
}
document
  .getElementById("id_form3-municipio")
  .addEventListener("change", function () {
    var select2 = document.getElementById("id_form3-parroquia");

    if (this.value !== "1") {
      select2.disabled = true;
      select2.setAttribute("required", "required"); // Agrega el atributo `required`
    } else {
      select2.disabled = false;
      select2.removeAttribute("required"); // Elimina el atributo `required`
    }
  });

{
  /* <!--desactivar primera casilla de select-- > */
}
document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll(".disable-first-option");
  selects.forEach((select) => {
    select.options[0].disabled = true;
  });
});
