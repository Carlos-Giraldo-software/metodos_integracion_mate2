/* ejemplos.js — Módulo 16: ejemplos resueltos (LaTeX con String.raw) */
window.EJEMPLOS_M16 = [
  {
    titulo: "Discos: giro alrededor del eje $x$",
    enunciado: String.raw`La región bajo $y=\sqrt{x}$, $0\le x\le4$, gira alrededor del eje $x$. Calcula el volumen.`,
    pasos: [
      { texto: "La región toca el eje, así que no hay hueco: $r=0$ y $R=\sqrt{x}$.", formula: String.raw`R(x)=\sqrt{x}` },
      { texto: "Cada disco tiene área $\pi R^2$.", formula: String.raw`V=\pi\int_0^4(\sqrt{x})^2\,dx=\pi\int_0^4x\,dx` },
      { texto: "Integra.", formula: String.raw`V=\pi\Big[\frac{x^2}{2}\Big]_0^4=8\pi` }
    ],
    resultado: String.raw`$V=8\pi\approx25{,}13$. En el visualizador: región 1, eje $y=0$.`
  },
  {
    titulo: "Arandelas",
    enunciado: String.raw`La región entre $y=x$ y $y=x^2$, $0\le x\le1$, gira alrededor del eje $x$.`,
    pasos: [
      { texto: "En $[0,1]$ se cumple $x\ge x^2$. El radio exterior llega a la curva de arriba y el interior a la de abajo.", formula: String.raw`R(x)=x,\qquad r(x)=x^2` },
      { texto: "Aplica la fórmula de arandelas.", formula: String.raw`V=\pi\int_0^1\big(x^2-x^4\big)\,dx=\pi\Big[\frac{x^3}{3}-\frac{x^5}{5}\Big]_0^1` },
      { texto: "Evalúa.", formula: String.raw`V=\pi\Big(\frac13-\frac15\Big)=\frac{2\pi}{15}` }
    ],
    resultado: String.raw`$V=\dfrac{2\pi}{15}\approx0{,}4189$. En el visualizador: región 3, eje $y=0$.`
  },
  {
    titulo: "Eje desplazado",
    enunciado: String.raw`La región bajo $y=x^2$, $0\le x\le1$, gira alrededor de la recta $y=-1$.`,
    pasos: [
      { texto: "El eje queda por debajo de la región ($k=-1\le g=0$): $R=f-k$ y $r=g-k$.", formula: String.raw`R(x)=x^2+1,\qquad r(x)=0+1=1` },
      { texto: "Hay hueco aunque la región toque el eje $x$: el eje de giro está en $y=-1$.", formula: String.raw`V=\pi\int_0^1\Big[(x^2+1)^2-1\Big]dx=\pi\int_0^1\big(x^4+2x^2\big)dx` },
      { texto: "Integra.", formula: String.raw`V=\pi\Big[\frac{x^5}{5}+\frac{2x^3}{3}\Big]_0^1=\pi\Big(\frac15+\frac23\Big)` }
    ],
    resultado: String.raw`$V=\dfrac{13\pi}{15}\approx2{,}7227$. En el visualizador: región 2 con $b=1$ y eje $y=-1$.`
  }
];
