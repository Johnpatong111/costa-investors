import type { Locale } from "../i18n/config";

/**
 * Nota per dzielnica, wstrzykiwana do stron usług i raportów cenowych na
 * poziomie dzielnicy (/{service}/{city}/{district}, /ceny-m2/{city}/{district}).
 *
 * Powód: dzielnice o tej samej nazwie ("Centro") w różnych miastach miały
 * identyczny szkielet i różniły się tylko liczbami, przez co Jaccard sięgał 0.73.
 * Klucz: `${citySlug}/${districtSlug}`.
 */

export interface DistrictMarketNote {
  heading: string;
  paragraphs: string[];
}

const HEADING: Record<Locale, string> = {
  pl: "Co ten adres znaczy w praktyce",
  en: "What this address means in practice",
  es: "Qué significa esta dirección en la práctica",
};

const NOTES: Record<string, Partial<Record<Locale, string[]>>> = {
  "guardamar-del-segura/centro": {
    pl: [
      "Centro w Guardamar to dzielnica codzienności, nie plaży: Mercado Municipal, Ayuntamiento, apteka i szkoły są w promieniu kilkuset metrów, a do wydm i morza idzie się około kilometra, więc poranek zaczyna się od spaceru, nie od ręcznika. Przeważają kamienice z lat 2000-2015, czyli budynki po hiszpańskiej normie technicznej, z windą i garażem, co w starszym hiszpańskim śródmieściu nie jest oczywiste. Metr jest tu tańszy niż w Guardamar Playa, a najem trwa dłużej, bo trafia do osób pracujących w mieście, nie do turystów. Latem sprawdź parking: wąskie ulice przy targu zapełniają się przed dziewiątą.",
      "Praktyczna różnica wobec sąsiednich gmin: urząd, sąd i szkoła językowa są w jednym miejscu, więc najemca bez samochodu załatwia wszystko pieszo, a to w tym rejonie rzadkość. Za to wieczorem nie ma tu życia z promenady i trzeba zejść nad wodę, żeby znaleźć restaurację z widokiem.",
    ],
    en: [
      "Centro in Guardamar is the everyday district, not the beach one: Mercado Municipal, the Ayuntamiento, a pharmacy and schools all sit within a few hundred metres, while the dunes and the sea are about a kilometre away, so the morning starts with a walk rather than a towel. Most buildings date from 2000 to 2015, meaning Spanish technical code, a lift and a garage, which is not a given in older Spanish town centres. The square metre costs less than in Guardamar Playa and lets last longer, because tenants work in town rather than come for a fortnight. In summer check parking: the narrow streets by the market fill up before nine.",
      "The practical difference against neighbouring municipalities: town hall, court and language school sit in one place, so a tenant without a car settles everything on foot, which is rare in this area. In exchange there is no promenade life in the evening, and you walk down to the water for a restaurant with a view.",
    ],
    es: [
      "Centro en Guardamar es el barrio de lo cotidiano, no el de la playa: Mercado Municipal, Ayuntamiento, farmacia y colegios quedan a pocos cientos de metros, mientras las dunas y el mar están a un kilómetro, así que la mañana empieza con un paseo y no con la toalla. Predominan los edificios de 2000 a 2015, es decir, con normativa técnica española, ascensor y garaje, algo que no siempre hay en cascos antiguos. El metro cuesta menos que en Guardamar Playa y los alquileres duran más, porque el inquilino trabaja en el pueblo y no viene dos semanas. En verano mira el aparcamiento: las calles estrechas del mercado se llenan antes de las nueve.",
      "La diferencia práctica con los municipios vecinos: ayuntamiento, juzgado y escuela de idiomas están en el mismo sitio, así que un inquilino sin coche lo resuelve todo a pie, algo raro en esta comarca. A cambio no hay vida de paseo por la tarde y hay que bajar al agua para cenar con vistas.",
    ],
  },
  "quesada/centro": {
    pl: [
      "Centro w Ciudad Quesada nie przypomina hiszpańskiego casco antiguo, bo go tu nigdy nie było: to część urbanizacji zaprojektowanej w gminie Rojales, z kościołem, supermarketem i restauracjami rozłożonymi wokół kilku placów. Zabudowa jest niska, z ogrodami i basenami, a odległości pokonuje się pieszo tylko wewnątrz osiedla, bo do plaży w Guardamar jest dziesięć kilometrów. Przewaga tego adresu to gotowa infrastruktura i sąsiedzi z północy Europy, którzy zostają na zimę, więc sklepy i gastronomia nie zamykają się w październiku. Minus: brak widoku na morze i konieczność posiadania auta do każdej większej sprawy.",
      "Druga strona tego adresu jest administracyjna: numer posesji należy do Rojales, więc podatki, pozwolenia i odbiory załatwia się w tamtejszym urzędzie, a nie w Quesadzie, mimo że nazwa osiedla brzmi jak osobna miejscowość. Przy zakupie starszego domu poproś o kserokopię licencji i deklarację energetyczną, bo bez nich bank wyceni nieruchomość ostrożniej.",
    ],
    en: [
      "Centro in Ciudad Quesada does not look like a Spanish casco antiguo, because one never existed here: this is part of an urbanisation laid out inside Rojales, with a church, a supermarket and restaurants arranged around a few squares. Housing is low rise with gardens and pools, and you walk only within the estate, since Guardamar beach is ten kilometres away. The advantage of this address is finished infrastructure and neighbours from northern Europe who stay for winter, so shops and restaurants do not close in October. The downside is no sea view and a car for anything beyond the estate.",
      "The other side of this address is administrative: the street number belongs to Rojales, so taxes, permits and sign-offs go through that town hall rather than Quesada, even though the estate name sounds like a separate place. For an older house, ask for a copy of the licence and the energy certificate, since without them a bank will value the property more cautiously.",
    ],
    es: [
      "Centro en Ciudad Quesada no se parece a un casco antiguo español porque aquí nunca hubo uno: es parte de una urbanización trazada dentro de Rojales, con iglesia, supermercado y restaurantes repartidos en torno a unas plazas. La vivienda es baja, con jardín y piscina, y solo se camina dentro de la urbanización, porque la playa de Guardamar está a diez kilómetros. La ventaja de esta dirección es la infraestructura terminada y unos vecinos del norte de Europa que se quedan el invierno, así que tiendas y restaurantes no cierran en octubre. La pega es que no hay vistas al mar y hace falta coche para cualquier gestión.",
      "La otra cara es administrativa: el número de la casa pertenece a Rojales, así que impuestos, licencias y recepciones se tramitan en ese ayuntamiento y no en Quesada, aunque el nombre de la urbanización suene a núcleo aparte. Para una casa antigua pide copia de la licencia y el certificado energético, porque sin ellos el banco valora con más cautela.",
    ],
  },
  "aguilas/centro": {
    pl: [
      "Centro w Águilas leży nad zatoką, ale nie na plaży: między kamienicami a wodą jest port i Castillo de San Juan, więc widok jest na ruch statków, nie na piasek. To najtańszy adres w mieście i zarazem najbardziej całoroczny, bo w promieniu spaceru działają Ayuntamiento, rynek, szkoły i przychodnia, a stacja kolejowa z końca XIX wieku obsługuje połączenia do Murcji. Kupujący dostaje tu zwykle mieszkanie w budynku z lat siedemdziesiątych, często bez windy, z niską wspólnotą, co przy ROI 6,8 procent daje najlepszy stosunek ceny do dochodu w gminie. Karnawał w lutym zapełnia ulice, ale nie podnosi czynszów tak jak sierpień.",
    ],
    en: [
      "Centro in Águilas sits above the bay rather than on the beach: between the buildings and the water lie the port and Castillo de San Juan, so you look at ships moving, not sand. It is the cheapest address in town and also the most year-round, since the Ayuntamiento, the market, schools and a clinic are a short walk away, and the late nineteenth century station still runs services to Murcia. What you get is usually a flat in a seventies building, often without a lift, with low community fees, which at a 6.8 percent yield makes the best price-to-income ratio in the municipality. The February carnival fills the streets but does not lift rents the way August does.",
    ],
    es: [
      "Centro en Águilas está sobre la bahía y no en la playa: entre los edificios y el agua quedan el puerto y el Castillo de San Juan, así que se mira el trasiego de barcos, no la arena. Es la dirección más barata del pueblo y a la vez la más anual, porque Ayuntamiento, mercado, colegios y ambulatorio están a un paseo, y la estación de finales del siglo XIX sigue con servicios a Murcia. Lo que se compra suele ser un piso de los años setenta, a menudo sin ascensor, con comunidad baja, lo que con un 6,8 por ciento da la mejor relación precio-ingreso del municipio. El carnaval de febrero llena las calles, pero no sube las rentas como agosto.",
    ],
  },
  "cartagena/centro": {
    pl: [
      "Centro w Kartagenie to dzielnica kamienic wokół portu i ratusza, gdzie mieszkanie kupuje się dla dojścia do pracy, nie dla widoku. Teatro Romano, dworzec i kampus Universidad Politécnica są w promieniu kilku ulic, więc najem podpisują studenci i pracownicy portu, a nie turyści, i dlatego umowy trwają cały rok przy ROI 6,6 procent. Cena jest niska, ale rachunek trzeba domknąć remontem: część budynków z początku XX wieku nie ma aktualnego przeglądu technicznego, a bez niego bank nie da kredytu. Hałas z nabrzeża i jakość powietrza w dolinie Escombreras to realny koszt tego adresu, więc obejrzyj mieszkanie w dzień roboczy, najlepiej przy otwartym oknie.",
    ],
    en: [
      "Centro in Cartagena is a district of townhouses around the port and the town hall, where you buy a flat for the walk to work, not for the view. Teatro Romano, the station and the Universidad Politécnica campus are a few streets away, so tenants are students and port staff rather than tourists, which is why contracts run all year at a 6.6 percent yield. The price is low, but the bill only closes after renovation: some early twentieth century buildings lack a current technical inspection, and without it a bank will not lend. Noise from the quay and air quality in the Escombreras valley are the real cost of this address, so view the flat on a working day, ideally with the window open.",
    ],
    es: [
      "Centro en Cartagena es un barrio de edificios alrededor del puerto y el ayuntamiento, donde el piso se compra por el paseo al trabajo y no por las vistas. Teatro Romano, la estación y el campus de la Universidad Politécnica quedan a unas calles, así que los inquilinos son estudiantes y personal del puerto y no turistas, y por eso los contratos duran todo el año con un 6,6 por ciento. El precio es bajo, pero la cuenta solo cierra con reforma: algunos edificios de principios del siglo XX no tienen inspección técnica en vigor y sin ella el banco no presta. El ruido del muelle y la calidad del aire en el valle de Escombreras son el coste real de esta dirección, así que visita el piso en día laborable y con la ventana abierta.",
    ],
  },
  "villajoyosa/centro": {
    pl: [
      "Centro w Villajoyosa to Casco Antiguo z kolorowymi elewacjami, wąskimi uliczkami i domami, które remontowano etapami przez pokolenia. Kupujesz tu atmosferę i bliskość Puerto de Villajoyosa, a nie metraż: mieszkania w kamienicach po remoncie mają często 60-70 m², niskie stropy i okna na zaułek, za to wspólnota jest symboliczna, bo nie ma windy ani basenu. To najniższe ROI w mieście, 6,0 procent, bo cena za metr nie spada tak szybko jak w Plans, a czynsze trzymają poziom dzielnic robotniczych. Przy remoncie sprawdź, czy elewacja ma zgodę na kolor wpisany w plan ochrony zabytków, bo bez niej konserwator wstrzyma prace, i czy budynek nie stoi w zasięgu hałasu zakładów czekoladowych.",
    ],
    en: [
      "Centro in Villajoyosa is the Casco Antiguo of painted facades, narrow lanes and houses renovated in stages over generations. What you buy is atmosphere and the short walk to Puerto de Villajoyosa, not floor area: renovated townhouses are often 60 to 70 square metres with low ceilings and windows onto an alley, but community fees stay symbolic because there is no lift or pool. It has the lowest yield in town at 6.0 percent, since the price per square metre falls more slowly than in Plans while rents stay at working district levels. Before renovating, confirm the facade colour is approved under the heritage plan, or the works will be stopped, and check whether the building sits within earshot of the chocolate factories.",
    ],
    es: [
      "Centro en Villajoyosa es el Casco Antiguo de fachadas pintadas, calles estrechas y casas reformadas por fases a lo largo de generaciones. Aquí se compra ambiente y la cercanía al Puerto de Villajoyosa, no metros: las casas rehabilitadas suelen tener 60 o 70 metros con techos bajos y ventanas a un callejón, aunque la comunidad es simbólica porque no hay ascensor ni piscina. Tiene la rentabilidad más baja del pueblo, un 6,0 por ciento, porque el precio por metro baja más despacio que en Plans y las rentas se quedan en niveles de barrio trabajador. Antes de reformar confirma que el color de fachada está aprobado en el plan de patrimonio, o la obra se para, y mira si el edificio queda dentro del ruido de las fábricas de chocolate.",
    ],
  },
  "san-miguel-de-salinas/centro": {
    pl: [
      "Centro w San Miguel de Salinas to kilka ulic wokół Iglesia de San Miguel, na wzgórzu, z którego widać Lagunas de La Mata. Wszystko, co potrzebne na co dzień, jest w zasięgu spaceru: piekarnia, bank, przychodnia i szkoła, ale po większe zakupy jedzie się do Torrevieja albo do centrum handlowego przy Zenia Boulevard. Mieszkania w centrum są najstarsze w gminie i najtańsze, często bez windy, z widokiem na dachy i laguny zamiast na morze. Popyt jest tu najniższy w mieście, 6,5 w naszej skali, bo kupujący z północy wolą osiedla z basenem, więc sprzedaż mieszkania w centrum trwa dłużej niż domu w El Chaparral. To adres dla kogoś, kto chce żyć w hiszpańskiej wsi, a nie w kurorcie.",
    ],
    en: [
      "Centro in San Miguel de Salinas is a handful of streets around Iglesia de San Miguel, on a hill with a view of the Lagunas de La Mata. Everything for daily life is a walk away: bakery, bank, clinic and school, though bigger shopping means a drive to Torrevieja or the centre by Zenia Boulevard. Flats in the centre are the oldest and cheapest in the municipality, often without a lift, with rooftops and lagoons in the window rather than sea. Demand here is the lowest in town at 6.5 on our scale, because northern buyers prefer estates with a pool, so selling a flat in the centre takes longer than selling a house in El Chaparral. This is an address for someone who wants a Spanish village, not a resort.",
    ],
    es: [
      "Centro en San Miguel de Salinas son unas calles alrededor de la Iglesia de San Miguel, en un alto con vistas a las Lagunas de La Mata. Todo lo del día a día queda a pie: panadería, banco, ambulatorio y colegio, aunque para compras grandes hay que ir a Torrevieja o al centro junto a Zenia Boulevard. Los pisos del centro son los más antiguos y baratos del municipio, a menudo sin ascensor, con tejados y lagunas en la ventana en lugar de mar. La demanda aquí es la más baja del pueblo, 6,5 en nuestra escala, porque el comprador del norte prefiere urbanización con piscina, así que vender un piso en el centro tarda más que una casa en El Chaparral. Es una dirección para quien busca un pueblo español y no un resort.",
    ],
  },
  "el-campello/centro": {
    pl: [
      "Centro w El Campello łączy trzy rzeczy, których nie ma żadna inna dzielnica: przystanek tramwaju, port rybacki z targiem i plażę po drugiej stronie ulicy. Dzięki temu najemca nie musi wybierać między dojazdem do Alicante a życiem nad wodą, a mieszkanie pracuje przez cały rok, także poza sezonem. Kamienice są tu starsze niż w Muchavista, z niższą wspólnotą i mniejszym metrażem, a ROI 5,8 procent to najlepszy wynik w mieście, bo cena za metr jest o 100 euro niższa niż przy szerokiej plaży. Sprawdź hałas linii tramwajowej w budynkach przy torowisku oraz to, czy okna wychodzą na port, gdzie wczesnym rankiem pracują kutry.",
    ],
    en: [
      "Centro in El Campello combines three things no other district has: a tram stop, a fishing port with its market and the beach across the road. That means a tenant does not have to choose between commuting to Alicante and living by the water, and the flat earns all year, including off season. Buildings here are older than in Muchavista, with lower community fees and smaller floor plans, and a 5.8 percent yield is the best in town, because the square metre is 100 euros cheaper than by the wide beach. Check tram noise in blocks along the tracks and whether the windows face the port, where the boats start work early.",
    ],
    es: [
      "Centro en El Campello reúne tres cosas que ningún otro barrio tiene: parada de tranvía, puerto pesquero con lonja y playa al otro lado de la calle. Así el inquilino no tiene que elegir entre ir a Alicante y vivir junto al agua, y el piso trabaja todo el año, también fuera de temporada. Los edificios son más antiguos que en Muchavista, con comunidad más baja y menos metros, y un 5,8 por ciento es la mejor rentabilidad del pueblo, porque el metro cuesta 100 euros menos que junto a la playa ancha. Revisa el ruido del tranvía en los bloques pegados a las vías y si las ventanas dan al puerto, donde las barcas empiezan temprano.",
    ],
  },
  "l-albir/centro": {
    pl: [
      "Centro w L'Albir to odcinek wzdłuż Paseo de las Estrellas, gdzie parter zajmują restauracje i agencje, a wyżej apartamenty z widokiem na zatokę lub na podwórko. Plaża Racó de l'Albir jest po drugiej stronie promenady, więc do wody idzie się dwie minuty, ale za ten adres płaci się mniej niż w Playa del Albir, bo brakuje mu szerokiego widoku na Serra Gelada. Zaletą jest całoroczne życie: piekarnia, przychodnia i sklepy działają w zimie, czego nie można powiedzieć o osiedlach w górach. Ryzyko dotyczy parkowania, bo w lipcu i sierpniu miejsca przy promenadzie znikają przed jedenastą, oraz tego, że nowa zabudowa jest tu praktycznie zablokowana przez plan ochrony parku.",
    ],
    en: [
      "Centro in L'Albir is the stretch along Paseo de las Estrellas, where restaurants and agencies occupy the ground floors and flats above look either at the bay or at a courtyard. Racó de l'Albir beach sits across the promenade, so the water is two minutes away, yet this address costs less than Playa del Albir because it lacks the wide Serra Gelada view. The advantage is year-round life: bakery, clinic and shops stay open in winter, which cannot be said of the hillside estates. The risks are parking, since July and August empty the promenade spaces before eleven, and the fact that new building here is effectively blocked by the park protection plan.",
    ],
    es: [
      "Centro en L'Albir es el tramo del Paseo de las Estrellas, donde los bajos los ocupan restaurantes y agencias y arriba hay pisos con vistas a la bahía o a un patio. La playa del Racó de l'Albir queda al otro lado del paseo, así que el agua está a dos minutos, pero esta dirección cuesta menos que Playa del Albir porque le falta la vista amplia a Serra Gelada. La ventaja es la vida todo el año: panadería, ambulatorio y tiendas siguen abiertos en invierno, algo que no ocurre en las urbanizaciones de la montaña. Los riesgos son el aparcamiento, porque en julio y agosto las plazas del paseo desaparecen antes de las once, y que la obra nueva está prácticamente bloqueada por el plan de protección del parque.",
    ],
  },
  "san-pedro-del-pinatar/centro": {
    pl: [
      "Centro w San Pedro to kilka kwartałów wokół Ayuntamiento, gdzie załatwia się wszystkie sprawy urzędowe pieszo, a Parque Lo Pagán jest na tyle blisko, że latem idzie się tam na wieczorny spacer. Mieszkania są starsze i tańsze niż w Lo Pagán czy Villananitos, ale najem trwa dłużej, bo w zimie zostają tu pracownicy salin, sklepów i przychodni, a nie turyści z basenem. Minusem jest brak plaży pod domem: do wody trzeba podjechać lub przejść dwa kilometry. Sprawdź stan instalacji wodnej w budynkach z lat osiemdziesiątych, bo w tej strefie zdarzają się stare rury ołowiane i niska ciśnienie w szczycie sezonu.",
    ],
    en: [
      "Centro in San Pedro is a few blocks around the Ayuntamiento, where every office errand is done on foot, and Parque Lo Pagán is close enough for an evening walk in summer. Flats are older and cheaper than in Lo Pagán or Villananitos, yet lets last longer, because winter keeps the salt pan, shop and clinic staff here rather than pool tourists. The drawback is no beach at the door: the water means a short drive or a two kilometre walk. Check the water installation in eighties buildings, since old lead pipes and low pressure at peak season do occur in this area.",
    ],
    es: [
      "Centro en San Pedro son unas manzanas alrededor del Ayuntamiento, donde todos los trámites se hacen a pie, y el Parque Lo Pagán queda lo bastante cerca para un paseo de tarde en verano. Los pisos son más antiguos y baratos que en Lo Pagán o Villananitos, pero los alquileres duran más, porque en invierno se quedan aquí las plantillas de las salinas, las tiendas y el ambulatorio y no los turistas de piscina. La pega es que no hay playa en la puerta: al agua hay que ir en coche o caminar dos kilómetros. Revisa la instalación de agua en edificios de los ochenta, porque en esta zona aparecen tuberías de plomo y poca presión en pleno verano.",
    ],
  },
  "los-alcazares/centro": {
    pl: [
      "Centro w Los Alcázares to niska zabudowa wokół Ayuntamiento, z usługami, szkołą i przychodnią w promieniu kilku ulic, a Paseo del Mar Menor zaczyna się kilkaset metrów dalej. To najtańszy adres w mieście i najbardziej całoroczny: mieszkania kupują tu ludzie pracujący w Murcji i na lotnisku Corvera, więc umowy podpisuje się na rok, a nie na sierpień. Dwie rzeczy sprawdź przed zakupem: wysokość terenu, bo po ulewach rambla potrafi zalać ulice w tej części miasta, oraz rok budowy, bo część bloków z lat osiemdziesiątych ma wspólnoty bez funduszu remontowego, co przy niskim czynszu oznacza nagłe składki.",
    ],
    en: [
      "Centro in Los Alcázares is low housing around the Ayuntamiento, with shops, a school and a clinic within a few streets, and Paseo del Mar Menor starting a few hundred metres away. It is the cheapest address in town and the most year-round one: flats are bought by people working in Murcia and at Corvera airport, so contracts run for a year rather than for August. Check two things first: the height of the plot, because after heavy rain the rambla can flood streets in this part of town, and the year of construction, since some eighties blocks have no repair fund and low rents mean sudden levies.",
    ],
    es: [
      "Centro en Los Alcázares es vivienda baja alrededor del Ayuntamiento, con tiendas, colegio y ambulatorio a unas calles, y el Paseo del Mar Menor empieza a pocos cientos de metros. Es la dirección más barata del pueblo y la más anual: los pisos los compran quienes trabajan en Murcia y en el aeropuerto de Corvera, así que los contratos van por año y no por agosto. Revisa dos cosas: la altura de la parcela, porque tras lluvias fuertes la rambla inunda calles de esta zona, y el año de construcción, ya que algunos bloques de los ochenta no tienen fondo de reserva y una renta baja se traduce en derramas repentinas.",
    ],
  },
  "guardamar-del-segura/la-marina": {
    pl: [
      "La Marina to pas urbanizacji willowych między Playa de la Marina a Desembocadura del Segura, gdzie domy stoją na dużych działkach z basenami i palmami, a między nimi jeździ się samochodem, nie chodzi. Cena za metr jest wyższa niż w centrum Guardamar, bo kupujący płaci za działkę i prywatność, a nie za bliskość usług. Bliskość ujścia rzeki ma dwie strony: z jednej strony cisza i rezerwat, z drugiej wilgoć, komary i ryzyko zalania po jesiennych ulewach. Sprawdź, czy działka ma ogrodzenie i dostęp do drogi gminnej, bo część dróg w tej strefie to nadal drogi sąsiedzkie bez utrzymania.",
    ],
    en: [
      "La Marina is a run of villa estates between Playa de la Marina and the Desembocadura del Segura, where houses sit on large plots with pools and palms and you drive rather than walk between them. The square metre is higher than in Guardamar centre, because the buyer pays for land and privacy, not for services nearby. The river mouth cuts both ways: silence and a reserve on one side, damp, mosquitoes and flood risk after autumn storms on the other. Confirm the plot is fenced and has access to a council road, since some roads in this strip are still neighbours' tracks with no maintenance.",
    ],
    es: [
      "La Marina es una sucesión de urbanizaciones de chalets entre Playa de la Marina y la Desembocadura del Segura, donde las casas ocupan parcelas grandes con piscina y palmeras y entre ellas se circula en coche, no a pie. El metro cuesta más que en el centro de Guardamar, porque se paga suelo y privacidad y no servicios cerca. La desembocadura tiene dos caras: silencio y reserva por un lado, humedad, mosquitos y riesgo de inundación tras los temporales de otoño por otro. Comprueba que la parcela esté cerrada y con acceso a camino municipal, porque algunos caminos de esta franja siguen siendo privados sin mantenimiento.",
    ],
  },
  "guardamar-del-segura/moncayo": {
    pl: [
      "Moncayo to dzielnica plażowa po północnej stronie Guardamar, gdzie apartamenty stoją w drugiej i trzeciej linii od Playa del Moncayo, a za nimi zaczynają się wydmy i Cabo Cervera. Cena za metr jest tu najwyższa w gminie, ale ROI najniższe, 6,0 procent, bo kupujący płacą za szeroki piasek i widok, a czynsze rosną wolniej niż ceny. To adres sezonowy: od czerwca do września osiedla pracują na turystach, poza sezonem część lokali stoi pusta. Sprawdź odległość od drogi N-332, bo hałas w pierwszych szeregach jest odczuwalny, oraz to, czy wspólnota ma basen, którego utrzymanie podnosi opłaty poza sezonem.",
    ],
    en: [
      "Moncayo is the beach district on the northern side of Guardamar, where flats sit in the second and third row from Playa del Moncayo and the dunes plus Cabo Cervera begin behind them. The square metre is the highest in the municipality, but the yield is the lowest at 6.0 percent, because buyers pay for wide sand and the view while rents climb more slowly than prices. This is a seasonal address: from June to September the estates work for tourists, off season part of the stock stands empty. Check the distance to the N-332, since noise in the first rows is noticeable, and whether the community has a pool whose upkeep raises charges outside summer.",
    ],
    es: [
      "Moncayo es el barrio de playa en el lado norte de Guardamar, donde los pisos están en segunda y tercera línea de Playa del Moncayo y detrás empiezan las dunas y Cabo Cervera. El metro es el más caro del municipio, pero la rentabilidad es la más baja, un 6,0 por ciento, porque se paga arena amplia y vistas mientras las rentas suben más despacio que los precios. Es una dirección de temporada: de junio a septiembre las urbanizaciones trabajan para turistas y fuera de temporada parte del parque queda vacío. Mira la distancia a la N-332, porque el ruido en las primeras filas se nota, y si la comunidad tiene piscina, cuyo mantenimiento sube las cuotas fuera del verano.",
    ],
  },
  "denia/les-marines": {
    pl: [
      "Les Marines to pas apartamentów w pierwszej i drugiej linii szerokiej plaży na północ od portu w Dénia, z nowymi osiedlami z basenami, które budowano głównie pod najem sezonowy. Zaletą jest plaża bez hoteli i bliskość Puerto de Denia oraz centrum handlowego, więc samochód nie jest potrzebny codziennie. Wadą jest jedna droga dojazdowa: w lipcu i sierpniu trasa wzdłuż wybrzeża stoi, a to zmienia czas dojazdu do miasta z dziesięciu minut na trzydzieści. Sprawdź, czy osiedle ma licencję turystyczną dla całego budynku, ile wynosi wspólnota z basenem i czy okna nie wychodzą na ruchliwą trasę.",
    ],
    en: [
      "Les Marines is a strip of flats in the first and second row of the wide beach north of Dénia port, with newer estates and pools built largely for seasonal letting. The upside is a beach without hotels plus the short run to Puerto de Denia and the shopping centre, so a car is not needed every day. The downside is a single access road: in July and August the coastal route jams, turning a ten minute drive into thirty. Confirm the estate holds a tourist licence for the whole building, check the pool community fee, and whether windows face the busy road, which is the most common tenant complaint here.",
    ],
    es: [
      "Les Marines es una franja de pisos en primera y segunda línea de la playa amplia al norte del puerto de Dénia, con urbanizaciones nuevas y piscina pensadas sobre todo para alquiler de temporada. Lo bueno es una playa sin hoteles y la cercanía al Puerto de Denia y al centro comercial, así que no hace falta coche a diario. Lo malo es una sola carretera de acceso: en julio y agosto la ruta del litoral se atasca y convierte diez minutos en treinta. Confirma que la urbanización tenga licencia turística para todo el edificio, mira cuánto es la comunidad con piscina y si las ventanas dan a la carretera.",
    ],
  },
  "denia/las-marinas": {
    pl: [
      "Las Marinas to odcinek willi i apartamentów z ogrodami, gdzie przeważają domy w drugiej linii od Playa de les Deveses i rodziny, które przyjeżdżają na cały sezon, a nie na weekend. Metr jest droższy niż w Les Marines, bo kupujący szukają większej działki i ciszy, a nie widoku z balkonu; w zamian dostają ogród, miejsce na basen i sąsiedztwo bez rotacji turystycznej. Minusy są dwa: do sklepu i restauracji trzeba podjechać, a część działek leży nisko, więc po jesiennych deszczach woda potrafi podejść pod ogrodzenie. Sprawdź plan miejscowy i klasę gruntu, bo część terenów ma ograniczenia związane z ochroną wybrzeża.",
    ],
    en: [
      "Las Marinas is the stretch of villas and flats with gardens where houses in the second row from Playa de les Deveses dominate, along with families who come for the whole season rather than a weekend. The square metre costs more than in Les Marines, because buyers want a bigger plot and quiet rather than a balcony view; in return they get a garden, room for a pool and neighbours without tourist turnover. Two drawbacks: shops and restaurants mean a drive, and some plots sit low, so autumn rain can reach the fence line. Check the town plan and land classification, since parts of this strip carry coastal protection limits.",
    ],
    es: [
      "Las Marinas es el tramo de chalets y pisos con jardín donde predominan las casas en segunda línea de Playa de les Deveses y las familias que vienen toda la temporada y no un fin de semana. El metro cuesta más que en Les Marines, porque se busca parcela mayor y silencio en lugar de vistas desde el balcón; a cambio hay jardín, sitio para piscina y vecinos sin rotación turística. Dos pegas: para tiendas y restaurantes hay que coger el coche, y algunas parcelas están bajas, así que con la lluvia de otoño el agua llega a la valla. Revisa el planeamiento y la clasificación del suelo, porque hay limitaciones por protección del litoral.",
    ],
  },
  "mazarron/puerto-de-mazarron": {
    pl: [
      "Puerto de Mazarrón to najbardziej miejski adres w gminie: apartamenty przy Playa del Puerto, promenada z restauracjami i port rybacki, do którego schodzą kutry. Cena za metr jest najwyższa w Mazarrón, bo wszystko jest pod ręką, ale właśnie dlatego latem jest tu głośno, a parkowanie zajmuje więcej czasu niż spacer. Najem pracuje od czerwca do września i na tym trzeba oprzeć kalkulację, bo poza sezonem część osiedli przy plaży pustoszeje. Sprawdź, czy budynek nie stoi w pierwszej linii hałasu od portu i czy wspólnota ma windę, bo w starszych blokach przy promenadzie to rzadkość, a przy czwartym piętrze bez windy zmienia się profil najemcy.",
    ],
    en: [
      "Puerto de Mazarrón is the most urban address in the municipality: flats by Playa del Puerto, a promenade full of restaurants and a fishing port where the boats come in. The square metre is the highest in Mazarrón because everything is at hand, but that also makes it loud in summer and parking takes longer than walking. Lettings run from June to September and the maths must rest on that, since off season part of the beachfront stock empties. Check whether the building sits in the port's noise line and whether the community has a lift, which is rare in older blocks along the promenade and changes the tenant profile on a fourth floor.",
    ],
    es: [
      "Puerto de Mazarrón es la dirección más urbana del municipio: pisos junto a Playa del Puerto, paseo lleno de restaurantes y puerto pesquero al que entran las barcas. El metro es el más caro de Mazarrón porque todo está a mano, pero eso también lo hace ruidoso en verano y aparcar lleva más tiempo que caminar. El alquiler trabaja de junio a septiembre y la cuenta debe apoyarse en eso, porque fuera de temporada parte de los pisos de primera línea se vacían. Mira si el edificio está en la línea de ruido del puerto y si la comunidad tiene ascensor, algo raro en bloques antiguos del paseo y decisivo en un cuarto sin él.",
    ],
  },
  "mazarron/bolnuevo": {
    pl: [
      "Bolnuevo to kilkaset domów między Playa de Bolnuevo a Gredas de Bolnuevo, formacjami piaskowca, które są wizytówką tego wybrzeża. Zabudowa jest niska, wille stoją blisko plaży, a między nimi nie ma hoteli, więc ranek zaczyna się od szumu fal, nie od autokarów. Cena jest niższa niż w Puerto de Mazarrón, ale wyższa niż w centrum Mazarrón, bo płaci się za spokój i widok. Dwie rzeczy sprawdź: erozję, bo w niektórych miejscach morze zabiera pas plaży i skraca dostęp do wody, oraz stan dróg dojazdowych do osiedli położonych wyżej. Poza sezonem większość domów stoi zamknięta, więc sąsiadów w zimie jest niewielu.",
    ],
    en: [
      "Bolnuevo is a few hundred houses between Playa de Bolnuevo and the Gredas de Bolnuevo sandstone formations that are the signature of this coast. Building is low rise, villas sit close to the beach and there are no hotels between them, so the morning starts with waves rather than coaches. Prices are below Puerto de Mazarrón yet above Mazarrón centre, because you pay for quiet and the view. Check two things: erosion, since in places the sea is taking the beach strip and shortening access to the water, and the condition of access roads to the estates on the slope. Off season most houses stand closed, so winter neighbours are few.",
    ],
    es: [
      "Bolnuevo son unos cientos de casas entre Playa de Bolnuevo y las Gredas de Bolnuevo, formaciones de arenisca que son la seña de esta costa. La edificación es baja, los chalets están cerca de la playa y no hay hoteles entre ellos, así que la mañana empieza con las olas y no con autocares. El precio está por debajo de Puerto de Mazarrón pero por encima del centro de Mazarrón, porque se paga tranquilidad y vistas. Revisa dos cosas: la erosión, porque en algunos puntos el mar se lleva la franja de playa y acorta el acceso al agua, y el estado de los caminos a las urbanizaciones de la ladera. Fuera de temporada casi todas las casas están cerradas y hay pocos vecinos en invierno.",
    ],
  },
  "calpe/puerto": {
    pl: [
      "Puerto w Calpe to mieszkania wokół mariny i Lonja de Pescadores, gdzie rano sprzedaje się ryby, a wieczorem restauracje wystawiają stoliki na ulicę. Zaletą jest pieszy dostęp do starówki, targu rybnego i plaży, więc samochód może stać cały tydzień; dlatego ten adres wybierają osoby bez prawa jazdy i pary, które chcą mieć wszystko pod ręką. Cena jest o 60 euro za metr wyższa niż średnia miejska, a ROI 5,6 procent - niższe niż w głębi lądu, bo to lokalizacja pod własne mieszkanie i najem krótki. Sprawdź hałas kutrów i chłodni nad ranem oraz wysokość wspólnoty w blokach z widokiem na marinę.",
    ],
    en: [
      "Puerto in Calpe means flats around the marina and the Lonja de Pescadores, where fish is sold in the morning and restaurants put tables in the street at night. The advantage is a walkable route to the old town, the fish market and the beach, so the car can stay parked all week; that is why this address suits people without a licence and couples who want everything at hand. The square metre runs 60 euros above the town average, with a 5.6 percent yield, lower than inland because this is a location for your own use and short lets. Check boat and cold store noise at dawn and the community fee in blocks overlooking the marina.",
    ],
    es: [
      "Puerto en Calpe son pisos alrededor de la marina y la Lonja de Pescadores, donde por la mañana se vende pescado y por la noche los restaurantes sacan mesas a la calle. La ventaja es que casco antiguo, lonja y playa quedan a pie, así que el coche puede estar una semana parado; por eso esta dirección encaja con quien no conduce y con parejas que quieren todo a mano. El metro va 60 euros por encima de la media del pueblo, con un 5,6 por ciento, más bajo que tierra adentro porque aquí se compra para uso propio y alquiler corto. Revisa el ruido de barcas y cámaras al amanecer y la comunidad en los bloques frente a la marina.",
    ],
  },
  "calpe/maryvilla": {
    pl: [
      "Maryvilla to urbanizacja na zboczu nad Cala de Maryvilla, gdzie wille mają baseny, duże tarasy i widok na Peñón de Ifach albo na morze, zależnie od działki. Domy kupują tu głównie inwestorzy z Europy Północnej, którzy nie potrzebują dojazdu do pracy, a odległość od plaży mierzą w minutach jazdy, nie w metrach. Cena jest najwyższa w Calpe, 200 euro za metr powyżej średniej, więc licz się z tym, że płacisz za widok i prywatność, a nie za metraż. Sprawdź nachylenie działki i stan drogi wewnętrznej, bo część ulic w urbanizacji jest stroma i po deszczu trudna, oraz wysokość opłat za ochronę osiedla.",
    ],
    en: [
      "Maryvilla is an estate on the slope above Cala de Maryvilla, where villas come with pools, large terraces and a view of Peñón de Ifach or the sea depending on the plot. Houses here are bought mainly by northern European investors who do not need to commute, and who measure the beach in minutes of driving rather than metres. Prices are the highest in Calpe, 200 euros per square metre above the average, so accept that you pay for view and privacy rather than floor area. Check the gradient of the plot and the state of the internal road, since some streets in the estate are steep and awkward after rain, and the level of the security fee.",
    ],
    es: [
      "Maryvilla es una urbanización en la ladera sobre Cala de Maryvilla, donde los chalets tienen piscina, terrazas amplias y vistas al Peñón de Ifach o al mar según la parcela. Compran sobre todo inversores del norte de Europa que no necesitan desplazarse a trabajar y que miden la playa en minutos de coche y no en metros. Los precios son los más altos de Calpe, 200 euros por metro sobre la media, así que se paga vista y privacidad y no metros. Revisa la pendiente de la parcela y el estado del camino interior, porque algunas calles son empinadas y complicadas tras la lluvia, y la cuota de seguridad de la urbanización.",
    ],
  },
  "benidorm/playa-de-levante": {
    pl: [
      "Playa de Levante to pierwsza linia benidormańskich wieżowców, z Aqualandia i strefą rozrywki za plecami, gdzie apartamenty pracują na najem turystyczny przez cały rok, a nie tylko w sierpniu. Popyt jest tu najwyższy w mieście, 9 w naszej skali, ale to rynek operacyjny: licencja turystyczna, sprzątanie między gośćmi, zarządzanie rezerwacjami i konkurencja tysięcy innych lokali w tej samej odległości od plaży. Cena za metr jest najwyższa w Benidorm, a wspólnota w wieżowcu z basenem i windami dochodzi do 200 euro miesięcznie, co zjada kilka punktów ROI. Sprawdź, czy budynek ma aktualną licencję na działalność turystyczną i czy winda obsługuje wszystkie piętra bez awarii w sezonie.",
    ],
    en: [
      "Playa de Levante is the front line of Benidorm towers, with Aqualandia and the entertainment strip behind, where flats run on tourist lets all year rather than only in August. Demand is the highest in town at 9 on our scale, but this is an operational market: tourist licence, cleaning between guests, booking management and competition from thousands of flats the same distance from the sand. The square metre is the highest in Benidorm and a tower community fee with pool and lifts can reach 200 euros a month, which eats several points of yield. Confirm the building holds a current tourist licence and that the lift serves every floor without breaking down in season.",
    ],
    es: [
      "Playa de Levante es la primera línea de torres de Benidorm, con Aqualandia y la zona de ocio detrás, donde los pisos trabajan en alquiler turístico todo el año y no solo en agosto. La demanda es la más alta del pueblo, 9 en nuestra escala, pero es un mercado operativo: licencia turística, limpieza entre huéspedes, gestión de reservas y competencia de miles de pisos a la misma distancia de la arena. El metro es el más caro de Benidorm y la comunidad de una torre con piscina y ascensores llega a 200 euros al mes, lo que se come varios puntos de rentabilidad. Confirma que el edificio tenga licencia turística en vigor y que el ascensor sirva todas las plantas sin averiarse en temporada.",
    ],
  },
  "santa-pola/playa-de-levante": {
    pl: [
      "Playa de Levante w Santa Pola to apartamenty wzdłuż długiej promenady, z portem rybackim na jednym końcu i rezerwatem Salinas de Santa Pola na drugim. Mieszkanie w pierwszej linii pracuje na najem od czerwca do września, ale resztę roku również da się wynająć, bo port i zakłady w Elche dają stałe zatrudnienie, czego nie ma w mniejszych kurortach. Cena jest o 220 euro za metr wyższa niż w centrum, a ROI 6,5 procent wyższe niż w Benidorm, bo wspólnoty są tańsze, a budynki starsze i niższe. Sprawdź moskitiery i wentylację, bo komary znad salin są tu realnym problemem od czerwca, oraz odległość od przeprawy na Tabarca, gdzie w sezonie cumują wycieczkowce.",
    ],
    en: [
      "Playa de Levante in Santa Pola is a line of flats along a long promenade, with the fishing port at one end and the Salinas de Santa Pola reserve at the other. A front-line flat earns from June to September, yet the rest of the year also lets, because the port and the Elche factories provide permanent jobs, unlike in smaller resorts. The price runs 220 euros per square metre above the centre, while a 6.5 percent yield beats Benidorm, since community fees are lower and buildings older and shorter. Check screens and ventilation, because mosquitoes from the salt pans are a genuine issue from June, and the distance to the Tabarca crossing, where excursion boats moor in season.",
    ],
    es: [
      "Playa de Levante en Santa Pola es una fila de pisos a lo largo de un paseo largo, con el puerto pesquero en un extremo y la reserva de Salinas de Santa Pola en el otro. Un piso en primera línea trabaja de junio a septiembre, pero el resto del año también se alquila, porque el puerto y las fábricas de Elche dan empleo estable, algo que no ocurre en resorts menores. El precio va 220 euros por metro por encima del centro y un 6,5 por ciento supera a Benidorm, ya que las comunidades son más baratas y los edificios más antiguos y bajos. Revisa mosquiteras y ventilación, porque los mosquitos de las salinas son un problema real desde junio, y la distancia a la travesía de Tabarca, donde atracan los barcos de excursión.",
    ],
  },
  "villajoyosa/playa-torre": {
    pl: [
      "Playa Torre to nowa część Villajoyosa po wschodniej stronie Playa del Torres, gdzie osiedla z basenami stoją w pierwszej i drugiej linii, a Paseo del Mar łączy je z portem i starówką. Metr jest tu o 220 euro droższy niż w centrum, bo kupujący płaci za plażę pod oknem i basen, a nie za kolorowe kamienice; w zamian traci klimat starego miasta i część usług w zasięgu pieszym. Popyt jest najwyższy w mieście, 8,5 w naszej skali, ale najem jest sezonowy, więc kalkulację trzeba oprzeć na trzech miesiącach i własnych pobytach. Sprawdź, czy osiedle ma licencję turystyczną i jak wygląda dojazd tramwajem, bo przystanek jest dalej niż w centrum, a to wpływa na atrakcyjność dla najemców bez auta.",
    ],
    en: [
      "Playa Torre is the newer part of Villajoyosa east of Playa del Torres, where estates with pools stand in the first and second row and Paseo del Mar links them to the port and the old town. The square metre costs 220 euros more than in the centre, because you pay for the beach at the window and a pool rather than painted townhouses; in exchange you lose the old town feel and some services on foot. Demand is the highest in town at 8.5, but letting is seasonal, so base the maths on three months plus your own stays. Confirm the estate holds a tourist licence and check the tram connection, since the stop is further than in the centre, which matters to tenants without a car.",
    ],
    es: [
      "Playa Torre es la parte nueva de Villajoyosa al este de Playa del Torres, donde las urbanizaciones con piscina están en primera y segunda línea y el Paseo del Mar las une al puerto y al casco antiguo. El metro cuesta 220 euros más que en el centro, porque se paga playa en la ventana y piscina en lugar de casas pintadas; a cambio se pierde el ambiente del casco y parte de los servicios a pie. La demanda es la más alta del pueblo, 8,5, pero el alquiler es de temporada, así que la cuenta se apoya en tres meses y en el uso propio. Confirma la licencia turística de la urbanización y mira la conexión del tranvía, porque la parada queda más lejos que en el centro.",
    ],
  },
  "el-campello/muchavista": {
    pl: [
      "Muchavista to najszerszy pas piasku w El Campello i najdroższy metr w gminie, bo apartamenty stoją w pierwszej linii plaży albo po drugiej stronie promenady z widokiem na morze. Kupują tu głównie rodziny z północy Europy, w tym wiele z Polski, które chcą plaży pod oknem i dojazdu tramwajem do Alicante bez przesiadki, więc mieszkanie pracuje zarówno w sezonie, jak i poza nim. Cena jest o 220 euro wyższa niż w centrum, a ROI 6,0 procent - wyższe niż przy plaży w Calpe, ale niższe niż w śródmieściu. Sprawdź hałas torowiska, bo linia tramwajowa biegnie blisko zabudowy, oraz czy budynek ma garaż, bo w lipcu miejsca na ulicy nie ma po dziewiątej.",
    ],
    en: [
      "Muchavista has the widest strip of sand in El Campello and the highest square metre in the municipality, because flats either front the beach or sit across the promenade with a sea view. Buyers are mostly families from northern Europe, many of them Polish, who want the beach at the window and a direct tram to Alicante, so the flat earns both in season and outside it. The price runs 220 euros above the centre, and a 6.0 percent yield beats the seafront in Calpe while staying below the town centre. Check noise from the tracks, since the tram line passes close to the buildings, and whether the block has a garage, because street parking is gone by nine in July.",
    ],
    es: [
      "Muchavista tiene la franja de arena más ancha de El Campello y el metro más caro del municipio, porque los pisos dan a la playa o quedan al otro lado del paseo con vistas al mar. Compran sobre todo familias del norte de Europa, muchas polacas, que quieren playa en la ventana y tranvía directo a Alicante, así que el piso trabaja en temporada y fuera de ella. El precio va 220 euros por encima del centro y un 6,0 por ciento supera la primera línea de Calpe aunque queda bajo el centro del pueblo. Revisa el ruido de las vías, porque el tranvía pasa cerca de los edificios, y si el bloque tiene garaje, porque en julio no hay aparcamiento en la calle después de las nueve.",
    ],
  },
  "altea/mascarat": {
    pl: [
      "Mascarat to wąwóz i zatoka po północnej stronie Altei, gdzie wille stoją na klifie nad Playa Mascarat, a nad głowami przebiega wiadukt AP-7. Niska gęstość zabudowy i widok na skały są tu głównym produktem, dlatego metr jest o 540 euro droższy niż w średniej miasta, przy najniższym ROI w gminie, 5,1 procent. Minusy są dwa i oba dotyczą codzienności: wiatr, który w tym przesmyku wieje częściej niż w centrum, oraz brak sklepów w zasięgu spaceru. Sprawdź, czy działka ma dostęp do drogi publicznej, bo część posesji dojeżdża prywatnymi odcinkami.",
    ],
    en: [
      "Mascarat is the gorge and bay on the northern side of Altea, where villas stand on the cliff above Playa Mascarat and the AP-7 viaduct runs overhead. Low density and the rock view are the product here, which is why the square metre sits 540 euros above the town average with the lowest yield in the municipality at 5.1 percent. Two drawbacks concern daily life: wind, which blows more often in this gap than in the centre, and no shops within walking distance. Confirm the plot has access to a public road, since some houses reach the main road over private stretches.",
    ],
    es: [
      "Mascarat es el desfiladero y la bahía al norte de Altea, donde los chalets se apoyan en el acantilado sobre Playa Mascarat y el viaducto de la AP-7 pasa por encima. La baja densidad y las vistas a la roca son el producto, y por eso el metro va 540 euros sobre la media del pueblo con la rentabilidad más baja del municipio, un 5,1 por ciento. Dos pegas afectan al día a día: el viento, que en este paso sopla más que en el centro, y la ausencia de tiendas a pie. Comprueba que la parcela tenga acceso a camino público, porque algunas casas llegan por tramos privados.",
    ],
  },
  "altea/altea-hills": {
    pl: [
      "Altea Hills to grodzone osiedle na zboczu, z jedną bramą, ochroną przez całą dobę i widokiem na całą zatokę, od Playa de la Solsida po port. Wszystko jest tu podporządkowane prywatności: wille mają baseny, ogrody i podjazdy, a sąsiedzi nie przechodzą pod oknami, bo nie ma tu ruchu pieszego z zewnątrz. Cena jest najwyższa w gminie, 4430 euro za metr, a ROI najniższe, 5,0 procent, bo to adres pod własne użycie, nie pod najem. Sprawdź wysokość opłat na ochronę i utrzymanie dróg wewnętrznych, bo przy dużych willeach to kwoty rzędu kilkuset euro miesięcznie.",
    ],
    en: [
      "Altea Hills is a gated estate on the slope with a single gate, round the clock security and a view over the whole bay from Playa de la Solsida to the port. Everything serves privacy: villas have pools, gardens and driveways, and no neighbour walks past your window because there is no outside foot traffic. The price is the highest in the municipality at 4,430 euros per square metre, and the yield the lowest at 5.0 percent, since this is an address for own use rather than letting. Check the security and internal road charges, which for large villas run to several hundred euros a month.",
    ],
    es: [
      "Altea Hills es una urbanización cerrada en la ladera con una sola puerta, vigilancia las veinticuatro horas y vistas a toda la bahía, de Playa de la Solsida al puerto. Todo está al servicio de la privacidad: los chalets tienen piscina, jardín y entrada propia, y ningún vecino pasa bajo la ventana porque no hay tránsito de fuera. El precio es el más alto del municipio, 4.430 euros por metro, y la rentabilidad la más baja, un 5,0 por ciento, porque es una dirección de uso propio y no de alquiler. Revisa los gastos de seguridad y de caminos interiores, que en chalets grandes llegan a varios cientos de euros al mes.",
    ],
  },
  "altea/playa-de-la-roda": {
    pl: [
      "Playa de la Roda to szeroka plaża z deptakiem i apartamenty z tarasami, które latem pracują na najem, a zimą wracają do właścicieli i rezydentów. Bliskość Puerto Deportivo de Altea oznacza restauracje i przystań pod ręką, ale też wyższe ceny i gwar w weekendy, więc mieszkanie od strony morza trzeba obejrzeć w sobotę, nie we wtorek. Metr jest o 100 euro droższy niż w średniej miasta, a ROI 5,3 procent wyższe niż w Altea Hills, bo lokale są mniejsze i łatwiej je wynająć na krótko. Sprawdź wspólnotę w blokach pierwszej linii, bo basen i winda w sezonie generują realne koszty.",
    ],
    en: [
      "Playa de la Roda is a wide beach with a promenade and flats with terraces that let in summer and return to owners and residents in winter. Being close to Puerto Deportivo de Altea means restaurants and a marina at hand, but also higher prices and weekend noise, so view a sea-facing flat on a Saturday rather than a Tuesday. The square metre runs 100 euros above the town average, and a 5.3 percent yield beats Altea Hills because units are smaller and easier to let short term. Check community fees in front-line blocks, since a pool and lift cost real money in season.",
    ],
    es: [
      "Playa de la Roda es una playa amplia con paseo y pisos con terraza que en verano se alquilan y en invierno vuelven a sus dueños y residentes. La cercanía al Puerto Deportivo de Altea significa restaurantes y marina a mano, pero también precios más altos y ruido de fin de semana, así que un piso frente al mar se visita un sábado y no un martes. El metro va 100 euros sobre la media del pueblo y un 5,3 por ciento supera a Altea Hills, porque las viviendas son más pequeñas y más fáciles de alquilar en corto. Mira la comunidad en los bloques de primera línea, ya que piscina y ascensor cuestan de verdad en temporada.",
    ],
  },
  "san-pedro-del-pinatar/lo-pagan": {
    pl: [
      "Lo Pagán to plaża Villananitos i lecznicze błoto z Salinas de San Pedro, po które latem przyjeżdżają kuracjusze z całej Hiszpanii. Apartamenty stoją blisko wody, ale w drugiej linii, więc cena jest o 160 euro wyższa niż w centrum gminy, a nie tak wysoka jak przy samej plaży. To rynek mocno sezonowy: od czerwca do września osiedla pękają w szwach, w styczniu połowa okien jest zamknięta na okiennice. Pod najem długoterminowy sprawdź, czy w okolicy zostają mieszkańcy, a nie tylko turyści, oraz czy budynek nie stoi w strefie, którą zamykają jesienne deszcze.",
    ],
    en: [
      "Lo Pagán is the Villananitos beach and the healing mud of the Salinas de San Pedro, which draws spa visitors from across Spain in summer. Flats stand close to the water but in the second row, so prices run 160 euros above the municipality centre without reaching front-line levels. This is a strongly seasonal market: from June to September the estates burst, and in January half the windows are shuttered. For a long let, check whether residents stay in the area rather than only tourists, and whether the building sits in a zone that autumn rain closes off.",
    ],
    es: [
      "Lo Pagán es la playa de Villananitos y el barro curativo de las Salinas de San Pedro, que en verano atrae a balnearios de toda España. Los pisos están cerca del agua pero en segunda línea, así que el precio va 160 euros sobre el centro del municipio sin llegar al de primera línea. Es un mercado muy estacional: de junio a septiembre las urbanizaciones se llenan y en enero la mitad de las ventanas están cerradas. Para un alquiler largo mira si en la zona quedan residentes y no solo turistas, y si el edificio está en una zona que la lluvia de otoño corta.",
    ],
  },
  "san-pedro-del-pinatar/el-mojon": {
    pl: [
      "El Mojón to niewielka osada na końcu gminy, przy granicy prowincji Alicante i Murcji, gdzie wille i apartamenty stoją o kilka ulic od Playa de El Mojón i Parque Regional Salinas. Cena jest niższa niż w Lo Pagán, a popyt najniższy w gminie, 7 w naszej skali, bo nie ma tu ani portu, ani deptaku z restauracjami, tylko spokój i rower. To dobry adres dla kogoś, kto chce mieć plażę i ciszę, a po zakupy pojedzie do Pilar de la Horadada lub San Pedro. Sprawdź, czy nieruchomość leży w strefie ochronnej parku, bo tam rozbudowa i basen wymagają dodatkowych zgód.",
    ],
    en: [
      "El Mojón is a small settlement at the end of the municipality, on the border between Alicante province and Murcia, where villas and flats sit a few streets from Playa de El Mojón and the Parque Regional Salinas. Prices are below Lo Pagán and demand is the lowest in the municipality at 7 on our scale, because there is no port or restaurant promenade here, only quiet and cycling. It suits someone who wants beach and silence and will drive to Pilar de la Horadada or San Pedro for shopping. Check whether the property falls inside the park protection zone, where extensions and pools need extra permits.",
    ],
    es: [
      "El Mojón es un núcleo pequeño al final del municipio, en el límite entre la provincia de Alicante y Murcia, donde chalets y pisos quedan a unas calles de Playa de El Mojón y del Parque Regional Salinas. El precio es menor que en Lo Pagán y la demanda es la más baja del municipio, 7 en nuestra escala, porque aquí no hay puerto ni paseo de restaurantes, solo calma y bicicleta. Encaja con quien busca playa y silencio y se desplaza a Pilar de la Horadada o San Pedro para comprar. Comprueba si la vivienda está en la zona protegida del parque, donde ampliaciones y piscina necesitan permisos extra.",
    ],
  },
  "san-pedro-del-pinatar/villananitos": {
    pl: [
      "Villananitos to szeroka plaża z deptakiem, restauracje i port rybacki w Lo Pagán, wszystko w promieniu kilku minut pieszo. Nowe apartamenty z basenem powstawały tu głównie pod najem, więc konkurencja w sezonie jest duża, a stawki trzeba liczyć ostrożnie, mimo ROI 6,6 procent. Cena jest tylko o 60 euro wyższa niż w centrum gminy, dlatego ten adres wybierają rodziny, które chcą plaży i infrastruktury bez płacenia za pierwsze linie. Sprawdź, czy wspólnota ma basen i ile kosztuje jego utrzymanie poza sezonem, oraz czy okna nie wychodzą na deptak z barami, bo w lipcu gra tam muzyka do późna.",
    ],
    en: [
      "Villananitos is a wide beach with a promenade, restaurants and the fishing port at Lo Pagán, all within a few minutes on foot. New flats with pools were built here mainly for letting, so summer competition is fierce and rates need careful maths despite a 6.6 percent yield. Prices sit only 60 euros above the municipality centre, which is why families choose this address for beach and services without paying front-line money. Check whether the community has a pool and what its upkeep costs off season, and whether windows open onto the promenade bars, where music plays late in July.",
    ],
    es: [
      "Villananitos es playa amplia con paseo, restaurantes y puerto pesquero en Lo Pagán, todo a pocos minutos a pie. Los pisos nuevos con piscina se construyeron aquí sobre todo para alquilar, así que la competencia en verano es fuerte y las tarifas hay que calcularlas con cuidado pese a un 6,6 por ciento. El precio va solo 60 euros sobre el centro del municipio, y por eso las familias eligen esta dirección para tener playa y servicios sin pagar primera línea. Revisa si la comunidad tiene piscina y cuánto cuesta mantenerla fuera de temporada, y si las ventanas dan al paseo de bares, donde en julio la música suena hasta tarde.",
    ],
  },
  "santa-pola/gran-alacant": {
    pl: [
      "Gran Alacant to duże osiedla z basenami i ochroną na wzgórzu nad Playa del Carabassí, administracyjnie część Santa Pola, choć mentalnie osobna miejscowość. Kupują tu obcokrajowcy, którzy chcą gotowego mieszkania z basenem i pięciu minut do lotniska w Alicante, dlatego rotacja najemców jest większa niż w centrum. Cena jest o 50 euro niższa niż w mieście, a ROI 6,6 procent najwyższe w gminie, bo wspólnoty rozkładają się na wiele lokali. Minus: brak starego centrum i nabrzeża, po które trzeba zjechać na dół, oraz poranne korki na jednej drodze wyjazdowej w sezonie.",
    ],
    en: [
      "Gran Alacant is a set of large estates with pools and security on the hill above Playa del Carabassí, administratively part of Santa Pola yet a separate place in spirit. Buyers are foreigners who want a finished flat with a pool and five minutes to Alicante airport, so tenant turnover is higher than in the centre. Prices run 50 euros below the town and a 6.6 percent yield is the best in the municipality, since community costs spread across many units. The downside is no old centre or quayside, which means driving down the hill, plus morning queues on the single exit road in season.",
    ],
    es: [
      "Gran Alacant son urbanizaciones grandes con piscina y seguridad en el alto sobre Playa del Carabassí, parte del municipio de Santa Pola aunque en la práctica un núcleo aparte. Compra gente extranjera que quiere piso terminado con piscina y cinco minutos al aeropuerto de Alicante, y por eso la rotación de inquilinos es mayor que en el centro. El precio va 50 euros por debajo del pueblo y un 6,6 por ciento es la mejor rentabilidad del municipio, porque la comunidad se reparte entre muchas viviendas. La pega es que no hay casco antiguo ni muelle, hay que bajar en coche, y en temporada se forman colas en la única salida.",
    ],
  },
  "santa-pola/centro": {
    pl: [
      "Centro w Santa Pola to port, Castillo-Fortaleza i targ, wokół których toczy się życie miasta przez cały rok, bez względu na sezon. Mieszkania są najtańsze w gminie, o 160 euro poniżej średniej, często w budynkach z lat siedemdziesiątych, z niską wspólnotą i bez basenu. To najlepszy adres pod najem długoterminowy: port rybacki i zakłady w Elche dają pracę, a urzędy i szkoły są w zasięgu spaceru. Hałas kutrów nad ranem i brak plaży pod domem to koszt tej lokalizacji; sprawdź też, czy budynek ma aktualny przegląd techniczny, bo starsza zabudowa przy porcie bywa zaniedbana.",
    ],
    en: [
      "Centro in Santa Pola means the port, the Castillo-Fortaleza and the market, around which town life runs all year regardless of season. Flats are the cheapest in the municipality, 160 euros below average, often in seventies buildings with low community fees and no pool. This is the best address for long lets: the fishing port and the Elche factories provide work, and offices and schools are a walk away. Boat noise at dawn and no beach at the door are the cost of the location; check the building has a current technical inspection, since older stock by the port can be neglected.",
    ],
    es: [
      "Centro en Santa Pola es el puerto, el Castillo-Fortaleza y el mercado, en torno a los cuales gira la vida del pueblo todo el año, sin importar la temporada. Los pisos son los más baratos del municipio, 160 euros bajo la media, a menudo en edificios de los setenta con comunidad baja y sin piscina. Es la mejor dirección para alquiler largo: el puerto pesquero y las fábricas de Elche dan trabajo, y oficinas y colegios quedan a pie. El ruido de las barcas al amanecer y la falta de playa en la puerta son el precio de la ubicación; revisa también que el edificio tenga inspección técnica en vigor, porque el parque antiguo junto al puerto puede estar descuidado.",
    ],
  },
  "santa-pola/playa-lisa": {
    pl: [
      "Playa Lisa leży po wschodniej stronie Santa Pola, blisko Cabo de Santa Pola, gdzie zabudowa mieszkaniowa schodzi do wody, a lokale mają tarasy i widok na zatokę. Cena jest o 60 euro wyższa niż w mieście, ale niższa niż przy Playa de Levante, więc to kompromis między widokiem a budżetem. Najem jest tu spokojniejszy niż na głównej promenadzie: mniej barów, więcej rodzin, które wracają co roku. Sprawdź, czy dojście do plaży nie prowadzi po skałach i czy budynek nie stoi na wzniesieniu, z którego po deszczu spływa woda, oraz jak daleko jest do najbliższego sklepu czynnego zimą.",
    ],
    en: [
      "Playa Lisa sits on the eastern side of Santa Pola near Cabo de Santa Pola, where housing steps down to the water and flats have terraces and bay views. Prices run 60 euros above the town yet stay below Playa de Levante, so it is a compromise between view and budget. Letting is calmer than on the main promenade: fewer bars, more families who come back each year. Check whether the path to the beach crosses rocks and whether the building sits on a slope that drains after rain, and how far the nearest shop that stays open in winter is.",
    ],
    es: [
      "Playa Lisa está en el lado este de Santa Pola, cerca de Cabo de Santa Pola, donde la vivienda baja hasta el agua y los pisos tienen terraza y vistas a la bahía. El precio va 60 euros sobre el pueblo pero queda por debajo de Playa de Levante, así que es un compromiso entre vistas y presupuesto. El alquiler es más tranquilo que en el paseo principal: menos bares, más familias que vuelven cada año. Comprueba si el acceso a la playa cruza rocas y si el edificio está en una cuesta que drena tras la lluvia, y a qué distancia queda la tienda más cercana que abre en invierno.",
    ],
  },
  "javea/montanar": {
    pl: [
      "Montañar to pas willi i apartamentów wzdłuż skalistego wybrzeża między plażą Arenal a Cap Prim, gdzie domy mają baseny, tarasy i widok na morze z każdej kondygnacji. Cena jest o 270 euro wyższa niż w średniej miasta, a ROI 4,9 procent najniższe po Cap Martí, bo to rynek drugiego domu, nie dochodu. Zaletą jest brak hoteli i bezpośrednie zejście do zatoczek, wadą wąskie drogi bez chodników, po których trzeba chodzić po jezdni. Sprawdź stan murów oporowych i odwodnienia działki, bo na tym odcinku wybrzeże jest skaliste i po ulewach woda spływa po zboczu.",
    ],
    en: [
      "Montañar is a run of villas and flats along the rocky coast between Arenal beach and Cap Prim, where houses have pools, terraces and a sea view from every level. Prices run 270 euros above the town average and a 4.9 percent yield is the lowest after Cap Martí, because this is a second-home market rather than an income one. The upside is no hotels and direct access down to the coves; the downside is narrow roads without pavements, where you walk on the carriageway. Check the retaining walls and plot drainage, since the coast here is rocky and water runs down the slope after storms.",
    ],
    es: [
      "Montañar es una franja de chalets y pisos por la costa rocosa entre la playa del Arenal y Cap Prim, donde las casas tienen piscina, terraza y vistas al mar desde todas las plantas. El precio va 270 euros sobre la media del pueblo y un 4,9 por ciento es la rentabilidad más baja tras Cap Martí, porque es un mercado de segunda residencia y no de renta. Lo bueno es que no hay hoteles y se baja directo a las calas; lo malo son calles estrechas sin acera, donde se camina por la calzada. Revisa los muros de contención y el drenaje de la parcela, porque aquí la costa es rocosa y el agua baja por la ladera tras los temporales.",
    ],
  },
  "javea/cap-marti": {
    pl: [
      "Cap Martí to klif na wschodnim końcu Jávea, z Cala Blanca u podnóża i najbardziej ekskluzywnymi willami w całej bazie, po 4890 euro za metr. Podaż jest tu skrajnie ograniczona, bo działki kończą się na linii klifu, a nowych pozwoleń praktycznie nie ma, więc cena trzyma się niezależnie od koniunktury. ROI 4,6 procent to najniższy wynik w regionie, a najem rzadko jest tu celem samym w sobie. Sprawdź klasę gruntu i ograniczenia ochrony wybrzeża, bo część działek ma zakaz rozbudowy, oraz stan drogi dojazdowej, która w kilku miejscach biegnie po zboczu.",
    ],
    en: [
      "Cap Martí is the cliff at the eastern end of Jávea, with Cala Blanca below and the most exclusive villas in our whole dataset at 4,890 euros per square metre. Supply is extremely limited because plots stop at the cliff line and new permits are practically unavailable, so prices hold regardless of the cycle. A 4.6 percent yield is the lowest in the region, and letting is rarely a goal in itself here. Check land classification and coastal protection limits, since some plots cannot be extended, and the condition of the approach road, which climbs the slope in several places.",
    ],
    es: [
      "Cap Martí es el acantilado del extremo este de Jávea, con Cala Blanca abajo y los chalets más exclusivos de toda la base, a 4.890 euros por metro. La oferta es mínima porque las parcelas terminan en la línea del acantilado y los permisos nuevos son prácticamente inexistentes, así que el precio aguanta cualquier ciclo. Un 4,6 por ciento es la rentabilidad más baja de la región y aquí el alquiler rara vez es un fin en sí mismo. Revisa la clasificación del suelo y las limitaciones de protección del litoral, porque algunas parcelas no admiten ampliación, y el estado del camino de acceso, que sube por la ladera en varios tramos.",
    ],
  },
  "javea/arenal": {
    pl: [
      "Arenal to plaża z restauracjami, szkołami i pełną infrastrukturą, gdzie apartamenty stoją w pierwszej i drugiej linii, a wieczorem cała okolica wychodzi na promenadę. Popyt jest najwyższy w mieście, 9 w naszej skali, i dlatego podaż lokali pod najem turystyczny jest tu największa, co oznacza konkurencję i presję na ceny w lipcu. Metr jest o 110 euro tańszy niż w średniej Jávea, więc to najrozsądniejszy budżetowo adres z dostępem do wody. Sprawdź, czy wspólnota ma basen i czy budynek stoi przy samej promenadzie, bo w sezonie hałas trwa do drugiej w nocy, a w zimie okolica pustoszeje.",
    ],
    en: [
      "Arenal is the beach with restaurants, schools and full services, where flats stand in the first and second row and the whole area walks the promenade in the evening. Demand is the highest in town at 9 on our scale, which is why the supply of tourist lets is largest here, meaning competition and price pressure in July. The square metre is 110 euros below the Jávea average, making this the most budget-friendly address with access to the water. Check whether the community has a pool and whether the building sits on the promenade itself, since noise runs until two in summer and the area empties in winter.",
    ],
    es: [
      "Arenal es la playa con restaurantes, colegios y servicios completos, donde los pisos están en primera y segunda línea y por la tarde todo el barrio sale al paseo. La demanda es la más alta del pueblo, 9 en nuestra escala, y por eso aquí está la mayor oferta de alquiler turístico, lo que significa competencia y presión de precios en julio. El metro cuesta 110 euros menos que la media de Jávea, así que es la dirección más ajustada de presupuesto con acceso al agua. Mira si la comunidad tiene piscina y si el edificio da al paseo, porque en verano el ruido dura hasta las dos y en invierno la zona se vacía.",
    ],
  },
  "javea/puerto": {
    pl: [
      "Puerto w Jávea to mieszkania wokół mariny i Lonja de Jávea, gdzie rano sprzedaje się ryby, a wieczorem restauracje zapełniają nabrzeże. Cena jest o 50 euro niższa niż w średniej miasta, ale wyższa niż w Tosalet, bo płaci się za lokalizację i możliwość dojścia pieszo do wszystkiego. ROI 4,8 procent to drugi najniższy wynik w mieście, więc kupuje się tu raczej pod własne użycie niż pod najem. Sprawdź hałas porannego wyładunku i to, czy budynek ma miejsca parkingowe, bo w sezonie znalezienie miejsca przy porcie graniczy z cudem.",
    ],
    en: [
      "Puerto in Jávea means flats around the marina and the Lonja de Jávea, where fish is sold in the morning and restaurants fill the quay by evening. Prices run 50 euros below the town average yet above Tosalet, because you pay for location and the ability to walk to everything. A 4.8 percent yield is the second lowest in town, so buyers come here for their own use rather than letting. Check noise from the morning catch and whether the building has parking, since finding a space by the port in season is close to impossible.",
    ],
    es: [
      "Puerto en Jávea son pisos alrededor de la marina y la Lonja de Jávea, donde por la mañana se vende pescado y al atardecer los restaurantes llenan el muelle. El precio va 50 euros por debajo de la media del pueblo pero por encima de Tosalet, porque se paga ubicación y poder ir andando a todo. Un 4,8 por ciento es la segunda rentabilidad más baja del pueblo, así que aquí se compra para uso propio más que para alquilar. Revisa el ruido de la descarga matinal y si el edificio tiene aparcamiento, porque en temporada encontrar sitio junto al puerto es casi imposible.",
    ],
  },
  "orihuela-costa/la-zenia": {
    pl: [
      "La Zenia to Zenia Boulevard, plaża Cala Capitán i największe centrum handlowe w regionie, wokół którego powstały nowe apartamenty z basenami. To najbardziej zurbanizowany fragment Orihuela Costa, z usługami przez cały rok, dlatego cena jest o 380 euro wyższa niż w średniej gminy, a popyt najwyższy, 9 w naszej skali. ROI 5,9 procent jest niższe niż w Cabo Roig, bo metr drożał szybciej niż czynsze. Sprawdź odległość od N-332 i od parkingu centrum handlowego, bo w sierpniu korki i hałas są tu częścią codzienności.",
    ],
    en: [
      "La Zenia is Zenia Boulevard, Cala Capitán beach and the largest shopping centre in the region, around which new flats with pools were built. It is the most urban stretch of Orihuela Costa, with services all year, which is why prices run 380 euros above the municipal average and demand is the highest at 9 on our scale. A 5.9 percent yield trails Cabo Roig because the square metre rose faster than rents. Check the distance to the N-332 and to the shopping centre car park, since August traffic and noise are part of daily life here.",
    ],
    es: [
      "La Zenia es Zenia Boulevard, la playa de Cala Capitán y el mayor centro comercial de la región, en torno al cual se construyeron pisos nuevos con piscina. Es el tramo más urbano de Orihuela Costa, con servicios todo el año, y por eso el precio va 380 euros sobre la media municipal y la demanda es la más alta, 9 en nuestra escala. Un 5,9 por ciento queda por debajo de Cabo Roig porque el metro subió más rápido que las rentas. Mira la distancia a la N-332 y al aparcamiento del centro comercial, ya que en agosto el tráfico y el ruido forman parte del día a día.",
    ],
  },
  "orihuela-costa/cabo-roig": {
    pl: [
      "Cabo Roig to wille i apartamenty wokół Playa de Cabo Roig i Cala Caleta, z latarnią morską na cyplu i największą koncentracją kupujących z Irlandii oraz Polski na tym wybrzeżu. Cena jest najwyższa w gminie, 490 euro powyżej średniej, a ROI 5,8 procent najniższe, bo pierwsza linia i widok na zatoczkę kosztują. To adres sezonowy: od czerwca do września osiedla żyją, poza sezonem zostają rezydenci i część lokali stoi pusta. Sprawdź, czy budynek ma licencję turystyczną i czy działka nie jest objęta ograniczeniami ochrony wybrzeża, bo cypel jest mocno zabudowany.",
    ],
    en: [
      "Cabo Roig is villas and flats around Playa de Cabo Roig and Cala Caleta, with the lighthouse on the point and the highest concentration of Irish and Polish buyers on this coast. Prices are the highest in the municipality, 490 euros above average, and the 5.8 percent yield the lowest, because a front line and a cove view cost money. This is a seasonal address: from June to September the estates live, off season residents remain and part of the stock stands empty. Confirm the building holds a tourist licence and that the plot carries no coastal protection limits, since the point is heavily built up.",
    ],
    es: [
      "Cabo Roig son chalets y pisos alrededor de Playa de Cabo Roig y Cala Caleta, con el faro en el cabo y la mayor concentración de compradores irlandeses y polacos de esta costa. El precio es el más alto del municipio, 490 euros sobre la media, y el 5,8 por ciento el más bajo, porque primera línea y vistas a la cala se pagan. Es una dirección de temporada: de junio a septiembre las urbanizaciones viven, fuera de temporada quedan residentes y parte del parque está vacío. Confirma que el edificio tenga licencia turística y que la parcela no tenga limitaciones de protección del litoral, porque el cabo está muy construido.",
    ],
  },
  "torrevieja/playa-de-los-locos": {
    pl: [
      "Playa de los Locos to pierwsza linia z chiringuitos, restauracjami i Paseo Juan Aparicio, gdzie apartamenty mają widok na morze i pracują na najem od maja do października. Cena jest o 390 euro wyższa niż w średniej miasta, ale bloki pochodzą głównie z lat osiemdziesiątych i dziewięćdziesiątych, więc stan instalacji bywa gorszy niż w nowych osiedlach na obrzeżach. Wysoka rotacja najmu w sezonie oznacza, że mieszkanie trzeba przygotować pod gości, a nie pod rodzinę. Sprawdź hałas od promenady i barów, stan elewacji po stronie morza oraz to, czy wspólnota ma fundusz na wymianę wind.",
    ],
    en: [
      "Playa de los Locos is the front line of chiringuitos, restaurants and Paseo Juan Aparicio, where flats look at the sea and let from May to October. Prices run 390 euros above the town average, but the blocks mostly date from the eighties and nineties, so installations are usually in worse shape than in newer estates on the edge. High summer turnover means fitting the flat out for guests rather than for a family. Check noise from the promenade and bars, the state of the sea-facing facade, and whether the community has funds to replace the lifts.",
    ],
    es: [
      "Playa de los Locos es primera línea de chiringuitos, restaurantes y Paseo Juan Aparicio, donde los pisos miran al mar y se alquilan de mayo a octubre. El precio va 390 euros sobre la media del pueblo, pero los bloques son sobre todo de los ochenta y noventa, así que las instalaciones suelen estar peor que en urbanizaciones nuevas de la periferia. La alta rotación de verano obliga a preparar el piso para huéspedes y no para una familia. Revisa el ruido del paseo y de los bares, el estado de la fachada al mar y si la comunidad tiene fondos para cambiar los ascensores.",
    ],
  },
  "torrevieja/playa-flamenca": {
    pl: [
      "Playa Flamenca to duża baza apartamentów inwestycyjnych wokół promenady i Mercadillo de Playa Flamenca, słynnego targu, który w sezonie przyciąga tłumy z całej okolicy. Cena jest najwyższa w mieście po Punta Prima, 500 euro powyżej średniej, a ROI 5,9 procent, bo to lokale kupowane głównie pod wynajem, nie pod własne wakacje. Konsekwencja jest taka, że w sezonie konkurujesz z setkami podobnych mieszkań w promieniu kilometra. Sprawdź odległość od targu, bo w środę rano hałas i brak miejsc parkingowych są tu normą, oraz stan wspólnoty, która w starszych osiedlach bywa niedofinansowana.",
    ],
    en: [
      "Playa Flamenca is a large base of investment flats around the promenade and the Mercadillo de Playa Flamenca, the famous market that draws crowds from across the area in season. Prices are the highest in town after Punta Prima, 500 euros above average, with a 5.9 percent yield, because these units are bought to let rather than for personal holidays. The consequence is that in season you compete with hundreds of similar flats within a kilometre. Check the distance to the market, since Wednesday morning means noise and no parking, and the state of the community, which in older estates can be underfunded.",
    ],
    es: [
      "Playa Flamenca es una base grande de pisos de inversión alrededor del paseo y del Mercadillo de Playa Flamenca, el mercado famoso que en temporada atrae gente de toda la zona. El precio es el más alto del pueblo tras Punta Prima, 500 euros sobre la media, con un 5,9 por ciento, porque estas viviendas se compran para alquilar y no para vacaciones propias. La consecuencia es que en temporada compites con cientos de pisos parecidos en un kilómetro. Mira la distancia al mercadillo, porque el miércoles por la mañana hay ruido y no hay aparcamiento, y el estado de la comunidad, que en urbanizaciones antiguas puede estar infrafinanciada.",
    ],
  },
  "torrevieja/punta-prima": {
    pl: [
      "Punta Prima to nowe osiedla z basenami i ochroną na północnym skraju Torrevieja, z Zenia Boulevard kilka minut drogi i Playa de Punta Prima pod ręką. Kupują tu głównie obcokrajowcy, w tym wielu Polaków, którzy chcą gotowego mieszkania z basenem i lotniskiem w Alicante w czterdzieści minut. Cena jest najwyższa w mieście, 560 euro powyżej średniej, a ROI 5,8 procent najniższe, bo metr drożał szybciej niż czynsze, a wspólnota z basenem i ochroną kosztuje. Sprawdź wysokość opłat miesięcznych i to, czy osiedle jest już odebrane przez gminę, bo część dróg i chodników w tej strefie pozostaje w gestii dewelopera.",
    ],
    en: [
      "Punta Prima is new estates with pools and security on the northern edge of Torrevieja, with Zenia Boulevard minutes away and Playa de Punta Prima at hand. Buyers are mostly foreigners, many of them Polish, who want a finished flat with a pool and Alicante airport forty minutes away. Prices are the highest in town at 560 euros above average, and the yield the lowest at 5.8 percent, because the square metre rose faster than rents and a gated pool community costs money. Check the monthly charges and whether the estate has been handed over to the council, since some roads and pavements in this strip remain the developer's responsibility.",
    ],
    es: [
      "Punta Prima son urbanizaciones nuevas con piscina y seguridad en el borde norte de Torrevieja, con Zenia Boulevard a unos minutos y Playa de Punta Prima a mano. Compran sobre todo extranjeros, muchos polacos, que quieren piso terminado con piscina y el aeropuerto de Alicante a cuarenta minutos. El precio es el más alto del pueblo, 560 euros sobre la media, y la rentabilidad la más baja, un 5,8 por ciento, porque el metro subió más que las rentas y una comunidad con piscina y seguridad cuesta. Revisa las cuotas mensuales y si la urbanización ya está recepcionada por el ayuntamiento, ya que algunos caminos siguen en manos del promotor.",
    ],
  },
  "cartagena/la-azohia": {
    pl: [
      "La Azohía to kameralna zatoka z plażą, małą mariną i Torre de Santa Elena na cyplu, gdzie wille stoją na zboczu, a apartamenty tuż przy wodzie. Cena jest o 270 euro wyższa niż w średniej gminy, a ROI 6,2 procent, bo to najdroższy adres w Kartagenie poza centrum, ale wciąż tani w skali wybrzeża. Nowych inwestycji prawie nie ma, bo teren jest ograniczony górą i ochroną wybrzeża, więc podaż jest zamknięta. Sprawdź dojazd, bo z miasta jedzie się tu pół godziny krętą drogą, oraz to, czy nieruchomość leży w strefie parku, gdzie rozbudowa wymaga zgody.",
    ],
    en: [
      "La Azohía is a small bay with a beach, a tiny marina and Torre de Santa Elena on the point, where villas climb the slope and flats sit by the water. Prices run 270 euros above the municipal average with a 6.2 percent yield, since this is Cartagena's priciest address outside the centre and still cheap by coast standards. New development is almost absent because the land is bounded by the mountain and coastal protection, so supply is closed. Check the drive, half an hour from the city on a winding road, and whether the property sits inside the park zone, where extensions need permission.",
    ],
    es: [
      "La Azohía es una bahía pequeña con playa, una marina mínima y la Torre de Santa Elena en el cabo, donde los chalets suben por la ladera y los pisos están junto al agua. El precio va 270 euros sobre la media municipal con un 6,2 por ciento, ya que es la dirección más cara de Cartagena fuera del centro y sigue barata para la costa. Apenas hay promociones nuevas porque el suelo está limitado por el monte y la protección del litoral, así que la oferta está cerrada. Mira el acceso, media hora desde la ciudad por una carretera de curvas, y si la vivienda está en zona de parque, donde ampliar necesita permiso.",
    ],
  },
  "cartagena/isla-plana": {
    pl: [
      "Isla Plana to spokojna miejscowość dla rodzin, z plażą, skalistym wybrzeżem i Sierra de la Muela jako tłem, gdzie apartamenty stoją w kilku liniach od wody. Cena jest o 160 euro wyższa niż w średniej gminy, a popyt 7 w naszej skali, czyli niżej niż w La Azohía, bo infrastruktura jest skromna: jedna przychodnia, kilka sklepów, reszta w Kartagenie. ROI 6,3 procent wynika z niskiej ceny wejścia, nie z wysokich czynszów. Sprawdź, czy budynek ma windę i parking, bo nowsze osiedla powstawały na zboczu, oraz jak daleko jest do szkoły i przystanku autobusowego, jeśli planujesz tu mieszkać zimą.",
    ],
    en: [
      "Isla Plana is a quiet family town with a beach, rocky coast and Sierra de la Muela behind it, where flats stand a few rows back from the water. Prices run 160 euros above the municipal average with demand at 7 on our scale, lower than La Azohía, because infrastructure is modest: one clinic, a few shops, the rest in Cartagena. A 6.3 percent yield comes from the low entry price rather than high rents. Check whether the building has a lift and parking, since newer estates were built on the slope, and how far the school and bus stop are if you plan to live here in winter.",
    ],
    es: [
      "Isla Plana es un pueblo tranquilo para familias, con playa, costa rocosa y Sierra de la Muela detrás, donde los pisos están a unas filas del agua. El precio va 160 euros sobre la media municipal y la demanda es 7 en nuestra escala, por debajo de La Azohía, porque la infraestructura es modesta: un ambulatorio, algunas tiendas y el resto en Cartagena. El 6,3 por ciento sale del precio de entrada bajo y no de rentas altas. Revisa si el edificio tiene ascensor y aparcamiento, porque las urbanizaciones nuevas se hicieron en la ladera, y a qué distancia quedan el colegio y la parada de autobús si piensas vivir aquí en invierno.",
    ],
  },
  "alicante/playa-de-san-juan": {
    pl: [
      "Playa de San Juan to szeroka plaża z pełną infrastrukturą, nowymi apartamentami z widokiem na morze i linią tramwajową, która dowozi do centrum Alicante w kwadrans. Cena jest o 480 euro wyższa niż w średniej miasta, a ROI 5,6 procent, bo to dzielnica, w której mieszkają rezydenci, a nie tylko turyści. Popyt jest najwyższy, 9 w naszej skali, więc mieszkanie sprzedaje się szybko, ale trzeba liczyć się z konkurencją przy najmie krótkim. Sprawdź hałas od tramwaju i od lotniska, wysokość wspólnoty w blokach z basenem oraz to, czy budynek ma garaż, bo parkowanie przy plaży w lecie jest praktycznie niemożliwe.",
    ],
    en: [
      "Playa de San Juan is a wide beach with full services, new sea-view flats and a tram line that reaches central Alicante in fifteen minutes. Prices run 480 euros above the city average with a 5.6 percent yield, because residents live here rather than only tourists. Demand is the highest at 9 on our scale, so flats sell quickly, though short-let competition is real. Check noise from the tram and the airport, community fees in blocks with a pool, and whether the building has a garage, since parking by the beach in summer is practically impossible.",
    ],
    es: [
      "Playa de San Juan es una playa amplia con servicios completos, pisos nuevos con vistas al mar y una línea de tranvía que llega al centro de Alicante en quince minutos. El precio va 480 euros sobre la media de la ciudad con un 5,6 por ciento, porque aquí viven residentes y no solo turistas. La demanda es la más alta, 9 en nuestra escala, así que el piso se vende rápido, aunque la competencia en alquiler corto es real. Revisa el ruido del tranvía y del aeropuerto, la comunidad en bloques con piscina y si el edificio tiene garaje, porque aparcar junto a la playa en verano es prácticamente imposible.",
    ],
  },
  "alicante/albufereta": {
    pl: [
      "Albufereta to zatoczka między plażą a Castillo de Santa Bárbara, gdzie apartamenty stoją blisko wody, a do portu i centrum dojeżdża się tramwajem lub autobusem w kilka minut. Cena jest najwyższa w mieście, 590 euro powyżej średniej, bo lokalizacja łączy plażę z miastem, a ROI 5,2 procent najniższe, bo popyt na najem krótkoterminowy podbija ceny szybciej niż czynsze. To adres pod własne mieszkanie albo pod wynajem turystyczny, nie pod dochód całoroczny. Sprawdź hałas samolotów, które podchodzą nad tą częścią miasta, oraz wspólnotę w blokach z basenem i parkingiem podziemnym.",
    ],
    en: [
      "Albufereta is the cove between the beach and Castillo de Santa Bárbara, where flats stand close to the water and the port and centre are a few minutes away by tram or bus. Prices are the highest in the city, 590 euros above average, because the location combines beach and city, and the 5.2 percent yield the lowest, since short-let demand lifts prices faster than rents. This is an address for your own flat or for tourist letting, not for year-round income. Check aircraft noise, since planes approach over this part of the city, and community fees in blocks with a pool and underground parking.",
    ],
    es: [
      "Albufereta es la cala entre la playa y el Castillo de Santa Bárbara, donde los pisos están cerca del agua y el puerto y el centro quedan a minutos en tranvía o autobús. El precio es el más alto de la ciudad, 590 euros sobre la media, porque la ubicación combina playa y ciudad, y el 5,2 por ciento el más bajo, ya que la demanda de alquiler corto sube los precios más rápido que las rentas. Es una dirección para piso propio o alquiler turístico, no para renta anual. Revisa el ruido de los aviones, que sobrevuelan esta parte de la ciudad, y la comunidad en bloques con piscina y garaje subterráneo.",
    ],
  },
  "calpe/canuta": {
    pl: [
      "Canuta to zabudowa willowa na wzgórzach po zachodniej stronie Calpe, z Cala del Racó u podnóża i widokiem na Peñón de Ifach z górnych działek. Cena jest o 100 euro niższa niż w średniej miasta, bo nie ma tu bezpośredniego dostępu do plaży, a popyt 7 w naszej skali, bo to okolica bez ruchu turystycznego. Kupują tu osoby, które chcą ciszy i ogrodu, a po zakupy zjeżdżają do miasta. Sprawdź nachylenie drogi dojazdowej, stan murów oporowych i to, czy działka ma widok, który nie zostanie zasłonięty przez kolejną inwestycję na zboczu.",
    ],
    en: [
      "Canuta is villa housing on the hills west of Calpe, with Cala del Racó below and a view of Peñón de Ifach from the upper plots. Prices run 100 euros below the town average because there is no direct beach access, and demand sits at 7 on our scale since the area has no tourist traffic. Buyers here want quiet and a garden, and drive down for shopping. Check the gradient of the access road, the state of the retaining walls, and whether the plot's view can be blocked by the next development on the slope.",
    ],
    es: [
      "Canuta es vivienda de chalets en los montes al oeste de Calpe, con Cala del Racó abajo y vistas al Peñón de Ifach desde las parcelas altas. El precio va 100 euros por debajo de la media del pueblo porque no hay acceso directo a la playa, y la demanda es 7 en nuestra escala, ya que la zona no tiene tránsito turístico. Aquí se compra por silencio y jardín, y se baja al pueblo a comprar. Revisa la pendiente del camino de acceso, el estado de los muros de contención y si las vistas de la parcela pueden quedar tapadas por la siguiente promoción en la ladera.",
    ],
  },
  "calpe/oltamar": {
    pl: [
      "Oltamar to nowe osiedla z basenami i ogrodami na północ od centrum Calpe, bliżej supermarketów i szkół niż plaży, co czyni je najbardziej praktycznym adresem w mieście. Cena jest najniższa w gminie, o 260 euro poniżej średniej, a ROI 5,4 procent, bo metraż jest większy, a cena wejścia niższa niż przy Fossa. Popyt 7 w naszej skali wynika z tego, że to okolica dla rezydentów, nie dla turystów, więc najem jest tu dłuższy i spokojniejszy. Sprawdź, czy osiedle jest odebrane przez gminę i czy wspólnota ma fundusz na malowanie elewacji, bo bloki mają kilkanaście lat.",
    ],
    en: [
      "Oltamar is new estates with pools and gardens north of Calpe centre, closer to supermarkets and schools than to the beach, which makes it the most practical address in town. Prices are the lowest in the municipality, 260 euros below average, with a 5.4 percent yield, because floor areas are larger and entry prices lower than at the Fossa. Demand of 7 on our scale reflects an area for residents rather than tourists, so lets here are longer and calmer. Check whether the estate has been handed over to the council and whether the community has funds to repaint, since the blocks are over a decade old.",
    ],
    es: [
      "Oltamar son urbanizaciones nuevas con piscina y jardín al norte del centro de Calpe, más cerca de supermercados y colegios que de la playa, lo que la convierte en la dirección más práctica del pueblo. El precio es el más bajo del municipio, 260 euros bajo la media, con un 5,4 por ciento, porque los metros son mayores y la entrada menor que en la Fossa. La demanda de 7 en nuestra escala refleja una zona de residentes y no de turistas, así que los alquileres son más largos y tranquilos. Comprueba si la urbanización está recepcionada por el ayuntamiento y si la comunidad tiene fondos para pintar, porque los bloques tienen más de una década.",
    ],
  },
  "aguilas/las-delicias": {
    pl: [
      "Las Delicias to szeroka plaża z deptakiem, restauracjami i portem rybackim po jednej stronie, a dworcem kolejowym po drugiej, więc adres łączy wakacje z codzienną komunikacją. Cena jest o 160 euro wyższa niż w centrum, a ROI 6,6 procent wysokie jak na pierwszą linię, bo cena wejścia w Águilas wciąż należy do najniższych na wybrzeżu. Najem pracuje od czerwca do września, a poza sezonem część lokali stoi pusta. Sprawdź hałas pociągów i to, czy budynek nie stoi w pierwszej linii przy torowisku, oraz stan okien i rolet, bo w tej strefie wiele mieszkań pamięta lata osiemdziesiąte.",
    ],
    en: [
      "Las Delicias is a wide beach with a promenade and restaurants on one side and the railway station on the other, so the address combines holidays with everyday connections. Prices run 160 euros above the centre and a 6.6 percent yield is high for a front line, because entry prices in Águilas remain among the lowest on the coast. Letting runs from June to September and part of the stock stands empty off season. Check train noise and whether the building fronts the tracks, plus the state of windows and shutters, since many flats here date from the eighties.",
    ],
    es: [
      "Las Delicias es una playa amplia con paseo y restaurantes por un lado y la estación de tren por el otro, así que la dirección une vacaciones y comunicación diaria. El precio va 160 euros sobre el centro y un 6,6 por ciento es alto para una primera línea, porque entrar en Águilas sigue siendo de lo más barato de la costa. El alquiler trabaja de junio a septiembre y fuera de temporada parte del parque queda vacío. Revisa el ruido del tren y si el edificio da a las vías, además del estado de ventanas y persianas, porque muchos pisos aquí son de los ochenta.",
    ],
  },
  "aguilas/calarreona": {
    pl: [
      "Calarreona to zatoczki ze skałami i czystą wodą, z Cala Cocedores obok, gdzie wille stoją na zboczu nad morzem, a między nimi nie ma hoteli ani barów. Cena jest najwyższa w gminie, 270 euro powyżej średniej, bo to najbardziej kameralny adres w Águilas, a ROI 6,4 procent wciąż wysokie w skali wybrzeża. Minusem jest brak usług: po pieczywo i do apteki jedzie się do miasta, a plaża jest dostępna tylko przez kilka zejść. Sprawdź, czy działka ma widok, który utrzyma się po kolejnej inwestycji, oraz stan drogi dojazdowej, bo kilka osiedli leży powyżej głównej trasy.",
    ],
    en: [
      "Calarreona is a set of rocky coves with clear water and Cala Cocedores next door, where villas climb the slope above the sea and there are no hotels or bars between them. Prices are the highest in the municipality, 270 euros above average, because this is the most secluded address in Águilas, and a 6.4 percent yield remains high by coast standards. The downside is no services: bread and a pharmacy mean a drive to town, and the beach is reached by a handful of paths. Check whether the plot's view survives the next development, and the state of the access road, since several estates sit above the main route.",
    ],
    es: [
      "Calarreona son calas de roca y agua limpia con Cala Cocedores al lado, donde los chalets suben por la ladera sobre el mar y no hay hoteles ni bares entre ellos. El precio es el más alto del municipio, 270 euros sobre la media, porque es la dirección más recogida de Águilas, y un 6,4 por ciento sigue siendo alto para la costa. La pega es la falta de servicios: el pan y la farmacia exigen coche, y a la playa se baja por unos pocos accesos. Mira si las vistas de la parcela aguantan la siguiente promoción y el estado del camino de acceso, porque varias urbanizaciones quedan por encima de la carretera principal.",
    ],
  },
  "los-alcazares/playa": {
    pl: [
      "Playa de Los Alcázares to piaszczysty brzeg Mar Menor z deptakiem, restauracjami i wodą, która przez większość dni nie ma fal, więc kąpią się tu dzieci i osoby starsze. Apartamenty stoją blisko piasku, a cena jest o 160 euro wyższa niż w centrum, bo widok na lagunę sprzedaje się sam. ROI 6,7 procent to wynik powyżej średniej gminy, ale liczony na sezonie od czerwca do września. Sprawdź wysokość terenu i stan instalacji w starszych blokach, bo po ulewach rambla potrafi podejść pod budynek, oraz czy wspólnota ma basen, który w lipcu jest bardziej oblegany niż plaża.",
    ],
    en: [
      "Playa de Los Alcázares is the sandy Mar Menor shore with a promenade, restaurants and water that has no waves most days, so children and older residents swim here. Flats stand close to the sand, and prices run 160 euros above the centre because a lagoon view sells itself. A 6.7 percent yield beats the municipal average, but it is calculated on the June to September season. Check the height of the plot and the state of installations in older blocks, since after heavy rain the rambla can reach the building, and whether the community pool is more crowded than the beach in July.",
    ],
    es: [
      "Playa de Los Alcázares es la orilla de arena del Mar Menor con paseo, restaurantes y un agua que casi siempre está sin olas, así que se bañan niños y mayores. Los pisos están cerca de la arena y el precio va 160 euros sobre el centro, porque las vistas a la laguna se venden solas. Un 6,7 por ciento supera la media del municipio, pero se calcula sobre la temporada de junio a septiembre. Revisa la altura de la parcela y el estado de las instalaciones en bloques antiguos, porque tras lluvias fuertes la rambla llega al edificio, y si la piscina de la comunidad se llena más que la playa en julio.",
    ],
  },
  "los-alcazares/los-narejos": {
    pl: [
      "Los Narejos to nowe osiedla z basenami przy Playa de Los Narejos, kilka minut od pola golfowego Los Alcázares, gdzie apartamenty budowano głównie pod najem krótkoterminowy. Cena jest o 60 euro wyższa niż w centrum, a ROI 6,9 procent najwyższe w gminie, bo metraż jest mniejszy, a popyt w sezonie wysoki. To najbardziej inwestycyjny adres w mieście, więc konkurencja przy wynajmie jest realna, a standard wykończenia decyduje o obłożeniu. Sprawdź, czy osiedle ma licencję turystyczną i czy jest odebrane przez gminę, oraz jak daleko jest do sklepów, bo część osiedli to wyłącznie mieszkania na wynajem.",
    ],
    en: [
      "Los Narejos is new estates with pools by Playa de Los Narejos, minutes from the Los Alcázares golf course, where flats were built mainly for short-term letting. Prices run 60 euros above the centre and a 6.9 percent yield is the best in the municipality, because floor areas are smaller and summer demand is high. This is the most investment-oriented address in town, so letting competition is real and the finish standard decides occupancy. Confirm the estate holds a tourist licence and has been handed over to the council, and how far the shops are, since some estates are nothing but rental flats.",
    ],
    es: [
      "Los Narejos son urbanizaciones nuevas con piscina junto a Playa de Los Narejos, a minutos del campo de golf de Los Alcázares, donde los pisos se construyeron sobre todo para alquiler corto. El precio va 60 euros sobre el centro y un 6,9 por ciento es la mejor rentabilidad del municipio, porque los metros son menores y la demanda de verano alta. Es la dirección más inversora del pueblo, así que la competencia en alquiler es real y la calidad del acabado decide la ocupación. Confirma que la urbanización tenga licencia turística y esté recepcionada por el ayuntamiento, y a qué distancia quedan las tiendas, porque algunas solo tienen pisos de alquiler.",
    ],
  },
  "orihuela-costa/dehesa-de-campoamor": {
    pl: [
      "Dehesa de Campoamor to willa i apartamenty przy szerokiej Playa de Campoamor, z sosnowym zapleczem, basenami i największym udziałem domów z ogrodem w całej Orihuela Costa. Cena jest o 270 euro wyższa niż w średniej gminy, a popyt 8, bo to rodziny, które chcą plaży bez zgiełku La Zenia i bez hoteli w pierwszej linii. ROI 5,9 procent jest niższe niż w Lomas de Cabo Roig, bo cena wejścia jest wyższa, a czynsze rosną wolniej. Sprawdź, czy działka leży w strefie ochrony wydm i czy osiedle ma licencję turystyczną, bo część domów wynajmowana jest bez niej, co przy kontroli kończy się karą.",
    ],
    en: [
      "Dehesa de Campoamor is villas and flats by the wide Playa de Campoamor, with pine woods behind, pools and the largest share of houses with gardens in Orihuela Costa. Prices run 270 euros above the municipal average and demand is 8, because these are families who want a beach without the bustle of La Zenia and no front-line hotels. A 5.9 percent yield trails Lomas de Cabo Roig, since the entry price is higher and rents climb more slowly. Check whether the plot falls in the dune protection zone and whether the estate holds a tourist licence, because some houses are let without one and an inspection ends in a fine.",
    ],
    es: [
      "Dehesa de Campoamor son chalets y pisos junto a la amplia Playa de Campoamor, con pinar detrás, piscinas y la mayor proporción de casas con jardín de Orihuela Costa. El precio va 270 euros sobre la media municipal y la demanda es 8, porque son familias que buscan playa sin el bullicio de La Zenia y sin hoteles en primera línea. Un 5,9 por ciento queda por debajo de Lomas de Cabo Roig, ya que la entrada es más cara y las rentas suben más despacio. Comprueba si la parcela está en zona de protección de dunas y si la urbanización tiene licencia turística, porque hay casas alquiladas sin ella y una inspección acaba en sanción.",
    ],
  },
  "orihuela-costa/mil-palmeras": {
    pl: [
      "Mil Palmeras to nadmorska miejscowość na południowym końcu Orihuela Costa, przy granicy z Pilar de la Horadada, z szeroką plażą i nowymi osiedlami z basenami w kilku liniach od wody. Cena jest o 110 euro wyższa niż w średniej gminy, a popyt 8,5, bo bliskość Punta Prima i Torrevieja daje usługi, których nie ma w mniejszych osiedlach. ROI 6,2 procent jest wyższe niż w Campoamor, co czyni ten adres najlepszym kompromisem między plażą a zwrotem. Sprawdź, czy osiedle jest odebrane przez gminę, a plaża nie jest objęta planem ochrony, oraz jak wygląda dojazd w sezonie, bo jedna droga obsługuje całą miejscowość.",
    ],
    en: [
      "Mil Palmeras is a coastal village at the southern end of Orihuela Costa, on the border with Pilar de la Horadada, with a wide beach and new estates with pools a few rows from the water. Prices run 110 euros above the municipal average and demand is 8.5, because proximity to Punta Prima and Torrevieja brings services smaller estates lack. A 6.2 percent yield beats Campoamor, making this the best compromise between beach and return. Check whether the estate has been handed over to the council and whether the beach falls under a protection plan, and how the drive works in season, since one road serves the whole village.",
    ],
    es: [
      "Mil Palmeras es un núcleo costero en el extremo sur de Orihuela Costa, en el límite con Pilar de la Horadada, con playa amplia y urbanizaciones nuevas con piscina a unas filas del agua. El precio va 110 euros sobre la media municipal y la demanda es 8,5, porque la cercanía a Punta Prima y Torrevieja aporta servicios que otras urbanizaciones no tienen. Un 6,2 por ciento supera a Campoamor, lo que convierte esta dirección en el mejor equilibrio entre playa y retorno. Comprueba si la urbanización está recepcionada, si la playa tiene plan de protección y cómo funciona el acceso en temporada, porque una sola carretera sirve al núcleo entero.",
    ],
  },
  "orihuela-costa/lomas-de-cabo-roig": {
    pl: [
      "Lomas de Cabo Roig to najtańsze wejście w Orihuela Costa: apartamenty z basenami i terenami zielonymi na łagodnym zboczu, skąd do Playa de la Zenia i centrum handlowego jedzie się kilka minut. Cena jest o 100 euro niższa niż w średniej gminy, a ROI 6,2 procent, bo przy niższym metrażu i cenie czynsze trzymają poziom dzielnic plażowych. Popyt 7 w naszej skali wynika z tego, że nie ma tu pierwszej linii ani widoku na morze z każdego balkonu, więc najemcy to częściej rezydenci niż turyści. Sprawdź, czy osiedle jest odebrane przez gminę i czy wspólnota ma fundusz na malowanie, bo bloki mają kilkanaście lat.",
    ],
    en: [
      "Lomas de Cabo Roig is the cheapest entry into Orihuela Costa: flats with pools and green areas on a gentle slope, a few minutes from Playa de la Zenia and the shopping centre. Prices run 100 euros below the municipal average with a 6.2 percent yield, because smaller units and lower prices still command beach-district rents. Demand of 7 on our scale reflects no front line and no sea view from every balcony, so tenants are residents more often than tourists. Check whether the estate has been handed over to the council and whether the community has a painting fund, since the blocks are over a decade old.",
    ],
    es: [
      "Lomas de Cabo Roig es la entrada más barata a Orihuela Costa: pisos con piscina y zonas verdes en una ladera suave, a minutos de Playa de la Zenia y del centro comercial. El precio va 100 euros bajo la media municipal con un 6,2 por ciento, porque viviendas más pequeñas y precios más bajos mantienen rentas de barrio de playa. La demanda de 7 en nuestra escala refleja que no hay primera línea ni vistas al mar desde todos los balcones, así que el inquilino es más residente que turista. Comprueba si la urbanización está recepcionada y si la comunidad tiene fondo para pintar, porque los bloques tienen más de una década.",
    ],
  },
  "orihuela-costa/villamartin": {
    pl: [
      "Villamartín to osiedla wokół pola golfowego Villamartín, z restauracjami i klubem w zasięgu spaceru, gdzie apartamenty kupują osoby grające i rezydenci, a nie tylko turyści z plaży. Cena jest o 160 euro wyższa niż w średniej gminy, ale o 220 niższa niż w Cabo Roig, bo do morza trzeba podjechać. Popyt 8 i ROI 6,0 procent wynikają z całorocznego życia osiedla: golf, restauracje i La Fuente działają także poza sezonem, co w tej części wybrzeża nie jest normą. Sprawdź wysokość składek na utrzymanie pól golfowych i terenów zielonych, bo w tej strefie stanowią one istotną część miesięcznych kosztów.",
    ],
    en: [
      "Villamartín is a set of estates around the Villamartín golf course, with restaurants and a clubhouse within walking distance, where flats are bought by golfers and residents rather than beach tourists only. Prices run 160 euros above the municipal average but 220 below Cabo Roig, because the sea means a drive. Demand of 8 and a 6.0 percent yield come from the estate's year-round life: golf, restaurants and La Fuente work outside summer too, which is not the norm on this coast. Check the charges for maintaining the golf course and green areas, since in this area they form a significant part of monthly costs.",
    ],
    es: [
      "Villamartín son urbanizaciones alrededor del campo de golf de Villamartín, con restaurantes y club a un paseo, donde los pisos los compran jugadores y residentes y no solo turistas de playa. El precio va 160 euros sobre la media municipal pero 220 por debajo de Cabo Roig, porque al mar hay que ir en coche. La demanda de 8 y un 6,0 por ciento salen de la vida anual de la urbanización: golf, restaurantes y La Fuente funcionan también fuera de temporada, algo que no es norma en esta costa. Revisa las cuotas de mantenimiento del campo y de las zonas verdes, porque en esta zona pesan mucho en el gasto mensual.",
    ],
  },
  // END
};

export function districtMarketNote(
  citySlug: string,
  districtSlug: string,
  locale: Locale,
): DistrictMarketNote | null {
  const paragraphs = NOTES[`${citySlug}/${districtSlug}`]?.[locale];
  if (!paragraphs || paragraphs.length === 0) return null;
  return { heading: HEADING[locale], paragraphs };
}
