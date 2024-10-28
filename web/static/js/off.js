let timeout;
function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.location.href = "/logout/"; // Cambia la URL según tu ruta de cierre de sesión
  }, 600000); // 10 minutos

  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload(); // Recarga la página si se vuelve a mostrar
    }
  };
}

window.onload = function () {
  if (sessionStorage.getItem("loggedOut")) {
    console.log("Usuario ha cerrado sesión, redirigiendo a login...");
    window.location.href = "/login/";
  } else {
    // Limpia el historial
    history.pushState(null, document.title, location.href);
    window.addEventListener("popstate", function () {
      history.pushState(null, document.title, location.href);
      console.log("Navegación no permitida, permaneciendo en la página actual.");
    });
  }
};

window.onbeforeunload = function () {
  console.log("El usuario está saliendo de la página, marcando sesión como cerrada.");
  sessionStorage.setItem("loggedOut", "true");
};
