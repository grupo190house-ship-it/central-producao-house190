export const SIZES = [
  { key: "80x40", label: "80 × 40 mm", w: 80, h: 40 },
  { key: "80x50", label: "80 × 50 mm", w: 80, h: 50 },
  { key: "80x60", label: "80 × 60 mm", w: 80, h: 60 },
];

export function getSize(key) {
  return SIZES.find((s) => s.key === key) || SIZES[1];
}

// yyyy-mm-dd -> Date (local, no tz shift)
function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = parseISO(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function addDays(iso, days) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + Number(days || 0));
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Batch code derived from production date: LYYMMDD
export function generateLote(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `L${y.slice(2)}${m}${d}`;
}

// Build ready-to-render strings for the thermal label
export function buildLabelData(item) {
  const validadeISO = addDays(item.producaoDate, item.shelfLifeDays);
  return {
    header: "HOUSE190",
    sub: "Central de Produção",
    peso: item.peso || "",
    produto: item.produto || "",
    producao: formatDate(item.producaoDate),
    validade: formatDate(validadeISO),
    validadeISO,
    lote: generateLote(item.producaoDate),
    conservacao: item.conservacao || "",
    destino: item.destino || "",
    responsavel: item.responsavel || "",
    alergicos: item.alergicos || "",
  };
}
