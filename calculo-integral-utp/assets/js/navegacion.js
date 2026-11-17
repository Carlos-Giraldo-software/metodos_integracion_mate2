/* ==========================================================================
   navegacion.js
   Construye tres cosas usando la lista window.MODULOS:
     1) El menú desplegable "Ir a un módulo" (en la cabecera de cada página).
     2) Las tarjetas de la portada (solo si existe #rejilla-modulos).
     3) Los botones "Anterior / Siguiente" (solo si existe #pie-navegacion).
   Cada página le dice a este script dónde está la raíz del sitio mediante
   el atributo data-raiz del <body>. Ejemplos:
     - index.html (portada)              -> data-raiz="./"
     - modulos/01-.../index.html         -> data-raiz="../../"
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.body.getAttribute('data-raiz') || './';                  // ruta hasta la raíz del sitio
  var actual = parseInt(document.body.getAttribute('data-modulo') || '0', 10); // número del módulo actual (0 = portada)
  var modulos = window.MODULOS || [];

  // Devuelve la dirección de la página de un módulo.
  function urlModulo(m) {
    return raiz + 'modulos/' + m.carpeta + '/index.html';
  }

  // Texto corto que indica el estado del módulo.
  function etiquetaEstado(m) {
    return m.listo ? 'Disponible' : 'Próximamente - Fase ' + m.fase;
  }

  /* ---------- 1) Menú desplegable de la cabecera ---------- */
  var menu = document.getElementById('menu-modulos');
  if (menu) {
    // Primera opción: invitación a elegir
    var opInicial = document.createElement('option');
    opInicial.value = '';
    opInicial.textContent = 'Ir a un módulo…';
    menu.appendChild(opInicial);

    modulos.forEach(function (m) {
      var op = document.createElement('option');
      op.value = urlModulo(m);
      op.textContent = m.n + '. ' + m.titulo;
      if (m.n === actual) { op.selected = true; }
      menu.appendChild(op);
    });

    // Al elegir una opción, navegamos a esa página.
    menu.addEventListener('change', function () {
      if (menu.value) { window.location.href = menu.value; }
    });
  }

  /* ---------- 2) Tarjetas de la portada ---------- */
  var rejilla = document.getElementById('rejilla-modulos');
  if (rejilla) {
    modulos.forEach(function (m) {
      var a = document.createElement('a');
      a.className = 'tarjeta' + (m.listo ? '' : ' tarjeta-pendiente');
      a.href = urlModulo(m);

      var num = document.createElement('span');
      num.className = 'tarjeta-num';
      num.textContent = m.n;

      var titulo = document.createElement('h3');
      titulo.textContent = m.titulo;

      var resumen = document.createElement('p');
      resumen.textContent = m.resumen;

      var estado = document.createElement('span');
      estado.className = 'insignia ' + (m.listo ? 'insignia-lista' : 'insignia-pendiente');
      estado.textContent = etiquetaEstado(m);

      a.appendChild(num);
      a.appendChild(titulo);
      a.appendChild(resumen);
      a.appendChild(estado);
      rejilla.appendChild(a);
    });
  }

  /* ---------- 3) Botones Anterior / Siguiente ---------- */
  var pie = document.getElementById('pie-navegacion');
  if (pie && actual > 0) {
    var ant = modulos[actual - 2];   // el arreglo empieza en 0: el módulo 1 está en la posición 0
    var sig = modulos[actual];       // el módulo siguiente está una posición después
    var html = '';
    if (ant) { html += '<a class="boton boton-suave" href="' + urlModulo(ant) + '">← ' + ant.titulo + '</a>'; }
    else { html += '<span></span>'; }
    if (sig) { html += '<a class="boton" href="' + urlModulo(sig) + '">' + sig.titulo + ' →</a>'; }
    pie.innerHTML = html;
  }
})();
