// Función que envía un ping al servidor
function sendPing() {
  fetch("/dashboard", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Ping exitoso");
      } else {
        console.log("Error al hacer ping: ", response.status);
      }
    })
    .catch((error) => {
      console.error("Error al hacer ping: ", error);
    });
}

// Llamar la función de ping cada 5 minutos (300,000 ms)
setInterval(sendPing, 300000); // 5 minutos en milisegundos
