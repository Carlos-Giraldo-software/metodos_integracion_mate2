/* ==========================================================================
   ejemplos.js — Módulo 5: ejemplos resueltos
   1) Teorema Fundamental del Cálculo   2) Integral con signo frente a área
   3) Área entre curvas
   ========================================================================== */
window.EJEMPLOS_M5 = [
  {
    titulo: 'Teorema Fundamental del Cálculo',
    enunciado: String.raw`Calcula $\int_1^3 (3x^2-2x)\,dx$.`,
    pasos: [
      { texto: 'Encuentra una antiderivada de $f(x)=3x^2-2x$ con la regla de la potencia.',
        formula: String.raw`F(x)=x^3-x^2` },
      { texto: "Comprueba derivando que $F'(x)=f(x)$.",
        formula: String.raw`F'(x)=3x^2-2x=f(x)\ \checkmark` },
      { texto: 'Aplica $\\int_a^b f(x)\\,dx=F(b)-F(a)$.',
        formula: String.raw`\int_1^3(3x^2-2x)\,dx=\Big[x^3-x^2\Big]_1^3=(27-9)-(1-1)` },
      { texto: 'Simplifica.',
        formula: String.raw`=18-0=18` }
    ],
    resultado: String.raw`$\displaystyle\int_1^3(3x^2-2x)\,dx=18$. En el visualizador (modo "bajo la curva") puedes comprobar el mismo mecanismo con $x^2$ y con $x^3$: el resultado sale de restar $H(b)-H(a)$.`
  },
  {
    titulo: 'Integral con signo frente a área',
    enunciado: String.raw`Para $f(x)=\operatorname{sen}(x)$ en $[0,2\pi]$, calcula la integral y el área encerrada con el eje $x$.`,
    pasos: [
      { texto: 'Antiderivada de $\\operatorname{sen}(x)$.',
        formula: String.raw`F(x)=-\cos x` },
      { texto: 'Integral definida en todo el intervalo.',
        formula: String.raw`\int_0^{2\pi}\operatorname{sen}(x)\,dx=\big[-\cos x\big]_0^{2\pi}=(-1)-(-1)=0` },
      { texto: 'La integral da $0$ porque la parte positiva ($0\\le x\\le\\pi$) cancela a la negativa ($\\pi\\le x\\le 2\\pi$). Para el área, separa en el cambio de signo, $x=\\pi$.',
        formula: String.raw`\int_0^{\pi}\operatorname{sen}(x)\,dx=\big[-\cos x\big]_0^{\pi}=1-(-1)=2` },
      { texto: 'En el segundo tramo el resultado es negativo, y para el área se toma su valor absoluto.',
        formula: String.raw`\int_{\pi}^{2\pi}\operatorname{sen}(x)\,dx=\big[-\cos x\big]_{\pi}^{2\pi}=-1-1=-2\ \Rightarrow\ \left|-2\right|=2` },
      { texto: 'Suma de las áreas de los dos tramos.',
        formula: String.raw`\text{Área}=2+2=4` }
    ],
    resultado: String.raw`Integral $=0$, pero área $=4$. Para verlo, elige $f(x)=\operatorname{sen}(x)$ y lleva $a$ a $0$ y $b$ a $6{,}28$: el resultado con signo es prácticamente $0$ y el área total, $4$.`
  },
  {
    titulo: 'Área entre curvas: $y=\\sqrt{x}$ y $y=x^2$',
    enunciado: String.raw`Calcula el área de la región encerrada entre $y=\sqrt{x}$ y $y=x^2$.`,
    pasos: [
      { texto: 'Halla los puntos de corte igualando las funciones.',
        formula: String.raw`\sqrt{x}=x^2\ \Rightarrow\ x=x^4\ \Rightarrow\ x(x^3-1)=0\ \Rightarrow\ x=0\ \text{ o }\ x=1` },
      { texto: 'Decide cuál curva está arriba: en $x=0{,}25$ se tiene $\\sqrt{0{,}25}=0{,}5$ y $0{,}25^2=0{,}0625$. Entonces $\\sqrt{x}\\ge x^2$ en $[0,1]$.',
        formula: String.raw`A=\int_0^1\big(\sqrt{x}-x^2\big)\,dx` },
      { texto: 'Antiderivada de la diferencia.',
        formula: String.raw`\int\big(x^{1/2}-x^2\big)\,dx=\frac{2}{3}x^{3/2}-\frac{x^3}{3}` },
      { texto: 'Evalúa entre $0$ y $1$.',
        formula: String.raw`A=\left[\frac{2}{3}x^{3/2}-\frac{x^3}{3}\right]_0^1=\left(\frac{2}{3}-\frac{1}{3}\right)-0=\frac{1}{3}` }
    ],
    resultado: String.raw`$A=\dfrac{1}{3}\approx 0{,}3333$. Pulsa "Cargar ejemplo" en el visualizador: el área total numérica coincide con este valor.`
  }
];
