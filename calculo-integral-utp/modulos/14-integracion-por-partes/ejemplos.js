/* ejemplos.js — Módulo 14: ejemplos resueltos (fórmulas en LaTeX con String.raw) */
window.EJEMPLOS_M14 = [
  {
    titulo: "Polinomio por exponencial",
    enunciado: String.raw`Calcula $\int x\,e^{x}\,dx$ y $\int_0^1 x\,e^{x}\,dx$.`,
    pasos: [
      { texto: "Elige $u=x$ (algebraica) y $dv=e^x\,dx$.", formula: String.raw`du=dx,\qquad v=e^{x}` },
      { texto: "Aplica $\int u\,dv=uv-\int v\,du$.", formula: String.raw`\int xe^x\,dx=xe^x-\int e^x\,dx=xe^x-e^x+C` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\big(xe^x-e^x\big)=e^x+xe^x-e^x=xe^x\ \checkmark` },
      { texto: "Evalúa entre $0$ y $1$.", formula: String.raw`\big[(x-1)e^x\big]_0^1=0-(-1)=1` }
    ],
    resultado: String.raw`$\displaystyle\int xe^x\,dx=(x-1)e^x+C$ y $\displaystyle\int_0^1xe^x\,dx=1$.`
  },
  {
    titulo: "Logaritmo solo",
    enunciado: String.raw`Calcula $\int\ln x\,dx$ y $\int_1^{e}\ln x\,dx$.`,
    pasos: [
      { texto: "Elige $u=\ln x$ y $dv=dx$ (no hay otro factor).", formula: String.raw`du=\frac{dx}{x},\qquad v=x` },
      { texto: "Aplica la fórmula.", formula: String.raw`\int\ln x\,dx=x\ln x-\int x\cdot\frac1x\,dx=x\ln x-x+C` },
      { texto: "Evalúa entre $1$ y $e$.", formula: String.raw`\big[x\ln x-x\big]_1^{e}=(e-e)-(0-1)=1` }
    ],
    resultado: String.raw`$\displaystyle\int\ln x\,dx=x\ln x-x+C$ y $\displaystyle\int_1^{e}\ln x\,dx=1$.`
  },
  {
    titulo: "Dos aplicaciones seguidas",
    enunciado: String.raw`Calcula $\int x^2e^{x}\,dx$.`,
    pasos: [
      { texto: "Primera vez: $u=x^2$, $dv=e^x\,dx$, así que $du=2x\,dx$ y $v=e^x$.", formula: String.raw`\int x^2e^x\,dx=x^2e^x-2\int xe^x\,dx` },
      { texto: "Segunda vez, con el resultado del ejemplo 1.", formula: String.raw`\int xe^x\,dx=(x-1)e^x` },
      { texto: "Sustituye y simplifica.", formula: String.raw`=x^2e^x-2(x-1)e^x+C=(x^2-2x+2)e^x+C` },
      { texto: "Verifica derivando.", formula: String.raw`\frac{d}{dx}\big[(x^2-2x+2)e^x\big]=(2x-2)e^x+(x^2-2x+2)e^x=x^2e^x\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int x^2e^x\,dx=(x^2-2x+2)e^x+C$. Con límites $0$ y $1$ vale $e-2\approx0{,}7183$.`
  },
  {
    titulo: "Caso cíclico",
    enunciado: String.raw`Calcula $I=\int e^{x}\operatorname{sen}x\,dx$.`,
    pasos: [
      { texto: "Primera vez: $u=\operatorname{sen}x$, $dv=e^x\,dx$.", formula: String.raw`I=e^x\operatorname{sen}x-\int e^x\cos x\,dx` },
      { texto: "Segunda vez en la nueva integral: $u=\cos x$, $dv=e^x\,dx$.", formula: String.raw`\int e^x\cos x\,dx=e^x\cos x+\int e^x\operatorname{sen}x\,dx=e^x\cos x+I` },
      { texto: "Sustituye: reaparece $I$.", formula: String.raw`I=e^x\operatorname{sen}x-e^x\cos x-I` },
      { texto: "Despeja $I$.", formula: String.raw`2I=e^x(\operatorname{sen}x-\cos x)\ \Rightarrow\ I=\frac{e^x(\operatorname{sen}x-\cos x)}{2}+C` }
    ],
    resultado: String.raw`$\displaystyle\int e^x\operatorname{sen}x\,dx=\frac{e^x(\operatorname{sen}x-\cos x)}{2}+C$.`
  }
];
