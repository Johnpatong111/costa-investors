import type { Locale } from "../i18n/config";

/**
 * Redakcyjne sekcje analityczne dla hubów miast (/ceny-m2/{miasto}).
 *
 * Zasada: zero boilerplate. Każde zdanie dotyczy konkretnej gminy - nazw
 * dzielnic, plaż, linii tramwajowej, pól golfowych, profilu kupującego.
 * Liczby pochodzą z datasetu, ale narracja jest autorska, więc tekstu nie da
 * się wkleić do innego miasta.
 */

export interface EditorialSection {
  title: string;
  body: string;
}

const COPY: Record<string, Partial<Record<Locale, EditorialSection[]>>> = {
  alicante: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Alicante to jedyny rynek na Costa Blanca, który działa jak miasto przez cały rok, a nie jak sezonowa strefa: 340 tys. mieszkańców, 5 200 transakcji rocznie i mediana 2 820 €/m², czyli 120 €/m² powyżej średniej regionu i 7,8% wyżej niż rok temu. Konsekwencją jest najkrótszy czas wyjścia na wybrzeżu - mieszkanie schodzi tu średnio w 110 dni, a nie w kwartał.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Cabo de las Huertas (3 670 €/m²) a Vistahermosa (2 450 €/m²) leży 1 220 €/m², czyli blisko 40% premii za klif nad Cala de la Palmera wobec willowej strefy przy Golf Vistahermosa. Środek stawki wyznaczają Albufereta (3 410) i Playa de San Juan (3 300) - obie z dostępem do wody i linią tramwajową do centrum - a PAU 5 (3 030) obsługuje nowe osiedla deweloperskie w pobliżu Universidad de Alicante.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Cenę buduje dostęp do wody i tramwaj, nie odległość od lotniska (ALC jest 20 minut drogi). Kupujący to w 28% obcokrajowcy, ale Polacy stanowią tylko 4% - to rynek lokalnych pracowników i studentów z PAU 5 oraz najmu krótkiego w Albufereta, gdzie apartamenty stoją blisko Castillo de Santa Barbara. Przy Playa de San Juan trzeba uważać na wysokość wspólnoty: szeroka plaża i pełna infrastruktura kosztują w czynszu administracyjnym.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,4% brutto to najniższa stopa na wybrzeżu, ale z najkrótszym pustostanem - dlatego Alicante wygrywa płynnością, nie cash-flow. Za 250 tys. € kupisz około 88 m² w PAU 5 albo 68 m² w Cabo de las Huertas. Inwestor szukający stałego dochodu powinien patrzeć na PAU 5 i Albufereta, a ten, kto buduje wartość i planuje wyjście, na Cabo.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Alicante is the only Costa Blanca market that behaves like a city all year rather than a seasonal strip: 340,000 residents, 5,200 transactions a year and a 2,820 €/m² median, 120 €/m² above the regional average and 7.8% up year on year. The result is the fastest exit on the coast - a flat sells here in about 110 days, not a quarter.",
      },
      {
        title: "Spread across districts",
        body: "Between Cabo de las Huertas (3,670 €/m²) and Vistahermosa (2,450 €/m²) sits 1,220 €/m², roughly a 40% premium for the cliff above Cala de la Palmera against the villa belt by Golf Vistahermosa. The middle is set by Albufereta (3,410) and Playa de San Juan (3,300), both with water access and the tram into the centre, while PAU 5 (3,030) serves new-build schemes next to Universidad de Alicante.",
      },
      {
        title: "Micro-local factors",
        body: "Price is built by water access and the tram line, not by airport distance (ALC is 20 minutes away). Foreign buyers make up 28%, yet Polish buyers are only 4% - this is a market of local workers and students in PAU 5 plus short lets in Albufereta, where flats sit below Castillo de Santa Barbara. Along Playa de San Juan watch the community fee: a wide beach and full infrastructure are paid for monthly.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.4% gross yield is the lowest on the coast, but paired with the shortest void, so Alicante wins on liquidity rather than cash-flow. 250,000 € buys about 88 m² in PAU 5 or 68 m² in Cabo de las Huertas. Buyers chasing steady income should look at PAU 5 and Albufereta; those building value and planning an exit, at Cabo.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Alicante es el único mercado de Costa Blanca que funciona como ciudad todo el año y no como franja estacional: 340.000 habitantes, 5.200 operaciones anuales y una mediana de 2.820 €/m², 120 €/m² sobre la media regional y un 7,8% más que hace un año. El resultado es la salida más rápida de la costa: un piso se vende aquí en unos 110 días, no en un trimestre.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Cabo de las Huertas (3.670 €/m²) y Vistahermosa (2.450 €/m²) hay 1.220 €/m², cerca del 40% de prima por el acantilado sobre Cala de la Palmera frente a la zona de chalets junto a Golf Vistahermosa. El centro lo marcan Albufereta (3.410) y Playa de San Juan (3.300), con acceso al agua y tranvía al centro, mientras PAU 5 (3.030) atiende promociones nuevas junto a la Universidad de Alicante.",
      },
      {
        title: "Factores microlocales",
        body: "El precio lo construyen el acceso al agua y el tranvía, no la distancia al aeropuerto (ALC está a 20 minutos). El 28% de los compradores es extranjero, pero los polacos solo son el 4%: es un mercado de trabajadores locales y estudiantes en PAU 5 más alquiler corto en Albufereta, con pisos bajo el Castillo de Santa Bárbara. En Playa de San Juan conviene revisar la cuota de comunidad: playa amplia e infraestructura completa se pagan cada mes.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,4% bruto es la rentabilidad más baja de la costa, pero con la vacante más corta: Alicante gana en liquidez, no en cash-flow. Con 250.000 € compras unos 88 m² en PAU 5 o 68 m² en Cabo de las Huertas. Quien busca renta estable debería mirar PAU 5 y Albufereta; quien construye valor y planea salir, Cabo.",
      },
    ],
  },
};

/** Sekcje redakcyjne dla miasta (null = brak autorskiego tekstu). */
export function getCityEditorial(slug: string, locale: Locale): EditorialSection[] | null {
  return COPY[slug]?.[locale] ?? null;
}

