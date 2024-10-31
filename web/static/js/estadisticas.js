document
  .getElementById("monthSelector")
  .addEventListener("change", function () {
    const selectedMonth = this.value; // Captura el valor del selector de mes
    obtenerResultados(selectedMonth);
  });

function obtenerResultados(selectedMonth) {
  // Determinar el endpoint: si `selectedMonth` está vacío, no enviamos el parámetro `month`
  const url = selectedMonth
    ? `/api/generar_estadistica/?month=${selectedMonth}`
    : `/api/generar_estadistica/`; // Solicitud sin el parámetro `month` para obtener todo el año

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      // Elementos de lista para cada división
      const listaOperaciones = document.getElementById("list_operaciones");
      const listaPrehospitalaria = document.getElementById(
        "list_prehospitalaria"
      );
      const listaMedicos = document.getElementById("list_medicos");
      const listaGrumae = document.getElementById("list_grumae");
      const listaRescate = document.getElementById("list_rescate");
      const listaPrevencion = document.getElementById("list_prevencion");
      const listaEnfermeria = document.getElementById("list_enfermeria");
      const listaCapacitacion = document.getElementById("list_capacitacion");
      const listaPsicologia = document.getElementById("list_psicologia");

      // Limpiar las listas antes de agregar nuevos datos
      listaOperaciones.innerHTML = "";
      listaPrehospitalaria.innerHTML = "";
      listaMedicos.innerHTML = "";
      listaGrumae.innerHTML = "";
      listaRescate.innerHTML = "";
      listaPrevencion.innerHTML = "";
      listaEnfermeria.innerHTML = "";
      listaCapacitacion.innerHTML = "";
      listaPsicologia.innerHTML = "";

      // Función para procesar y añadir datos a cada lista
      function procesarDivision(dataDivision, listaElemento) {
        if (dataDivision) {
          for (const tipoProcedimiento in dataDivision.detalles) {
            // Crear elemento <li> para el tipo de procedimiento
            const li = document.createElement("li");
            li.textContent = `${tipoProcedimiento}: ${dataDivision.total_por_tipo[tipoProcedimiento]}`;

            // Crear lista interna de parroquias y cantidades
            const ulParroquias = document.createElement("ol");

            // Añadir cada parroquia y su cantidad a la lista interna
            for (const parroquia in dataDivision.detalles[tipoProcedimiento]) {
              const cantidad =
                dataDivision.detalles[tipoProcedimiento][parroquia];
              const liParroquia = document.createElement("li");
              liParroquia.textContent = `${parroquia}: ${cantidad}`;
              ulParroquias.appendChild(liParroquia);
            }

            // Añadir lista de parroquias al elemento <li> del tipo de procedimiento
            li.appendChild(ulParroquias);

            // Añadir el <li> del tipo de procedimiento a la lista principal
            listaElemento.appendChild(li);
          }
        }
      }

      // Llamar a la función para cada división con sus respectivos elementos
      procesarDivision(data.Operaciones, listaOperaciones);
      procesarDivision(data.Prehospitalaria, listaPrehospitalaria);
      procesarDivision(data.ServiciosMédicos, listaMedicos);
      procesarDivision(data.Grumae, listaGrumae);
      procesarDivision(data.Rescate, listaRescate);
      procesarDivision(data.Prevención, listaPrevencion);
      procesarDivision(data.Enfermería, listaEnfermeria);
      procesarDivision(data.Capacitación, listaCapacitacion);
      procesarDivision(data.Psicología, listaPsicologia);
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}
// Llamada inicial para cargar los datos de todo el año al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  obtenerResultados(""); // Llama a `obtenerResultados` sin ningún mes seleccionado para obtener datos del año
});

