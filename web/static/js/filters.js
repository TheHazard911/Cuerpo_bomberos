// filtrado de inputs
(function () {
    function setupSearch(inputId, columnIndex) {
        document.getElementById(inputId).addEventListener("input", function () {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll("#data-table tbody tr");

            rows.forEach((row) => {
                const dateCell = row.querySelector(`td:nth-child(${columnIndex})`);
                const originalText = dateCell.textContent;
                const dateText = originalText.toLowerCase();

                if (dateText.includes(filter)) {
                    const startIndex = dateText.indexOf(filter);
                    const endIndex = startIndex + filter.length;

                    // Crear un nuevo span para la parte resaltada
                    const highlightedText = document.createElement("span");
                    highlightedText.style.backgroundColor = "yellow";
                    highlightedText.textContent = originalText.substring(
                        startIndex,
                        endIndex
                    );

                    // Crear un contenedor para el texto resaltado y el resto del texto
                    const beforeText = document.createTextNode(
                        originalText.substring(0, startIndex)
                    );
                    const afterText = document.createTextNode(
                        originalText.substring(endIndex)
                    );

                    dateCell.innerHTML = ""; // Limpiar el contenido anterior
                    dateCell.appendChild(beforeText);
                    dateCell.appendChild(highlightedText);
                    dateCell.appendChild(afterText);
                    row.style.display = "";
                } else {
                    dateCell.innerHTML = originalText; // Resetear cualquier resaltado previo
                    row.style.display = "none";
                }
            });
        });
    }

    // Llamar a la función para cada input y su columna correspondiente
    setupSearch("search-input", 9);
    setupSearch("search-input-two", 6);
    setupSearch("search-input-three", 11);
})();