document.addEventListener("DOMContentLoaded", function () {
    const spans = document.querySelectorAll('.stadist-parroquies span');
    spans.forEach(span => {
        span.classList.add('fade-in');
    });
});
