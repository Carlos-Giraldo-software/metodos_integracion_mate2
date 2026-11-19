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
  { n: 7,  carpeta: '07-sustitucion-potencias',    titulo: 'Sustitución / Potencias',     fase: 2, listo: true , resumen: 'Cambio de variable.' },
  { n: 8,  carpeta: '08-exponenciales',            titulo: 'Exponenciales',               fase: 2, listo: true , resumen: 'Integrales con e^x y a^x.' },
  { n: 9,  carpeta: '09-logaritmicas',             titulo: 'Logarítmicas',                fase: 2, listo: true , resumen: 'Integrales que producen ln.' },
  { n: 10, carpeta: '10-trigonometricas',          titulo: 'Trigonométricas',             fase: 2, listo: true , resumen: 'Integrales de seno, coseno y más.' },
  { n: 11, carpeta: '11-trigonometricas-inversas', titulo: 'Trigonométricas inversas',    fase: 3, listo: true , resumen: 'arcsen, arctan y compañía.' },
  { n: 12, carpeta: '12-hiperbolicas-inversas',    titulo: 'Hiperbólicas inversas',       fase: 3, listo: true , resumen: 'arcsenh, arccosh...' },
  { n: 13, carpeta: '13-trinomio-ax2-bx-c',        titulo: 'Trinomio ax² + bx + c',       fase: 3, listo: true , resumen: 'Completar cuadrados.' },
  { n: 14, carpeta: '14-integracion-por-partes',   titulo: 'Integración por partes',      fase: 3, listo: true,  resumen: 'La regla ∫u dv = uv − ∫v du.' },
  { n: 15, carpeta: '15-solidos-secciones-transversales',        titulo: 'Sólidos por secciones',         fase: 4, listo: true, resumen: 'V = ∫A(x)dx: sólidos armados con rebanadas.' },
  { n: 16, carpeta: '16-solidos-revolucion-discos-arandelas',    titulo: 'Revolución: discos y arandelas', fase: 4, listo: true, resumen: 'Sólidos de revolución con V = π∫(R² − r²)dx.' },
  { n: 17, carpeta: '17-solidos-revolucion-capas',               titulo: 'Revolución: capas cilíndricas',  fase: 4, listo: true, resumen: 'V = 2π∫ρ(x)(f − g)dx.' }
];
