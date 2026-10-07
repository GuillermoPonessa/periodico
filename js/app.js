// app.js: núcleo del periódico (fecha, menú activo y filtros de biografías)
// Debe cargarse ANTES que buscador.js, porque este último usa window.Codice

// Objeto global que comparte el estado de los filtros entre archivos JS
window.Codice = { siglo: "todos", texto: "" }; // siglo elegido y texto buscado

// Función que muestra u oculta cada ficha según el siglo y el texto buscado
window.Codice.aplicarFiltros = function () {
  var fichas = document.querySelectorAll(".ficha[data-siglo]");   // Fichas que tienen siglo (las biografías)
  var visibles = 0;                                               // Contador de fichas que quedan a la vista
  fichas.forEach(function (ficha) {                               // Recorre cada ficha
    var okSiglo = window.Codice.siglo === "todos" || ficha.dataset.siglo === window.Codice.siglo; // ¿Coincide el siglo?
    var okTexto = ficha.textContent.toLowerCase().indexOf(window.Codice.texto) !== -1;            // ¿Contiene el texto buscado?
    ficha.hidden = !(okSiglo && okTexto);                         // Oculta si no cumple ambas condiciones
    if (!ficha.hidden) { visibles++; }                            // Cuenta las que siguen visibles
  });
  var aviso = document.getElementById("resultados");              // Elemento donde se escribe el resumen
  if (aviso) {                                                    // Solo existe en la página de biografías
    aviso.textContent = visibles === 0 ? "No se halló ninguna ficha." : visibles + (visibles === 1 ? " ficha encontrada." : " fichas encontradas."); // Mensaje según cantidad
  }
};

// Espera a que el HTML esté completamente cargado antes de ejecutar nada
document.addEventListener("DOMContentLoaded", function () {

  // ---- FUNCIÓN 1: escribe la fecha de hoy con estilo de crónica ----
  function mostrarFecha() {
    var destino = document.getElementById("fecha");                 // Busca el elemento donde va la fecha
    if (!destino) { return; }                                       // Si la página no lo tiene, termina
    var hoy = new Date();                                           // Obtiene la fecha actual
    var opciones = { year: "numeric", month: "long", day: "numeric" }; // Formato: día, mes en letras, año
    destino.textContent = "Anno Domini " + hoy.toLocaleDateString("es-AR", opciones); // Escribe la fecha en español
  }

  // ---- FUNCIÓN 2: marca en el menú el enlace de la página actual ----
  function marcarMenuActivo() {
    var ruta = window.location.pathname;                            // Ruta del archivo que se está viendo
    var enlaces = document.querySelectorAll(".menu a");             // Todos los enlaces del menú
    enlaces.forEach(function (enlace) {                             // Recorre cada enlace
      var nombre = enlace.getAttribute("href").split("/").pop();    // Obtiene solo el nombre del archivo del enlace
      if (ruta.endsWith(nombre)) {                                  // Si la ruta actual termina igual que el enlace
        enlace.classList.add("activo");                             // Le añade la clase que lo resalta
      }
    });
  }

  // ---- FUNCIÓN 3: botones de filtro por siglo ----
  function activarFiltros() {
    var botones = document.querySelectorAll(".filtros button");     // Botones de filtro
    botones.forEach(function (boton) {                              // Recorre cada botón
      boton.addEventListener("click", function () {                 // Al hacer clic en el botón...
        window.Codice.siglo = boton.dataset.siglo;                  // Guarda el siglo elegido en el estado compartido
        botones.forEach(function (b) {                              // Recorre de nuevo los botones
          b.setAttribute("aria-pressed", b === boton ? "true" : "false"); // Solo el pulsado queda marcado
        });
        window.Codice.aplicarFiltros();                             // Vuelve a calcular qué fichas se ven
      });
    });
  }

  // Ejecuta las funciones al cargar la página
  mostrarFecha();      // Pone la fecha
  marcarMenuActivo();  // Resalta el menú
  activarFiltros();    // Activa los filtros
});
