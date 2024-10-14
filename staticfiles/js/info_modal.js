// Obtener elementos
const info_modal = document.getElementById("info_modal");

document.querySelectorAll(".button-info").forEach((button) => {
  button.onclick = function () {
    const id = this.getAttribute("data-id");
    const id_tipo_procedimiento = this.getAttribute("data-id_procedimiento");

    fetch(`/api/procedimientos/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let solicitante
        if (data.solicitante_externo == "") {
          solicitante = data.solicitante
        } else {
          solicitante = data.solicitante_externo
        }
        const baseInfo = `
            <article class="section-left">
              <section class="datos_division">
                <h4>Division</h4>
                <p><b>Division: </b> ${data.division}</p>
                <p><b>ID Procedimiento: </b> #${data.id}</p>
              </section>
              <section class="datos_operacion">
                <h4>Operacion</h4>
                <p><b>Solicitante: </b> ${solicitante}</p>
                <p><b>Jefe de Comision: </b> ${data.jefe_comision}</p>
                <p><b>Unidad Enviada: </b> ${data.unidad}</p>
                <p><b>Efectivos Enviados: </b> ${data.efectivos}</p>
              </section>
              <section class="datos_ubicacion">
                <h4>Ubicacion</h4>
                <p><b>Parroquia: </b> ${data.parroquia}</p>
                <p><b>Municipio: </b> ${data.municipio}</p>
                <p><b>Direccion: </b> ${data.direccion}</p>
                <p><b>Fecha: </b> ${data.fecha}</p>
                <p><b>Hora: </b> ${data.hora}</p>
              </section>`;

        let detalles = "";

        // Estructura if-else para manejar cada tipo de procedimiento
        switch (id_tipo_procedimiento) {
          case "Abastecimiento de agua":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "ente_suministrado")}
                </section>
                <section>
                  <h4>Comunidad</h4>
                  <p><b>Personas Atendidas: </b> ${data.personas_atendidas}</p>
                  <p><b>Nombre Persona Presente: </b> ${data.nombres}</p>
                  <p><b>Apellidos Persona Presente: </b> ${data.apellidos}</p>
                  <p><b>Cedula Persona Presente: </b> V-${data.cedula}</p>
                  <p><b>Litros de Agua Suministrada: </b> ${data.ltrs_agua}</p>
                </section>`;
            break;
          case "Apoyo a Otras Unidades":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_apoyo", "unidad_apoyada")}
                </section>`;
            break;
          case "Guardia de Prevencion":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "motivo_prevencion")}
                </section>`;
            break;
          case "Atendido No Efectuado":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data)}
                </section> 
                `;
            break;
          case "Despliegue de Seguridad":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "motivo_despliegue")}
                </section>`;
            break;
          case "Falsa Alarma":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "motivo_alarma")}
                </section> 
                `;
            break;
          case "Atenciones Paramedicas":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  <p><b>Tipo de Procedimiento: </b> ${data.tipo_procedimiento}</p>
                  <p><b>Tipo de Atencion: </b> ${data.tipo_atencion}</p>
                `;
            if (data.emergencia) {
              detalles += `
                  </section>
                  <section class="detalles_procedimiento">
                    <h4>Atendido</h4>
                    <p><b>Nombres: </b> ${data.nombres}</p>
                    <p><b>Apellidos: </b> ${data.apellidos}</p>
                    <p><b>Cedula: </b> ${data.cedula}</p>
                    <p><b>Edad: </b> ${data.edad}</p>
                    <p><b>Sexo: </b> ${data.sexo}</p>
                  </section>
                  <section class="detalles_procedimiento">
                    <h4>Emergencia</h4>
                    <p><b>IDX: </b> ${data.idx}</p>
                    <p><b>Descripcion: </b> ${data.descripcion}</p>
                    <p><b>Material Utilizado: </b> ${data.material_utilizado}</p>
                    <p><b>Status: </b> ${data.status}</p>
                  </section>`;
              if (data.traslado) {
                detalles += `
                    <section class="detalles_procedimiento">
                      <h4>Traslado</h4>
                      <p><b>Hospital: </b> ${data.hospital}</p>
                      <p><b>Medico: </b> ${data.medico}</p>
                      <p><b>MPPS CMT: </b> ${data.mpps_cmt}</p>
                    </section>`;
              }
            }
            if (data.accidente) {
              detalles += `
                  <p><b>Tipo de Accidente: </b> ${data.tipo_accidente}</p>
                  <p><b>Cantidad Lesionados: </b> ${data.cantidad_lesionados}</p>
                  <p><b>Material Utilizado: </b> ${data.material_utilizado}</p>
                  <p><b>Status: </b> ${data.status}</p>
                </section>`;

              // Verificamos si hay vehículos
              if (data.vehiculos && data.vehiculos.length > 0) {
                data.vehiculos.forEach((vehiculo, index) => {
                  // Creamos una sección para cada vehículo
                  detalles += `
                      <section class="detalles_procedimiento">
                        <h4>Vehículo ${index + 1}</h4>
                        <p><b>Marca:</b> ${vehiculo.marca}</p>
                        <p><b>Modelo:</b> ${vehiculo.modelo}</p>
                        <p><b>Color:</b> ${vehiculo.color}</p>
                        <p><b>Año:</b> ${vehiculo.año}</p>
                        <p><b>Placa:</b> ${vehiculo.placas}</p>
                      </section>`;
                });
              } else {
              }

              // Verificamos si hay lesionados
              if (data.lesionados && data.lesionados.length > 0) {
                data.lesionados.forEach((lesionado, index) => {
                  // Creamos una sección para cada lesionado
                  detalles += `
                  <section class="detalles_lesionados">
                  <div>
                  <h4>Lesionado ${index + 1}</h4>
                  <p><b>Nombre:</b> ${lesionado.nombre}</p>
                  <p><b>Apellidos:</b> ${lesionado.apellidos}</p>
                  <p><b>Cédula:</b> ${lesionado.cedula}</p>
                  <p><b>Edad:</b> ${lesionado.edad}</p>
                  <p><b>Sexo:</b> ${lesionado.sexo}</p>
                  <p><b>Descripción:</b> ${lesionado.descripcion}</p>
                  </div>
                  `;
                  // Verificamos si el lesionado tiene traslados asociados
                  if (lesionado.traslados && lesionado.traslados.length > 0) {
                    lesionado.traslados.forEach((traslado, trasladoIndex) => {
                      // Añadimos una sub-sección para cada traslado
                      detalles += `
                      <div>
                      <h4>Traslado</h4>
                      <p><b>Hospital:</b> ${traslado.hospital}</p>
                      <p><b>Médico receptor:</b> ${traslado.medico}</p>
                      <p><b>MPPS CMT:</b> ${traslado.mpps_cmt}</p>
                      </div>
                        </section>`;
                    });
                  } else {
                    detalles += `</section>`;
                  }
                });
              } else {
              }
            }
            break;
          case "Servicios Especiales":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_servicio")}
                </section>`;
            break;
          case "Rescate":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  <p><b>Tipo de Procedimiento: </b> ${data.tipo_procedimiento
              }</p>
                  <p><b>Tipo de Rescate: </b> ${data.tipo_rescate}</p>
                  <p><b>Material Utilizado: </b> ${data.material_utilizado}</p>
                  <p><b>Status: </b> ${data.status}</p>
                </section>
                 `
                 if (data.tipo_rescate === "Animal"){
                   detalles += `
                   <section class="detalles_rescate_animal">
                     <h4>Animal</h4>
                     <p><b>Especie: </b> ${data.especie}</p>
                     <p><b>Descripcion: </b> ${data.descripcion}</p>
                   </section>
                   `
                 } else {
                   detalles += `
                   <section class="detalles_rescate_persona">
                     <h4>Persona</h4>
                     <p><b>Nombre: </b> ${data.nombres}</p>
                     <p><b>Apellido: </b> ${data.apellidos}</p>
                     <p><b>Cedula: </b> ${data.cedula}</p>
                     <p><b>Edad: </b> ${data.edad}</p>
                     <p><b>Sexo: </b> ${data.sexo}</p>
                     <p><b>Descripcion: </b> ${data.descripcion}</p>
                   </section>`
                 }
                 
            break;
          case "Incendios":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_incendio")}
                </section>
                ${data.persona
                ? `
                  <section class="detalles_persona_sitio">
                    <h4>Persona en el Sitio</h4>
                    <p><b>Nombre: </b> ${data.nombre}</p>
                    <p><b>Apellido: </b> ${data.apellidos}</p>
                    <p><b>Cedula: </b> ${data.cedula}</p>
                    <p><b>Edad: </b> ${data.edad}</p>
                  </section>`
                : ""
              }
                ${data.vehiculo
                ? `
                  <section class="detalles_vehiculo">
                    <h4>Vehiculo</h4>
                    <p><b>Modelo: </b> ${data.modelo}</p>
                    <p><b>Marca: </b> ${data.marca}</p>
                    <p><b>Color: </b> ${data.color}</p>
                    <p><b>Año: </b> ${data.año}</p>
                    <p><b>Placas: </b> ${data.placas}</p>
                  </section>`
                : ""
              }`;
            break;
          case "Fallecidos":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "motivo_fallecimiento")}
                </section>
                <section class="detalles_procedimiento">
                  <h4>Fallecido</h4>
                  <p><b>Nombre: </b> ${data.nombres}</p>
                  <p><b>Apellido: </b> ${data.apellidos}</p>
                  <p><b>Cedula: </b> ${data.cedula}</p>
                  <p><b>Edad: </b> ${data.edad}</p>
                  <p><b>Sexo: </b> ${data.sexo}</p>
                </section>`;
            break;
          case "Mitigación de Riesgos":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_servicio")}
                </section>`;
            break;
          case "Puesto de Avanzada":
            detalles = `
                        <section class="detalles_procedimiento">
                        <h4>Detalles</h4>
                        ${generateCommonDetails(data, "tipo_de_servicio")}
                        </section>`;
            break;
          case "Evaluación de Riesgos":

            if(data.tipo_estructura){
              if(data.division == "Prevencion"){
                detalles = `
                <section class="detalles_procedimiento">
                <h4>Detalles</h4>
                ${generateCommonDetails(data, "tipo_de_evaluacion", "tipo_estructura")}
                </section>
                <section class="detalles_procedimiento">
                <h4>Persona Presente</h4>
                <p><b>Nombre: </b> ${data.nombre}</p>
                <p><b>Apellido: </b> ${data.apellido}</p>
                <p><b>Cedula: </b> V-${data.cedula}</p>
                <p><b>Telefono: </b> ${data.telefono}</p>
                </section>`;
              } else {
                detalles = `
                <section class="detalles_procedimiento">
                <h4>Detalles</h4>
                ${generateCommonDetails(data, "tipo_de_evaluacion", "tipo_estructura")}
                </section>`;
              }
            } else {
                if(data.division == "Prevencion"){
                  detalles = `
                  <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_de_evaluacion")}
                  </section>
                  <section class="detalles_procedimiento">
                  <h4>Persona Presente</h4>
                  <p><b>Nombre: </b> ${data.nombre}</p>
                  <p><b>Apellido: </b> ${data.apellido}</p>
                  <p><b>Cedula: </b> V-${data.cedula}</p>
                  <p><b>Telefono: </b> ${data.telefono}</p>
                  </section>`;
                } else {
                  detalles = `
                  <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_de_evaluacion")}
                  </section>`;
                }
            }
            break;
          case "Asesoramiento":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data)}
                </section>
                <section class="detalles_procedimiento">
                  <h4>Informacion del Comercio</h4>
                  <p><b>Nombre del Comercio: </b> ${data.nombre_comercio}</p>
                  <p><b>RIF del Comercio: </b> ${data.rif_comercio}</p>
                </section>
                <section class="detalles_procedimiento">
                  <h4>Persona Solicitante</h4>
                  <p><b>Nombre: </b> ${data.nombre}</p>
                  <p><b>Apellido: </b> ${data.apellido}</p>
                  <p><b>Cedula: </b> V-${data.cedula}</p>
                  <p><b>Sexo: </b> ${data.sexo}</p>
                  <p><b>Telefono: </b> ${data.telefono}</p>
                </section>`;
            break;
          case "Reinspeccion de Prevención":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data)}
                </section>
                <section class="detalles_procedimiento">
                  <h4>Informacion del Comercio</h4>
                  <p><b>Nombre del Comercio: </b> ${data.nombre_comercio}</p>
                  <p><b>Rif del Comercio: </b> ${data.rif_comercio}</p>
                </section>
                <section class="detalles_procedimiento">
                  <h4>Persona Solicitante</h4>
                  <p><b>Nombre: </b> ${data.nombre}</p>
                  <p><b>Apellido: </b> ${data.apellido}</p>
                  <p><b>Cedula: </b> V-${data.cedula}</p>
                  <p><b>Sexo: </b> ${data.sexo}</p>
                  <p><b>Telefono: </b> ${data.telefono}</p>
                </section>`;
            break;
          case "Retención Preventiva":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_retencion")}
                </section>
                <section class="detalles_procedimiento">
                  <h4>Datos del Cilindro</h4>
                  <p><b>Tipo de Cilindro: </b> ${data.tipo_cilindro}</p>
                  <p><b>Capacidad: </b> ${data.capacidad} Kg</p>
                  <p><b>serial: </b> ${data.serial}</p>
                  <p><b>Numero de Constancia de Retencion: </b>#${data.nro_constancia
              }</p>
                </section>`;
            break;
          case "Traslados":
            detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "traslado")}
                </section>
                <section class="detalles_procedimiento">
                  <h4>Persona Trasladada</h4>
                  <p><b>Nombre: </b> ${data.nombre}</p>
                  <p><b>Apellido: </b> ${data.apellido}</p>
                  <p><b>Cedula: </b> ${data.cedula}</p>
                  <p><b>Edad: </b> ${data.edad}</p>
                  <p><b>Sexo: </b> ${data.sexo}</p>
                  <p><b>idx: </b> ${data.idx}</p>
                </section>
                <section class="detalles_procedimiento">
                  <h4>Hopsital De Traslado</h4>
                  <p><b>Hospital: </b> ${data.hospital}</p>
                  <p><b>Medico Receptor: </b> ${data.medico}</p>
                  <p><b>MPPS CMT: </b> ${data.mpps}</p>
                </section>`;
            break;

          default:
            detalles = "<h2>Error: Tipo de Procedimiento no válido</h2>";
        }

        info_modal.innerHTML = baseInfo + detalles + "</article>";
      })
      .catch((error) => console.error("Error:", error));
  };
});

function generateCommonDetails(
  data,
  additionalField = "",
  additionalField2 = ""
) {
  return `
      <p><b>Tipo de Procedimiento: </b> ${data.tipo_procedimiento}</p>
      ${additionalField
      ? `<p><b>${additionalField
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())}: </b> ${data[additionalField]
      }</p>`
      : ""
    }
      ${additionalField2
      ? `<p><b>${additionalField2
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())}: </b> ${data[additionalField2]
      }</p>`
      : ""
    }
      <p><b>Descripcion: </b> ${data.descripcion}</p>
      <p><b>Material Utilizado: </b> ${data.material_utilizado}</p>
      <p><b>Status: </b> ${data.status}</p>
    `;
}
