import { NextResponse } from "next/server";

type LabelPayload = {
  product?: string;
  productionDate?: string;
  shelfLifeDays?: number;
  client?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as LabelPayload;
  if (!payload.product || !payload.productionDate || !payload.shelfLifeDays) {
    return NextResponse.json({ error: "Produto, data de produção e validade padrão são obrigatórios." }, { status: 400 });
  }
  const expiry = new Date(`${payload.productionDate}T12:00:00`);
  expiry.setDate(expiry.getDate() + payload.shelfLifeDays);
  const prefix = payload.product.replace(/[^A-Za-zÀ-ÿ0-9 ]/g, "").split(" ").map((word) => word[0]).join("").slice(0, 3).toUpperCase();
  return NextResponse.json({
    product: payload.product,
    client: payload.client ?? "Estoque central",
    productionDate: payload.productionDate,
    expiryDate: expiry.toISOString().slice(0, 10),
    lot: `${prefix}-${payload.productionDate.replaceAll("-", "").slice(2)}-001`,
  });
}
