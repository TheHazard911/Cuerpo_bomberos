
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
      const listaPrehospitalaria = document.getElementById("list_prehospitalaria");
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
              const cantidad = dataDivision.detalles[tipoProcedimiento][parroquia];
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

document.addEventListener("DOMContentLoaded", function () {
  // Tu código de Chart.js aquí
  const ctx1 = document.getElementById("pie").getContext('2d');
  new Chart(ctx1, {
    type: "pie",
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
  async function fetchDivisiones() {
    try {
      const response = await fetch("/api/divisiones/");
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

  let chart;

  async function init() {
    const data = await fetchDivisiones();
    updateCards(data); // Solo datos totales
    actualizarGrafica(data);
  }

  function actualizarGrafica(data) {
    const divisiones = obtenerDivisiones(data);
    const labels = divisiones.map((item) => item.division);
    const values = divisiones.map((item) => item.count);

    const ctx6 = document.getElementById("bar");

    if (chart) {
      chart.destroy();
    }

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
              "rgba(19, 141, 117, 1)", // Color 1
              "rgba(54, 162, 235, 1)", // Color 2
              "rgba(255, 206, 86, 1)", // Color 3
              "rgba(75, 192, 192, 1)", // Color 4
              "rgba(153, 102, 255, 1)", // Color 5
              "rgba(255, 159, 64, 1)", // Color 6
              "rgba(255, 99, 132, 1)", // Color 7
              "rgba(54, 162, 235, 1)", // Color 8
              "rgba(255, 206, 86, 1)", // Color 9
            ],
            borderColor: [
              "rgba(19, 141, 117, 1)", // Color de borde 1
              "rgba(54, 162, 235, 2)", // Color de borde 2
              "rgba(255, 206, 86, 2)", // Color de borde 3
              "rgba(75, 192, 192, 2)", // Color de borde 4
              "rgba(153, 102, 255, 2)", // Color de borde 5
              "rgba(255, 159, 64, 2)", // Color de borde 6
              "rgba(255, 99, 132, 2)", // Color de borde 7
              "rgba(54, 162, 235, 2)", // Color de borde 8
              "rgba(255, 206, 86, 2)", // Color de borde 9
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

  window.onload = init;
});


