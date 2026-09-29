/* ==========================================================================
   ejemplos.js — Módulo 6: ejemplos de integración directa
   Cada ejemplo termina verificando el resultado por derivación.
   ========================================================================== */
window.EJEMPLOS_M6 = [
  {
    titulo: 'Polinomio',
    enunciado: String.raw`Calcula $\int (3x^2-4x+5)\,dx$.`,
    pasos: [
      { texto: 'Separa la integral en cada término y saca las constantes.',
        formula: String.raw`\int(3x^2-4x+5)\,dx=3\int x^2\,dx-4\int x\,dx+5\int 1\,dx` },
      { texto: 'Aplica $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}$ a cada término.',
        formula: String.raw`=3\cdot\frac{x^3}{3}-4\cdot\frac{x^2}{2}+5x+C` },
      { texto: 'Simplifica.',
        formula: String.raw`=x^3-2x^2+5x+C` },
      { texto: 'Verifica derivando.',
        formula: String.raw`\frac{d}{dx}\big(x^3-2x^2+5x+C\big)=3x^2-4x+5\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int(3x^2-4x+5)\,dx=x^3-2x^2+5x+C$`
  },
  {
    titulo: 'Raíz y logaritmo',
    enunciado: String.raw`Calcula $\int\left(\sqrt{x}+\dfrac{3}{x}\right)dx$, con $x>0$.`,
    pasos: [
      { texto: 'Reescribe la raíz como potencia y separa.',
        formula: String.raw`\int\left(x^{1/2}+\frac{3}{x}\right)dx=\int x^{1/2}\,dx+3\int\frac{1}{x}\,dx` },
      { texto: 'Regla de la potencia con $n=\\tfrac12$, y la fórmula $\\int\\frac1x\\,dx=\\ln|x|$.',
        formula: String.raw`=\frac{x^{3/2}}{3/2}+3\ln|x|+C=\frac{2}{3}x^{3/2}+3\ln|x|+C` },
      { texto: 'Verifica derivando.',
        formula: String.raw`\frac{d}{dx}\left(\frac{2}{3}x^{3/2}+3\ln|x|\right)=\frac{2}{3}\cdot\frac{3}{2}x^{1/2}+\frac{3}{x}=\sqrt{x}+\frac{3}{x}\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int\left(\sqrt{x}+\frac{3}{x}\right)dx=\frac{2}{3}x^{3/2}+3\ln|x|+C$`
  },
  {
    titulo: 'Trigonométricas y exponencial',
    enunciado: String.raw`Calcula $\int\big(2\operatorname{sen}(x)-5\cos(x)+e^x\big)\,dx$.`,
    pasos: [
      { texto: 'Separa en tres integrales.',
        formula: String.raw`=2\int\operatorname{sen}(x)\,dx-5\int\cos(x)\,dx+\int e^x\,dx` },
      { texto: 'Usa $\\int\\operatorname{sen}(x)\\,dx=-\\cos(x)$, $\\int\\cos(x)\\,dx=\\operatorname{sen}(x)$ y $\\int e^x\\,dx=e^x$.',
        formula: String.raw`=2\big(-\cos x\big)-5\operatorname{sen}(x)+e^x+C` },
      { texto: 'Simplifica.',
        formula: String.raw`=-2\cos x-5\operatorname{sen}x+e^x+C` },
      { texto: 'Verifica derivando.',
        formula: String.raw`\frac{d}{dx}\big(-2\cos x-5\operatorname{sen}x+e^x\big)=2\operatorname{sen}x-5\cos x+e^x\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int\big(2\operatorname{sen}x-5\cos x+e^x\big)dx=-2\cos x-5\operatorname{sen}x+e^x+C$`
  },
  {
    titulo: 'Reescribir antes de integrar',
    enunciado: String.raw`Calcula $\displaystyle\int\frac{x^2-1}{\sqrt{x}}\,dx$, con $x>0$.`,
    pasos: [
      { texto: 'No hay una fórmula directa para el cociente, así que divide cada término entre $\\sqrt{x}=x^{1/2}$ usando las propiedades de las potencias.',
        formula: String.raw`\frac{x^2-1}{x^{1/2}}=x^{2-1/2}-x^{-1/2}=x^{3/2}-x^{-1/2}` },
      { texto: 'Integra término a término con la regla de la potencia.',
        formula: String.raw`\int\big(x^{3/2}-x^{-1/2}\big)dx=\frac{x^{5/2}}{5/2}-\frac{x^{1/2}}{1/2}+C` },
      { texto: 'Simplifica las fracciones.',
        formula: String.raw`=\frac{2}{5}x^{5/2}-2x^{1/2}+C` },
      { texto: 'Verifica derivando.',
        formula: String.raw`\frac{d}{dx}\left(\frac{2}{5}x^{5/2}-2x^{1/2}\right)=x^{3/2}-x^{-1/2}=\frac{x^2-1}{\sqrt{x}}\ \checkmark` }
    ],
    resultado: String.raw`$\displaystyle\int\frac{x^2-1}{\sqrt{x}}\,dx=\frac{2}{5}x^{5/2}-2\sqrt{x}+C$`
  }
];
