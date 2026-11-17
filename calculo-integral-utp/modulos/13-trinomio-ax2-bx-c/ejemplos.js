/* ejemplos.js — Módulo 13: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M13 = [
  {
    titulo: "Discriminante negativo: arcotangente",
    enunciado: String.raw`Calcula $\int\frac{dx}{x^2+4x+13}$ y $\int_{-2}^{1}\frac{dx}{x^2+4x+13}$.`,
    pasos: [
      { texto: "Completa el cuadrado.", formula: String.raw`x^2+4x+13=(x+2)^2+9` },
      { texto: "Elige $u=x+2$, $du=dx$, y aplica $\int\frac{du}{u^2+3^2}=\frac13\arctan\frac u3$.", formula: String.raw`\int\frac{dx}{(x+2)^2+9}=\frac13\arctan\frac{x+2}{3}+C` },
      { texto: "Evalúa entre $-2$ y $1$.", formula: String.raw`\frac13\Big[\arctan\frac{x+2}{3}\Big]_{-2}^{1}=\frac13\big(\arctan1-\arctan0\big)=\frac13\cdot\frac\pi4` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\frac13\arctan\frac{x+2}{3}=\frac13\cdot\frac{1/3}{1+\frac{(x+2)^2}{9}}=\frac{1}{(x+2)^2+9}\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int_{-2}^{1}\frac{dx}{x^2+4x+13}=\frac{\pi}{12}\approx0{,}2618$.`
  },
  {
    titulo: "Discriminante positivo: logaritmo",
    enunciado: String.raw`Calcula $\int\frac{dx}{x^2-4x+3}$ y $\int_4^6\frac{dx}{x^2-4x+3}$.`,
    pasos: [
      { texto: "Completa el cuadrado.", formula: String.raw`x^2-4x+3=(x-2)^2-1` },
      { texto: "Con $u=x-2$ y $\int\frac{du}{u^2-a^2}=\frac{1}{2a}\ln\left|\frac{u-a}{u+a}\right|$ ($a=1$):", formula: String.raw`\int\frac{dx}{(x-2)^2-1}=\frac12\ln\left|\frac{x-3}{x-1}\right|+C` },
      { texto: "Las raíces ($x=1$ y $x=3$) quedan fuera de $[4,6]$. Evalúa.", formula: String.raw`\frac12\Big[\ln\frac35-\ln\frac13\Big]=\frac12\ln\frac95` }
    ],
    resultado: String.raw`$\displaystyle\int_4^6\frac{dx}{x^2-4x+3}=\tfrac12\ln\tfrac95\approx0{,}2939$.`
  },
  {
    titulo: "Trinomio bajo una raíz",
    enunciado: String.raw`Calcula $\int_0^2\frac{dx}{\sqrt{-x^2+2x+3}}$.`,
    pasos: [
      { texto: "Completa el cuadrado.", formula: String.raw`-x^2+2x+3=4-(x-1)^2` },
      { texto: "Con $u=x-1$: $\int\frac{du}{\sqrt{2^2-u^2}}=\operatorname{arcsen}\frac u2$.", formula: String.raw`\int\frac{dx}{\sqrt{4-(x-1)^2}}=\operatorname{arcsen}\frac{x-1}{2}+C` },
      { texto: "Evalúa entre $0$ y $2$.", formula: String.raw`\operatorname{arcsen}\frac12-\operatorname{arcsen}\Big(-\frac12\Big)=\frac\pi6+\frac\pi6` }
    ],
    resultado: String.raw`$\displaystyle\int_0^2\frac{dx}{\sqrt{-x^2+2x+3}}=\frac{\pi}{3}\approx1{,}0472$. En el visualizador, elige la tercera opción con $b=2$, $c=3$.`
  }
];
