document.getElementById('export').addEventListener('click', function() {
    html2canvas(document.getElementById('pie')).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        let pptx = new PptxGenJS();
        let slide = pptx.addSlide();
        slide.addImage({ data: imgData, x: 1, y: 1, w: 8, h: 4.5 });
        pptx.writeFile({ fileName: 'Grafica.pptx' });
    });
});