// -------------------------------------filtrado mensual-------------------------------------------------

// (function () {
//     // Función para formatear la fecha de DD-MM-YYYY a un objeto Date
//     function parseDate(dateString) {
//         const [day, month, year] = dateString.split("-");
//         return new Date(year, month - 1, day); // Mes se resta en 1 porque los meses inician desde 0
//     }

//     // Función para combinar los filtros
//     function applyFilters() {
//         const searchFilterTwo = document.getElementById("search-input-two").value.toLowerCase();
//         const searchFilterThree = document.getElementById("search-input-three").value.toLowerCase();
//         const selectedMonthValue = document.getElementById("monthInput").value;
//         const selectedMonth = selectedMonthValue ? getMonthYearFromDate(selectedMonthValue) : null;

//         const rows = document.querySelectorAll("#data-table tbody tr");

//         rows.forEach((row) => {
//             const textCellTwo = row.querySelector(`td:nth-child(6)`);
//             const textCellThree = row.querySelector(`td:nth-child(11)`);
//             const dateCell = row.querySelector(`td:nth-child(9)`);
//             const cellDateValue = dateCell.textContent.trim();
//             const cellMonthYear = cellDateValue ? getMonthYearFromDate(cellDateValue.split("-").reverse().join("-")) : null;

//             let showRow = true;

//             // Limpiar el fondo de las celdas antes de aplicar los filtros
//             textCellTwo.innerHTML = textCellTwo.textContent; // Restablecer contenido original
//             textCellThree.innerHTML = textCellThree.textContent; // Restablecer contenido original
//             dateCell.style.backgroundColor = "";

//             // Aplicar filtro de búsqueda 2
//             if (searchFilterTwo) {
//                 const originalTextTwo = textCellTwo.textContent.toLowerCase();
//                 const index = originalTextTwo.indexOf(searchFilterTwo);

//                 if (index === -1) {
//                     showRow = false;
//                 } else {
//                     const highlightedText = originalTextTwo.substring(index, index + searchFilterTwo.length);
//                     textCellTwo.innerHTML = originalTextTwo.replace(highlightedText, `<span style="background-color: yellow;">${highlightedText}</span>`);
//                 }
//             }

//             // Aplicar filtro de búsqueda 3
//             if (searchFilterThree) {
//                 const originalTextThree = textCellThree.textContent.toLowerCase();
//                 const index = originalTextThree.indexOf(searchFilterThree);

//                 if (index === -1) {
//                     showRow = false;
//                 } else {
//                     const highlightedText = originalTextThree.substring(index, index + searchFilterThree.length);
//                     textCellThree.innerHTML = originalTextThree.replace(highlightedText, `<span style="background-color: yellow;">${highlightedText}</span>`);
//                 }
//             }

//             // Aplicar filtro de mes
//             if (selectedMonth && cellMonthYear && compareMonthYear(cellMonthYear, selectedMonth) !== 0) {
//                 showRow = false;
//             } else if (selectedMonth) {
//                 dateCell.style.backgroundColor = "yellow"; // Resaltar celda si coincide con el mes
//             }

//             // Mostrar u ocultar la fila según el resultado de todos los filtros
//             row.style.display = showRow ? "" : "none";
//         });
//     }

//     function setupSearch(inputId) {
//         document.getElementById(inputId).addEventListener("input", applyFilters);
//     }

//     // Función para extraer el mes y el año de una fecha en formato YYYY-MM
//     function getMonthYearFromDate(dateString) {
//         if (!dateString) return null;
//         const [year, month] = dateString.split("-"); // Extraer el año y el mes
//         return { year: parseInt(year, 10), month: parseInt(month, 10) }; // Devolver año y mes como enteros
//     }

//     // Función para comparar dos fechas (mes y año)
//     function compareMonthYear(date1, date2) {
//         if (date1.year !== date2.year) {
//             return date1.year - date2.year; // Comparar por año
//         } else {
//             return date1.month - date2.month; // Comparar por mes si el año es igual
//         }
//     }

//     function setupMonthFilter(monthInputId) {
//         const monthInput = document.getElementById(monthInputId);
//         monthInput.addEventListener("change", applyFilters);
//     }

//     // Configurar los inputs de búsqueda y de mes
//     setupSearch("search-input-two");
//     setupSearch("search-input-three");
//     setupMonthFilter("monthInput");
// })();

// --------------------------filtrado trimestral----------------------------------

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
