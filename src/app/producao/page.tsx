import { PageHeader } from "@/components/page-header";
import { ProductionBoard } from "@/components/production-board";

export const metadata = { title: "Produção" };

export default function ProducaoPage() {
  return <><PageHeader eyebrow="Ordens" title="Controle de produção" description="Planeje, acompanhe e conclua cada item produzido pela central." /><ProductionBoard /></>;
}
