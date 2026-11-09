import type { Locale } from "./config";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

type LegalBundle = { privacy: LegalDoc; terms: LegalDoc };

const PL: LegalBundle = {
  privacy: {
    title: "Polityka prywatności i informacja RODO",
    updated: "Ostatnia aktualizacja: luty 2026",
    intro:
      "Administratorem danych osobowych jest Costa Investors. Kontakt we wszystkich sprawach dotyczących danych: contact@costainvestors.eu.",
    sections: [
      {
        heading: "1. Zakres danych",
        paragraphs: [
          "Przetwarzamy dane podane w formularzu: imię i nazwisko, telefon lub WhatsApp, e-mail, budżet, cel zakupu, preferowany region, wymagania oraz adres podstrony, z której wysłano zgłoszenie.",
          "Nie zbieramy danych wrażliwych, numerów dokumentów ani danych bankowych.",
        ],
      },
      {
        heading: "2. Cel i podstawa prawna",
        paragraphs: [
          "Dane przetwarzamy, aby obsłużyć zapytanie i przedstawić ofertę (art. 6 ust. 1 lit. b RODO), kontaktować się na podstawie zgody (lit. a) oraz bronić się przed roszczeniami (lit. f).",
        ],
      },
      {
        heading: "3. Odbiorcy danych",
        paragraphs: [
          "Dane przekazujemy wyłącznie zweryfikowanym partnerom i licencjonowanym agentom nieruchomości w Hiszpanii oraz dostawcom technicznym (hosting, poczta transakcyjna). Nie sprzedajemy danych.",
        ],
      },
      {
        heading: "4. Okres przechowywania",
        paragraphs: [
          "Przechowujemy dane przez czas rozmów handlowych, maksymalnie 24 miesiące od ostatniego kontaktu, po czym je usuwamy lub anonimizujemy.",
        ],
      },
      {
        heading: "5. Twoje prawa",
        paragraphs: [
          "Masz prawo dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia danych oraz wycofania zgody. Wnioski: contact@costainvestors.eu.",
          "Możesz złożyć skargę do organu nadzorczego (w Polsce: Prezes UODO).",
        ],
      },
      {
        heading: "6. Pliki cookies",
        paragraphs: [
          "Serwis używa wyłącznie niezbędnych plików cookies (sesja, preferencja języka). Cookies marketingowe wymagają zgody.",
        ],
      },
    ],
  },
  terms: {
    title: "Regulamin serwisu",
    updated: "Obowiązuje od lutego 2026",
    intro: "Operatorem portalu Costa Investors jest Costa Investors. Kontakt: contact@costainvestors.eu.",
    sections: [
      {
        heading: "1. Charakter serwisu",
        paragraphs: [
          "Serwis ma charakter informacyjny: prezentuje ofertę i zbiera zapytania o nieruchomości w Hiszpanii. Dane rynkowe są szacunkowe i nie stanowią oferty w rozumieniu Kodeksu cywilnego.",
        ],
      },
      {
        heading: "2. Bezpłatność dla kupującego",
        paragraphs: [
          "Formularz i kontakt z agentem są bezpłatne dla kupującego. Wynagrodzenie rozliczamy z partnerską agencją po transakcji.",
        ],
      },
      {
        heading: "3. Partnerzy",
        paragraphs: [
          "Zgłoszenia obsługujemy ze zweryfikowanymi partnerami i licencjonowanymi agentami w Hiszpanii, którzy przedstawiają ofertę i prowadzą klienta przez zakup.",
        ],
      },
      {
        heading: "4. Odpowiedzialność",
        paragraphs: [
          "Nie odpowiadamy za decyzje zakupowe podjęte na podstawie publikowanych danych. Warunki transakcji wynikają z dokumentów stron i notariusza.",
        ],
      },
      {
        heading: "5. Reklamacje",
        paragraphs: [
          "Reklamacje przyjmujemy pod adresem contact@costainvestors.eu. Odpowiadamy w ciągu 14 dni roboczych.",
        ],
      },
    ],
  },
};

