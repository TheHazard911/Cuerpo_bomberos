document.addEventListener("DOMContentLoaded", function () {
  // Elementos de entrada
  const inputJerarquia = document.getElementById("filterJerarquia");
  const selectStatus = document.getElementById("filterStatus");
  const table = document.getElementById("data-table");

  // Verifica que todos los elementos existen antes de continuar
  if (!inputJerarquia || !selectStatus || !table) {
    return;
  }

  // Función para filtrar por jerarquía y resaltar coincidencias
  function filtrarPorJerarquia() {
    const jerarquia = inputJerarquia.value.toLowerCase();
    const filas = table.querySelectorAll("tbody tr");

    filas.forEach((fila) => {
      const columnaJerarquia = fila.cells[3].textContent.toLowerCase();
      const originalJerarquia = fila.cells[3].textContent;

      // Condición de coincidencia en jerarquía
      const coincideJerarquia =
        jerarquia === "" || columnaJerarquia.includes(jerarquia);

      // Muestra u oculta la fila si coincide
      fila.style.display = coincideJerarquia ? "" : "none";

      // Resalta coincidencias en amarillo dentro de la columna de jerarquía
      if (coincideJerarquia && jerarquia !== "") {
        const regex = new RegExp(`(${jerarquia})`, "gi");
        const highlightedText = originalJerarquia.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
        fila.cells[3].innerHTML = highlightedText;
      } else {
        // Si no hay coincidencia, muestra el texto original sin resaltar
        fila.cells[3].textContent = originalJerarquia;
      }
    });
  }

  // Función para filtrar por estado y resaltar coincidencias
  function filtrarPorStatus() {
    const status = selectStatus.value;
    const filas = table.querySelectorAll("tbody tr");

    // Mapea valores del select a texto de columna
    const statusText =
      status === "1"
        ? "Activo"
        : status === "2"
        ? "Jubilado"
        : status === "3"
        ? "Incapacitado"
        : "";

    filas.forEach((fila) => {
      const columnaStatus = fila.cells[8].textContent;
      const originalStatus = fila.cells[8].textContent;

      // Condición de coincidencia en estado
      const coincideStatus = status === "" || columnaStatus === statusText;

      // Muestra la fila si coincide con el estado
      fila.style.display = coincideStatus ? "" : "none";

      // Resalta coincidencias en amarillo en la columna de estado
      if (coincideStatus && status !== "") {
        const regex = new RegExp(`(${statusText})`, "gi");
        const highlightedText = originalStatus.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
        fila.cells[8].innerHTML = highlightedText;
      } else {
        // Si no hay coincidencia, muestra el texto original sin resaltar
        fila.cells[8].textContent = originalStatus;
      }
    });
  }

  // Escucha los cambios en el input y el select para aplicar los filtros de forma independiente
  inputJerarquia.addEventListener("input", filtrarPorJerarquia);
  selectStatus.addEventListener("change", filtrarPorStatus);
});
