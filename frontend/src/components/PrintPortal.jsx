import { createPortal } from "react-dom";
import { ThermalLabel } from "@/components/ThermalLabel";

// Portals the print labels directly under <body> so @media print can isolate them.
export const PrintPortal = ({ labels, size }) => {
  return createPortal(
    <div id="print-root">
      {labels.map((data, i) => (
        <div className="label-page" key={i}>
          <ThermalLabel data={data} size={size} />
        </div>
      ))}
    </div>,
    document.body
  );
};
