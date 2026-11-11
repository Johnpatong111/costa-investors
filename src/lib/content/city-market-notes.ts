import type { Locale } from "../i18n/config";

/**
 * Nota rynkowa per miasto, wstrzykiwana do stron usług na poziomie miasta
 * (/{service}/{city}). Powód: te strony dzieliły identyczny szkielet bloków
 * (rynek, dzielnice, koszty, proces), różniły się tylko liczbami, które
 * normalizator sprowadza do "#". Jaccard na 5-gramach sięgał 0.76.
 *
 * Zasada redakcyjna: każdy akapit mówi o konkretnym miejscu (ulica, plaża,
 * obiekt, linia komunikacji), o tym kto tu kupuje i jakie ryzyko jest lokalne.
 * Żadnych powtarzalnych formuł typu "rynek głęboki, ale coraz mniej okazyjny".
 */

export interface CityMarketNote {
  heading: string;
  paragraphs: string[];
}

const HEADING: Record<Locale, string> = {
  pl: "Nasza ocena rynku lokalnego",
  en: "Our read on the local market",
  es: "Nuestra lectura del mercado local",
};

/**
 * Drugi akapit autorski dla stron miast: konkretne dane, porównania wewnątrz
 * gminy i wnioski inwestycyjne. Trzymane osobno od bazowych not, żeby dopisywać
 * treść bez edycji istniejących wpisów.
 */
