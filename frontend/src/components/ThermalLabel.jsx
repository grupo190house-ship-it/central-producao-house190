import { useRef, useLayoutEffect } from "react";

// Renders one label. Content auto-scales to EXACTLY fill the chosen paper size
// (never clips, never leaves empty space). Used identically for preview and print.
export const ThermalLabel = ({ data, size, testId }) => {
  const outerRef = useRef(null);
  const contentRef = useRef(null);
  const compactTitleRef = useRef(null);
  const contentKey = JSON.stringify(data);

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

    if (size.compact) {
      const title = compactTitleRef.current;
      title.style.removeProperty("font-size");

      // Fit long names before shrinking the entire label, so the date stays legible.
      if (content.scrollHeight > OH) {
        let min = 12;
        let max = parseInt(getComputedStyle(title).fontSize, 10);
        while (min < max) {
          const candidate = Math.ceil((min + max) / 2);
          title.style.fontSize = `${candidate}px`;
          if (content.scrollHeight > OH) {
            max = candidate - 1;
          } else {
            min = candidate;
          }
        }
        title.style.fontSize = `${min}px`;
      }

      const scale = Math.min(1, OH / content.scrollHeight);
      content.style.transformOrigin = "top center";
      content.style.transform = `scale(${scale})`;
      return;
    }

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
  }, [contentKey, size.w, size.h, size.compact]);

  return (
    <div
      ref={outerRef}
      className="thermal-label-outer"
      data-testid={testId}
      style={{ width: `${size.w}mm`, height: `${size.h}mm` }}
    >
      <div ref={contentRef} className={size.compact ? "thermal-label tl-compact" : "thermal-label"}>
        {size.compact ? (
          <>
            <div ref={compactTitleRef} className="tl-produto">{data.produto || "—"}</div>
            <div className="tl-date-box tl-compact-date">
              <span className="k">Data de produção</span>
              <span className="v">{data.producao || "—"}</span>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
