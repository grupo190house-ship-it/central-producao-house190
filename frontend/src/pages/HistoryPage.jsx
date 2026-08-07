import { useState } from "react";
import { getHistory, clearHistory } from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, History as HistoryIcon } from "lucide-react";
import { toast } from "sonner";

export default function HistoryPage() {
  const [records, setRecords] = useState(() => getHistory());

  const onClear = () => {
    clearHistory();
    setRecords([]);
    toast.success("Histórico limpo.");
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-800 flex items-center gap-2">
          <HistoryIcon className="w-5 h-5" /> Histórico de Impressões
          <span className="text-sm font-normal text-zinc-500">({records.length})</span>
        </h2>
        <Button data-testid="clear-history-button" variant="outline" onClick={onClear} disabled={records.length === 0}>
          <Trash2 className="w-4 h-4 mr-2" /> Limpar
        </Button>
      </div>

      {records.length === 0 ? (
        <p className="text-sm text-zinc-500 py-8 text-center">Nenhuma impressão registrada ainda.</p>
      ) : (
        <Table data-testid="history-table">
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Resp.</TableHead>
              <TableHead className="text-center">Qtd</TableHead>
              <TableHead>Tam.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="text-zinc-500 whitespace-nowrap">
                  {new Date(r.timestamp).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="font-medium">{r.produto}</TableCell>
                <TableCell className="font-mono text-xs">{r.lote}</TableCell>
                <TableCell>{r.validade}</TableCell>
                <TableCell className="text-zinc-600">{r.destino}</TableCell>
                <TableCell className="text-zinc-600">{r.responsavel}</TableCell>
                <TableCell className="text-center">{r.qty}</TableCell>
                <TableCell className="text-zinc-500">{r.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