const CITY_EXTRA: Record<string, Partial<Record<Locale, string[]>>> = {
  altea: {
    pl: [
      "Twarde dane do decyzji: mediana 3 680 €/m², dynamika 9,8 procent r/r, 900 transakcji rocznie i 130 dni ekspozycji, przy ROI 5,3 procent brutto. Wewnątrz gminy rozstrzał sięga 700 €/m²: od Cap Blanc (3 730 €/m²) przez Playa de la Roda (3 780) i Casco Antiguo (3 890) do Mascarat (4 220) i Altea Hills (4 430). Kupujący z zagranicy to 44 procent, Polacy 6 procent. Wniosek: to rynek kapitału, nie dochodu, więc licz na wzrost wartości i sezonowy najem, a nie na cash flow.",
    ],
    en: [
      "Hard numbers for the decision: a 3,680 median, 9.8 percent growth, 900 sales a year and 130 days on market, with a 5.3 percent gross yield. Inside the municipality the spread reaches 700 per m²: from Cap Blanc (3,730) through Playa de la Roda (3,780) and Casco Antiguo (3,890) to Mascarat (4,220) and Altea Hills (4,430). Foreign buyers make up 44 percent and Poles 6 percent. The conclusion: this is a capital market, not an income one, so count on value growth and seasonal lets rather than cash flow.",
    ],
    es: [
      "Datos duros para decidir: mediana de 3.680, crecimiento del 9,8 por ciento, 900 operaciones al año y 130 días de exposición, con un 5,3 por ciento bruto. Dentro del municipio la horquilla llega a 700 por m²: de Cap Blanc (3.730) a Playa de la Roda (3.780), Casco Antiguo (3.890), Mascarat (4.220) y Altea Hills (4.430). Los compradores extranjeros son el 44 por ciento y los polacos el 6. Conclusión: es un mercado de capital y no de renta, así que cuenta con revalorización y alquiler de temporada.",
    ],
  },
  "el-campello": {
    pl: [
      "Liczby, które warto mieć przed sobą: 2 880 €/m², 1 100 transakcji rocznie, 110 dni ekspozycji i ROI 5,9 procent brutto. Rozstrzał w gminie to 380 €/m²: Coveta Fumada 2 720, Centro 2 780, Muchavista 3 100. Centrum jest najtańsze w przeliczeniu na metr i najwyżej dochodowe, bo tramwaj i port dają najemców przez cały rok, a nie tylko w sierpniu. Kupujący z zagranicy to 42 procent, Polacy 5 procent. Wniosek: pod stabilny dochód bierz Centro, pod widok Muchavista, pod dom z ogrodem Coveta Fumada.",
    ],
    en: [
      "Numbers worth having in front of you: 2,880 per m², 1,100 sales a year, 110 days on market and a 5.9 percent gross yield. The spread across the town is 380 per m²: Coveta Fumada 2,720, Centro 2,780, Muchavista 3,100. The centre is the cheapest per square metre and the highest yielding, because the tram and the port supply tenants all year rather than only in August. Foreign buyers are 42 percent, Poles 5 percent. The conclusion: Centro for steady income, Muchavista for the view, Coveta Fumada for a house with a garden.",
    ],
    es: [
      "Cifras que conviene tener delante: 2.880 por m², 1.100 operaciones al año, 110 días de exposición y un 5,9 por ciento bruto. La horquilla del municipio es de 380 por m²: Coveta Fumada 2.720, Centro 2.780, Muchavista 3.100. El centro es lo más barato por metro y lo más rentable, porque tranvía y puerto dan inquilinos todo el año y no solo en agosto. Los extranjeros son el 42 por ciento y los polacos el 5. Conclusión: Centro para renta estable, Muchavista para vistas, Coveta Fumada para casa con jardín.",
    ],
  },
  finestrat: {
    pl: [
      "Dane, które wyjaśniają ten rynek: 3 070 €/m², dynamika 9,4 procent r/r, ale tylko 700 transakcji rocznie i 125 dni ekspozycji. Rozstrzał wewnątrz gminy to 750 €/m², największy w regionie: Centro 2 590, Golf 3 180, Balcón de Finestrat 3 340. Połowa kupujących to obcokrajowcy, Polacy 6 procent. Wniosek: to rynek wąski i drogi w wejściu, więc licz się z tym, że sprzedaż potrwa, a cena zależy od konkretnej nieruchomości, nie od średniej gminy.",
    ],
    en: [
      "Data that explains this market: 3,070 per m², 9.4 percent growth, but only 700 sales a year and 125 days on market. The internal spread is 750 per m², the widest in the region: Centro 2,590, Golf 3,180, Balcón de Finestrat 3,340. Half of all buyers are foreign, Poles 6 percent. The conclusion: a narrow market with a high entry price, so expect a sale to take time and the price to follow the specific property rather than the municipal average.",
    ],
    es: [
      "Datos que explican este mercado: 3.070 por m², crecimiento del 9,4 por ciento, pero solo 700 operaciones al año y 125 días de exposición. La horquilla interna es de 750 por m², la mayor de la región: Centro 2.590, Golf 3.180, Balcón de Finestrat 3.340. La mitad de los compradores son extranjeros y los polacos el 6. Conclusión: mercado estrecho y caro de entrada, así que la venta tarda y el precio depende de la vivienda concreta y no de la media municipal.",
    ],
  },
  calpe: {
    pl: [
      "Liczby, które trzeba znać: mediana 3 270 €/m², dynamika 8,9 procent r/r, 1 400 transakcji rocznie i 120 dni ekspozycji, przy ROI 5,7 procent brutto. Rozstrzał w gminie wynosi 530 €/m²: Oltamar 3 010, Canuta 3 170, Puerto 3 330, Maryvilla 3 440 i Playa de la Fossa 3 540. Kupujący z zagranicy to 52 procent, Polacy 7 procent. Wniosek: najwyższy zwrot daje Canuta i Oltamar, a pierwszą linię kupuje się pod własne wakacje i najem krótki, nie pod stały dochód.",
    ],
    en: [
      "Numbers you need: a 3,270 median, 8.9 percent growth, 1,400 sales a year and 120 days on market, with a 5.7 percent gross yield. The internal spread is 530 per m²: Oltamar 3,010, Canuta 3,170, Puerto 3,330, Maryvilla 3,440 and Playa de la Fossa 3,540. Foreign buyers are 52 percent, Poles 7 percent. The conclusion: Canuta and Oltamar give the best return, while the front line is bought for your own holidays and short lets rather than steady income.",
    ],
    es: [
      "Cifras que hay que conocer: mediana de 3.270, crecimiento del 8,9 por ciento, 1.400 operaciones al año y 120 días de exposición, con un 5,7 por ciento bruto. La horquilla interna es de 530 por m²: Oltamar 3.010, Canuta 3.170, Puerto 3.330, Maryvilla 3.440 y Playa de la Fossa 3.540. Los extranjeros son el 52 por ciento y los polacos el 7. Conclusión: Canuta y Oltamar dan el mejor retorno, y la primera línea se compra para vacaciones propias y alquiler corto.",
    ],
  },
  javea: {
    pl: [
      "Twarde liczby: 4 400 €/m², czyli najwyższa mediana w całej bazie, dynamika 10,4 procent r/r, 1 100 transakcji i 140 dni ekspozycji, ale ROI tylko 4,9 procent brutto. Wewnątrz gminy rozstrzał to 870 €/m²: Tosalet 4 020, Arenal 4 290, Puerto 4 450, Montañar 4 670 i Cap Martí 4 890. Połowa kupujących to obcokrajowcy, Polacy 6 procent. Wniosek: to rynek kapitału i drugiego domu, więc licz na wzrost wartości i własne użytkowanie, nie na cash flow.",
    ],
    en: [
      "Hard numbers: 4,400 per m², the highest median in our whole dataset, 10.4 percent growth, 1,100 sales and 140 days on market, yet a yield of only 4.9 percent gross. The internal spread is 870 per m²: Tosalet 4,020, Arenal 4,290, Puerto 4,450, Montañar 4,670 and Cap Martí 4,890. Half of all buyers are foreign, Poles 6 percent. The conclusion: this is a capital and second-home market, so count on value growth and personal use rather than cash flow.",
    ],
    es: [
      "Datos duros: 4.400 por m², la mediana más alta de toda la base, crecimiento del 10,4 por ciento, 1.100 operaciones y 140 días de exposición, pero solo un 4,9 por ciento bruto. La horquilla interna es de 870 por m²: Tosalet 4.020, Arenal 4.290, Puerto 4.450, Montañar 4.670 y Cap Martí 4.890. La mitad de los compradores son extranjeros y los polacos el 6. Conclusión: mercado de capital y segunda residencia, así que cuenta con revalorización y uso propio antes que con flujo de caja.",
    ],
  },
  torrevieja: {
    pl: [
      "Dane, które porządkują ten rynek: 2 570 €/m², 4 200 transakcji rocznie, 95 dni ekspozycji i ROI 6,2 procent brutto. Rozstrzał w gminie wynosi 650 €/m²: El Acequión 2 480, La Mata 2 690, Playa de los Locos 2 960, Playa Flamenca 3 070 i Punta Prima 3 130. Kupujący z zagranicy to 46 procent, Polacy 9 procent, czyli najwięcej po Quesadzie. Wniosek: najwyższą płynność ma środek cenowy, a El Acequión to adres pod remont i najem całoroczny, nie pod widok.",
    ],
    en: [
      "Data that organises this market: 2,570 per m², 4,200 sales a year, 95 days on market and a 6.2 percent gross yield. The internal spread is 650 per m²: El Acequión 2,480, La Mata 2,690, Playa de los Locos 2,960, Playa Flamenca 3,070 and Punta Prima 3,130. Foreign buyers are 46 percent and Poles 9 percent, the second highest after Quesada. The conclusion: liquidity peaks in the middle of the price range, while El Acequión is a renovation and year-round letting address, not a view address.",
    ],
    es: [
      "Datos que ordenan este mercado: 2.570 por m², 4.200 operaciones al año, 95 días de exposición y un 6,2 por ciento bruto. La horquilla interna es de 650 por m²: El Acequión 2.480, La Mata 2.690, Playa de los Locos 2.960, Playa Flamenca 3.070 y Punta Prima 3.130. Los extranjeros son el 46 por ciento y los polacos el 9, el segundo más alto tras Quesada. Conclusión: la liquidez está en el tramo medio y El Acequión es dirección de reforma y alquiler anual, no de vistas.",
    ],
  },

  mazarron: {
    pl: [
      "Dane, które warto mieć przed sobą: 2 020 €/m², dynamika 7,6 procent r/r, 900 transakcji i 115 dni ekspozycji, przy ROI 6,4 procent brutto. Rozstrzał w gminie wynosi 530 €/m²: Mazarrón Centro 1 700, El Alamillo 2 070, Bolnuevo 2 130 i Puerto de Mazarrón 2 230. Kupujący z zagranicy to 35 procent, Polacy 5 procent, czyli mniej niż w kurortach na północy. Wniosek: najwyższy zwrot daje centrum i El Alamillo, a Puerto jest adresem pod najem letni i własne wakacje.",
    ],
    en: [
      "Data worth having in front of you: 2,020 per m², 7.6 percent growth, 900 sales and 115 days on market, with a 6.4 percent gross yield. The internal spread is 530 per m²: Mazarrón Centro 1,700, El Alamillo 2,070, Bolnuevo 2,130 and Puerto de Mazarrón 2,230. Foreign buyers are 35 percent and Poles 5 percent, lower than in northern resorts. The conclusion: the centre and El Alamillo give the best return, while Puerto is for summer letting and your own holidays.",
    ],
    es: [
      "Datos que conviene tener delante: 2.020 por m², crecimiento del 7,6 por ciento, 900 operaciones y 115 días de exposición, con un 6,4 por ciento bruto. La horquilla interna es de 530 por m²: Mazarrón Centro 1.700, El Alamillo 2.070, Bolnuevo 2.130 y Puerto de Mazarrón 2.230. Los extranjeros son el 35 por ciento y los polacos el 5, menos que en los resorts del norte. Conclusión: el centro y El Alamillo dan el mejor retorno, y Puerto es para alquiler de verano y vacaciones propias.",
    ],
  },
  quesada: {
    pl: [
      "Twarde liczby: 2 760 €/m², 800 transakcji rocznie, 105 dni ekspozycji i ROI 6,3 procent brutto. Rozstrzał jest niewielki, 320 €/m²: Doña Pepa 2 600, Centro 2 710 i La Marquesa 2 920, bo cała urbanizacja powstała według jednego planu. Polacy to 7 procent kupujących, najwięcej w całej bazie, a obcokrajowcy 48 procent. Wniosek: to najbardziej polski rynek na Costa Blanca, z najkrótszą ekspozycją w regionie, więc decyzję podejmuje się szybko, a cena zależy od konkretnego osiedla.",
    ],
    en: [
      "Hard numbers: 2,760 per m², 800 sales a year, 105 days on market and a 6.3 percent gross yield. The spread is narrow at 320 per m²: Doña Pepa 2,600, Centro 2,710 and La Marquesa 2,920, because the whole urbanisation was laid out to one plan. Poles make up 7 percent of buyers, the highest in our dataset, and foreigners 48 percent. The conclusion: the most Polish market on the Costa Blanca, with the shortest time on market in the region, so decisions are quick and price follows the specific estate.",
    ],
    es: [
      "Datos duros: 2.760 por m², 800 operaciones al año, 105 días de exposición y un 6,3 por ciento bruto. La horquilla es estrecha, 320 por m²: Doña Pepa 2.600, Centro 2.710 y La Marquesa 2.920, porque toda la urbanización se trazó con un mismo plan. Los polacos son el 7 por ciento de los compradores, el mayor de la base, y los extranjeros el 48. Conclusión: el mercado más polaco de Costa Blanca, con la menor exposición de la región, así que se decide rápido y el precio depende de la urbanización.",
    ],
  },

  villajoyosa: {
    pl: [
      "Liczby do decyzji: 2 620 €/m², dynamika 8,5 procent r/r, 900 transakcji i 115 dni ekspozycji, przy ROI 6,1 procent brutto. Rozstrzał wynosi 490 €/m²: Plans 2 350, Centro 2 520 i Playa Torre 2 840. Kupujący z zagranicy to 45 procent, Polacy 6 procent. Wniosek: cena za metr jest o 80 € niższa niż średnia Costa Blanca, a zwrot wyższy niż w Altea czy Jávea, bo miasto żyje z portu i fabryk czekolady, a nie tylko z sezonu.",
    ],
    en: [
      "Numbers for the decision: 2,620 per m², 8.5 percent growth, 900 sales and 115 days on market, with a 6.1 percent gross yield. The spread is 490 per m²: Plans 2,350, Centro 2,520 and Playa Torre 2,840. Foreign buyers are 45 percent and Poles 6 percent. The conclusion: the square metre is 80 below the Costa Blanca average while the yield beats Altea or Jávea, because the town lives off its port and chocolate factories rather than the season alone.",
    ],
    es: [
      "Cifras para decidir: 2.620 por m², crecimiento del 8,5 por ciento, 900 operaciones y 115 días de exposición, con un 6,1 por ciento bruto. La horquilla es de 490 por m²: Plans 2.350, Centro 2.520 y Playa Torre 2.840. Los extranjeros son el 45 por ciento y los polacos el 6. Conclusión: el metro está 80 por debajo de la media de Costa Blanca y la rentabilidad supera a Altea o Jávea, porque el pueblo vive del puerto y de las fábricas de chocolate y no solo de la temporada.",
    ],
  },
  "l-albir": {
    pl: [
      "Dane, które wyjaśniają ten rynek: 3 310 €/m², dynamika 8 procent r/r, ale tylko 600 transakcji rocznie i 130 dni ekspozycji, przy ROI 5,4 procent brutto. Rozstrzał w gminie to 430 €/m²: Sierra Albir 3 090, Centro 3 200 i Playa del Albir 3 520. Obcokrajowcy to 55 procent kupujących, najwięcej w bazie, Polacy 5 procent. Wniosek: podaż jest zamknięta przez park Serra Gelada, więc to rynek kapitału - licz na wzrost wartości i widok, nie na szybki zwrot z czynszu.",
    ],
    en: [
      "Data that explains this market: 3,310 per m², 8 percent growth, but only 600 sales a year and 130 days on market, with a 5.4 percent gross yield. The internal spread is 430 per m²: Sierra Albir 3,090, Centro 3,200 and Playa del Albir 3,520. Foreigners are 55 percent of buyers, the highest in our dataset, and Poles 5 percent. The conclusion: supply is capped by the Serra Gelada park, so this is a capital market: count on value growth and the view, not a quick rental return.",
    ],
    es: [
      "Datos que explican este mercado: 3.310 por m², crecimiento del 8 por ciento, pero solo 600 operaciones al año y 130 días de exposición, con un 5,4 por ciento bruto. La horquilla interna es de 430 por m²: Sierra Albir 3.090, Centro 3.200 y Playa del Albir 3.520. Los extranjeros son el 55 por ciento de los compradores, el mayor de la base, y los polacos el 5. Conclusión: la oferta está cerrada por el parque de Serra Gelada, así que es mercado de capital: cuenta con revalorización y vistas, no con retorno rápido.",
    ],
  },

  // END
};


