document.addEventListener("DOMContentLoaded", function () {
    const spans = document.querySelectorAll('.card-parroquies span');
    spans.forEach(span => {
        span.classList.add('fade-in');
    });
});
