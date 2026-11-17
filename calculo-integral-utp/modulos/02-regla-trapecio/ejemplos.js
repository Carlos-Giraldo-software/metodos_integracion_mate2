/* ==========================================================================
   ejemplos.js — Módulo 2: ejemplos resueltos de la regla del trapecio
   Las fórmulas están en LaTeX dentro de String.raw`...` (así no hay que duplicar "\").
   ========================================================================== */
window.EJEMPLOS_M2 = [
  {
    titulo: 'Trapecio para $x^2$ con $n=4$',
    enunciado: String.raw`Aproxima $\int_0^2 x^2\,dx$ con la regla del trapecio usando $n=4$.`,
    pasos: [
      { texto: 'Ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{2-0}{4}=0{,}5` },
      { texto: 'Nodos y valores de $f(x)=x^2$ en cada uno.',
        formula: String.raw`\begin{array}{c|ccccc} x_i & 0 & 0{,}5 & 1 & 1{,}5 & 2\\ \hline f(x_i) & 0 & 0{,}25 & 1 & 2{,}25 & 4 \end{array}` },
      { texto: 'Aplica la fórmula: extremos una vez, valores interiores dos veces.',
        formula: String.raw`T_4=\frac{0{,}5}{2}\Big[0+2(0{,}25+1+2{,}25)+4\Big]=0{,}25\,[\,7+4\,]` },
      { texto: 'Termina la cuenta.',
        formula: String.raw`T_4=0{,}25\cdot 11=2{,}75` },
      { texto: 'Compara con el valor exacto.',
        formula: String.raw`\int_0^2 x^2\,dx=\frac{8}{3}\approx 2{,}6667\quad\Rightarrow\quad \text{error}\approx 0{,}0833` }
    ],
    resultado: String.raw`$T_4=2{,}75$. Sobreestima el área porque $f''(x)=2>0$: la curva es cóncava hacia arriba y los segmentos quedan por encima.`
  },
  {
    titulo: 'Trapecio para $1/x$ en $[1,3]$',
    enunciado: String.raw`Aproxima $\int_1^3 \dfrac{1}{x}\,dx$ con $n=4$ y compara con $\ln 3$.`,
    pasos: [
      { texto: 'Ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{3-1}{4}=0{,}5` },
      { texto: 'Nodos y valores de $f(x)=1/x$.',
        formula: String.raw`\begin{array}{c|ccccc} x_i & 1 & 1{,}5 & 2 & 2{,}5 & 3\\ \hline f(x_i) & 1 & \tfrac{2}{3} & \tfrac{1}{2} & \tfrac{2}{5} & \tfrac{1}{3} \end{array}` },
      { texto: 'Suma de los valores interiores.',
        formula: String.raw`\tfrac{2}{3}+\tfrac{1}{2}+\tfrac{2}{5}=\frac{20+15+12}{30}=\frac{47}{30}` },
      { texto: 'Aplica la fórmula del trapecio.',
        formula: String.raw`T_4=\frac{0{,}5}{2}\Big[1+2\cdot\frac{47}{30}+\frac{1}{3}\Big]=\frac{1}{4}\cdot\frac{67}{15}=\frac{67}{60}\approx 1{,}1167` },
      { texto: 'Valor exacto por el Teorema Fundamental del Cálculo.',
        formula: String.raw`\int_1^3\frac{1}{x}\,dx=\ln 3-\ln 1=\ln 3\approx 1{,}0986` }
    ],
    resultado: String.raw`$T_4\approx 1{,}1167$ frente a $\ln 3\approx 1{,}0986$ (error $\approx 0{,}018$). De nuevo sobreestima, porque $f''(x)=2/x^3>0$.`
  }
];
