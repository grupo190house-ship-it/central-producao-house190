import { useRef, useLayoutEffect } from "react";

// Renders one label. Content auto-scales to EXACTLY fill the chosen paper size
// (never clips, never leaves empty space). Used identically for preview and print.
export const ThermalLabel = ({ data, size, testId }) => {
  const outerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const content = contentRef.current;
    if (!outer || !content) return;
    const OW = outer.clientWidth;
    const OH = outer.clientHeight;
    if (!OW || !OH) return;

    content.style.transformOrigin = "top left";
    content.style.transform = "none";
    content.style.width = OW + "px";

    // Width and line-wrapping are coupled, so converge on the scale that makes
    // the (reflowed) content fill the label height.
    let natH = content.scrollHeight;
    let s = natH ? OH / natH : 1;
    for (let i = 0; i < 6; i++) {
      content.style.width = OW / s + "px";
      natH = content.scrollHeight;
      if (!natH) break;
      const sNew = OH / natH;
      if (Math.abs(sNew - s) < 0.003) {
        s = sNew;
        break;
      }
      s = sNew;
    }

    // Final consistent pass: measure at the exact width that stays applied and
    // derive the scale from THAT height, without changing the width afterwards.
    // This guarantees height*scale == OH exactly (fills, never clips).
    content.style.width = OW / s + "px";
    natH = content.scrollHeight;
    s = natH ? OH / natH : 1;
    if (!isFinite(s) || s <= 0) s = 1;
    content.style.transform = `scale(${s})`;
  }, [JSON.stringify(data), size.w, size.h]);

  return (
    <div
      ref={outerRef}
      className="thermal-label-outer"
      data-testid={testId}
      style={{ width: `${size.w}mm`, height: `${size.h}mm` }}
    >
      <div ref={contentRef} className="thermal-label">
        <div className="tl-top">
          <div>
            <div className="tl-brand">{data.header}</div>
            <div className="tl-sub">{data.sub}</div>
          </div>
          <div className="tl-peso">{data.peso}</div>
        </div>

        <div className="tl-produto">{data.produto || "—"}</div>

        <div className="tl-dates">
          <div className="tl-date-box">
            <span className="k">Produção</span>
            <span className="v">{data.producao}</span>
          </div>
          <div className="tl-date-box tl-validade">
            <span className="k">Validade</span>
            <span className="v">{data.validade}</span>
          </div>
        </div>

        <div className="tl-details">
          <div className="tl-row">
            <span className="k">Lote</span>
            <span className="v mono">{data.lote}</span>
          </div>
          <div className="tl-row">
            <span className="k">Conservação</span>
            <span className="v">{data.conservacao || "—"}</span>
          </div>
          <div className="tl-row">
            <span className="k">Destino</span>
            <span className="v">{data.destino || "—"}</span>
          </div>
          <div className="tl-row">
            <span className="k">Responsável</span>
            <span className="v">{data.responsavel || "—"}</span>
          </div>
        </div>

        {data.alergicos ? (
          <div className="tl-alergicos">Alérgicos: {data.alergicos}</div>
        ) : null}
      </div>
    </div>
  );
};
