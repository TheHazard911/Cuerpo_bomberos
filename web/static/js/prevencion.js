
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
                    case "Servicios Especiales":
                        detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data, "tipo_servicio")}
                </section>`;
                        break;
                    case "Evaluación de Riesgos":
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
                        break;
                    case "Asesoramiento":
                        detalles = `
                <section class="detalles_procedimiento">
                  <h4>Detalles</h4>
                  ${generateCommonDetails(data)}
                </section>
                <section class="detalles_procedimiento">
                  <h4>Persona Solicitante</h4>
                  <p><b>Nombre: </b> ${data.nombre}</p>
                  <p><b>Apellido: </b> ${data.apellido}</p>
                  <p><b>Cedula: </b> V-${data.cedula}</p>
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
                  <h4>Persona Solicitante</h4>
                  <p><b>Nombre: </b> ${data.nombre}</p>
                  <p><b>Apellido: </b> ${data.apellido}</p>
                  <p><b>Cedula: </b> V-${data.cedula}</p>
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
                  <p><b>Numero de Constancia de Retencion: </b>#${data.nro_constancia}</p>
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


(function () {
    function setupSearch(inputId, columnIndex) {
        document.getElementById(inputId).addEventListener("input", function () {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll("#data-table tbody tr");

            rows.forEach((row) => {
                const dateCell = row.querySelector(`td:nth-child(${columnIndex})`);
                const originalText = dateCell.textContent;
                const dateText = originalText.toLowerCase();

                if (dateText.includes(filter)) {
                    const startIndex = dateText.indexOf(filter);
                    const endIndex = startIndex + filter.length;

                    // Crear un nuevo span para la parte resaltada
                    const highlightedText = document.createElement("span");
                    highlightedText.style.backgroundColor = "yellow";
                    highlightedText.textContent = originalText.substring(
                        startIndex,
                        endIndex
                    );

                    // Crear un contenedor para el texto resaltado y el resto del texto
                    const beforeText = document.createTextNode(
                        originalText.substring(0, startIndex)
                    );
                    const afterText = document.createTextNode(
                        originalText.substring(endIndex)
                    );

                    dateCell.innerHTML = ""; // Limpiar el contenido anterior
                    dateCell.appendChild(beforeText);
                    dateCell.appendChild(highlightedText);
                    dateCell.appendChild(afterText);
                    row.style.display = "";
                } else {
                    dateCell.innerHTML = originalText; // Resetear cualquier resaltado previo
                    row.style.display = "none";
                }
            });
        });
    }

    // Llamar a la función para cada input y su columna correspondiente
    setupSearch("search-input", 9);
    setupSearch("search-input-two", 6);
    setupSearch("search-input-three", 11);
})();