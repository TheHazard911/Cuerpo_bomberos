function exportarTabla() {
    // Obtener la tabla HTML
    var tabla = document.getElementById("data-table");

    // Crear una copia de la tabla para no modificar el DOM original
    var tablaCopia = tabla.cloneNode(true);

    // Aplicar estilos a los encabezados (th) de la tabla
    var encabezados = tablaCopia.getElementsByTagName("th");
    for (var i = 0; i < encabezados.length; i++) {
        encabezados[i].style.backgroundColor = "#b6243a"; // Color de fondo vinotinto
        encabezados[i].style.color = "#FFF"; // Texto blanco
        encabezados[i].style.textAlign = "center"; // Centrar los encabezados
        encabezados[i].style.fontSize = "25px"; // Tamaño de letra estándar para los th
    }

    // Alinear las celdas de datos (td) a la derecha, aplicar color de fondo y estilo
    var filas = tablaCopia.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        for (var j = 0; j < celdas.length; j++) {
            celdas[j].style.textAlign = "right"; // Alinear las celdas de datos a la derecha
            celdas[j].style.backgroundColor = "#800020"; // Color vinotinto para las celdas
            celdas[j].style.color = "#FFF"; // Texto blanco para las celdas
            celdas[j].style.fontSize = "12px"; // Tamaño de letra 4px mayor que los th
        }
    }

    // Eliminar la última columna ("Acciones") de cada fila
    for (var i = 0; i < filas.length; i++) {
        filas[i].deleteCell(-1); // -1 elimina la última columna
    }

    // Formatear las fechas en la tabla al formato DD/MM/YYYY
    for (var i = 0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        for (var j = 0; j < celdas.length; j++) {
            var contenido = celdas[j].innerText;
            if (isFecha(contenido)) { // Verifica si el contenido es una fecha
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
        var maxWidth = 10; // Ancho mínimo
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
}

// Función para verificar si una cadena es una fecha en formato válido
function isFecha(texto) {
    var patronFecha = /^\d{2}-\d{2}-\d{4}$/; // Verificar si está en formato DD-MM-YYYY
    return patronFecha.test(texto);
}

// Función para formatear la fecha de DD-MM-YYYY a DD/MM/YYYY
function formatearFecha(fecha) {
    return fecha.replace(/-/g, "/"); // Reemplazar guiones con barras
}
