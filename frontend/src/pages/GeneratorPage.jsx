import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  getDestinos,
  getResponsaveis,
  addHistory,
  uid,
} from "@/lib/storage";
import { SIZES, getSize, todayISO, buildLabelData } from "@/lib/labelUtils";
import { ThermalLabel } from "@/components/ThermalLabel";
import { PrintPortal } from "@/components/PrintPortal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Printer, PlusCircle, Trash2, ListPlus, Layers } from "lucide-react";

export default function GeneratorPage() {
  const products = useMemo(() => getProducts(), []);
  const destinos = useMemo(() => getDestinos(), []);
  const responsaveis = useMemo(() => getResponsaveis(), []);

  const [sizeKey, setSizeKey] = useState("80x50");
  const size = getSize(sizeKey);

  const [productId, setProductId] = useState(products[0]?.id || "");
  const [produto, setProduto] = useState(products[0]?.name || "");
  const [peso, setPeso] = useState(products[0]?.weight || "");
  const [conservacao, setConservacao] = useState(products[0]?.conservacao || "");
  const [alergicos, setAlergicos] = useState(products[0]?.alergicos || "");
  const [shelfLifeDays, setShelfLifeDays] = useState(products[0]?.shelfLifeDays ?? 5);

  const [producaoDate, setProducaoDate] = useState(todayISO());
  const [destino, setDestino] = useState(destinos[0]?.name || "");
  const [responsavel, setResponsavel] = useState(responsaveis[0]?.name || "");
  const [qty, setQty] = useState(1);

  const [queue, setQueue] = useState([]);
  const [printLabels, setPrintLabels] = useState(null);

  // Keep the @page size in sync with the selected paper for exact thermal output
  useEffect(() => {
    const id = "print-page-size";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `@page { size: ${size.w}mm ${size.h}mm; margin: 0; }`;
  }, [size.w, size.h]);

  const onSelectProduct = (id) => {
    const p = products.find((x) => x.id === id);
    setProductId(id);
    if (p) {
      setProduto(p.name);
      setPeso(p.weight);
      setConservacao(p.conservacao);
      setAlergicos(p.alergicos);
      setShelfLifeDays(p.shelfLifeDays);
    }
  };

  const currentItem = {
    id: productId,
    produto,
    peso,
    conservacao,
    alergicos,
    shelfLifeDays,
    producaoDate,
    destino,
    responsavel,
    qty: Number(qty) || 1,
  };

  const previewData = buildLabelData(currentItem);

  const expand = (items) => {
    const out = [];
    items.forEach((it) => {
      const data = buildLabelData(it);
      for (let i = 0; i < (Number(it.qty) || 1); i++) out.push(data);
    });
    return out;
  };

  const runPrint = (items, label) => {
    if (items.length === 0) {
      toast.error("Nada para imprimir.");
      return;
    }
    const labels = expand(items);
    setPrintLabels(labels);
    // history
    addHistory(
      items.map((it) => {
        const d = buildLabelData(it);
        return {
          id: uid(),
          produto: d.produto,
          peso: d.peso,
          destino: d.destino,
          responsavel: d.responsavel,
          qty: Number(it.qty) || 1,
          lote: d.lote,
          producao: d.producao,
          validade: d.validade,
          size: size.key,
          timestamp: new Date().toISOString(),
        };
      })
    );
    setTimeout(() => {
      window.print();
      toast.success(`${labels.length} etiqueta(s) enviada(s) — ${label}`);
    }, 120);
  };

  const addToQueue = () => {
    setQueue((q) => [...q, { ...currentItem, qid: uid() }]);
    toast.success("Adicionado à fila de lote.");
  };

  const removeFromQueue = (qid) => {
    setQueue((q) => q.filter((i) => i.qid !== qid));
  };

  const queueTotal = queue.reduce((a, b) => a + (Number(b.qty) || 1), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6">
      {/* LEFT: form + queue */}
      <div className="space-y-6">
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-800">Dados da Etiqueta</h2>
            <div className="w-40">
              <Select value={sizeKey} onValueChange={setSizeKey}>
                <SelectTrigger data-testid="size-select" className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SIZES.map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Produto</Label>
              <Select value={productId} onValueChange={onSelectProduct}>
                <SelectTrigger data-testid="product-select" className="mt-1 bg-white">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Nome exibido</Label>
              <Input data-testid="produto-input" className="mt-1" value={produto} onChange={(e) => setProduto(e.target.value)} />
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Peso</Label>
              <Input data-testid="peso-input" className="mt-1" value={peso} onChange={(e) => setPeso(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Validade (dias)</Label>
              <Input data-testid="shelf-input" type="number" min="0" className="mt-1" value={shelfLifeDays} onChange={(e) => setShelfLifeDays(e.target.value)} />
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Data de produção</Label>
              <Input data-testid="producao-input" type="date" className="mt-1" value={producaoDate} onChange={(e) => setProducaoDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Quantidade</Label>
              <Input data-testid="qty-input" type="number" min="1" className="mt-1" value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Destino</Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger data-testid="destino-select" className="mt-1 bg-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {destinos.map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Responsável</Label>
              <Select value={responsavel} onValueChange={setResponsavel}>
                <SelectTrigger data-testid="responsavel-select" className="mt-1 bg-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {responsaveis.map((r) => (
                    <SelectItem key={r.id} value={r.name}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Conservação</Label>
              <Input data-testid="conservacao-input" className="mt-1" value={conservacao} onChange={(e) => setConservacao(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Alérgicos</Label>
              <Input data-testid="alergicos-input" className="mt-1" value={alergicos} onChange={(e) => setAlergicos(e.target.value)} placeholder="opcional" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <Button data-testid="print-current-button" className="bg-black hover:bg-zinc-800 text-white" onClick={() => runPrint([currentItem], "etiqueta atual")}>
              <Printer className="w-4 h-4 mr-2" /> Imprimir etiqueta
            </Button>
            <Button data-testid="add-to-queue-button" variant="outline" onClick={addToQueue}>
              <ListPlus className="w-4 h-4 mr-2" /> Adicionar à fila
            </Button>
          </div>
        </div>

        {/* QUEUE */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-800 flex items-center gap-2">
              <Layers className="w-5 h-5" /> Fila de Lote
              <span className="text-sm font-normal text-zinc-500">({queueTotal} etiquetas)</span>
            </h2>
            <Button
              data-testid="print-batch-button"
              className="bg-black hover:bg-zinc-800 text-white"
              disabled={queue.length === 0}
              onClick={() => runPrint(queue, "lote")}
            >
              <Printer className="w-4 h-4 mr-2" /> Imprimir lote
            </Button>
          </div>

          {queue.length === 0 ? (
            <p className="text-sm text-zinc-500 py-6 text-center">
              Nenhum item na fila. Monte um lote com produtos diferentes usando "Adicionar à fila".
            </p>
          ) : (
            <Table data-testid="queue-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((it) => (
                  <TableRow key={it.qid}>
                    <TableCell className="font-medium">{it.produto}</TableCell>
                    <TableCell className="text-zinc-600">{it.destino}</TableCell>
                    <TableCell className="text-center">{it.qty}</TableCell>
                    <TableCell>
                      <button
                        data-testid={`remove-queue-${it.qid}`}
                        onClick={() => removeFromQueue(it.qid)}
                        className="text-zinc-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* RIGHT: live preview */}
      <div className="lg:sticky lg:top-6 h-fit">
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="w-4 h-4 text-zinc-400" />
            <h2 className="text-lg font-semibold text-zinc-800">Preview — {size.label}</h2>
          </div>
          <div className="flex justify-center bg-zinc-100 rounded-md p-6">
            <div className="paper-frame">
              <ThermalLabel data={previewData} size={size} testId="label-preview" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4 text-center">
            Renderização fiel ao papel. Preto pleno, traço reforçado para impressora térmica 80mm.
          </p>
        </div>
      </div>

      {printLabels && <PrintPortal labels={printLabels} size={size} />}
    </div>
  );
}
