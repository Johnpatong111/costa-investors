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
  benidorm: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Benidorm to jedyny rynek na Costa Blanca, gdzie wieżowiec jest produktem standardowym, a nie wyjątkiem: 70 tys. mieszkańców, 3 100 transakcji rocznie i mediana 3 370 €/m², czyli 670 €/m² powyżej średniej regionu przy dynamice 8,6% r/r. Oferta schodzi w 100 dni, bo miasto żyje z turystyki przez dwanaście miesięcy, a nie przez trzy.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Playa de Levante (3 640 €/m²) a Foietes (3 050 €/m²) leży 590 €/m². Środek wyznaczają Rincón de Loix (3 530) ze zwartą zabudową wysokościową przy Cala Tío Ximo, Sierra Helada (3 210) z apartamentami na zboczu nad zatoką i Playa de Poniente (3 160), gdzie deptak jest szerszy, a budynki pochodzą głównie z lat 2000-2015.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o cenie decyduje wysokość i widok, nie metraż: na Levante apartament na 20. piętrze jest wart więcej niż dom w głębi lądu. 38% kupujących to obcokrajowcy, Polacy 5%. Najem turystyczny pracuje cały rok dzięki Aqualandii i strefie rozrywki, ale licencja turystyczna i wysoka wspólnota w wieżowcach zjadają marżę. Foietes i Sierra Helada to alternatywa dla osób, które chcą mieszkać poza strefą hotelową, blisko Parque Natural de Serra Gelada.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,9% brutto przy 3 370 €/m² to wynik przeciętny, ale obłożenie jest najstabilniejsze w regionie. Za 250 tys. € kupisz około 74 m², na Foietes więcej, na Levante mniej. Pod najem krótki wybierz Levante lub Rincón de Loix, pod długi Foietes, pod prestiż Sierra Helada. Główne ryzyko: podaż lokali turystycznych rośnie szybciej niż popyt, więc sprawdź, czy budynek ma licencję i jak wygląda obłożenie poza lipcem.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Benidorm is the only Costa Blanca market where a high-rise is the standard product, not the exception: 70,000 residents, 3,100 transactions a year and a 3,370 €/m² median, 670 €/m² above the regional average with 8.6% annual growth. Listings clear in 100 days because the town lives off tourism for twelve months, not three.",
      },
      {
        title: "Spread across districts",
        body: "Between Playa de Levante (3,640 €/m²) and Foietes (3,050 €/m²) sits 590 €/m². The middle is set by Rincón de Loix (3,530) with dense towers by Cala Tío Ximo, Sierra Helada (3,210) with hillside flats above the bay, and Playa de Poniente (3,160), where the promenade is wider and buildings date mostly from 2000-2015.",
      },
      {
        title: "Micro-local factors",
        body: "Price follows height and view rather than floor area: a 20th-floor flat on Levante beats a house inland. Foreign buyers make up 38%, Polish buyers 5%. Tourist letting runs all year thanks to Aqualandia and the entertainment strip, but the tourist licence and high tower community fees eat into margin. Foietes and Sierra Helada suit those living outside the hotel zone, next to Parque Natural de Serra Gelada.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.9% gross yield at 3,370 €/m² is average, yet occupancy is the steadiest in the region. 250,000 € buys about 74 m², more in Foietes and less on Levante. For short lets choose Levante or Rincón de Loix, for long lets Foietes, for prestige Sierra Helada. The main risk: tourist stock grows faster than demand, so check the building licence and off-July occupancy.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Benidorm es el único mercado de Costa Blanca donde el rascacielos es el producto estándar y no la excepción: 70.000 habitantes, 3.100 operaciones al año y una mediana de 3.370 €/m², 670 €/m² sobre la media regional con un crecimiento del 8,6% anual. Los anuncios se venden en 100 días porque la ciudad vive del turismo doce meses, no tres.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Playa de Levante (3.640 €/m²) y Foietes (3.050 €/m²) hay 590 €/m². El centro lo marcan Rincón de Loix (3.530) con torres densas junto a Cala Tío Ximo, Sierra Helada (3.210) con pisos en ladera sobre la bahía y Playa de Poniente (3.160), con paseo más ancho y edificios de 2000-2015.",
      },
      {
        title: "Factores microlocales",
        body: "El precio sigue altura y vistas, no los metros: un piso en la planta 20 de Levante vale más que una casa tierra adentro. El 38% de los compradores es extranjero y los polacos son el 5%. El alquiler turístico funciona todo el año gracias a Aqualandia y la zona de ocio, pero la licencia y la comunidad alta en torres se comen el margen. Foietes y Sierra Helada atraen a quien vive fuera de la zona hotelera, junto al Parque Natural de Serra Gelada.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,9% bruto con 3.370 €/m² es un resultado medio, pero la ocupación es la más estable de la región. Con 250.000 € compras unos 74 m², más en Foietes y menos en Levante. Para alquiler corto elige Levante o Rincón de Loix; para largo, Foietes; para prestigio, Sierra Helada. El riesgo: la oferta turística crece más rápido que la demanda, así que revisa la licencia del edificio y la ocupación fuera de julio.",
      },
    ],
  },
  denia: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Denia to rynek portowy z rzadkim atutem: regularnym połączeniem promowym z Ibizą i Formenterą, które pracuje przez cały rok. 45 tys. mieszkańców, 2 200 transakcji rocznie i mediana 3 100 €/m², czyli 400 €/m² powyżej średniej regionu przy dynamice 8,2% r/r. Ekspozycja oferty to 115 dni, bo klient tu porównuje, a nie kupuje pod wpływem jednego widoku.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Rozpiętość 530 €/m² biegnie od Montgó (3 310 €/m²) do La Xara (2 780 €/m²). Pomiędzy nimi są Las Marinas (3 260) z willami przy Playa de les Deveses, Les Marines (3 150) z największym wyborem nowych inwestycji z basenem oraz Puerto (3 040), gdzie mieszkania stoją przy Marina de Denia i terminalu promowym. La Xara jest najtańsza, bo leży w głębi lądu, blisko Golf La Sella.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Cenę buduje bliskość wody i portu, ale też cień Montgó, który schładza wieczory i podnosi wartość willi na zboczu. 36% kupujących to obcokrajowcy, Polacy 5% - dominują klienci z Europy Zachodniej oraz osoby pracujące zdalnie, dla których liczy się terminal promowy i targ rybny. Uwaga na strefę przy Puerto: najem krótkoterminowy jest tu najbardziej rotacyjny, ale też najbardziej wrażliwy na sezon.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,6% brutto przy 3 100 €/m² to poziom zbliżony do Calpe, ale z lepszą dywersyfikacją popytu dzięki promowi. Za 250 tys. € kupisz około 81 m², w La Xara więcej, na Montgó mniej. Pod najem sezonowy najlepszy jest Puerto i Les Marines, pod długoterminowy La Xara, pod prestiż i widoki Montgó. Sprawdź, czy nieruchomość leży w strefie hałasu portu - apartamenty z widokiem na marinę płacą za lokalizację także nocą.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Denia is a port market with a rare asset: a scheduled ferry to Ibiza and Formentera that runs all year. 45,000 residents, 2,200 transactions a year and a 3,100 €/m² median, 400 €/m² above the regional average with 8.2% annual growth. Time on market reaches 115 days because buyers here compare rather than fall for a single view.",
      },
      {
        title: "Spread across districts",
        body: "The 530 €/m² range runs from Montgó (3,310 €/m²) to La Xara (2,780 €/m²). In between sit Las Marinas (3,260) with villas by Playa de les Deveses, Les Marines (3,150) with the widest choice of new pool schemes, and Puerto (3,040), where flats stand next to Marina de Denia and the ferry terminal. La Xara is cheapest because it sits inland, close to Golf La Sella.",
      },
      {
        title: "Micro-local factors",
        body: "Price is built by water and port access, plus the shade of Montgó, which cools evenings and lifts hillside villa values. Foreign buyers make up 36% and Polish buyers 5%, mostly western Europeans and remote workers for whom the ferry terminal and fish market matter. Watch the Puerto area: short lets churn fastest there and are the most season-sensitive.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.6% gross yield at 3,100 €/m² is close to Calpe, but demand is better diversified thanks to the ferry. 250,000 € buys about 81 m², more in La Xara and less on Montgó. For seasonal letting pick Puerto and Les Marines, for long lets La Xara, for prestige and views Montgó. Check whether the unit sits in the port noise zone - marina views are also paid for at night.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Denia es un mercado portuario con un activo poco común: ferry regular a Ibiza y Formentera que opera todo el año. 45.000 habitantes, 2.200 operaciones al año y una mediana de 3.100 €/m², 400 €/m² sobre la media regional con un crecimiento del 8,2% anual. La exposición llega a 115 días porque el comprador aquí compara en lugar de enamorarse de una vista.",
      },
      {
        title: "Diferencial entre barrios",
        body: "La horquilla de 530 €/m² va de Montgó (3.310 €/m²) a La Xara (2.780 €/m²). Entre medias están Las Marinas (3.260) con chalets junto a Playa de les Deveses, Les Marines (3.150) con la mayor oferta de obra nueva con piscina y Puerto (3.040), con pisos junto a Marina de Denia y la terminal de ferry. La Xara es la más barata porque queda tierra adentro, cerca de Golf La Sella.",
      },
      {
        title: "Factores microlocales",
        body: "El precio lo construyen el agua y el puerto, más la sombra del Montgó, que enfría las tardes y eleva el valor de los chalets en ladera. El 36% de los compradores es extranjero y los polacos el 5%, sobre todo europeos occidentales y teletrabajadores para quienes cuentan la terminal y la lonja. Ojo con Puerto: el alquiler corto rota más y es el más sensible a la temporada.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,6% bruto con 3.100 €/m² está cerca de Calpe, pero con demanda más diversificada gracias al ferry. Con 250.000 € compras unos 81 m², más en La Xara y menos en Montgó. Para temporada, Puerto y Les Marines; para largo, La Xara; para prestigio y vistas, Montgó. Comprueba si la vivienda está en la zona de ruido del puerto: las vistas a la marina también se pagan de noche.",
      },
    ],
  },
  javea: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Jávea to najbardziej luksusowy adres Costa Blanca Norte i zarazem rynek najdroższy w naszej bazie: 29 tys. mieszkańców, 1 100 transakcji rocznie i mediana 4 400 €/m², czyli 1 700 €/m² powyżej średniej regionu. Dynamika 10,4% r/r jest najwyższa na całym wybrzeżu, ale ekspozycja 140 dni pokazuje, że to rynek głębokiej kieszeni, nie szybkiej rotacji.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Cap Martí (4 890 €/m²) a Tosalet (4 020 €/m²) leży 870 €/m² - największa rozpiętość w regionie. Po drodze są Montañar (4 670) z willami nad skalistym wybrzeżem i Cap Prim, Puerto (4 450) przy Lonja de Jávea oraz Arenal (4 290), jedyna szeroka piaszczysta plaża z pełną infrastrukturą i szkołami. Tosalet to grodzone osiedla z basenami przy Golf Jávea, dlatego wchodzi najtaniej.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu nie kupuje się metra, tylko ekspozycję: willa na klifie w Cap Martí jest warta więcej niż identyczna o 500 m dalej. 50% nabywców to obcokrajowcy (Polacy 6%), w dużej mierze klienci z Europy Północnej szukający drugiego domu, a nie dochodu. Arenal pracuje na rodzinach i szkołach, Puerto na gastronomii i targu rybnym, Tosalet na prywatności - każda z tych stref ma innego najemcę i inny kalendarz sezonu.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 4,9% brutto to najniższa stopa w regionie, a przy 140 dniach ekspozycji wyjście wymaga cierpliwości. Za 250 tys. € kupisz jedynie około 57 m², w Tosalet nieco więcej. To rynek ochrony kapitału, nie cash-flow: sens ma zakup w Arenal pod najem rodzinny albo w Tosalet pod najem długoterminowy, a nie spekulacja klifem. Sprawdź plan urbanistyczny - część działek przy Montañar i Cap Martí ma ograniczenia zabudowy.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Jávea is the most exclusive address on Costa Blanca Norte and the priciest market in our dataset: 29,000 residents, 1,100 transactions a year and a 4,400 €/m² median, 1,700 €/m² above the regional average. Growth of 10.4% year on year is the highest on the coast, but 140 days on market shows this is a deep-pocket market, not a fast-turn one.",
      },
      {
        title: "Spread across districts",
        body: "Between Cap Martí (4,890 €/m²) and Tosalet (4,020 €/m²) sits 870 €/m², the widest range in the region. In between are Montañar (4,670) with villas above the rocky shore and Cap Prim, Puerto (4,450) by the Lonja de Jávea, and Arenal (4,290), the only wide sandy beach with full services and schools. Tosalet offers gated pool estates by Golf Jávea, which is why it enters cheapest.",
      },
      {
        title: "Micro-local factors",
        body: "Buyers here purchase exposure, not square metres: a clifftop villa in Cap Martí beats an identical one 500 m away. Foreign buyers make up 50% (Polish 6%), largely northern Europeans after a second home rather than income. Arenal works on families and schools, Puerto on restaurants and the fish market, Tosalet on privacy, so each area has a different tenant and a different season.",
      },
      {
        title: "Investor takeaway",
        body: "A 4.9% gross yield is the lowest in the region, and with 140 days on market the exit needs patience. 250,000 € buys only about 57 m², a little more in Tosalet. This is capital preservation, not cash-flow: buying in Arenal for family lets or Tosalet for long lets makes sense; speculating on the cliff does not. Check the urban plan, as some plots in Montañar and Cap Martí carry building restrictions.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Jávea es la dirección más exclusiva de Costa Blanca Norte y el mercado más caro de nuestra base: 29.000 habitantes, 1.100 operaciones al año y una mediana de 4.400 €/m², 1.700 €/m² sobre la media regional. El crecimiento del 10,4% interanual es el más alto de la costa, pero 140 días de exposición indican un mercado de bolsillo profundo, no de rotación rápida.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Cap Martí (4.890 €/m²) y Tosalet (4.020 €/m²) hay 870 €/m², la mayor horquilla de la región. Entre medias están Montañar (4.670) con chalets sobre la costa rocosa y Cap Prim, Puerto (4.450) junto a la Lonja de Jávea y Arenal (4.290), la única playa amplia de arena con servicios y colegios. Tosalet son urbanizaciones cerradas con piscina junto a Golf Jávea, por eso entra más barato.",
      },
      {
        title: "Factores microlocales",
        body: "Aquí se compra exposición, no metros: un chalet en el acantilado de Cap Martí vale más que otro idéntico 500 m más allá. El 50% de los compradores es extranjero (polacos 6%), sobre todo del norte de Europa buscando segunda residencia, no renta. Arenal funciona con familias y colegios, Puerto con restauración y lonja, Tosalet con privacidad: cada zona tiene su inquilino y su temporada.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 4,9% bruto es la rentabilidad más baja de la región y, con 140 días en mercado, la salida exige paciencia. Con 250.000 € compras solo unos 57 m², algo más en Tosalet. Es protección de capital, no cash-flow: tiene sentido comprar en Arenal para alquiler familiar o en Tosalet para largo plazo; especular con el acantilado, no. Revisa el planeamiento: parte de las parcelas en Montañar y Cap Martí tienen limitaciones.",
      },
    ],
  },
  "san-miguel-de-salinas": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "San Miguel de Salinas to wiejski rynek w głębi Costa Blanca Sur: 8 tys. mieszkańców, zaledwie 350 transakcji rocznie i mediana 2 060 €/m², czyli 640 €/m² poniżej średniej regionu. Dynamika 7,0% r/r jest umiarkowana, ale ROI 6,5% brutto to najwyższa stopa w całej bazie, bo niskie wejście rekompensuje mniejszy popyt.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Rozpiętość jest tu najmniejsza w regionie: 110 €/m² między Centro (2 010 €/m²) a La Pedrera (1 900 €/m²). Środek zajmuje El Chaparral (1 960) - osiedla willowe z basenami przy El Chaparral Golf, popularne wśród inwestorów z Polski. La Pedrera to zabudowa wiejska i fincas z potencjałem remontowym, a Centro oferuje widok na laguny Lagunas de La Mata i kościół Iglesia de San Miguel.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Kompromis jest czytelny: 15 minut autem do plaży w zamian za metr o połowę tańszy niż nad wodą. 38% kupujących to obcokrajowcy, a Polacy stanowią 8% - drugi najwyższy udział w regionie - co widać w ofercie usług i w tym, kto kupuje w El Chaparral. Popyt opiera się na najmie długoterminowym rodzin i pracowników, nie na turystyce, więc sezonowość jest tu najmniejsza na wybrzeżu.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,5% brutto przy 2 060 €/m² daje najlepszy zwrot gotówkowy w bazie, ale trzeba zaakceptować ryzyko płynności: 350 transakcji rocznie oznacza, że sprzedaż może potrwać. Za 250 tys. € kupisz około 121 m², czyli dom z działką. El Chaparral wybierz pod najem długoterminowy i basen, La Pedrera pod remont i odsprzedaż z wartością dodaną. Zanim kupisz, policz koszt dojazdu i sprawdź, czy działka ma dostęp do wody i prądu.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "San Miguel de Salinas is a rural market inland on Costa Blanca Sur: 8,000 residents, only 350 transactions a year and a 2,060 €/m² median, 640 €/m² below the regional average. Growth of 7.0% is moderate, yet a 6.5% gross yield is the highest in our dataset, because a low entry price offsets thinner demand.",
      },
      {
        title: "Spread across districts",
        body: "The range is the narrowest in the region: 110 €/m² between Centro (2,010 €/m²) and La Pedrera (1,900 €/m²). In the middle sits El Chaparral (1,960), pool villas by El Chaparral Golf popular with Polish investors. La Pedrera offers rural housing and fincas with renovation upside, while Centro overlooks the Lagunas de La Mata and the Iglesia de San Miguel.",
      },
      {
        title: "Micro-local factors",
        body: "The trade-off is explicit: fifteen minutes by car to the beach in exchange for a square metre at half the waterfront price. Foreign buyers make up 38% and Polish buyers 8%, the second highest share in the region, which shows in the services offered and in who buys in El Chaparral. Demand rests on long lets to families and workers, not tourism, so seasonality is the lowest on the coast.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.5% gross yield at 2,060 €/m² delivers the best cash return in the dataset, but you must accept liquidity risk: 350 transactions a year means a sale can take time. 250,000 € buys about 121 m², meaning a house with a plot. Choose El Chaparral for long lets and a pool, La Pedrera for renovation and resale upside. Before buying, price the commute and check the plot has water and power connections.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "San Miguel de Salinas es un mercado rural del interior de Costa Blanca Sur: 8.000 habitantes, solo 350 operaciones al año y una mediana de 2.060 €/m², 640 €/m² por debajo de la media regional. El crecimiento del 7,0% es moderado, pero el 6,5% bruto es la rentabilidad más alta de nuestra base, porque una entrada baja compensa una demanda más fina.",
      },
      {
        title: "Diferencial entre barrios",
        body: "La horquilla es la más estrecha de la región: 110 €/m² entre Centro (2.010 €/m²) y La Pedrera (1.900 €/m²). En medio está El Chaparral (1.960), urbanizaciones con piscina junto a El Chaparral Golf, populares entre inversores polacos. La Pedrera ofrece vivienda rural y fincas con potencial de reforma, y Centro mira a las Lagunas de La Mata y la Iglesia de San Miguel.",
      },
      {
        title: "Factores microlocales",
        body: "El intercambio es explícito: quince minutos en coche a la playa a cambio de un metro a mitad de precio que en primera línea. El 38% de los compradores es extranjero y los polacos son el 8%, el segundo mayor peso de la región, algo que se nota en los servicios y en quién compra en El Chaparral. La demanda se apoya en alquiler largo a familias y trabajadores, no en turismo, así que la estacionalidad es la más baja de la costa.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,5% bruto con 2.060 €/m² da el mejor retorno de caja de la base, pero exige aceptar riesgo de liquidez: 350 operaciones al año implican que una venta puede tardar. Con 250.000 € compras unos 121 m², es decir, una casa con parcela. Elige El Chaparral para alquiler largo y piscina, La Pedrera para reforma y reventa. Antes de comprar, calcula el trayecto y comprueba que la parcela tenga agua y luz.",
      },
    ],
  },
  "orihuela-costa": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Orihuela Costa to najbardziej międzynarodowy rynek Costa Blanca Sur: 30 tys. mieszkańców, 2 800 transakcji rocznie, mediana 2 900 €/m² przy dynamice 9,1% r/r i ekspozycji zaledwie 90 dni - najkrótszej w całej bazie. To nie przypadek: 55% kupujących to obcokrajowcy, a Polacy stanowią 11%, najwięcej w regionie, co tworzy realny, wielojęzyczny popyt przez cały rok.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Rozpiętość 590 €/m² biegnie od Cabo Roig (3 390 €/m²) do Lomas de Cabo Roig (2 800 €/m²). Po drodze są La Zenia (3 280) wokół Zenia Boulevard i Cala Capitán, Dehesa de Campoamor (3 170) z szeroką plażą i willami z basenem, Villamartín (3 060) przy polu golfowym oraz Mil Palmeras (3 010) z nowymi osiedlami między Punta Prima a Torrevieja. Lomas jest najtańszy, bo leży najdalej od linii brzegowej.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Cenę tworzy pakiet: plaża plus golf plus handel. Cabo Roig przyciąga kupujących z Irlandii i Polski blisko Cala Caleta, Villamartín pracuje na społeczności golfowej z restauracjami w zasięgu spaceru, a La Zenia żyje z Zenia Boulevard - największego centrum handlowego w regionie. Uwaga na wspólnoty w nowych osiedlach z basenem i ochroną: to stała pozycja w budżecie, która przy najmie długoterminowym zjada kilka punktów ROI.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,1% brutto przy 2 900 €/m² i wyjściu w 90 dni to najlepsza kombinacja zwrotu i płynności na Costa Blanca Sur. Za 250 tys. € kupisz około 86 m². Pod najem sezonowy najlepsze są Cabo Roig i La Zenia, pod długoterminowy Villamartín i Lomas, pod nowe z basenem Mil Palmeras. Sprawdź, czy osiedle ma licencję turystyczną i ile wynosi comunidad - w tej strefie to często różnica między 6% a 5% netto.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Orihuela Costa is the most international market on Costa Blanca Sur: 30,000 residents, 2,800 transactions a year, a 2,900 €/m² median, 9.1% annual growth and just 90 days on market - the shortest in our dataset. Not by chance: 55% of buyers are foreign and Polish buyers make up 11%, the highest share in the region, creating genuine multilingual demand all year.",
      },
      {
        title: "Spread across districts",
        body: "The 590 €/m² range runs from Cabo Roig (3,390 €/m²) to Lomas de Cabo Roig (2,800 €/m²). In between sit La Zenia (3,280) around Zenia Boulevard and Cala Capitán, Dehesa de Campoamor (3,170) with a wide beach and pool villas, Villamartín (3,060) by the golf course, and Mil Palmeras (3,010) with new schemes between Punta Prima and Torrevieja. Lomas is cheapest because it sits furthest from the shoreline.",
      },
      {
        title: "Micro-local factors",
        body: "Price is the package: beach plus golf plus retail. Cabo Roig draws Irish and Polish buyers near Cala Caleta, Villamartín works on the golf community with restaurants within walking distance, and La Zenia lives off Zenia Boulevard, the region's largest shopping centre. Watch community fees in new gated pool estates: a fixed cost that can shave several points off net yield on long lets.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.1% gross yield at 2,900 €/m² with a 90-day exit is the best combination of return and liquidity on Costa Blanca Sur. 250,000 € buys about 86 m². For seasonal letting pick Cabo Roig or La Zenia, for long lets Villamartín and Lomas, for new pool schemes Mil Palmeras. Check the tourist licence and the community fee - here that is often the difference between 6% and 5% net.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Orihuela Costa es el mercado más internacional de Costa Blanca Sur: 30.000 habitantes, 2.800 operaciones al año, mediana de 2.900 €/m², crecimiento del 9,1% y solo 90 días de exposición, la más corta de nuestra base. No es casualidad: el 55% de los compradores es extranjero y los polacos son el 11%, el mayor peso de la región, lo que genera demanda multilingüe todo el año.",
      },
      {
        title: "Diferencial entre barrios",
        body: "La horquilla de 590 €/m² va de Cabo Roig (3.390 €/m²) a Lomas de Cabo Roig (2.800 €/m²). Entre medias están La Zenia (3.280) en torno a Zenia Boulevard y Cala Capitán, Dehesa de Campoamor (3.170) con playa amplia y chalets con piscina, Villamartín (3.060) junto al campo de golf y Mil Palmeras (3.010) con promociones nuevas entre Punta Prima y Torrevieja. Lomas es el más barato por estar más lejos de la costa.",
      },
      {
        title: "Factores microlocales",
        body: "El precio es un paquete: playa, golf y comercio. Cabo Roig atrae compradores irlandeses y polacos junto a Cala Caleta, Villamartín funciona con la comunidad de golf y restaurantes a pie, y La Zenia vive de Zenia Boulevard, el mayor centro comercial de la región. Ojo con las comunidades de las urbanizaciones nuevas con piscina y seguridad: es un coste fijo que resta varios puntos de rentabilidad neta.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,1% bruto con 2.900 €/m² y salida en 90 días es la mejor combinación de retorno y liquidez de Costa Blanca Sur. Con 250.000 € compras unos 86 m². Para temporada, Cabo Roig y La Zenia; para largo, Villamartín y Lomas; para obra nueva con piscina, Mil Palmeras. Comprueba la licencia turística y la cuota de comunidad: aquí suele ser la diferencia entre un 6% y un 5% neto.",
      },
    ],
  },
  altea: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Altea to rynek artystyczny i premium zarazem: 23 tys. mieszkańców, 900 transakcji rocznie, mediana 3 680 €/m² (+980 wobec średniej regionu) i dynamika 9,8% r/r. Ekspozycja 130 dni mówi wszystko: tu nie sprzedaje się metrażu, a konkretny widok na zatokę i kopułę Iglesia del Consuelo, więc kupujący porównuje dłużej niż w Torrevieja.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Altea Hills (4 430 €/m²) a Cap Blanc (3 730 €/m²) leży 700 €/m². Po drodze są Mascarat (4 220) na klifie nad Playa Mascarat, Casco Antiguo (3 890) z wąskimi uliczkami, galeriami i kamienicami z widokiem na zatokę oraz Playa de la Roda (3 780) przy deptaku i Puerto Deportivo. Cap Blanc wchodzi najtaniej, bo to spokojna strefa willowa z dobrym dojazdem do AP-7, bez bezpośredniej linii plaży.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "W Altei cena to widok plus prywatność: w Altea Hills grodzone osiedla z ochroną 24 h i basenami osiągają stawki, jakich nie ma żadne inne miasto w tej części wybrzeża. 44% kupujących to obcokrajowcy, Polacy 6% - dominują klienci z Europy Zachodniej, często artyści i pracujący zdalnie. Casco Antiguo żyje z gastronomii i turystyki dziennej, Mascarat z prestiżu, a Playa de la Roda z rodzin, dla których liczy się deptak i przystań jachtowa.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,3% brutto przy 3 680 €/m² to wynik umiarkowany, a 130 dni ekspozycji oznacza, że wyjście wymaga cierpliwości. Za 250 tys. € kupisz około 68 m², w Cap Blanc więcej, w Altea Hills znacznie mniej. Pod najem sezonowy najlepsza jest Playa de la Roda i Casco Antiguo, pod długoterminowy Cap Blanc, pod prestiż i odsprzedaż Altea Hills. Sprawdź plan zagospodarowania: w rejonie Mascarat i Cap Blanc część działek ma ograniczenia wynikające z ochrony klifu.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Altea is an artistic and premium market at once: 23,000 residents, 900 transactions a year, a 3,680 €/m² median (980 above the regional average) and 9.8% annual growth. The 130 days on market say it plainly: buyers here purchase a specific bay view and the dome of Iglesia del Consuelo, not floor area.",
      },
      {
        title: "Spread across districts",
        body: "Between Altea Hills (4,430 €/m²) and Cap Blanc (3,730 €/m²) sits 700 €/m². In between are Mascarat (4,220) on the cliff above Playa Mascarat, Casco Antiguo (3,890) with narrow lanes, galleries and bay-view townhouses, and Playa de la Roda (3,780) by the promenade and Puerto Deportivo. Cap Blanc enters cheapest: a quiet villa area with quick AP-7 access and no direct beach line.",
      },
      {
        title: "Micro-local factors",
        body: "In Altea price equals view plus privacy: gated estates in Altea Hills with 24-hour security and pools reach levels no other town on this stretch matches. Foreign buyers make up 44%, Polish buyers 6%, mostly western Europeans, often artists and remote workers. Casco Antiguo runs on restaurants and day tourism, Mascarat on prestige, Playa de la Roda on families who value the promenade and marina.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.3% gross yield at 3,680 €/m² is moderate, and 130 days on market means the exit needs patience. 250,000 € buys about 68 m², more in Cap Blanc and far less in Altea Hills. For seasonal letting pick Playa de la Roda or Casco Antiguo, for long lets Cap Blanc, for prestige and resale Altea Hills. Check the urban plan: parts of Mascarat and Cap Blanc are constrained by cliff protection rules.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Altea es a la vez mercado artístico y premium: 23.000 habitantes, 900 operaciones al año, mediana de 3.680 €/m² (980 sobre la media regional) y crecimiento del 9,8%. Los 130 días de exposición lo dicen todo: aquí se compra una vista concreta a la bahía y la cúpula de Iglesia del Consuelo, no metros.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Altea Hills (4.430 €/m²) y Cap Blanc (3.730 €/m²) hay 700 €/m². Entre medias están Mascarat (4.220) en el acantilado sobre Playa Mascarat, Casco Antiguo (3.890) con calles estrechas, galerías y casas con vistas a la bahía, y Playa de la Roda (3.780) junto al paseo y el Puerto Deportivo. Cap Blanc es el más barato: zona tranquila de chalets con acceso rápido a la AP-7 y sin línea directa de playa.",
      },
      {
        title: "Factores microlocales",
        body: "En Altea el precio es vista más privacidad: las urbanizaciones cerradas de Altea Hills con seguridad 24 h y piscinas alcanzan niveles que ningún otro pueblo de esta costa iguala. El 44% de los compradores es extranjero y los polacos el 6%, sobre todo europeos occidentales, a menudo artistas y teletrabajadores. Casco Antiguo vive de restauración y turismo de día, Mascarat del prestigio y Playa de la Roda de familias que valoran paseo y marina.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,3% bruto con 3.680 €/m² es moderado y 130 días de exposición exigen paciencia en la salida. Con 250.000 € compras unos 68 m², más en Cap Blanc y mucho menos en Altea Hills. Para temporada, Playa de la Roda o Casco Antiguo; para largo, Cap Blanc; para prestigio y reventa, Altea Hills. Revisa el planeamiento: en Mascarat y Cap Blanc parte de las parcelas tienen limitaciones por protección del acantilado.",
      },
    ],
  },
  "guardamar-del-segura": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Guardamar del Segura to cichy rynek Costa Blanca Sur: 16 tys. mieszkańców, 700 transakcji rocznie, mediana 2 470 €/m² (-230 wobec regionu) przy dynamice 8,7% r/r i ekspozycji 105 dni. Jego przewaga nie leży w cenie, a w krajobrazie: miasta nie zabetonowano, bo wydmy i las sosnowy są prawnie chronione, więc podaż nad plażą jest skończona.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Cała rozpiętość to 430 €/m²: od Guardamar Playa (2 630 €/m²) do El Raso (2 200 €/m²). Między nimi leżą Moncayo (2 570) z szeroką plażą i wydmami, La Marina (2 520) z urbanizacjami willowymi przy ujściu Segury oraz Centro (2 300), gdzie przeważają mieszkania z lat 2000-2015 blisko Mercado Municipal. El Raso jest najtańszy, bo to nowe osiedla z basenami poza centrum, przy Golf La Marquesa.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o wartości decyduje sąsiedztwo parku Alfonso XIII i dostępu do plaży, nie sam metraż. 42% kupujących to obcokrajowcy, Polacy 8% - zauważalnie więcej niż w sąsiedniej Torrevieja. Guardamar Playa przyciąga rodziny szukające spokoju bez masowej turystyki, La Marina klientów z dużymi działkami i basenem, a El Raso osoby pracujące zdalnie, dla których liczy się cena wejścia i bliskość natury, nie gastronomia.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,3% brutto przy 2 470 €/m² i ograniczonej podaży to solidny profil dochodowy z potencjałem wzrostu. Za 250 tys. € kupisz około 101 m². Pod najem sezonowy najlepsze są Moncayo i Guardamar Playa, pod długoterminowy Centro i El Raso, pod odsprzedaż La Marina z działką. Główne ryzyko to wolumen: 700 transakcji rocznie oznacza, że sprzedaż potrwa dłużej niż w Torrevieja - planuj wyjście z wyprzedzeniem, nie w pośpiechu.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Guardamar del Segura is a quiet Costa Blanca Sur market: 16,000 residents, 700 transactions a year, a 2,470 €/m² median (230 below the region) with 8.7% annual growth and 105 days on market. Its edge is not price but landscape: the town was never overbuilt because the dunes and pine forest are protected, so supply by the beach is finite.",
      },
      {
        title: "Spread across districts",
        body: "The whole range is 430 €/m²: from Guardamar Playa (2,630 €/m²) to El Raso (2,200 €/m²). In between sit Moncayo (2,570) with a wide beach and dunes, La Marina (2,520) with villa estates by the Segura mouth, and Centro (2,300), where 2000-2015 flats cluster near Mercado Municipal. El Raso is cheapest because it offers new pool schemes outside the centre, close to Golf La Marquesa.",
      },
      {
        title: "Micro-local factors",
        body: "Value here follows proximity to Parque Alfonso XIII and beach access rather than floor area. Foreign buyers make up 42% and Polish buyers 8%, clearly above neighbouring Torrevieja. Guardamar Playa attracts families wanting calm without mass tourism, La Marina buyers after large plots with a pool, and El Raso remote workers for whom entry price and nature matter more than restaurants.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.3% gross yield at 2,470 €/m² with capped supply is a solid income profile with upside. 250,000 € buys about 101 m². For seasonal letting pick Moncayo or Guardamar Playa, for long lets Centro and El Raso, for resale La Marina with a plot. The main risk is volume: 700 transactions a year means a sale takes longer than in Torrevieja, so plan the exit early rather than in a hurry.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Guardamar del Segura es un mercado tranquilo de Costa Blanca Sur: 16.000 habitantes, 700 operaciones al año, mediana de 2.470 €/m² (-230 frente a la región), crecimiento del 8,7% y 105 días de exposición. Su ventaja no es el precio sino el paisaje: el pueblo no se masificó porque dunas y pinar están protegidos, así que la oferta junto a la playa es finita.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Toda la horquilla son 430 €/m²: de Guardamar Playa (2.630 €/m²) a El Raso (2.200 €/m²). Entre medias están Moncayo (2.570) con playa amplia y dunas, La Marina (2.520) con urbanizaciones de chalets junto a la desembocadura del Segura y Centro (2.300), con pisos de 2000-2015 cerca del Mercado Municipal. El Raso es el más barato: urbanizaciones nuevas con piscina fuera del centro, junto a Golf La Marquesa.",
      },
      {
        title: "Factores microlocales",
        body: "El valor sigue la cercanía al Parque Alfonso XIII y el acceso a la playa, no los metros. El 42% de los compradores es extranjero y los polacos el 8%, muy por encima de la vecina Torrevieja. Guardamar Playa atrae familias que buscan calma sin turismo masivo, La Marina compradores de parcelas grandes con piscina y El Raso a teletrabajadores para quienes cuentan el precio de entrada y la naturaleza.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,3% bruto con 2.470 €/m² y oferta limitada es un perfil de renta sólido con recorrido. Con 250.000 € compras unos 101 m². Para temporada, Moncayo y Guardamar Playa; para largo, Centro y El Raso; para reventa, La Marina con parcela. El riesgo es el volumen: 700 operaciones al año implican ventas más lentas que en Torrevieja, así que planifica la salida con tiempo.",
      },
    ],
  },
  "santa-pola": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Santa Pola to port rybacki, który wycenia się taniej niż sąsiedzi: 35 tys. mieszkańców, 1 200 transakcji rocznie, mediana 2 350 €/m² (-350 wobec regionu) przy dynamice 8,4% i ekspozycji 100 dni. Miasto nie sprzedaje wakacyjnego wizerunku, tylko pracę i morze, dlatego ROI 6,4% brutto jest jednym z najwyższych na Costa Blanca Sur.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Cała rozpiętość to 380 €/m²: od Playa de Levante (2 570 €/m²) do Centro (2 190 €/m²). Pomiędzy nimi są Varadero (2 460) za mariną z widokiem na port, Playa Lisa (2 410) z tanim tarasem i dobrym stosunkiem ceny do lokalizacji oraz Gran Alacant (2 300) - duże osiedla z basenami i ochroną, najbliżej lotniska w Alicante. Centro jest najtańsze, bo to portowa tkanka z pełną infrastrukturą, ale bez bezpośredniego dostępu do plaży.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Wartość buduje tu port i rezerwat, nie deptak: flota rybacka daje całoroczny ruch, a Salinas de Santa Pola przyciągają flamingi i turystów poza sezonem. 34% kupujących to obcokrajowcy, Polacy 6% - mniej niż w Torrevieja czy Orihuela Costa, więc rynek jest bardziej lokalny i mniej podatny na modę. Gran Alacant wybierają osoby pracujące w Alicante i często latające, Varadero - ci, którzy chcą mieszkać nad portem, a Playa de Levante rodziny z dziećmi.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,4% brutto przy 2 350 €/m² i krótkim dojeździe do lotniska to profil pod najem długoterminowy, nie pod turystykę. Za 250 tys. € kupisz około 106 m². Pod stabilny dochód wybierz Centro i Gran Alacant, pod sezon Varadero i Playa de Levante, pod odsprzedaż Playa Lisa. Uwaga na strefę portu: hałas i zapach ryb bywają uciążliwe latem, a mimo to wpływają na cenę - oglądaj nieruchomość wieczorem, nie w południe.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Santa Pola is a fishing port priced below its neighbours: 35,000 residents, 1,200 transactions a year, a 2,350 €/m² median (350 under the region) with 8.4% growth and 100 days on market. The town does not sell a holiday image but work and sea, which is why a 6.4% gross yield is among the highest on Costa Blanca Sur.",
      },
      {
        title: "Spread across districts",
        body: "The range is 380 €/m²: from Playa de Levante (2,570 €/m²) to Centro (2,190 €/m²). In between sit Varadero (2,460) behind the marina with port views, Playa Lisa (2,410) with affordable terraces and a good price-to-location ratio, and Gran Alacant (2,300), large gated estates with pools and the shortest drive to Alicante airport. Centro is cheapest: a port fabric with full services but no direct beach.",
      },
      {
        title: "Micro-local factors",
        body: "Value comes from the port and the reserve, not the promenade: the fishing fleet keeps activity all year and the Salinas de Santa Pola draw flamingos and visitors off season. Foreign buyers make up 34% and Polish buyers 6%, less than in Torrevieja or Orihuela Costa, so the market is more local and less fashion-driven. Gran Alacant suits commuters and frequent flyers, Varadero those wanting to live by the harbour, Playa de Levante families.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.4% gross yield at 2,350 €/m² with a short airport run fits long-term letting rather than tourism. 250,000 € buys about 106 m². For steady income pick Centro and Gran Alacant, for season Varadero and Playa de Levante, for resale Playa Lisa. Watch the port zone: noise and fish smells can bite in summer yet shape the price, so view the property in the evening, not at noon.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Santa Pola es un puerto pesquero que cotiza por debajo de sus vecinos: 35.000 habitantes, 1.200 operaciones al año, mediana de 2.350 €/m² (-350 frente a la región), crecimiento del 8,4% y 100 días de exposición. La villa no vende imagen vacacional sino trabajo y mar, por eso un 6,4% bruto está entre las rentabilidades más altas de Costa Blanca Sur.",
      },
      {
        title: "Diferencial entre barrios",
        body: "La horquilla son 380 €/m²: de Playa de Levante (2.570 €/m²) a Centro (2.190 €/m²). Entre medias están Varadero (2.460) tras la marina con vistas al puerto, Playa Lisa (2.410) con terrazas asequibles y buena relación precio-ubicación, y Gran Alacant (2.300), urbanizaciones grandes con piscina y seguridad y el trayecto más corto al aeropuerto de Alicante. Centro es el más barato: tejido portuario con servicios completos pero sin playa directa.",
      },
      {
        title: "Factores microlocales",
        body: "El valor lo aportan el puerto y la reserva, no el paseo: la flota pesquera mantiene actividad todo el año y las Salinas de Santa Pola atraen flamencos y visitantes fuera de temporada. El 34% de los compradores es extranjero y los polacos el 6%, menos que en Torrevieja u Orihuela Costa, así que el mercado es más local y menos dependiente de modas. Gran Alacant encaja con quien trabaja en Alicante y viaja a menudo; Varadero, con quien quiere vivir junto al puerto; Playa de Levante, con familias.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,4% bruto con 2.350 €/m² y un aeropuerto cerca encaja con alquiler largo, no con turismo. Con 250.000 € compras unos 106 m². Para renta estable elige Centro y Gran Alacant; para temporada, Varadero y Playa de Levante; para reventa, Playa Lisa. Ojo con la zona portuaria: ruido y olor a pescado molestan en verano y aun así condicionan el precio, así que visita la vivienda por la tarde, no al mediodía.",
      },
    ],
  },
  cartagena: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Cartagena to jedyne duże miasto w naszej bazie: 215 tys. mieszkańców, 3 400 transakcji rocznie i mediana 1 960 €/m², czyli tylko 60 €/m² powyżej mediany Costa Cálida przy dynamice 7,2% r/r. Ekspozycja 110 dni wynika z rozmiaru rynku, nie z braku popytu: tu kupują przede wszystkim mieszkańcy i pracownicy portu, a nie klienci z północy Europy.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między La Azohía (2 230 €/m²) a Santa Lucía (1 750 €/m²) leży 480 €/m². Po drodze są Isla Plana (2 120) przy skalistym wybrzeżu i Sierra de la Muela oraz Centro (1 850), gdzie kamienice stoją wokół Puerto de Cartagena i Teatro Romano, blisko dworca i uczelni. Santa Lucía jest najtańsza, bo to budownictwo z lat 80. i 2000 z dobrą komunikacją autobusową, ale bez widoku na morze.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o cenie decyduje praca, nie turystyka: tylko 18% kupujących to obcokrajowcy, a Polacy 3% - najmniej w całej bazie. Port wojenny i handlowy, stocznia oraz uczelnia generują popyt całoroczny, dlatego ROI 6,5% brutto jest trwałe, a nie sezonowe. La Azohía i Isla Plana to jedyne strefy wypoczynkowe, gdzie ceny zachowują się jak nad Costa Blanca, ale podaż nowych inwestycji jest tam bardzo niska.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,5% brutto przy 1 960 €/m² i realnym popycie lokalnym to profil pod najem długoterminowy, nie pod turystę. Za 250 tys. € kupisz około 127 m². Pod stabilny dochód wybierz Centro i Santa Lucía, pod najem sezonowy La Azohía i Isla Plana. Ryzykiem jest wiek budynków w centrum: sprawdź stan instalacji i koszt wspólnoty, bo w kamienicach z lat 60. i 70. remont elewacji potrafi zjeść roczny czynsz.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Cartagena is the only large city in our dataset: 215,000 residents, 3,400 transactions a year and a 1,960 €/m² median, just 60 €/m² above the Costa Cálida median with 7.2% annual growth. The 110 days on market reflect the size of the market, not a lack of demand: buyers here are residents and port workers, not northern European second-home owners.",
      },
      {
        title: "Spread across districts",
        body: "Between La Azohía (2,230 €/m²) and Santa Lucía (1,750 €/m²) sits 480 €/m². In between are Isla Plana (2,120) on the rocky shore by Sierra de la Muela and Centro (1,850), where townhouses surround Puerto de Cartagena and Teatro Romano, close to the station and the university. Santa Lucía is cheapest: 1980s and 2000s housing with good buses but no sea view.",
      },
      {
        title: "Micro-local factors",
        body: "Price here follows employment, not tourism: only 18% of buyers are foreign and Polish buyers just 3%, the lowest in our dataset. The naval and commercial port, the shipyard and the university generate year-round demand, which is why a 6.5% gross yield is durable rather than seasonal. La Azohía and Isla Plana are the only resort pockets behaving like the Costa Blanca, but new supply there is very thin.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.5% gross yield at 1,960 €/m² with genuine local demand suits long lets, not tourists. 250,000 € buys about 127 m². For steady income pick Centro and Santa Lucía, for seasonal letting La Azohía and Isla Plana. The risk is building age downtown: check the installations and community fee, because a facade renovation in a 1960s-70s block can swallow a year of rent.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Cartagena es la única ciudad grande de nuestra base: 215.000 habitantes, 3.400 operaciones al año y una mediana de 1.960 €/m², solo 60 €/m² por encima de la mediana de Costa Cálida, con un crecimiento del 7,2%. Los 110 días de exposición reflejan el tamaño del mercado, no falta de demanda: compran residentes y trabajadores del puerto, no europeos del norte.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre La Azohía (2.230 €/m²) y Santa Lucía (1.750 €/m²) hay 480 €/m². Entre medias están Isla Plana (2.120) en la costa rocosa junto a Sierra de la Muela y Centro (1.850), con casas alrededor del Puerto de Cartagena y el Teatro Romano, cerca de la estación y la universidad. Santa Lucía es el más barato: edificación de los 80 y 2000 con buen bus, pero sin vistas al mar.",
      },
      {
        title: "Factores microlocales",
        body: "Aquí el precio sigue al empleo, no al turismo: solo el 18% de los compradores es extranjero y los polacos el 3%, el menor peso de la base. El puerto militar y comercial, el astillero y la universidad generan demanda todo el año, por eso un 6,5% bruto es duradero y no estacional. La Azohía e Isla Plana son los únicos núcleos vacacionales que se comportan como la Costa Blanca, pero la oferta nueva allí es muy escasa.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,5% bruto con 1.960 €/m² y demanda local real encaja con alquiler largo, no con turismo. Con 250.000 € compras unos 127 m². Para renta estable elige Centro y Santa Lucía; para temporada, La Azohía e Isla Plana. El riesgo es la edad de los edificios del centro: revisa instalaciones y comunidad, porque rehabilitar una fachada de los 60-70 puede costar un año de alquiler.",
      },
    ],
  },
  "san-pedro-del-pinatar": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "San Pedro del Pinatar to jedyny rynek w bazie, którego marka stoi na zdrowiu, nie na widoku: 26 tys. mieszkańców, 1 100 transakcji rocznie i mediana 2 290 €/m², czyli 390 €/m² powyżej mediany Costa Cálida przy dynamice 8,1% r/r i ekspozycji 100 dni. Bliskość leczniczych bagien Salinas de San Pedro przyciąga klientów, którzy przyjeżdżają po kąpiele błotne, nie po plażę z folderu.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Cała rozpiętość to 320 €/m²: od Lo Pagán (2 450 €/m²) do Centro (2 130 €/m²). Pomiędzy nimi są El Mojón (2 400) przy granicy Costa Blanca i Cálida oraz Villananitos (2 350) z szeroką plażą, deptakiem i portem rybackim w zasięgu spaceru. Centro jest najtańsze, bo to zwykła miejska tkanka blisko urzędów, bez dostępu do wody - i właśnie dlatego daje najwyższy ROI w gminie (6,7%).",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "O wartości decyduje dostęp do Mar Menor przez mola kąpielowe, nie sama odległość od morza: w Lo Pagán apartament przy Playa de Villananitos jest wart więcej niż identyczny 800 m dalej. 38% kupujących to obcokrajowcy, Polacy 6%. Popyt sezonowy jest silny, ale w tym mieście miesza się z popytem sanatoryjnym - klienci balneologiczni przyjeżdżają też wiosną i jesienią, co wydłuża sezon najmu i stabilizuje obłożenie.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,6% brutto przy 2 290 €/m² to jeden z najlepszych wyników w regionie, a wydłużony sezon zmniejsza ryzyko pustostanu. Za 250 tys. € kupisz około 109 m². Pod najem sezonowy wybierz Lo Pagán i Villananitos, pod całoroczny Centro, pod prestiż i ciszę El Mojón. Sprawdź, czy budynek ma licencję turystyczną i czy wspólnota nie finansuje właśnie remontu elewacji - w nadmorskich blokach z lat 2000 to typowa pozycja.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "San Pedro del Pinatar is the only market in our dataset whose brand rests on health rather than views: 26,000 residents, 1,100 transactions a year and a 2,290 €/m² median, 390 €/m² above the Costa Cálida median with 8.1% growth and 100 days on market. Proximity to the therapeutic Salinas de San Pedro attracts visitors who come for mud baths, not for a brochure beach.",
      },
      {
        title: "Spread across districts",
        body: "The whole range is 320 €/m²: from Lo Pagán (2,450 €/m²) to Centro (2,130 €/m²). In between are El Mojón (2,400) on the Costa Blanca and Cálida border and Villananitos (2,350) with a wide beach, promenade and the fishing port within walking distance. Centro is cheapest because it is ordinary town fabric near the offices with no water access, which is exactly why it shows the highest yield in the municipality (6.7%).",
      },
      {
        title: "Micro-local factors",
        body: "Value follows access to the Mar Menor through the bathing jetties, not distance to the sea: a flat by Playa de Villananitos in Lo Pagán beats an identical one 800 m inland. Foreign buyers make up 38%, Polish buyers 6%. Seasonal demand is strong but mixes with spa demand, as balneology guests also arrive in spring and autumn, which lengthens the letting season and steadies occupancy.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.6% gross yield at 2,290 €/m² is one of the best in the region, and the longer season cuts void risk. 250,000 € buys about 109 m². For seasonal letting choose Lo Pagán and Villananitos, for year-round Centro, for prestige and quiet El Mojón. Check the tourist licence and whether the community is funding a facade renovation, a typical item in 2000s seafront blocks.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "San Pedro del Pinatar es el único mercado de la base cuya marca se apoya en la salud y no en las vistas: 26.000 habitantes, 1.100 operaciones al año y una mediana de 2.290 €/m², 390 €/m² sobre la mediana de Costa Cálida con un crecimiento del 8,1% y 100 días de exposición. La cercanía a los lodos medicinales de las Salinas de San Pedro atrae a quien viene por los baños, no por una playa de folleto.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Toda la horquilla son 320 €/m²: de Lo Pagán (2.450 €/m²) a Centro (2.130 €/m²). Entre medias están El Mojón (2.400) en el límite entre Costa Blanca y Cálida y Villananitos (2.350) con playa amplia, paseo y puerto pesquero a pie. Centro es el más barato porque es tejido urbano cerca de las oficinas sin acceso al agua, y por eso mismo da la mejor rentabilidad del municipio (6,7%).",
      },
      {
        title: "Factores microlocales",
        body: "El valor sigue el acceso al Mar Menor por los embarcaderos, no la distancia al mar: un piso junto a Playa de Villananitos en Lo Pagán vale más que otro idéntico 800 m tierra adentro. El 38% de los compradores es extranjero y los polacos el 6%. La demanda de temporada es fuerte pero se mezcla con la balnearia, porque el cliente de balneoterapia también llega en primavera y otoño, alargando la temporada y estabilizando la ocupación.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,6% bruto con 2.290 €/m² está entre los mejores de la región y la temporada larga reduce el riesgo de vacante. Con 250.000 € compras unos 109 m². Para temporada, Lo Pagán y Villananitos; para todo el año, Centro; para prestigio y calma, El Mojón. Comprueba licencia turística y si la comunidad financia una rehabilitación de fachada, típica en bloques de los 2000 en primera línea.",
      },
    ],
  },
  "los-alcazares": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Los Alcázares to rynek laguny: 17 tys. mieszkańców, 800 transakcji rocznie i mediana 2 190 €/m², czyli 290 €/m² powyżej mediany Costa Cálida. Dynamika 8,4% r/r i ekspozycja zaledwie 95 dni - najkrótsza w regionie - wynikają z jednego czynnika: Mar Menor jest płytki i ciepły, bez fal, więc kąpią się tu dzieci, a nie surfingują dorośli.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Rozpiętość 320 €/m²: od Playa (2 350 €/m²) do Punta Brava (2 030 €/m²). Po drodze są Los Narejos (2 250) z nowymi osiedlami z basenami i polem golfowym oraz Centro (2 090) z mieszkaniami blisko usług i Paseo del Mar Menor. Punta Brava jest najtańsza, bo to willowa zabudowa z lat 2000+ przy torze regatowym Centro de Alto Rendimiento - prestiż sportowy bez bezpośredniego dostępu do plaży.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o cenie decyduje nie widok, a bezpieczeństwo kąpieli i głębokość wody: apartament przy Playa de Los Alcázares jest wart więcej niż identyczny 400 m dalej, bo rodziny z dziećmi chcą wejść do wody bez stresu. 40% kupujących to obcokrajowcy, Polacy 7%. Los Narejos pracuje na najmie krótkoterminowym przez cały sezon, Centro na mieszkańcach i pracownikach okolicznych pól golfowych, a Punta Brava na sporcie i spokoju.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,8% brutto przy 2 190 €/m² i 95 dniach ekspozycji to najlepsza kombinacja płynności i zwrotu w Costa Cálida Norte. Za 250 tys. € kupisz około 114 m². Pod najem krótki wybierz Playa i Los Narejos, pod całoroczny Centro, pod spokój Punta Brava. Sprawdź dwie rzeczy: czy osiedle ma licencję turystyczną oraz czy nieruchomość leży w strefie, w której po ulewach pojawia się ryzyko zalania - w Los Alcázares to realny czynnik wyceny.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Los Alcázares is a lagoon market: 17,000 residents, 800 transactions a year and a 2,190 €/m² median, 290 €/m² above the Costa Cálida median. Growth of 8.4% and just 95 days on market, the shortest in the region, come down to one factor: the Mar Menor is shallow and warm with no waves, so children swim here and adults do not surf.",
      },
      {
        title: "Spread across districts",
        body: "The range is 320 €/m²: from Playa (2,350 €/m²) to Punta Brava (2,030 €/m²). In between sit Los Narejos (2,250) with new pool estates and a golf course, and Centro (2,090) with flats near services and Paseo del Mar Menor. Punta Brava is cheapest: 2000s villa stock by the Centro de Alto Rendimiento rowing course, sporting prestige without direct beach access.",
      },
      {
        title: "Micro-local factors",
        body: "Price follows safe bathing and water depth rather than views: a flat on Playa de Los Alcázares beats an identical one 400 m inland because families want to enter the water without stress. Foreign buyers make up 40%, Polish buyers 7%. Los Narejos runs on short lets through the season, Centro on residents and golf-course staff, and Punta Brava on sport and quiet.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.8% gross yield at 2,190 €/m² with a 95-day exit is the best mix of liquidity and return in Costa Cálida Norte. 250,000 € buys about 114 m². For short lets choose Playa and Los Narejos, for year-round Centro, for quiet Punta Brava. Check two things: the tourist licence, and whether the property sits in an area prone to flooding after heavy rain, a real pricing factor in Los Alcázares.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Los Alcázares es un mercado de laguna: 17.000 habitantes, 800 operaciones al año y una mediana de 2.190 €/m², 290 €/m² sobre la mediana de Costa Cálida. El crecimiento del 8,4% y solo 95 días de exposición, los más cortos de la región, se explican por un factor: el Mar Menor es poco profundo y cálido, sin olas, así que aquí se bañan niños y no se hace surf.",
      },
      {
        title: "Diferencial entre barrios",
        body: "La horquilla son 320 €/m²: de Playa (2.350 €/m²) a Punta Brava (2.030 €/m²). Entre medias están Los Narejos (2.250) con urbanizaciones nuevas con piscina y campo de golf, y Centro (2.090) con pisos cerca de servicios y del Paseo del Mar Menor. Punta Brava es el más barato: chalets de los 2000 junto al canal de remo del Centro de Alto Rendimiento, prestigio deportivo sin acceso directo a playa.",
      },
      {
        title: "Factores microlocales",
        body: "El precio sigue el baño seguro y la profundidad del agua, no las vistas: un piso en Playa de Los Alcázares vale más que otro idéntico 400 m tierra adentro porque las familias quieren entrar al agua sin estrés. El 40% de los compradores es extranjero y los polacos el 7%. Los Narejos funciona con alquiler corto toda la temporada, Centro con residentes y trabajadores de los campos de golf, y Punta Brava con deporte y calma.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,8% bruto con 2.190 €/m² y salida en 95 días es la mejor mezcla de liquidez y retorno de Costa Cálida Norte. Con 250.000 € compras unos 114 m². Para alquiler corto, Playa y Los Narejos; para todo el año, Centro; para calma, Punta Brava. Comprueba dos cosas: la licencia turística y si la vivienda está en zona con riesgo de inundación tras lluvias fuertes, un factor real de precio en Los Alcázares.",
      },
    ],
  },
  mazarron: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Mazarrón to najdalej wysunięty na południe rynek Costa Cálida Sur: 33 tys. mieszkańców, 900 transakcji rocznie i mediana 2 020 €/m², czyli 120 €/m² powyżej mediany regionu przy dynamice 7,6% r/r. Ekspozycja 115 dni jest najdłuższa w tej części wybrzeża, bo gmina łączy trzy różne rynki: port, formacje skalne i miasto oddalone od morza o 10 km.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Puerto de Mazarrón (2 230 €/m²) a Mazarrón Centro (1 700 €/m²) leży 530 €/m² - największa rozpiętość w Costa Cálida. Po drodze są Bolnuevo (2 130) przy plaży i słynnych formacjach Gredas de Bolnuevo oraz El Alamillo (2 070) z nowymi osiedlami z basenem między plażami. Centro jest najtańsze, bo to miasto górnicze w głębi lądu, z własnym rynkiem pracy, ale bez dostępu do wody.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "O cenie decyduje tu bezpośredni dostęp do plaży i portu, a nie widok z okna: apartament przy Playa del Puerto jest wart więcej niż identyczny w El Alamillo, choć oba leżą w tej samej gminie. 35% kupujących to obcokrajowcy, Polacy 5%. Puerto żyje z promenady i restauracji, Bolnuevo z unikalnego krajobrazu Gredas, a Centro z lokalnego popytu pracowniczego - dlatego ROI w Centro (6,6%) jest najwyższy, mimo najniższej ceny.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,4% brutto przy 2 020 €/m² i 115 dniach ekspozycji to profil cierpliwego inwestora: wysoki zwrot, wolniejsze wyjście. Za 250 tys. € kupisz około 124 m². Pod najem letni wybierz Puerto de Mazarrón i Bolnuevo, pod najem długoterminowy Centro i El Alamillo. Sprawdź plan zagospodarowania w rejonie Gredas - ochrona krajobrazu ogranicza tam rozbudowę, co z jednej strony chroni widok, z drugiej blokuje potencjał działki.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Mazarrón is the southernmost market on Costa Cálida Sur: 33,000 residents, 900 transactions a year and a 2,020 €/m² median, 120 €/m² above the regional median with 7.6% annual growth. The 115 days on market are the longest on this stretch of coast because the municipality combines three different markets: the port, the rock formations and a town 10 km inland.",
      },
      {
        title: "Spread across districts",
        body: "Between Puerto de Mazarrón (2,230 €/m²) and Mazarrón Centro (1,700 €/m²) sits 530 €/m², the widest range in Costa Cálida. In between are Bolnuevo (2,130) by the beach and the famous Gredas de Bolnuevo formations, and El Alamillo (2,070) with new pool estates between the beaches. Centro is cheapest: a former mining town inland with its own job market but no water access.",
      },
      {
        title: "Micro-local factors",
        body: "Price follows direct access to beach and port rather than the view: a flat on Playa del Puerto beats an identical one in El Alamillo, both in the same municipality. Foreign buyers make up 35%, Polish buyers 5%. Puerto lives off its promenade and restaurants, Bolnuevo off the unique Gredas landscape, and Centro off local worker demand, which is why Centro shows the highest yield (6.6%) despite the lowest price.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.4% gross yield at 2,020 €/m² with 115 days on market suits a patient investor: high return, slower exit. 250,000 € buys about 124 m². For summer letting pick Puerto de Mazarrón and Bolnuevo, for long lets Centro and El Alamillo. Check the urban plan around the Gredas: landscape protection limits extension there, which protects the view but caps plot potential.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Mazarrón es el mercado más meridional de Costa Cálida Sur: 33.000 habitantes, 900 operaciones al año y una mediana de 2.020 €/m², 120 €/m² sobre la mediana regional con un crecimiento del 7,6%. Los 115 días de exposición son los más largos de este tramo porque el municipio mezcla tres mercados: el puerto, las formaciones rocosas y un pueblo a 10 km del mar.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Puerto de Mazarrón (2.230 €/m²) y Mazarrón Centro (1.700 €/m²) hay 530 €/m², la mayor horquilla de Costa Cálida. Entre medias están Bolnuevo (2.130) junto a la playa y las famosas Gredas de Bolnuevo, y El Alamillo (2.070) con urbanizaciones nuevas con piscina entre playas. Centro es el más barato: un pueblo minero tierra adentro con su propio mercado laboral, pero sin acceso al agua.",
      },
      {
        title: "Factores microlocales",
        body: "El precio sigue el acceso directo a playa y puerto, no las vistas: un piso en Playa del Puerto vale más que otro idéntico en El Alamillo, ambos en el mismo municipio. El 35% de los compradores es extranjero y los polacos el 5%. Puerto vive del paseo y la restauración, Bolnuevo del paisaje de las Gredas y Centro de la demanda laboral local, por eso Centro da la mejor rentabilidad (6,6%) pese a ser el más barato.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,4% bruto con 2.020 €/m² y 115 días de exposición encaja con un inversor paciente: retorno alto, salida más lenta. Con 250.000 € compras unos 124 m². Para alquiler de verano, Puerto de Mazarrón y Bolnuevo; para largo, Centro y El Alamillo. Revisa el planeamiento en el entorno de las Gredas: la protección del paisaje limita ampliaciones, lo que protege la vista pero limita el potencial de la parcela.",
      },
    ],
  },
  "el-campello": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "El Campello to rynek podmiejski Alicante: 29 tys. mieszkańców, 1 100 transakcji rocznie i mediana 2 880 €/m², czyli 180 €/m² powyżej średniej Costa Blanca, przy dynamice 8,2% r/r i ekspozycji 110 dni. Jego przewagą nie jest plaża, a kolejka: linia tramwajowa TRAM łączy miasto z Alicante w kilkanaście minut, więc część kupujących to osoby pracujące w stolicy prowincji.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Muchavista (3 100 €/m²) a Coveta Fumada (2 720 €/m²) leży 380 €/m². Pomiędzy nimi jest Centro (2 780) z mieszkaniami blisko portu i przystanku tramwajowego. Muchavista wygrywa szeroką piaszczystą plażą i apartamentami z widokiem na morze, a Coveta Fumada to willowa zabudowa na klifie z kameralnymi osiedlami i mniejszym ruchem - najtańsza, ale też najbardziej uzależniona od samochodu.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o cenie decyduje odległość od przystanku TRAM i szerokość plaży, nie sam widok: apartament przy Playa de Muchavista jest wart więcej niż identyczny w Coveta Fumada, bo dojazd do Alicante zajmuje 15 minut bez samochodu. 42% kupujących to obcokrajowcy, Polacy 5% - widać ich szczególnie w Muchavista. Bliskość Cala de la Merced i stanowiska Illeta dels Banyets daje najem krótki, ale poza sezonem rynek pracuje na dojeżdżających do pracy.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,9% brutto przy 2 880 €/m² to wynik średni, ale z najlepszą w okolicy płynnością najmu całorocznego. Za 250 tys. € kupisz około 87 m². Pod stabilny dochód wybierz Centro przy tramwaju, pod sezon i widok Muchavista, pod spokój i działkę Coveta Fumada. Sprawdź, czy budynek nie stoi w pierwszej linii hałasu linii tramwajowej - w Muchavista i Centro to realny minus, który obniża cenę i komfort najmu.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "El Campello is Alicante's suburban market: 29,000 residents, 1,100 transactions a year and a 2,880 €/m² median, 180 €/m² above the Costa Blanca average, with 8.2% growth and 110 days on market. Its edge is not the beach but the railway: the TRAM line links the town to Alicante in about fifteen minutes, so part of the buyer pool works in the provincial capital.",
      },
      {
        title: "Spread across districts",
        body: "Between Muchavista (3,100 €/m²) and Coveta Fumada (2,720 €/m²) sits 380 €/m². In the middle is Centro (2,780) with flats near the port and the tram stop. Muchavista wins on its wide sandy beach and sea-view flats, while Coveta Fumada offers clifftop villas in small gated estates with less traffic: cheapest, but the most car-dependent.",
      },
      {
        title: "Micro-local factors",
        body: "Price follows distance to the TRAM stop and beach width rather than the view alone: a flat by Playa de Muchavista beats an identical one in Coveta Fumada because Alicante is fifteen minutes away without a car. Foreign buyers make up 42%, Polish buyers 5%, visible especially in Muchavista. Proximity to Cala de la Merced and the Illeta dels Banyets site drives short lets, but off season the market runs on commuters.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.9% gross yield at 2,880 €/m² is average, but with the best year-round letting liquidity around. 250,000 € buys about 87 m². For steady income pick Centro by the tram, for season and views Muchavista, for quiet and a plot Coveta Fumada. Check whether the building sits on the tram noise line: in Centro and Muchavista it is a genuine discount factor and hurts tenant comfort.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "El Campello es el mercado suburbano de Alicante: 29.000 habitantes, 1.100 operaciones al año y una mediana de 2.880 €/m², 180 €/m² sobre la media de Costa Blanca, con un crecimiento del 8,2% y 110 días de exposición. Su ventaja no es la playa sino el tren: la línea TRAM conecta el pueblo con Alicante en unos quince minutos, así que parte de los compradores trabaja en la capital.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Muchavista (3.100 €/m²) y Coveta Fumada (2.720 €/m²) hay 380 €/m². En medio está Centro (2.780) con pisos junto al puerto y la parada de tranvía. Muchavista gana por su playa amplia de arena y pisos con vistas al mar, mientras Coveta Fumada ofrece chalets en acantilado con urbanizaciones pequeñas y menos tráfico: el más barato y el más dependiente del coche.",
      },
      {
        title: "Factores microlocales",
        body: "El precio sigue la distancia a la parada del TRAM y la anchura de la playa, no solo las vistas: un piso en Playa de Muchavista vale más que otro idéntico en Coveta Fumada porque Alicante queda a quince minutos sin coche. El 42% de los compradores es extranjero y los polacos el 5%, visibles sobre todo en Muchavista. La cercanía a Cala de la Merced y al yacimiento de Illeta dels Banyets alimenta el alquiler corto, pero fuera de temporada manda el residente que va a trabajar.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,9% bruto con 2.880 €/m² es un resultado medio, pero con la mejor liquidez de alquiler anual del entorno. Con 250.000 € compras unos 87 m². Para renta estable elige Centro junto al tranvía; para temporada y vistas, Muchavista; para calma y parcela, Coveta Fumada. Comprueba si el edificio está en la línea de ruido del tranvía: en Centro y Muchavista es un descuento real y afecta al confort del inquilino.",
      },
    ],
  },
  villajoyosa: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Villajoyosa to jedyny rynek w bazie, gdzie mediana (2 620 €/m²) leży poniżej średniej Costa Blanca o 80 €/m², a jednocześnie ROI 6,1% i dynamika 8,5% r/r są wyraźnie powyżej przeciętnej. 34 tys. mieszkańców, 900 transakcji i 115 dni ekspozycji: to miasto, które nie sprzedaje się wizerunkiem kurortu, tylko pracą portu, fabryką czekolady i kolorowymi kamienicami starego miasta.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Playa Torre (2 840 €/m²) a Plans (2 350 €/m²) leży 490 €/m². Pośrodku jest Centro (2 520) z kamienicami po remoncie w Casco Antiguo, blisko Puerto de Villajoyosa. Playa Torre ma apartamenty w pierwszej linii przy Playa del Torres i nowe osiedla z basenami, a Plans to spokojna zabudowa willowa na większych działkach przy Sierra de Ponotx - najtańsza, bo bez dostępu do wody.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu cena zależy od tego, czy widzisz morze z okna, czy tylko z dachu: apartament w Playa Torre jest wart o kilkaset euro za metr więcej niż identyczny w Centro. 45% kupujących to obcokrajowcy, Polacy 6%. Centro żyje z gastronomii i turystyki jednodniowej, Playa Torre z najmu sezonowego, Plans z mieszkańców. Tramwaj do Benidorm i Alicante działa cały rok, więc najem długoterminowy ma tu realną bazę.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,1% brutto przy cenie poniżej średniej regionu to jedna z niewielu okazji na Costa Blanca, gdzie nie płaci się premii za markę. Za 250 tys. € kupisz około 95 m². Pod najem sezonowy wybierz Playa Torre, pod całoroczny Centro, pod remont i duży metraż Plans. Sprawdź wysokość comunidad w blokach przy plaży oraz czy nieruchomość nie leży w strefie hałasu zakładów przy porcie - fabryki pracują także poza sezonem.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Villajoyosa is the only market in our dataset where the median (2,620 €/m²) sits 80 €/m² below the Costa Blanca average while a 6.1% yield and 8.5% growth run clearly above it. 34,000 residents, 900 transactions and 115 days on market: a town selling port work, a chocolate factory and the painted houses of its old town rather than a resort image.",
      },
      {
        title: "Spread across districts",
        body: "Between Playa Torre (2,840 €/m²) and Plans (2,350 €/m²) sits 490 €/m². In the middle is Centro (2,520) with renovated townhouses in the Casco Antiguo, close to Puerto de Villajoyosa. Playa Torre offers front-line flats by Playa del Torres and new pool estates, while Plans is quiet villa housing on larger plots by Sierra de Ponotx: cheapest, with no water access.",
      },
      {
        title: "Micro-local factors",
        body: "Price depends on whether you see the sea from the window or just from the roof: a Playa Torre flat is worth several hundred euros per square metre more than an identical one in Centro. Foreign buyers make up 45%, Polish buyers 6%. Centro lives off restaurants and day tourism, Playa Torre off seasonal letting, Plans off residents. The tram to Benidorm and Alicante runs all year, so long lets here rest on a real base.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.1% gross yield at a price below the regional average is one of the few chances on the Costa Blanca to avoid paying a brand premium. 250,000 € buys about 95 m². For seasonal letting pick Playa Torre, for year-round Centro, for renovation and space Plans. Check community fees in seafront blocks and whether the unit sits in the noise zone near the port plants, which run outside the season too.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Villajoyosa es el único mercado de la base donde la mediana (2.620 €/m²) queda 80 €/m² por debajo de la media de Costa Blanca mientras un 6,1% de rentabilidad y un 8,5% de crecimiento están por encima. 34.000 habitantes, 900 operaciones y 115 días: un pueblo que vende trabajo portuario, fábrica de chocolate y las casas pintadas del casco antiguo, no una imagen de resort.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Playa Torre (2.840 €/m²) y Plans (2.350 €/m²) hay 490 €/m². En medio está Centro (2.520) con casas rehabilitadas en el Casco Antiguo, junto al Puerto de Villajoyosa. Playa Torre ofrece pisos en primera línea de Playa del Torres y urbanizaciones nuevas con piscina, y Plans es vivienda de chalets en parcelas grandes junto a Sierra de Ponotx: el más barato, sin acceso al agua.",
      },
      {
        title: "Factores microlocales",
        body: "El precio depende de si ves el mar desde la ventana o solo desde el tejado: un piso en Playa Torre vale varios cientos de euros por metro más que otro idéntico en Centro. El 45% de los compradores es extranjero y los polacos el 6%. Centro vive de restauración y turismo de día, Playa Torre de alquiler de temporada y Plans de residentes. El tranvía a Benidorm y Alicante funciona todo el año, así que el alquiler largo tiene base real.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,1% bruto con precio por debajo de la media regional es una de las pocas ocasiones en Costa Blanca de no pagar prima de marca. Con 250.000 € compras unos 95 m². Para temporada, Playa Torre; para todo el año, Centro; para reforma y metros, Plans. Revisa la comunidad en bloques de primera línea y si la vivienda está en la zona de ruido de las fábricas del puerto, que trabajan también fuera de temporada.",
      },
    ],
  },
  finestrat: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Finestrat to wieś pod Benidormem, która stała się rynkiem premium: 7,5 tys. mieszkańców, zaledwie 700 transakcji rocznie i mediana 3 070 €/m², czyli 370 €/m² powyżej średniej Costa Blanca, przy dynamice 9,4% r/r. Ekspozycja 125 dni i tak niski wolumen oznaczają, że mówimy o rynku wąskim, gdzie cena zależy od konkretnej nieruchomości, a nie od średniej gminy.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Balcón de Finestrat (3 340 €/m²) a Centro (2 590 €/m²) leży 750 €/m² - jedna z największych rozpiętości w regionie. Pomiędzy nimi jest Golf (3 180) z apartamentami i spa wokół Finestrat Golf i Sierra Cortina. Balcón to nowe osiedla z widokiem na morze i wille z basenem i ochroną, blisko Benidormu i Terra Mítica, a Centro to tradycyjna wiejska zabudowa z widokiem na Puig Campana, bez dostępu do plaży.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o cenie decyduje wysokość, na której stoi dom: z Balcón de Finestrat widać morze i zatokę, z Centro tylko górę. 50% kupujących to obcokrajowcy, Polacy 6% - najwyższy odsetek klientów zagranicznych w tej części wybrzeża. Golf pracuje na rynku drugiego domu z basenami i spa, Centro na mieszkańcach i pracownikach Benidormu. Bliskość Puig Campana daje walor turystyczny, ale też ogranicza zabudowę i chroni widoki.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,6% brutto przy 3 070 €/m² to wynik umiarkowany, a 700 transakcji rocznie to najniższa płynność w regionie - wyjście może potrwać. Za 250 tys. € kupisz około 81 m², w Centro więcej, w Balcón mniej. Pod najem sezonowy i widoki wybierz Balcón de Finestrat, pod długoterminowy Centro, pod drugi dom Golf. Sprawdź koszty wspólnoty w osiedlach z ochroną i basenem - przy najmie długoterminowym potrafią obniżyć realny zwrot o dwa punkty procentowe.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Finestrat is a village under Benidorm that turned into a premium market: 7,500 residents, only 700 transactions a year and a 3,070 €/m² median, 370 €/m² above the Costa Blanca average with 9.4% growth. 125 days on market and that low volume mean a narrow market where price follows the specific property, not the municipal average.",
      },
      {
        title: "Spread across districts",
        body: "Between Balcón de Finestrat (3,340 €/m²) and Centro (2,590 €/m²) sits 750 €/m², one of the widest ranges in the region. In between is Golf (3,180) with spa flats around Finestrat Golf and Sierra Cortina. Balcón offers new sea-view estates and gated villas with pools close to Benidorm and Terra Mítica, while Centro is traditional village housing facing Puig Campana with no beach access.",
      },
      {
        title: "Micro-local factors",
        body: "Price depends on the elevation the house stands at: from Balcón de Finestrat you see the sea and the bay, from Centro only the mountain. Foreign buyers make up 50%, Polish buyers 6%, the highest international share on this stretch of coast. Golf runs on the second-home market with pools and spas, Centro on residents and Benidorm commuters. Puig Campana adds tourist appeal but also caps building and protects views.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.6% gross yield at 3,070 €/m² is moderate, and 700 transactions a year is the lowest liquidity in the region, so an exit can take time. 250,000 € buys about 81 m², more in Centro and less in Balcón. For seasonal letting and views pick Balcón de Finestrat, for long lets Centro, for a second home Golf. Check community costs in gated pool estates: on long lets they can knock two points off the real return.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Finestrat es un pueblo bajo Benidorm convertido en mercado premium: 7.500 habitantes, solo 700 operaciones al año y una mediana de 3.070 €/m², 370 €/m² sobre la media de Costa Blanca con un crecimiento del 9,4%. Los 125 días de exposición y ese volumen tan bajo indican un mercado estrecho, donde el precio depende de la vivienda concreta y no de la media municipal.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Balcón de Finestrat (3.340 €/m²) y Centro (2.590 €/m²) hay 750 €/m², una de las mayores horquillas de la región. Entre medias está Golf (3.180) con pisos y spa en torno a Finestrat Golf y Sierra Cortina. Balcón ofrece urbanizaciones nuevas con vistas al mar y chalets con piscina y seguridad cerca de Benidorm y Terra Mítica, mientras Centro es vivienda tradicional de pueblo frente al Puig Campana, sin playa.",
      },
      {
        title: "Factores microlocales",
        body: "El precio depende de la altura a la que está la casa: desde Balcón de Finestrat se ven el mar y la bahía, desde Centro solo la montaña. El 50% de los compradores es extranjero y los polacos el 6%, el mayor peso internacional de este tramo. Golf funciona con el mercado de segunda residencia con piscina y spa, Centro con residentes y trabajadores de Benidorm. El Puig Campana aporta atractivo turístico y a la vez limita la edificación y protege las vistas.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,6% bruto con 3.070 €/m² es moderado, y 700 operaciones al año suponen la liquidez más baja de la región: la salida puede tardar. Con 250.000 € compras unos 81 m², más en Centro y menos en Balcón. Para temporada y vistas elige Balcón de Finestrat; para largo, Centro; para segunda residencia, Golf. Revisa la comunidad en urbanizaciones con seguridad y piscina: en alquiler largo puede restar dos puntos de retorno real.",
      },
    ],
  },
  "l-albir": {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "L'Albir to najmniejszy rynek w bazie i zarazem najdroższy na północy: 6,5 tys. mieszkańców, 600 transakcji rocznie i mediana 3 310 €/m², o 610 €/m² powyżej średniej Costa Blanca, przy dynamice 8% r/r. Ekspozycja 130 dni i ROI 5,4% mówią jasno: płacisz za ograniczoną podaż między morzem a parkiem naturalnym, a nie za szybki zwrot.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Playa del Albir (3 520 €/m²) a Sierra Albir (3 090 €/m²) leży 430 €/m². Pośrodku jest Centro (3 200) z apartamentami przy promenadzie i Paseo de las Estrellas. Playa del Albir to szeroka żwirowa plaża z widokiem na Serra Gelada i nowe osiedla z basenami, a Sierra Albir to wille na zboczu, na dużych działkach, z prywatnością, ale bez zejścia do wody.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu rządzi widok na Serra Gelada i odległość od Paseo de las Estrellas: apartament z widokiem na klif jest wart o kilkaset euro za metr więcej niż identyczny tyłem do góry. 55% kupujących to obcokrajowcy - najwyższy odsetek w bazie, Polacy tylko 5%, więc polski klient jest tu w mniejszości i negocjuje z rynkiem zdominowanym przez kupujących z północy Europy. Park naturalny Serra Gelada blokuje nową zabudowę od strony góry.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 5,4% brutto to najniższy wynik w bazie, a 600 transakcji rocznie oznacza wąską płynność. Za 250 tys. € kupisz zaledwie około 75 m². To rynek kapitału, nie dochodu: kupujesz widok i limit podaży, liczysz na wzrost wartości, nie na cash flow. Pod najem sezonowy wybierz Playa del Albir, pod spokój i willę Sierra Albir, pod pieszy dostęp do restauracji Centro. Sprawdź, czy osiedle nie leży w strefie ochronnej parku - utrudnia to rozbudowę i podnosi koszty remontu.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "L'Albir is the smallest market in our dataset and the priciest in the north: 6,500 residents, 600 transactions a year and a 3,310 €/m² median, 610 €/m² above the Costa Blanca average with 8% growth. At 130 days on market and a 5.4% yield, the message is clear: you pay for capped supply between the sea and a natural park, not for a fast return.",
      },
      {
        title: "Spread across districts",
        body: "Between Playa del Albir (3,520 €/m²) and Sierra Albir (3,090 €/m²) sits 430 €/m². In the middle is Centro (3,200) with flats by the promenade and Paseo de las Estrellas. Playa del Albir means a wide pebble beach facing Serra Gelada and new estates with pools, while Sierra Albir is hillside villas on large plots with privacy but no way down to the water.",
      },
      {
        title: "Micro-local factors",
        body: "The Serra Gelada view and distance to Paseo de las Estrellas set the price: a flat facing the cliff is worth several hundred euros per square metre more than an identical one with its back to it. Foreign buyers make up 55%, the highest share in our dataset, though Polish buyers are only 5%, so here you negotiate in a market dominated by northern European purchasers. The Serra Gelada natural park blocks new building on the mountain side.",
      },
      {
        title: "Investor takeaway",
        body: "A 5.4% gross yield is the lowest in our dataset and 600 transactions a year means thin liquidity. 250,000 € buys only about 75 m². This is a capital market, not an income one: you buy the view and the supply cap, betting on value growth rather than cash flow. For seasonal letting pick Playa del Albir, for quiet and a villa Sierra Albir, for walkable restaurants Centro. Check whether the estate falls inside the park protection zone, which complicates extensions and raises renovation costs.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "L'Albir es el mercado más pequeño de la base y el más caro del norte: 6.500 habitantes, 600 operaciones al año y una mediana de 3.310 €/m², 610 €/m² sobre la media de Costa Blanca con un 8% de crecimiento. Con 130 días de exposición y un 5,4% de rentabilidad el mensaje es claro: pagas por una oferta limitada entre el mar y un parque natural, no por un retorno rápido.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Playa del Albir (3.520 €/m²) y Sierra Albir (3.090 €/m²) hay 430 €/m². En medio está Centro (3.200) con pisos junto al paseo y Paseo de las Estrellas. Playa del Albir es una playa amplia de grava frente a Serra Gelada con urbanizaciones nuevas y piscina, y Sierra Albir son chalets en ladera, en parcelas grandes, con privacidad pero sin bajada al agua.",
      },
      {
        title: "Factores microlocales",
        body: "Mandan las vistas a Serra Gelada y la distancia al Paseo de las Estrellas: un piso frente al acantilado vale varios cientos de euros por metro más que otro idéntico de espaldas. El 55% de los compradores es extranjero, el mayor porcentaje de la base, aunque los polacos son solo el 5%, así que aquí se negocia con un mercado dominado por el norte de Europa. El parque natural de Serra Gelada bloquea nueva edificación por la ladera.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 5,4% bruto es el resultado más bajo de la base y 600 operaciones al año implican poca liquidez. Con 250.000 € compras solo unos 75 m². Es un mercado de capital, no de renta: compras vistas y escasez, apostando por la revalorización y no por el flujo de caja. Para temporada, Playa del Albir; para calma y chalet, Sierra Albir; para restaurantes a pie, Centro. Comprueba si la urbanización cae en la zona protegida del parque: complica ampliaciones y encarece la reforma.",
      },
    ],
  },
  quesada: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Ciudad Quesada to wyjątek w bazie: nie jest gminą, a zaplanowaną urbanizacją w gminie Rojales, zbudowaną od zera wokół pola golfowego. 17 tys. mieszkańców, 800 transakcji rocznie, mediana 2 760 €/m² i najlepsze ROI w regionie - 6,3% przy dynamice 7,5% r/r. Ekspozycja 105 dni to najkrótszy czas sprzedaży na całym Costa Blanca Sur.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między La Marquesa (2 920 €/m²) a Doña Pepa (2 600 €/m²) leży 320 €/m², najmniej w regionie - bo cała urbanizacja powstała według jednego planu i różnice wynikają z otoczenia, nie z lokalizacji. Pośrodku jest Centro (2 710) z usługami w zasięgu spaceru. La Marquesa to wille i apartamenty z basenami wokół pola golfowego, Doña Pepa spokojne osiedle willowe przy Sierra de Callosa, tańsze, ale dalej od sklepów.",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu nie ma plaży, więc o cenie decyduje odległość od Centro i pola golfowego La Marquesa, nie widok. 48% kupujących to obcokrajowcy, a Polacy 7% - najwyższy odsetek w całej bazie, co przekłada się na polskie sklepy i usługi w okolicy. Niska zabudowa z ogrodami dominuje, więc nie konkurujesz z wieżowcami o widok. 10 km do plaży w Guardamar to codzienny dojazd samochodem, nie spacer.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "ROI 6,3%, 105 dni ekspozycji i 800 transakcji rocznie to najlepsza kombinacja płynności i zwrotu w regionie. Za 250 tys. € kupisz około 90 m² z ogrodem. Pod najem długoterminowy wybierz La Marquesa, pod budżet Doña Pepa, pod pieszy dostęp do usług Centro. Zanim kupisz, sprawdź, czy działka ma odbiór urbanizacji i czy basen jest wpisany do licencji - w starszych osiedlach Quesady zdarzają się rozszerzenia bez pozwolenia, które blokują kredyt i ubezpieczenie.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Ciudad Quesada is the outlier in our dataset: not a municipality but a planned urbanisation inside Rojales, built from scratch around a golf course. 17,000 residents, 800 transactions a year, a 2,760 €/m² median and the region's best yield at 6.3% with 7.5% growth. At 105 days, it has the shortest selling time on the whole Costa Blanca Sur.",
      },
      {
        title: "Spread across districts",
        body: "Between La Marquesa (2,920 €/m²) and Doña Pepa (2,600 €/m²) sits 320 €/m², the narrowest spread in the region, because the whole urbanisation was laid out to one plan and differences come from surroundings rather than location. In the middle is Centro (2,710) with services within walking distance. La Marquesa means villas and flats with pools around the golf course; Doña Pepa is a quiet villa estate by Sierra de Callosa, cheaper but further from shops.",
      },
      {
        title: "Micro-local factors",
        body: "There is no beach here, so price follows distance to Centro and to La Marquesa golf rather than any view. Foreign buyers make up 48% and Polish buyers 7%, the highest share in our entire dataset, which shows up in Polish shops and services nearby. Low housing with gardens dominates, so you are not competing with towers for a sea view. The 10 km to the Guardamar beach is a daily drive, not a walk.",
      },
      {
        title: "Investor takeaway",
        body: "A 6.3% yield, 105 days on market and 800 transactions a year is the best mix of liquidity and return in the region. 250,000 € buys about 90 m² with a garden. For long lets pick La Marquesa, for budget Doña Pepa, for walkable services Centro. Before buying, confirm the plot has urbanisation sign-off and that any pool is on the licence: older Quesada estates sometimes carry unpermitted extensions that block mortgages and insurance.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Ciudad Quesada es la excepción de la base: no es un municipio sino una urbanización planificada dentro de Rojales, construida desde cero en torno a un campo de golf. 17.000 habitantes, 800 operaciones al año, una mediana de 2.760 €/m² y la mejor rentabilidad de la región, un 6,3% con un 7,5% de crecimiento. Sus 105 días son el plazo de venta más corto de todo Costa Blanca Sur.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre La Marquesa (2.920 €/m²) y Doña Pepa (2.600 €/m²) hay 320 €/m², la horquilla más estrecha de la región, porque toda la urbanización se trazó con un mismo plan y las diferencias vienen del entorno, no de la ubicación. En medio está Centro (2.710) con servicios a pie. La Marquesa son chalets y pisos con piscina junto al campo de golf; Doña Pepa es una urbanización tranquila de chalets junto a Sierra de Callosa, más barata pero más lejos de las tiendas.",
      },
      {
        title: "Factores microlocales",
        body: "Aquí no hay playa, así que el precio sigue la distancia a Centro y al golf de La Marquesa, no las vistas. El 48% de los compradores es extranjero y los polacos el 7%, el porcentaje más alto de toda la base, lo que se nota en tiendas y servicios polacos cerca. Predomina la vivienda baja con jardín, así que no compites con torres por las vistas. Los 10 km a la playa de Guardamar son un trayecto diario en coche, no un paseo.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Un 6,3%, 105 días de exposición y 800 operaciones al año es la mejor combinación de liquidez y retorno de la región. Con 250.000 € compras unos 90 m² con jardín. Para alquiler largo elige La Marquesa; para presupuesto, Doña Pepa; para servicios a pie, Centro. Antes de comprar confirma que la parcela tiene recepción de urbanización y que la piscina está en licencia: en urbanizaciones antiguas de Quesada hay ampliaciones sin permiso que bloquean hipoteca y seguro.",
      },
    ],
  },
  aguilas: {
    pl: [
      {
        title: "Wprowadzenie rynkowe",
        body: "Águilas to najtańszy i najbardziej dochodowy rynek w bazie zarazem: mediana 1 850 €/m², ROI 6,7% brutto i dynamika 7% r/r przy 35 tys. mieszkańców i 800 transakcjach. To już Costa Cálida w Regionie Murcji, nie prowincja Alicante - inny system planowania, inne podatki lokalne i 120 dni ekspozycji, które odbijają mniejszą rozpoznawalność wśród kupujących z północy.",
      },
      {
        title: "Rozstrzał w dzielnicach",
        body: "Między Calarreona (2 120 €/m²) a Centro (1 750 €/m²) leży 370 €/m². Pośrodku są Las Delicias (2 010) przy szerokiej plaży i deptaku oraz El Hornillo (1 800) z apartamentami z tarasem przy morzu. Calarreona to zatoczki ze skałami, wille z widokiem i brak dużych hoteli, Centro to mieszkania nad zatoką przy Ayuntamiento i Castillo de San Juan, z całorocznymi usługami i najwyższym ROI w mieście (6,8%).",
      },
      {
        title: "Czynniki mikrolokalne",
        body: "Tu o cenie decyduje nie widok, a sezonowość: apartament przy Playa de Las Delicias pracuje trzy miesiące, mieszkanie w Centro przy dworcu wynajmuje się cały rok, dlatego ROI w Centrum jest wyższe mimo niższej ceny metra. Tylko 28% kupujących to obcokrajowcy, Polacy 4% - to rynek hiszpański, z mniejszą konkurencją i słabszą znajomością cen, co daje miejsce na negocjacje. Port rybacki i Castillo de San Juan przyciągają turystów, ale nie podnoszą czynszów poza sezonem.",
      },
      {
        title: "Wnioski dla inwestora",
        body: "Za 250 tys. € kupisz tu około 135 m² - najwięcej w całej bazie. ROI 6,7% jest realne, ale licz je na najmie całorocznym w Centrum lub El Hornillo, nie na turystycznym. Pod widok i wille wybierz Calarreona, pod plażę i deptak Las Delicias, pod zwrot i usługi Centro. Zanim kupisz, sprawdź stan budynku i plan miejscowy gminy Águilas - w starym centrum zdarzają się kamienice bez ITE, a Region Murcji inaczej rozlicza podatek od nieruchomości niż Walencja.",
      },
    ],
    en: [
      {
        title: "Market introduction",
        body: "Águilas is both the cheapest and the highest-yielding market in our dataset: a 1,850 €/m² median, a 6.7% gross yield and 7% growth across 35,000 residents and 800 transactions. This is already the Costa Cálida in the Region of Murcia, not Alicante province, with different planning rules, different local taxes and 120 days on market reflecting lower awareness among northern buyers.",
      },
      {
        title: "Spread across districts",
        body: "Between Calarreona (2,120 €/m²) and Centro (1,750 €/m²) sits 370 €/m². In between are Las Delicias (2,010) by the wide beach and promenade, and El Hornillo (1,800) with terraced flats near the sea. Calarreona offers rocky coves, sea-view villas and no large hotels; Centro means flats above the bay by the Ayuntamiento and Castillo de San Juan, with year-round services and the town's best yield at 6.8%.",
      },
      {
        title: "Micro-local factors",
        body: "Seasonality rather than views drives price here: a flat by Playa de Las Delicias works three months a year, while one in Centro near the station lets all year, which is why Centro yields more despite a lower price per square metre. Only 28% of buyers are foreign and Polish buyers are 4%, so this is a Spanish market with less competition and weaker price transparency, leaving room to negotiate. The fishing port and Castillo de San Juan draw visitors but do not lift rents off season.",
      },
      {
        title: "Investor takeaway",
        body: "250,000 € buys about 135 m² here, the most in our dataset. A 6.7% yield is realistic, but count it on year-round letting in Centro or El Hornillo rather than on tourist nights. For views and villas pick Calarreona, for beach and promenade Las Delicias, for return and services Centro. Before buying, check the building's condition and the Águilas town plan: old-centre buildings sometimes lack an ITE inspection, and Murcia levies property tax differently from Valencia.",
      },
    ],
    es: [
      {
        title: "Introducción de mercado",
        body: "Águilas es a la vez el mercado más barato y el más rentable de la base: mediana de 1.850 €/m², un 6,7% bruto y un 7% de crecimiento con 35.000 habitantes y 800 operaciones. Ya es Costa Cálida, en la Región de Murcia y no en la provincia de Alicante, con otro planeamiento, otros impuestos locales y 120 días de exposición que reflejan menor conocimiento entre compradores del norte.",
      },
      {
        title: "Diferencial entre barrios",
        body: "Entre Calarreona (2.120 €/m²) y Centro (1.750 €/m²) hay 370 €/m². En medio están Las Delicias (2.010) junto a la playa amplia y el paseo, y El Hornillo (1.800) con pisos con terraza frente al mar. Calarreona son calas rocosas, chalets con vistas y sin grandes hoteles; Centro son pisos sobre la bahía junto al Ayuntamiento y el Castillo de San Juan, con servicios todo el año y la mejor rentabilidad del municipio (6,8%).",
      },
      {
        title: "Factores microlocales",
        body: "Aquí manda la estacionalidad más que las vistas: un piso en Playa de Las Delicias trabaja tres meses, mientras uno en Centro junto a la estación se alquila todo el año, y por eso Centro rinde más pese a un precio por metro menor. Solo el 28% de los compradores es extranjero y los polacos el 4%: es un mercado español, con menos competencia y menos transparencia de precios, lo que deja margen para negociar. El puerto pesquero y el Castillo de San Juan atraen visitantes pero no suben las rentas fuera de temporada.",
      },
      {
        title: "Conclusión para el inversor",
        body: "Con 250.000 € compras aquí unos 135 m², la cifra más alta de la base. El 6,7% es realista, pero calculado sobre alquiler anual en Centro o El Hornillo, no sobre noches turísticas. Para vistas y chalet, Calarreona; para playa y paseo, Las Delicias; para retorno y servicios, Centro. Antes de comprar revisa el estado del edificio y el planeamiento de Águilas: en el casco antiguo hay edificios sin ITE, y Murcia calcula el IBI de forma distinta a Valencia.",
      },
    ],
  },
};

/** Sekcje redakcyjne dla miasta (null = brak autorskiego tekstu). */
export function getCityEditorial(slug: string, locale: Locale): EditorialSection[] | null {
  return COPY[slug]?.[locale] ?? null;
}

