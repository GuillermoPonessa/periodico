// tema.js: alterna entre el modo "pergamino" (claro) y el modo "vela" (oscuro) y recuerda la elección

(function () {                                                      // Función autoejecutable: evita variables globales
  var CLAVE = "codice-tema";                                        // Nombre con el que se guarda la elección

  // Lee el tema guardado, con protección por si el navegador bloquea el almacenamiento
  function leer() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; } // Devuelve el valor o null si falla
  }
  // Guarda el tema elegido, también con protección
  function guardar(valor) {
    try { localStorage.setItem(CLAVE, valor); } catch (e) { /* Si falla, simplemente no se recuerda */ }
  }
  // Aplica el tema al documento para que el CSS cambie los colores
  function aplicar(valor) {
    document.documentElement.setAttribute("data-tema", valor);      // Pone data-tema="vela" o "pergamino" en <html>
    var meta = document.querySelector('meta[name="theme-color"]');  // Busca la etiqueta del color de la barra del navegador
    if (meta) { meta.setAttribute("content", valor === "vela" ? "#1a120b" : "#e8dcc0"); } // La pinta según el tema
  }

  var inicial = leer() || "pergamino";                              // Usa lo guardado o el modo claro por defecto
  aplicar(inicial);                                                 // Aplica el tema antes de dibujar la página

  document.addEventListener("DOMContentLoaded", function () {       // Cuando el HTML está listo...
    var boton = document.getElementById("btn-tema");                // Busca el botón de cambio de tema
    if (!boton) { return; }                                         // Si no existe, termina
    function etiqueta() {                                           // Actualiza el texto del botón
      var vela = document.documentElement.getAttribute("data-tema") === "vela"; // ¿Está en modo vela?
      boton.textContent = vela ? "Modo pergamino" : "Modo vela";    // Muestra a qué modo se puede pasar
      boton.setAttribute("aria-pressed", vela ? "true" : "false");  // Informa el estado a lectores de pantalla
    }
    boton.addEventListener("click", function () {                   // Al hacer clic...
      var vela = document.documentElement.getAttribute("data-tema") === "vela"; // Estado actual
      var nuevo = vela ? "pergamino" : "vela";                      // Calcula el estado contrario
      aplicar(nuevo);                                               // Lo aplica
      guardar(nuevo);                                               // Lo recuerda
      etiqueta();                                                   // Actualiza el texto del botón
    });
    etiqueta();                                                     // Pone el texto correcto al cargar
  });
})();                                                               // Fin de la función autoejecutable
