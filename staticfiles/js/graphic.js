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
      console.log(procedimientosMensuales);
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

function updateProgressBar(id, progressValue) {
  const progressBar = document.getElementById(`progress-bar-${id}`);
  const progressText = document.getElementById(`progress-text-${id}`);
  progressBar.style.width = progressValue + "%";
  progressText.textContent = progressValue + "%";
}

// Consumir la API usando fetch
fetch("/api/porcentajes/")
  .then((response) => response.json())
  .then((data) => {
    // Aquí puedes manejar los datos y mostrarlos en el frontend

    function animateProgress(id, targetValue) {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= targetValue) {
          clearInterval(interval);
        } else {
          progress++;
          updateProgressBar(id, progress);
        }
      }, 10); // Ajusta la velocidad de la animación aquí
    }

    // Valores fijos para cada barra de progreso
    var progressValues = {
      operaciones: porcentajes.rescate,
      prehospitalaria: 10,
      rescate: 10,
      grumae: 10,
      "servicios-medicos": 10,
    };

    // Inicia la animación para cada barra con los valores fijos
    for (const id in progressValues) {
      animateProgress(id, progressValues[id]);
    }
  })
  .catch((error) => console.error("Error al consumir la API:", error));
