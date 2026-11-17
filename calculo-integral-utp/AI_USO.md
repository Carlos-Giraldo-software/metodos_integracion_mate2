# Registro de uso de inteligencia artificial

El documento del parcial permite usar IA en la **Parte II (software)** y exige documentar su uso.
La **Parte I (taller manual)** se resolvió sin IA.

| Herramienta | Para qué se usó | Archivos afectados | Cómo se verificó |
|---|---|---|---|
| Claude (Anthropic) | Generar la estructura base, los estilos y el código de los módulos 1 a 14, con comentarios en español | `index.html`, `assets/**`, `modulos/01-sumas-riemann/**`, `modulos/02-regla-trapecio/**`, `modulos/03-regla-punto-medio/**`, `modulos/04-regla-simpson/**`, `modulos/05-integral-definida/**`, `modulos/06-integracion-directa/**`, `modulos/07-sustitucion-potencias/**` a `modulos/14-integracion-por-partes/**`, `notebooks/**`, `README.md` | Pruebas con Node.js de las funciones de cálculo; comparación de los ejemplos con cálculo manual; comprobación numérica de que la derivada de cada antiderivada del catálogo (módulos 7 a 14) coincide con su función; ejecución completa de los 6 cuadernos (todas las comprobaciones `assert` pasan); _(añade aquí tu revisión en el navegador cuando la hagas)_ |
| _(completa aquí si usas Qwen Coder u otra herramienta)_ | | | |

## Notas

- Todo el código generado con IA fue leído, probado y entendido por el autor antes de entregarse.
- Las bibliotecas externas (KaTeX, Plotly.js) se usan tal cual, con sus licencias originales.
