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
