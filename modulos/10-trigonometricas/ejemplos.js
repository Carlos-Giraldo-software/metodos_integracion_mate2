/* ejemplos.js — Módulo 10: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M10 = [
  {
    titulo: "Potencia par: identidad de ángulo doble",
    enunciado: String.raw`Calcula $\int\operatorname{sen}^2x\,dx$ y $\int_0^{\pi}\operatorname{sen}^2x\,dx$.`,
    pasos: [
      { texto: "Reescribe con la identidad.", formula: String.raw`\operatorname{sen}^2x=\frac{1-\cos 2x}{2}` },
      { texto: "Integra término a término ($\int\cos2x\,dx=\frac{\operatorname{sen}2x}{2}$).", formula: String.raw`\int\frac{1-\cos2x}{2}\,dx=\frac{x}{2}-\frac{\operatorname{sen}2x}{4}+C` },
      { texto: "Evalúa entre $0$ y $\pi$.", formula: String.raw`\Big[\frac{x}{2}-\frac{\operatorname{sen}2x}{4}\Big]_0^{\pi}=\frac{\pi}{2}-0` }
    ],
    resultado: String.raw`$\displaystyle\int\operatorname{sen}^2x\,dx=\frac{x}{2}-\frac{\operatorname{sen}2x}{4}+C$ y $\displaystyle\int_0^\pi\operatorname{sen}^2x\,dx=\frac{\pi}{2}\approx1{,}5708$.`
  },
  {
    titulo: "Potencia impar: separar un factor",
    enunciado: String.raw`Calcula $\int\operatorname{sen}^3x\,dx$ y $\int_0^{\pi}\operatorname{sen}^3x\,dx$.`,
    pasos: [
      { texto: "Separa un seno y usa $\operatorname{sen}^2x=1-\cos^2x$.", formula: String.raw`\int\operatorname{sen}^3x\,dx=\int(1-\cos^2x)\operatorname{sen}x\,dx` },
      { texto: "Sustituye $u=\cos x$, $du=-\operatorname{sen}x\,dx$.", formula: String.raw`=-\int(1-u^2)\,du=-u+\frac{u^3}{3}+C` },
      { texto: "Vuelve a $x$.", formula: String.raw`=-\cos x+\frac{\cos^3x}{3}+C` },
      { texto: "Evalúa entre $0$ y $\pi$.", formula: String.raw`\Big(1-\tfrac13\Big)-\Big(-1+\tfrac13\Big)=\frac23+\frac23=\frac43` }
    ],
    resultado: String.raw`$\displaystyle\int_0^{\pi}\operatorname{sen}^3x\,dx=\frac43\approx1{,}3333$.`
  },
  {
    titulo: "Argumento lineal",
    enunciado: String.raw`Calcula $\int\cos(3x)\,dx$ y $\int_0^{\pi/6}\cos(3x)\,dx$.`,
    pasos: [
      { texto: "Con $u=3x$, $dx=\frac{du}{3}$.", formula: String.raw`\int\cos(3x)\,dx=\frac13\operatorname{sen}(3x)+C` },
      { texto: "Evalúa entre $0$ y $\pi/6$.", formula: String.raw`\frac13\big[\operatorname{sen}(3x)\big]_0^{\pi/6}=\frac13\operatorname{sen}\frac{\pi}{2}=\frac13` }
    ],
    resultado: String.raw`$\displaystyle\int_0^{\pi/6}\cos(3x)\,dx=\frac13$.`
  }
];
