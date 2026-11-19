/* ==========================================================================
   ejemplos.js — Módulo 3: ejemplos resueltos de la regla del punto medio
   ========================================================================== */
window.EJEMPLOS_M3 = [
  {
    titulo: 'Punto medio para $e^x$ en $[0,1]$',
    enunciado: String.raw`Aproxima $\int_0^1 e^x\,dx$ con la regla del punto medio usando $n=4$.`,
    pasos: [
      { texto: 'Ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{1-0}{4}=0{,}25` },
      { texto: 'Subintervalos y sus puntos medios.',
        formula: String.raw`[0;0{,}25]\to 0{,}125,\quad [0{,}25;0{,}5]\to 0{,}375,\quad [0{,}5;0{,}75]\to 0{,}625,\quad [0{,}75;1]\to 0{,}875` },
      { texto: 'Evalúa $f(x)=e^x$ en cada punto medio.',
        formula: String.raw`e^{0{,}125}\approx 1{,}1331,\quad e^{0{,}375}\approx 1{,}4550,\quad e^{0{,}625}\approx 1{,}8682,\quad e^{0{,}875}\approx 2{,}3989` },
      { texto: 'Suma las alturas y multiplica por $\\Delta x$.',
        formula: String.raw`M_4=0{,}25\,(1{,}1331+1{,}4550+1{,}8682+2{,}3989)=0{,}25\cdot 6{,}8553\approx 1{,}7138` },
      { texto: 'Valor exacto.',
        formula: String.raw`\int_0^1 e^x\,dx=e-1\approx 1{,}7183` }
    ],
    resultado: String.raw`$M_4\approx 1{,}7138$, con error $\approx 0{,}0045$. Subestima porque $f''(x)=e^x>0$. Con el trapecio y el mismo $n$ se obtiene $T_4\approx 1{,}7272$ (error $\approx 0{,}0089$, sobreestimando): aproximadamente el doble de error.`
  },
  {
    titulo: 'Punto medio para $1/x$ en $[1,3]$',
    enunciado: String.raw`Aproxima $\int_1^3 \dfrac{1}{x}\,dx$ con $n=4$ y compara con $\ln 3$.`,
    pasos: [
      { texto: 'Ancho de cada subintervalo.',
        formula: String.raw`\Delta x=\frac{3-1}{4}=0{,}5` },
      { texto: 'Los subintervalos son $[1;1{,}5],\\ [1{,}5;2],\\ [2;2{,}5],\\ [2{,}5;3]$; sus puntos medios:',
        formula: String.raw`\bar{x}_1=1{,}25,\quad \bar{x}_2=1{,}75,\quad \bar{x}_3=2{,}25,\quad \bar{x}_4=2{,}75` },
      { texto: 'Evalúa $f(x)=1/x$ en cada punto medio.',
        formula: String.raw`f(\bar{x}_i)=0{,}8,\quad 0{,}5714,\quad 0{,}4444,\quad 0{,}3636` },
      { texto: 'Suma y multiplica por $\\Delta x$.',
        formula: String.raw`M_4=0{,}5\,(0{,}8+0{,}5714+0{,}4444+0{,}3636)=0{,}5\cdot 2{,}1795\approx 1{,}0898` },
      { texto: 'Valor exacto.',
        formula: String.raw`\int_1^3\frac{1}{x}\,dx=\ln 3\approx 1{,}0986` }
    ],
    resultado: String.raw`$M_4\approx 1{,}0898$ frente a $\ln 3\approx 1{,}0986$ (error $\approx 0{,}0089$). Subestima, porque $f''(x)=2/x^3>0$. El trapecio con $n=4$ daba $1{,}1167$, es decir, un error mayor y por exceso.`
  }
];
