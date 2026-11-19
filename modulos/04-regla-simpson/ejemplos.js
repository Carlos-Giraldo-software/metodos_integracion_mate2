/* ==========================================================================
   ejemplos.js — Módulo 4: ejemplos resueltos de la regla de Simpson
   ========================================================================== */
window.EJEMPLOS_M4 = [
  {
    titulo: 'Simpson para $x^2$: resultado exacto',
    enunciado: String.raw`Aproxima $\int_0^2 x^2\,dx$ con la regla de Simpson usando $n=4$.`,
    pasos: [
      { texto: 'Comprueba que $n=4$ es par (dos parábolas) y calcula el ancho.',
        formula: String.raw`\Delta x=\frac{2-0}{4}=0{,}5` },
      { texto: 'Nodos y valores de $f(x)=x^2$, con su coeficiente de Simpson.',
        formula: String.raw`\begin{array}{c|ccccc} x_i & 0 & 0{,}5 & 1 & 1{,}5 & 2\\ \hline f(x_i) & 0 & 0{,}25 & 1 & 2{,}25 & 4\\ \hline \text{coef.} & 1 & 4 & 2 & 4 & 1 \end{array}` },
      { texto: 'Aplica la fórmula.',
        formula: String.raw`S_4=\frac{0{,}5}{3}\Big[0+4(0{,}25)+2(1)+4(2{,}25)+4\Big]=\frac{1}{6}\,[\,1+2+9+4\,]` },
      { texto: 'Termina la cuenta.',
        formula: String.raw`S_4=\frac{16}{6}=\frac{8}{3}` },
      { texto: 'Compara con el valor exacto.',
        formula: String.raw`\int_0^2 x^2\,dx=\frac{8}{3}` }
    ],
    resultado: String.raw`$S_4=\dfrac{8}{3}$, igual al valor exacto. No es casualidad: Simpson es exacta para polinomios de grado 3 o menor. El trapecio con el mismo $n$ daba $2{,}75$.`
  },
  {
    titulo: 'Simpson para $\\operatorname{sen}(x)$ en $[0,\\pi]$',
    enunciado: String.raw`Aproxima $\int_0^{\pi}\operatorname{sen}(x)\,dx$ con Simpson usando $n=4$ y compara con el trapecio.`,
    pasos: [
      { texto: 'Ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{\pi}{4}` },
      { texto: 'Nodos y valores de $f(x)=\\operatorname{sen}(x)$, con su coeficiente.',
        formula: String.raw`\begin{array}{c|ccccc} x_i & 0 & \tfrac{\pi}{4} & \tfrac{\pi}{2} & \tfrac{3\pi}{4} & \pi\\ \hline f(x_i) & 0 & \tfrac{\sqrt2}{2} & 1 & \tfrac{\sqrt2}{2} & 0\\ \hline \text{coef.} & 1 & 4 & 2 & 4 & 1 \end{array}` },
      { texto: 'Aplica la fórmula.',
        formula: String.raw`S_4=\frac{\pi/4}{3}\Big[0+4\cdot\tfrac{\sqrt2}{2}+2\cdot 1+4\cdot\tfrac{\sqrt2}{2}+0\Big]=\frac{\pi}{12}\,(2+4\sqrt2)` },
      { texto: 'Valor numérico.',
        formula: String.raw`S_4\approx 0{,}2618\cdot 7{,}6569\approx 2{,}0046` },
      { texto: 'Valor exacto y comparación.',
        formula: String.raw`\int_0^{\pi}\operatorname{sen}(x)\,dx=2,\qquad \text{error de }S_4\approx 0{,}0046` }
    ],
    resultado: String.raw`$S_4\approx 2{,}0046$ (error $\approx 0{,}005$). Con el mismo $n$, el trapecio da $T_4\approx 1{,}8961$ (error $\approx 0{,}104$): Simpson es más de 20 veces más precisa aquí.`
  }
];
