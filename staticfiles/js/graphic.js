// Variable global para almacenar los datos de procedimientos
let procedimientosMensuales = [];

// Función para obtener procedimientos por mes
function obtenerProcedimientosPorMes() {
  fetch("/api/meses/") // Asegúrate de que esta URL sea correcta
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Asignar los datos a la variable global
      procedimientosMensuales = [
        data.enero,
        data.febrero,
        data.marzo,
        data.abril,
        data.mayo,
        data.junio,
        data.julio,
        data.agosto,
        data.septiembre,
        data.octubre,
        data.noviembre,
        data.diciembre,
      ];
      // Llamar a la función para actualizar el gráfico
      actualizarGrafico();
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}

// Función para actualizar el gráfico
function actualizarGrafico() {
  const ctx = document.getElementById("myChart").getContext("2d");
  const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Crear el gráfico o actualizarlo
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Operaciones Anuales",
          data: procedimientosMensuales, // Usar los datos obtenidos
          fill: false,
          borderColor: "rgb(200, 36, 58)",
          tension: 0.4,
          pointStyle: "circle",
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      tooltips: {
        titleFontSize: 16,
        bodyFontSize: 14,
        xPadding: 10,
        yPadding: 10,
        caretSize: 8,
        cornerRadius: 4,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 32,
            lineHeight: 1.5,
          },
          padding: 20,
        },
      },
    },
  });
}

// Llama a la función para obtener los datos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", obtenerProcedimientosPorMes);

function updateProgressBar(id, progressValues) {
  const progressBar = document.getElementById(`progress-bar-${id}`);
  const progressText = document.getElementById(`progress-text-${id}`);
  progressBar.style.width = progressValues + "%";
  progressText.textContent = progressValues.toFixed(1) + "%"; // Muestra un decimal
}

// Función para restablecer todas las barras de progreso y textos a 0%
function resetProgressBars(id) {
  let progressBars = document.querySelectorAll(`#progress-bar-${id}`);
  let progressTexts = document.querySelectorAll(`#progress-text-${id}`);

  progressBars.forEach((bar) => {
    bar.style.width = "0%";
  });

  progressTexts.forEach((text) => {
    text.textContent = "0%";
  });
}

// Función para llamar a la API según el periodo
function fetchPorcentajes(periodo) {
  fetch(`/api/porcentajes/${periodo}/`)
    .then((response) => response.json())
    .then((porcentajes) => {
      // Función para animar las barras de progreso
      function animateProgress(id, targetValue) {
        let progress = 0;
        resetProgressBars(id); // Reinicia los valores antes de obtener nuevos datos
        const increment = targetValue / 100; // Aumentar en pasos de 1% de la meta

        const interval = setInterval(() => {
          if (progress >= targetValue) {
            clearInterval(interval);
          } else {
            progress += increment; // Incremento más pequeño
            updateProgressBar(id, Math.min(progress, targetValue)); // Asegúrate de no sobrepasar el valor objetivo
          }
        }, 10); // Ajusta la velocidad de la animación aquí
      }
      if (periodo == "mes") {
        document.getElementById("porcentajes").textContent = " Mensuales";
      }
      else{
      document.getElementById("porcentajes").textContent = "Totales";
      }


      // Valores fijos para cada barra de progreso
      const progressValues = {
        operaciones: porcentajes.operaciones,
        prehospitalaria: porcentajes.prehospitalaria,
        rescate: porcentajes.rescate,
        grumae: porcentajes.grumae,
        servicios_medicos: porcentajes.servicios_medicos,
        prevencion: porcentajes.prevencion,
      };

      // Inicia la animación para cada barra con los valores actualizados
      for (const id in progressValues) {
        animateProgress(id, progressValues[id]);
      }
    })
    .catch((error) => console.error("Error al consumir la API:", error));
}
fetchPorcentajes("mes");

