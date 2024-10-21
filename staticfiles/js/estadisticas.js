document.addEventListener("DOMContentLoaded", function () {
  // Tu código de Chart.js aquí
  const ctx1 = document.getElementById("pie");
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
  const ctx3 = document.getElementById("radar");
  new Chart(ctx3, {
    type: "radar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // Modifica los nombres de las secciones aquí
      datasets: [
        {
          label: "# of Votes", // Modifica el título de la serie de datos aquí
          data: [12, 19, 3, 5, 2, 3], // Cambia los valores de los datos aquí
          borderWidth: 2, // Cambia el grosor de las líneas aquí
          backgroundColor: "rgba(75, 192, 192, .5)", // Cambia el color de fondo
          borderColor: "rgba(75, 192, 192, 1)", // Cambia el color de los bordes
        },
      ],
    },
    options: {
      responsive: true, // Hace que la gráfica sea fluida
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
          font: {
            size: 20, // Aumenta el tamaño de las etiquetas de datos aquí
          },
          formatter: (value) => value, // Muestra el valor de los datos
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 24, // Tamaño de las etiquetas en 24px
            },
          },
          grid: {
            display: false, // Eliminar líneas de la cuadrícula
          },
        },
      },
    },
  });

  const ctx4 = document.getElementById("polarArea");
  new Chart(ctx4, {
    type: "polarArea",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // Modifica los nombres de las secciones aquí
      datasets: [
        {
          label: "# of Votes", // Modifica el título de la serie de datos aquí
          data: [12, 19, 3, 5, 2, 3], // Cambia los valores de los datos aquí
          borderWidth: 2, // Cambia el grosor de las líneas aquí
          backgroundColor: [
            "rgba(255, 99, 132, 0.1)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ], // Cambia los colores de fondo aquí
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ], // Cambia los colores de los bordes aquí
        },
      ],
    },
    options: {
      responsive: true, // Hace que la gráfica sea fluida
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
          font: {
            size: 28, // Aumenta el tamaño de las etiquetas de datos aquí
          },
          formatter: (value) => value, // Muestra el valor de los datos
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 24, // Tamaño de las etiquetas en 24px
            },
          },
          grid: {
            display: false, // Eliminar líneas de la cuadrícula
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
            label: "# Divisiones",
            data: values,
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 1)", // Color 1
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
              "rgba(255, 99, 132, 2)", // Color de borde 1
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
          legend: { display: true },
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
