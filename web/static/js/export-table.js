function exportarTabla() {
    try {
        // Obtener la tabla HTML
        var tabla = document.getElementById("data-table");
        if (!tabla) throw new Error("Tabla no encontrada");

        // Crear una copia de la tabla para no modificar el DOM original
        var tablaCopia = tabla.cloneNode(true);

        // Estilos constantes
        const COLOR_FONDO_TH = "#b6243a";
        const COLOR_FONDO_TD = "#800020";
        const COLOR_TEXTO = "#FFF";
        const TAMAÑO_TH = "25px";
        const TAMAÑO_TD = "12px";

        // Aplicar estilos a los encabezados (th)
        var encabezados = tablaCopia.getElementsByTagName("th");
        for (var i = 0; i < encabezados.length; i++) {
            encabezados[i].style.backgroundColor = COLOR_FONDO_TH;
            encabezados[i].style.color = COLOR_TEXTO;
            encabezados[i].style.textAlign = "center";
            encabezados[i].style.fontSize = TAMAÑO_TH;
        }

        // Alinear las celdas de datos (td) y aplicar estilos
        var filas = tablaCopia.getElementsByTagName("tr");
        for (var i = 0; i < filas.length; i++) {
            var celdas = filas[i].getElementsByTagName("td");
            for (var j = 0; j < celdas.length; j++) {
                celdas[j].style.textAlign = "right";
                celdas[j].style.backgroundColor = COLOR_FONDO_TD;
                celdas[j].style.color = COLOR_TEXTO;
                celdas[j].style.fontSize = TAMAÑO_TD;
            }
        }

        // Eliminar la columna de "efectivos enviados" (suponiendo que es la segunda columna)
        for (var i = 0; i < filas.length; i++) {
            if (filas[i].cells.length > 1) {
                filas[i].deleteCell(5); // Cambia el índice según la posición de la columna
            }
        }
        // elimina la columna de acciones (ultima columna)
        for (var i = 0; i < filas.length; i++) {
            if (filas[i].cells.length > 1) {
                filas[i].deleteCell(-1); // Cambia el índice según la posición de la columna
            }
        }

        // Formatear las fechas en la tabla al formato DD/MM/YYYY
        for (var i = 0; i < filas.length; i++) {
            var celdas = filas[i].getElementsByTagName("td");
            for (var j = 0; j < celdas.length; j++) {
                var contenido = celdas[j].innerText;
                if (isFecha(contenido)) {
                    celdas[j].innerText = formatearFecha(contenido);
                }
            }
        }

        // Crear una nueva hoja de trabajo (worksheet)
        var hoja = XLSX.utils.table_to_sheet(tablaCopia);

        // Ajustar el ancho de las celdas según el contenido
        var colWidths = [];
        var rango = XLSX.utils.decode_range(hoja['!ref']);
        for (var C = rango.s.c; C <= rango.e.c; ++C) {
            var maxWidth = 10;
            for (var R = rango.s.r; R <= rango.e.r; ++R) {
                var cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                var cell = hoja[cellAddress];
                if (cell && cell.v) {
                    var cellLength = String(cell.v).length;
                    if (cellLength > maxWidth) {
                        maxWidth = cellLength;
                    }
                }
            }
            colWidths.push({ wch: maxWidth });
        }
        hoja['!cols'] = colWidths;

        // Crear un nuevo libro (workbook)
        var libro = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(libro, hoja, "Datos");

        // Exportar el libro a un archivo de Excel
        XLSX.writeFile(libro, "Resumen de procedimientos.xlsx");
    } catch (error) {
        console.error("Error al exportar la tabla:", error.message);
    }
}

// Función para verificar si una cadena es una fecha en formato válido
function isFecha(texto) {
    var patronFecha = /^\d{2}-\d{2}-\d{4}$/;
    return patronFecha.test(texto);
}

// Función para formatear la fecha de DD-MM-YYYY a DD/MM/YYYY
function formatearFecha(fecha) {
    return fecha.replace(/-/g, "/");
}

// cambios aca para el push