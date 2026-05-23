import { NextRequest, NextResponse } from "next/server";
import { getPanchang } from "@/lib/panchang";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") ?? "43.65");
  const lng = parseFloat(searchParams.get("lng") ?? "-79.38");
  const dateStr = searchParams.get("date");
  const date = dateStr ? new Date(dateStr) : new Date();

  const data = getPanchang(date, lat, lng);
  return NextResponse.json(data);
}