const NOTES: Record<string, Partial<Record<Locale, string[]>>> = {
  alicante: {
    pl: [
      "W Alicante o wyborze dzielnicy decyduje tramwaj, nie widok. Playa de San Juan i Cabo de las Huertas mają przystanek linii 4 i 5, więc do centrum i na lotnisko jedzie się bez samochodu, a wśród sąsiadów przeważają stali rezydenci, nie turyści z walizkami. PAU 5 przyciąga tych, którzy chcą nowego budownictwa z garażem podziemnym, Vistahermosa tych, którzy wolą dom z ogrodem w granicach miasta. Dwie rzeczy sprawdzaj przed podpisaniem: wysokość wspólnoty w blokach z basenem przy San Juan oraz hałas samolotów nad Albufereta. To rynek pracy, nie wakacji: najemcą bywa pracownik uniwersytetu albo szpitala, więc umowa idzie na rok, a nie na dwa tygodnie sierpnia.",
    ],
    en: [
      "In Alicante the tram decides the neighbourhood far more than the sea view does. Playa de San Juan and Cabo de las Huertas have their own stops on lines 4 and 5, so the centre and the airport are reachable without a car, and most neighbours live here year round rather than unpacking suitcases for a fortnight. PAU 5 attracts buyers who want new build with an underground garage, Vistahermosa those who prefer a house with a garden inside the city limits. Two things matter before you sign: community fees in the pool blocks along San Juan, and aircraft noise over Albufereta. This is a working city, not a holiday one: tenants are often university or hospital staff, so contracts run for a year, not for two weeks of August.",
    ],
    es: [
      "En Alicante el tranvía decide el barrio mucho más que las vistas al mar. Playa de San Juan y Cabo de las Huertas tienen parada propia en las líneas 4 y 5, así que el centro y el aeropuerto quedan sin coche, y entre los vecinos predominan los residentes todo el año, no quien deshace la maleta dos semanas. PAU 5 atrae a quien busca obra nueva con garaje subterráneo, Vistahermosa a quien prefiere casa con jardín dentro del municipio. Antes de firmar conviene mirar dos cosas: la comunidad en los bloques con piscina de San Juan y el ruido de aviones sobre Albufereta. Es una ciudad de trabajo, no de vacaciones: el inquilino suele ser personal de la universidad o del hospital, y el contrato va por años, no por dos semanas de agosto.",
    ],
  },
  torrevieja: {
    pl: [
      "Torrevieja ma dwa rynki pod jedną nazwą. W El Acequión i wokół Plaza de la Constitución metr jest najtańszy, ale bloki z lat osiemdziesiątych wymagają wymiany instalacji i wind, więc budżet na remont trzeba doliczyć od razu. La Mata i Punta Prima to drugi biegun: nowsze osiedla z basenami, bliskość Parque Natural de las Lagunas i plaż, gdzie sezon trwa od maja do października. Kupujący z Polski trafiają tu najczęściej po poleceniu rodziny i pytają o najem całoroczny. Ten jest realny, bo w mieście działa szpital, sądy i urzędy, ale nie w każdej dzielnicy: w El Acequión zimą pustoszeją całe klatki. Sprawdź też położenie względem ramblas, bo przy gota fría woda wchodzi do parterów.",
    ],
    en: [
      "Torrevieja is really two markets under one name. Around El Acequión and Plaza de la Constitución the price per square metre is the lowest in town, but eighties buildings need rewiring, lifts and new windows, so budget the renovation on day one. La Mata and Punta Prima sit at the other end: newer estates with pools, the salt lagoon nature park and beaches where the season runs from May to October. Polish buyers usually arrive on a relative's recommendation and ask about year-round letting. That demand is real because the town has a hospital, courts and government offices, though not in every district: in El Acequión whole stairwells empty out in winter. Check the position against the ramblas too, since gota fría floods reach ground floors.",
    ],
    es: [
      "Torrevieja son dos mercados con un solo nombre. En El Acequión y alrededor de la Plaza de la Constitución el metro es el más barato del municipio, pero los edificios de los ochenta piden instalaciones, ascensores y ventanas nuevas, así que el presupuesto de reforma entra desde el primer día. La Mata y Punta Prima están en el otro extremo: urbanizaciones más recientes con piscina, el parque natural de las lagunas y playas con temporada de mayo a octubre. El comprador polaco suele llegar por recomendación de un familiar y pregunta por el alquiler anual. Esa demanda existe porque hay hospital, juzgados y oficinas, aunque no en todos los barrios: en El Acequión se vacían portales enteros en invierno. Mira también la posición frente a las ramblas, porque con la gota fría el agua llega a los bajos.",
    ],
  },
  benidorm: {
    pl: [
      "Benidorm to jedyne miasto na wybrzeżu, gdzie wieżowiec jest normą, a nie wyjątkiem. Playa de Levante i Rincón de Loix skupiają apartamenty z widokiem na morze i największy ruch turystyczny, Playa de Poniente i Foietes są spokojniejsze i tańsze, Sierra Helada daje wille na zboczu z dala od zgiełku. Przy zakupie pod najem policz trzy koszty, o których nie mówi ogłoszenie: winda i basen w wieżowcu potrafią kosztować 200 euro miesięcznie, licencja turystyczna w Benidorm jest limitowana przez plan urbanistyczny, a konkurencja hoteli all inclusive zjada marżę w lipcu i sierpniu. Kupujący z Polski najczęściej biorą tu lokal pod wynajem lub pod własne wakacje, rzadko po to, by w nim zamieszkać na stałe.",
    ],
    en: [
      "Benidorm is the one town on this coast where a tower block is the rule, not the exception. Playa de Levante and Rincón de Loix hold the sea-view flats and the heaviest tourist traffic, Playa de Poniente and Foietes are calmer and cheaper, while Sierra Helada offers hillside villas away from the noise. If you buy to let, price in three costs the listing never mentions: lift and pool charges in a tower can reach 200 euros a month, tourist licences are capped by the town plan, and all inclusive hotels eat your margin in July and August. Polish buyers here usually take a flat for letting or for their own holidays, rarely to live in all year.",
    ],
    es: [
      "Benidorm es el único municipio de la costa donde el rascacielos es la norma y no la excepción. Playa de Levante y Rincón de Loix concentran los pisos con vistas y el mayor tráfico turístico, Playa de Poniente y Foietes son más tranquilos y baratos, y Sierra Helada ofrece chalets en ladera lejos del ruido. Si compras para alquilar, mete en la cuenta tres costes que el anuncio no menciona: ascensor y piscina en una torre pueden llegar a 200 euros al mes, la licencia turística está limitada por el planeamiento y los hoteles de todo incluido se comen el margen en julio y agosto. El comprador polaco suele buscar aquí piso para alquilar o para sus propias vacaciones, rara vez para vivir todo el año.",
    ],
  },
  calpe: {
    pl: [
      "W Calpe cena zależy od tego, czy z okna widać Peñón de Ifach. Playa de la Fossa i Maryvilla płacą za ten widok najwięcej, Canuta i Oltamar schodzą z ceny, bo są dalej od wody i wymagają samochodu, a Puerto łączy jedno i drugie z codziennymi usługami w zasięgu spaceru. Miasto ma charakter portowy: Lonja de Pescadores i restauracje przy porcie pracują cały rok, co daje najemcom bazę poza sezonem. Uwaga na dwie rzeczy typowe dla Calpe: wąskie uliczki starego centrum utrudniają parkowanie i podnoszą koszt remontu, a część apartamentów w wieżowcach przy Fossa ma wspólnoty powyżej 150 euro miesięcznie. Kupujący z Polski wybierają tu zwykle lokal 60-80 m² pod najem wakacyjny i własne urlopy.",
    ],
    en: [
      "In Calpe the price hinges on whether Peñón de Ifach fills the window. Playa de la Fossa and Maryvilla pay the most for that view, Canuta and Oltamar drop in price because they sit further from the water and need a car, and Puerto combines both with everyday services within walking distance. The town keeps its fishing character: the Lonja de Pescadores and the harbour restaurants work all year, which gives tenants a base outside summer. Two local catches: the narrow streets of the old centre make parking hard and renovation expensive, and some front-line towers on the Fossa carry community fees above 150 euros a month. Polish buyers tend to take a 60 to 80 square metre flat for holiday letting and their own breaks.",
    ],
    es: [
      "En Calpe el precio depende de si el Peñón de Ifach entra por la ventana. Playa de la Fossa y Maryvilla pagan más por esas vistas, Canuta y Oltamar bajan porque están lejos del agua y exigen coche, y Puerto suma lo uno y lo otro con servicios diarios a pie. El pueblo conserva carácter pesquero: la Lonja de Pescadores y los restaurantes del puerto trabajan todo el año, lo que da al inquilino una base fuera de temporada. Dos avisos propios de Calpe: las calles estrechas del casco antiguo complican el aparcamiento y encarecen la reforma, y algunos bloques en primera línea de la Fossa tienen comunidades por encima de 150 euros al mes. El comprador polaco suele buscar aquí 60 u 80 metros cuadrados para alquiler vacacional y uso propio.",
    ],
  },
  altea: {
    pl: [
      "Altea sprzedaje biel murów i kopułę Iglesia del Consuelo, ale cenę robi ukształtowanie terenu. Casco Antiguo i Playa de la Roda to stary układ ulic z widokiem na zatokę, gdzie każdy remont wymaga zgody konserwatora, Mascarat i Altea Hills to nowe osiedla na skarpie z ochroną i basenami, a Cap Blanc domyka listę spokojną zabudową willową. Dojazd do Altea Hills prowadzi jedną drogą, więc w sierpniu trzeba doliczyć czas na korek. Z tego powodu kupujący z Polski, którzy chcą łączyć pracę zdalną z wynajmem, wybierają częściej Playa de la Roda niż zbocze. To najdroższy rynek na północy po Jávea, z najniższą rentownością w regionie, więc licz się z tym, że zwrotu nie zobaczysz szybko.",
    ],
    en: [
      "Altea sells white walls and the dome of Iglesia del Consuelo, but the terrain sets the price. Casco Antiguo and Playa de la Roda are old street layouts above the bay where every renovation needs heritage approval, Mascarat and Altea Hills are gated hillside estates with pools, and Cap Blanc closes the list with quiet villa housing. Altea Hills is reached by a single road, so in August add queueing time to every trip. That is why Polish buyers who combine remote work with letting usually choose Playa de la Roda over the slope. After Jávea this is the priciest market in the north with the region's lowest yield, so expect to wait for the return rather than collect it.",
    ],
    es: [
      "Altea vende muros blancos y la cúpula de la Iglesia del Consuelo, pero el precio lo marca el relieve. Casco Antiguo y Playa de la Roda son calles antiguas sobre la bahía donde cada reforma necesita permiso de patrimonio, Mascarat y Altea Hills son urbanizaciones cerradas en ladera con piscina, y Cap Blanc cierra la lista con vivienda tranquila de chalets. A Altea Hills se llega por una sola carretera, así que en agosto hay que sumar cola a cualquier trayecto. Por eso el comprador polaco que mezcla trabajo remoto y alquiler elige más Playa de la Roda que la ladera. Tras Jávea es el mercado más caro del norte y con la rentabilidad más baja de la zona: cuenta con esperar el retorno en lugar de cobrarlo.",
    ],
  },
  denia: {
    pl: [
      "Dénia jest miastem portowym, które dorobiło się marki kulinarnej, i to widać w cenach. Puerto i Les Marines pracują na turystyce i na przeprawie promowej na Ibizę, gdzie hałas silników i ruch ciężarówek przy nabrzeżu są codziennością, dlatego apartamenty z widokiem na port trzeba obejrzeć o świcie, nie w południe. Las Marinas daje plażę i restauracje, La Xara tańszy metr i dojazd do miasta autem, a Montgó spokój i widok na zatokę za cenę stromego podjazdu. Trasa Les Marines w lipcu stoi, więc odległość w kilometrach ma tu mniejsze znaczenie niż czas dojazdu. Kupujący z Polski wybierają Dénia pod wynajem sezonowy i własne wakacje, rzadko pod całoroczny dochód.",
    ],
    en: [
      "Dénia is a port town that built a food reputation, and the prices show it. Puerto and Les Marines run on tourism and on the ferry crossing to Ibiza, where engine noise and lorry traffic along the quay are part of daily life, so view a harbour-facing flat at dawn rather than at noon. Las Marinas offers the beach and restaurants, La Xara a cheaper square metre with a drive into town, and Montgó quiet plus a bay view in exchange for a steep climb. The Les Marines road jams in July, so distance in kilometres matters less here than journey time. Polish buyers pick Dénia for seasonal letting and their own holidays, rarely for year-round income.",
    ],
    es: [
      "Dénia es una ciudad portuaria que se hizo un nombre gastronómico, y se nota en los precios. Puerto y Les Marines viven del turismo y del ferry a Ibiza, donde el ruido de motores y el trasiego de camiones en el muelle son rutina, así que un piso frente al puerto se visita al amanecer y no a mediodía. Las Marinas aporta playa y restaurantes, La Xara un metro más barato con coche hacia el centro, y Montgó tranquilidad y vistas a la bahía a cambio de una cuesta pronunciada. La carretera de Les Marines se atasca en julio, de modo que aquí importan menos los kilómetros que el tiempo de viaje. El comprador polaco elige Dénia para alquiler de temporada y vacaciones propias, rara vez por renta anual.",
    ],
  },
  javea: {
    pl: [
      "Jávea, a właściwie Xàbia, ma najwyższą medianę w całej bazie i najmniejszą liczbę okazji. Arenal to plaża z restauracjami i najem sezonowy, Puerto i Montañar łączą marinę z pierwsze linią, Tosalet i Cap Martí to wille z widokiem na Cabo de San Antonio, często z naya, czyli krytym tarasem, który w tym klimacie jest ważniejszy niż metraż. O tym, ile zapłacisz, decyduje odległość od zatoczki i nasłonecznienie działki, nie rok budowy. Dwie lokalne pułapki: przy Cap Martí część dróg to prywatne drogi sąsiedzkie bez utrzymania, a w Montañar wąskie parcele ograniczają rozbudowę. To rynek kapitału i drugiego domu, z rentownością najniższą na wybrzeżu, więc nie licz tu na szybki zwrot z najmu.",
    ],
    en: [
      "Jávea, or Xàbia, carries the highest median in our whole dataset and the fewest bargains. Arenal is the beach with restaurants and seasonal letting, Puerto and Montañar combine the marina with the front line, Tosalet and Cap Martí are villas looking at Cabo de San Antonio, often with a naya, the covered terrace that matters more here than floor area. What you pay is set by the walk to a cove and by how much sun the plot gets, not by the year of construction. Two local traps: around Cap Martí some roads are private neighbours' tracks with no maintenance, and in Montañar narrow plots limit any extension. This is a capital and second-home market with the lowest yield on the coast, so do not expect a quick rental return.",
    ],
    es: [
      "Jávea, o Xàbia, tiene la mediana más alta de toda la base y las menores oportunidades. Arenal es la playa con restaurantes y alquiler de temporada, Puerto y Montañar unen la marina con la primera línea, Tosalet y Cap Martí son chalets frente al Cabo de San Antonio, muchos con naya, la terraza cubierta que aquí pesa más que los metros. Lo que pagas lo fija el paseo hasta una cala y el sol que recibe la parcela, no el año de construcción. Dos trampas locales: en Cap Martí hay caminos privados de vecinos sin mantenimiento, y en Montañar las parcelas estrechas limitan cualquier ampliación. Es un mercado de capital y segunda residencia con la rentabilidad más baja de la costa, así que no cuentes con un retorno rápido.",
    ],
  },
  "san-miguel-de-salinas": {
    pl: [
      "San Miguel de Salinas to wieś na wzgórzu, z której widać Lagunas de La Mata, a do plaży w Torrevieja jest dziesięć kilometrów. Centro trzyma najwyższą cenę, bo ma kościół, szkołę i sklepy w zasięgu spaceru, El Chaparral żyje z pola golfowego i osiedli willowych, a La Pedrera schodzi najniżej, bo leży najdalej od usług i wymaga auta do wszystkiego. To rynek niemal w całości zbudowany przez obcokrajowców: dominują Brytyjczycy, a polska społeczność jest niewielka i rozproszona, więc polskie usługi trzeba wozić z Torrevieja. Największe ryzyko nie dotyczy ceny, a płynności: gotowych domów jest dużo, kupujących w zimie mało, a sprzedaż potrafi trwać ponad pół roku. Sprawdź też stan instalacji wodnej i legalność rozbudowy, bo wiele domów powstało etapami bez projektu.",
    ],
    en: [
      "San Miguel de Salinas is a hill village looking at the Lagunas de La Mata, ten kilometres from the Torrevieja beaches. Centro holds the top price because church, school and shops are a walk away, El Chaparral lives off its golf course and villa estates, and La Pedrera sits lowest since it is furthest from services and needs a car for everything. This market was built almost entirely by foreigners: British owners dominate and the Polish community is small and spread out, so Polish services come in from Torrevieja. The main risk is not price but liquidity: plenty of finished houses, few buyers in winter, and a sale can take more than six months. Check the water installation and the legality of extensions too, as many homes were built in stages without a project.",
    ],
    es: [
      "San Miguel de Salinas es un pueblo en alto con vistas a las Lagunas de La Mata, a diez kilómetros de las playas de Torrevieja. Centro mantiene el precio más alto porque iglesia, colegio y tiendas quedan a pie, El Chaparral vive de su campo de golf y de urbanizaciones de chalets, y La Pedrera está abajo del todo porque queda lejos de los servicios y exige coche para todo. Es un mercado construido casi entero por extranjeros: mandan los británicos y la comunidad polaca es pequeña y dispersa, así que los servicios polacos llegan desde Torrevieja. El riesgo mayor no es el precio sino la liquidez: hay muchas casas terminadas, pocos compradores en invierno y una venta puede pasar de seis meses. Revisa también la instalación de agua y la legalidad de las ampliaciones, porque muchas casas se hicieron por fases sin proyecto.",
    ],
  },
  "orihuela-costa": {
    pl: [
      "Orihuela Costa to pas plaż i urbanizacji, ciągnący się od Punta Prima do Mil Palmeras, bez jednego centrum. La Zenia ma Zenia Boulevard, plażę i najkrótszy czas do wynajęcia, Cabo Roig i Dehesa de Campoamor płacą za pierwsze linie i zatoczki z skałami, Villamartín i Lomas de Cabo Roig to osiedla przy polach golfowych, gdzie metr jest tańszy, ale samochód jest obowiązkowy. Ta struktura ma konsekwencje prawne: adres jest w gminie Orihuela, a plaża w Orihuela Costa, więc licencję turystyczną i podatek IBI załatwia się w Orihuela, kilkanaście kilometrów w głąb lądu. Kupujący z Polski znają to miejsce z wakacji i pytają o Cala Caleta oraz o to, ile naprawdę trwa dojazd do lotniska poza sezonem, kiedy N-332 się korkuje mniej.",
    ],
    en: [
      "Orihuela Costa is a coastal strip of beaches and estates running from Punta Prima to Mil Palmeras, with no single centre. La Zenia has Zenia Boulevard, the beach and the fastest letting turnaround, Cabo Roig and Dehesa de Campoamor pay for front lines and rocky coves, while Villamartín and Lomas de Cabo Roig are golf-course estates where the square metre is cheaper but a car is mandatory. That layout has legal consequences: the address sits in Orihuela municipality and the beach in Orihuela Costa, so tourist licences and IBI are handled in Orihuela, a dozen kilometres inland. Polish buyers know the area from holidays and ask about Cala Caleta, and about how long the airport really takes off season, when the N-332 queue thins out.",
    ],
    es: [
      "Orihuela Costa es una franja de playas y urbanizaciones que va de Punta Prima a Mil Palmeras, sin un centro único. La Zenia tiene Zenia Boulevard, playa y el alquiler que antes se cierra, Cabo Roig y Dehesa de Campoamor pagan la primera línea y las calas de roca, y Villamartín y Lomas de Cabo Roig son urbanizaciones de golf donde el metro baja pero el coche es obligatorio. Esa estructura tiene consecuencias legales: la dirección está en el municipio de Orihuela y la playa en Orihuela Costa, así que la licencia turística y el IBI se gestionan en Orihuela, a una docena de kilómetros tierra adentro. El comprador polaco conoce la zona por vacaciones y pregunta por Cala Caleta y por lo que tarda de verdad el aeropuerto fuera de temporada, cuando la N-332 se despeja.",
    ],
  },
  "guardamar-del-segura": {
    pl: [
      "Guardamar ma wydmy, park Alfonso XIII i szeroką plażę, ale jego układ cen tłumaczy rzeka Segura, która kilkadziesiąt lat temu wylała i zabrała część miasta. Dlatego Guardamar Playa i Moncayo mają najwyższe ceny, a Centro i El Raso najniższe, przy czym El Raso leży dwa kilometry od wody i wymaga samochodu na każdy zakup. Nowe budynki w pobliżu ujścia rzeki mają wymogi odporności na powódź, co podnosi koszt projektu i ogranicza podaż nowych mieszkań. Zaletą jest całoroczność: Mercado Municipal, szkoły i urzędy działają przez dwanaście miesięcy, a nie cztery, więc najem długoterminowy ma tu realnych chętnych, choć stawki są niższe niż w Torrevieja. Kupujący z Polski doceniają ciszę poza sezonem i bliskość lotniska, 30 minut trasą AP-7.",
    ],
    en: [
      "Guardamar has dunes, the Alfonso XIII park and a wide beach, but its price map is explained by the Segura river, which flooded decades ago and took part of the town with it. That is why Guardamar Playa and Moncayo sit highest and Centro and El Raso lowest, with El Raso two kilometres from the water and needing a car for every errand. New buildings near the river mouth carry flood resilience requirements, which raises project cost and limits new supply. The advantage is year-round life: Mercado Municipal, schools and offices run twelve months rather than four, so long lets find real tenants here, even if rents stay below Torrevieja levels. Polish buyers value the quiet off season and the 30 minute airport run on the AP-7.",
    ],
    es: [
      "Guardamar tiene dunas, el parque Alfonso XIII y una playa amplia, pero su mapa de precios lo explica el río Segura, que hace décadas se desbordó y se llevó parte del pueblo. Por eso Guardamar Playa y Moncayo están arriba y Centro y El Raso abajo, con El Raso a dos kilómetros del agua y necesitando coche para cualquier recado. Los edificios nuevos cerca de la desembocadura tienen requisitos de resistencia a inundaciones, lo que encarece el proyecto y limita la oferta nueva. La ventaja es la vida todo el año: Mercado Municipal, colegios y oficinas funcionan doce meses y no cuatro, así que el alquiler largo encuentra inquilinos reales, aunque las rentas queden por debajo de Torrevieja. El comprador polaco valora la calma fuera de temporada y los 30 minutos al aeropuerto por la AP-7.",
    ],
  },
  "santa-pola": {
    pl: [
      "Santa Pola stoi na dwóch nogach: port rybacki z przeprawą na Tabarca i saliny, które chroni rezerwat Salinas de Santa Pola. Playa de Levante i Varadero to mieszkania blisko wody i promenady, Centro daje najniższy metr i całoroczne usługi, Gran Alacant przyciąga nowszym budownictwem i plażą del Carabassí, ale leży po drugiej stronie góry i bez auta jest odcięty od miasta. Warto wiedzieć, że Gran Alacant administracyjnie należy do Santa Pola, choć funkcjonuje jak osobna miejscowość z własnym centrum handlowym. Komary znad salin to realny temat od czerwca do września, więc mieszkanie na parterze przy wodzie wymaga moskitier. Rynek pracuje na najmie całorocznym lepiej niż sąsiednie kurorty, bo port i zakłady w Elche dają stałe miejsca pracy.",
    ],
    en: [
      "Santa Pola stands on two legs: a fishing port with the Tabarca crossing, and salt pans protected as the Salinas de Santa Pola reserve. Playa de Levante and Varadero mean flats close to the water and the promenade, Centro offers the cheapest square metre with year-round services, and Gran Alacant draws buyers with newer build and Playa del Carabassí, though it sits on the other side of the hill and is cut off from town without a car. Worth knowing: Gran Alacant belongs administratively to Santa Pola yet works like a separate village with its own shopping centre. Mosquitoes from the salt pans are a real issue from June to September, so a ground-floor flat near the water needs screens. Year-round letting works better here than in neighbouring resorts, because the port and the Elche factories provide permanent jobs.",
    ],
    es: [
      "Santa Pola se apoya en dos patas: un puerto pesquero con la travesía a Tabarca y unas salinas protegidas como reserva de Salinas de Santa Pola. Playa de Levante y Varadero son pisos cerca del agua y del paseo, Centro da el metro más barato con servicios todo el año, y Gran Alacant atrae con obra más nueva y la playa del Carabassí, aunque queda al otro lado del monte y sin coche se queda aislado del pueblo. Conviene saber que Gran Alacant pertenece al municipio de Santa Pola pero funciona como núcleo aparte con su propio centro comercial. Los mosquitos de las salinas son tema real de junio a septiembre, así que un bajo junto al agua necesita mosquiteras. El alquiler anual funciona aquí mejor que en los resorts vecinos, porque el puerto y las fábricas de Elche dan empleo estable.",
    ],
  },
  cartagena: {
    pl: [
      "Cartagena to rynek miejski, nie plażowy, i dlatego ceny są tu najniższe w prowincji Murcji. Centro i Santa Lucía dają mieszkania w kamienicach z epoki modernizmu, często bez windy i bez aktualnego przeglądu technicznego, co tłumaczy niską medianę; La Azohía i Isla Plana to przeciwległy biegun, wille i apartamenty z widokiem na zatokę, pół godziny jazdy od miasta. Popyt opiera się na pracy: stocznia, baza marynarki, zakłady w dolinie Escombreras i port wycieczkowy zatrudniają przez cały rok, więc najem długoterminowy jest tu bardziej przewidywalny niż w kurortach. Cena tej lokalizacji to hałas i powietrze w dzielnicach przy porcie oraz brak plaży w samym centrum. Sprawdź ITE budynku, bo bez niego bank może odmówić kredytu.",
    ],
    en: [
      "Cartagena is a city market, not a beach one, which is why prices are the lowest in the Murcia province. Centro and Santa Lucía offer flats in modernista buildings, often without a lift and without a current technical inspection, which explains the low median; La Azohía and Isla Plana are the opposite pole, villas and flats above the bay half an hour from town. Demand rests on employment: the shipyard, the naval base, the Escombreras valley plants and the cruise port hire all year, so long lets here are more predictable than in resorts. The price of the location is noise and air quality in streets near the port, plus no beach in the centre itself. Ask for the building's ITE inspection, since without it a bank may refuse the mortgage.",
    ],
    es: [
      "Cartagena es un mercado de ciudad, no de playa, y por eso los precios son los más bajos de la provincia de Murcia. Centro y Santa Lucía ofrecen pisos en edificios modernistas, a menudo sin ascensor y sin inspección técnica en vigor, lo que explica la mediana baja; La Azohía e Isla Plana son el polo opuesto, chalets y pisos sobre la bahía a media hora del centro. La demanda se apoya en el empleo: astillero, base naval, las plantas del valle de Escombreras y el puerto de cruceros contratan todo el año, así que el alquiler largo aquí es más previsible que en los resorts. El precio de la ubicación es ruido y calidad del aire en las calles junto al puerto, y la ausencia de playa en el propio centro. Pide el ITE del edificio, porque sin él el banco puede negar la hipoteca.",
    ],
  },
  "san-pedro-del-pinatar": {
    pl: [
      "San Pedro del Pinatar żyje z dwóch rzeczy, których nie widać w ogłoszeniu: z salin i z błota. Lo Pagán i Villananitos to plaże płytkiej Mar Menor, gdzie latem stoją setki osób po kolana, a zimą okolica pustoszeje, bo cała infrastruktura pracuje na kuracjuszy i rodziny z dziećmi. Centro trzyma niższy metr i całoroczne usługi, El Mojón daje ciszę i domy przy samej wodzie, blisko granicy z prowincją Alicante. Najważniejsze pytanie przy zakupie dotyczy wody: po kryzysie Mar Menor sprawdź, czy wspólnota ma własne opłaty za utrzymanie plaż i czy ubezpieczenie obejmuje zalanie, bo teren jest nizinny i deszcze potrafią zamknąć ulice. To dobry rynek pod najem rodzinny od czerwca do września, słaby pod dochód całoroczny.",
    ],
    en: [
      "San Pedro del Pinatar runs on two things a listing never shows: the salt pans and the mud. Lo Pagán and Villananitos are shallow Mar Menor beaches where hundreds of people stand knee deep in summer, and in winter the area empties because the whole economy works for spa guests and families with children. Centro keeps the lower square metre with year-round services, El Mojón brings quiet and houses right by the water near the Alicante province border. The question that matters when buying is water: after the Mar Menor crisis, check whether the community carries its own beach maintenance charges and whether your insurance covers flooding, since the land is flat and rain can close streets. This is a good market for family letting from June to September and a weak one for year-round income.",
    ],
    es: [
      "San Pedro del Pinatar vive de dos cosas que no salen en el anuncio: las salinas y el barro. Lo Pagán y Villananitos son playas someras del Mar Menor donde en verano cientos de personas están con el agua a la rodilla, y en invierno la zona se vacía porque toda la economía trabaja para balnearios y familias con niños. Centro mantiene el metro más bajo con servicios todo el año, El Mojón aporta calma y casas junto al agua cerca del límite con la provincia de Alicante. La pregunta clave al comprar es el agua: tras la crisis del Mar Menor, comprueba si la comunidad tiene gastos propios de mantenimiento de playas y si el seguro cubre inundación, porque el terreno es llano y la lluvia puede cerrar calles. Es buen mercado para alquiler familiar de junio a septiembre y flojo para renta anual.",
    ],
  },
  "los-alcazares": {
    pl: [
      "Los Alcázares leży na płaskim brzegu Mar Menor i całe jego życie toczy się wokół wody, która nie ma tu fal. Playa i Los Narejos dają mieszkania kilka kroków od piasku, Centro niższą cenę i usługi przez cały rok, Punta Brava najniższy metr i spokój bocznych ulic. Trzy rzeczy trzeba sprawdzić przed zakupem: wysokość terenu, bo po ulewach rambla zalewa część ulic, stan samej laguny, której jakość wody wciąż wraca w lokalnych debatach, oraz odległość od lotniska Murcia-Corvera, które jest 20 minut drogi i obsługuje tanie loty z kilku kierunków. Latem osiedla puchną od turystów, zimą zostają rezydenci, więc najem krótki daje dochód przez trzy miesiące, a długi opiera się na pracownikach bazy lotniczej i sektora usług w Murcji.",
    ],
    en: [
      "Los Alcázares sits on the flat shore of the Mar Menor and its whole life revolves around water that has no waves. Playa and Los Narejos give flats a few steps from the sand, Centro a lower price with services all year, Punta Brava the cheapest square metre and the calm of side streets. Check three things before buying: the height of the plot, since after heavy rain the rambla floods some streets, the state of the lagoon itself, whose water quality keeps returning in local debate, and the distance to Murcia-Corvera airport, twenty minutes away and serving low cost routes from several countries. In summer the estates swell with tourists, in winter residents remain, so short lets earn for three months while long lets rest on airport and Murcia service sector staff.",
    ],
    es: [
      "Los Alcázares está en la orilla plana del Mar Menor y toda su vida gira en torno a un agua sin olas. Playa y Los Narejos dan pisos a pocos pasos de la arena, Centro un precio más bajo con servicios todo el año, Punta Brava el metro más barato y la calma de las calles laterales. Antes de comprar revisa tres cosas: la altura de la parcela, porque tras lluvias fuertes la rambla inunda algunas calles, el estado de la propia laguna, cuya calidad del agua sigue volviendo al debate local, y la distancia al aeropuerto de Murcia-Corvera, a veinte minutos y con rutas de bajo coste desde varios países. En verano las urbanizaciones se llenan de turistas, en invierno quedan los residentes, así que el alquiler corto gana tres meses y el largo se apoya en el personal del aeropuerto y de los servicios de Murcia.",
    ],
  },
  mazarron: {
    pl: [
      "Mazarrón to gmina górnicza, która nauczyła się żyć z morza, i to widać w rozkładzie cen. Puerto de Mazarrón ma port, plażę i najem sezonowy, Bolnuevo przyciąga widokiem na Gredas de Bolnuevo, czyli formacje piaskowca nad wodą, El Alamillo daje spokojne osiedla z domkami, a Mazarrón Centro, kilka kilometrów w głąb lądu, jest najtańszy, bo to miasto pracy, nie wakacji. Latem liczba mieszkańców rośnie kilkukrotnie, zimą zostają rezydenci i załogi zakładów odsalania oraz gospodarki rolnej. Dwie rzeczy do sprawdzenia: erozja wybrzeża w Bolnuevo, gdzie część działek traci dostęp do plaży, oraz stan dróg osiedlowych, bo wiele urbanizacji powstało przed oddaniem infrastruktury do gminy. To najtańszy sposób wejścia na rynek Costa Cálida z realnym najmem od czerwca do września.",
    ],
    en: [
      "Mazarrón is a mining municipality that learned to live off the sea, and the price map shows it. Puerto de Mazarrón has the port, the beach and seasonal letting, Bolnuevo draws visitors with the Gredas de Bolnuevo sandstone formations above the water, El Alamillo offers quiet estates of small houses, and Mazarrón Centro a few kilometres inland is the cheapest because it is a working town, not a holiday one. In summer the population multiplies several times over, in winter residents and the staff of the desalination and farming industries remain. Two checks: coastal erosion at Bolnuevo, where some plots are losing their path to the beach, and the state of estate roads, since many urbanisations were finished before infrastructure was handed to the council. It is the cheapest way into the Costa Cálida market with real letting from June to September.",
    ],
    es: [
      "Mazarrón es un municipio minero que aprendió a vivir del mar, y el mapa de precios lo demuestra. Puerto de Mazarrón tiene puerto, playa y alquiler de temporada, Bolnuevo atrae por las Gredas de Bolnuevo, formaciones de arenisca sobre el agua, El Alamillo ofrece urbanizaciones tranquilas de casas pequeñas, y Mazarrón Centro, unos kilómetros tierra adentro, es el más barato porque es pueblo de trabajo y no de vacaciones. En verano la población se multiplica varias veces, en invierno quedan residentes y las plantillas de la desaladora y del campo. Dos comprobaciones: la erosión costera en Bolnuevo, donde algunas parcelas pierden el acceso a la playa, y el estado de los caminos de las urbanizaciones, porque muchas se terminaron antes de entregar la infraestructura al ayuntamiento. Es la forma más barata de entrar en Costa Cálida con alquiler real de junio a septiembre.",
    ],
  },
  aguilas: {
    pl: [
      "Águilas jest oddalone od wszystkiego, co znają kupujący z północy, i właśnie dlatego jest tanie. Miasto ma karnawał wpisany do fiest o znaczeniu międzynarodowym, port rybacki, Castillo de San Juan nad zatoką i stację kolejową z końca XIX wieku, która przypomina, że przed turystyką żyło tu górnictwo i kolej. Las Delicias daje plażę i deptak, Calarreona zatoczki z czystą wodą i wille, Centro najniższy metr z całorocznymi usługami, El Hornillo spokój i tarasy z widokiem. Do lotniska Murcia-Corvera jest godzina, do Alicante półtorej, więc to rynek dla osób, które przyjeżdżają na dłużej, a nie na weekend. Tylko 28 procent kupujących to obcokrajowcy, więc ceny negocjuje się z Hiszpanami i bez pośredników z północy.",
    ],
    en: [
      "Águilas sits far from everything northern buyers know, and that is exactly why it is cheap. The town has a carnival registered as an international tourist fiesta, a fishing port, Castillo de San Juan above the bay and a late nineteenth century railway station that recalls the mining and rail economy before tourism. Las Delicias gives the beach and promenade, Calarreona coves of clear water and villas, Centro the lowest square metre with year-round services, El Hornillo quiet and terraces with a view. Murcia-Corvera airport is an hour away and Alicante an hour and a half, so this is a market for people staying longer than a weekend. Only 28 percent of buyers are foreign, so you negotiate with Spanish owners and without northern European intermediaries.",
    ],
    es: [
      "Águilas está lejos de todo lo que conoce el comprador del norte, y por eso es barata. El pueblo tiene un carnaval declarado fiesta de interés turístico internacional, puerto pesquero, el Castillo de San Juan sobre la bahía y una estación de tren de finales del siglo XIX que recuerda la economía minera y ferroviaria anterior al turismo. Las Delicias da playa y paseo, Calarreona calas de agua limpia y chalets, Centro el metro más bajo con servicios todo el año, El Hornillo calma y terrazas con vistas. Al aeropuerto de Murcia-Corvera hay una hora y a Alicante hora y media, así que es un mercado para quien se queda más que un fin de semana. Solo el 28 por ciento de los compradores es extranjero, de modo que se negocia con propietarios españoles y sin intermediarios del norte.",
    ],
  },
  "el-campello": {
    pl: [
      "El Campello kupuje się głównie dla linii 3 tramwaju, nie dla plaży. Przystanek przy Centro pozwala dojechać do Alicante w kwadrans, a to zmienia profil najemcy: zamiast turysty na dwa tygodnie pojawia się pracownik albo student, który podpisuje umowę na rok. Muchavista ma najszerszy pas piasku i najwyższą cenę, Coveta Fumada wille na klifie i najniższą, Centro łączy jedno i drugie z targiem i portem rybackim. Sprawdź dwa detale: odległość od torowiska, bo hałas tramwaju słychać w pierwszych szeregach zabudowy przy Muchavista, oraz czy wspólnota ma windę i basen, bo w blokach z lat dziewięćdziesiątych opłaty potrafią zaskoczyć. Cala de la Merced i Illeta dels Banyets dają turystykę w sezonie, ale poza nim rynek żyje z dojeżdżających do pracy.",
    ],
    en: [
      "People buy El Campello for tram line 3 rather than for the beach. The stop by Centro puts Alicante fifteen minutes away, which changes the tenant profile: instead of a fortnight's holidaymaker you get a commuter or student signing a year's contract. Muchavista has the widest strip of sand and the top price, Coveta Fumada villas on the cliff and the lowest, and Centro brings both together with the market and the fishing harbour. Check two details: the distance to the tracks, since tram noise carries into the first rows of buildings at Muchavista, and whether the community has a lift and pool, because charges in nineties blocks can surprise you. Cala de la Merced and Illeta dels Banyets bring summer tourism, but off season the market runs on commuters.",
    ],
    es: [
      "El Campello se compra por la línea 3 del tranvía más que por la playa. La parada junto a Centro deja Alicante a quince minutos, y eso cambia el perfil del inquilino: en lugar del turista de dos semanas aparece un trabajador o un estudiante que firma por un año. Muchavista tiene la franja de arena más ancha y el precio más alto, Coveta Fumada chalets en el acantilado y el más bajo, y Centro reúne ambos con el mercado y el puerto pesquero. Revisa dos detalles: la distancia a las vías, porque el ruido del tranvía entra en las primeras filas de Muchavista, y si la comunidad tiene ascensor y piscina, porque en bloques de los noventa los gastos sorprenden. Cala de la Merced e Illeta dels Banyets dan turismo en temporada; fuera de ella manda el que va a trabajar.",
    ],
  },
  villajoyosa: {
    pl: [
      "Villajoyosa pachnie czekoladą, dosłownie: zakłady przy wjeździe do miasta pracują od pokoleń i zatrudniają okolicznych mieszkańców. To jeden z powodów, dla których najem całoroczny ma tu sens, inaczej niż w sąsiednim Finestrat. Casco Antiguo to kolorowe kamienice w wąskich uliczkach, gdzie remont wymaga zgody na elewację w określonym kolorze, Playa Torre daje nowsze osiedla i szeroką plażę, Plans spokój i większe działki przy Sierra de Ponotx. Uwaga na hałas: zakłady i port pracują również poza sezonem, więc mieszkanie w pierwszej linii przy nabrzeżu trzeba obejrzeć w dzień roboczy. Tramwaj do Benidorm i Alicante jeździ cały rok, co realnie poszerza grono najemców o osoby pracujące w obu miastach.",
    ],
    en: [
      "Villajoyosa smells of chocolate, literally: the factories by the town entrance have worked for generations and employ local people. That is one reason year-round letting makes sense here, unlike in neighbouring Finestrat. Casco Antiguo is painted houses in narrow lanes, where renovation needs approval for the facade in a set colour, Playa Torre brings newer estates and a wide beach, and Plans offers quiet and larger plots by Sierra de Ponotx. Watch the noise: the plants and the port run outside summer too, so view a front-line flat by the quay on a working day. The tram to Benidorm and Alicante runs all year, which widens the tenant pool to people working in either town.",
    ],
    es: [
      "Villajoyosa huele a chocolate, literalmente: las fábricas de la entrada del pueblo trabajan desde hace generaciones y dan empleo a vecinos. Es una razón por la que el alquiler anual tiene sentido aquí, al contrario que en el vecino Finestrat. Casco Antiguo son casas pintadas en calles estrechas, donde la reforma necesita aprobación de fachada en un color concreto, Playa Torre aporta urbanizaciones nuevas y playa amplia, y Plans tranquilidad y parcelas mayores junto a Sierra de Ponotx. Ojo al ruido: las fábricas y el puerto trabajan también fuera de temporada, así que un piso en primera línea del muelle se visita en día laborable. El tranvía a Benidorm y Alicante funciona todo el año, lo que amplía los inquilinos a quien trabaja en cualquiera de las dos ciudades.",
    ],
  },
  finestrat: {
    pl: [
      "Finestrat jest dwoma miejscami w jednej gminie. W dole leży stara wieś z wąskimi uliczkami i widokiem na Puig Campana, gdzie za metr płaci się najmniej, a w górze Balcón de Finestrat z osiedlami na zboczu i widokiem na zatokę Benidorm, obok Sierra Cortina i Terra Mítica. Do plaży w Benidorm jest kwadrans, ale klimat jest inny: zamiast wieżowców baseny, ochrona i wille. To tłumaczy, dlaczego 50 procent kupujących to obcokrajowcy, a Polacy są tu jedną z większych grup. Rynek jest jednak wąski: około 700 transakcji rocznie i 125 dni ekspozycji, więc sprzedaż może trwać. Sprawdź koszty wspólnoty w osiedlach z ochroną, dostęp do wody i to, czy dojazd do domu nie prowadzi stromą, prywatną drogą bez utrzymania.",
    ],
    en: [
      "Finestrat is two places inside one municipality. Below, the old village keeps narrow lanes and a view of Puig Campana, where the square metre is cheapest; above, Balcón de Finestrat adds hillside estates looking over the Benidorm bay, next to Sierra Cortina and Terra Mítica. The Benidorm beach is fifteen minutes away, yet the feel is different: pools, gated entrances and villas instead of towers. That explains why 50 percent of buyers are foreign, with Poles among the larger groups. The market is narrow though: around 700 transactions a year and 125 days on market, so a sale can take time. Check community costs in gated estates, the water supply, and whether the approach to the house is a steep private road with no maintenance.",
    ],
    es: [
      "Finestrat son dos sitios dentro de un municipio. Abajo queda el pueblo viejo de calles estrechas con vistas al Puig Campana, donde el metro es más barato; arriba, Balcón de Finestrat suma urbanizaciones en ladera sobre la bahía de Benidorm, junto a Sierra Cortina y Terra Mítica. La playa de Benidorm está a quince minutos, pero el ambiente es otro: piscinas, seguridad y chalets en lugar de torres. Eso explica que el 50 por ciento de los compradores sea extranjero, con los polacos entre los grupos mayores. El mercado es estrecho: unas 700 operaciones al año y 125 días de exposición, así que una venta puede tardar. Revisa gastos de comunidad en urbanizaciones cerradas, el suministro de agua y si el acceso a la casa es un camino privado en cuesta sin mantenimiento.",
    ],
  },
  "l-albir": {
    pl: [
      "L'Albir to jedna ulica, Paseo de las Estrellas, i wszystko inne wokół niej. Po jednej stronie morze i szeroka żwirowa plaża pod Serra Gelada, po drugiej apartamenty, restauracje i sklepy, a dalej, wyżej, Sierra Albir z willami i ciszą. Ponieważ park naturalny Serra Gelada blokuje zabudowę od góry, nowych mieszkań prawie nie przybywa, i to jest główny mechanizm cenowy tego miejsca. Konsekwencja jest podwójna: wartość rośnie wolniej niż w Benidorm, ale nie ma ryzyka, że za dwa lata ktoś zasłoni widok. Sprawdź, czy nieruchomość nie leży w strefie ochronnej parku, bo wtedy rozbudowa jest praktycznie niemożliwa, oraz ile trwa dojazd do Alicante poza autostradą, bo AP-7 jest jedyną szybką opcją.",
    ],
    en: [
      "L'Albir is one street, Paseo de las Estrellas, and everything else around it. On one side the sea and a wide pebble beach under Serra Gelada, on the other flats, restaurants and shops, and higher up Sierra Albir with villas and quiet. Because the Serra Gelada natural park blocks building on the mountain side, almost no new homes appear, and that is the main price mechanism here. The consequence cuts both ways: values grow more slowly than in Benidorm, but nobody can block your view in two years. Check whether the property sits inside the park protection zone, where extension is practically impossible, and how long Alicante takes off the motorway, since the AP-7 is the only fast option.",
    ],
    es: [
      "L'Albir es una calle, Paseo de las Estrellas, y todo lo demás alrededor. A un lado el mar y una playa amplia de grava bajo Serra Gelada, al otro pisos, restaurantes y tiendas, y más arriba Sierra Albir con chalets y silencio. Como el parque natural de Serra Gelada bloquea la edificación por la montaña, casi no aparecen viviendas nuevas, y ese es el mecanismo de precio del lugar. La consecuencia es doble: el valor sube más despacio que en Benidorm, pero nadie te tapará las vistas en dos años. Comprueba si la vivienda está en la zona protegida del parque, donde ampliar es prácticamente imposible, y cuánto se tarda a Alicante fuera de la autopista, porque la AP-7 es la única opción rápida.",
    ],
  },
  quesada: {
    pl: [
      "Ciudad Quesada nie jest wsią ani miastem, a urbanizacją zaprojektowaną od zera w gminie Rojales, z własnym centrum handlowym, kościołem i polem golfowym La Marquesa w środku. To wyjaśnia jej najkrótszą ekspozycję w regionie: kupujący wie, co dostaje, bo wszystko jest już zbudowane, a nie obiecane na planie. Centro daje usługi w zasięgu spaceru, La Marquesa wille i apartamenty przy golfie z basenami, Doña Pepa spokój i niższy metr przy Sierra de Callosa. Nie ma tu plaży: do Guardamar jedzie się dziesięć kilometrów, więc samochód jest koniecznością. Sprawdź odbiór urbanizacji, wpis basenu do licencji i wysokość wspólnoty, a także plan miejscowy Rojales, bo część starszych posesji ma rozbudowy bez pozwolenia, które blokują kredyt.",
    ],
    en: [
      "Ciudad Quesada is neither a village nor a town but an urbanisation designed from scratch inside Rojales, with its own shopping centre, church and the La Marquesa golf course at the heart of it. That explains the shortest time on market in the region: buyers know what they get because everything is already built rather than promised on a plan. Centro puts services within walking distance, La Marquesa offers villas and golf-side flats with pools, and Doña Pepa means quiet and a lower square metre by Sierra de Callosa. There is no beach: Guardamar is ten kilometres away, so a car is essential. Confirm the urbanisation sign-off, that any pool is on the licence and the level of community fees, and read the Rojales town plan, since some older plots carry unpermitted extensions that block a mortgage.",
    ],
    es: [
      "Ciudad Quesada no es un pueblo ni una ciudad sino una urbanización diseñada desde cero dentro de Rojales, con su propio centro comercial, iglesia y el campo de golf La Marquesa en el centro. Eso explica el menor tiempo de venta de la región: el comprador sabe qué recibe porque todo está construido y no prometido en un plano. Centro deja los servicios a pie, La Marquesa ofrece chalets y pisos junto al golf con piscina, y Doña Pepa tranquilidad y un metro más bajo junto a Sierra de Callosa. No hay playa: Guardamar queda a diez kilómetros, así que el coche es imprescindible. Confirma la recepción de la urbanización, que la piscina esté en licencia y el nivel de comunidad, y lee el planeamiento de Rojales, porque algunas parcelas antiguas tienen ampliaciones sin permiso que bloquean la hipoteca.",
    ],
  },
};

export function cityMarketNote(slug: string, locale: Locale): CityMarketNote | null {
  const paragraphs = NOTES[slug]?.[locale];
  if (!paragraphs || paragraphs.length === 0) return null;
  const extra = CITY_EXTRA[slug]?.[locale] ?? [];
  return { heading: HEADING[locale], paragraphs: [...paragraphs, ...extra] };
}
