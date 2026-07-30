export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Bahia",
  }).format(date);
}

export function storageLabel(value: string): string {
  const labels: Record<string, string> = {
    AMBIENT: "Temperatura ambiente",
    REFRIGERATED: "Refrigerado",
    FROZEN: "Congelado",
  };
  return labels[value] ?? value;
}
