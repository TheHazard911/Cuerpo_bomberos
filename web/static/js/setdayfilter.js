document.addEventListener("DOMContentLoaded", function () {
  // Obtener la fecha actual en formato "YYYY-MM-DD"
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // Seleccionar todas las filas de la tabla
  const rows = document.querySelectorAll("#data-table tbody tr");

  // Iterar sobre cada fila
  rows.forEach((row) => {
    // Obtener la fecha de la fila (suponiendo que esté en la octava celda)
    const dateCell = row.cells[8]; // Índice 8 corresponde a la columna de Fecha
    const rowDate = dateCell.textContent.trim(); // Formato DD-MM-YYYY

    // Convertir la fecha de la fila al formato "YYYY-MM-DD"
    const [day, month, year] = rowDate.split("-");
    const formattedRowDate = `${year}-${month}-${day}`; // "YYYY-MM-DD"

    // Comparar la fecha de la fila con la fecha actual
    if (formattedRowDate !== formattedToday) {
      row.style.display = "none"; // Oculta la fila si no coincide
    }
  });
});
