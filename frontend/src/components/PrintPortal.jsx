import { createPortal } from "react-dom";
import { ThermalLabel } from "@/components/ThermalLabel";
import { CompactLabel } from "@/components/CompactLabel";

// Portals the print labels directly under <body> so @media print can isolate them.
export const PrintPortal = ({ labels, size, alignment }) => {
  return createPortal(
    <div id="print-root">
      {labels.map((data, i) => (
        <div className="label-page" key={i}>
          {size.compact ? <CompactLabel data={data} alignment={alignment} /> : <ThermalLabel data={data} size={size} />}
        </div>
      ))}
    </div>,
    document.body
  );
};
