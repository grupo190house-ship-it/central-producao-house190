import { useLayoutEffect, useMemo, useRef } from "react";

// Eight drawing units per millimetre. The outer page remains exactly 80 × 25 mm.
export const CompactLabel = ({ data, testId, alignment = { x: 0, y: 0 } }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const produto = (data.produto || "—").toLocaleUpperCase("pt-BR");
  const lines = useMemo(() => {
    const context = document.createElement("canvas").getContext("2d");
    context.font = "900 72px Arial";
    if (context.measureText(produto).width <= 852) return [produto];

    // Very long names use two lines to preserve a readable font size.
    const middle = Math.ceil(produto.length / 2);
    const space = produto.lastIndexOf(" ", middle);
    const split = space > 0 ? space : middle;
    return [produto.slice(0, split).trim(), produto.slice(split).trim()];
  }, [produto]);

  useLayoutEffect(() => {
    const title = titleRef.current;
    const content = contentRef.current;
    const maxFontSize = lines.length === 1 ? 72 : 36;
    title.setAttribute("font-size", String(maxFontSize));
    const width = Math.max(...Array.from(title.children, (line) => line.getComputedTextLength()));
    // Keep text within the central 72 mm, including accented glyphs.
    title.setAttribute("font-size", String(maxFontSize * Math.min(1, 568 / width)));

    const bounds = content.getBBox();
    const offsetY = 100 - (bounds.y + bounds.height / 2);
    content.setAttribute("transform", `translate(${alignment.x * 8}, ${offsetY + alignment.y * 8})`);
  }, [lines, data.producao, alignment.x, alignment.y]);

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
      <g ref={contentRef} fill="#000" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" textAnchor="middle">
        <text ref={titleRef} fontSize="72">
          {lines.map((line, index) => <tspan key={index} x="320" y={74 - (lines.length - 1 - index) * 38}>{line}</tspan>)}
        </text>
        <rect x="112" y="92" width="416" height="80" fill="none" stroke="#000" strokeWidth="3" />
        <text x="320" y="120" fontSize="23" fontWeight="700">DATA DE PRODUÇÃO</text>
        <text x="320" y="158" fontSize="50">{data.producao || "—"}</text>
      </g>
    </svg>
  );
};
