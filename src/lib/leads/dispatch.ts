/* eslint-disable no-console */
import { env } from "../env";
import type { LeadRecord } from "./schema";
import { hmacSha256, postJson, sendEmail, sendSms, type DispatchResult } from "./notify";

/**
 * ===========================================================================
 * DYSTRYBUCJA LEADÓW (orkiestracja)
 * ===========================================================================
 * Zasada: użytkownik NIGDY nie czeka na CRM. Rozsyłamy równolegle do wszystkich
 * skonfigurowanych kanałów, a awaria jednego nie blokuje pozostałych ani
 * odpowiedzi HTTP.
 *
 * Kanały: webhook CRM (HMAC) → e-mail → SMS → Zapier → Make.
 */

export type { DispatchResult } from "./notify";

/** Webhook z podpisem HMAC – partner może zweryfikować źródło leada. */
async function postSigned(lead: LeadRecord): Promise<DispatchResult | null> {
  // Routing per język: dedykowany endpoint dla EN/ES (agent mówiący tym językiem),
  // z fallbackiem do wspólnego CRM.
  const locale = lead.language.toUpperCase();
  const url =
    env(`LEADS_WEBHOOK_URL_${locale}`) ??
    env("LEADS_WEBHOOK_URL");
  if (!url) return null;

  const body = JSON.stringify(lead);
  const secret = env("LEADS_WEBHOOK_SECRET");
  const headers: Record<string, string> = {
    "x-lead-id": lead.id,
    "x-lead-score": String(lead.score),
    "x-lead-event": "lead.created",
    "x-lead-language": lead.language,
    "x-agent-locale": lead.language,
  };
  if (secret) headers["x-lead-signature"] = await hmacSha256(secret, body);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body,
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    return { channel: "crm-webhook", ok: response.ok, status: response.status };
  } catch (error) {
    return {
      channel: "crm-webhook",
      ok: false,
      error: error instanceof Error ? error.message : "nieznany błąd sieci",
    };
  }
}

export async function dispatchLead(lead: LeadRecord): Promise<DispatchResult[]> {
  const tasks: Promise<DispatchResult | null>[] = [
    postSigned(lead),
    sendEmail(lead),
    sendSms(lead),
  ];

  const zapier = env("ZAPIER_HOOK_URL");
  if (zapier) tasks.push(postJson("zapier", zapier, lead));

  const make = env("MAKE_HOOK_URL");
  if (make) tasks.push(postJson("make", make, lead));

  const results = await Promise.allSettled(tasks);

  const flattened = results
    .map((result) =>
      result.status === "fulfilled"
        ? result.value
        : ({ channel: "unknown", ok: false, error: String(result.reason) } as DispatchResult),
    )
    .filter((result): result is DispatchResult => result !== null);

  // Log strukturalny – trafia do Vercel/CloudWatch i służy jako backup
  // w sytuacji, gdy wszystkie webhooki padną.
  console.info(
    JSON.stringify({
      event: "lead.dispatched",
      leadId: lead.id,
      score: lead.score,
      source: lead.source,
      channels: flattened,
    }),
  );

  return flattened;
}
