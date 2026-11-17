/* ==========================================================================
   ejemplos.js — Módulo 1: ejemplos resueltos paso a paso
   Cada ejemplo es un objeto con: titulo, enunciado, pasos y resultado.
   Las fórmulas se escriben en LaTeX. Como estamos dentro de un texto de JavaScript,
   usamos String.raw`...` para no tener que duplicar cada barra invertida (\).
   ========================================================================== */
window.EJEMPLOS_M1 = [
  {
    titulo: 'Suma izquierda, derecha y punto medio para $x^2$',
    enunciado: String.raw`Aproxima $\int_0^2 x^2\,dx$ con $n=4$ rectángulos usando las sumas izquierda, derecha y del punto medio.`,
    pasos: [
      { texto: 'Calcula el ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{b-a}{n}=\frac{2-0}{4}=0{,}5` },
      { texto: 'Los puntos de la partición son:',
        formula: String.raw`x_0=0,\; x_1=0{,}5,\; x_2=1,\; x_3=1{,}5,\; x_4=2` },
      { texto: 'Suma izquierda: evalúa $f$ en $x_0,x_1,x_2,x_3$.',
        formula: String.raw`L_4=0{,}5\,[\,0^2+0{,}5^2+1^2+1{,}5^2\,]=0{,}5\,(0+0{,}25+1+2{,}25)=0{,}5\cdot 3{,}5=1{,}75` },
      { texto: 'Suma derecha: evalúa $f$ en $x_1,x_2,x_3,x_4$.',
        formula: String.raw`R_4=0{,}5\,[\,0{,}5^2+1^2+1{,}5^2+2^2\,]=0{,}5\,(0{,}25+1+2{,}25+4)=0{,}5\cdot 7{,}5=3{,}75` },
      { texto: 'Punto medio: los centros son $0{,}25;\\ 0{,}75;\\ 1{,}25;\\ 1{,}75$.',
        formula: String.raw`M_4=0{,}5\,(0{,}0625+0{,}5625+1{,}5625+3{,}0625)=0{,}5\cdot 5{,}25=2{,}625` },
      { texto: 'Compara con el valor exacto (Teorema Fundamental del Cálculo).',
        formula: String.raw`\int_0^2 x^2\,dx=\left[\frac{x^3}{3}\right]_0^2=\frac{8}{3}\approx 2{,}6667` }
    ],
    resultado: String.raw`$L_4=1{,}75$ (subestima), $R_4=3{,}75$ (sobreestima) y $M_4=2{,}625$ (la más cercana a $8/3$). Como $x^2$ es creciente en $[0,2]$, la izquierda queda por debajo y la derecha por encima.`
  },
  {
    titulo: 'Convergencia con $\\operatorname{sen}(x)$',
    enunciado: String.raw`Aproxima $\int_0^{\pi}\operatorname{sen}(x)\,dx$ con $n=4$ usando las sumas izquierda, derecha y punto medio.`,
    pasos: [
      { texto: 'Ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{\pi-0}{4}=\frac{\pi}{4}\approx 0{,}7854` },
      { texto: 'Suma izquierda: puntos $0,\\ \\pi/4,\\ \\pi/2,\\ 3\\pi/4$.',
        formula: String.raw`L_4=\frac{\pi}{4}\left(0+\tfrac{\sqrt2}{2}+1+\tfrac{\sqrt2}{2}\right)=\frac{\pi}{4}(1+\sqrt2)\approx 1{,}8961` },
      { texto: 'Suma derecha: puntos $\\pi/4,\\ \\pi/2,\\ 3\\pi/4,\\ \\pi$. Aparecen los mismos valores (la curva es simétrica), así que:',
        formula: String.raw`R_4=\frac{\pi}{4}\left(\tfrac{\sqrt2}{2}+1+\tfrac{\sqrt2}{2}+0\right)=\frac{\pi}{4}(1+\sqrt2)\approx 1{,}8961` },
      { texto: 'Punto medio: los centros son $\\pi/8,\\ 3\\pi/8,\\ 5\\pi/8,\\ 7\\pi/8$.',
        formula: String.raw`M_4=\frac{\pi}{4}\,[\,\operatorname{sen}\tfrac{\pi}{8}+\operatorname{sen}\tfrac{3\pi}{8}+\operatorname{sen}\tfrac{5\pi}{8}+\operatorname{sen}\tfrac{7\pi}{8}\,]\approx 0{,}7854\,(2{,}6131)\approx 2{,}0523` },
      { texto: 'Valor exacto:',
        formula: String.raw`\int_0^{\pi}\operatorname{sen}(x)\,dx=\big[-\cos x\big]_0^{\pi}=1-(-1)=2` }
    ],
    resultado: String.raw`$L_4=R_4\approx 1{,}8961$ y $M_4\approx 2{,}0523$; el valor exacto es $2$. Aquí la izquierda y la derecha coinciden porque $\operatorname{sen}(x)$ es simétrica respecto de $x=\pi/2$. Aumenta $n$ en el visualizador y observa cómo las tres sumas se acercan a $2$.`
  }
];
