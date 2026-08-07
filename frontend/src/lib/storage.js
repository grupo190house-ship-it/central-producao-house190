// LocalStorage data layer for House190 label system.

const KEYS = {
  products: "h190_products",
  destinos: "h190_destinos",
  responsaveis: "h190_responsaveis",
  history: "h190_history",
};

const DEFAULT_PRODUCTS = [
  { id: "p1", name: "Molho de Tomate Artesanal", weight: "500g", shelfLifeDays: 5, conservacao: "Refrigerado 0–4°C", alergicos: "" },
  { id: "p2", name: "Pão de Hambúrguer Brioche", weight: "1kg", shelfLifeDays: 7, conservacao: "Ambiente seco", alergicos: "Glúten, Ovo, Leite" },
  { id: "p3", name: "Hambúrguer Blend 180g", weight: "180g", shelfLifeDays: 3, conservacao: "Refrigerado 0–4°C", alergicos: "" },
  { id: "p4", name: "Maionese da Casa", weight: "300g", shelfLifeDays: 4, conservacao: "Refrigerado 0–4°C", alergicos: "Ovo" },
  { id: "p5", name: "Batata Pré-Frita", weight: "2kg", shelfLifeDays: 30, conservacao: "Congelado -18°C", alergicos: "" },
  { id: "p6", name: "Cheddar Cremoso", weight: "400g", shelfLifeDays: 10, conservacao: "Refrigerado 0–4°C", alergicos: "Leite" },
];

const DEFAULT_DESTINOS = [
  { id: "d1", name: "House190 Teixeira" },
  { id: "d2", name: "House190 Eunápolis" },
  { id: "d3", name: "House190 Food Park" },
];

const DEFAULT_RESPONSAVEIS = [
  { id: "r1", name: "João" },
  { id: "r2", name: "Maria" },
  { id: "r3", name: "Equipe Cozinha" },
];

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts() {
  const p = read(KEYS.products, null);
  if (!p) {
    write(KEYS.products, DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
  return p;
}
export function saveProducts(list) {
  write(KEYS.products, list);
}

export function getDestinos() {
  const d = read(KEYS.destinos, null);
  if (!d) {
    write(KEYS.destinos, DEFAULT_DESTINOS);
    return DEFAULT_DESTINOS;
  }
  return d;
}
export function saveDestinos(list) {
  write(KEYS.destinos, list);
}

export function getResponsaveis() {
  const r = read(KEYS.responsaveis, null);
  if (!r) {
    write(KEYS.responsaveis, DEFAULT_RESPONSAVEIS);
    return DEFAULT_RESPONSAVEIS;
  }
  return r;
}
export function saveResponsaveis(list) {
  write(KEYS.responsaveis, list);
}

export function getHistory() {
  return read(KEYS.history, []);
}
export function addHistory(records) {
  const current = getHistory();
  const next = [...records, ...current].slice(0, 500);
  write(KEYS.history, next);
  return next;
}
export function clearHistory() {
  write(KEYS.history, []);
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
