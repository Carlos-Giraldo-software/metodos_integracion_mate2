/* ejemplos.js — Módulo 7: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M7 = [
  {
    titulo: "Potencia generalizada",
    enunciado: String.raw`Calcula $\int 2x\,(x^2+1)^3\,dx$.`,
    pasos: [
      { texto: "Elige $u$ como la expresión interior.", formula: String.raw`u=x^2+1` },
      { texto: "Calcula $du$; coincide con el factor $2x\,dx$.", formula: String.raw`du=2x\,dx` },
      { texto: "Reescribe en $u$ e integra.", formula: String.raw`\int u^3\,du=\frac{u^4}{4}+C` },
      { texto: "Vuelve a $x$.", formula: String.raw`=\frac{(x^2+1)^4}{4}+C` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\frac{(x^2+1)^4}{4}=(x^2+1)^3\cdot 2x\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int 2x(x^2+1)^3\,dx=\frac{(x^2+1)^4}{4}+C$`
  },
  {
    titulo: "Integral definida con cambio de límites",
    enunciado: String.raw`Calcula $\int_0^1 x\cos(x^2)\,dx$.`,
    pasos: [
      { texto: "Elige $u=x^2$, de modo que $du=2x\,dx$ y $x\,dx=\frac{du}{2}$.", formula: String.raw`u=x^2,\qquad x\,dx=\tfrac12\,du` },
      { texto: "Cambia los límites: si $x=0$, $u=0$; si $x=1$, $u=1$.", formula: String.raw`\int_0^1 x\cos(x^2)\,dx=\frac12\int_0^1\cos u\,du` },
      { texto: "Integra y evalúa en $u$.", formula: String.raw`=\frac12\Big[\operatorname{sen}u\Big]_0^1=\frac12\operatorname{sen}(1)` },
      { texto: "Valor numérico.", formula: String.raw`\tfrac12(0{,}84147)\approx 0{,}42074` }
    ],
    resultado: String.raw`$\displaystyle\int_0^1 x\cos(x^2)\,dx=\tfrac12\operatorname{sen}(1)\approx 0{,}4207$. Elige esta integral en el visualizador y compara.`
  },
  {
    titulo: "Potencia de un binomio",
    enunciado: String.raw`Calcula $\int (3x+1)^5\,dx$.`,
    pasos: [
      { texto: "Elige $u=3x+1$; entonces $du=3\,dx$, es decir, $dx=\frac{du}{3}$.", formula: String.raw`\int(3x+1)^5\,dx=\frac13\int u^5\,du` },
      { texto: "Aplica la regla de la potencia.", formula: String.raw`=\frac13\cdot\frac{u^6}{6}+C=\frac{u^6}{18}+C` },
      { texto: "Vuelve a $x$.", formula: String.raw`=\frac{(3x+1)^6}{18}+C` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\frac{(3x+1)^6}{18}=\frac{6(3x+1)^5\cdot 3}{18}=(3x+1)^5\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int(3x+1)^5\,dx=\frac{(3x+1)^6}{18}+C$`
  }
];
