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
              size: 24, // Ajusta el tamaño de la fuente aquí
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
              size: 24, // Ajusta el tamaño de la fuente aquí
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
            "rgba(255, 99, 132, 0.5)",
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
  const ctx6 = document.getElementById("bar");
  new Chart(ctx6, {
    type: "bar",
    data: {
      labels: ["Operaciones", "Enfermeria", "Grumae", "Servicios medicos", "Prehospitalaria", "Prevencion", "Psicologia","Rescate","Capacitacion"], // Modifica los nombres de las secciones aquí
      datasets: [
        {
          label: "# of Votes", // Modifica el título de la serie de datos aquí
          data: [12, 19, 3, 5, 2, 3.5, 2, 3, 10], // Cambia los valores de los datos aquí
          borderWidth: 1, // Cambia el grosor de los bordes aquí
          backgroundColor: [
            "rgba(255, 99, 132, 0.3)",
            "rgba(54, 162, 235, 0.3)",
            "rgba(255, 206, 86, 0.3)",
            "rgba(75, 192, 192, 0.3)",
            "rgba(153, 102, 255, 0.3)",
            "rgba(255, 159, 64, 0.3)",
          ], // Cambia los colores de fondo aquí
          borderColor: [
            "rgba(255, 99, 132, 2)",
            "rgba(54, 162, 235, 2)",
            "rgba(255, 206, 86, 2)",
            "rgba(75, 192, 192, 2)",
            "rgba(153, 102, 255, 2)",
            "rgba(255, 159, 64, 2)",
          ], // Cambia los colores de los bordes aquí
        },
      ],
    },
    options: {
      responsive: true, // Hace que la gráfica sea fluida
      plugins: {
        legend: {
          display: true, // Para mostrar la leyenda
          labels: {
            font: {
              size: 19, // Ajusta el tamaño de la fuente aquí
            },
          },
        },
        datalabels: {
          anchor: "end",
          align: "end",
          font: {
            size: 28, // Tamaño de las etiquetas de datos en 28px
          },
          formatter: (value) => value, // Muestra el valor de los datos
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 18, // Tamaño de las etiquetas en 24px
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 14, // Tamaño de las etiquetas en 24px
            },
          },
        },
      },
    },
  });
});
