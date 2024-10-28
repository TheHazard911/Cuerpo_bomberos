(function () {
    // Función para formatear la fecha de DD-MM-YYYY a un objeto Date
    function parseDate(dateString) {
        const [day, month, year] = dateString.split("-");
        return new Date(year, month - 1); // Solo se interesa el mes
    }

    // Función para combinar los filtros
    function applyFilters() {
        const searchFilterTwo = document.getElementById("search-input-two").value.toLowerCase();
        const searchFilterThree = document.getElementById("search-input-three").value.toLowerCase();
        const selectedQuarterValue = document.getElementById("quarterInput").value;
        const selectedQuarter = selectedQuarterValue ? parseInt(selectedQuarterValue) : null;

        const rows = document.querySelectorAll("#data-table tbody tr");

        rows.forEach((row) => {
            const textCellTwo = row.querySelector(`td:nth-child(6)`);
            const textCellThree = row.querySelector(`td:nth-child(11)`);
            const dateCell = row.querySelector(`td:nth-child(9)`);
            const cellDateValue = dateCell.textContent.trim();
            const cellDate = parseDate(cellDateValue.split("-").reverse().join("-"));
            const cellMonth = cellDate.getMonth() + 1; // Obtener solo el mes

            let showRow = true;

            // Limpiar el fondo de las celdas antes de aplicar los filtros
            textCellTwo.innerHTML = textCellTwo.textContent;
            textCellThree.innerHTML = textCellThree.textContent;
            dateCell.style.backgroundColor = "";

            // Aplicar filtro de búsqueda 2
            if (searchFilterTwo) {
                const originalTextTwo = textCellTwo.textContent.toLowerCase();
                const index = originalTextTwo.indexOf(searchFilterTwo);
                if (index === -1) {
                    showRow = false;
                } else {
                    const highlightedText = originalTextTwo.substring(index, index + searchFilterTwo.length);
                    textCellTwo.innerHTML = originalTextTwo.replace(highlightedText, `<span style="background-color: yellow;">${highlightedText}</span>`);
                }
            }

            // Aplicar filtro de búsqueda 3
            if (searchFilterThree) {
                const originalTextThree = textCellThree.textContent.toLowerCase();
                const index = originalTextThree.indexOf(searchFilterThree);
                if (index === -1) {
                    showRow = false;
                } else {
                    const highlightedText = originalTextThree.substring(index, index + searchFilterThree.length);
                    textCellThree.innerHTML = originalTextThree.replace(highlightedText, `<span style="background-color: yellow;">${highlightedText}</span>`);
                }
            }

            // Aplicar filtro de trimestre
            if (selectedQuarter) {
                const isInQuarter = (selectedQuarter === 1 && [1, 2, 3].includes(cellMonth)) ||
                                    (selectedQuarter === 2 && [4, 5, 6].includes(cellMonth)) ||
                                    (selectedQuarter === 3 && [7, 8, 9].includes(cellMonth)) ||
                                    (selectedQuarter === 4 && [10, 11, 12].includes(cellMonth));
                
                if (!isInQuarter) {
                    showRow = false; // Solo mostrar filas que coincidan con el trimestre seleccionado
                } else {
                    dateCell.style.backgroundColor = "yellow"; // Resaltar celda si coincide con el trimestre
                }
            }

            // Mostrar u ocultar la fila según el resultado de todos los filtros
            row.style.display = showRow ? "" : "none";
        });
    }

    function setupSearch(inputId) {
        document.getElementById(inputId).addEventListener("input", applyFilters);
    }

    function setupQuarterFilter(quarterInputId) {
        const quarterInput = document.getElementById(quarterInputId);
        quarterInput.addEventListener("change", applyFilters);
    }

    // Configurar los inputs de búsqueda y de trimestre
    setupSearch("search-input-two");
    setupSearch("search-input-three");
    setupQuarterFilter("quarterInput");
})();
