import { env } from "../env";
import { HORIZONS, REGIONS, REQUIREMENTS, type LeadRecord } from "./schema";

/** Etykiety czytelne dla agenta (zamiast surowych wartoĹ›ci enum). */
const labelOf = (options: readonly { value: string; label: string }[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;

const labelsOf = (options: readonly { value: string; label: string }[], values: string[]): string =>
  values.length > 0 ? values.map((value) => labelOf(options, value)).join(", ") : "-";

/**
 * Awaryjny zapis leada, gdy e-mail nie wyszedł (np. niezweryfikowana domena
 * w Resend na planie testowym). Trafia do logów funkcji (Vercel/CloudWatch),
 * a lead i tak leci do webhooków, więc żadne zgłoszenie nie ginie.
 */
export function logLeadFallback(lead: LeadRecord, reason: string): void {
  console.error(
    JSON.stringify({
      event: "lead_fallback",
      reason,
      id: lead.id,
      receivedAt: lead.receivedAt,
      fullName: lead.fullName,
      email: lead.email ?? null,
      phone: lead.phone,
      budget: lead.budget,
      goal: lead.goal,
      propertyType: lead.propertyType,
      horizon: lead.horizon,
      regions: lead.regions,
      requirements: lead.requirements,
      city: lead.city,
      district: lead.district ?? null,
      source: lead.source ?? null,
      pageUrl: lead.pageUrl ?? null,
    }),
  );
}

export interface DispatchResult {
  channel: string;
  ok: boolean;
  status?: number;
  error?: string;
}

const TIMEOUT_MS = 8_000;

export async function postJson(
  channel: string,
  url: string,
  payload: unknown,
  headers: Record<string, string> = {},
): Promise<DispatchResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    return { channel, ok: response.ok, status: response.status };
  } catch (error) {
    return {
      channel,
      ok: false,
      error: error instanceof Error ? error.message : "nieznany bĹ‚Ä…d sieci",
    };
  }
}

/** HMAC-SHA256. Partner CRM moĹĽe zweryfikowaÄ‡, ĹĽe lead pochodzi od nas. */
export async function hmacSha256(secret: string, body: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/* ------------------------------ e-mail ------------------------------ */

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px;color:#5b6b7f;font-size:13px">${label}</td><td style="padding:6px 12px;font-weight:600">${value}</td></tr>`;
}

export function leadEmailHtml(lead: LeadRecord): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:560px">
    <h2 style="margin:0 0 4px">Nowy lead #${lead.id.slice(0, 8)}</h2>
    <p style="margin:0 0 16px;color:#5b6b7f">Score: <strong>${lead.score}/100</strong> Â· ${lead.receivedAt}</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("ImiÄ™ i nazwisko", lead.fullName)}
      ${row("Telefon", `<a href="tel:${lead.phone}">${lead.phone}</a>`)}
      ${row("KanaĹ‚ kontaktu", lead.contactMethod)}
      ${row("E-mail", lead.email ?? "-")}
      ${row("BudĹĽet", `${lead.budget.toLocaleString("pl-PL")} â‚¬`)}
      ${row("Cel zakupu", lead.goal)}
      ${row("Typ nieruchomoĹ›ci", lead.propertyType)}
      ${row("Horyzont", labelOf(HORIZONS, lead.horizon))}
      ${row("Region", labelsOf(REGIONS, lead.regions))}
      ${row("Wymogi", labelsOf(REQUIREMENTS, lead.requirements))}
      ${row("Lokalizacja", [lead.district, lead.city].filter(Boolean).join(", "))}
      ${row("DochĂłd z najmu (kalkulator)", lead.roiEstimate ? `${lead.roiEstimate.toLocaleString("pl-PL")} â‚¬/rok` : "-")}
      ${row("ĹąrĂłdĹ‚o", lead.source ?? "-")}
    </table>
    ${
      lead.message
        ? `<p style="margin:16px 0 0;padding:12px;background:#f4f7fb;border-radius:8px">${lead.message}</p>`
        : ""
    }
    <p style="margin:16px 0 0;font-size:12px;color:#5b6b7f">Zgoda marketingowa: ${
      lead.marketingConsent ? "tak" : "nie"
    }${lead.whatsapp ? " Â· preferuje WhatsApp" : ""}</p>
  </div>`;
}

export async function sendEmail(lead: LeadRecord): Promise<DispatchResult | null> {
  const apiKey = env("RESEND_API_KEY");
  const to = env("LEAD_NOTIFY_EMAIL") ?? "contact@costainvestors.eu";
  if (!apiKey || !to) {
    logLeadFallback(lead, "resend_not_configured");
    return null;
  }

  return postJson(
    "email",
    "https://api.resend.com/emails",
    {
      from: env("LEAD_EMAIL_FROM") ?? "Costa Investors <onboarding@resend.dev>",
      to: [to],
      subject: `Lead ${lead.score}/100: ${lead.city} Â· ${lead.budget.toLocaleString("pl-PL")} â‚¬`,
      html: leadEmailHtml(lead),
    },
    { authorization: `Bearer ${apiKey}` },
  ).then((result) => {
    // Resend na planie testowym odrzuca wysyłkę z onboarding@resend.dev do
    // obcego adresu (403). Nie przerywamy procesu: lead zostaje w logach
    // i webhookach, a użytkownik i tak widzi ekran sukcesu.
    if (!result.ok) {
      logLeadFallback(lead, result.error ?? `resend_http_${result.status ?? 0}`);
    }
    return result;
  });
}

/* -------------------------------- SMS -------------------------------- */

export async function sendSms(lead: LeadRecord): Promise<DispatchResult | null> {
  const url = env("LEAD_SMS_WEBHOOK_URL");
  if (!url) return null;
  // SMS tylko dla leadĂłw â€žgorÄ…cychâ€ť. Koszt kanaĹ‚u musi siÄ™ zwracaÄ‡.
  if (lead.score < 65) return { channel: "sms", ok: true, status: 0 };

  const token = env("LEAD_SMS_WEBHOOK_TOKEN");
  return postJson(
    "sms",
    url,
    {
      to: env("LEAD_SMS_RECIPIENT"),
      message: `HOT LEAD ${lead.score}/100: ${lead.city} ${lead.district ?? ""}, budĹĽet ${lead.budget.toLocaleString("pl-PL")} â‚¬, ${labelOf(HORIZONS, lead.horizon)}, ${lead.goal}${lead.regions.length > 0 ? `, ${labelsOf(REGIONS, lead.regions)}` : ""}. ${lead.whatsapp ? "WhatsApp" : "Tel"}: ${lead.phone}`,
      leadId: lead.id,
      whatsapp: lead.whatsapp,
    },
    token ? { authorization: `Bearer ${token}` } : {},
  );
}
