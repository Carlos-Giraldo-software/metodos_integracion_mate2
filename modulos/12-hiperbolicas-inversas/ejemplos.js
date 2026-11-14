/* ejemplos.js — Módulo 12: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M12 = [
  {
    titulo: "Arcoseno hiperbólico",
    enunciado: String.raw`Calcula $\int_0^4\frac{dx}{\sqrt{x^2+9}}$.`,
    pasos: [
      { texto: "Identifica $a=3$.", formula: String.raw`\int\frac{dx}{\sqrt{x^2+9}}=\operatorname{arcsenh}\frac{x}{3}+C=\ln\!\big(x+\sqrt{x^2+9}\big)+C'` },
      { texto: "Evalúa con la forma logarítmica. En $x=4$: $\sqrt{16+9}=5$; en $x=0$: $\sqrt9=3$.", formula: String.raw`\ln(4+5)-\ln(0+3)=\ln9-\ln3=\ln3` },
      { texto: "Comprueba con la otra forma.", formula: String.raw`\operatorname{arcsenh}\frac43-\operatorname{arcsenh}0=\ln\frac{4/3+5/3}{1}=\ln3\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int_0^4\frac{dx}{\sqrt{x^2+9}}=\ln3\approx1{,}0986$.`
  },
  {
    titulo: "Arcocoseno hiperbólico",
    enunciado: String.raw`Calcula $\int_{5/2}^{17/4}\frac{dx}{\sqrt{x^2-4}}$.`,
    pasos: [
      { texto: "Identifica $a=2$ y $x>2$ en el intervalo.", formula: String.raw`\int\frac{dx}{\sqrt{x^2-4}}=\ln\!\big(x+\sqrt{x^2-4}\big)+C` },
      { texto: "En $x=\frac52$: $\sqrt{\frac{25}{4}-4}=\frac32$. En $x=\frac{17}{4}$: $\sqrt{\frac{289}{16}-4}=\frac{15}{4}$.", formula: String.raw`\ln\Big(\frac{17}{4}+\frac{15}{4}\Big)-\ln\Big(\frac52+\frac32\Big)=\ln8-\ln4` },
      { texto: "Simplifica.", formula: String.raw`=\ln2` }
    ],
    resultado: String.raw`$\displaystyle\int_{5/2}^{17/4}\frac{dx}{\sqrt{x^2-4}}=\ln2\approx0{,}6931$.`
  },
  {
    titulo: "Arcotangente hiperbólica",
    enunciado: String.raw`Calcula $\int_0^{1/2}\frac{dx}{1-x^2}$.`,
    pasos: [
      { texto: "Aquí $a=1$ y $|x|<1$ en todo el intervalo.", formula: String.raw`\int\frac{dx}{1-x^2}=\operatorname{arctanh}x+C=\frac12\ln\frac{1+x}{1-x}+C` },
      { texto: "Evalúa en $x=\frac12$ y $x=0$.", formula: String.raw`\frac12\ln\frac{3/2}{1/2}-\frac12\ln1=\frac12\ln3` }
    ],
    resultado: String.raw`$\displaystyle\int_0^{1/2}\frac{dx}{1-x^2}=\tfrac12\ln3\approx0{,}5493$.`
  }
];
