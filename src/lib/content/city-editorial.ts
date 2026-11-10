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
  torrevieja: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Torrevieja to największy wolumenowo rynek Costa Blanca Sur: 86 tys. mieszkańców, 4 200 transakcji rocznie i mediana 2 570 €/m², czyli 130 €/m² poniżej średniej regionu, przy dynamice 9,4% r/r - jednej z najwyższych na wybrzeżu. Oferta schodzi tu w 95 dni, szybciej niż w Alicante, bo popyt napędza nie tylko drugi dom, ale też najem całoroczny.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Cały rozstrzał zamyka się w 650 €/m²: od 2 480 €/m² w El Acequión przy Puerto de Torrevieja do 3 130 €/m² w Punta Prima. Między nimi leżą Playa de los Locos (2 960) z pierwszą linią i chiringuitos na Paseo Juan Aparicio, Playa Flamenca (3 070) z targiem i bazą apartamentów inwestycyjnych oraz La Mata (2 690), gdzie park naturalny Lagunas de La Mata ogranicza zabudowę i wycisza okolicę.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu cena zależy od odległości od wody i od roku budowy, nie od adresu administracyjnego. 46% kupujących to obcokrajowcy, a Polacy stanowią 9% - najwyższy udział w całym regionie - co przekłada się na polskojęzyczne usługi i realny popyt inwestycyjny. El Acequión ma najwyższy ROI (6,4%), bo apartamenty z lat 2000-2010 wchodzą taniej; Punta Prima przy Zenia Boulevard celuje w klienta szukającego osiedla z ochroną i basenem.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,2% brutto przy 2 570 €/m² to najlepszy stosunek ceny do dochodu na wybrzeżu. Za 250 tys. € kupisz około 97 m² w Torrevieja, a w El Acequión nawet więcej. Pod cash-flow wybierz El Acequión i Playa Flamenca, pod najem sezonowy Playa de los Locos, pod odsprzedaż z zyskiem Punta Prima. Ryzykiem jest podaż nowych osiedli - przed zakupem sprawdź, ile podobnych lokali stoi w tej samej urbanizacji.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Torrevieja is the highest-volume market on Costa Blanca Sur: 86,000 residents, 4,200 transactions a year and a 2,570 €/m² median, 130 €/m² below the regional average, with 9.4% annual growth - among the fastest on the coast. Listings clear in 95 days, quicker than Alicante, because demand comes from second homes and year-round letting alike.",
      },
      {
        title: "Spread across districts",
        body: "The whole spread fits in 650 €/m²: from 2,480 €/m² in El Acequión by Puerto de Torrevieja to 3,130 €/m² in Punta Prima. In between sit Playa de los Locos (2,960) with its front line and chiringuitos along Paseo Juan Aparicio, Playa Flamenca (3,070) with the market and an investment-flat base, and La Mata (2,690), where the Lagunas de La Mata park caps new building and keeps the area quiet.",
      },
      {
        title: "Micro-local factors",
        body: "Price here follows distance to water and year of construction, not the municipal address. Foreign buyers make up 46% and Polish buyers 9% - the highest share in the region - which supports Polish-language services and genuine investor demand. El Acequión shows the best yield (6.4%) because 2000-2010 flats enter cheaper; Punta Prima near Zenia Boulevard targets buyers wanting a gated scheme with a pool.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.2% gross yield at 2,570 €/m² is the best price-to-income ratio on the coast. 250,000 € buys roughly 97 m² in Torrevieja and more in El Acequión. For cash-flow pick El Acequión or Playa Flamenca, for seasonal letting Playa de los Locos, for resale upside Punta Prima. The risk is new-build supply: check how many similar units stand in the same development.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Torrevieja es el mercado de mayor volumen de Costa Blanca Sur: 86.000 habitantes, 4.200 operaciones al año y una mediana de 2.570 €/m², 130 €/m² por debajo de la media regional, con un crecimiento del 9,4% anual, de los más altos de la costa. Los anuncios se venden en 95 días, más rápido que en Alicante, porque la demanda viene de segunda residencia y de alquiler anual.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Todo el diferencial cabe en 650 €/m²: de 2.480 €/m² en El Acequión, junto al Puerto de Torrevieja, a 3.130 €/m² en Punta Prima. Entre medias están Playa de los Locos (2.960) con primera línea y chiringuitos en el Paseo Juan Aparicio, Playa Flamenca (3.070) con mercadillo y base de pisos de inversión, y La Mata (2.690), donde el parque de las Lagunas de La Mata limita la edificación y mantiene la zona tranquila.",
      },
      {
        title: "Factores microlocales",
        body: "Aquí el precio sigue la distancia al agua y el año de construcción, no la dirección administrativa. El 46% de los compradores es extranjero y los polacos son el 9%, el mayor peso de la región, lo que sostiene servicios en polaco y demanda inversora real. El Acequión da la mejor rentabilidad (6,4%) porque los pisos de 2000-2010 entran más baratos; Punta Prima, junto a Zenia Boulevard, apunta a quien busca urbanización cerrada con piscina.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,2% bruto con 2.570 €/m² es la mejor relación precio-renta de la costa. Con 250.000 € compras unos 97 m² en Torrevieja y más en El Acequión. Para cash-flow elige El Acequión o Playa Flamenca; para alquiler de temporada, Playa de los Locos; para reventa, Punta Prima. El riesgo es la oferta nueva: comprueba cuántos pisos similares hay en la misma urbanización.",
      },
    ],
  },
  calpe: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Calpe to rynek premium Costa Blanca Norte: 24 tys. mieszkańców, 1 400 transakcji rocznie i mediana 3 270 €/m², czyli 570 €/m² powyżej średniej regionu przy dynamice 8,9% r/r. Ekspozycja oferty wynosi 120 dni - dłużej niż w Torrevieja - bo kupujący tu nie szuka okazji, a konkretnego widoku lub adresu przy Peñón de Ifach.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Rozpiętość 530 €/m² rozkłada się między Playa de la Fossa (3 540) a Oltamar (3 010). Po drodze leżą Maryvilla (3 440) z willami i tarasami nad Cala de Maryvilla, Puerto (3 330) przy marinie i targu rybnym Lonja de Pescadores oraz Canuta (3 170) - willowa strefa na wzgórzach z widokiem na skałę. Oltamar jest najtańszy, bo to osiedla z basenem i ogrodem położone dalej od linii brzegowej.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Wycena zależy od linii zabudowy i ekspozycji na skałę, nie od metrażu. 52% kupujących to obcokrajowcy - głównie klienci z Europy Północnej - a Polacy to 7%. Dlatego Playa de la Fossa ma najwyższy popyt w sezonie (restauracje wzdłuż promenady), Maryvilla przyciąga inwestorów szukających willi pod najem, a Canuta wybierają osoby chcące mieszkać poza ruchem turystycznym, z dojazdem do Cala del Racó.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,7% brutto nie powala, ale chroni kapitał: to rynek ograniczonej podaży, bo nowe budynki przy Peñón praktycznie nie powstają. Za 250 tys. € kupisz około 76 m² w Calpe, w Oltamarze więcej, na Fossa mniej. Pod najem sezonowy najlepsza jest Fossa, pod długoterminowy Puerto, pod prestiż i odsprzedaż Maryvilla. Przed zakupem sprawdź koszt wspólnoty i czy nieruchomość ma licencję turystyczną - bez niej sezonowy scenariusz nie zadziała.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Calpe is the premium market of Costa Blanca Norte: 24,000 residents, 1,400 transactions a year and a 3,270 €/m² median, 570 €/m² above the regional average with 8.9% annual growth. Time on market runs to 120 days, longer than Torrevieja, because buyers here are not hunting bargains but a specific view or address below Peñón de Ifach.",
      },
      {
        title: "Spread across districts",
        body: "The 530 €/m² range runs from Playa de la Fossa (3,540) to Oltamar (3,010). In between sit Maryvilla (3,440) with villas and terraces above Cala de Maryvilla, Puerto (3,330) by the marina and Lonja de Pescadores fish market, and Canuta (3,170), a hillside villa belt facing the rock. Oltamar is the cheapest because its pool-and-garden estates sit further from the shoreline.",
      },
      {
        title: "Micro-local factors",
        body: "Valuation follows the building line and exposure to the rock, not floor area. Foreign buyers make up 52%, mainly northern Europe, with Polish buyers at 7%. That is why Playa de la Fossa sees the strongest seasonal demand with restaurants along the promenade, Maryvilla attracts investors after villas to let, and Canuta appeals to those living outside tourist traffic with access to Cala del Racó.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.7% gross yield is not spectacular, but it protects capital: supply is capped because new buildings below the Peñón are effectively impossible. 250,000 € buys about 76 m² in Calpe, more in Oltamar and less on the Fossa. Seasonal letting works best on the Fossa, long lets in Puerto, prestige and resale in Maryvilla. Before buying, check the community fee and whether the unit holds a tourist licence - without it the seasonal case collapses.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Calpe es el mercado premium de Costa Blanca Norte: 24.000 habitantes, 1.400 operaciones al año y una mediana de 3.270 €/m², 570 €/m² sobre la media regional con un crecimiento del 8,9% anual. La exposición llega a 120 días, más que en Torrevieja, porque el comprador aquí no busca ganga sino una vista o una dirección concreta bajo el Peñón de Ifach.",
      },
      {
        title: "Diferencial entre barrios",
        body: "La horquilla de 530 €/m² va de Playa de la Fossa (3.540) a Oltamar (3.010). Entre medias están Maryvilla (3.440) con chalets y terrazas sobre Cala de Maryvilla, Puerto (3.330) junto a la marina y la Lonja de Pescadores, y Canuta (3.170), una zona de chalets en ladera frente a la roca. Oltamar es el más barato porque sus urbanizaciones con piscina y jardín quedan más lejos de la línea de costa.",
      },
      {
        title: "Factores microlocales",
        body: "La valoración sigue la línea de edificación y la exposición a la roca, no los metros. El 52% de los compradores es extranjero, sobre todo del norte de Europa, y los polacos son el 7%. Por eso Playa de la Fossa concentra la demanda de temporada con restaurantes en el paseo, Maryvilla atrae inversores que buscan chalets para alquilar y Canuta gusta a quien vive fuera del tráfico turístico con acceso a Cala del Racó.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,7% bruto no deslumbra, pero protege capital: la oferta está limitada porque bajo el Peñón no se construye. Con 250.000 € compras unos 76 m² en Calpe, más en Oltamar y menos en la Fossa. El alquiler de temporada funciona en la Fossa, el largo en Puerto, el prestigio y la reventa en Maryvilla. Antes de comprar revisa la comunidad y si la vivienda tiene licencia turística: sin ella el escenario estacional no existe.",
      },
    ],
  },
};

/** Sekcje redakcyjne dla miasta (null = brak autorskiego tekstu). */
export function getCityEditorial(slug: string, locale: Locale): EditorialSection[] | null {
  return COPY[slug]?.[locale] ?? null;
}

