/* ejemplos.js — Módulo 17: ejemplos resueltos (LaTeX con String.raw) */
window.EJEMPLOS_M17 = [
  {
    titulo: "Capas alrededor del eje $y$",
    enunciado: String.raw`La región bajo $y=x^2$, $0\le x\le1$, gira alrededor del eje $y$.`,
    pasos: [
      { texto: "El eje $y$ es $x=0$, así que el radio de la capa es $\rho=x$ y la altura es $h=x^2$.", formula: String.raw`\rho(x)=x,\qquad h(x)=x^2` },
      { texto: "Aplica la fórmula de capas.", formula: String.raw`V=2\pi\int_0^1x\cdot x^2\,dx=2\pi\int_0^1x^3\,dx` },
      { texto: "Integra.", formula: String.raw`V=2\pi\Big[\frac{x^4}{4}\Big]_0^1=\frac{\pi}{2}` },
      { texto: "Comprobación con arandelas (respecto a $y$): $x=\sqrt{y}$, $R=1$, $r=\sqrt{y}$.", formula: String.raw`V=\pi\int_0^1\big(1-y\big)\,dy=\pi\Big[y-\frac{y^2}{2}\Big]_0^1=\frac{\pi}{2}\ \checkmark` }
    ],
    resultado: String.raw`$V=\dfrac{\pi}{2}\approx1{,}5708$. En el visualizador: región 2 con $b=1$ y eje $x=0$.`
  },
  {
    titulo: "Región entre dos curvas",
    enunciado: String.raw`La región entre $y=\sqrt{x}$ y $y=x^2$, $0\le x\le1$, gira alrededor del eje $y$.`,
    pasos: [
      { texto: "Radio y altura de la capa.", formula: String.raw`\rho(x)=x,\qquad h(x)=\sqrt{x}-x^2` },
      { texto: "Aplica la fórmula y reparte $x$.", formula: String.raw`V=2\pi\int_0^1x\big(\sqrt{x}-x^2\big)dx=2\pi\int_0^1\big(x^{3/2}-x^3\big)dx` },
      { texto: "Integra.", formula: String.raw`V=2\pi\Big[\frac{2}{5}x^{5/2}-\frac{x^4}{4}\Big]_0^1=2\pi\Big(\frac25-\frac14\Big)=2\pi\cdot\frac{3}{20}` }
    ],
    resultado: String.raw`$V=\dfrac{3\pi}{10}\approx0{,}9425$. En el visualizador: región 4 con eje $x=0$.`
  },
  {
    titulo: "Eje desplazado",
    enunciado: String.raw`La región bajo $y=x^2$, $0\le x\le1$, gira alrededor de la recta $x=-1$.`,
    pasos: [
      { texto: "El eje está a la izquierda de la región ($h=-1\le a=0$), así que $\rho=x-(-1)=x+1$.", formula: String.raw`\rho(x)=x+1,\qquad h(x)=x^2` },
      { texto: "Aplica la fórmula.", formula: String.raw`V=2\pi\int_0^1(x+1)\,x^2\,dx=2\pi\int_0^1\big(x^3+x^2\big)dx` },
      { texto: "Integra.", formula: String.raw`V=2\pi\Big[\frac{x^4}{4}+\frac{x^3}{3}\Big]_0^1=2\pi\Big(\frac14+\frac13\Big)=2\pi\cdot\frac{7}{12}` }
    ],
    resultado: String.raw`$V=\dfrac{7\pi}{6}\approx3{,}6652$. En el visualizador: región 2 con $b=1$ y eje $x=-1$.`
  }
];
