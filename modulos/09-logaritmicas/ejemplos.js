/* ejemplos.js — Módulo 9: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M9 = [
  {
    titulo: "Denominador lineal",
    enunciado: String.raw`Calcula $\int\frac{1}{3x-2}\,dx$ y $\int_1^2\frac{1}{3x-2}\,dx$.`,
    pasos: [
      { texto: "Elige $u=3x-2$; entonces $du=3\,dx$.", formula: String.raw`\int\frac{1}{3x-2}\,dx=\frac13\int\frac{du}{u}=\frac13\ln|3x-2|+C` },
      { texto: "Comprueba que $3x-2\ne0$ en $[1,2]$: se anula en $x=\frac23$, fuera del intervalo.", formula: String.raw`3x-2\ge 1>0\ \text{ en }[1,2]` },
      { texto: "Evalúa.", formula: String.raw`\int_1^2\frac{dx}{3x-2}=\frac13\big[\ln|3x-2|\big]_1^2=\frac13(\ln 4-\ln 1)=\frac{\ln 4}{3}` },
      { texto: "Valor numérico.", formula: String.raw`\frac{1{,}38629}{3}\approx 0{,}4621` }
    ],
    resultado: String.raw`$\displaystyle\int\frac{dx}{3x-2}=\tfrac13\ln|3x-2|+C$ y $\displaystyle\int_1^2\frac{dx}{3x-2}\approx 0{,}4621$.`
  },
  {
    titulo: "Forma f′/f",
    enunciado: String.raw`Calcula $\int\frac{2x}{x^2+1}\,dx$ y $\int_0^1\frac{2x}{x^2+1}\,dx$.`,
    pasos: [
      { texto: "El numerador es exactamente la derivada del denominador. Elige $u=x^2+1$, $du=2x\,dx$.", formula: String.raw`\int\frac{2x}{x^2+1}\,dx=\int\frac{du}{u}=\ln|u|+C` },
      { texto: "Vuelve a $x$ ($x^2+1>0$, no hace falta el valor absoluto).", formula: String.raw`=\ln(x^2+1)+C` },
      { texto: "Evalúa entre $0$ y $1$.", formula: String.raw`\int_0^1\frac{2x}{x^2+1}\,dx=\ln 2-\ln 1=\ln 2\approx 0{,}6931` }
    ],
    resultado: String.raw`$\displaystyle\int\frac{2x}{x^2+1}dx=\ln(x^2+1)+C$.`
  },
  {
    titulo: "Tangente",
    enunciado: String.raw`Calcula $\int\tan x\,dx$ y $\int_0^1\tan x\,dx$.`,
    pasos: [
      { texto: "Escribe $\tan x=\frac{\operatorname{sen}x}{\cos x}$ y elige $u=\cos x$, $du=-\operatorname{sen}x\,dx$.", formula: String.raw`\int\tan x\,dx=-\int\frac{du}{u}=-\ln|\cos x|+C` },
      { texto: "Evalúa entre $0$ y $1$ (el coseno no se anula allí).", formula: String.raw`\int_0^1\tan x\,dx=-\ln(\cos 1)+\ln(\cos 0)=-\ln(0{,}54030)` },
      { texto: "Valor numérico.", formula: String.raw`\approx 0{,}6156` }
    ],
    resultado: String.raw`$\displaystyle\int\tan x\,dx=-\ln|\cos x|+C=\ln|\sec x|+C$.`
  }
];
