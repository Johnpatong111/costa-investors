import type { Dictionary } from "../types";

export const en = {
  meta: {
    titleTemplate: "{title} | Costa Investors",
    defaultTitle: "Property in Spain for international buyers",
    defaultDescription:
      "Apartments, villas and investment properties on the Costa Blanca and Costa Cálida. €/m² prices, ROI, purchase costs and a certified English-speaking agent.",
  },
  nav: {
    services: "Services",
    locations: "Locations",
    reports: "Price reports",
    about: "About us",
    language: "Language",
    call: "Call us",
  },
  form: {
    heading: "Find your property with an English-speaking agent in 24h",
    subheading:
      "Tell us your preferences – a certified agent will come back with matched listings.",
    stepProperty: "Property",
    stepContact: "Contact",
    stepLabel: "step {step}/2",
    next: "Next – contact details",
    back: "Back",
    submit: "Send and get my offers",
    sending: "Sending…",
    summaryEdit: "Change",
    details: "Add details (optional)",
    consent:
      "I agree to be contacted by phone, WhatsApp or email and to my data being shared with our partner real estate agency in Spain for the purpose of preparing a purchase offer.",
    marketing: "Send me new listings and market analyses (optional).",
    labels: {
      goal: "Purchase goal",
      propertyType: "Property type",
      horizon: "When are you buying?",
      budget: "Budget (EUR)",
      name: "Full name",
      phone: "Phone / WhatsApp",
      email: "Email (optional – we'll send a PDF analysis)",
      city: "Location",
      district: "Area / urbanisation",
      contactMethod: "Preferred contact method",
      message: "Additional information",
    },
    errors: {
      required: "This field is required",
      phone: "Enter a valid number (8–15 digits, international prefix allowed)",
      email: "Enter a valid email address",
      budget: "Enter your budget in EUR (e.g. 250 000)",
      generic: "We couldn't send your enquiry. Please try again or call us.",
      network: "No connection. Check your internet and try again.",
    },
  },
  calculator: {
    eyebrow: "ROI calculator",
    title: "What will {location} earn you?",
    budgetLegend: "Investment budget",
    exactAmount: "Exact amount (EUR)",
    areaHint: "This budget buys about {area} m² · purchase costs (approx. 13.5%): {costs}",
    annualRent: "Annual rent",
    netRent: "net approx. {value}",
    return5y: "5-year return",
    ofBudget: "{percent}% of budget",
    value5y: "Projected value in 5 years: {value}",
    cta: "Get offers for this budget",
    disclaimer:
      "Estimate based on market medians. Not a guarantee of return and not an investment offer.",
  },
  success: {
    title: "Thank you, {name}!",
    body:
      "We have passed your enquiry to our partner real estate agency in Spain. A certified agent will contact you on {phone} within 24 hours.",
    summary: "Your enquiry",
    budget: "Budget: {value}",
    rent: "projected rent: {value}/year",
    call: "Call now",
    reset: "New enquiry",
    sla: "Average time to hand a lead to the agency: 8 minutes.",
    steps: [
      {
        q: "Verification in 30 minutes",
        a: "We check your budget and preferences and match you with an agent covering the area.",
      },
      {
        q: "Agent contact within 24h",
        a: "An English-speaking agent calls or messages you on WhatsApp with 3–5 matched listings.",
      },
      {
        q: "Viewings and legal check",
        a: "Video or on-site viewing, followed by a Nota Simple verification.",
      },
    ],
  },
  legal: {
    nie: {
      q: "Do I need an NIE number to buy property in Spain?",
      a: "Yes. The NIE (Número de Identificación de Extranjero) is required at the notary and for tax purposes. You apply in person in Spain or through a power of attorney – usually 1–3 weeks.",
    },
    itp: {
      q: "What taxes apply when buying?",
      a: "Resale properties: ITP 10% (Comunidad Valenciana and Murcia). New builds: 10% VAT plus AJD duty. Including notary and legal fees, budget around 13–14% of the price. Annual costs: IBI property tax and rental income tax.",
    },
    residency: {
      q: "Does buying property give me residency?",
      a: "The property-based 'Golden Visa' has been abolished. Residency is obtained on other grounds (work, business, or passive income under the non-lucrative visa). A purchase alone does not grant residency.",
    },
  },
  seo: {
    districtTitle: "Property for sale in {district} ({city}) | Costa Investors",
    districtDescription:
      "Property in {districtLoc}: median {price} €/m², ROI {yield}, {growth} growth y/y. Listings, purchase costs and an English-speaking agent.",
    cityTitle: "Property in {city} | prices, ROI and listings",
    cityDescription:
      "Property prices in {cityLoc}: median {price} €/m², ROI {yield}. Compare areas, check purchase costs and speak to an agent within 24h.",
  },
} satisfies Dictionary;
