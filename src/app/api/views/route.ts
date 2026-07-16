import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // never cache the live count

// Env is injected by the Vercel Upstash/KV integration. Support both the native
// Upstash names and the Vercel-KV-branded names so either integration works.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const KEY = "portfolio:visits";

// Read the current total without incrementing (returning visitors).
export async function GET() {
  if (!redis) return NextResponse.json({ count: null });
  try {
    const count = (await redis.get<number>(KEY)) ?? 0;
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[views] read error:", err);
    return NextResponse.json({ count: null });
  }
}

// Count a new unique visitor (the client only POSTs once per browser).
export async function POST() {
  if (!redis) return NextResponse.json({ count: null });
  try {
    const count = await redis.incr(KEY);
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[views] incr error:", err);
    return NextResponse.json({ count: null });
  }
}