const EN: LegalBundle = {
  privacy: {
    title: "Privacy policy and GDPR information",
    updated: "Last updated: February 2026",
    intro:
      "Costa Investors is the controller of your personal data. Contact for all data matters: contact@costainvestors.eu.",
    sections: [
      {
        heading: "1. Data we collect",
        paragraphs: [
          "We process data submitted in the form: name, phone or WhatsApp, e-mail, budget, purchase goal, preferred region, requirements and the address of the page you sent the enquiry from.",
          "We never collect sensitive data, identity documents or bank details.",
        ],
      },
      {
        heading: "2. Purpose and legal basis",
        paragraphs: [
          "We process data to handle the enquiry and present offers (Art. 6(1)(b) GDPR), to contact you with your consent (Art. 6(1)(a)) and to defend against claims (Art. 6(1)(f)).",
        ],
      },
      {
        heading: "3. Recipients",
        paragraphs: [
          "Data is shared only with verified partners and licensed real estate agents in Spain, plus technical providers (hosting, transactional e-mail). We never sell data.",
        ],
      },
      {
        heading: "4. Retention",
        paragraphs: [
          "Data is kept for the duration of the sales conversation and no longer than 24 months from the last contact, then deleted or anonymised.",
        ],
      },
      {
        heading: "5. Your rights",
        paragraphs: [
          "You may access, rectify, erase, restrict or port your data and withdraw consent at any time. Requests: contact@costainvestors.eu.",
          "You may also complain to a supervisory authority.",
        ],
      },
      {
        heading: "6. Cookies",
        paragraphs: [
          "The site uses only essential cookies (session, language preference). Marketing cookies require consent.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of service",
    updated: "Effective from February 2026",
    intro: "Costa Investors operates this portal. Contact: contact@costainvestors.eu.",
    sections: [
      {
        heading: "1. Nature of the service",
        paragraphs: [
          "The portal is informational: it presents offers and collects property enquiries in Spain. Market data is indicative and is not a contractual offer.",
        ],
      },
      {
        heading: "2. Free for buyers",
        paragraphs: [
          "The form and agent contact are free for the buyer. We are remunerated by the partner agency after completion.",
        ],
      },
      {
        heading: "3. Partners",
        paragraphs: [
          "Enquiries are handled with verified partners and licensed agents in Spain who present the offer and guide the client through the purchase.",
        ],
      },
      {
        heading: "4. Liability",
        paragraphs: [
          "We are not liable for purchase decisions based on published data. Final terms follow from documents prepared by the parties and the notary.",
        ],
      },
      {
        heading: "5. Complaints",
        paragraphs: [
          "Complaints: contact@costainvestors.eu. We reply within 14 business days.",
        ],
      },
    ],
  },
};

const ES: LegalBundle = {
  privacy: {
    title: "Política de privacidad e información RGPD",
    updated: "Última actualización: febrero de 2026",
    intro:
      "Costa Investors es el responsable del tratamiento. Contacto: contact@costainvestors.eu.",
    sections: [
      {
        heading: "1. Datos que tratamos",
        paragraphs: [
          "Tratamos los datos del formulario: nombre, teléfono o WhatsApp, correo, presupuesto, objetivo de compra, región preferida, requisitos y la dirección de la página desde la que se envió la solicitud.",
          "No recogemos datos sensibles, documentos de identidad ni datos bancarios.",
        ],
      },
      {
        heading: "2. Finalidad y base jurídica",
        paragraphs: [
          "Tratamos los datos para gestionar la solicitud y presentar ofertas (art. 6.1.b RGPD), contactarte con tu consentimiento (art. 6.1.a) y defender reclamaciones (art. 6.1.f).",
        ],
      },
      {
        heading: "3. Destinatarios",
        paragraphs: [
          "Los datos se comparten solo con socios verificados y agentes con licencia en España, además de proveedores técnicos (alojamiento, correo transaccional). No vendemos datos.",
        ],
      },
      {
        heading: "4. Conservación",
        paragraphs: [
          "Conservamos los datos durante la conversación comercial y no más de 24 meses desde el último contacto; después se eliminan o anonimizan.",
        ],
      },
      {
        heading: "5. Tus derechos",
        paragraphs: [
          "Puedes ejercer acceso, rectificación, supresión, limitación y portabilidad, y retirar el consentimiento. Solicitudes: contact@costainvestors.eu.",
          "También puedes reclamar ante la Agencia Española de Protección de Datos.",
        ],
      },
      {
        heading: "6. Cookies",
        paragraphs: [
          "El sitio utiliza solo cookies esenciales (sesión, idioma). Las cookies de marketing requieren consentimiento.",
        ],
      },
    ],
  },
  terms: {
    title: "Reglamento del servicio",
    updated: "Vigente desde febrero de 2026",
    intro: "El portal Costa Investors es operado por Costa Investors. Contacto: contact@costainvestors.eu.",
    sections: [
      {
        heading: "1. Naturaleza del servicio",
        paragraphs: [
          "El portal es informativo: presenta ofertas y recoge solicitudes sobre inmuebles en España. Los datos de mercado son estimativos y no constituyen oferta contractual.",
        ],
      },
      {
        heading: "2. Gratuito para el comprador",
        paragraphs: [
          "El formulario y el contacto con el agente son gratuitos para el comprador. Nos remunera la agencia asociada tras la operación.",
        ],
      },
      {
        heading: "3. Socios",
        paragraphs: [
          "Las solicitudes se atienden con socios verificados y agentes con licencia en España, que presentan la oferta y acompañan al cliente en la compra.",
        ],
      },
      {
        heading: "4. Responsabilidad",
        paragraphs: [
          "No somos responsables de las decisiones de compra basadas en los datos publicados. Las condiciones finales resultan de los documentos de las partes y de la notaría.",
        ],
      },
      {
        heading: "5. Reclamaciones",
        paragraphs: [
          "Reclamaciones: contact@costainvestors.eu. Respondemos en 14 días hábiles.",
        ],
      },
    ],
  },
};

const LEGAL: Record<Locale, LegalBundle> = { pl: PL, en: EN, es: ES };

export function getLegal(locale: Locale): LegalBundle {
  return LEGAL[locale] ?? LEGAL.pl;
}


