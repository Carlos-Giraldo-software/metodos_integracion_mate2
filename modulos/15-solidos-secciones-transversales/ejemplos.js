/* ejemplos.js — Módulo 15: ejemplos resueltos (LaTeX con String.raw) */
window.EJEMPLOS_M15 = [
  {
    titulo: "Secciones cuadradas",
    enunciado: String.raw`La base es la región bajo $y=\sqrt{x}$ para $0\le x\le4$. Cada sección perpendicular al eje $x$ es un cuadrado. Calcula el volumen.`,
    pasos: [
      { texto: "El lado del cuadrado es la altura de la región en $x$ (aquí $g(x)=0$).", formula: String.raw`s(x)=\sqrt{x}-0=\sqrt{x}` },
      { texto: "Área de la sección.", formula: String.raw`A(x)=s^2=x` },
      { texto: "Integra entre $0$ y $4$.", formula: String.raw`V=\int_0^4x\,dx=\Big[\frac{x^2}{2}\Big]_0^4=8` }
    ],
    resultado: String.raw`$V=8$ unidades cúbicas. En el visualizador: región 1, forma cuadrado, $a=0$, $b=4$.`
  },
  {
    titulo: "Secciones semicirculares",
    enunciado: String.raw`La base está entre $y=x$ y $y=x^2$, con $0\le x\le1$. Cada sección perpendicular al eje $x$ es un semicírculo cuyo diámetro es el segmento entre las curvas.`,
    pasos: [
      { texto: "El diámetro es $s=x-x^2$ (la curva de arriba menos la de abajo).", formula: String.raw`s(x)=x-x^2` },
      { texto: "Un semicírculo de diámetro $s$ tiene radio $s/2$ y área $\frac12\pi\big(\frac s2\big)^2$.", formula: String.raw`A(x)=\frac{\pi}{8}\,(x-x^2)^2` },
      { texto: "Desarrolla el cuadrado e integra.", formula: String.raw`V=\frac{\pi}{8}\int_0^1\big(x^2-2x^3+x^4\big)dx=\frac{\pi}{8}\Big(\frac13-\frac12+\frac15\Big)=\frac{\pi}{8}\cdot\frac{1}{30}` }
    ],
    resultado: String.raw`$V=\dfrac{\pi}{240}\approx0{,}0131$. En el visualizador: región 3, forma semicírculo.`
  },
  {
    titulo: "Secciones triangulares",
    enunciado: String.raw`La base es la región bajo $y=4-x^2$ para $-2\le x\le2$. Cada sección perpendicular al eje $x$ es un triángulo equilátero.`,
    pasos: [
      { texto: "Lado del triángulo.", formula: String.raw`s(x)=4-x^2` },
      { texto: "Área de un equilátero de lado $s$.", formula: String.raw`A(x)=\frac{\sqrt3}{4}\,(4-x^2)^2=\frac{\sqrt3}{4}\big(16-8x^2+x^4\big)` },
      { texto: "Integra; la función es par, así que se puede duplicar el tramo de $0$ a $2$.", formula: String.raw`V=\frac{\sqrt3}{4}\cdot2\int_0^2\big(16-8x^2+x^4\big)dx=\frac{\sqrt3}{2}\Big[16x-\frac{8x^3}{3}+\frac{x^5}{5}\Big]_0^2` },
      { texto: "Evalúa.", formula: String.raw`=\frac{\sqrt3}{2}\Big(32-\frac{64}{3}+\frac{32}{5}\Big)=\frac{\sqrt3}{2}\cdot\frac{256}{15}` }
    ],
    resultado: String.raw`$V=\dfrac{128\sqrt3}{15}\approx14{,}780$. En el visualizador: región 6, forma triángulo equilátero.`
  }
];
