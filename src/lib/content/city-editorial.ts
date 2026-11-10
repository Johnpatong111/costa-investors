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
};

/** Sekcje redakcyjne dla miasta (null = brak autorskiego tekstu). */
export function getCityEditorial(slug: string, locale: Locale): EditorialSection[] | null {
  return COPY[slug]?.[locale] ?? null;
}

