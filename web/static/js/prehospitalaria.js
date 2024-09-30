
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
                const baseInfo = `
            <article class="section-left">
              <section class="datos_division">
                <h4>Division</h4>
                <p><b>Division: </b> ${data.division}</p>
                <p><b>ID Procedimiento: </b> #${data.id}</p>
              </section>
              <section class="datos_operacion">
                <h4>Operacion</h4>
                <p><b>Solicitante: </b> ${data.solicitante}</p>
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
                    case "Guardia de Prevencion":
                        detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "motivo_prevencion")}
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
                                detalles += "<p>No se encontraron vehículos.</p>";
                            }

                            if (data.lesionados) {
                                detalles += `
                    <section class="detalles_procedimientos">
                      <h4>Lesionado</h4>
                      <p><b>Nombre: </b> ${data.nombre}</p>
                      <p><b>Apellido: </b> ${data.apellidos}</p>
                      <p><b>Cedula: </b> ${data.cedula}</p>
                      <p><b>Edad: </b> ${data.edad}</p>
                      <p><b>Sexo: </b> ${data.sexo}</p>
                      <p><b>IDX: </b> ${data.idx}</p>
                      <p><b>Descripcion: </b> ${data.descripcion}</p>
                    </section>`;
                            }
                            if (data.traslado) {
                                detalles += `
                    <section class="detalles_procedimientos">
                      <h4>Traslado</h4>
                      <p><b>Hospital: </b> ${data.hospita}</p>
                      <p><b>Medico: </b> ${data.medico}</p>
                      <p><b>MPPS CMT: </b> ${data.mpps_cmt}</p>
                    </section>`;
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
                    case "Puesto de Avanzada":
                        detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_de_servicio")}
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

// Obtener elementos
const infoProcedimiento = document.getElementById("infoProcedimiento");
const confirmarEliminar = document.getElementById("confirmarEliminar");

// Abrir modal y mostrar información
document.querySelectorAll(".button_delete").forEach((button) => {
    button.onclick = function () {
        const id = this.getAttribute("data-id");
        const id_mostrar = this.getAttribute("data-id_mostrar");
        const solicitante = this.getAttribute("data-solicitante");
        const jefe_comision = this.getAttribute("data-jefeComision");
        const fecha = this.getAttribute("data-fecha");
        const tipo_procedimiento = this.getAttribute("data-tipoProcedimiento");
        infoProcedimiento.innerHTML = `
      <p><b>ID: </b>${id_mostrar} </p>
      <p><b>Solicitante:</b> ${solicitante}</p>
      <p><b>Jefe de Comision:</b> ${jefe_comision}</p>
      <p><b>Fecha:</b> ${fecha}</p>
      <p><b>Tipo De Procedimiento:</b> ${tipo_procedimiento}</p>`;
        confirmarEliminar.setAttribute("data-id", id);
    };
});

// Confirmar eliminación
confirmarEliminar.onclick = function () {
    const id = this.getAttribute("data-id");
    eliminarProcedimiento(id);
};

// Función para eliminar procedimiento
function eliminarProcedimiento(id) {
    fetch("/operaciones/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"), // Asegúrate de incluir el token CSRF
        },
        body: JSON.stringify({ id: id }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Eliminar el procedimiento de la vista
                document
                    .querySelector(`button[data-id="${id}"]`)
                    .parentElement.remove();
                location.reload();
            } else {
                alert("Error al eliminar el procedimiento");
            }
        });
}

// Función para obtener el token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
