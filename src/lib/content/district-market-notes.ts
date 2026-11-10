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
    ],
    en: [
      "Centro in Guardamar is the everyday district, not the beach one: Mercado Municipal, the Ayuntamiento, a pharmacy and schools all sit within a few hundred metres, while the dunes and the sea are about a kilometre away, so the morning starts with a walk rather than a towel. Most buildings date from 2000 to 2015, meaning Spanish technical code, a lift and a garage, which is not a given in older Spanish town centres. The square metre costs less than in Guardamar Playa and lets last longer, because tenants work in town rather than come for a fortnight. In summer check parking: the narrow streets by the market fill up before nine.",
    ],
    es: [
      "Centro en Guardamar es el barrio de lo cotidiano, no el de la playa: Mercado Municipal, Ayuntamiento, farmacia y colegios quedan a pocos cientos de metros, mientras las dunas y el mar están a un kilómetro, así que la mañana empieza con un paseo y no con la toalla. Predominan los edificios de 2000 a 2015, es decir, con normativa técnica española, ascensor y garaje, algo que no siempre hay en cascos antiguos. El metro cuesta menos que en Guardamar Playa y los alquileres duran más, porque el inquilino trabaja en el pueblo y no viene dos semanas. En verano mira el aparcamiento: las calles estrechas del mercado se llenan antes de las nueve.",
    ],
  },
  "quesada/centro": {
    pl: [
      "Centro w Ciudad Quesada nie przypomina hiszpańskiego casco antiguo, bo go tu nigdy nie było: to część urbanizacji zaprojektowanej w gminie Rojales, z kościołem, supermarketem i restauracjami rozłożonymi wokół kilku placów. Zabudowa jest niska, z ogrodami i basenami, a odległości pokonuje się pieszo tylko wewnątrz osiedla, bo do plaży w Guardamar jest dziesięć kilometrów. Przewaga tego adresu to gotowa infrastruktura i sąsiedzi z północy Europy, którzy zostają na zimę, więc sklepy i gastronomia nie zamykają się w październiku. Minus: brak widoku na morze i konieczność posiadania auta do każdej większej sprawy.",
    ],
    en: [
      "Centro in Ciudad Quesada does not look like a Spanish casco antiguo, because one never existed here: this is part of an urbanisation laid out inside Rojales, with a church, a supermarket and restaurants arranged around a few squares. Housing is low rise with gardens and pools, and you walk only within the estate, since Guardamar beach is ten kilometres away. The advantage of this address is finished infrastructure and neighbours from northern Europe who stay for winter, so shops and restaurants do not close in October. The downside is no sea view and a car for anything beyond the estate.",
    ],
    es: [
      "Centro en Ciudad Quesada no se parece a un casco antiguo español porque aquí nunca hubo uno: es parte de una urbanización trazada dentro de Rojales, con iglesia, supermercado y restaurantes repartidos en torno a unas plazas. La vivienda es baja, con jardín y piscina, y solo se camina dentro de la urbanización, porque la playa de Guardamar está a diez kilómetros. La ventaja de esta dirección es la infraestructura terminada y unos vecinos del norte de Europa que se quedan el invierno, así que tiendas y restaurantes no cierran en octubre. La pega es que no hay vistas al mar y hace falta coche para cualquier gestión.",
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
