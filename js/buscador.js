// buscador.js: caja de búsqueda de la página de biografías (funciona junto a los filtros de app.js)

// Espera a que el HTML esté cargado
document.addEventListener("DOMContentLoaded", function () {
  var caja = document.getElementById("buscar");                     // Busca la caja de texto en la página
  if (!caja) { return; }                                            // Si no existe (otra página), termina
  var espera = null;                                                // Guardará el temporizador para no filtrar en cada tecla

  // Cada vez que la persona escribe algo
  caja.addEventListener("input", function () {
    clearTimeout(espera);                                           // Cancela el temporizador anterior
    espera = setTimeout(function () {                               // Espera 150 ms tras la última tecla
      window.Codice.texto = caja.value.trim().toLowerCase();        // Guarda el texto en minúsculas y sin espacios sobrantes
      window.Codice.aplicarFiltros();                               // Recalcula las fichas visibles
    }, 150);                                                        // Fin del temporizador
  });

  window.Codice.aplicarFiltros();                                   // Muestra el contador de fichas al abrir la página
});
