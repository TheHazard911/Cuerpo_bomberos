(function () {
    // Función para formatear la fecha de DD-MM-YYYY a un objeto Date
    function parseDate(dateString) {
        const [day, month, year] = dateString.split("-");
        return new Date(year, month - 1, day); // Mes se resta en 1 porque los meses inician desde 0
    }

    function setupSearch(inputId, columnIndex) {
        document.getElementById(inputId).addEventListener("input", function () {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll("#data-table tbody tr");

            rows.forEach((row) => {
                const dateCell = row.querySelector(`td:nth-child(${columnIndex})`);
                const originalText = dateCell.textContent.toLowerCase();

                if (originalText.includes(filter)) {
                    const startIndex = originalText.indexOf(filter);
                    const endIndex = startIndex + filter.length;

                    // Crear un nuevo span para la parte resaltada
                    const highlightedText = document.createElement("span");
                    highlightedText.style.backgroundColor = "yellow";
                    highlightedText.textContent = originalText.substring(startIndex, endIndex);

                    const beforeText = document.createTextNode(originalText.substring(0, startIndex));
                    const afterText = document.createTextNode(originalText.substring(endIndex));

                    dateCell.innerHTML = ""; // Limpiar el contenido anterior
                    dateCell.appendChild(beforeText);
                    dateCell.appendChild(highlightedText);
                    dateCell.appendChild(afterText);
                    row.style.display = ""; // Mostrar la fila
                } else {
                    dateCell.innerHTML = originalText; // Resetear cualquier resaltado previo
                    row.style.display = "none"; // Ocultar fila
                }
            });
        });
    }

    function setupDateFilter(inputId, columnIndex) {
        const dateInput = document.getElementById(inputId);

        dateInput.addEventListener("change", function () {
            const selectedDate = parseDate(this.value.split("-").reverse().join("-")); // Convierte a objeto Date
            const rows = document.querySelectorAll("#data-table tbody tr");

            rows.forEach((row) => {
                const dateCell = row.querySelector(`td:nth-child(${columnIndex})`);
                const originalDate = parseDate(dateCell.textContent); // Convierte el texto de la celda a Date

                // Comparar si la fecha de la celda es mayor o igual a la fecha seleccionada
                if (originalDate >= selectedDate) {
                    row.style.display = ""; // Mostrar fila si la fecha es mayor o igual
                    // Resaltar la celda si es igual a la fecha seleccionada
                    if (originalDate.toDateString() === selectedDate.toDateString()) {
                        dateCell.style.backgroundColor = "yellow"; // Resaltar la celda
                    } else {
                        dateCell.style.backgroundColor = ""; // Restablecer el fondo si no coincide
                    }
                } else {
                    row.style.display = "none"; // Ocultar fila si la fecha es menor
                    dateCell.style.backgroundColor = ""; // Restablecer el fondo
                }
            });
        });
    }

    // Llamar a la función para cada input y su columna correspondiente
    setupSearch("search-input-two", 7);
    setupDateFilter("fechaDesde", 10); // Cambia el índice de columna según tu tabla
    setupSearch("search-input-three", 12);
})();
