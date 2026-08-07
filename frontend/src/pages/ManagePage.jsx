import { useState } from "react";
import {
  getProducts,
  saveProducts,
  getDestinos,
  saveDestinos,
  getResponsaveis,
  saveResponsaveis,
  uid,
} from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function ManagePage() {
  const [products, setProducts] = useState(() => getProducts());
  const [destinos, setDestinos] = useState(() => getDestinos());
  const [responsaveis, setResponsaveis] = useState(() => getResponsaveis());

  const [np, setNp] = useState({ name: "", weight: "", shelfLifeDays: 5, conservacao: "", alergicos: "" });
  const [nd, setNd] = useState("");
  const [nr, setNr] = useState("");

  const addProduct = () => {
    if (!np.name.trim()) return toast.error("Informe o nome do produto.");
    const next = [...products, { id: uid(), ...np, shelfLifeDays: Number(np.shelfLifeDays) || 0 }];
    setProducts(next);
    saveProducts(next);
    setNp({ name: "", weight: "", shelfLifeDays: 5, conservacao: "", alergicos: "" });
    toast.success("Produto adicionado.");
  };
  const delProduct = (id) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveProducts(next);
  };

  const addDestino = () => {
    if (!nd.trim()) return;
    const next = [...destinos, { id: uid(), name: nd.trim() }];
    setDestinos(next);
    saveDestinos(next);
    setNd("");
  };
  const delDestino = (id) => {
    const next = destinos.filter((d) => d.id !== id);
    setDestinos(next);
    saveDestinos(next);
  };

  const addResp = () => {
    if (!nr.trim()) return;
    const next = [...responsaveis, { id: uid(), name: nr.trim() }];
    setResponsaveis(next);
    saveResponsaveis(next);
    setNr("");
  };
  const delResp = (id) => {
    const next = responsaveis.filter((r) => r.id !== id);
    setResponsaveis(next);
    saveResponsaveis(next);
  };

  const lbl = "text-xs font-bold uppercase tracking-widest text-zinc-500";

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5">
      <Tabs defaultValue="produtos">
        <TabsList className="mb-5">
          <TabsTrigger value="produtos" data-testid="tab-produtos">Produtos</TabsTrigger>
          <TabsTrigger value="destinos" data-testid="tab-destinos">Destinos</TabsTrigger>
          <TabsTrigger value="responsaveis" data-testid="tab-responsaveis">Responsáveis</TabsTrigger>
        </TabsList>

        <TabsContent value="produtos">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end mb-5 p-4 bg-zinc-50 rounded-md">
            <div className="sm:col-span-2">
              <Label className={lbl}>Nome</Label>
              <Input data-testid="np-name" className="mt-1" value={np.name} onChange={(e) => setNp({ ...np, name: e.target.value })} />
            </div>
            <div>
              <Label className={lbl}>Peso</Label>
              <Input data-testid="np-weight" className="mt-1" value={np.weight} onChange={(e) => setNp({ ...np, weight: e.target.value })} />
            </div>
            <div>
              <Label className={lbl}>Dias</Label>
              <Input data-testid="np-days" type="number" className="mt-1" value={np.shelfLifeDays} onChange={(e) => setNp({ ...np, shelfLifeDays: e.target.value })} />
            </div>
            <div>
              <Label className={lbl}>Conservação</Label>
              <Input data-testid="np-cons" className="mt-1" value={np.conservacao} onChange={(e) => setNp({ ...np, conservacao: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className={lbl}>Alérgicos</Label>
                <Input data-testid="np-alerg" className="mt-1" value={np.alergicos} onChange={(e) => setNp({ ...np, alergicos: e.target.value })} />
              </div>
            </div>
            <div className="sm:col-span-6">
              <Button data-testid="add-product-button" className="bg-black hover:bg-zinc-800 text-white" onClick={addProduct}>
                <Plus className="w-4 h-4 mr-2" /> Adicionar produto
              </Button>
            </div>
          </div>

          <Table data-testid="products-table">
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Conservação</TableHead>
                <TableHead>Alérgicos</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.weight}</TableCell>
                  <TableCell>{p.shelfLifeDays} dias</TableCell>
                  <TableCell className="text-zinc-600">{p.conservacao}</TableCell>
                  <TableCell className="text-zinc-600">{p.alergicos || "—"}</TableCell>
                  <TableCell>
                    <button data-testid={`del-product-${p.id}`} onClick={() => delProduct(p.id)} className="text-zinc-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="destinos">
          <div className="flex gap-3 items-end mb-5 p-4 bg-zinc-50 rounded-md">
            <div className="flex-1">
              <Label className={lbl}>Novo destino / loja</Label>
              <Input data-testid="nd-input" className="mt-1" value={nd} onChange={(e) => setNd(e.target.value)} />
            </div>
            <Button data-testid="add-destino-button" className="bg-black hover:bg-zinc-800 text-white" onClick={addDestino}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar
            </Button>
          </div>
          <Table data-testid="destinos-table">
            <TableBody>
              {destinos.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="w-10 text-right">
                    <button data-testid={`del-destino-${d.id}`} onClick={() => delDestino(d.id)} className="text-zinc-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="responsaveis">
          <div className="flex gap-3 items-end mb-5 p-4 bg-zinc-50 rounded-md">
            <div className="flex-1">
              <Label className={lbl}>Novo responsável</Label>
              <Input data-testid="nr-input" className="mt-1" value={nr} onChange={(e) => setNr(e.target.value)} />
            </div>
            <Button data-testid="add-resp-button" className="bg-black hover:bg-zinc-800 text-white" onClick={addResp}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar
            </Button>
          </div>
          <Table data-testid="resp-table">
            <TableBody>
              {responsaveis.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="w-10 text-right">
                    <button data-testid={`del-resp-${r.id}`} onClick={() => delResp(r.id)} className="text-zinc-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
