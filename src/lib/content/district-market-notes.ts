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
  "alicante/cabo-de-las-huertas": {
    pl: [
      "Cabo de las Huertas to cypel na północ od centrum Alicante, gdzie apartamenty z widokiem na Cala de la Palmera sąsiadują z willami wśród sosen. Cena jest najwyższa w mieście, a towarzystwo mieszane: profesorowie z uniwersytetu, lekarze ze szpitala i rodziny, które kupiły tu mieszkanie dwadzieścia lat temu. Do plaży schodzi się po schodach, więc z wózkiem albo po zakupach trzeba się nagimnastykować. Sprawdź, czy wspólnota utrzymuje klatki i ogrody, bo starsze bloki na cyplu mają wspólnoty po 100-150 euro miesięcznie.",
    ],
    en: [
      "Cabo de las Huertas is the headland north of Alicante centre, where sea-view flats above Cala de la Palmera sit next to villas among pines. Prices are the highest in the city, and the neighbours are mixed: university staff, hospital doctors and families who bought here twenty years ago. The beach is reached down steps, which is awkward with a pram or shopping. Check whether the community maintains stairwells and gardens, because older blocks on the point carry fees of 100 to 150 euros a month.",
    ],
    es: [
      "Cabo de las Huertas es el cabo al norte del centro de Alicante, donde los pisos con vistas sobre la Cala de la Palmera conviven con chalets entre pinos. Es el precio más alto de la ciudad y el vecindario es mixto: personal de la universidad, médicos del hospital y familias que compraron aquí hace veinte años. A la playa se baja por escaleras, algo incómodo con carrito o con la compra. Comprueba si la comunidad mantiene portales y jardines, porque los bloques antiguos del cabo tienen cuotas de 100 a 150 euros al mes.",
    ],
  },
  "alicante/pau-5": {
    pl: [
      "PAU 5 to nowe osiedla na północy Alicante, budowane od lat dwutysięcznych, z garażami podziemnymi, basenami i szerokimi chodnikami, których brakuje w starym śródmieściu. Kupują tu głównie młode rodziny i pracownicy biur, którzy chcą nowego budownictwa i miejsca parkingowego, a nie kamienicy z windą z lat sześćdziesiątych. Do plaży San Juan jest kilka przystanków tramwajem, więc samochód nie jest konieczny. Sprawdź wysokość wspólnoty w osiedlach z basenem oraz to, czy deweloper przekazał drogi i zieleń gminie, bo w niektórych etapach wciąż nim zarządza.",
    ],
    en: [
      "PAU 5 is the newer housing north of Alicante, built from the 2000s with underground garages, pools and wide pavements the old centre lacks. Buyers are mostly young families and office workers who want new build and a parking space rather than a sixties block with a lift. Playa de San Juan is a few tram stops away, so a car is not essential. Check the community fee in estates with a pool, and whether the developer has handed roads and green areas to the council, since some phases are still managed by the builder.",
    ],
    es: [
      "PAU 5 son las urbanizaciones nuevas del norte de Alicante, construidas desde los años dos mil con garajes subterráneos, piscinas y aceras amplias que el centro antiguo no tiene. Compran sobre todo familias jóvenes y empleados de oficina que quieren obra nueva y plaza de garaje en lugar de un edificio de los sesenta con ascensor. A Playa de San Juan hay unas paradas de tranvía, así que el coche no es imprescindible. Revisa la cuota en urbanizaciones con piscina y si el promotor ya entregó calles y zonas verdes al ayuntamiento.",
    ],
  },
  "alicante/vistahermosa": {
    pl: [
      "Vistahermosa to spokojna dzielnica willowa na obrzeżach Alicante, przy polu golfowym Del Mar Golf, gdzie metr jest tańszy niż nad wodą, a działki pozwalają na basen i ogród. Kupują tu rodziny, które chcą domu w granicach miasta, oraz rezydenci, którzy pracują zdalnie i do centrum jadą samochodem. Minusem jest zależność od auta i mniejsza podaż mieszkań na wynajem, więc jeśli szukasz lokalu pod najem, wybierz raczej San Juan. Sprawdź plan miejscowy i klasę gruntu, bo część działek ma ograniczenia zabudowy.",
    ],
    en: [
      "Vistahermosa is a quiet villa district on the edge of Alicante, next to Del Mar Golf, where the square metre is cheaper than by the water and plots allow a pool and a garden. Buyers are families wanting a house inside the city limits and remote workers who drive to the centre. The drawback is car dependence and a thinner rental market, so if you want a flat to let, San Juan is a better fit. Check the town plan and land classification, since some plots carry building restrictions.",
    ],
    es: [
      "Vistahermosa es un barrio tranquilo de chalets en el borde de Alicante, junto a Del Mar Golf, donde el metro cuesta menos que junto al agua y las parcelas permiten piscina y jardín. Compran familias que quieren casa dentro del municipio y profesionales que trabajan en remoto y van al centro en coche. La pega es la dependencia del coche y un mercado de alquiler más estrecho, así que para un piso de renta encaja mejor San Juan. Revisa el planeamiento y la clasificación del suelo, porque algunas parcelas tienen limitaciones.",
    ],
  },
  "torrevieja/la-mata": {
    pl: [
      "La Mata to północna część Torrevieja, oddzielona od miasta parkiem nad laguną, gdzie plaża jest szersza, a bloki niższe niż w centrum. Mieszkańcy to głównie obcokrajowcy z północy Europy, którzy cenią spokój i to, że nad wodę idzie się pięć minut. Cena jest wyższa niż w El Acequión, ale niższa niż w Punta Prima, a ROI 5,8 procent wynika z sezonowości. Sprawdź, czy budynek ma windę i czy wspólnota utrzymuje ogród, bo osiedla z lat dziewięćdziesiątych wymagają już nakładów.",
    ],
    en: [
      "La Mata is the northern part of Torrevieja, separated from town by the lagoon park, where the beach is wider and the blocks lower than in the centre. Residents are mostly northern Europeans who value the quiet and the five-minute walk to the water. Prices run above El Acequión but below Punta Prima, and a 5.8 percent yield reflects the seasonal pattern. Check whether the building has a lift and whether the community maintains its garden, since nineties estates now need investment.",
    ],
    es: [
      "La Mata es la parte norte de Torrevieja, separada del centro por el parque de la laguna, donde la playa es más ancha y los bloques más bajos. Viven sobre todo extranjeros del norte de Europa que valoran el silencio y los cinco minutos hasta el agua. El precio supera a El Acequión pero queda bajo Punta Prima, y un 5,8 por ciento refleja la estacionalidad. Comprueba si el edificio tiene ascensor y si la comunidad mantiene el jardín, porque las urbanizaciones de los noventa ya piden inversión.",
    ],
  },
  "torrevieja/el-acequion": {
    pl: [
      "El Acequión to najstarsza część nadmorskiej Torrevieja, z portem rybackim, targiem i blokami z lat osiemdziesiątych, gdzie metr jest najtańszy w mieście. To adres dla kupujących z budżetem, którzy wolą remontować niż dopłacać za widok: mieszkania 60 m² kosztują tu mniej niż kawalerka w Punta Prima. Najem działa cały rok, bo w okolicy mieszkają pracownicy portu i sklepów, a nie tylko turyści. Sprawdź stan instalacji elektrycznej i wodnej, wysokość wspólnoty oraz to, czy budynek nie stoi w zasięgu zalewania po ulewach.",
    ],
    en: [
      "El Acequión is the oldest part of coastal Torrevieja, with a fishing port, a market and eighties blocks where the square metre is the cheapest in town. It suits buyers on a budget who prefer renovating to paying for a view: a 60 square metre flat here costs less than a studio in Punta Prima. Letting works all year because port and shop staff live nearby, not only tourists. Check the electrical and water installations, the community fee, and whether the building sits in a flood-prone pocket after heavy rain.",
    ],
    es: [
      "El Acequión es la parte más antigua de la Torrevieja costera, con puerto pesquero, mercado y bloques de los ochenta donde el metro es el más barato del pueblo. Encaja con compradores de presupuesto que prefieren reformar antes que pagar vistas: un piso de 60 metros cuesta aquí menos que un estudio en Punta Prima. El alquiler funciona todo el año porque cerca viven trabajadores del puerto y de las tiendas, no solo turistas. Revisa instalaciones eléctrica y de agua, la comunidad y si el edificio está en una zona que se inunda tras lluvias fuertes.",
    ],
  },
  "benidorm/playa-de-poniente": {
    pl: [
      "Playa de Poniente to zachodnia plaża Benidormu, szersza i spokojniejsza od Levante, z apartamentami w wieżowcach, ale bez Aqualandii i klubów za plecami. Kupują tu rodziny z dziećmi oraz osoby, które chcą mieć plażę pod oknem, a nie nocne życie, dlatego najem jest tu bardziej przewidywalny. Cena jest niższa niż na Levante o około 480 euro za metr, a ROI 6,0 procent wyższe niż na wschodniej plaży. Sprawdź odległość od pasa drogowego i wysokość opłat w wieżowcu z basenem.",
    ],
    en: [
      "Playa de Poniente is Benidorm's western beach, wider and calmer than Levante, with flats in towers but no water park and clubs behind them. Buyers are families with children and people who want the beach at the window rather than nightlife, which makes letting more predictable. Prices run about 480 euros per square metre below Levante, and a 6.0 percent yield beats the eastern beach. Check the distance to the coast road and the fees in a tower with a pool.",
    ],
    es: [
      "Playa de Poniente es la playa oeste de Benidorm, más ancha y tranquila que Levante, con pisos en torres pero sin parque acuático ni clubes detrás. Compran familias con niños y quien busca playa en la ventana y no vida nocturna, lo que hace el alquiler más previsible. El precio está unos 480 euros por metro bajo Levante y un 6,0 por ciento supera a la playa este. Revisa la distancia a la carretera y las cuotas de una torre con piscina.",
    ],
  },
  "benidorm/rincon-de-loix": {
    pl: [
      "Rincón de Loix to wschodni cypel Benidormu, gdzie Levante kończy się przy Serra Gelada, a apartamenty mają widok na zatokę i góry jednocześnie. To najbardziej rozrywkowa część miasta: kluby, bary i Aqualandia są w promieniu kilkuset metrów, więc najem turystyczny pracuje tu najmocniej w sezonie. Cena jest o 160 euro wyższa niż w średniej miasta, a ROI 6,0 procent, bo metraż lokali jest mniejszy. Sprawdź hałas w weekendy i licencję turystyczną budynku, a jeśli szukasz spokoju, wybierz Poniente.",
    ],
    en: [
      "Rincón de Loix is Benidorm's eastern point, where Levante ends at Serra Gelada and flats look at the bay and the mountains at once. It is the most entertainment-heavy part of town: clubs, bars and Aqualandia within a few hundred metres, so tourist letting works hardest here in season. Prices run 160 euros above the town average with a 6.0 percent yield, because units are smaller. Check weekend noise and the building's tourist licence, and if you want quiet, choose Poniente.",
    ],
    es: [
      "Rincón de Loix es el extremo este de Benidorm, donde Levante termina en Serra Gelada y los pisos miran a la bahía y a la montaña a la vez. Es la zona más de ocio del pueblo: clubes, bares y Aqualandia a pocos cientos de metros, así que el alquiler turístico funciona al máximo en temporada. El precio va 160 euros sobre la media con un 6,0 por ciento, porque las viviendas son más pequeñas. Revisa el ruido de fin de semana y la licencia turística del edificio; si buscas calma, elige Poniente.",
    ],
  },
  "benidorm/foietes": {
    pl: [
      "Foietes to zaplecze Benidormu: park, stadion i bloki, w których mieszkają osoby pracujące w hotelach i sklepach, a nie turyści. Cena jest najniższa w mieście, a ROI wysokie, bo najem trwa cały rok i nie zależy od sezonu. To dobry adres dla inwestora, który chce dochodu, a nie widoku, oraz dla kogoś, kto pracuje w centrum i chce dojść pieszo. Sprawdź stan instalacji i wspólnotę, bo część budynków pamięta lata siedemdziesiąte.",
    ],
    en: [
      "Foietes is Benidorm's back office: a park, a stadium and blocks where hotel and shop staff live rather than tourists. Prices are the lowest in town and yields high, because letting runs all year and does not depend on the season. It suits an investor after income rather than a view, and anyone working in the centre who wants to walk. Check installations and community fees, since some buildings date from the seventies.",
    ],
    es: [
      "Foietes es la trastienda de Benidorm: parque, estadio y bloques donde vive el personal de hoteles y tiendas, no los turistas. El precio es el más bajo del pueblo y la rentabilidad alta, porque el alquiler funciona todo el año y no depende de la temporada. Encaja con el inversor que busca renta y no vistas, y con quien trabaja en el centro y quiere ir a pie. Revisa instalaciones y comunidad, porque algunos edificios son de los setenta.",
    ],
  },
  "benidorm/sierra-helada": {
    pl: [
      "Sierra Helada to wille i apartamenty na zboczu nad Playa de Levante, na skraju parku naturalnego, gdzie kończy się zabudowa Benidormu. Kupują tu osoby, które chcą widoku na zatokę i ciszy, ale nie chcą rezygnować z dojścia do plaży w dziesięć minut. Cena jest o 160 euro niższa niż na Levante, a ROI 5,8 procent, bo najem jest krótki i zależny od sezonu. Sprawdź dojazd, bo część dróg jest stroma, oraz czy działka leży w strefie parku, gdzie rozbudowa wymaga zgody.",
    ],
    en: [
      "Sierra Helada is villas and flats on the slope above Playa de Levante, at the edge of the natural park where Benidorm's built-up area ends. Buyers want the bay view and quiet without giving up a ten-minute walk to the beach. Prices run 160 euros below Levante, with a 5.8 percent yield, since letting is short and seasonal. Check the approach roads, some of which are steep, and whether the plot falls inside the park zone, where extensions need permission.",
    ],
    es: [
      "Sierra Helada son chalets y pisos en la ladera sobre Playa de Levante, en el borde del parque natural donde acaba la trama de Benidorm. Compran quien busca vistas a la bahía y silencio sin renunciar a diez minutos a pie de la playa. El precio va 160 euros bajo Levante, con un 5,8 por ciento, porque el alquiler es corto y estacional. Revisa los accesos, algunos en cuesta, y si la parcela está en zona de parque, donde ampliar necesita permiso.",
    ],
  },
  "calpe/playa-de-la-fossa": {
    pl: [
      "Playa de la Fossa to pierwsza linia Calpe pod Peñón de Ifach, z apartamentami w wieżowcach, restauracjami na promenadzie i największym najmem sezonowym w mieście. Cena jest najwyższa w gminie, bo widok na skałę i morze sprzedaje się sam, a ROI 5,6 procent, bo wspólnoty z basenem są drogie. To adres pod najem turystyczny i własne wakacje, nie pod dochód całoroczny. Sprawdź, czy budynek ma licencję turystyczną i czy okna nie wychodzą na promenadę z barami.",
    ],
    en: [
      "Playa de la Fossa is Calpe's front line under Peñón de Ifach, with flats in towers, restaurants along the promenade and the town's largest seasonal letting market. Prices are the highest in the municipality because the rock and sea view sells itself, and the 5.6 percent yield reflects expensive pool communities. This is an address for tourist letting and your own holidays, not year-round income. Check the building's tourist licence and whether windows face the bar-lined promenade.",
    ],
    es: [
      "Playa de la Fossa es la primera línea de Calpe bajo el Peñón de Ifach, con pisos en torres, restaurantes en el paseo y el mayor mercado de alquiler estacional del pueblo. El precio es el más alto del municipio porque la vista a la roca y al mar se vende sola, y el 5,6 por ciento refleja comunidades caras con piscina. Es una dirección para alquiler turístico y vacaciones propias, no para renta anual. Revisa la licencia turística del edificio y si las ventanas dan al paseo de bares.",
    ],
  },
  "altea/casco-antiguo": {
    pl: [
      "Casco Antiguo to stare Altea na wzgórzu, z białymi murami, Iglesia del Consuelo i uliczkami, w których samochód zostawia się na dole. Mieszkania są tu małe, często po remoncie, z widokiem na zatokę z okna na poddaszu. Cena jest najwyższa w mieście, bo to adres z widokówki, ale remont wymaga zgody konserwatora na elewację i stolarkę. Sprawdź, czy budynek ma windę i jak wygląda dojście po schodach, bo dla najemcy to często warunek rezygnacji.",
    ],
    en: [
      "Casco Antiguo is old Altea on the hill, with white walls, Iglesia del Consuelo and lanes where you leave the car at the bottom. Flats are small, often renovated, with bay views from an attic window. Prices are the highest in town because this is the postcard address, but renovation needs heritage approval for the facade and joinery. Check whether the building has a lift and what the stepped approach looks like, since for tenants that is often the deal-breaker.",
    ],
    es: [
      "Casco Antiguo es la Altea antigua en lo alto, con muros blancos, la Iglesia del Consuelo y callejas donde el coche se deja abajo. Los pisos son pequeños, a menudo reformados, con vistas a la bahía desde una ventana de buhardilla. El precio es el más alto del pueblo porque es la dirección de postal, pero la reforma exige permiso de patrimonio para fachada y carpintería. Comprueba si el edificio tiene ascensor y cómo es el acceso por escaleras, porque para el inquilino suele ser decisivo.",
    ],
  },
  "altea/cap-blanc": {
    pl: [
      "Cap Blanc to spokojna część wybrzeża Altei między Mascarat a centrum, z willem i apartamentami na skarpie, skąd widać zatokę bez tłumu z plaży. Kupują tu osoby, które chcą ciszy i ogrodu, a do restauracji jadą trzy minuty samochodem. Cena jest o 60 euro wyższa niż w średniej miasta, a ROI 5,4 procent, bo najem jest rzadszy niż nad samą wodą. Sprawdź nachylenie działki, stan murów oporowych i dostęp do drogi gminnej, bo część posesji dojeżdża prywatnymi odcinkami.",
    ],
    en: [
      "Cap Blanc is the quiet stretch of Altea's coast between Mascarat and the centre, with villas and flats on the slope where you see the bay without the beach crowd. Buyers want quiet and a garden, and drive three minutes to restaurants. Prices run 60 euros above the town average with a 5.4 percent yield, since letting is thinner than at the water. Check the gradient, the state of retaining walls and access to a council road, because some properties arrive over private stretches.",
    ],
    es: [
      "Cap Blanc es el tramo tranquilo de la costa de Altea entre Mascarat y el centro, con chalets y pisos en la ladera desde donde se ve la bahía sin la multitud de la playa. Compran quien busca silencio y jardín, y va en coche tres minutos a los restaurantes. El precio va 60 euros sobre la media con un 5,4 por ciento, porque el alquiler es más escaso que junto al agua. Revisa la pendiente, el estado de los muros y el acceso a camino municipal, ya que algunas fincas llegan por tramos privados.",
    ],
  },
  "denia/puerto": {
    pl: [
      "Puerto w Dénia to mieszkania wokół mariny i nabrzeża, z promem na Ibizę za plecami i targiem rybnym po drugiej stronie ulicy. Cena jest o 60 euro niższa niż w średniej miasta, bo hałas silników i ruch ciężarówek są tu codziennością, a ROI 5,6 procent nie zachwyca. Zaletą jest możliwość życia bez samochodu: restauracje, sklepy i przystań są w zasięgu spaceru. Obejrzyj mieszkanie o świcie, kiedy pracuje port, i sprawdź, czy okna mają podwójne szyby.",
    ],
    en: [
      "Puerto in Dénia means flats around the marina and the quay, with the Ibiza ferry behind you and the fish market across the road. Prices run 60 euros below the town average because engine noise and lorry traffic are daily facts, and a 5.6 percent yield is unremarkable. The advantage is living without a car: restaurants, shops and the marina are a walk away. View the flat at dawn when the port works, and check whether the windows are double glazed.",
    ],
    es: [
      "Puerto en Dénia son pisos alrededor de la marina y el muelle, con el ferry a Ibiza detrás y la lonja al otro lado de la calle. El precio va 60 euros bajo la media porque el ruido de motores y el trasiego de camiones son rutina, y un 5,6 por ciento no entusiasma. La ventaja es vivir sin coche: restaurantes, tiendas y marina a un paseo. Visita el piso al amanecer, cuando trabaja el puerto, y comprueba si las ventanas tienen doble cristal.",
    ],
  },
  "santa-pola/varadero": {
    pl: [
      "Varadero to zachodnia część portu w Santa Pola, gdzie cumują kutry i jachty, a apartamenty stoją o ulicę od nabrzeża. Cena jest wyższa niż w centrum, bo do wody jest kilka kroków, ale niższa niż przy Playa de Levante. Najem pracuje cały rok: port daje zatrudnienie, a nie tylko sezon. Sprawdź hałas silników o świcie i to, czy okna wychodzą na plac manewrowy, oraz wysokość wspólnoty w blokach z widokiem na marinę.",
    ],
    en: [
      "Varadero is the western side of Santa Pola's port, where fishing boats and yachts moor and flats stand a street from the quay. Prices are above the centre because the water is a few steps away, yet below Playa de Levante. Letting runs all year: the port provides jobs, not only a season. Check engine noise at dawn and whether windows face the manoeuvring yard, plus the community fee in blocks overlooking the marina.",
    ],
    es: [
      "Varadero es el lado oeste del puerto de Santa Pola, donde amarran barcas y yates y los pisos están a una calle del muelle. El precio supera al centro porque el agua queda a unos pasos, pero está bajo Playa de Levante. El alquiler funciona todo el año: el puerto da empleo y no solo temporada. Revisa el ruido de motores al amanecer y si las ventanas dan al patio de maniobras, además de la comunidad en bloques frente a la marina.",
    ],
  },
  "finestrat/golf": {
    pl: [
      "Golf w Finestrat to osiedla wokół pola golfowego i Sierra Cortina, z apartamentami z basenami i spa, gdzie kupują osoby grające oraz rezydenci z północy Europy. Cena jest o 110 euro wyższa niż w średniej gminy, ale niższa niż w Balcón de Finestrat, bo widok na morze jest tylko z części tarasów. Najem jest tu dłuższy niż nad plażą, bo pole i restauracje działają cały rok. Sprawdź składki na utrzymanie terenów zielonych i czy osiedle ma licencję turystyczną.",
    ],
    en: [
      "Golf in Finestrat means estates around the course and Sierra Cortina, with flats that have pools and spa access, bought by golfers and northern European residents. Prices run 110 euros above the municipal average but below Balcón de Finestrat, because only some terraces see the sea. Letting lasts longer than by the beach, since the course and restaurants work all year. Check the green area charges and whether the estate holds a tourist licence.",
    ],
    es: [
      "Golf en Finestrat son urbanizaciones en torno al campo y Sierra Cortina, con pisos con piscina y spa, comprados por jugadores y residentes del norte de Europa. El precio va 110 euros sobre la media municipal pero bajo Balcón de Finestrat, porque solo algunas terrazas ven el mar. El alquiler dura más que junto a la playa, ya que campo y restaurantes funcionan todo el año. Revisa las cuotas de zonas verdes y si la urbanización tiene licencia turística.",
    ],
  },
  "l-albir/playa-del-albir": {
    pl: [
      "Playa del Albir to szeroka żwirowa plaża pod Serra Gelada, z apartamentami w pierwszej linii i osiedlami z basenami, które powstały, zanim park ograniczył zabudowę. Cena jest najwyższa w gminie, bo widok na klif i morze jest tu najlepszy, a ROI 5,6 procent, bo najem trwa głównie od maja do października. To adres pod własne wakacje i najem sezonowy, nie pod dochód całoroczny. Sprawdź, czy budynek ma licencję turystyczną i czy plaża nie jest zamknięta po sztormach.",
    ],
    en: [
      "Playa del Albir is the wide pebble beach under Serra Gelada, with front-line flats and pool estates built before the park capped development. Prices are the highest in the municipality because the cliff and sea view is the best here, and the 5.6 percent yield reflects letting that runs mainly from May to October. This is an address for your own holidays and seasonal letting, not year-round income. Check the tourist licence and whether the beach closes after storms.",
    ],
    es: [
      "Playa del Albir es la playa amplia de grava bajo Serra Gelada, con pisos en primera línea y urbanizaciones con piscina construidas antes de que el parque limitara la edificación. El precio es el más alto del municipio porque las vistas al acantilado y al mar son las mejores, y el 5,6 por ciento refleja un alquiler de mayo a octubre. Es una dirección para vacaciones propias y alquiler de temporada, no para renta anual. Revisa la licencia turística y si la playa cierra tras los temporales.",
    ],
  },
  "denia/la-xara": {
    pl: [
      "La Xara to wieś w gminie Dénia, trzy kilometry od morza, gdzie metr jest najtańszy w całej gminie, a domy mają ogrody i place na pomarańcze. Kupują tu osoby pracujące w Dénia oraz ci, którzy chcą domu z działką, a plażę traktują jako cel weekendowy. Najem jest dłuższy niż nad wodą, bo to zwykła miejscowość, a nie kurort, ale podaż mieszkań jest mała. Sprawdź plan miejscowy i czy działka ma dostęp do drogi gminnej, bo część gruntów to tereny rolne.",
    ],
    en: [
      "La Xara is a village in the Dénia municipality, three kilometres from the sea, where the square metre is the cheapest in the whole municipality and houses have gardens and orange plots. Buyers work in Dénia or want a house with land and treat the beach as a weekend target. Letting lasts longer than by the water because this is an ordinary village and not a resort, though flat supply is small. Check the town plan and whether the plot reaches a council road, since some land is agricultural.",
    ],
    es: [
      "La Xara es un pueblo del municipio de Dénia, a tres kilómetros del mar, donde el metro es el más barato de todo el municipio y las casas tienen jardín y huerto de naranjos. Compran quienes trabajan en Dénia o buscan casa con parcela y ven la playa como plan de fin de semana. El alquiler dura más que junto al agua porque es un pueblo normal y no un resort, aunque hay poca oferta de pisos. Revisa el planeamiento y si la parcela da a camino municipal, porque parte del suelo es agrícola.",
    ],
  },
  "denia/montgo": {
    pl: [
      "Montgó to zbocze pod parkiem naturalnym nad Dénia, gdzie wille i apartamenty mają widok na zatokę, a hałas miasta zostaje na dole. To adres dla osób, które chcą ciszy, ogrodu i bliskości szlaków, a do plaży jadą pięć minut. Cena jest o 210 euro wyższa niż w średniej gminy, ale ROI 5,6 procent, bo najem jest rzadszy niż przy porcie. Sprawdź nachylenie drogi, stan murów oporowych i czy działka leży w strefie parku, gdzie rozbudowa wymaga zgody.",
    ],
    en: [
      "Montgó is the slope under the natural park above Dénia, where villas and flats look over the bay and the town noise stays below. It suits people who want quiet, a garden and trails nearby, with the beach five minutes away by car. Prices run 210 euros above the municipal average, with a 5.6 percent yield, because letting is thinner than by the port. Check the road gradient, the state of retaining walls and whether the plot sits in the park zone, where extensions need permission.",
    ],
    es: [
      "Montgó es la ladera bajo el parque natural sobre Dénia, donde chalets y pisos miran a la bahía y el ruido del pueblo queda abajo. Encaja con quien busca silencio, jardín y senderos cerca, con la playa a cinco minutos en coche. El precio va 210 euros sobre la media municipal, con un 5,6 por ciento, porque el alquiler es más escaso que junto al puerto. Revisa la pendiente del camino, el estado de los muros y si la parcela está en zona de parque, donde ampliar necesita permiso.",
    ],
  },
  "javea/tosalet": {
    pl: [
      "Tosalet to najstarsza urbanizacja willowa w Jávea, z dużymi działkami, sosnami i domami, które budowano od lat siedemdziesiątych, gdy na wybrzeżu nie było jeszcze tłoku. Cena jest o 380 euro niższa niż w średniej gminy, bo toczy się tu drugi rynek: domy wymagają remontu, a nie każdy kupujący chce go prowadzić. Kupują tu osoby, które znają Jávea od lat, oraz rodziny szukające ogrodu blisko Arenal. Sprawdź stan instalacji, dachu i czy działka ma dostęp do drogi publicznej.",
    ],
    en: [
      "Tosalet is the oldest villa urbanisation in Jávea, with large plots, pines and houses built from the seventies when the coast was still uncrowded. Prices run 380 euros below the municipal average because this is a second-hand market: houses need renovation and not every buyer wants that. Buyers know Jávea from years back, plus families after a garden near Arenal. Check installations, the roof and whether the plot reaches a public road.",
    ],
    es: [
      "Tosalet es la urbanización de chalets más antigua de Jávea, con parcelas grandes, pinos y casas construidas desde los setenta, cuando la costa aún no estaba llena. El precio va 380 euros bajo la media municipal porque aquí se compra segunda mano: las casas piden reforma y no todo comprador quiere asumirla. Compran quienes conocen Jávea desde años atrás y familias que buscan jardín cerca del Arenal. Revisa instalaciones, tejado y si la parcela tiene acceso a camino público.",
    ],
  },
  "guardamar-del-segura/guardamar-playa": {
    pl: [
      "Guardamar Playa to nadmorska część miasta, oddzielona od centrum parkiem Alfonso XIII i wydmami, gdzie apartamenty stoją o ulicę od szerokiej plaży. Cena jest najwyższa w gminie, bo do wody idzie się trzy minuty, a sosnowy park daje cień, którego brakuje w innych kurortach. Najem pracuje od maja do października, a poza sezonem część bloków stoi pusta. Sprawdź, czy budynek ma windę i wspólnotę z funduszem, bo osiedla z lat dziewięćdziesiątych wymagają już nakładów.",
    ],
    en: [
      "Guardamar Playa is the seafront part of town, separated from the centre by the Alfonso XIII park and the dunes, where flats stand a street from the wide beach. Prices are the highest in the municipality because the water is three minutes away and the pine park gives shade other resorts lack. Letting runs from May to October, and off season part of the blocks stands empty. Check whether the building has a lift and a community with reserves, since nineties estates now need investment.",
    ],
    es: [
      "Guardamar Playa es la parte marítima del pueblo, separada del centro por el parque Alfonso XIII y las dunas, donde los pisos están a una calle de la playa amplia. El precio es el más alto del municipio porque el agua queda a tres minutos y el pinar da la sombra que otros resorts no tienen. El alquiler va de mayo a octubre y fuera de temporada parte de los bloques queda vacía. Revisa si el edificio tiene ascensor y una comunidad con reservas, porque las urbanizaciones de los noventa ya piden inversión.",
    ],
  },
  "guardamar-del-segura/el-raso": {
    pl: [
      "El Raso to duża urbanizacja willowa przy Carretera de Torrevieja, trzy kilometry od plaży, gdzie domy z basenami stoją na działkach wśród palm. Cena jest najniższa w gminie, bo nie ma tu morza za oknem, a samochód jest konieczny do wszystkiego. Kupują tu głównie obcokrajowcy z północy Europy, którzy chcą domu z ogrodem w cenie mieszkania nad wodą. Sprawdź, czy urbanizacja jest odebrana przez gminę i czy drogi wewnętrzne mają właściciela, bo część osiedli wciąż nim nie jest.",
    ],
    en: [
      "El Raso is a large villa urbanisation on the Torrevieja road, three kilometres from the beach, where houses with pools sit on palm-lined plots. Prices are the lowest in the municipality because there is no sea at the window and a car is needed for everything. Buyers are mostly northern Europeans who want a house with a garden at the price of a flat by the water. Check whether the urbanisation has been handed to the council and who owns the internal roads.",
    ],
    es: [
      "El Raso es una gran urbanización de chalets en la carretera de Torrevieja, a tres kilómetros de la playa, donde las casas con piscina ocupan parcelas entre palmeras. El precio es el más bajo del municipio porque no hay mar en la ventana y el coche es imprescindible para todo. Compran sobre todo extranjeros del norte de Europa que quieren casa con jardín al precio de un piso junto al agua. Comprueba si la urbanización está recepcionada y quién es titular de los caminos interiores.",
    ],
  },
  "cartagena/santa-lucia": {
    pl: [
      "Santa Lucía to dzielnica na wzgórzu nad portem w Kartagenie, z kamienicami z początku XX wieku i widokiem na zatokę z górnych pięter. Cena jest najniższa w mieście, bo budynki wymagają remontu, a winda bywa luksusem; w zamian dostajesz metraż, którego nie ma w nowych osiedlach. Kupują tu inwestorzy liczący na wzrost wartości po remoncie starówki oraz najemcy pracujący w porcie i na uczelni. Sprawdź ITE i stan dachu, bo bez aktualnego przeglądu bank nie da kredytu.",
    ],
    en: [
      "Santa Lucía is the hillside district above Cartagena's port, with early twentieth century buildings and bay views from the upper floors. Prices are the lowest in the city because buildings need work and a lift is a luxury; in return you get floor area new estates cannot offer. Buyers are investors betting on the old town's recovery and tenants working at the port or the university. Check the ITE inspection and the roof, since without a current report a bank will not lend.",
    ],
    es: [
      "Santa Lucía es el barrio en la ladera sobre el puerto de Cartagena, con edificios de principios del siglo XX y vistas a la bahía desde las plantas altas. El precio es el más bajo de la ciudad porque los edificios piden obra y el ascensor es un lujo; a cambio se obtienen metros que las promociones nuevas no ofrecen. Compran inversores que apuestan por la recuperación del casco y inquilinos del puerto o la universidad. Revisa el ITE y el tejado, porque sin informe en vigor el banco no presta.",
    ],
  },
  "los-alcazares/punta-brava": {
    pl: [
      "Punta Brava to spokojny skraj Los Alcázares przy granicy z San Javier, gdzie domy i apartamenty stoją przy wąskich ulicach, a do Mar Menor idzie się kilka minut. Cena jest najniższa w gminie, bo nie ma tu deptaku ani portu, tylko zwykłe sąsiedztwo. Kupują tu osoby, które chcą plaży bez turystycznego zgiełku, oraz rezydenci szukający taniego domu blisko lotniska. Sprawdź wysokość terenu, bo to nizina, oraz stan dróg po ulewach, które w tej strefie zbierają wodę.",
    ],
    en: [
      "Punta Brava is the quiet edge of Los Alcázares on the San Javier border, where houses and flats line narrow streets and the Mar Menor is a few minutes away. Prices are the lowest in the municipality because there is no promenade or port here, only ordinary neighbourhood life. Buyers want a beach without tourist noise, and residents look for a cheap house near the airport. Check the height of the plot, since this is low ground, and the state of roads after rain.",
    ],
    es: [
      "Punta Brava es el borde tranquilo de Los Alcázares, en el límite con San Javier, donde casas y pisos ocupan calles estrechas y el Mar Menor queda a unos minutos. El precio es el más bajo del municipio porque aquí no hay paseo ni puerto, solo vida de barrio. Compran quien busca playa sin ruido turístico y residentes que quieren casa barata cerca del aeropuerto. Revisa la altura de la parcela, porque es terreno bajo, y el estado de las calles tras la lluvia.",
    ],
  },
  "mazarron/el-alamillo": {
    pl: [
      "El Alamillo to spokojna osada przy Playa del Alamillo, między Puerto de Mazarrón a Bolnuevo, gdzie domki i wille stoją wśród niskiej zabudowy, a plaża jest szeroka i rzadko zatłoczona. Cena jest wyższa niż w centrum Mazarrón, ale niższa niż w Puerto, bo brak tu restauracji i sklepów w zasięgu spaceru. Kupują tu rodziny, które chcą ciszy i morza, oraz rezydenci, którzy zostają na zimę. Sprawdź stan drogi dojazdowej i to, czy działka nie leży w strefie erozji.",
    ],
    en: [
      "El Alamillo is a quiet settlement by Playa del Alamillo, between Puerto de Mazarrón and Bolnuevo, where cottages and villas sit among low housing and the beach is wide and rarely crowded. Prices are above Mazarrón centre but below Puerto, because restaurants and shops are not within walking distance. Buyers are families wanting quiet and sea, plus residents who stay for winter. Check the access road and whether the plot sits in an erosion zone.",
    ],
    es: [
      "El Alamillo es un núcleo tranquilo junto a Playa del Alamillo, entre Puerto de Mazarrón y Bolnuevo, donde casas y chalets ocupan edificación baja y la playa es ancha y poco concurrida. El precio supera al centro de Mazarrón pero queda bajo Puerto, porque no hay restaurantes ni tiendas a pie. Compran familias que buscan silencio y mar, y residentes que se quedan el invierno. Revisa el camino de acceso y si la parcela está en zona de erosión.",
    ],
  },
  "aguilas/el-hornillo": {
    pl: [
      "El Hornillo to dzielnica mieszkaniowa przy Playa del Hornillo, na zachód od centrum Águilas, gdzie apartamenty mają tarasy z widokiem na zatokę, a do portu idzie się spacerem dwadzieścia minut. Cena jest o 50 euro wyższa niż w centrum, a ROI 6,7 procent, bo najem trwa cały rok, choć stawki są niższe niż nad plażą Las Delicias. Kupują tu osoby, które chcą ciszy i widoku, ale bez płacenia za pierwsze linie. Sprawdź, czy budynek ma windę i czy okna nie wychodzą na trasę przybrzeżną.",
    ],
    en: [
      "El Hornillo is a residential district by Playa del Hornillo, west of Águilas centre, where flats have terraces looking over the bay and the port is a twenty-minute walk. Prices run 50 euros above the centre with a 6.7 percent yield, because letting runs all year though rates stay below Las Delicias. Buyers want quiet and a view without paying front-line money. Check whether the building has a lift and whether windows face the coast road.",
    ],
    es: [
      "El Hornillo es un barrio residencial junto a Playa del Hornillo, al oeste del centro de Águilas, donde los pisos tienen terraza con vistas a la bahía y el puerto queda a veinte minutos a pie. El precio va 50 euros sobre el centro con un 6,7 por ciento, porque el alquiler funciona todo el año aunque las rentas quedan bajo Las Delicias. Compran quien busca calma y vistas sin pagar primera línea. Revisa si hay ascensor y si las ventanas dan a la carretera de la costa.",
    ],
  },
  "el-campello/coveta-fumada": {
    pl: [
      "Coveta Fumada to willowa część El Campello na klifie na północ od centrum, gdzie domy stoją na działkach wśród sosen, a do zatoczek schodzi się po schodach. Cena jest najniższa w gminie, bo brak tu plaży z prawdziwego zdarzenia i sklepów w zasięgu spaceru, a samochód jest konieczny. Kupują tu osoby, które chcą ciszy i ogrodu, a do tramwaju mają pięć minut jazdy. Sprawdź stan murów oporowych, dostęp do drogi publicznej i to, czy działka ma widok, którego nie zasłoni nowa inwestycja.",
    ],
    en: [
      "Coveta Fumada is the villa part of El Campello on the cliff north of the centre, where houses sit on pine plots and the coves are reached down steps. Prices are the lowest in the municipality because there is no proper beach or shops within walking distance and a car is essential. Buyers want quiet and a garden, with the tram five minutes away by car. Check the retaining walls, access to a public road and whether the view can be blocked by a new development.",
    ],
    es: [
      "Coveta Fumada es la parte de chalets de El Campello en el acantilado al norte del centro, donde las casas ocupan parcelas entre pinos y a las calas se baja por escaleras. El precio es el más bajo del municipio porque no hay playa como tal ni tiendas a pie y el coche es imprescindible. Compran quien busca silencio y jardín, con el tranvía a cinco minutos en coche. Revisa los muros de contención, el acceso a camino público y si las vistas pueden quedar tapadas por una promoción nueva.",
    ],
  },
  "l-albir/sierra-albir": {
    pl: [
      "Sierra Albir to willowa część L'Albir na zboczu pod parkiem Serra Gelada, gdzie domy mają baseny, duże tarasy i widok na zatokę z góry. Cena jest o 220 euro niższa niż przy plaży, bo do wody trzeba zejść albo zjechać, a okolica jest cicha i bez ruchu turystycznego. Kupują tu osoby, które chcą prywatności i ogrodu, a plażę traktują jako cel spaceru. Sprawdź nachylenie działki, stan drogi wewnętrznej i czy posesja nie leży w strefie ochronnej parku.",
    ],
    en: [
      "Sierra Albir is the villa part of L'Albir on the slope under the Serra Gelada park, where houses have pools, large terraces and a bay view from above. Prices run 220 euros below the beachfront because the water means a walk down or a drive, and the area is quiet with no tourist traffic. Buyers want privacy and a garden and treat the beach as a walk. Check the gradient, the state of the internal road and whether the property sits in the park protection zone.",
    ],
    es: [
      "Sierra Albir es la parte de chalets de L'Albir en la ladera bajo el parque de Serra Gelada, donde las casas tienen piscina, terrazas amplias y vistas a la bahía desde arriba. El precio va 220 euros bajo la primera línea porque al agua hay que bajar andando o en coche, y la zona es tranquila sin tráfico turístico. Compran quien busca privacidad y jardín y ve la playa como paseo. Revisa la pendiente, el estado del camino interior y si la finca está en zona de protección del parque.",
    ],
  },
  "quesada/dona-pepa": {
    pl: [
      "Doña Pepa to spokojne osiedle willowe w Ciudad Quesada, na łagodnym zboczu przy Sierra de Callosa, gdzie domy mają ogrody i baseny, a do sklepów idzie się dziesięć minut. Cena jest najniższa w Quesadzie, bo to najdalsza część urbanizacji od centrum handlowego, a popyt 6,8 w naszej skali. Kupują tu osoby, które chcą ciszy i ogrodu, a nie basenu wspólnoty, oraz rezydenci, którzy zostają na zimę. Sprawdź, czy działka ma odbiór urbanizacji i czy basen jest wpisany do licencji.",
    ],
    en: [
      "Doña Pepa is a quiet villa estate in Ciudad Quesada, on the gentle slope by Sierra de Callosa, where houses have gardens and pools and shops are ten minutes away. Prices are the lowest in Quesada because this is the part furthest from the shopping centre, with demand at 6.8 on our scale. Buyers want quiet and a garden rather than a communal pool, plus residents who stay for winter. Check the urbanisation sign-off and whether the pool is on the licence.",
    ],
    es: [
      "Doña Pepa es una urbanización tranquila de chalets en Ciudad Quesada, en la ladera suave junto a Sierra de Callosa, donde las casas tienen jardín y piscina y las tiendas quedan a diez minutos. El precio es el más bajo de Quesada porque es la parte más lejana del centro comercial, con demanda de 6,8 en nuestra escala. Compran quien busca silencio y jardín en lugar de piscina comunitaria, y residentes que pasan el invierno. Revisa la recepción de la urbanización y si la piscina consta en licencia.",
    ],
  },
  "villajoyosa/plans": {
    pl: [
      "Plans to najtańsza część Villajoyosa, na zboczu przy Sierra de Ponotx, gdzie domy i apartamenty stoją na większych działkach, a do plaży zjeżdża się kilka minut. Cena jest o 270 euro niższa niż w Playa Torre, bo nie ma tu widoku na morze z każdego okna, a okolica jest mieszkaniowa i cicha. Kupują tu osoby, które chcą metrażu i ogrodu w cenie mieszkania nad wodą, oraz rezydenci pracujący w Benidormie. Sprawdź stan drogi dojazdowej i czy działka ma dostęp do mediów.",
    ],
    en: [
      "Plans is the cheapest part of Villajoyosa, on the slope by Sierra de Ponotx, where houses and flats sit on larger plots and the beach is a few minutes down the road. Prices run 270 euros below Playa Torre because not every window sees the sea, and the area is residential and quiet. Buyers want floor area and a garden at the price of a flat by the water, plus residents working in Benidorm. Check the access road and whether the plot is connected to utilities.",
    ],
    es: [
      "Plans es la parte más barata de Villajoyosa, en la ladera junto a Sierra de Ponotx, donde casas y pisos ocupan parcelas mayores y a la playa se baja en unos minutos. El precio va 270 euros bajo Playa Torre porque no todas las ventanas ven el mar y la zona es residencial y tranquila. Compran quien busca metros y jardín al precio de un piso junto al agua, y residentes que trabajan en Benidorm. Revisa el camino de acceso y si la parcela tiene acometidas.",
    ],
  },
  "finestrat/centro": {
    pl: [
      "Centro w Finestrat to stara wieś na zboczu pod Puig Campana, z wąskimi uliczkami, kościołem i widokiem na góry zamiast na morze. Cena jest najniższa w gminie, bo do plaży w Benidorm jest kwadrans jazdy, a w samej wsi są tylko podstawowe usługi. Kupują tu osoby, które chcą domu z duszą i nie potrzebują widoku na zatokę, oraz rezydenci, którzy pracują w Benidormie. Sprawdź stan konstrukcji w starych domach i czy remont elewacji wymaga zgody konserwatora.",
    ],
    en: [
      "Centro in Finestrat is the old village on the slope under Puig Campana, with narrow lanes, a church and mountain views rather than sea ones. Prices are the lowest in the municipality because Benidorm beach is fifteen minutes away and the village has only basic services. Buyers want a house with character and no need for a bay view, plus residents working in Benidorm. Check the structure of older houses and whether facade work needs heritage approval.",
    ],
    es: [
      "Centro en Finestrat es el pueblo viejo en la ladera bajo el Puig Campana, con calles estrechas, iglesia y vistas a la montaña y no al mar. El precio es el más bajo del municipio porque la playa de Benidorm queda a quince minutos y el pueblo solo tiene servicios básicos. Compran quien busca casa con carácter y no necesita vistas a la bahía, y residentes que trabajan en Benidorm. Revisa la estructura de las casas antiguas y si la fachada requiere permiso de patrimonio.",
    ],
  },
  "finestrat/balcon-de-finestrat": {
    pl: [
      "Balcón de Finestrat to nowe osiedla na zboczu nad Benidormem, z apartamentami i willem z basenami, skąd widać całą zatokę i wieżowce miasta. Cena jest najwyższa w gminie, bo widok i bliskość plaży są tu najlepsze, a osiedla mają ochronę i baseny. Kupują tu obcokrajowcy z północy Europy, którzy chcą ciszy i widoku, ale nie chcą mieszkać w wieżowcu. Sprawdź składki na ochronę i utrzymanie terenów zielonych oraz dostęp do drogi gminnej.",
    ],
    en: [
      "Balcón de Finestrat is the newer estates on the slope above Benidorm, with flats and villas with pools, looking over the whole bay and the town's towers. Prices are the highest in the municipality because the view and beach proximity are the best here, and estates have security and pools. Buyers are northern Europeans who want quiet and a view but not a tower block. Check security and green area charges and access to a council road.",
    ],
    es: [
      "Balcón de Finestrat son las urbanizaciones nuevas en la ladera sobre Benidorm, con pisos y chalets con piscina, desde donde se ve toda la bahía y las torres del pueblo. El precio es el más alto del municipio porque las vistas y la cercanía a la playa son las mejores, y las urbanizaciones tienen seguridad y piscina. Compran extranjeros del norte de Europa que quieren calma y vistas sin vivir en una torre. Revisa las cuotas de seguridad y zonas verdes y el acceso a camino municipal.",
    ],
  },
  "quesada/la-marquesa": {
    pl: [
      "La Marquesa to najbardziej zurbanizowana część Ciudad Quesada, zbudowana wokół pola golfowego La Marquesa, z apartamentami i willem z basenami, restauracjami i klubem. Cena jest najwyższa w Quesadzie, bo widok na pole i gotowa infrastruktura są tu najlepsze, a popyt 8 w naszej skali. Kupują tu osoby grające oraz rezydenci, którzy chcą mieć wszystko pod ręką. Sprawdź wysokość składek na utrzymanie pola i terenów zielonych oraz czy osiedle ma licencję turystyczną.",
    ],
    en: [
      "La Marquesa is the most built-up part of Ciudad Quesada, laid out around the La Marquesa golf course with flats and villas with pools, restaurants and a clubhouse. Prices are the highest in Quesada because the course view and finished infrastructure are the best here, with demand at 8 on our scale. Buyers are golfers and residents who want everything at hand. Check the charges for the course and green areas and whether the estate holds a tourist licence.",
    ],
    es: [
      "La Marquesa es la parte más urbanizada de Ciudad Quesada, trazada en torno al campo de golf La Marquesa con pisos y chalets con piscina, restaurantes y club. El precio es el más alto de Quesada porque las vistas al campo y la infraestructura terminada son las mejores, con demanda de 8 en nuestra escala. Compran jugadores y residentes que quieren todo a mano. Revisa las cuotas del campo y zonas verdes y si la urbanización tiene licencia turística.",
    ],
  },
  "san-miguel-de-salinas/el-chaparral": {
    pl: [
      "El Chaparral to osiedle willowe w gminie San Miguel de Salinas, zbudowane wokół pola golfowego i restauracji, gdzie domy mają baseny, a ulice są szerokie i ciche. Cena jest o 50 euro niższa niż w centrum, bo nie ma tu kościoła ani targu, tylko spokój i zieleń. Kupują tu obcokrajowcy z północy Europy, którzy chcą domu z ogrodem blisko pola i lotniska. Sprawdź wysokość opłat na utrzymanie pola i czy działka ma dostęp do drogi gminnej.",
    ],
    en: [
      "El Chaparral is a villa estate in San Miguel de Salinas, built around a golf course and restaurants, where houses have pools and the streets are wide and quiet. Prices run 50 euros below the centre because there is no church or market here, only calm and greenery. Buyers are northern Europeans who want a house with a garden near the course and the airport. Check the course maintenance charges and whether the plot reaches a council road.",
    ],
    es: [
      "El Chaparral es una urbanización de chalets en San Miguel de Salinas, construida en torno a un campo de golf y restaurantes, donde las casas tienen piscina y las calles son anchas y tranquilas. El precio va 50 euros bajo el centro porque aquí no hay iglesia ni mercado, solo calma y vegetación. Compran extranjeros del norte de Europa que buscan casa con jardín cerca del campo y del aeropuerto. Revisa las cuotas de mantenimiento del campo y si la parcela da a camino municipal.",
    ],
  },
  "san-miguel-de-salinas/la-pedrera": {
    pl: [
      "La Pedrera to najtańsza część gminy San Miguel de Salinas, przy zbiorniku i drodze w głąb lądu, gdzie domy stoją na dużych działkach, a do sklepów jedzie się kilka minut. Kupują tu osoby, które chcą domu z ogrodem za cenę mieszkania, oraz rezydenci, którzy nie potrzebują widoku na morze. Popyt jest najniższy w gminie, więc sprzedaż może potrwać. Sprawdź dostęp do wody i prądu oraz czy działka nie jest terenem rolnym bez prawa zabudowy.",
    ],
    en: [
      "La Pedrera is the cheapest part of San Miguel de Salinas, by the reservoir and the road inland, where houses sit on large plots and shops are a few minutes away. Buyers want a house with a garden at the price of a flat, plus residents who do not need a sea view. Demand is the lowest in the municipality, so a sale can take time. Check water and power connections and whether the plot is agricultural land without building rights.",
    ],
    es: [
      "La Pedrera es la parte más barata de San Miguel de Salinas, junto al embalse y la carretera hacia el interior, donde las casas ocupan parcelas grandes y las tiendas quedan a unos minutos. Compran quien busca casa con jardín al precio de un piso y residentes que no necesitan vistas al mar. La demanda es la más baja del municipio, así que una venta puede tardar. Revisa acometidas de agua y luz y si la parcela es suelo agrícola sin derecho a edificar.",
    ],
  },
  "mazarron/mazarron-centro": {
    pl: [
      "Mazarrón Centro to miasto górnicze w głębi lądu, cztery kilometry od Puerto, z kamienicami, urzędami i targiem, gdzie metr jest najtańszy w gminie. Kupują tu osoby pracujące w okolicy oraz inwestorzy, którzy liczą na najem całoroczny, a nie sezonowy. Do plaży trzeba podjechać, więc to nie adres wakacyjny, ale ceny mieszkań są tu najniższe na całym wybrzeżu. Sprawdź stan budynku i czy mieszkanie ma okna na ulicę, bo centrum bywa głośne w dzień targowy.",
    ],
    en: [
      "Mazarrón Centro is the mining town inland, four kilometres from Puerto, with townhouses, offices and a market, where the square metre is the cheapest in the municipality. Buyers are people working nearby and investors counting on year-round rather than seasonal letting. The beach needs a drive, so this is not a holiday address, but flat prices are the lowest on this coast. Check the building's condition and whether windows face the street, since the centre is loud on market day.",
    ],
    es: [
      "Mazarrón Centro es el pueblo minero tierra adentro, a cuatro kilómetros de Puerto, con casas, oficinas y mercado, donde el metro es el más barato del municipio. Compran quienes trabajan cerca e inversores que cuentan con alquiler anual y no de temporada. A la playa hay que ir en coche, así que no es una dirección de vacaciones, pero los precios son los más bajos de esta costa. Revisa el estado del edificio y si las ventanas dan a la calle, porque el centro es ruidoso en día de mercado.",
    ],
  },
  // END
};

