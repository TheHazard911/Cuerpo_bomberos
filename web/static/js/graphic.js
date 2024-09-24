const ctx = document.getElementById("myChart").getContext("2d");
const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septimbre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Operaciones Anuales",
                data: [59, 80, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.4,
                pointStyle: "circle",
                borderWidth: 2,
                pointRadius: 4
            },
        ],
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        tooltips: {
            titleFontSize: 16, // Tamaño de la fuente del título del tooltip
            bodyFontSize: 14, // Tamaño de la fuente del cuerpo del tooltip
            xPadding: 10, // Espaciado horizontal interno del tooltip
            yPadding: 10, // Espaciado vertical interno del tooltip
            caretSize: 8, // Tamaño del triángulo del tooltip
            cornerRadius: 4, // Radio de las esquinas del tooltip
        },
    },
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 32, // Tamaño de la fuente del label
                    lineHeight: 1.5, // Altura de línea para aumentar la altura
                },
                padding: 20, // Espaciado para aumentar el ancho
            },
        },
    },
});
function updateProgressBar(id, progressValue) {
    const progressBar = document.getElementById(`progress-bar-${id}`);
    const progressText = document.getElementById(`progress-text-${id}`);
    progressBar.style.width = progressValue + '%';
    progressText.textContent = progressValue + '%';
}

function animateProgress(id, targetValue) {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= targetValue) {
            clearInterval(interval);
        } else {
            progress++;
            updateProgressBar(id, progress);
        }
    }, 10); // Ajusta la velocidad de la animación aquí
}

// Valores fijos para cada barra de progreso
const progressValues = {
    'operaciones': 15,
    'prehospitalaria': 60,
    'rescate': 100,
    'grumae': 40,
    'servicios-medicos': 80
};

// Inicia la animación para cada barra con los valores fijos
for (const id in progressValues) {
    animateProgress(id, progressValues[id]);
}
