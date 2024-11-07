// Listado de Procedimientos ===========================================================================================================================================

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

const colors = [
  "#F25C54",   // Rojo coral
  "#1A6FB9",  // Azul fuerte
  "#FFCC5C",  // Amarillo cálido
  "#B0BEC5",  // Gris suave
  "#FF9A00",  // Naranja brillante
  "#4ECDC4",  // Verde aqua
  "#2E8BC0",  // Azul claro
  "#FF6B6B",  // Rojo vibrante
  "#5ABF80"  // Verde menta
];


// Graficas de tortas ===================================================================================================================================================

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
              backgroundColor: colors,
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
// ------------------------------------------------------------------------------------------------------------------

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
            backgroundColor: colors,
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

// Grafica de Pie 2, Procedimientos por Division
document.addEventListener("DOMContentLoaded", function () {
  const selectDivision = document.querySelector(".form-select-sm2");
  const monthPicker = document.getElementById("month-picker3");
  let chart;

  // Establecer una división por defecto (por ejemplo, la primera opción)
  selectDivision.value = selectDivision.options[4].value; // Cambia el índice según la división que quieras por defecto

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
      const ctx4 = document.getElementById("pie_two").getContext("2d");

      // Destruir el gráfico existente si ya está creado
      if (chart) {
        chart.destroy();
      }

      // Crear un nuevo gráfico de pie con datos vacíos
      chart = new Chart(ctx4, {
        type: "pie",
        data: {
          labels: ["Ninguno"], // No hay etiquetas
          datasets: [
            {
              label: "Procedimientos",
              data: [0], // No hay datos
              borderWidth: 1,
              backgroundColor: colors,
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

    const ctx4 = document.getElementById("pie_two").getContext("2d");

    // Destruir el gráfico existente si ya está creado
    if (chart) {
      chart.destroy();
    }
// ------------------------------------------------------------------------------------------------------------------

    // Crear un nuevo gráfico de pie
    chart = new Chart(ctx4, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Procedimientos",
            data: values,
            borderWidth: 1,
            backgroundColor: colors,
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

// Grafica de Donut, Procedimientos por Division-Parroquias
document.addEventListener("DOMContentLoaded", function () {
  const selectDivision = document.querySelector(".form-select-sm3");
  const monthPicker = document.getElementById("month-picker4");
  let chart;

  // Establecer una división por defecto (por ejemplo, la primera opción)
  selectDivision.value = selectDivision.options[1].value; // Cambia el índice según la división que quieras por defecto

  async function fetchProcedimientos(divisionId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_division_parroquia/?division_id=${divisionId}&mes=${mes}`
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
      const ctx2 = document.getElementById("donuts").getContext("2d");

      // Destruir el gráfico existente si ya está creado
      if (chart) {
        chart.destroy();
      }

      // Crear un nuevo gráfico de pie con datos vacíos
      chart = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: ["Ninguno"], // No hay etiquetas
          datasets: [
            {
              label: "Procedimientos",
              data: [0], // No hay datos
              borderWidth: 1,
              backgroundColor: colors,
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
      (proc) => proc.id_parroquia__parroquia // Asegúrate de que este campo existe
    );
    const values = data.map((proc) => proc.count);

    const ctx2 = document.getElementById("donuts").getContext("2d");

    // Destruir el gráfico existente si ya está creado
    if (chart) {
      chart.destroy();
    }
// ------------------------------------------------------------------------------------------------------------------

    // Crear un nuevo gráfico de pie
    chart = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Procedimientos",
            data: values,
            borderWidth: 1,
            backgroundColor: colors,
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

// Grafica de Donut2, Procedimientos por Division-Parroquias
document.addEventListener("DOMContentLoaded", function () {
  const selectDivision = document.querySelector(".form-select-sm4");
  const monthPicker = document.getElementById("month-picker5");
  let chart;

  // Establecer una división por defecto (por ejemplo, la primera opción)
  selectDivision.value = selectDivision.options[2].value; // Cambia el índice según la división que quieras por defecto

  async function fetchProcedimientos(divisionId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_division_parroquia/?division_id=${divisionId}&mes=${mes}`
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
      const ctx3 = document.getElementById("donuts_two").getContext("2d");

      // Destruir el gráfico existente si ya está creado
      if (chart) {
        chart.destroy();
      }

      // Crear un nuevo gráfico de pie con datos vacíos
      chart = new Chart(ctx3, {
        type: "doughnut",
        data: {
          labels: ["Ninguno"], // No hay etiquetas
          datasets: [
            {
              label: "Procedimientos",
              data: [0], // No hay datos
              borderWidth: 1,
              backgroundColor: colors,
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
      (proc) => proc.id_parroquia__parroquia // Asegúrate de que este campo existe
    );
    const values = data.map((proc) => proc.count);

    const ctx3 = document.getElementById("donuts_two").getContext("2d");

    // Destruir el gráfico existente si ya está creado
    if (chart) {
      chart.destroy();
    }
// ------------------------------------------------------------------------------------------------------------------

    // Crear un nuevo gráfico de pie
    chart = new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Procedimientos",
            data: values,
            borderWidth: 1,
            backgroundColor: colors,
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

// Grafica de Polar1, Tipos de Procedimientos por Division
document.addEventListener("DOMContentLoaded", function () {
  const selectTipoProcedimiento = document.querySelector(".form-select-sm5");
  const monthPicker = document.getElementById("month-picker6");
  let chart; // Declarar la variable chart aquí


  // Establecer un tipo de procedimiento por defecto (por ejemplo, la primera opción)
  selectTipoProcedimiento.value = selectTipoProcedimiento.options[9].value; // Cambia el índice según el tipo que quieras por defecto

  async function fetchProcedimientos(tipoProcedimientoId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_tipo/?tipo_procedimiento_id=${tipoProcedimientoId}&mes=${mes}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error);
      return null; // Retorna null si hay un error
    }
  }

  async function updateChart() {
    const tipoProcedimientoId = selectTipoProcedimiento.value;
    const mesSeleccionado = monthPicker.value;

    const data = await fetchProcedimientos(tipoProcedimientoId, mesSeleccionado);

    // Verifica si se recibieron datos válidos
    if (!data || data.length === 0) {
      // Cargar gráfica vacía
      const ctx5 = document.getElementById("polar").getContext("2d");

      // Destruir el gráfico existente si ya está creado
      if (chart) {
        chart.destroy();
      }

      // Crear un nuevo gráfico de pie con datos vacíos
      chart = new Chart(ctx5, {
        type: "polarArea",
        data: {
            labels: ["Ninguno"],
            datasets: [
                {
                    label: "Procedimientos",
                    data: 0,
                    borderWidth: 1,
                    backgroundColor: colors, // Asignar colores de la paleta
                },
            ],
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: Math.max(5),
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        callback: function(value) {
                            return Math.round(value);
                        }
                    }
                }
            },
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
        }
    });
      return; // Termina la función para evitar crear una gráfica con datos
    }

    const labels = data.map(
      (proc) => proc.id_division__division // Cambiado para que coincida con el nombre del campo en el JSON
    );
    const values = data.map((proc) => proc.count);

    const ctx5 = document.getElementById("polar").getContext("2d");

    // Destruir el gráfico existente si ya está creado
    if (chart) {
      chart.destroy();
    }

    // Crear un nuevo gráfico de pie
  
  chart = new Chart(ctx5, {
      type: "polarArea",
      data: {
          labels: labels,
          datasets: [
              {
                  label: "Procedimientos",
                  data: values,
                  borderWidth: 1,
                  backgroundColor: colors, // Asignar colores de la paleta
              },
          ],
      },
      options: {
          scales: {
              r: {
                  min: 0,
                  max: Math.max(5, Math.max(...values)),
                  ticks: {
                      beginAtZero: true,
                      stepSize: 1,
                      callback: function(value) {
                          return Math.round(value);
                      }
                  }
              }
          },
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
      }
  });
  
  }

  // Añadir event listeners
  selectTipoProcedimiento.addEventListener("change", updateChart);
  monthPicker.addEventListener("change", updateChart);

  // Llamar a updateChart para cargar la gráfica por defecto
  updateChart();
});

// Grafica de Polar2, Tipos de Procedimientos por Division
document.addEventListener("DOMContentLoaded", function () {
  const selectTipoProcedimiento = document.querySelector(".form-select-sm6"); // -- Aumentar Uno
  const monthPicker = document.getElementById("month-picker7");  // -- Aumentar Uno
  let chart; // Declarar la variable chart aquí


  // Establecer un tipo de procedimiento por defecto (por ejemplo, la primera opción)
  selectTipoProcedimiento.value = selectTipoProcedimiento.options[1].value; // Cambia el índice según el tipo que quieras por defecto

  async function fetchProcedimientos(tipoProcedimientoId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_tipo_parroquias/?tipo_procedimiento_id=${tipoProcedimientoId}&mes=${mes}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error);
      return null; // Retorna null si hay un error
    }
  }

  async function updateChart() {
    const tipoProcedimientoId = selectTipoProcedimiento.value;
    const mesSeleccionado = monthPicker.value;

    const data = await fetchProcedimientos(tipoProcedimientoId, mesSeleccionado);

    // Verifica si se recibieron datos válidos
    if (!data || data.length === 0) {
      // Cargar gráfica vacía
      const ctx7 = document.getElementById("polar2").getContext("2d");  // -- Aumentar Uno El ID y el Ctx

      // Destruir el gráfico existente si ya está creado
      if (chart) {
        chart.destroy();
      }

      // Crear un nuevo gráfico de pie con datos vacíos
      chart = new Chart(ctx7, {
        type: "polarArea",
        data: {
            labels: ["Ninguno"],
            datasets: [
                {
                    label: "Procedimientos",
                    data: 0,
                    borderWidth: 1,
                    backgroundColor: colors, // Asignar colores de la paleta
                },
            ],
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: Math.max(5),
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        callback: function(value) {
                            return Math.round(value);
                        }
                    }
                }
            },
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
        }
    });
    
      return; // Termina la función para evitar crear una gráfica con datos
    }

    const labels = data.map(
      (proc) => proc.id_parroquia__parroquia // Cambiado para que coincida con el nombre del campo en el JSON
    );
    const values = data.map((proc) => proc.count);

    const ctx7 = document.getElementById("polar2").getContext("2d"); // Cambiar el id y el ctx 

    // Destruir el gráfico existente si ya está creado
    if (chart) {
      chart.destroy();
    }

    // Crear un nuevo gráfico de pie
  
  chart = new Chart(ctx7, {
      type: "polarArea",
      data: {
          labels: labels,
          datasets: [
              {
                  label: "Procedimientos",
                  data: values,
                  borderWidth: 1,
                  backgroundColor: colors, // Asignar colores de la paleta
              },
          ],
      },
      options: {
          scales: {
              r: {
                  min: 0,
                  max: Math.max(5, Math.max(...values)),
                  ticks: {
                      beginAtZero: true,
                      stepSize: 1,
                      callback: function(value) {
                          return Math.round(value);
                      }
                  }
              }
          },
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
      }
  });
  
  }

  // Añadir event listeners
  selectTipoProcedimiento.addEventListener("change", updateChart);
  monthPicker.addEventListener("change", updateChart);

  // Llamar a updateChart para cargar la gráfica por defecto
  updateChart();
});

// Grafica de Pie3, Tipos de Procedimientos - Tipos
document.addEventListener("DOMContentLoaded", function () {
  const selectTipoProcedimiento = document.querySelector(".form-select-sm7");
  const monthPicker = document.getElementById("month-picker8");
  let chart;

  // Selección por defecto
  selectTipoProcedimiento.value = selectTipoProcedimiento.options[1].value;

  async function fetchProcedimientos(tipoProcedimientoId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_tipo_detalles/?tipo_procedimiento_id=${tipoProcedimientoId}&mes=${mes}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error); 
      return null;
    }
  }

  async function updateChart() {
    const tipoProcedimientoId = selectTipoProcedimiento.value;
    const mesSeleccionado = monthPicker.value;

    const data = await fetchProcedimientos(tipoProcedimientoId, mesSeleccionado);

    if (!data || data.length === 0) {
      const ctx8 = document.getElementById("pie3").getContext("2d");

      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx8, {
        type: "polarArea",
        data: {
          labels: ["Ninguno"],
          datasets: [
            {
              label: "Procedimientos",
              data: [0],
              borderWidth: 1,
              backgroundColor: ["#D3D3D3"], // Color de fondo para "sin datos"
            },
          ],
        },
        options: {
          scales: {
            r: {
              min: 0,
              max: 5,
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                callback: (value) => Math.round(value),
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                font: { size: 16 },
              },
            },
          },
        },
      });
      return;
    }

    // Asumimos que data tiene campos `tipo_servicio` o `id_parroquia__parroquia` y `count`
    const labels = data.map(item => item.tipo_servicio );
    const values = data.map(item => item.count);

    const ctx8 = document.getElementById("pie3").getContext("2d");

    if (chart) {
      chart.destroy();
    }

    // Crear un nuevo gráfico de área polar con los datos de la API
    chart = new Chart(ctx8, {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Procedimientos",
            data: values,
            borderWidth: 1,
            backgroundColor: colors, // Colores para cada tipo de servicio
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: Math.max(5, Math.max(...values)),
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              callback: (value) => Math.round(value),
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: { size: 16 },
            },
          },
        },
      },
    });
  }

  // Event listeners para actualizar la gráfica cuando cambia el tipo o el mes
  selectTipoProcedimiento.addEventListener("change", updateChart);
  monthPicker.addEventListener("change", updateChart);

  // Cargar la gráfica por defecto
  updateChart();
});