/**
 * Drugi (i kolejny) akapit autorski dla wybranych dzielnic. Trzymamy go osobno,
 * żeby dopisywanie treści nie wymagało edycji istniejących wpisów.
 * Cel: każda strona ma więcej własnej analizy, nie mniej.
 */
const NOTES_EXTRA: Record<string, Partial<Record<Locale, string[]>>> = {
  "aguilas/las-delicias": {
    pl: [
      "Liczby, które warto zapamiętać przed rozmową o cenie: metr kosztuje tu 2 010 €, o 160 € więcej niż mediana Águilas, a najem daje 6,6 procent brutto przy 120 dniach ekspozycji. To najlepszy stosunek ceny do dochodu w gminie, bo deptak i port pracują dłużej niż plaża. Kupujący z Polski to około 4 procent nabywców, więc polskich usług szukaj w Murcji, nie na miejscu. Uwaga na dwie rzeczy: hałas pociągu towarowego w blokach przy torowisku i wspólnoty w budynkach z lat osiemdziesiątych, które nie mają funduszu na windy.",
    ],
    en: [
      "Numbers worth keeping before you negotiate: the square metre costs 2,010, 160 above the Águilas median, and letting yields 6.6 percent gross with 120 days on market. That is the best price-to-income ratio in the municipality, because the promenade and port work longer than the beach. Polish buyers make up about 4 percent, so Polish services are in Murcia rather than locally. Watch two things: freight train noise in blocks by the tracks and eighties communities with no lift fund.",
    ],
    es: [
      "Cifras que conviene retener antes de negociar: el metro cuesta 2.010, 160 más que la mediana de Águilas, y el alquiler rinde 6,6 por ciento bruto con 120 días de exposición. Es la mejor relación precio-ingreso del municipio, porque el paseo y el puerto trabajan más horas que la playa. Los compradores polacos son cerca del 4 por ciento, así que los servicios polacos están en Murcia y no aquí. Ojo a dos cosas: el ruido del tren de mercancías en bloques junto a las vías y comunidades de los ochenta sin fondo para ascensores.",
    ],
  },
  "aguilas/el-hornillo": {
    pl: [
      "Porównanie, które porządkuje decyzję: 1 800 €/m² w El Hornillo wobec 2 010 €/m² na Las Delicias i 2 120 €/m² w Calarreona. Różnica 210 € za metr to cena spokoju i widoku z tarasu, ale też brak plaży pod domem i dwadzieścia minut do portu. Najem trwa tu dłużej niż na pierwszej linii, bo trafia do osób pracujących w mieście, a nie do turystów na dwa tygodnie. Sprawdź, czy blok ma windę i czy okna nie wychodzą na trasę przybrzeżną, po której latem jeżdżą autokary.",
    ],
    en: [
      "The comparison that settles the decision: 1,800 per m² in El Hornillo against 2,010 on Las Delicias and 2,120 in Calarreona. The 210 gap buys quiet and a terrace view, but also means no beach at the door and twenty minutes to the port. Letting lasts longer than on the front line because it goes to people working in town rather than fortnight tourists. Check whether the block has a lift and whether windows face the coast road, where coaches run in summer.",
    ],
    es: [
      "La comparación que ordena la decisión: 1.800 por m² en El Hornillo frente a 2.010 en Las Delicias y 2.120 en Calarreona. Los 210 de diferencia compran silencio y vistas desde la terraza, pero también significan no tener playa en la puerta y veinte minutos al puerto. El alquiler dura más que en primera línea porque va a gente que trabaja en el pueblo y no a turistas de dos semanas. Revisa si el bloque tiene ascensor y si las ventanas dan a la carretera de la costa, por donde en verano circulan autocares.",
    ],
  },
  "san-pedro-del-pinatar/lo-pagan": {
    pl: [
      "Dane do kalkulacji: 2 450 €/m², o 160 € więcej niż mediana gminy, ROI 6,5 procent brutto przy 110 dniach ekspozycji i popycie 8/10. Sąsiad, El Mojón, kosztuje 2 400 €/m², ale ma o 0,1 punktu niższy zwrot i mniej usług w zasięgu spaceru. Przewaga Lo Pagán to kurort z bazą całoroczną: błoto lecznicze, port i restauracje dają ruch także poza lipcem. Sprawdź, czy wspólnota ma fundusz na malowanie elewacji od strony morza, bo sól i wilgoć skracają jej żywotność o połowę.",
    ],
    en: [
      "Numbers for the calculation: 2,450 per m², 160 above the municipal median, a 6.5 percent gross yield with 110 days on market and demand at 8 of 10. The neighbour El Mojón costs 2,400 per m² but yields 0.1 points less and has fewer services within walking distance. The Lo Pagán advantage is a resort with a year-round base: the healing mud, the port and restaurants keep traffic beyond July. Check whether the community has funds to repaint the sea-facing facade, since salt and damp halve its life.",
    ],
    es: [
      "Datos para el cálculo: 2.450 por m², 160 sobre la mediana municipal, un 6,5 por ciento bruto con 110 días de exposición y demanda de 8 sobre 10. El vecino El Mojón cuesta 2.400 por m² pero rinde 0,1 puntos menos y tiene menos servicios a pie. La ventaja de Lo Pagán es un resort con base anual: el barro, el puerto y los restaurantes mantienen movimiento más allá de julio. Revisa si la comunidad tiene fondos para pintar la fachada al mar, porque sal y humedad reducen a la mitad su vida útil.",
    ],
  },
  "san-pedro-del-pinatar/el-mojon": {
    pl: [
      "Trzy liczby, które opisują ten adres: 2 400 €/m², czyli 110 € więcej niż mediana gminy, 6,4 procent brutto i popyt 7/10, najniższy w San Pedro. To cena spokoju: nie ma tu portu ani deptaku, więc najemca to raczej rezydent niż turysta. W porównaniu z Lo Pagán (2 450 €/m², 6,5 procent) dostajesz ciszę taniej, ale tracisz restauracje w zasięgu spaceru. Sprawdź, czy działka leży w strefie Parque Regional Salinas, bo tam basen i rozbudowa wymagają zgody, oraz czy droga dojazdowa jest gminna.",
    ],
    en: [
      "Three numbers describe this address: 2,400 per m², 110 above the municipal median, a 6.4 percent gross yield and demand at 7 of 10, the lowest in San Pedro. That is the price of quiet: there is no port or promenade here, so the tenant is a resident rather than a tourist. Against Lo Pagán (2,450 per m², 6.5 percent) you buy silence cheaper but lose restaurants within walking distance. Check whether the plot falls inside the Parque Regional Salinas, where pools and extensions need permission, and whether the access road is a council one.",
    ],
    es: [
      "Tres cifras describen esta dirección: 2.400 por m², 110 sobre la mediana municipal, un 6,4 por ciento bruto y demanda de 7 sobre 10, la más baja de San Pedro. Es el precio del silencio: aquí no hay puerto ni paseo, así que el inquilino es residente y no turista. Frente a Lo Pagán (2.450 por m², 6,5 por ciento) compras calma más barata pero pierdes restaurantes a pie. Comprueba si la parcela está en el Parque Regional Salinas, donde piscina y ampliaciones necesitan permiso, y si el camino de acceso es municipal.",
    ],
  },
  "calpe/puerto": {
    pl: [
      "Liczby do decyzji: 3 330 €/m², o 60 € więcej niż mediana Calpe, ROI 5,6 procent brutto przy popycie 8/10. Dla porównania Playa de la Fossa kosztuje 3 540 €/m², a Canuta 3 170 €/m², więc port jest środkiem stawki: płacisz za dojście do mariny i starówki, nie za pierwsze linie. Najem krótki pracuje tu od maja do października, a zimą część lokali stoi pusta, więc kalkulację oprzyj na ośmiu miesiącach, nie na dwunastu. Sprawdź, czy wspólnota ma fundusz na windy i czy okna nie wychodzą na plac przy targu rybnym.",
    ],
    en: [
      "Numbers for the decision: 3,330 per m², 60 above the Calpe median, a 5.6 percent gross yield with demand at 8 of 10. For comparison Playa de la Fossa costs 3,540 per m² and Canuta 3,170, so the port sits mid-range: you pay for the walk to the marina and old town, not for a front line. Short lets run from May to October and part of the stock stands empty in winter, so build the maths on eight months, not twelve. Check the community lift fund and whether windows face the fish market square.",
    ],
    es: [
      "Cifras para decidir: 3.330 por m², 60 sobre la mediana de Calpe, un 5,6 por ciento bruto con demanda de 8 sobre 10. Para comparar, Playa de la Fossa cuesta 3.540 por m² y Canuta 3.170, así que el puerto queda en el medio: se paga el paseo a la marina y al casco, no la primera línea. El alquiler corto va de mayo a octubre y en invierno parte del parque queda vacío, así que calcula sobre ocho meses y no doce. Revisa el fondo de ascensores de la comunidad y si las ventanas dan a la plaza de la lonja.",
    ],
  },
  "javea/puerto": {
    pl: [
      "Kontekst cenowy Jávea jest tu kluczowy: mediana miasta to 4 400 €/m², port 4 450 €/m², Arenal 4 290 €/m², a Cap Martí 4 890 €/m². Port jest więc najtańszym sposobem na życie w Jávea bez samochodu, ale ROI 4,8 procent brutto należy do najniższych w regionie, bo cena rośnie szybciej niż czynsze. Kupują tu osoby, które chcą mieć marinę, targ rybny i restauracje pod ręką, a widok traktują jako dodatek. Sprawdź hałas porannego wyładunku ryb i dostęp do miejsca parkingowego, bo w sezonie to warunek konieczny.",
    ],
    en: [
      "The Jávea price context matters here: the town median is 4,400 per m², the port 4,450, Arenal 4,290 and Cap Martí 4,890. The port is therefore the cheapest way to live in Jávea without a car, but a 4.8 percent gross yield is among the lowest in the region, because prices rise faster than rents. Buyers want the marina, fish market and restaurants at hand and treat the view as a bonus. Check noise from the morning catch and whether a parking space comes with the flat, since in season that is a condition.",
    ],
    es: [
      "El contexto de precios de Jávea es clave: la mediana del pueblo es 4.400 por m², el puerto 4.450, Arenal 4.290 y Cap Martí 4.890. El puerto es la forma más barata de vivir en Jávea sin coche, pero un 4,8 por ciento bruto está entre los más bajos de la región, porque los precios suben más rápido que las rentas. Compran quien quiere marina, lonja y restaurantes a mano y ve las vistas como un extra. Revisa el ruido de la descarga matinal y si la vivienda incluye plaza de garaje, porque en temporada es imprescindible.",
    ],
  },

  "villajoyosa/centro": {
    pl: [
      "Twarde dane: 2 520 €/m² wobec 2 620 €/m² mediany gminy i 2 840 €/m² w Playa Torre, ROI 6,0 procent brutto, popyt 7,5/10. Centro jest więc o 320 € tańsze od plaży, ale też o 0,3 punktu mniej dochodowe, bo czynsze w starym mieście są niskie. Zaletą jest całoroczność: port, fabryki czekolady i urzędy dają najemców także w styczniu, czego nie ma w Plans. Sprawdź, czy budynek ma sprawdzoną instalację elektryczną i czy wspólnota uchwaliła fundusz na dach, bo w kamienicach z lat sześćdziesiątych to najczęstszy wydatek.",
    ],
    en: [
      "Hard numbers: 2,520 per m² against a town median of 2,620 and 2,840 in Playa Torre, a 6.0 percent gross yield and demand at 7.5 of 10. Centro is therefore 320 cheaper than the beach but 0.3 points less profitable, because old town rents are low. The advantage is year-round life: the port, the chocolate factories and the offices supply tenants in January too, which Plans cannot. Check the building's electrical installation and whether the community has approved a roof fund, since in sixties townhouses that is the most common bill.",
    ],
    es: [
      "Datos duros: 2.520 por m² frente a una mediana de 2.620 y 2.840 en Playa Torre, un 6,0 por ciento bruto y demanda de 7,5 sobre 10. Centro es 320 más barato que la playa pero 0,3 puntos menos rentable, porque las rentas del casco son bajas. La ventaja es la vida anual: puerto, fábricas de chocolate y oficinas dan inquilinos también en enero, algo que Plans no ofrece. Revisa la instalación eléctrica y si la comunidad aprobó un fondo para el tejado, porque en casas de los sesenta es el gasto más habitual.",
    ],
  },
  "l-albir/centro": {
    pl: [
      "Liczby, które porządkują wybór: 3 200 €/m² w Centro, 3 520 €/m² przy Playa del Albir i 3 090 €/m² w Sierra Albir, przy medianie gminy 3 310 €/m². Centro jest więc o 110 € tańsze od średniej i o 320 € od pierwszej linii, a ROI 5,3 procent brutto należy do najniższych na tym odcinku wybrzeża. To adres pod własne mieszkanie i najem sezonowy, nie pod cash flow: licz się z tym, że zwrot przyjdzie ze wzrostu wartości, a nie z czynszu. Sprawdź, czy wspólnota ma windę i ile kosztuje utrzymanie ogrodu od strony promenady.",
    ],
    en: [
      "Numbers that organise the choice: 3,200 per m² in Centro, 3,520 at Playa del Albir and 3,090 in Sierra Albir, against a town median of 3,310. Centro is 110 below the average and 320 below the front line, with a 5.3 percent gross yield that ranks among the lowest on this stretch of coast. This is an address for your own flat and seasonal letting, not for cash flow: expect the return to come from value growth rather than rent. Check the community lift and what it costs to maintain the garden facing the promenade.",
    ],
    es: [
      "Cifras que ordenan la elección: 3.200 por m² en Centro, 3.520 en Playa del Albir y 3.090 en Sierra Albir, frente a una mediana municipal de 3.310. Centro está 110 bajo la media y 320 bajo la primera línea, con un 5,3 por ciento bruto entre los más bajos de este tramo. Es una dirección para piso propio y alquiler de temporada, no para flujo de caja: cuenta con que el retorno venga de la revalorización y no de la renta. Revisa el ascensor de la comunidad y cuánto cuesta mantener el jardín frente al paseo.",
    ],
  },
  "el-campello/centro": {
    pl: [
      "Dane, które decydują o zwrocie: 2 780 €/m² wobec 2 880 €/m² mediany gminy i 3 100 €/m² w Muchavista. Centro jest więc o 320 € tańsze od plaży, a ROI 5,8 procent brutto jest najwyższe w mieście, bo cena wejścia jest niższa, a czynsz trzyma się dzięki tramwajowi i portowi. Tramwaj dowozi do Alicante w kilkanaście minut, więc najemca to często pracownik albo student, a umowa idzie na rok. Sprawdź hałas torowiska w blokach pierwszej linii i to, czy okna nie wychodzą na plac manewrowy portu.",
    ],
    en: [
      "Data that decides the return: 2,780 per m² against a town median of 2,880 and 3,100 in Muchavista. Centro is therefore 320 cheaper than the beach, and a 5.8 percent gross yield is the best in town, because the entry price is lower and the tram plus the port keep rents steady. The tram reaches Alicante in about fifteen minutes, so the tenant is often a commuter or a student signing for a year. Check track noise in front-line blocks and whether windows face the port's manoeuvring yard.",
    ],
    es: [
      "Datos que deciden el retorno: 2.780 por m² frente a una mediana de 2.880 y 3.100 en Muchavista. Centro es 320 más barato que la playa, y un 5,8 por ciento bruto es el mejor del pueblo, porque la entrada es menor y el tranvía y el puerto sostienen las rentas. El tranvía llega a Alicante en unos quince minutos, así que el inquilino suele ser trabajador o estudiante que firma por un año. Revisa el ruido de las vías en bloques de primera línea y si las ventanas dan al patio de maniobras del puerto.",
    ],
  },

  "santa-pola/gran-alacant": {
    pl: [
      "Liczby, które warto znać: 2 300 €/m², czyli 50 € mniej niż mediana Santa Pola, ROI 6,6 procent brutto i popyt 8/10 przy 1 200 transakcjach rocznie w całej gminie. Sąsiedzi w tej samej gminie: Centro 2 190 €/m², Playa Lisa 2 410 €/m², Playa de Levante 2 570 €/m². Gran Alacant wygrywa zwrotem, bo metraż lokali jest mniejszy, a najem trwa dłużej niż na promenadzie. Sprawdź odległość od jedynej drogi wyjazdowej i czy osiedle jest odebrane przez gminę, bo część dróg i zieleńców wciąż należy do dewelopera.",
    ],
    en: [
      "Numbers worth knowing: 2,300 per m², which is 50 below the Santa Pola median, a 6.6 percent gross yield and demand at 8 of 10, with 1,200 sales a year across the municipality. Neighbours in the same town: Centro 2,190, Playa Lisa 2,410 and Playa de Levante 2,570. Gran Alacant wins on return because units are smaller and letting lasts longer than on the promenade. Check the distance to the single exit road and whether the estate has been handed to the council, since some roads and green areas still belong to the developer.",
    ],
    es: [
      "Cifras que conviene conocer: 2.300 por m², 50 por debajo de la mediana de Santa Pola, un 6,6 por ciento bruto y demanda de 8 sobre 10, con 1.200 operaciones al año en el municipio. Vecinos del mismo pueblo: Centro 2.190, Playa Lisa 2.410 y Playa de Levante 2.570. Gran Alacant gana en retorno porque las viviendas son más pequeñas y el alquiler dura más que en el paseo. Revisa la distancia a la única salida y si la urbanización está recepcionada, porque algunos caminos y zonas verdes siguen siendo del promotor.",
    ],
  },
  "santa-pola/centro": {
    pl: [
      "Dane do kalkulacji: 2 190 €/m², o 160 € mniej niż mediana gminy i o 380 € mniej niż Playa de Levante, ROI 6,3 procent brutto, popyt 7/10. To najtańszy metr w Santa Pola, a mimo to najem trwa tu cały rok, bo port rybacki i zakłady w Elche dają stałe zatrudnienie. W porównaniu z Gran Alacant (2 300 €/m², 6,6 procent) tracisz 0,3 punktu zwrotu, ale zyskujesz usługi i szkoły pieszo. Sprawdź, czy budynek ma ITE i czy okna nie wychodzą na plac manewrowy portu, gdzie hałas zaczyna się przed szóstą.",
    ],
    en: [
      "Numbers for the calculation: 2,190 per m², 160 below the town median and 380 below Playa de Levante, a 6.3 percent gross yield and demand at 7 of 10. It is the cheapest square metre in Santa Pola, yet letting runs all year because the fishing port and the Elche factories provide permanent jobs. Against Gran Alacant (2,300 per m², 6.6 percent) you give up 0.3 points of yield but gain services and schools on foot. Check the building's ITE inspection and whether windows face the port yard, where noise starts before six.",
    ],
    es: [
      "Datos para el cálculo: 2.190 por m², 160 bajo la mediana del pueblo y 380 bajo Playa de Levante, un 6,3 por ciento bruto y demanda de 7 sobre 10. Es el metro más barato de Santa Pola y aun así el alquiler funciona todo el año, porque el puerto pesquero y las fábricas de Elche dan empleo estable. Frente a Gran Alacant (2.300 por m², 6,6 por ciento) pierdes 0,3 puntos de rentabilidad pero ganas servicios y colegios a pie. Revisa el ITE del edificio y si las ventanas dan al patio del puerto, donde el ruido empieza antes de las seis.",
    ],
  },
  "santa-pola/playa-de-levante": {
    pl: [
      "Twarde dane: 2 570 €/m², o 220 € więcej niż mediana gminy, ROI 6,5 procent brutto, popyt 8/10. To najdroższy adres w Santa Pola, ale wciąż o 690 €/m² tańszy niż Playa de Levante w Benidorm, a zwrot jest o 0,5 punktu wyższy. Przewagą jest całoroczność: port i zakłady w Elche dają najemców także poza sezonem, czego nie ma w kurortach na północy. Sprawdź, czy wspólnota ma fundusz na elewację od strony morza oraz czy okna mają moskitiery, bo komary znad salin są tu realnym problemem od czerwca.",
    ],
    en: [
      "Hard data: 2,570 per m², 220 above the town median, a 6.5 percent gross yield and demand at 8 of 10. It is the dearest address in Santa Pola, yet still 690 per m² cheaper than Playa de Levante in Benidorm, with a yield 0.5 points higher. The advantage is all-year demand: the port and the Elche factories supply tenants outside the season, which northern resorts cannot. Check whether the community has funds for the sea-facing facade and whether windows have screens, since mosquitoes from the salt pans are a real issue from June.",
    ],
    es: [
      "Datos duros: 2.570 por m², 220 sobre la mediana del pueblo, un 6,5 por ciento bruto y demanda de 8 sobre 10. Es la dirección más cara de Santa Pola, pero sigue 690 por m² por debajo de Playa de Levante en Benidorm, con 0,5 puntos más de rentabilidad. La ventaja es la demanda anual: el puerto y las fábricas de Elche dan inquilinos fuera de temporada, algo que los resorts del norte no tienen. Revisa si la comunidad tiene fondos para la fachada al mar y si las ventanas llevan mosquiteras, porque los mosquitos de las salinas son un problema real desde junio.",
    ],
  },

  "el-campello/muchavista": {
    pl: [
      "Porównanie, które porządkuje decyzję: 3 100 €/m² w Muchavista wobec 2 780 €/m² w Centro i 2 720 €/m² w Coveta Fumada. Za 320 €/m² kupujesz szeroki pas piasku i tramwaj bez przesiadki, ale płacisz też wyższą wspólnotę i tracisz ciszę. ROI 6,0 procent brutto jest o 0,2 punktu niższe niż w centrum, bo cena rosła szybciej niż czynsze. Sprawdź odległość od torowiska w pierwszych szeregach zabudowy oraz czy blok ma garaż, bo w lipcu miejsca na ulicy nie ma po dziewiątej.",
    ],
    en: [
      "The comparison that settles it: 3,100 per m² in Muchavista against 2,780 in Centro and 2,720 in Coveta Fumada. The 320 per m² buys a wide strip of sand and a direct tram, but also higher community fees and less quiet. A 6.0 percent gross yield is 0.2 points below the centre, because prices rose faster than rents. Check the distance to the tracks in the first rows of buildings and whether the block has a garage, since street parking is gone by nine in July.",
    ],
    es: [
      "La comparación que lo ordena: 3.100 por m² en Muchavista frente a 2.780 en Centro y 2.720 en Coveta Fumada. Los 320 por m² compran una franja ancha de arena y tranvía directo, pero también comunidad más alta y menos silencio. Un 6,0 por ciento bruto está 0,2 puntos por debajo del centro, porque los precios subieron más que las rentas. Revisa la distancia a las vías en las primeras filas de edificios y si el bloque tiene garaje, porque en julio no hay aparcamiento en la calle después de las nueve.",
    ],
  },
  "altea/cap-blanc": {
    pl: [
      "Dane do decyzji: 3 730 €/m², czyli 50 € więcej niż mediana Altei, ale 700 € mniej niż w Altea Hills. ROI 5,2 procent brutto przy popycie 7/10 oznacza, że to adres pod własne mieszkanie, nie pod najem. Cap Blanc jest kompromisem: bliżej miasta niż Mascarat, ciszej niż Playa de la Roda, ale bez widoku z pierwszego rzędu. Sprawdź, czy posesja ma dostęp do drogi gminnej i czy nachylenie działki pozwala na basen, bo część parceli na skarpie tego nie udźwignie.",
    ],
    en: [
      "Data for the decision: 3,730 per m², 50 above the Altea median but 700 below Altea Hills. A 5.2 percent gross yield with demand at 7 of 10 means this is an address for your own flat rather than letting. Cap Blanc is the compromise: closer to town than Mascarat and quieter than Playa de la Roda, but without a front-row view. Check whether the property has council road access and whether the slope allows a pool, since some plots on the escarpment cannot carry one.",
    ],
    es: [
      "Datos para decidir: 3.730 por m², 50 sobre la mediana de Altea pero 700 bajo Altea Hills. Un 5,2 por ciento bruto con demanda de 7 sobre 10 indica que es una dirección para piso propio y no para alquilar. Cap Blanc es el término medio: más cerca del pueblo que Mascarat y más tranquilo que Playa de la Roda, pero sin vistas en primera fila. Comprueba si la finca tiene acceso a camino municipal y si la pendiente permite piscina, porque algunas parcelas en la ladera no la admiten.",
    ],
  },
  "calpe/maryvilla": {
    pl: [
      "Liczby, które warto zestawić: 3 440 €/m² w Maryvilla, 3 540 €/m² na Playa de la Fossa, 3 330 €/m² przy Puerto i 3 170 €/m² w Canuta. Maryvilla jest więc drugim najdroższym adresem w Calpe, a ROI 5,8 procent brutto wychodzi lepiej niż na Fossie, bo wille wynajmują się na dłużej i w wyższym standardzie. Popyt 8/10 utrzymuje się dzięki temu, że to okolica willowa, a nie hotelowa. Sprawdź stan drogi wewnętrznej, nachylenie działki i czy widok na Peñón de Ifach nie zostanie zasłonięty przez kolejną inwestycję.",
    ],
    en: [
      "Numbers worth setting side by side: 3,440 per m² in Maryvilla, 3,540 on Playa de la Fossa, 3,330 at Puerto and 3,170 in Canuta. Maryvilla is therefore the second dearest address in Calpe, and a 5.8 percent gross yield beats the Fossa, because villas let for longer and at a higher standard. Demand of 8 of 10 holds because this is villa country rather than hotel country. Check the internal road, the gradient and whether the Peñón de Ifach view can be blocked by the next development.",
    ],
    es: [
      "Cifras para comparar: 3.440 por m² en Maryvilla, 3.540 en Playa de la Fossa, 3.330 en Puerto y 3.170 en Canuta. Maryvilla es la segunda dirección más cara de Calpe, y un 5,8 por ciento bruto supera a la Fossa, porque los chalets se alquilan más tiempo y con más nivel. La demanda de 8 sobre 10 se sostiene porque es zona de chalets y no de hoteles. Revisa el camino interior, la pendiente y si las vistas al Peñón de Ifach pueden quedar tapadas por la siguiente promoción.",
    ],
  },

  "villajoyosa/playa-torre": {
    pl: [
      "Liczby, które porządkują wybór: 2 840 €/m², o 220 € więcej niż mediana Villajoyosa i o 320 € więcej niż Centro. ROI 6,3 procent brutto jest najlepsze w mieście, a popyt 8,5/10 najwyższy, bo to nowe osiedla z basenami przy szerokiej plaży. Sezon trwa tu od maja do października, więc kalkulację oprzyj na pięciu miesiącach najmu i własnych pobytach, nie na dwunastu. Sprawdź, czy osiedle ma licencję turystyczną i czy do przystanku tramwaju nie trzeba iść dalej niż z centrum, bo to wpływa na najemców bez auta.",
    ],
    en: [
      "Numbers that organise the choice: 2,840 per m², 220 above the Villajoyosa median and 320 above Centro. A 6.3 percent gross yield is the best in town and demand of 8.5 of 10 the highest, because these are new estates with pools by a wide beach. The season runs from May to October, so build the maths on five months of letting plus your own stays, not twelve. Check the estate's tourist licence and whether the tram stop is further than from the centre, since that matters to tenants without a car.",
    ],
    es: [
      "Cifras que ordenan la elección: 2.840 por m², 220 sobre la mediana de Villajoyosa y 320 sobre Centro. Un 6,3 por ciento bruto es el mejor del pueblo y la demanda de 8,5 sobre 10 la más alta, porque son urbanizaciones nuevas con piscina junto a una playa amplia. La temporada va de mayo a octubre, así que calcula sobre cinco meses de alquiler y tus propias estancias, no doce. Comprueba la licencia turística de la urbanización y si la parada del tranvía queda más lejos que desde el centro, porque eso pesa en el inquilino sin coche.",
    ],
  },
  "l-albir/playa-del-albir": {
    pl: [
      "Twarde dane: 3 520 €/m², o 210 € więcej niż mediana L'Albir i o 320 € więcej niż Centro, przy ROI 5,6 procent brutto i popycie 8,5/10. To najdroższy metr w gminie, bo pierwsza linia pod Serra Gelada jest towarem, którego nie da się wyprodukować więcej. Najem pracuje od maja do października, a poza sezonem część lokali stoi pusta, więc licz na osiem miesięcy. Sprawdź, czy wspólnota ma fundusz na elewację od strony morza i czy budynek jest wpisany do rejestru turystycznego, bo bez tego najem krótki jest nielegalny.",
    ],
    en: [
      "Hard data: 3,520 per m², 210 above the L'Albir median and 320 above Centro, with a 5.6 percent gross yield and demand at 8.5 of 10. It is the dearest square metre in the municipality because front-line land under Serra Gelada is stock nobody can create more of. Letting runs from May to October and part of the stock stands empty off season, so count on eight months. Check the community fund for the sea-facing facade and whether the building is registered for tourist use, since short letting without it is illegal.",
    ],
    es: [
      "Datos duros: 3.520 por m², 210 sobre la mediana de L'Albir y 320 sobre Centro, con un 5,6 por ciento bruto y demanda de 8,5 sobre 10. Es el metro más caro del municipio porque el suelo de primera línea bajo Serra Gelada es un bien que no se puede fabricar. El alquiler va de mayo a octubre y fuera de temporada parte del parque queda vacío, así que cuenta ocho meses. Revisa el fondo de la comunidad para la fachada al mar y si el edificio está registrado para uso turístico, porque sin eso el alquiler corto es ilegal.",
    ],
  },
  "javea/tosalet": {
    pl: [
      "Dane, które wyjaśniają wycenę: 4 020 €/m² w Tosalet wobec 4 400 €/m² mediany Jávea, 4 290 €/m² w Arenal i 4 890 €/m² w Cap Martí. To najtańszy adres willowy w gminie, bo domy pochodzą z lat siedemdziesiątych i wymagają remontu, a ROI 4,7 procent brutto jest niskie nawet jak na Jávea. Kupują tu osoby, które znają miasto od lat i wolą działkę z sosnami niż nowy apartament. Sprawdź stan dachu, instalacji i czy działka ma dostęp do drogi publicznej, bo część ulic w Tosalet jest prywatna.",
    ],
    en: [
      "Data that explains the valuation: 4,020 per m² in Tosalet against a Jávea median of 4,400, 4,290 in Arenal and 4,890 in Cap Martí. It is the cheapest villa address in the municipality because the houses date from the seventies and need work, and a 4.7 percent gross yield is low even for Jávea. Buyers know the town from years back and prefer a plot with pines to a new flat. Check the roof, the installations and whether the plot reaches a public road, since some Tosalet streets are private.",
    ],
    es: [
      "Datos que explican la valoración: 4.020 por m² en Tosalet frente a una mediana de Jávea de 4.400, 4.290 en Arenal y 4.890 en Cap Martí. Es la dirección de chalets más barata del municipio porque las casas son de los setenta y piden obra, y un 4,7 por ciento bruto es bajo incluso para Jávea. Compran quienes conocen el pueblo desde años atrás y prefieren parcela con pinos a piso nuevo. Revisa tejado, instalaciones y si la parcela da a camino público, porque algunas calles de Tosalet son privadas.",
    ],
  },

  "denia/les-marines": {
    pl: [
      "Dane, które porządkują wybór w Dénia: 3 150 €/m² w Les Marines wobec 3 100 € mediany gminy, 3 260 € w Las Marinas, 3 040 € przy Puerto i 2 780 € w La Xara. ROI 5,7 procent brutto przy popycie 8/10 znaczy, że najem idzie, ale nie jest to rynek inwestycyjny pierwszej kategorii. Les Marines wygrywa dostępem do szerokiej plaży i nowymi osiedlami z basenem, a traci jedną drogą dojazdową, która w sierpniu stoi. Sprawdź, czy osiedle ma licencję turystyczną dla całego budynku i czy wspólnota utrzymuje basen również poza sezonem.",
    ],
    en: [
      "Data that organises the Dénia choice: 3,150 per m² in Les Marines against the 3,100 municipal median, 3,260 in Las Marinas, 3,040 at Puerto and 2,780 in La Xara. A 5.7 percent gross yield with demand at 8 of 10 means letting works but this is not a top-tier investment market. Les Marines wins on access to the wide beach and new estates with pools, and loses on a single access road that jams in August. Check whether the estate holds a tourist licence for the whole building and whether the community keeps the pool running off season.",
    ],
    es: [
      "Datos que ordenan la elección en Dénia: 3.150 por m² en Les Marines frente a una mediana de 3.100, 3.260 en Las Marinas, 3.040 en Puerto y 2.780 en La Xara. Un 5,7 por ciento bruto con demanda de 8 sobre 10 indica que el alquiler funciona pero no es un mercado de primera categoría. Les Marines gana en acceso a playa amplia y urbanizaciones nuevas con piscina, y pierde en una sola carretera que se atasca en agosto. Comprueba si la urbanización tiene licencia turística para todo el edificio y si la comunidad mantiene la piscina fuera de temporada.",
    ],
  },
  "denia/las-marinas": {
    pl: [
      "Liczby do decyzji: 3 260 €/m², o 160 € więcej niż mediana Dénia i o 110 € więcej niż Les Marines, przy ROI 5,8 procent brutto. Za tę różnicę kupujesz działkę, ogród i drugą linię zamiast pierwszego rzędu, a najem jest tu dłuższy, bo przyjeżdżają rodziny na cały sezon, nie na weekend. Popyt 8/10 utrzymuje się dzięki temu, że to okolica willowa, a nie hotelowa. Sprawdź plan miejscowy i klasę gruntu, bo część terenów w tej strefie ma ograniczenia związane z ochroną wybrzeża, oraz stan drogi dojazdowej po deszczach.",
    ],
    en: [
      "Numbers for the decision: 3,260 per m², 160 above the Dénia median and 110 above Les Marines, with a 5.8 percent gross yield. For that difference you buy a plot, a garden and a second row instead of a front row, and letting lasts longer because families come for the whole season rather than a weekend. Demand of 8 of 10 holds because this is villa country rather than hotel country. Check the town plan and land classification, since parts of this strip carry coastal protection limits, and the state of the access road after rain.",
    ],
    es: [
      "Cifras para decidir: 3.260 por m², 160 sobre la mediana de Dénia y 110 sobre Les Marines, con un 5,8 por ciento bruto. Por esa diferencia compras parcela, jardín y segunda línea en lugar de primera, y el alquiler dura más porque vienen familias toda la temporada y no un fin de semana. La demanda de 8 sobre 10 se sostiene porque es zona de chalets y no de hoteles. Revisa el planeamiento y la clasificación del suelo, porque parte de esta franja tiene limitaciones de protección del litoral, y el estado del camino tras la lluvia.",
    ],
  },
  "torrevieja/la-mata": {
    pl: [
      "Twarde dane: 2 690 €/m², o 120 € więcej niż mediana Torrevieja, ale o 380 € mniej niż w Punta Prima, przy ROI 6,1 procent brutto i popycie 8/10. La Mata wygrywa parkiem nad laguną i szerszą plażą, a traci brakiem deptaku z restauracjami w zasięgu spaceru. W porównaniu z El Acequión (2 480 €/m², 6,4 procent) płacisz 210 € za metr więcej, ale dostajesz nowsze budynki i ciszę. Sprawdź, czy wspólnota ma fundusz na elewację od strony morza i czy osiedle jest odebrane przez gminę, bo część dróg i zieleńców pozostaje w gestii dewelopera.",
    ],
    en: [
      "Hard data: 2,690 per m², 120 above the Torrevieja median but 380 below Punta Prima, with a 6.1 percent gross yield and demand at 8 of 10. La Mata wins on the lagoon park and a wider beach, and loses on the lack of a restaurant promenade within walking distance. Against El Acequión (2,480 per m², 6.4 percent) you pay 210 more per square metre but get newer buildings and quiet. Check the community fund for the sea-facing facade and whether the estate has been handed to the council, since some roads and green areas remain the developer's.",
    ],
    es: [
      "Datos duros: 2.690 por m², 120 sobre la mediana de Torrevieja pero 380 bajo Punta Prima, con un 6,1 por ciento bruto y demanda de 8 sobre 10. La Mata gana por el parque de la laguna y una playa más ancha, y pierde por la falta de paseo de restaurantes a pie. Frente a El Acequión (2.480 por m², 6,4 por ciento) pagas 210 más por metro pero obtienes edificios más nuevos y silencio. Revisa el fondo de la comunidad para la fachada al mar y si la urbanización está recepcionada, porque algunos caminos y zonas verdes siguen en manos del promotor.",
    ],
  },

  // END
};

