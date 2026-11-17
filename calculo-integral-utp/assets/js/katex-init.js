/* ==========================================================================
   katex-init.js
   Activa KaTeX (fórmulas matemáticas) y contiene el "dibujante" de ejemplos.
   Delimitadores que puedes usar dentro del HTML:
       $ ... $     -> fórmula dentro de una línea de texto
       $$ ... $$   -> fórmula en su propia línea, centrada
   ========================================================================== */
(function () {
  'use strict';

  // Convierte en fórmulas todo el texto con $...$ que haya dentro de "elemento".
  // Si no se indica elemento, revisa la página completa.
  function renderizarMate(elemento) {
    if (typeof renderMathInElement !== 'function') {
      // Si KaTeX no cargó (por ejemplo, sin internet) avisamos en la consola y seguimos.
      console.warn('KaTeX no está disponible: las fórmulas se verán como texto.');
      return;
    }
    renderMathInElement(elemento || document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$',  right: '$',  display: false }
      ],
      throwOnError: false   // si una fórmula tiene un error, no rompe la página
    });
  }

  // Dibuja una lista de ejemplos resueltos paso a paso dentro de "contenedor".
  // Cada ejemplo tiene la forma:
  //   { titulo, enunciado, pasos: [ {texto, formula}, ... ], resultado }
  function renderEjemplos(lista, contenedor) {
    contenedor.innerHTML = '';
    lista.forEach(function (ej, i) {
      var caja = document.createElement('article');
      caja.className = 'ejemplo';

      var html = '<h3>Ejemplo ' + (i + 1) + ': ' + ej.titulo + '</h3>';
      html += '<p class="enunciado">' + ej.enunciado + '</p>';
      html += '<ol class="pasos">';
      ej.pasos.forEach(function (p) {
        html += '<li><p>' + p.texto + '</p>';
        if (p.formula) { html += '<div class="formula-paso">$$' + p.formula + '$$</div>'; }
        html += '</li>';
      });
      html += '</ol>';
      html += '<p class="resultado-ejemplo"><strong>Resultado:</strong> ' + ej.resultado + '</p>';

      caja.innerHTML = html;
      contenedor.appendChild(caja);
    });
    renderizarMate(contenedor);
  }

  // Los ponemos disponibles para los demás archivos.
  window.renderizarMate = renderizarMate;
  window.renderEjemplos = renderEjemplos;

  // Como los scripts se cargan con "defer", el HTML ya está listo aquí.
  renderizarMate(document.body);
})();
