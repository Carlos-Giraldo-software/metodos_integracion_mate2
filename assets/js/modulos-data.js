/* ==========================================================================
   modulos-data.js
   ÚNICA fuente de verdad sobre los 14 módulos.
   Si quieres cambiar un nombre, una fase o marcar un módulo como terminado,
   hazlo SOLO aquí: el menú y las tarjetas se construyen solas desde esta lista.
   ========================================================================== */

// "carpeta" = nombre de la carpeta dentro de /modulos/
// "fase"    = 1, 2 o 3 (según la tabla del documento del parcial)
// "listo"   = true si el módulo ya está desarrollado; false si es placeholder
window.MODULOS = [
  { n: 1,  carpeta: '01-sumas-riemann',            titulo: 'Sumas de Riemann',            fase: 1, listo: true,  resumen: 'Rectángulos izquierda, derecha y punto medio.' },
  { n: 2,  carpeta: '02-regla-trapecio',           titulo: 'Regla del Trapecio',          fase: 1, listo: true , resumen: 'Aproximar el área con trapecios.' },
  { n: 3,  carpeta: '03-regla-punto-medio',        titulo: 'Regla del Punto Medio',       fase: 1, listo: true , resumen: 'Rectángulos evaluados en el centro.' },
  { n: 4,  carpeta: '04-regla-simpson',            titulo: 'Regla de Simpson',            fase: 1, listo: true , resumen: 'Parábolas ajustadas (n par).' },
  { n: 5,  carpeta: '05-integral-definida',        titulo: 'Integral definida y área',    fase: 1, listo: true , resumen: 'Teorema Fundamental del Cálculo y área entre curvas.' },
  { n: 6,  carpeta: '06-integracion-directa',      titulo: 'Integración directa',         fase: 1, listo: true , resumen: 'Fórmulas básicas: f(x) y su antiderivada F(x).' },
  { n: 7,  carpeta: '07-sustitucion-potencias',    titulo: 'Sustitución / Potencias',     fase: 2, listo: false, resumen: 'Cambio de variable.' },
  { n: 8,  carpeta: '08-exponenciales',            titulo: 'Exponenciales',               fase: 2, listo: false, resumen: 'Integrales con e^x y a^x.' },
  { n: 9,  carpeta: '09-logaritmicas',             titulo: 'Logarítmicas',                fase: 2, listo: false, resumen: 'Integrales que producen ln.' },
  { n: 10, carpeta: '10-trigonometricas',          titulo: 'Trigonométricas',             fase: 2, listo: false, resumen: 'Integrales de seno, coseno y más.' },
  { n: 11, carpeta: '11-trigonometricas-inversas', titulo: 'Trigonométricas inversas',    fase: 3, listo: false, resumen: 'arcsen, arctan y compañía.' },
  { n: 12, carpeta: '12-hiperbolicas-inversas',    titulo: 'Hiperbólicas inversas',       fase: 3, listo: false, resumen: 'arcsenh, arccosh...' },
  { n: 13, carpeta: '13-trinomio-ax2-bx-c',        titulo: 'Trinomio ax² + bx + c',       fase: 3, listo: false, resumen: 'Completar cuadrados.' },
  { n: 14, carpeta: '14-integracion-por-partes',   titulo: 'Integración por partes',      fase: 3, listo: false, resumen: 'La regla ∫u dv = uv − ∫v du.' }
];