// Trzecia warstwa dla par, które mimo dwóch akapitów zostają najbliżej siebie.
// Temat celowo inny niż w dwóch pierwszych: wydarzenia, codzienna logistyka.
NOTES_EXTRA["aguilas/el-hornillo"]!.pl!.push(
  "Codzienność w El Hornillo jest cicha i przewidywalna: nie ma tu barów z muzyką ani deptaku, są za to tarasy z widokiem na zatokę i spacer do portu, który zimą zajmuje kwadrans. Dla najemcy szukającego spokoju to przewaga, dla szukającego rozrywki wada - i dlatego rotacja lokali jest tu niższa niż na Las Delicias, a umowy dłuższe.",
);
NOTES_EXTRA["aguilas/el-hornillo"]!.en!.push(
  "Daily life in El Hornillo is quiet and predictable: no music bars and no promenade, but terraces looking over the bay and a walk to the port that takes a quarter of an hour in winter. For a tenant seeking calm that is an advantage, for one seeking nightlife a drawback, which is why turnover here is lower than on Las Delicias and contracts run longer.",
);
NOTES_EXTRA["aguilas/el-hornillo"]!.es!.push(
  "La vida diaria en El Hornillo es tranquila y previsible: no hay bares con música ni paseo, pero sí terrazas con vistas a la bahía y un paseo al puerto que en invierno lleva un cuarto de hora. Para un inquilino que busca calma es una ventaja; para quien busca ambiente, una pega, y por eso la rotación aquí es menor que en Las Delicias y los contratos duran más.",
);