// Grafica de Pie, Procedimientos por Division
document.addEventListener("DOMContentLoaded", function () {
  const selectDivision = document.querySelector(".form-select-sm");
  const monthPicker = document.getElementById("month-picker2");
  let chart;

  // Establecer una división por defecto (por ejemplo, la primera opción)
  selectDivision.value = selectDivision.options[6].value; // Cambia el índice según la división que quieras por defecto

  async function fetchProcedimientos(divisionId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_division/?division_id=${divisionId}&mes=${mes}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error fetching data");
      }
      return await response.json();
    } catch (error) {
      return null; // Retorna null si hay un error
    }
  }

  async function updateChart() {
    const divisionId = selectDivision.value;
    const mesSeleccionado = monthPicker.value;

    const data = await fetchProcedimientos(divisionId, mesSeleccionado);

    // Verifica si se recibieron datos válidos
    if (!data || data.length === 0) {

      // Cargar gráfica vacía
      const ctx1 = document.getElementById("pie").getContext("2d");

      // Destruir el gráfico existente si ya está creado
      if (chart) {
        chart.destroy();
      }

      // Crear un nuevo gráfico de pie con datos vacíos
      chart = new Chart(ctx1, {
        type: "pie",
        data: {
          labels: ["Ninguno"], // No hay etiquetas
          datasets: [
            {
              label: "Procedimientos",
              data: [0], // No hay datos
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 16,
                },
              },
            },
          },
        },
      });
      return; // Termina la función para evitar crear una gráfica con datos
    }

    const labels = data.map(
      (proc) => proc.id_tipo_procedimiento__tipo_procedimiento // Asegúrate de que este campo existe
    );
    const values = data.map((proc) => proc.count);

    const ctx1 = document.getElementById("pie").getContext("2d");

    // Destruir el gráfico existente si ya está creado
    if (chart) {
      chart.destroy();
    }

    // Crear un nuevo gráfico de pie
    chart = new Chart(ctx1, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Procedimientos",
            data: values,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });
  }

  // Añadir event listeners
  selectDivision.addEventListener("change", updateChart);
  monthPicker.addEventListener("change", updateChart);

  // Llamar a updateChart para cargar la gráfica por defecto
  updateChart();
});

const ctx2 = document.getElementById("donuts");
new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true, // Para mostrar la leyenda
        labels: {
          font: {
            size: 16, // Ajusta el tamaño de la fuente aquí
          },
        },
      },
    },
  },
});

// Actualizar grafico de barras
document.addEventListener("DOMContentLoaded", function() {

  let chart; // Declarar chart fuera de las funciones para que sea accesible
  
  async function fetchDivisiones(mes = "") {
    try {
      const response = await fetch(`/api/divisiones_estadisticas/?mes=${mes}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching divisiones:", error);
    return {};
  }
}

function updateCards(data) {
  for (const [division, detalles] of Object.entries(data)) {
    const count = detalles.total || 0; // Solo total
    
    const card = document.querySelector(
      `li[data-division="${division}"] .count`
    );
    if (card) {
      card.textContent = count;
    }
  }
}

function obtenerDivisiones(data) {
  const divisionesList = [];
  for (const [division, detalles] of Object.entries(data)) {
    // Solo tomar el total
    divisionesList.push({ division, count: detalles.total || 0 });
  }
  return divisionesList;
}

async function init() {
  const data = await fetchDivisiones(); // Sin mes seleccionado
  updateCards(data); // Solo datos totales
  actualizarGrafica(data);
}

function actualizarGrafica(data) {
  const divisiones = obtenerDivisiones(data);
  const labels = divisiones.map((item) => item.division);
  const values = divisiones.map((item) => item.count);
  
  const ctx6 = document.getElementById("bar").getContext("2d");
  
  // Destruir el gráfico existente si ya está creado
  if (chart) {
    chart.destroy();
  }
  
  // Crear un nuevo gráfico de barras
  chart = new Chart(ctx6, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Procedimientos",
          data: values,
          borderWidth: 1,
          backgroundColor: [
            "rgba(19, 141, 117, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderColor: [
            "rgba(19, 141, 117, 1)",
            "rgba(54, 162, 235, 2)",
            "rgba(255, 206, 86, 2)",
            "rgba(75, 192, 192, 2)",
            "rgba(153, 102, 255, 2)",
            "rgba(255, 159, 64, 2)",
            "rgba(255, 99, 132, 2)",
            "rgba(54, 162, 235, 2)",
            "rgba(255, 206, 86, 2)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { ticks: { font: { size: 15 } } },
        y: { ticks: { font: { size: 18 } } },
      },
    },
  });
}

// Manejar el evento de cambio del input de mes
document
.getElementById("month-picker")
.addEventListener("change", async (event) => {
  const mesSeleccionado = event.target.value; // Obtener el valor del mes seleccionado
  const data = await fetchDivisiones(mesSeleccionado); // Llamar a la API con el mes seleccionado
  updateCards(data); // Actualizar las tarjetas
  actualizarGrafica(data); // Actualizar la gráfica
});

window.onload = init;
})