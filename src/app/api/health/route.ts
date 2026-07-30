import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "central-producao-house190", timestamp: new Date().toISOString() });
}
