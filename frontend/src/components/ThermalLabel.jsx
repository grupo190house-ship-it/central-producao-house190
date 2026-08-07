// Renders one thermal label. Used identically for preview and print.
export const ThermalLabel = ({ data, size, testId }) => {
  return (
    <div
      className={`thermal-label thermal-label--h${size.h}`}
      data-testid={testId}
      style={{ width: `${size.w}mm`, height: `${size.h}mm` }}
    >
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
  );
};
