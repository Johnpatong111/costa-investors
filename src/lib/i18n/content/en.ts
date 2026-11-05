import type { LocalizedContent } from "./types";

/** TREŚĆ STRON – ANGIELSKI (body, FAQ prawne, copy usług). */
export const en = {
  district: {
    leads: [
      "{service} in {districtLoc} ({cityLoc}, {region}): {price} €/m², {yield} gross yield, {growth} growth y/y. See listings, run the numbers and speak to an English-speaking agent.",
      "Looking for property in {districtLoc}? Median asking price {price} €/m², average sale {days} days. Below: real purchase costs, rents and ROI.",
      "{districtLoc} on {region}: {price} €/m² at {yield} gross yield. See what renting pays and which taxes apply.",
    ],
    blocks: {
      rynek: {
        heading: "Property market in {districtLoc} – {year}",
        p1: "The area is dominated by {characteristic}; buyers focus on {landmark} and {landmark2} before floor area. Listings near the beach or with a pool sit above the local average.",
        p2: "Median asking price is {price} €/m², {pricePosition}. Year on year the market is {growthSentence}. A 70 m² apartment is worth around {budget70} before purchase costs.",
      },
      roi: {
        heading: "Rental income and ROI in {districtLoc}",
        p1: "Median rent is {rent} €/m² per month, giving a {yieldSentence}. A 70 m² unit earns about {rent70} € gross a year and {rentNet70} € net of management, tax and vacancy.",
        p2: "With capital growth, a 250 000 € investment returns roughly {return5y} € over five years ({returnPercent}% of budget). A model, not a guarantee – every property is verified first.",
      },
      koszty: {
        heading: "Purchase costs and taxes in Spain",
        p1: "Add about {purchaseCosts}: ITP 10% on resale (or 10% VAT plus AJD on new builds), notary, registro de la propiedad and an abogado. You need an NIE number before completion.",
        bullets: [
          "NIE number for the notary and tax office",
          "ITP 10% (resale) or IVA 10% + AJD (new)",
          "Notary, registry and abogado fees",
          "Annual: IBI property tax and comunidad",
        ],
      },
      kupujacy: {
        heading: "Who buys in {districtLoc}",
        p1: "In {cityLoc}, {foreign} of buyers are foreign, including {polish} from Poland. That keeps resales liquid: today's competing buyers become tomorrow's bidders.",
        p2: "Stock is a mix of {districtType} housing and demand is supported by {landmark2}. Rental works all year: holiday lets in summer, long-term lets in winter.",
      },
    },
    bullets: [
      "Median asking price: {price} €/m²",
      "Change y/y: {growth}",
      "Average time to sell: {days} days",
      "Transactions (12 months): {volume}",
      "Rent: {rent} €/m² per month",
    ],
    faq: [
      {
        q: "How much does a square metre cost in {districtLoc}?",
        a: "Median asking price is {price} €/m² (data: {dataAsOf}) – {pricePosition}. The median for {cityGen} is {cityPrice} €/m². Add roughly 13–14% for purchase costs.",
      },
      {
        q: "What yield can I expect in {districtLoc}?",
        a: "Gross {yield}, about {netYield} net after management, tax and vacancy. Median rent is {rent} €/m² per month.",
      },
      {
        q: "Do I need an NIE number to buy in Spain?",
        a: "Yes. The NIE (Número de Identificación de Extranjero) is needed at the notary and for any tax payment. Apply in person or via power of attorney; it takes one to three weeks.",
      },
      {
        q: "What taxes apply when I buy in {districtLoc}?",
        a: "Resale: ITP 10% (Comunidad Valenciana, Murcia). New build: IVA 10% plus AJD. With notary, registry and abogado, budget 13–14% of the price. Ongoing: IBI and tax on rental income.",
      },
      {
        q: "Does buying property grant residency in Spain?",
        a: "No. The property Golden Visa has been abolished. Residency follows employment, business activity or passive income (non-lucrative visa); a purchase alone does not grant it.",
      },
    ],
    notes: [
      "In {districtLoc} the market is dominated by {characteristic}, which shapes both rent and tenant profile.",
      "Proximity to {landmark} lifts seasonal demand but raises comunidad fees.",
    ],
  },

  city: {
    leads: [
      "{city} is a key market on {region}: {cityPrice} €/m², {yield} gross yield, {growth} growth y/y. Compare areas and check what renting pays.",
      "In {cityLoc} the median asking price is {cityPrice} €/m² with roughly {yield} gross yield. Review the areas and model your budget.",
    ],
    blocks: {
      rynek: {
        heading: "Property market in {cityLoc} – {year}",
        p1: "Median asking price in {cityLoc} is {cityPrice} €/m², {growth} year on year. Against the {region} median of {regionPrice} €/m² the city is {pricePosition}. Average time on market is {days} days with about {volume} sales a year.",
        p2: "Foreign buyers are {foreign} of the market, including {polish} from Poland – liquid resales, but competition for the best units.",
      },
      dzielnice: {
        heading: "Prices and yields by area in {cityGen}",
        p1: "Prices vary with distance to the beach, year built and the standard of the development. Below: median €/m² and gross yield per area – open one for the full report.",
      },
      proces: {
        heading: "How to buy property in {cityLoc}",
        p1: "Buying in Spain differs from Poland: you need an NIE number, a Spanish bank account and a translator or abogado at the notary. These are the steps we handle for you:",
      },
      koszty: {
        heading: "Purchase costs and taxes",
        p1: "Add about {purchaseCosts}: ITP 10% on resale or IVA 10% plus AJD on new builds, notary, registro de la propiedad and legal fees. Ongoing: IBI, comunidad and insurance.",
        bullets: [
          "NIE number and Spanish bank account",
          "ITP or IVA + AJD depending on the property",
          "Notary and registro de la propiedad",
          "Independent abogado reviewing title",
        ],
      },
    },
    faq: [
      {
        q: "How much does a square metre cost in {cityLoc} in {year}?",
        a: "Median asking price is {cityPrice} €/m² (data: {dataAsOf}), against the {region} median of {regionPrice} €/m².",
      },
      {
        q: "Where in {cityLoc} is cheapest and where is the best yield?",
        a: "The lowest median prices sit inland or in secondary areas, while the best gross yields tend to be in cheaper coastal districts. They rarely overlap with the most expensive postcodes – that is the core investment decision.",
      },
      {
        q: "Can foreign buyers purchase in {cityLoc}?",
        a: "Yes, with no restrictions; EU citizens have the same rights as Spanish nationals. You need an NIE and a Spanish bank account, and you can complete via power of attorney if you cannot attend the notary.",
      },
    ],
  },

  report: {
    h1: [
      "Prices and ROI in {district} ({city}) – {year} report",
      "Price per m² in {districtLoc} ({city}) – investment analysis",
    ],
    metaTitle: "Prices and ROI {district} ({city}) {year}",
    metaDescription:
      "Prices in {districtLoc}: {price} €/m², {yield} yield, {growth} growth y/y. Report with rent, purchase costs and five-year return.",
    lead: "Median asking price in {districtLoc} is {price} €/m² (data: {dataAsOf}), {pricePosition}. Gross yield is {yield} and roughly {netYield} net, with prices up {growth} y/y. Below: rents, purchase costs and a comparison with other areas of {cityGen}.",
    blocks: {
      ceny: {
        heading: "Property prices in {districtLoc} – {year}",
        p1: "Price depends on distance to the beach, year built and the standard of the development. At a median of {price} €/m² a 70 m² unit costs about {budget70}; with purchase costs ({purchaseCosts}) the budget lands near {budget70plus}.",
        bullets: [
          "Median asking price: {price} €/m²",
          "Change y/y: {growth}",
          "Average time on market: {days} days",
          "Transactions (12 months): {volume}",
        ],
      },
      roi: {
        heading: "Rental yield and income in {districtLoc}",
        p1: "Median rent is {rent} €/m² per month, giving {yield} gross. On a 250 000 € budget that is about {rent250} € a year and {rentNet250} € after management, tax and vacancy.",
        p2: "With capital growth of {growth} a year, an investment in {districtLoc} returns roughly {return5y} € over five years ({returnPercent}% of budget). Projected value after five years: {value5y} €.",
      },
      podatki: {
        heading: "Taxes and purchase costs in Spain",
        p1: "Buying in {districtLoc} means around {purchaseCosts}: ITP 10% on resale or IVA 10% plus AJD on new builds, notary, registro de la propiedad and legal fees. Add annual IBI and comunidad plus tax on rental income (IRPF).",
        p2: "As a non-resident you file Spanish rental income tax and apply the double-taxation treaty at home. An NIE number is mandatory – without it you cannot sign the deed or file taxes.",
      },
      metodologia: {
        heading: "Methodology",
        p1: "Figures come from asking prices and transactions over the last 12 months for {districtLoc} ({volume} transactions in the model) and are refreshed monthly. They are not a valuation under Spanish law – a bank tasación is required for any mortgage.",
      },
    },
    faq: [
      {
        q: "How much is a square metre in {districtLoc} in {year}?",
        a: "Median asking price is {price} €/m² (data: {dataAsOf}), against {cityPrice} €/m² for {cityGen}.",
      },
      {
        q: "What yield does renting in {districtLoc} produce?",
        a: "Gross {yield}, roughly {netYield} net of costs and tax. Median rent is {rent} €/m² per month.",
      },
      {
        q: "Are prices in {districtLoc} rising?",
        a: "Year on year the change is {growth}. {growthSentence}.",
      },
      {
        q: "What costs come on top of the price?",
        a: "About {purchaseCosts}: ITP/IVA, notary, registry and legal fees, plus roughly 300–800 € a year of fixed costs (IBI, comunidad).",
      },
    ],
  },

  service: {
    buy: {
      name: "Apartments for sale",
      propertyNoun: "apartment",
      propertyNounGenitive: "apartment",
      priceAnchor: "from €120,000",
      highlightLabel: "sea view or pool",
      ctaLabel: "See listings and run the numbers",
      h1: [
        "Apartments for sale in {districtLoc} ({cityLoc}) – {region} {year}",
        "Apartments in {districtLoc} ({cityLoc}) from {price} €/m²",
      ],
      metaTitle: [
        "Apartments for sale {city} ({region}) | from 120k €",
        "Apartment {district} {city} – prices and ROI {year}",
      ],
      metaDescription: [
        "Looking for an apartment in {districtLoc}? Median {price} €/m², {yield} yield, {growth} growth y/y. Listings, costs and an English-speaking agent.",
        "Apartments for sale in {cityLoc} from €120,000. Prices in {districtLoc}: {price} €/m². Legal check and NIE support included.",
      ],
      benefits: [
        {
          title: "Listings screened for rental demand",
          description:
            "We check real achievable rent in {districtLoc} ({rent} €/m² per month), not the developer brochure yield.",
        },
        {
          title: "Purchase costs calculated upfront",
          description:
            "ITP 10% or IVA plus AJD, notary, registry, abogado and the Spanish bank account – a full budget before you sign.",
        },
        {
          title: "Title and planning verified",
          description:
            "Nota Simple, charges, catastral compliance and comunidad debts reviewed by an independent lawyer.",
        },
      ],
      checklist: [
        "Budget in EUR and any financing",
        "NIE number for the notary",
        "Proof of funds for the Spanish bank",
      ],
    },
    villa: {
      name: "Villas with pool",
      propertyNoun: "villa",
      propertyNounGenitive: "villa",
      priceAnchor: "from €320,000",
      highlightLabel: "private pool and plot",
      ctaLabel: "Request the villa shortlist",
      h1: [
        "Villas with pool in {districtLoc} ({cityLoc}) – {region} {year}",
        "Luxury villas in {districtLoc} ({cityLoc})",
      ],
      metaTitle: [
        "Villas with pool {city} ({region}) | from 320k €",
        "Luxury villa {district} {city} – listings {year}",
      ],
      metaDescription: [
        "Villas with pool in {districtLoc} ({cityLoc}) from €320,000. Prices {price} €/m², {growth} growth y/y. Selected listings and ROI.",
        "Looking for a villa in {cityLoc}? Median {price} €/m², rental yield {yield}%. Legal check and an English-speaking agent.",
      ],
      benefits: [
        {
          title: "Plot and pool checked",
          description:
            "Land classification, pool and extension legality and Catastro records verified – the most common problem with villas.",
        },
        {
          title: "Sea views that stay",
          description:
            "We check the PGOU and neighbouring plots so a new development cannot block the view you paid for.",
        },
        {
          title: "Running costs on the table",
          description:
            "IBI, comunidad, pool, gardener and insurance – annual cost shown before you offer.",
        },
      ],
      checklist: [
        "Nota Simple and charges",
        "Building licence and Catastro match",
        "Energy certificate and IBI receipts",
      ],
    },
    investment: {
      name: "Investment properties",
      propertyNoun: "property",
      propertyNounGenitive: "property",
      priceAnchor: "4.6–6.9% gross yield",
      highlightLabel: "rental income and capital growth",
      ctaLabel: "Model the ROI for this area",
      h1: [
        "Investment properties in {districtLoc} ({cityLoc}) – {yield} ROI",
        "Buy-to-let in {districtLoc} ({cityLoc}) – prices and yield",
      ],
      metaTitle: [
        "Investment property {city} ({region}) | ROI {yield}",
        "Buy-to-let {district} {city} – ROI {year}",
      ],
      metaDescription: [
        "Investment property in {districtLoc}: {price} €/m², rent {rent} €/m², {yield} gross yield. Model your return for {year}.",
        "Property investment in {cityLoc}: {growth} growth y/y and {yield} yield. Purchase costs, taxes and real rents.",
      ],
      benefits: [
        {
          title: "ROI on real rents",
          description:
            "Based on median rent of {rent} €/m² per month in {districtLoc}, occupancy and running costs.",
        },
        {
          title: "Exit planned from day one",
          description:
            "Long lets, short lets and buy-refurbish-resell modelled before you commit.",
        },
      ],
      checklist: ["ROI model with costs and taxes", "Nota Simple and charges"],
    },
    "lead-magnet": {
      name: "Free buying guide",
      propertyNoun: "property",
      propertyNounGenitive: "property",
      priceAnchor: "free – no obligation",
      highlightLabel: "PDF guide + legal check",
      ctaLabel: "Get the guide and valuation",
      h1: [
        "Free buying guide for {districtLoc} ({cityLoc}) – {year}",
        "Valuation and legal check in {districtLoc} ({cityLoc})",
      ],
      metaTitle: [
        "Free buying guide {city} ({region}) {year}",
        "Valuation and legal check – {district} {city}",
      ],
      metaDescription: [
        "Download the free guide: purchase costs in {districtLoc}, ITP/IVA, NIE and valuation. Median {price} €/m². No obligation.",
        "Planning a purchase in {cityLoc}? Get a PDF guide, a cost breakdown and an indicative valuation – free.",
      ],
      benefits: [
        {
          title: "Full cost breakdown",
          description:
            "ITP/IVA, notary, registry, lawyer, translations and NIE – with numbers for {districtLoc} at {price} €/m².",
        },
        {
          title: "Legal check without jargon",
          description:
            "What Nota Simple shows, which charges disqualify a listing, what to verify before paying arras.",
        },
      ],
      checklist: ["PDF guide with purchase costs", "Document checklist and seller questions"],
    },
  },

  process: [
    {
      title: "Budget and goal",
      description: "We agree your budget in EUR, target yield and timeline, then shortlist areas.",
      duration: "1 day",
    },
    {
      title: "Shortlist and viewings",
      description:
        "3–5 listings with €/m² against the local median; on-site or video viewings with the agent.",
      duration: "3–10 days",
    },
    {
      title: "Legal check and NIE",
      description:
        "An abogado verifies Nota Simple and charges; you obtain the NIE required to complete.",
      duration: "1–2 weeks",
    },
    {
      title: "Notary and keys",
      description:
        "Escritura at the notary, registro de la propiedad filing and handover of the keys.",
      duration: "1 day + 2–6 weeks",
    },
  ],
} satisfies LocalizedContent;

