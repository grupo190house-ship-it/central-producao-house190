import { PageHeader } from "@/components/page-header";
import { LabelDesigner } from "@/components/label-designer";

export const metadata = { title: "Etiquetas" };

export default function EtiquetasPage() {
  return <><PageHeader eyebrow="Identificação e rastreabilidade" title="Gerar etiqueta de validade" description="A validade e o lote são calculados a partir da ficha cadastrada do produto." /><LabelDesigner /></>;
}
