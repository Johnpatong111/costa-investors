import type { Dictionary } from "../types";

export const es = {
  meta: {
    titleTemplate: "{title} | Costa Investors",
    defaultTitle: "Inmobiliaria en España para compradores internacionales",
    defaultDescription:
      "Apartamentos, villas y propiedades de inversión en Costa Blanca y Costa Cálida. Precios €/m², rentabilidad, gastos de compra y agente certificado.",
  },
  nav: {
    services: "Servicios",
    locations: "Ubicaciones",
    reports: "Informes de precios",
    about: "Sobre nosotros",
    language: "Idioma",
    call: "Llámanos",
  },
  form: {
    heading: "Encuentra tu propiedad con un agente en 24 h",
    subheading:
      "Cuéntanos tus preferencias: un agente certificado te contactará con ofertas seleccionadas.",
    stepProperty: "Propiedad",
    stepContact: "Contacto",
    stepLabel: "paso {step}/2",
    next: "Siguiente. Datos de contacto",
    back: "Atrás",
    submit: "Enviar y recibir ofertas",
    sending: "Enviando…",
    summaryEdit: "Cambiar",
    details: "Añadir detalles (opcional)",
    consent:
      "Acepto ser contactado por teléfono, WhatsApp o correo electrónico y que mis datos se compartan con nuestra agencia inmobiliaria asociada en España para preparar una oferta de compra.",
    marketing: "Quiero recibir nuevas ofertas y análisis de mercado (opcional).",
    labels: {
      goal: "Objetivo de compra",
      propertyType: "Tipo de propiedad",
      horizon: "¿Cuándo compras?",
      budget: "Presupuesto (EUR)",
      name: "Nombre y apellidos",
      phone: "Teléfono / WhatsApp",
      email: "Correo electrónico (opcional. Enviamos un PDF)",
      city: "Localidad",
      district: "Zona / urbanización",
      contactMethod: "Forma de contacto preferida",
      message: "Información adicional",
    },
    errors: {
      required: "Este campo es obligatorio",
      phone: "Introduce un número válido (8-15 dígitos, prefijo internacional permitido)",
      email: "Introduce un correo electrónico válido",
      budget: "Introduce tu presupuesto en EUR (p. Ej. 250 000)",
      generic: "No hemos podido enviar tu solicitud. Inténtalo de nuevo o llámanos.",
      network: "Sin conexión. Comprueba tu internet e inténtalo de nuevo.",
    },
  },
  calculator: {
    eyebrow: "Calculadora de rentabilidad",
    title: "¿Cuánto te dará {location}?",
    budgetLegend: "Presupuesto de inversión",
    exactAmount: "Importe exacto (EUR)",
    areaHint: "Con este presupuesto compras unos {area} m² · gastos de compra (aprox. 13,5%): {costs}",
    annualRent: "Alquiler anual",
    netRent: "neto aprox. {value}",
    return5y: "Retorno 5 años",
    ofBudget: "{percent}% del presupuesto",
    value5y: "Valor previsto en 5 años: {value}",
    cta: "Quiero ofertas para este presupuesto",
    disclaimer:
      "Estimación basada en medianas de mercado. No garantiza rentabilidad ni constituye una oferta de inversión.",
  },
  success: {
    title: "¡Gracias, {name}!",
    body:
      "Hemos enviado tu solicitud a nuestra agencia inmobiliaria asociada en España. Un agente certificado te contactará en {phone} en un plazo de 24 horas.",
    summary: "Tu solicitud",
    budget: "Presupuesto: {value}",
    rent: "alquiler previsto: {value}/año",
    call: "Llamar ahora",
    reset: "Nueva solicitud",
    sla: "Tiempo medio de envío del lead a la agencia: 8 minutos.",
    steps: [
      {
        q: "Verificación en 30 minutos",
        a: "Revisamos tu presupuesto y preferencias y te asignamos un agente de la zona.",
      },
      {
        q: "Contacto del agente en 24 h",
        a: "El agente te llama o escribe por WhatsApp con 3-5 ofertas ajustadas.",
      },
      {
        q: "Visitas y revisión legal",
        a: "Visita presencial o por vídeo y después verificación de la Nota Simple.",
      },
    ],
  },
  legal: {
    nie: {
      q: "¿Necesito NIE para comprar una propiedad en España?",
      a: "Sí. El NIE (Número de Identificación de Extranjero) es obligatorio ante notario y para los impuestos. Se solicita en persona en España o por poder notarial; suele tardar de 1 a 3 semanas.",
    },
    itp: {
      q: "¿Qué impuestos se pagan al comprar?",
      a: "En vivienda de segunda mano, ITP del 10% (Comunidad Valenciana y Murcia). En obra nueva, IVA del 10% más AJD. Con notaría y abogado, calcula un 13-14% del precio. Además: IBI anual e IRPF sobre el alquiler.",
    },
    residency: {
      q: "¿Comprar una propiedad da derecho de residencia?",
      a: "La 'Golden Visa' ligada a la compra de vivienda ya no existe. La residencia se obtiene por otras vías (trabajo, actividad económica o rentas pasivas con visado no lucrativo). La compra por sí sola no otorga residencia.",
    },
  },
  seo: {
    districtTitle: "Propiedades en venta en {district} ({city}) | Costa Investors",
    districtDescription:
      "Propiedades en {districtLoc}: mediana {price} €/m², rentabilidad {yield}, crecimiento {growth} interanual. Ofertas, gastos de compra y agente.",
    cityTitle: "Propiedades en {city} | precios, rentabilidad y ofertas",
    cityDescription:
      "Precios en {cityLoc}: mediana {price} €/m², rentabilidad {yield}. Compara zonas, revisa gastos y habla con un agente en 24 h.",
  },
} satisfies Dictionary;
