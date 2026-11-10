import { useMemo } from "react";

// Eight drawing units per millimetre. The outer page remains exactly 80 × 25 mm.
export const CompactLabel = ({ data, testId, alignment = { x: 0, y: 0 } }) => {
  const produto = (data.produto?.trim() || "—").toLocaleUpperCase("pt-BR");
  const title = useMemo(() => {
    const context = document.createElement("canvas").getContext("2d");
    context.textAlign = "center";
    context.font = "900 72px Arial";
    let lines = [produto];
    if (context.measureText(produto).width > 852) {
      const middle = Math.ceil(produto.length / 2);
      const space = produto.lastIndexOf(" ", middle);
      const split = space > 0 ? space : middle;
      lines = [produto.slice(0, split).trim(), produto.slice(split).trim()];
    }

    const fontSize = lines.length === 1 ? 144 : 72;
    const lineHeight = fontSize * 1.05;
    context.font = `900 ${fontSize}px Arial`;
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;
    lines.forEach((line, index) => {
      const metrics = context.measureText(line);
      left = Math.min(left, -metrics.actualBoundingBoxLeft);
      right = Math.max(right, metrics.actualBoundingBoxRight);
      top = Math.min(top, index * lineHeight - metrics.actualBoundingBoxAscent);
      bottom = Math.max(bottom, index * lineHeight + metrics.actualBoundingBoxDescent);
    });

    // Fit the visible letters into the full title area without stretching them.
    const scale = Math.min(568 / (right - left), 86 / (bottom - top));
    return {
      lines,
      fontSize,
      lineHeight,
      transform: `translate(320, 47) scale(${scale}) translate(${-(left + right) / 2}, ${-(top + bottom) / 2})`,
    };
  }, [produto]);

  return (
    <svg
      className="compact-label"
      data-testid={testId}
      xmlns="http://www.w3.org/2000/svg"
      width="80mm"
      height="25mm"
      viewBox="0 0 640 200"
      role="img"
      aria-label={`${produto}. Data de produção ${data.producao || "—"}`}
    >
      <g transform={`translate(${alignment.x * 8}, ${alignment.y * 8})`} fill="#000" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" textAnchor="middle">
        <text fontSize={title.fontSize} transform={title.transform}>
          {title.lines.map((line, index) => <tspan key={index} x="0" y={index * title.lineHeight}>{line}</tspan>)}
        </text>
        <rect x="36" y="98" width="568" height="94" fill="none" stroke="#000" strokeWidth="3" />
        <text x="320" y="121" fontSize="24" fontWeight="700">DATA DE PRODUÇÃO</text>
        <text x="320" y="182" fontSize="76">{data.producao || "—"}</text>
      </g>
    </svg>
  );
};
