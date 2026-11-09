/* eslint-disable no-console */
import { NextResponse } from "next/server";
import { env, envNumber } from "@/lib/env";
import { dispatchLead } from "@/lib/leads/dispatch";
import { checkRateLimit, hashIdentifier } from "@/lib/leads/rate-limit";
import { leadPayloadSchema, scoreLead, isWhatsApp, type LeadRecord } from "@/lib/leads/schema";
import { API_MESSAGES, resolveApiLanguage } from "@/lib/leads/api-messages";
import { translateFieldError } from "@/lib/i18n/form-copy";

/**
 * ===========================================================================
 * POST /api/leads. Przyjęcie i dystrybucja leada
 * ===========================================================================
 * Kolejność zabezpieczeń (od najtańszego):
 *  1. Limit rozmiaru body,
 *  2. Rate limit per IP,
 *  3. Walidacja Zod,
 *  4. Honeypot,
 *  5. Scoring i rozsyłka równoległa.
 *
 * Odpowiedź 201 zawiera tylko `leadId`. Nie ujawniamy danych ani błędów
 * wewnętrznych kanałów (to informacja dla atakującego).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_384;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function errorResponse(message: string, status: number, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status });
}

export async function POST(request: Request) {
  const lang = resolveApiLanguage(request);
  const messages = API_MESSAGES[lang];
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return errorResponse(messages.tooLarge, 413);
  }

  const ip = clientIp(request);
  const limit = envNumber("LEAD_RATE_LIMIT", 6);
  const windowMs = envNumber("LEAD_RATE_WINDOW_MS", 600_000);
  const rate = checkRateLimit(`lead:${ip}`, limit, windowMs);

  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: messages.rateLimited },
      { status: 429, headers: { "retry-after": String(rate.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse(messages.invalidJson, 400);
  }

  const parsed = leadPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: translateFieldError(issue.message, lang),
    }));
    return errorResponse(API_MESSAGES[lang].invalidForm, 422, details);
  }

  // Honeypot: bot wypełnił ukryte pole. Udajemy sukces, żeby nie uczyć bota.
  if (parsed.data.website) {
    console.warn(JSON.stringify({ event: "lead.honeypot", ipHashSource: "skipped" }));
    return NextResponse.json({ ok: true, leadId: "ignored" }, { status: 201 });
  }

  const record: LeadRecord = {
    ...parsed.data,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ipHash: await hashIdentifier(ip, env("LEADS_WEBHOOK_SECRET") ?? "lead-salt"),
    userAgent: request.headers.get("user-agent") ?? "",
    referer: request.headers.get("referer") ?? "",
    score: scoreLead(parsed.data),
    whatsapp: isWhatsApp(parsed.data),
  };

  // Czekamy na rozsyłkę: w serverless funkcja może zostać zamrożona
  // natychmiast po wysłaniu odpowiedzi (brak gwarancji „fire and forget”).
  const channels = await dispatchLead(record);

  return NextResponse.json(
    {
      ok: true,
      leadId: record.id,
      score: record.score,
      delivered: channels.filter((channel) => channel.ok).length,
    },
    { status: 201 },
  );
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method Not Allowed" }, { status: 405 });
}
