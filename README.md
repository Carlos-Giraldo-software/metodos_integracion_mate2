# Cálculo Integral Interactivo

Plataforma web educativa para aprender cálculo integral de forma visual e interactiva.
Proyecto semestral de **Matemáticas II** — Universidad Tecnológica de Pereira, Departamento de Matemáticas.

Es un sitio **100 % estático** (HTML + CSS + JavaScript), sin servidor ni proceso de compilación,
pensado para publicarse en **GitHub Pages**.

## Estado del proyecto

| Módulo | Contenido | Fase | Estado |
|---|---|---|---|
| 1 | Sumas de Riemann | 1 | Desarrollado |
| 2 | Regla del Trapecio | 1 | Desarrollado |
| 3 | Regla del Punto Medio | 1 | Desarrollado |
| 4 | Regla de Simpson | 1 | Desarrollado |
| 5 | Integral definida / área bajo la curva | 1 | En construcción |
| 6 | Integración directa | 1 | En construcción |
| 7–10 | Sustitución/Potencias, Exponenciales, Logarítmicas, Trigonométricas | 2 | Placeholder |
| 11–14 | Trig. inversas, Hiperbólicas inversas, Trinomio, Por partes | 3 | Placeholder |

## Arquitectura

```
calculo-integral-utp/
├── index.html              Portada con navegación a los 14 módulos
├── README.md               Este documento
├── AI_USO.md               Registro del uso de herramientas de IA
├── .nojekyll               Indica a GitHub Pages que sirva los archivos tal cual
├── assets/
│   ├── css/style.css       Estilos globales (responsive)
│   └── js/
│       ├── modulos-data.js Lista única de los 14 módulos (fuente de verdad)
│       ├── navegacion.js   Menú, tarjetas de la portada y botones anterior/siguiente
│       ├── matematicas.js  Cálculo: Riemann, trapecio, punto medio, Simpson, validaciones
│       ├── graficas.js     Datos para Plotly: curva, rectángulos, trapecios, parábolas
│       └── katex-init.js   Renderizado de fórmulas y de los ejemplos resueltos
├── modulos/
│   ├── 01-sumas-riemann/   index.html · script.js · ejemplos.js (igual en los módulos 2 a 4)
│   ├── ...                 (una carpeta por módulo)
│   └── 14-integracion-por-partes/
└── notebooks/              Prototipos en Python (Google Colab), uno por módulo 1–6
```

### Cómo se conectan las piezas

1. Cada página carga sus scripts con `defer`, que se ejecutan **en orden** cuando el HTML ya está listo.
2. `modulos-data.js` define la lista de módulos; `navegacion.js` la usa para construir el menú y las tarjetas.
3. `matematicas.js` solo calcula (no toca el HTML). `graficas.js` solo prepara datos para Plotly.
4. El `script.js` de cada módulo lee los controles, llama a `Mate` y `Grafica`, y dibuja con Plotly.
5. Los ejemplos resueltos viven en `ejemplos.js` como datos (LaTeX) y se dibujan con `renderEjemplos`.
6. Cada `<body>` declara `data-raiz` (ruta hasta la raíz del sitio) y `data-modulo` (su número).

### Bibliotecas externas (por CDN, versiones fijas)

- KaTeX 0.16.9 — fórmulas matemáticas
- Plotly.js 2.35.2 (`plotly.js-dist-min`) — gráficas interactivas

Se necesita conexión a internet para cargarlas.

## Cómo probar el sitio en tu computador

Abre `index.html` con el navegador (doble clic). Si prefieres un servidor local:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## Cómo contribuir

### Añadir o completar un módulo

1. Abre la carpeta del módulo en `modulos/NN-nombre/`.
2. Copia la estructura del módulo 1: `index.html`, `script.js` y `ejemplos.js`.
3. En `index.html` actualiza el título, el número en `data-modulo` y la teoría.
4. Escribe los ejemplos en `ejemplos.js` (fórmulas en LaTeX con `String.raw`).
5. En `assets/js/modulos-data.js` cambia `listo: false` a `listo: true`.
6. Prueba en el navegador y revisa la consola (F12) por si hay errores.

### Añadir una función al catálogo

En `assets/js/matematicas.js`, agrega un objeto a `FUNCIONES` con `id`, `texto`, `f`, una antiderivada `F`,
`dominioMin` y un intervalo sugerido `a`, `b`.

### Reglas del proyecto

- Comentarios en español, pensados para programadores principiantes.
- Sin frameworks ni herramientas de compilación.
- Los cálculos nuevos van en `matematicas.js`, no dentro de los módulos.
- Documenta el uso de IA en `AI_USO.md`.

## Créditos

Universidad Tecnológica de Pereira — Departamento de Matemáticas, Facultad de Ciencias Básicas.
