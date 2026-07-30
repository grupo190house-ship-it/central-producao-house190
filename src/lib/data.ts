export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

export const dashboardStats = [
  { label: "Produções de hoje", value: "18", detail: "12 concluídas", tone: "info" as const },
  { label: "Etiquetas impressas", value: "246", detail: "8 aguardando", tone: "success" as const },
  { label: "Vencem em 3 dias", value: "7", detail: "2 com prioridade", tone: "warning" as const },
  { label: "Perdas no mês", value: "R$ 428", detail: "0,9% da produção", tone: "danger" as const },
];

export const productionRows = [
  { code: "OP-0730-018", product: "Maionese Verde", client: "House190 Teixeira", quantity: "24 × 500 g", status: "Em produção", tone: "info" as const, time: "15:30" },
  { code: "OP-0730-017", product: "Blend House 180 g", client: "House190 Eunápolis", quantity: "180 un.", status: "Separado", tone: "warning" as const, time: "16:00" },
  { code: "OP-0730-016", product: "Bacon Crispy 40 g", client: "House Food Park", quantity: "80 pct.", status: "Concluído", tone: "success" as const, time: "14:20" },
  { code: "OP-0730-015", product: "Molho de Alho", client: "House190 Teixeira", quantity: "20 × 500 g", status: "Solicitado", tone: "neutral" as const, time: "17:00" },
];

export const expiryAlerts = [
  { product: "Tomate Confitado", batch: "TC-280726-002", expires: "Hoje", quantity: "3,5 kg", tone: "danger" as const },
  { product: "Maionese de Chimichurri", batch: "MC-280726-001", expires: "Amanhã", quantity: "6 kg", tone: "warning" as const },
  { product: "Pesto sem castanha", batch: "PS-290726-003", expires: "Em 2 dias", quantity: "2 kg", tone: "warning" as const },
];

export const products = [
  { code: "MOL-MV-500", name: "Maionese Verde", category: "Molhos", validity: "5 dias", storage: "Refrigerado", stock: "14 kg", min: "8 kg", status: "Normal", tone: "success" as const },
  { code: "CAR-BLD-180", name: "Blend House 180 g", category: "Carnes", validity: "30 dias", storage: "Congelado", stock: "96 un.", min: "120 un.", status: "Estoque baixo", tone: "danger" as const },
  { code: "FRI-BAC-040", name: "Bacon Crispy 40 g", category: "Frios", validity: "5 dias", storage: "Refrigerado", stock: "124 pct.", min: "80 pct.", status: "Normal", tone: "success" as const },
  { code: "MOL-AL-500", name: "Molho de Alho", category: "Molhos", validity: "5 dias", storage: "Refrigerado", stock: "9 kg", min: "8 kg", status: "Atenção", tone: "warning" as const },
  { code: "PRE-TC-500", name: "Tomate Confitado", category: "Pré-preparo", validity: "4 dias", storage: "Refrigerado", stock: "3,5 kg", min: "5 kg", status: "Vence hoje", tone: "danger" as const },
];

export const clients = [
  { code: "HTF", name: "House190 Teixeira de Freitas", city: "Teixeira de Freitas - BA", contact: "Gerência da loja", phone: "(73) 99947-0290", orders: 8, volume: "146 kg", nextDelivery: "Hoje, 18:00" },
  { code: "HEU", name: "House190 Eunápolis", city: "Eunápolis - BA", contact: "Gerência da loja", phone: "Não informado", orders: 5, volume: "102 kg", nextDelivery: "Amanhã, 10:00" },
  { code: "HFP", name: "House Food Park", city: "Teixeira de Freitas - BA", contact: "Operação Food Park", phone: "Não informado", orders: 4, volume: "73 kg", nextDelivery: "Hoje, 17:30" },
];

export const stockItems = [
  { product: "Blend House 180 g", batch: "BH-280726-004", location: "Freezer 02", available: "96 un.", expires: "27/08/2026", status: "Baixo", tone: "danger" as const },
  { product: "Maionese Verde", batch: "MV-300726-001", location: "Câmara 01", available: "14 kg", expires: "04/08/2026", status: "Normal", tone: "success" as const },
  { product: "Bacon Crispy 40 g", batch: "BC-290726-002", location: "Câmara 02", available: "124 pct.", expires: "03/08/2026", status: "Normal", tone: "success" as const },
  { product: "Tomate Confitado", batch: "TC-280726-002", location: "Câmara 01", available: "3,5 kg", expires: "30/07/2026", status: "Vence hoje", tone: "danger" as const },
  { product: "Pesto sem castanha", batch: "PS-290726-003", location: "Câmara 01", available: "2 kg", expires: "01/08/2026", status: "Atenção", tone: "warning" as const },
];

export const lossRows = [
  { date: "30/07/2026", product: "Tomate Confitado", quantity: "1,2 kg", reason: "Sobra de produção", responsible: "Carlos", value: "R$ 24,80" },
  { date: "29/07/2026", product: "Molho de Alho", quantity: "0,5 kg", reason: "Qualidade inadequada", responsible: "Ana", value: "R$ 8,40" },
  { date: "28/07/2026", product: "Blend House 180 g", quantity: "6 un.", reason: "Avaria", responsible: "Marcos", value: "R$ 31,20" },
];
