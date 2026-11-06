/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";

/**
 * Uzupełnia dokumenty prawne o administratora, kontakt i zakres przekazania
 * danych partnerom. Wstawia akapit bezpośrednio po wskazanym nagłówku.
 */

const CONTACT = "contact@costainvestors.eu";

const partnerClause = `
        <p>
          Administratorem danych jest Costa Investors. Dane przesłane formularzem (imię,
          adres e-mail, budżet, preferencje zakupowe oraz adres podstrony, z której
          wysłano zgłoszenie) przekazujemy wyłącznie zweryfikowanym partnerom i
          licencjonowanym agentom nieruchomości działającym w Hiszpanii, i wyłącznie w
          celu przedstawienia oferty oraz obsługi procesu zakupu. Nie sprzedajemy danych
          podmiotom trzecim ani nie wykorzystujemy ich do celów niepowiązanych z
          zapytaniem. Kontakt w sprawach danych osobowych: ${CONTACT}.
        </p>`;

const files = [
  {
    path: "src/app/[lang]/polityka-prywatnosci/page.tsx",
    heading: "3. Odbiorcy danych",
    clause: partnerClause,
  },
  {
    path: "src/app/[lang]/regulamin/page.tsx",
    heading: "1. Charakter serwisu",
    clause: `
        <p>
          Operatorem portalu Costa Investors jest Costa Investors. Zgłoszenia z formularza
          obsługujemy we współpracy ze zweryfikowanymi partnerami i licencjonowanymi
          agentami nieruchomości w Hiszpanii, którzy przedstawiają ofertę i prowadzą
          klienta przez proces zakupu. W sprawach technicznych i prawnych kontakt:
          ${CONTACT}.
        </p>`,
  },
];

for (const entry of files) {
  const source = readFileSync(entry.path, "utf8");
  if (source.includes(CONTACT) && source.includes("zweryfikowanymi partnerami")) {
    console.log(`… ${entry.path} (już zaktualizowany)`);
    continue;
  }

  const marker = new RegExp(`(<h2[^>]*>\\s*${entry.heading.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\s*</h2>)`, "u");
  if (!marker.test(source)) {
    console.log(`✖ ${entry.path} (nie znaleziono nagłówka „${entry.heading}")`);
    continue;
  }

  writeFileSync(entry.path, source.replace(marker, `$1${entry.clause}`), "utf8");
  console.log(`✓ ${entry.path}`);
}
