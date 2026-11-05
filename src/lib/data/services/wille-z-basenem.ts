import type { ServiceDefinition } from "./types";

export const willeZBasenem: ServiceDefinition = {
  slug: "wille-z-basenem",
  kind: "villa",
  name: "Wille z basenem",
  nameGenitive: "willi z basenem",
  propertyNoun: "villa",
  propertyNounGenitive: "willi",
  intent: "transactional",
  ctaLabel: "Zamów listę willi z basenem",
  priceAnchor: "od 320 000 €",
  highlightLabel: "prywatny basen i działka",
  h1: [
    "Wille z basenem {districtLoc} ({cityLoc}) – {region} {year}",
    "Luksusowe wille w {districtLoc} ({cityLoc})",
    "Kup willę z basenem w {districtLoc}, {cityLoc} – ceny i najem",
  ],
  metaTitle: [
    "Wille z basenem {city} ({region}) | od 320k €",
    "Luksusowa willa {district} {city} – oferty {year}",
    "Villa z basenem w {cityLoc} – ceny i ROI",
  ],
  metaDescription: [
    "Wille z basenem w {districtLoc} ({cityLoc}) od 320 000 €. Cena: {price} €/m², wzrost {growth}% r/r. Zobacz wybrane oferty i policz ROI.",
    "Szukasz willi w {cityLoc}? Średnia cena: {price} €/m², ROI najmu {yield}%. Kontakt z polskim agentem i analiza prawna zakupu.",
    "Luksusowe wille z basenem w Hiszpanii: prywatna działka, widok na morze, ceny od 320 tys. €. Sprawdź dostępne nieruchomości.",
  ],
  synonyms: [
    "wille na sprzedaż w Hiszpanii",
    "domy z basenem Costa Blanca",
    "luksusowe nieruchomości Hiszpania",
    "villa z widokiem na morze",
    "kupno willi przez Polaka",
  ],
  benefits: [
    {
      title: "Działka i basen bez niespodzianek",
      description:
        "Weryfikujemy klasyfikację gruntu (urbano/rustico), legalność basenu i rozbudowy oraz zapis w Catastro – to najczęstsze źródło problemów przy willach.",
    },
    {
      title: "Widok na morze, który nie zniknie",
      description:
        "Sprawdzamy plan zagospodarowania (PGOU) i działki sąsiednie, żeby nowa zabudowa nie zabrała panoramy, za którą płacisz.",
    },
    {
      title: "Najem premium i dłuższy sezon",
      description:
        "Wille w {districtLoc} pracują również poza sezonem letnim – analizujemy obłożenie i realne stawki, nie tylko cennik z ogłoszenia.",
    },
    {
      title: "Koszty utrzymania na stole",
      description:
        "IBI, comunidad, basen, ogrodnik, ubezpieczenie – pokazujemy roczny koszt utrzymania przed podpisaniem oferty.",
    },
  ],
  process: [
    {
      title: "Brief inwestycyjny",
      description:
        "Ustalamy budżet (zwykle 320–900 tys. €), metraż, liczbę sypialni i priorytety: widok, prywatność, bliskość plaży.",
      duration: "1 dzień",
    },
    {
      title: "Shortlista willi",
      description:
        "Wybieramy 3–6 nieruchomości i porównujemy cenę m² z medianą {districtLoc} ({price} €/m²) oraz stanem technicznym.",
      duration: "3–10 dni",
    },
    {
      title: "Due diligence",
      description:
        "Nota Simple, licencja na budowę, certyfikat energetyczny, legalność basenu, zaległości IBI. Raport po polsku.",
      duration: "2–3 tygodnie",
    },
    {
      title: "Negocjacje i notariusz",
      description:
        "Negocjujemy cenę i warunki (arras), następnie akt notarialny z tłumaczeniem i wpis do rejestru.",
      duration: "2–4 tygodnie",
    },
  ],
  faq: [
    {
      q: "Ile kosztuje willa z basenem w {districtLoc}?",
      a: "Mediana ofertowa to {price} €/m², ale w przypadku willi decyduje działka i widok – realny przedział w {districtLoc} to zwykle 320–800 tys. €. Do ceny dolicz ok. 13–14% kosztów transakcyjnych.",
    },
    {
      q: "Czy basen musi być ujęty w Catastro?",
      a: "Powinien. Nielegalna rozbudowa lub basen bez wpisu to ryzyko kary i problem przy odsprzedaży. Zawsze sprawdzamy zgodność z licencją i Catastro przed ofertą.",
    },
    {
      q: "Ile wynoszą roczne koszty utrzymania willi?",
      a: "Typowo 3 000–8 000 € rocznie: IBI (podatek gminny), comunidad, utrzymanie basenu i ogrodu, ubezpieczenie. W {districtLoc} koszty różnią się w zależności od urbanizacji.",
    },
    {
      q: "Czy Polak może kupić willę na Costa Blanca?",
      a: "Tak, bez ograniczeń. Potrzebny jest numer NIE, konto w hiszpańskim banku i środki potwierdzone zgodnie z przepisami o przeciwdziałaniu praniu pieniędzy.",
    },
  ],
  checklist: [
    "Nota Simple (wpis z rejestru nieruchomości)",
    "licencia de obra / certyfikat zgodności budowy",
    "certyfikat energetyczny (certificado energético)",
    "zaświadczenie o braku zaległości IBI i comunidad",
  ],
  linkLabel: "wille z basenem",
};