/**
 * Akapity wyłącznie dla raportów cenowych (/ceny-m2/...). Dzięki nim ta sama
 * dzielnica nie powtarza identycznej noty na stronie usługi i w raporcie:
 * raport dostaje własną analizę opartą o dane transakcyjne.
 */
const REPORT_EXTRA: Record<string, Partial<Record<Locale, string[]>>> = {
  "aguilas/las-delicias": {
    pl: [
      "W raporcie cenowym widać to, czego nie widać w ogłoszeniu: mediana 2 010 €/m² jest o 160 € wyższa od średniej gminy, a mimo to najem daje 6,6 procent brutto, czyli o 0,6 punktu więcej niż w centrum Águilas. Ekspozycja oferty wynosi tu 120 dni, a popyt 8/10, więc sprzedaż idzie szybciej niż w głębi miasta. Jeśli liczyć 250 000 € w tej strefie, pięcioletni zwrot z czynszu i wzrostu wartości przekracza 70 000 € przy założeniach modelu - to wynik, który stawia Las Delicias w czołówce gminy.",
    ],
    en: [
      "The price report shows what a listing does not: the 2,010 median is 160 above the municipal average, yet letting still yields 6.6 percent gross, half a point more than central Águilas. Time on market is 120 days with demand at 8 of 10, so sales move faster than inland. Run 250,000 through this area and the five-year return from rent plus value growth clears 70,000 under the model's assumptions, which puts Las Delicias at the top of the municipality.",
    ],
    es: [
      "El informe de precios muestra lo que el anuncio no dice: la mediana de 2.010 está 160 sobre la media municipal y aun así el alquiler rinde 6,6 por ciento bruto, medio punto más que el centro de Águilas. La exposición es de 120 días con demanda de 8 sobre 10, así que se vende más rápido que tierra adentro. Si pones 250.000 en esta zona, el retorno a cinco años entre renta y revalorización supera los 70.000 con los supuestos del modelo, lo que sitúa Las Delicias en cabeza del municipio.",
    ],
  },
  "santa-pola/playa-de-levante": {
    pl: [
      "Dane raportu: 2 570 €/m² to o 220 € więcej niż mediana Santa Pola, ale ROI 6,5 procent brutto jest wyższe niż w Benidorm o pół punktu, mimo podobnej plaży. Ekspozycja 100 dni i popyt 8/10 oznaczają rynek, na którym nie trzeba czekać na kupca. Uwaga na koszty: wspólnota w blokach pierwszej linii i ubezpieczenie od zalania podnoszą wydatki roczne o kilkaset euro, a to bezpośrednio obniża zwrot netto z 6,5 do około 4,6 procent.",
    ],
    en: [
      "Report data: 2,570 per m² is 220 above the Santa Pola median, yet a 6.5 percent gross yield beats Benidorm by half a point despite a comparable beach. Time on market of 100 days and demand at 8 of 10 mean a market where you do not wait for a buyer. Watch the costs: front-line community fees and flood insurance add several hundred euros a year, which takes the net return from 6.5 down to about 4.6 percent.",
    ],
    es: [
      "Datos del informe: 2.570 por m² está 220 sobre la mediana de Santa Pola, pero un 6,5 por ciento bruto supera a Benidorm en medio punto con una playa comparable. Una exposición de 100 días y demanda de 8 sobre 10 indican un mercado donde no se espera comprador. Ojo a los gastos: la comunidad de primera línea y el seguro de inundación suman varios cientos de euros al año, lo que baja el retorno neto del 6,5 al 4,6 por ciento.",
    ],
  },
  "torrevieja/la-mata": {
    pl: [
      "Liczby z raportu: 2 690 €/m² przy medianie miasta 2 570 € i ROI 6,1 procent brutto. Ekspozycja 95 dni i popyt 8/10 to jedne z najlepszych wskaźników płynności w gminie, bo Torrevieja ma 4 200 transakcji rocznie - najwięcej na Costa Blanca Sur. W praktyce oznacza to, że mieszkanie w La Mata sprzedasz szybciej niż w El Acequión, ale zarobisz na nim mniej na metrze, bo cena wejścia jest o 210 € wyższa.",
    ],
    en: [
      "Report numbers: 2,690 per m² against a town median of 2,570 and a 6.1 percent gross yield. Time on market of 95 days and demand at 8 of 10 are among the best liquidity readings in the municipality, because Torrevieja logs 4,200 sales a year, the most on the Costa Blanca Sur. In practice a La Mata flat sells faster than one in El Acequión, but earns less per square metre, since the entry price is 210 higher.",
    ],
    es: [
      "Cifras del informe: 2.690 por m² frente a una mediana municipal de 2.570 y un 6,1 por ciento bruto. Una exposición de 95 días y demanda de 8 sobre 10 están entre las mejores lecturas de liquidez del municipio, porque Torrevieja registra 4.200 operaciones al año, la mayor de Costa Blanca Sur. En la práctica un piso en La Mata se vende antes que uno en El Acequión, pero gana menos por metro, porque la entrada cuesta 210 más.",
    ],
  },
  "aguilas/centro": {
    pl: [
      "Raport pokazuje paradoks tego adresu: 1 750 €/m² to najniższa mediana w Águilas, o 100 € poniżej średniej gminy, a ROI 6,8 procent brutto jest najwyższe w mieście. Powód jest prosty - cena wejścia jest niska, a czynsz trzyma się dzięki portowi, urzędom i dworcowi, więc najem działa przez dwanaście miesięcy, nie przez trzy. Ryzyko też jest policzalne: bez aktualnego ITE bank odmówi kredytu, a to zawęża grono kupujących i wydłuża sprzedaż.",
    ],
    en: [
      "The report shows the paradox of this address: 1,750 per m² is the lowest median in Águilas, 100 below the municipal average, yet a 6.8 percent gross yield is the highest in town. The reason is simple: the entry price is low while rent holds thanks to the port, the offices and the station, so letting runs twelve months rather than three. The risk is countable too: without a current ITE inspection a bank refuses the mortgage, which narrows the buyer pool and stretches the sale.",
    ],
    es: [
      "El informe muestra la paradoja de esta dirección: 1.750 por m² es la mediana más baja de Águilas, 100 bajo la media municipal, y aun así el 6,8 por ciento bruto es el más alto del pueblo. La razón es simple: la entrada es barata y la renta aguanta gracias al puerto, las oficinas y la estación, así que el alquiler funciona doce meses y no tres. El riesgo también se puede medir: sin ITE en vigor el banco niega la hipoteca, lo que reduce compradores y alarga la venta.",
    ],
  },

  "guardamar-del-segura/centro": {
    pl: [
      "W raporcie najważniejsza jest relacja dwóch liczb: 2 300 €/m² to o 170 € mniej niż mediana Guardamar, a ROI 6,4 procent brutto jest wyższe niż w Guardamar Playa o 0,2 punktu. Do tego dochodzi ekspozycja 105 dni i popyt 7/10, czyli sprzedaż idzie normalnie, bez presji. To rzadka kombinacja: tańszy metr, wyższy zwrot i usługi pieszo. Jeśli planujesz najem długoterminowy, centrum bije tu plażę, a różnica 170 €/m² wystarcza na remont łazienki i kuchni.",
    ],
    en: [
      "What matters in the report is the ratio between two figures: 2,300 per m² is 170 below the Guardamar median, while a 6.4 percent gross yield beats Guardamar Playa by 0.2 points. Add 105 days on market and demand at 7 of 10, so sales proceed normally without pressure. It is a rare combination: cheaper square metre, higher yield and services on foot. For long-term letting the centre beats the beach here, and the 170 per m² difference covers a bathroom and kitchen renovation.",
    ],
    es: [
      "Lo importante del informe es la relación entre dos cifras: 2.300 por m² está 170 bajo la mediana de Guardamar y un 6,4 por ciento bruto supera a Guardamar Playa en 0,2 puntos. Súmale 105 días de exposición y demanda de 7 sobre 10, así que se vende con normalidad y sin presión. Es una combinación poco frecuente: metro más barato, más rentabilidad y servicios a pie. Para alquiler largo el centro gana a la playa, y los 170 por m² cubren reformar baño y cocina.",
    ],
  },
  "san-pedro-del-pinatar/lo-pagan": {
    pl: [
      "Raport pokazuje, gdzie jest granica: 2 450 €/m² to 160 € powyżej mediany gminy, a ROI 6,5 procent brutto jest o 0,2 punktu niższe niż w centrum San Pedro (2 130 €/m², 6,7 procent). Płacisz więc za plażę i błoto, nie za zwrot. Ekspozycja 100 dni i popyt 8/10 utrzymują płynność, ale sezonowość oznacza, że kalkulację trzeba oprzeć na ośmiu miesiącach najmu. Jeśli szukasz dochodu całorocznego, centrum wygrywa; jeśli własnych wakacji i widoku - Lo Pagán.",
    ],
    en: [
      "The report shows where the limit is: 2,450 per m² is 160 above the municipal median, while a 6.5 percent gross yield is 0.2 points below San Pedro centre (2,130 per m², 6.7 percent). You pay for the beach and the mud, not for the return. Time on market of 100 days and demand at 8 of 10 keep liquidity, but seasonality means the maths should rest on eight months of letting. For year-round income the centre wins; for your own holidays and a view, Lo Pagán.",
    ],
    es: [
      "El informe muestra dónde está el límite: 2.450 por m² está 160 sobre la mediana municipal y un 6,5 por ciento bruto queda 0,2 puntos bajo el centro de San Pedro (2.130 por m², 6,7 por ciento). Pagas playa y barro, no retorno. Una exposición de 100 días y demanda de 8 sobre 10 mantienen la liquidez, pero la estacionalidad obliga a calcular sobre ocho meses de alquiler. Para renta anual gana el centro; para vacaciones propias y vistas, Lo Pagán.",
    ],
  },

  // END
};

export function districtMarketNote(
  citySlug: string,
  districtSlug: string,
  locale: Locale,
  variant: "service" | "report" = "service",
): DistrictMarketNote | null {
  const key = `${citySlug}/${districtSlug}`;
  const paragraphs = NOTES[key]?.[locale];
  if (!paragraphs || paragraphs.length === 0) return null;
  const extra = NOTES_EXTRA[key]?.[locale] ?? [];
  // Raporty cenowe dostają akapit analityczny (dane, porównania), strony usług
  // pełną notę. Dzięki temu ta sama dzielnica nie powtarza tego samego tekstu
  // na dwóch różnych typach strony.
  if (variant === "report") {
    const reportOnly = REPORT_EXTRA[key]?.[locale] ?? [];
    return { heading: HEADING[locale], paragraphs: [paragraphs[0]!, ...(reportOnly.length ? reportOnly : extra)] };
  }
  return { heading: HEADING[locale], paragraphs: [...paragraphs, ...extra] };
}
