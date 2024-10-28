// let timeout;
// function resetTimer() {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     window.location.href = "/logout/"; // Cambia la URL según tu ruta de cierre de sesión
//   }, 600000); // 10 minutos

//   window.onpageshow = function (event) {
//     if (event.persisted) {
//       window.location.reload(); // Recarga la página si se vuelve a mostrar
//     }
//   };
// }