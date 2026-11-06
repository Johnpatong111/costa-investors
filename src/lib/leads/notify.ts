import { env } from "../env";
import { HORIZONS, REGIONS, REQUIREMENTS, type LeadRecord } from "./schema";

/** Etykiety czytelne dla agenta (zamiast surowych wartości enum). */
const labelOf = (options: readonly { value: string; label: string }[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;

const labelsOf = (options: readonly { value: string; label: string }[], values: string[]): string =>
  values.length > 0 ? values.map((value) => labelOf(options, value)).join(", ") : "—";

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
      error: error instanceof Error ? error.message : "nieznany błąd sieci",
    };
  }
}

/** HMAC-SHA256 – partner CRM może zweryfikować, że lead pochodzi od nas. */
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
    <p style="margin:0 0 16px;color:#5b6b7f">Score: <strong>${lead.score}/100</strong> · ${lead.receivedAt}</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Imię i nazwisko", lead.fullName)}
      ${row("Telefon", `<a href="tel:${lead.phone}">${lead.phone}</a>`)}
      ${row("Kanał kontaktu", lead.contactMethod)}
      ${row("E-mail", lead.email ?? "—")}
      ${row("Budżet", `${lead.budget.toLocaleString("pl-PL")} €`)}
      ${row("Cel zakupu", lead.goal)}
      ${row("Typ nieruchomości", lead.propertyType)}
      ${row("Horyzont", labelOf(HORIZONS, lead.horizon))}
      ${row("Region", labelsOf(REGIONS, lead.regions))}
      ${row("Wymogi", labelsOf(REQUIREMENTS, lead.requirements))}
      ${row("Lokalizacja", [lead.district, lead.city].filter(Boolean).join(", "))}
      ${row("Dochód z najmu (kalkulator)", lead.roiEstimate ? `${lead.roiEstimate.toLocaleString("pl-PL")} €/rok` : "—")}
      ${row("Źródło", lead.source ?? "—")}
    </table>
    ${
      lead.message
        ? `<p style="margin:16px 0 0;padding:12px;background:#f4f7fb;border-radius:8px">${lead.message}</p>`
        : ""
    }
    <p style="margin:16px 0 0;font-size:12px;color:#5b6b7f">Zgoda marketingowa: ${
      lead.marketingConsent ? "tak" : "nie"
    }${lead.whatsapp ? " · preferuje WhatsApp" : ""}</p>
  </div>`;
}

export async function sendEmail(lead: LeadRecord): Promise<DispatchResult | null> {
  const apiKey = env("RESEND_API_KEY");
  const to = env("LEAD_NOTIFY_EMAIL");
  if (!apiKey || !to) return null;

  return postJson(
    "email",
    "https://api.resend.com/emails",
    {
      from: env("LEAD_EMAIL_FROM") ?? "leady@costainvestors.eu",
      to: [to],
      subject: `Lead ${lead.score}/100 – ${lead.city} · ${lead.budget.toLocaleString("pl-PL")} €`,
      html: leadEmailHtml(lead),
    },
    { authorization: `Bearer ${apiKey}` },
  );
}

/* -------------------------------- SMS -------------------------------- */

export async function sendSms(lead: LeadRecord): Promise<DispatchResult | null> {
  const url = env("LEAD_SMS_WEBHOOK_URL");
  if (!url) return null;
  // SMS tylko dla leadów „gorących” – koszt kanału musi się zwracać.
  if (lead.score < 65) return { channel: "sms", ok: true, status: 0 };

  const token = env("LEAD_SMS_WEBHOOK_TOKEN");
  return postJson(
    "sms",
    url,
    {
      to: env("LEAD_SMS_RECIPIENT"),
      message: `HOT LEAD ${lead.score}/100: ${lead.city} ${lead.district ?? ""}, budżet ${lead.budget.toLocaleString("pl-PL")} €, ${labelOf(HORIZONS, lead.horizon)}, ${lead.goal}${lead.regions.length > 0 ? `, ${labelsOf(REGIONS, lead.regions)}` : ""}. ${lead.whatsapp ? "WhatsApp" : "Tel"}: ${lead.phone}`,
      leadId: lead.id,
      whatsapp: lead.whatsapp,
    },
    token ? { authorization: `Bearer ${token}` } : {},
  );
}
