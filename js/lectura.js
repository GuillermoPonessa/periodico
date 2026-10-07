// lectura.js: ayudas de lectura (barra de progreso, tamaño de letra y botón de volver arriba)

document.addEventListener("DOMContentLoaded", function () {         // Espera a que el HTML esté listo

  // ---- BARRA DE PROGRESO: una línea dorada arriba que crece al bajar ----
  var barra = document.createElement("div");                        // Crea el elemento de la barra
  barra.className = "barra-lectura";                                // Le asigna la clase con estilos del CSS
  barra.setAttribute("aria-hidden", "true");                        // Los lectores de pantalla la ignoran
  document.body.appendChild(barra);                                 // La agrega a la página

  // ---- BOTÓN VOLVER ARRIBA ----
  var subir = document.createElement("button");                     // Crea el botón
  subir.className = "subir";                                        // Clase con estilos
  subir.type = "button";                                            // Tipo botón (no envía formularios)
  subir.textContent = "Subir";                                      // Texto visible
  subir.addEventListener("click", function () {                     // Al hacer clic...
    window.scrollTo({ top: 0, behavior: "smooth" });                // Sube suavemente al inicio
  });
  document.body.appendChild(subir);                                 // Lo agrega a la página

  // ---- ACTUALIZA BARRA Y BOTÓN AL HACER SCROLL ----
  function alDesplazar() {
    var alto = document.documentElement.scrollHeight - window.innerHeight; // Cuánto se puede bajar en total
    var avance = alto > 0 ? (window.scrollY / alto) * 100 : 0;      // Porcentaje bajado (0 a 100)
    barra.style.width = avance + "%";                               // La barra mide ese porcentaje
    subir.classList.toggle("visible", window.scrollY > 400);        // El botón aparece tras bajar 400 px
  }
  window.addEventListener("scroll", alDesplazar, { passive: true }); // Escucha el scroll sin frenar la página
  alDesplazar();                                                    // Calcula el estado inicial

  // ---- TAMAÑO DE LETRA (A- / A+) ----
  var tamano = 100;                                                 // Tamaño actual en porcentaje
  function cambiar(delta) {                                         // Suma o resta al tamaño
    tamano = Math.max(85, Math.min(140, tamano + delta));           // Limita entre 85% y 140%
    document.body.style.fontSize = (tamano / 100) * 1.15 + "rem";   // Aplica el tamaño (1.15rem es la base del CSS)
  }
  var menos = document.getElementById("letra-menos");               // Botón A-
  var mas = document.getElementById("letra-mas");                   // Botón A+
  if (menos) { menos.addEventListener("click", function () { cambiar(-10); }); } // A- reduce 10%
  if (mas) { mas.addEventListener("click", function () { cambiar(10); }); }      // A+ aumenta 10%
});
