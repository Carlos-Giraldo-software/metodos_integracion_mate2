/* ejemplos.js — Módulo 8: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M8 = [
  {
    titulo: "Exponente lineal",
    enunciado: String.raw`Calcula $\int e^{-2x}\,dx$ y $\int_0^1 3e^{2x}\,dx$.`,
    pasos: [
      { texto: "Con $u=-2x$, $dx=-\frac{du}{2}$.", formula: String.raw`\int e^{-2x}\,dx=-\frac12\int e^{u}\,du=-\frac12 e^{-2x}+C` },
      { texto: "Antiderivada de $3e^{2x}$ (aquí $k=2$).", formula: String.raw`\int 3e^{2x}\,dx=\frac{3}{2}e^{2x}+C` },
      { texto: "Evalúa entre $0$ y $1$.", formula: String.raw`\int_0^1 3e^{2x}\,dx=\frac32\big(e^{2}-1\big)` },
      { texto: "Valor numérico.", formula: String.raw`\tfrac32(7{,}38906-1)\approx 9{,}5836` }
    ],
    resultado: String.raw`$\displaystyle\int e^{-2x}dx=-\tfrac12e^{-2x}+C$ y $\displaystyle\int_0^1 3e^{2x}dx\approx 9{,}5836$.`
  },
  {
    titulo: "Otra base",
    enunciado: String.raw`Calcula $\int 2^{x}\,dx$ y $\int_0^3 2^{x}\,dx$.`,
    pasos: [
      { texto: "Aplica $\int a^x\,dx=\frac{a^x}{\ln a}$ con $a=2$.", formula: String.raw`\int 2^{x}\,dx=\frac{2^{x}}{\ln 2}+C` },
      { texto: "Evalúa entre $0$ y $3$.", formula: String.raw`\int_0^3 2^{x}\,dx=\frac{2^{3}-2^{0}}{\ln 2}=\frac{7}{\ln 2}` },
      { texto: "Valor numérico.", formula: String.raw`\frac{7}{0{,}69315}\approx 10{,}0990` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\frac{2^x}{\ln 2}=\frac{2^x\ln 2}{\ln 2}=2^x\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int_0^3 2^{x}dx=\frac{7}{\ln 2}\approx 10{,}0990$. En el visualizador, elige $a^{kx}$ con $a=2$, $k=1$ y límites $0$ y $3$.`
  }
];
