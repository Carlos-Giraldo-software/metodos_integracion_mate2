# Cuadernos de Google Colab

Prototipos en Python de los módulos 1 a 6. Sirven para probar la matemática antes de llevarla a JavaScript
y para comprobar que ambos dan los mismos resultados.

| Cuaderno | Contenido |
|---|---|
| `01_sumas_riemann.ipynb` | Sumas izquierda, derecha y punto medio; convergencia |
| `02_trapecio.ipynb` | Regla del trapecio; relación con L y R; orden de convergencia |
| `03_punto_medio.ipynb` | Punto medio frente a trapecio; errores con signo |
| `04_simpson.ipynb` | Deducción de la fórmula con SymPy; exactitud en polinomios; orden de convergencia |
| `05_integral_definida.ipynb` | Teorema Fundamental, función de acumulación, integral vs. área, área entre curvas |
| `06_integracion_directa.ipynb` | Fórmulas básicas verificadas por derivación; ejemplos del módulo 6 |

## Cómo abrirlos en Colab

1. Entra a Google Colab e inicia sesión.
2. Menú **Archivo → Subir cuaderno** y elige el `.ipynb`.
3. Ejecuta las celdas en orden (**Entorno de ejecución → Ejecutar todas**).

Los algoritmos numéricos están escritos desde cero con NumPy. SymPy se usa solo para valores exactos
y para verificar por derivación. Si tu entorno no tuviera SymPy, ejecuta `!pip install sympy` en una celda.

Los cuadernos se guardaron con sus salidas para poder verse en GitHub; Colab las vuelve a calcular al ejecutar.