async function fetchProcedimientos(condicion) {
  try {
    const response = await fetch("/api/parroquias/");

    const data = await response.json();

    if (condicion === "Total") {
      document.getElementById(
        "concordia"
      ).textContent = `${data.concordia.total}`;
      document.getElementById(
        "otros_municipios"
      ).textContent = `${data.otros_municipios.total}`;
      document.getElementById(
        "san_sebastian"
      ).textContent = `${data.san_sebastian.total}`;
      document.getElementById(
        "san_juan"
      ).textContent = `${data.san_juan.total}`;
      document.getElementById("pedro_m").textContent = `${data.pedro_m.total}`;
      document.getElementById(
        "francisco_romero"
      ).textContent = `${data.francisco_romero_lobo.total}`;
      document.getElementById("parroquias").textContent = "Totales";
    }

    if (condicion === "Mes") {
      document.getElementById(
        "concordia"
      ).textContent = `${data.concordia.del_mes}`;
      document.getElementById(
        "otros_municipios"
      ).textContent = `${data.otros_municipios.del_mes}`;
      document.getElementById(
        "san_sebastian"
      ).textContent = `${data.san_sebastian.del_mes}`;
      document.getElementById(
        "san_juan"
      ).textContent = `${data.san_juan.del_mes}`;
      document.getElementById(
        "pedro_m"
      ).textContent = `${data.pedro_m.del_mes}`;
      document.getElementById(
        "francisco_romero"
      ).textContent = `${data.francisco_romero_lobo.del_mes}`;
      document.getElementById("parroquias").textContent = "Mensuales";
    }

    if (condicion === "Hoy") {
      document.getElementById(
        "concordia"
      ).textContent = `${data.concordia.hoy}`;
      document.getElementById(
        "otros_municipios"
      ).textContent = `${data.otros_municipios.hoy}`;
      document.getElementById(
        "san_sebastian"
      ).textContent = `${data.san_sebastian.hoy}`;
      document.getElementById("san_juan").textContent = `${data.san_juan.hoy}`;
      document.getElementById("pedro_m").textContent = `${data.pedro_m.hoy}`;
      document.getElementById(
        "francisco_romero"
      ).textContent = `${data.francisco_romero_lobo.hoy}`;
      document.getElementById("parroquias").textContent = "Diarios";
    }

    // Aquí puedes manipular el DOM o hacer lo que necesites con los datos
    // for (const [parroquia, procedimientos] of Object.entries(data)) {
    //     console.log(`${parroquia}: Total: ${procedimientos.total}, Del mes: ${procedimientos.del_mes}, Hoy: ${procedimientos.hoy}`);
    // }
  } catch (error) {
    console.error("Error fetching procedimientos:", error);
  }
}

// Llama a la función para obtener los datos
fetchProcedimientos("Hoy");
//--------------------------- divisiones ------------------

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

function updateCards(data, type) {
  for (const [division, detalles] of Object.entries(data)) {
    let count;
    switch (type) {
      case "total":
        count = detalles.total;
        document.getElementById("divisiones").textContent = "Totales";
        break;
      case "del_mes":
        count = detalles.del_mes;
        document.getElementById("divisiones").textContent = "Mensuales";
        break;
      case "hoy":
        count = detalles.hoy;
        document.getElementById("divisiones").textContent = "Diarios";
        break;
      default:
        count = 0;
    }
    const card = document.querySelector(
      `li[data-division="${division}"] .count`
    );
    if (card) {
      card.textContent = count;
    }
  }
}

document.getElementById("btn-today").addEventListener("click", async () => {
  const data = await fetchDivisiones();
  updateCards(data, "hoy");
});

document.getElementById("btn-month").addEventListener("click", async () => {
  const data = await fetchDivisiones();
  updateCards(data, "del_mes");
});

document.getElementById("btn-total").addEventListener("click", async () => {
  const data = await fetchDivisiones();
  updateCards(data, "total");
});

// Llama a fetchDivisiones al cargar la página para mostrar los datos de hoy
window.onload = async () => {
  const data = await fetchDivisiones();
  updateCards(data, "hoy");
};