// Grafica de Pie4, Tipos de Procedimientos - Tipos
document.addEventListener("DOMContentLoaded", function () {
  const selectTipoProcedimiento = document.querySelector(".form-select-sm8");
  const monthPicker = document.getElementById("month-picker9");
  let chart;

  // Selección por defecto
  selectTipoProcedimiento.value = selectTipoProcedimiento.options[9].value;

  async function fetchProcedimientos(tipoProcedimientoId, mes) {
    try {
      const response = await fetch(
        `/api/procedimientos_tipo_detalles/?tipo_procedimiento_id=${tipoProcedimientoId}&mes=${mes}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error); 
      return null;
    }
  }

  async function updateChart() {
    const tipoProcedimientoId = selectTipoProcedimiento.value;
    const mesSeleccionado = monthPicker.value;

    const data = await fetchProcedimientos(tipoProcedimientoId, mesSeleccionado);

    if (!data || data.length === 0) {
      const ctx9 = document.getElementById("pie4").getContext("2d");

      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx9, {
        type: "polarArea",
        data: {
          labels: ["Ninguno"],
          datasets: [
            {
              label: "Procedimientos",
              data: [0],
              borderWidth: 1,
              backgroundColor: ["#D3D3D3"], // Color de fondo para "sin datos"
            },
          ],
        },
        options: {
          scales: {
            r: {
              min: 0,
              max: 5,
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                callback: (value) => Math.round(value),
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                font: { size: 16 },
              },
            },
          },
        },
      });
      return;
    }

    // Asumimos que data tiene campos `tipo_servicio` o `id_parroquia__parroquia` y `count`
    const labels = data.map(item => item.tipo_servicio );
    const values = data.map(item => item.count);

    const ctx9 = document.getElementById("pie4").getContext("2d");

    if (chart) {
      chart.destroy();
    }

    // Crear un nuevo gráfico de área polar con los datos de la API
    chart = new Chart(ctx9, {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Procedimientos",
            data: values,
            borderWidth: 1,
            backgroundColor: colors, // Colores para cada tipo de servicio
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: Math.max(5, Math.max(...values)),
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              callback: (value) => Math.round(value),
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: { size: 16 },
            },
          },
        },
      },
    });
  }

  // Event listeners para actualizar la gráfica cuando cambia el tipo o el mes
  selectTipoProcedimiento.addEventListener("change", updateChart);
  monthPicker.addEventListener("change", updateChart);

  // Cargar la gráfica por defecto
  updateChart();
});


// Grafica de Barras =======================================================================================================================================================

// Grafica de Barras del mes o anual
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
          backgroundColor: colors,
          borderColor: colors
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