import type { LocalizedContent } from "./types";

/** TREŚĆ STRON - HISZPAŃSKI (rynek lokalny: notaría, registro, ITP/IVA). */
export const es = {
  district: {
    leads: [
      "{service} en {districtLoc} ({cityLoc}, {region}): {price} €/m², rentabilidad {yield} y subida {growth} interanual. Consulta ofertas, calcula el retorno y habla con un agente.",
      "¿Buscas una propiedad en {districtLoc}? Mediana {price} €/m² y venta media en {days} días. Abajo: gastos reales de compra, alquiler y ROI.",
      "{districtLoc} en {region}: {price} €/m² con rentabilidad bruta {yield}. Mira cuánto paga el alquiler y qué impuestos se aplican.",
    ],
    blocks: {
      rynek: {
        heading: "Mercado inmobiliario en {districtLoc} - {year}",
        p1: "Predomina {characteristic}; el comprador valora {landmark} y {landmark2} antes que los metros. Las viviendas junto a la playa o con piscina se sitúan por encima de la media.",
        p2: "La mediana es {price} €/m², {pricePosition}. Interanualmente el mercado {growthSentence}. Un piso de 70 m² vale unos {budget70} antes de gastos.",
      },
      roi: {
        heading: "Alquiler y rentabilidad en {districtLoc}",
        p1: "El alquiler mediano es {rent} €/m² al mes, lo que da {yieldSentence}. Un piso de 70 m² genera unos {rent70} € brutos al año y {rentNet70} € netos tras gestión, impuestos y vacíos.",
        p2: "Sumando la revalorización, una inversión de 250 000 € en {districtLoc} devuelve unos {return5y} € en cinco años ({returnPercent}% del presupuesto). Es un modelo, no una garantía.",
      },
      koszty: {
        heading: "Gastos e impuestos de compra en España",
        p1: "Añade un {purchaseCosts}: ITP del 10% en segunda mano (o IVA del 10% más AJD en obra nueva), notaría, registro de la propiedad y abogado. Necesitas el NIE antes de firmar.",
        bullets: [
          "NIE para notaría y Hacienda",
          "ITP 10% (segunda mano) o IVA 10% + AJD",
          "Notaría, registro de la propiedad y abogado",
          "Costes anuales: IBI y comunidad",
        ],
      },
      kupujacy: {
        heading: "Quién compra en {districtLoc}",
        p1: "En {cityLoc} el {foreign} de los compradores son extranjeros, incluido un {polish} de Polonia. Eso mantiene líquida la reventa: los mismos compradores competirán por tu propiedad.",
        p2: "El parque es una mezcla de {districtType} y la demanda se apoya en {landmark2}. El alquiler funciona todo el año: turístico en verano y de larga duración en invierno.",
      },
    },
    bullets: [
      "Mediana: {price} €/m²",
      "Variación interanual: {growth}",
      "Tiempo medio de venta: {days} días",
      "Transacciones (12 meses): {volume}",
      "Alquiler: {rent} €/m² al mes",
    ],
    faq: [
      {
        q: "¿Cuánto cuesta el metro cuadrado en {districtLoc}?",
        a: "La mediana es {price} €/m² (datos: {dataAsOf}), {pricePosition}. La mediana de {cityGen} es {cityPrice} €/m². Añade un 13-14% de gastos de compra.",
      },
      {
        q: "¿Qué rentabilidad puedo esperar en {districtLoc}?",
        a: "Bruta {yield} y unos {netYield} netos tras gestión, impuestos y vacíos. Alquiler mediano: {rent} €/m² al mes.",
      },
      {
        q: "¿Necesito NIE para comprar en España?",
        a: "Sí. El NIE es obligatorio ante notario y para cualquier pago de impuestos. Se solicita en persona o por poder notarial; suele tardar de una a tres semanas.",
      },
      {
        q: "¿Qué impuestos se pagan al comprar en {districtLoc}?",
        a: "Segunda mano: ITP 10% (Comunidad Valenciana y Murcia). Obra nueva: IVA 10% más AJD. Con notaría, registro y abogado, calcula un 13-14% del precio. Además IBI anual e IRPF sobre el alquiler.",
      },
      {
        q: "¿Comprar una vivienda da permiso de residencia?",
        a: "No. La 'Golden Visa' ligada a la compra ya no existe. La residencia se obtiene por trabajo, actividad económica o rentas pasivas (visado no lucrativo).",
      },
    ],
    notes: [
      "En {districtLoc} predomina {characteristic}, lo que condiciona el alquiler y el perfil del inquilino.",
      "La cercanía a {landmark} eleva la demanda de temporada y también los gastos de comunidad.",
    ],
  },

  city: {
    leads: [
      "{city} es un mercado clave en {region}: {cityPrice} €/m², rentabilidad bruta {yield} y subida {growth} interanual. Compara zonas y calcula tu presupuesto.",
      "En {cityLoc} la mediana es {cityPrice} €/m² con una rentabilidad bruta de {yield}. Revisa las zonas y modela tu presupuesto.",
    ],
    blocks: {
      rynek: {
        heading: "Mercado inmobiliario en {cityLoc} - {year}",
        p1: "La mediana en {cityLoc} es {cityPrice} €/m², {growth} interanual. Frente a la mediana de {region} ({regionPrice} €/m²) la ciudad {pricePosition}. El tiempo medio de venta es {days} días con unas {volume} operaciones al año.",
        p2: "El {foreign} de los compradores es extranjero, incluido un {polish} de Polonia: reventa líquida, pero también competencia por las mejores viviendas.",
      },
      dzielnice: {
        heading: "Precios y rentabilidad por zona en {cityGen}",
        p1: "El precio varía según la distancia a la playa, el año de construcción y la calidad de la promoción. Abajo: mediana €/m² y rentabilidad bruta por zona; abre cualquiera para el informe completo.",
      },
      proces: {
        heading: "Cómo comprar una vivienda en {cityLoc}",
        p1: "Comprar en España exige NIE, cuenta bancaria española y traductor o abogado en la notaría. Estos son los pasos que gestionamos por ti:",
      },
      koszty: {
        heading: "Gastos e impuestos de compra",
        p1: "Añade un {purchaseCosts}: ITP 10% en segunda mano o IVA 10% más AJD en obra nueva, notaría, registro de la propiedad y honorarios legales. Además: IBI, comunidad y seguro.",
        bullets: [
          "NIE y cuenta bancaria española",
          "ITP o IVA + AJD según la vivienda",
          "Notaría y registro de la propiedad",
          "Abogado independiente revisando la titularidad",
        ],
      },
    },
    faq: [
      {
        q: "¿Cuánto cuesta el metro cuadrado en {cityLoc} en {year}?",
        a: "La mediana es {cityPrice} €/m² (datos: {dataAsOf}), frente a la mediana de {region} de {regionPrice} €/m².",
      },
      {
        q: "¿Dónde es más barato en {cityLoc} y dónde hay mejor rentabilidad?",
        a: "Los precios más bajos están en zonas de interior o secundarias, mientras que la mejor rentabilidad bruta suele estar en barrios costeros más económicos. Rara vez coinciden con las zonas más caras: ahí está la decisión de inversión.",
      },
      {
        q: "¿Pueden comprar extranjeros en {cityLoc}?",
        a: "Sí, sin restricciones: los ciudadanos de la UE tienen los mismos derechos que los españoles. Necesitas NIE y cuenta bancaria, y puedes firmar por poder notarial si no puedes acudir a la notaría.",
      },
    ],
  },

  report: {
    h1: [
      "Precios y rentabilidad en {district} ({city}). Informe {year}",
      "Precio por m² en {districtLoc} ({city}). Análisis de inversión",
    ],
    metaTitle: "Precios y ROI {district} ({city}) {year}",
    metaDescription:
      "Precios en {districtLoc}: {price} €/m², rentabilidad {yield}, subida {growth} interanual. Informe con alquiler, gastos y retorno a cinco años.",
    lead: "La mediana en {districtLoc} es {price} €/m² (datos: {dataAsOf}), {pricePosition}. La rentabilidad bruta es {yield} y unos {netYield} netos, con precios {growth} interanual. Abajo: alquileres, gastos de compra y comparativa con otras zonas de {cityGen}.",
    blocks: {
      ceny: {
        heading: "Precios en {districtLoc} - {year}",
        p1: "El precio depende de la distancia a la playa, el año de construcción y la calidad de la promoción. Con una mediana de {price} €/m², un piso de 70 m² cuesta unos {budget70}; con gastos ({purchaseCosts}) el presupuesto se acerca a {budget70plus}.",
        bullets: [
          "Mediana: {price} €/m²",
          "Variación interanual: {growth}",
          "Tiempo medio de venta: {days} días",
          "Transacciones (12 meses): {volume}",
        ],
      },
      roi: {
        heading: "Alquiler y rentabilidad en {districtLoc}",
        p1: "El alquiler mediano es {rent} €/m² al mes, lo que da {yield} brutos. Con 250 000 € de presupuesto son unos {rent250} € al año y {rentNet250} € tras gestión, impuestos y vacíos.",
        p2: "Añadiendo la revalorización del {growth} anual, la inversión en {districtLoc} devuelve unos {return5y} € en cinco años ({returnPercent}% del presupuesto). Valor previsto a cinco años: {value5y} €.",
      },
      podatki: {
        heading: "Impuestos y gastos de compra en España",
        p1: "Comprar en {districtLoc} implica un {purchaseCosts}: ITP 10% en segunda mano o IVA 10% más AJD en obra nueva, notaría, registro de la propiedad y honorarios. Añade IBI y comunidad anuales y el IRPF sobre el alquiler.",
        p2: "Como no residente declaras el IRPF por el alquiler y aplicas el convenio de doble imposición en tu país. El NIE es obligatorio: sin él no puedes firmar la escritura ni declarar. La plusvalía municipal corresponde al vendedor.",
      },
      metodologia: {
        heading: "Metodología",
        p1: "Los datos provienen de precios de oferta y transacciones de los últimos 12 meses en {districtLoc} ({volume} operaciones en el modelo) y se actualizan mensualmente. No son una tasación oficial: para una hipoteca se requiere tasación bancaria.",
      },
    },
    faq: [
      {
        q: "¿Cuánto cuesta el metro cuadrado en {districtLoc} en {year}?",
        a: "La mediana es {price} €/m² (datos: {dataAsOf}), frente a {cityPrice} €/m² en {cityGen}.",
      },
      {
        q: "¿Qué rentabilidad da el alquiler en {districtLoc}?",
        a: "Bruta {yield}, unos {netYield} netos tras gastos e impuestos. Alquiler mediano: {rent} €/m² al mes.",
      },
      {
        q: "¿Están subiendo los precios en {districtLoc}?",
        a: "La variación interanual es {growth}. {growthSentence}.",
      },
      {
        q: "¿Qué gastos se suman al precio?",
        a: "Un {purchaseCosts}: ITP/IVA, notaría, registro y honorarios, más unos 300-800 € anuales de costes fijos (IBI, comunidad).",
      },
    ],
  },

  service: {
    buy: {
      name: "Apartamentos en venta",
      propertyNoun: "apartamento",
      propertyNounGenitive: "apartamento",
      priceAnchor: "desde 120.000 €",
      highlightLabel: "vistas al mar o piscina",
      ctaLabel: "Ver ofertas y calcular rentabilidad",
      h1: [
        "Apartamentos en venta en {districtLoc} ({cityLoc}) - {region} {year}",
        "Apartamentos en {districtLoc} ({cityLoc}) desde {price} €/m²",
      ],
      metaTitle: [
        "Apartamentos en venta {city} ({region}) | desde 120 mil €",
        "Apartamento {district} {city}. Precios y ROI {year}",
      ],
      metaDescription: [
        "¿Buscas apartamento en {districtLoc}? Mediana {price} €/m², rentabilidad {yield}, subida {growth} interanual. Ofertas, gastos y agente.",
        "Apartamentos en venta en {cityLoc} desde 120.000 €. Precios en {districtLoc}: {price} €/m². Revisión legal y NIE incluidos.",
      ],
      benefits: [
        {
          title: "Ofertas filtradas por demanda de alquiler",
          description:
            "Comprobamos el alquiler real en {districtLoc} ({rent} €/m² al mes), no la rentabilidad del folleto del promotor.",
        },
        {
          title: "Gastos de compra calculados antes",
          description:
            "ITP 10% o IVA más AJD, notaría, registro, abogado y cuenta bancaria española: presupuesto completo antes de firmar.",
        },
        {
          title: "Titularidad y urbanismo verificados",
          description:
            "Nota Simple, cargas, coincidencia catastral y deudas de comunidad revisadas por un abogado independiente.",
        },
      ],
      checklist: [
        "Presupuesto en EUR y financiación",
        "NIE para la notaría",
        "Justificación de fondos para el banco",
      ],
    },
    villa: {
      name: "Villas con piscina",
      propertyNoun: "villa",
      propertyNounGenitive: "villa",
      priceAnchor: "desde 320.000 €",
      highlightLabel: "piscina privada y parcela",
      ctaLabel: "Solicitar selección de villas",
      h1: [
        "Villas con piscina en {districtLoc} ({cityLoc}) - {region} {year}",
        "Villas de lujo en {districtLoc} ({cityLoc})",
      ],
      metaTitle: [
        "Villas con piscina {city} ({region}) | desde 320 mil €",
        "Villa de lujo {district} {city}. Ofertas {year}",
      ],
      metaDescription: [
        "Villas con piscina en {districtLoc} ({cityLoc}) desde 320.000 €. Precios {price} €/m², subida {growth} interanual. Selección y ROI.",
        "¿Buscas villa en {cityLoc}? Mediana {price} €/m², rentabilidad {yield}%. Revisión legal y agente en español.",
      ],
      benefits: [
        {
          title: "Parcela y piscina comprobadas",
          description:
            "Clasificación del suelo, legalidad de piscina y ampliaciones y Catastro verificados: el problema más habitual en villas.",
        },
        {
          title: "Costes de mantenimiento a la vista",
          description:
            "IBI, comunidad, piscina, jardinero y seguro: coste anual antes de presentar oferta.",
        },
      ],
      checklist: [
        "Nota Simple y cargas",
        "Licencia de obra y Catastro",
        "Certificado energético e IBI",
      ],
    },
    investment: {
      name: "Propiedades de inversión",
      propertyNoun: "inmueble",
      propertyNounGenitive: "inmueble",
      priceAnchor: "rentabilidad 4,6-6,9% bruta",
      highlightLabel: "rentas y revalorización",
      ctaLabel: "Calcular la rentabilidad de la zona",
      h1: [
        "Inversión inmobiliaria en {districtLoc} ({cityLoc}) - ROI {yield}",
        "Comprar para alquilar en {districtLoc} ({cityLoc})",
      ],
      metaTitle: [
        "Inversión inmobiliaria {city} ({region}) | ROI {yield}",
        "Comprar para alquilar {district} {city} - ROI {year}",
      ],
      metaDescription: [
        "Inversión en {districtLoc}: {price} €/m², alquiler {rent} €/m², rentabilidad bruta {yield}. Calcula tu retorno para {year}.",
        "Inversión en {cityLoc}: subida {growth} interanual y rentabilidad {yield}. Gastos, impuestos y alquileres reales.",
      ],
      benefits: [
        {
          title: "ROI sobre alquileres reales",
          description:
            "Basado en el alquiler mediano de {rent} €/m² al mes en {districtLoc}, ocupación y gastos de mantenimiento.",
        },
        {
          title: "Salida planificada desde el día uno",
          description:
            "Alquiler largo, turístico y compra-reforma-reventa modelados antes de comprometerte.",
        },
      ],
      checklist: ["Modelo de ROI con gastos e impuestos", "Nota Simple y cargas"],
    },
    "lead-magnet": {
      name: "Guía de compra gratuita",
      propertyNoun: "inmueble",
      propertyNounGenitive: "inmueble",
      priceAnchor: "gratis. Sin compromiso",
      highlightLabel: "guía PDF + revisión legal",
      ctaLabel: "Recibir la guía y la valoración",
      h1: [
        "Guía de compra gratuita en {districtLoc} ({cityLoc}) - {year}",
        "Valoración y revisión legal en {districtLoc} ({cityLoc})",
      ],
      metaTitle: [
        "Guía de compra gratis {city} ({region}) {year}",
        "Valoración y revisión legal - {district} {city}",
      ],
      metaDescription: [
        "Descarga la guía gratuita: gastos de compra en {districtLoc}, ITP/IVA, NIE y valoración. Mediana {price} €/m². Sin compromiso.",
        "¿Planeas comprar en {cityLoc}? Recibe una guía PDF, el desglose de gastos y una valoración orientativa gratis.",
      ],
      benefits: [
        {
          title: "Desglose completo de gastos",
          description:
            "ITP/IVA, notaría, registro, abogado, traducciones y NIE, con importes para {districtLoc} a {price} €/m².",
        },
        {
          title: "Revisión legal sin jerga",
          description:
            "Qué enseña la Nota Simple, qué cargas descalifican una oferta y qué comprobar antes de pagar las arras.",
        },
      ],
      checklist: [
        "Guía PDF con gastos de compra",
        "Checklist de documentos y preguntas al vendedor",
      ],
    },
  },

  process: [
    {
      title: "Presupuesto y objetivo",
      description:
        "Acordamos presupuesto en EUR, rentabilidad objetivo y plazo, y seleccionamos zonas.",
      duration: "1 día",
    },
    {
      title: "Selección y visitas",
      description:
        "3-5 inmuebles con €/m² frente a la mediana local; visitas presenciales o por vídeo con el agente.",
      duration: "3-10 días",
    },
    {
      title: "Revisión legal y NIE",
      description:
        "El abogado verifica la Nota Simple y las cargas; obtienes el NIE necesario para firmar.",
      duration: "1-2 semanas",
    },
    {
      title: "Notaría y llaves",
      description:
        "Escritura en la notaría, inscripción en el registro de la propiedad y entrega de llaves.",
      duration: "1 día + 2-6 semanas",
    },
  ],
} satisfies LocalizedContent;
