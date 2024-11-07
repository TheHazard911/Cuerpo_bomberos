function exportarAPowerPoint() {
  const contenidoDiv = document.getElementById("graphic-one");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica.pptx" });
  });
}

function exportarAPowerPointTwo() {
  const contenidoDiv = document.getElementById("graphic-two");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica_2.pptx" });
  });
}

function exportarAPowerPointThree() {
  const contenidoDiv = document.getElementById("graphic-three");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica barras.pptx" });
  });
}
function exportarAPowerPointFour() {
  const contenidoDiv = document.getElementById("graphic-four");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica barras.pptx" });
  });
}
function exportarAPowerPointFive() {
  const contenidoDiv = document.getElementById("graphic-five");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica barras.pptx" });
  });
}
function exportarAPowerPointSix() {
  const contenidoDiv = document.getElementById("graphic-six");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica barras.pptx" });
  });
}
function exportarAPowerPointSeven() {
  const contenidoDiv = document.getElementById("graphic-seven");

  // Usar html2canvas para capturar la div como imagen
  html2canvas(contenidoDiv).then((canvas) => {
    // Obtener el tamaño del canvas generado
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convertir el canvas a una URL de datos (dataURL)
    const imgData = canvas.toDataURL("image/png");

    // Crear una nueva presentación de PowerPoint
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    // Definir el ancho y alto de la imagen en pulgadas, manteniendo la proporción
    const maxWidth = 10; // Ancho máximo en pulgadas que queremos en PowerPoint
    const maxHeight = 5.5; // Alto máximo en pulgadas que queremos en PowerPoint

    let pptImgWidth, pptImgHeight;

    if (imgWidth / imgHeight > maxWidth / maxHeight) {
      // Si la imagen es más ancha en proporción que el tamaño máximo, limitamos el ancho
      pptImgWidth = maxWidth;
      pptImgHeight = (imgHeight * maxWidth) / imgWidth;
    } else {
      // Si la imagen es más alta en proporción que el tamaño máximo, limitamos el alto
      pptImgHeight = maxHeight;
      pptImgWidth = (imgWidth * maxHeight) / imgHeight;
    }

    // Ancho y alto de la diapositiva (pulgadas estándar)
    const slideWidth = 10; // Ancho estándar de la diapositiva
    const slideHeight = 7.5; // Alto estándar de la diapositiva

    // Calcular las posiciones x e y para centrar la imagen
    const x = (slideWidth - pptImgWidth) / 2; // Posición x centrada
    const y = (slideHeight - pptImgHeight) / 2 - 1; // Ajustar posición y centrada (subir 0.5 pulgadas)

    // Agregar la imagen a la diapositiva con el tamaño ajustado y centrada
    slide.addImage({
      data: imgData,
      x: x, // Margen izquierdo centrado
      y: y, // Margen superior ajustado
      w: pptImgWidth, // Ancho de la imagen en pulgadas
      h: pptImgHeight, // Alto de la imagen en pulgadas
    });

    // Generar y descargar el archivo PowerPoint
    pptx.writeFile({ fileName: "grafica barras.pptx" });
  });
}

function exportarAWord() {
  // Obtener el contenido visible del div, sin etiquetas HTML
  const contenidoDiv = document.getElementById("accordionFlushExample");

  // Crear un contenido limpio eliminando espacios innecesarios
  let contenidoLimpiado = contenidoDiv.innerHTML
    .replace(/^\s+|\s+$/g, "") // Eliminar espacios al principio y al final
    .replace(/(\r\n|\n|\r)/gm, "") // Eliminar líneas en blanco
    .replace(/<p>\s*<\/p>/g, ""); // Eliminar párrafos vacíos

  // Crear el contenido del archivo Word
  const blob = new Blob(
    [
      `
          <html>
            <head>
              <meta charset="utf-8">
              <title>Documento Word</title>
              <style>
                body {
                  font-family: Arial, sans-serif; /* Tipo de fuente normal */
                  line-height: 1.5; /* Altura de línea */
                  margin: 0; /* Sin márgenes */
                  padding: 0; /* Sin padding */
                  }
                  ol{
                    list-style: circle;
                  }
              </style>
            </head>
            <body>
              ${contenidoLimpiado} <!-- Mantener el formato original de HTML -->
            </body>
          </html>
        `,
    ],
    {
      type: "application/msword",
    }
  );

  // Crear un enlace para descargar el archivo
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "documento.doc"; // Nombre del archivo a descargar
  document.body.appendChild(a);
  a.click(); // Simular clic para descargar
  document.body.removeChild(a); // Limpiar el DOM
  URL.revokeObjectURL(url); // Liberar la URL
}
