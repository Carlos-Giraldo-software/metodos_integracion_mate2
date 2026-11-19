/* ejemplos.js — Módulo 11: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M11 = [
  {
    titulo: "Forma arcoseno con coeficiente",
    enunciado: String.raw`Calcula $\int\frac{dx}{\sqrt{9-4x^2}}$ y $\int_0^1\frac{dx}{\sqrt{9-4x^2}}$.`,
    pasos: [
      { texto: "Factoriza el 9 dentro de la raíz.", formula: String.raw`\sqrt{9-4x^2}=3\sqrt{1-\Big(\tfrac{2x}{3}\Big)^2}` },
      { texto: "Elige $u=\frac{2x}{3}$, de modo que $dx=\frac32\,du$.", formula: String.raw`\int\frac{dx}{\sqrt{9-4x^2}}=\int\frac{\tfrac32\,du}{3\sqrt{1-u^2}}=\frac12\int\frac{du}{\sqrt{1-u^2}}` },
      { texto: "Aplica la fórmula del arcoseno y vuelve a $x$.", formula: String.raw`=\frac12\operatorname{arcsen}u+C=\frac12\operatorname{arcsen}\frac{2x}{3}+C` },
      { texto: "Evalúa entre $0$ y $1$ (cumple $|x|<\frac32$).", formula: String.raw`\frac12\operatorname{arcsen}\frac23-0\approx\frac12(0{,}7297)\approx 0{,}3649` }
    ],
    resultado: String.raw`$\displaystyle\int\frac{dx}{\sqrt{9-4x^2}}=\tfrac12\operatorname{arcsen}\tfrac{2x}{3}+C$ y la integral definida vale $\approx0{,}3649$.`
  },
  {
    titulo: "Forma arcotangente",
    enunciado: String.raw`Calcula $\int\frac{dx}{x^2+4}$ y $\int_0^2\frac{dx}{x^2+4}$.`,
    pasos: [
      { texto: "Identifica $a^2=4$, es decir, $a=2$.", formula: String.raw`\int\frac{dx}{x^2+2^2}=\frac12\arctan\frac{x}{2}+C` },
      { texto: "Evalúa entre $0$ y $2$.", formula: String.raw`\frac12\Big[\arctan\frac{x}{2}\Big]_0^2=\frac12\big(\arctan1-\arctan0\big)=\frac12\cdot\frac{\pi}{4}` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\frac12\arctan\frac{x}{2}=\frac12\cdot\frac{1/2}{1+x^2/4}=\frac{1}{x^2+4}\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int_0^2\frac{dx}{x^2+4}=\frac{\pi}{8}\approx0{,}3927$.`
  },
  {
    titulo: "Forma arcosecante",
    enunciado: String.raw`Calcula $\int_{\sqrt2}^{2}\frac{dx}{x\sqrt{x^2-1}}$.`,
    pasos: [
      { texto: "Aquí $a=1$ y $x>1$ en todo el intervalo.", formula: String.raw`\int\frac{dx}{x\sqrt{x^2-1}}=\operatorname{arcsec}x+C` },
      { texto: "Evalúa: $\operatorname{arcsec}2=\frac{\pi}{3}$ y $\operatorname{arcsec}\sqrt2=\frac{\pi}{4}$.", formula: String.raw`\operatorname{arcsec}2-\operatorname{arcsec}\sqrt2=\frac{\pi}{3}-\frac{\pi}{4}=\frac{\pi}{12}` }
    ],
    resultado: String.raw`$\displaystyle\int_{\sqrt2}^{2}\frac{dx}{x\sqrt{x^2-1}}=\frac{\pi}{12}\approx0{,}2618$. En el visualizador, elige $a=1$ con límites $1{,}41$ y $2$.`
  }
];
