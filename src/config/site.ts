/**
 * SINGLE SOURCE OF PROPERTY CONTENT.
 * To reuse this site for another property, edit only this file (and swap the images).
 * Every guest-facing text is given in English (en), Spanish (es) and Portuguese (pt).
 */
import {
  AirVent,
  BellRing,
  Briefcase,
  Car,
  ChefHat,
  Clock,
  Hotel,
  KeyRound,
  Landmark,
  LogOut,
  Maximize2,
  MoonStar,
  Shirt,
  Tv,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import imgStreet from "@/assets/gallery-street.jpg";
import imgLiving from "@/assets/gallery-living.jpg";
import imgBedroom from "@/assets/gallery-bedroom.jpg";
import imgBedroomTwin from "@/assets/gallery-bedroom-twin.jpg";
import imgBedroomTwin2 from "@/assets/gallery-bedroom-twin2.jpg";
import imgKitchen from "@/assets/gallery-kitchen.jpg";
import imgDining from "@/assets/gallery-dining.jpg";
import imgBathroom from "@/assets/gallery-bathroom.jpg";

export const LANGS = ["en", "es", "pt"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export type Localized = Record<Lang, string>;

/** Maximum guests accepted by the booking form. */
export const MAX_GUESTS = 6;

export type GalleryImage = { src: string; width: number; height: number; alt: Localized };

/** Replace these images with real photos. The hero image is also the first gallery photo. */
export const heroImage: GalleryImage = {
  src: imgStreet,
  width: 1600,
  height: 1072,
  alt: {
    en: "Whitewashed alley with flower pots in Córdoba's Jewish Quarter, the Mezquita bell tower at the end",
    es: "Callejuela encalada con macetas en la Judería de Córdoba y la torre de la Mezquita al fondo",
    pt: "Viela caiada com vasos de flores na Judiaria de Córdoba e a torre da Mesquita ao fundo",
  },
};

export const gallery: GalleryImage[] = [
  heroImage,
  {
    src: imgLiving,
    width: 1600,
    height: 894,
    alt: {
      en: "Bright living room with a cream sofa, a green armchair and wooden bookshelves",
      es: "Salón luminoso con sofá crema, sillón verde y estantería de madera",
      pt: "Sala clara com sofá creme, poltrona verde e estante de madeira",
    },
  },
  {
    src: imgDining,
    width: 1600,
    height: 1194,
    alt: {
      en: "Dining area with a wooden table, green chairs and a world map on the wall",
      es: "Comedor con mesa de madera, sillas verdes y un mapamundi en la pared",
      pt: "Sala de jantar com mesa de madeira, cadeiras verdes e um mapa-múndi na parede",
    },
  },
  {
    src: imgKitchen,
    width: 1600,
    height: 1194,
    alt: {
      en: "Fully equipped kitchen with oven, hob, dishwasher and washing machine",
      es: "Cocina totalmente equipada con horno, placa, lavavajillas y lavadora",
      pt: "Cozinha completa com forno, cooktop, lava-louças e máquina de lavar",
    },
  },
  {
    src: imgBedroom,
    width: 1600,
    height: 894,
    alt: {
      en: "Double bedroom with white linen, wooden panelling and tall wooden windows",
      es: "Dormitorio doble con ropa de cama blanca, zócalo de madera y ventanales de madera",
      pt: "Quarto de casal com roupa de cama branca, lambri de madeira e janelas altas de madeira",
    },
  },
  {
    src: imgBedroomTwin,
    width: 1600,
    height: 894,
    alt: {
      en: "Bedroom with two single beds, fresh towels and a balcony door",
      es: "Dormitorio con dos camas individuales, toallas limpias y puerta de balcón",
      pt: "Quarto com duas camas de solteiro, toalhas limpas e porta de varanda",
    },
  },
  {
    src: imgBedroomTwin2,
    width: 1600,
    height: 894,
    alt: {
      en: "Second twin bedroom with white linen, blue cushions and wall reading lamps",
      es: "Segundo dormitorio con dos camas, ropa blanca, cojines azules y lámparas de pared",
      pt: "Segundo quarto com duas camas, roupa branca, almofadas azuis e luminárias de parede",
    },
  },
  {
    src: imgBathroom,
    width: 1600,
    height: 1194,
    alt: {
      en: "Bathroom with bathtub and shower screen, painted tiles and a mirror",
      es: "Baño con bañera y mampara, azulejos decorados y espejo",
      pt: "Banheiro com banheira e box, azulejos decorados e espelho",
    },
  },
];

export const siteConfig = {
  slug: "sunshine-mezquita",
  name: "Sunshine Mezquita",

  seo: {
    title: {
      en: "Sunshine Mezquita | Apartment in Córdoba's Jewish Quarter",
      es: "Sunshine Mezquita | Apartamento en la Judería de Córdoba",
      pt: "Sunshine Mezquita | Apartamento na Judiaria de Córdoba",
    },
    description: {
      en: "Spacious 3-bedroom apartment steps from the Mosque-Cathedral of Córdoba. A/C, full kitchen, fast Wi-Fi. Hosted by Superhost Manuel.",
      es: "Amplio apartamento de 3 dormitorios a pocos pasos de la Mezquita-Catedral de Córdoba. Aire acondicionado, cocina completa y Wi-Fi rápido. Anfitrión: Manuel, Superhost.",
      pt: "Amplo apartamento de 3 quartos a poucos passos da Mesquita-Catedral de Córdoba. Ar-condicionado, cozinha completa e Wi-Fi rápido. Anfitrião: Manuel, Superhost.",
    },
  },

  hero: {
    headline: {
      en: "Live Córdoba, steps from the Mosque-Cathedral",
      es: "Vive Córdoba a pocos pasos de la Mezquita-Catedral",
      pt: "Viva Córdoba a poucos passos da Mesquita-Catedral",
    },
    subline: {
      en: "Spacious apartment in the Jewish Quarter · 3 bedrooms · 2 bathrooms",
      es: "Amplio apartamento en la Judería · 3 dormitorios · 2 baños",
      pt: "Apartamento amplo na Judiaria · 3 quartos · 2 banheiros",
    },
  },

  trust: { rating: 8.8, reviewCount: 211, superhost: true, yearsHosting: 10 },

  // Guest score shown as a badge on the hero. Use the REAL values from the listing.
  guestScore: {
    score: 8.8,
    locationScore: 9.9,
    reviewCount: 211,
    label: { en: "Fabulous", es: "Fabuloso", pt: "Fabuloso" } as Localized,
    reviews: { en: "reviews", es: "valoraciones", pt: "avaliações" } as Localized,
    location: { en: "Location", es: "Ubicación", pt: "Localização" } as Localized,
  },

  facts: { bedrooms: 3, bathrooms: 2, beds: 7 },

  highlights: [
    {
      icon: Landmark as LucideIcon,
      title: {
        en: "In the heart of the old town",
        es: "En pleno casco antiguo",
        pt: "No coração do centro histórico",
      },
      text: {
        en: "A few steps from the Mezquita, surrounded by historic alleys, flower-filled patios and local taverns.",
        es: "A pocos pasos de la Mezquita, rodeado de callejuelas históricas, patios llenos de flores y tabernas de toda la vida.",
        pt: "A poucos passos da Mesquita, cercado de vielas históricas, pátios floridos e tabernas locais.",
      },
    },
    {
      icon: AirVent as LucideIcon,
      title: {
        en: "Air-conditioning and full kitchen",
        es: "Aire acondicionado y cocina completa",
        pt: "Ar-condicionado e cozinha completa",
      },
      text: {
        en: "A/C in every room, and a kitchen to cook at home after long days exploring the city.",
        es: "Aire acondicionado en todas las estancias y una cocina para preparar la cena en casa después de un largo día descubriendo la ciudad.",
        pt: "Ar-condicionado em todos os cômodos e uma cozinha para preparar o jantar em casa depois de um longo dia explorando a cidade.",
      },
    },
    {
      icon: Maximize2 as LucideIcon,
      title: {
        en: "Praised for location and space",
        es: "Valorado por su ubicación y amplitud",
        pt: "Elogiado pela localização e pelo espaço",
      },
      text: {
        en: "Guests love the unbeatable location and the spacious layout — room for everyone to spread out.",
        es: "A los huéspedes les encanta su ubicación inmejorable y lo amplio que es: hay sitio para todos.",
        pt: "Os hóspedes adoram a localização imbatível e o espaço generoso — tem lugar para todo mundo.",
      },
    },
  ],

  about: {
    paragraphs: [
      {
        en: "Sunshine Mezquita is a bright, spacious home in the Jewish Quarter, made for groups of friends and families who come to Córdoba for its culture, a proper rest and very good food.",
        es: "Sunshine Mezquita es una casa amplia y luminosa en la Judería, pensada para grupos de amigos y familias que vienen a Córdoba buscando cultura, descanso y muy buena comida.",
        pt: "O Sunshine Mezquita é um apartamento amplo e iluminado na Judiaria, pensado para grupos de amigos e famílias que vêm a Córdoba atrás de cultura, descanso e comida muito boa.",
      },
      {
        en: "Step outside and you're in a maze of whitewashed alleys, hidden patios and tapas bars; come back to cool rooms, fast Wi-Fi and everything you need for an unforgettable stay.",
        es: "Al salir por la puerta te encuentras un laberinto de calles encaladas, patios escondidos y bares de tapas; al volver, habitaciones frescas, Wi-Fi rápido y todo lo necesario para una estancia inolvidable.",
        pt: "Saindo pela porta, você está num labirinto de vielas brancas, pátios escondidos e bares de tapas; na volta, quartos fresquinhos, Wi-Fi rápido e tudo o que precisa para uma estadia inesquecível.",
      },
    ],
  },

  rooms: [
    {
      kind: "bed" as const,
      name: { en: "Bedroom 1", es: "Dormitorio 1", pt: "Quarto 1" },
      beds: { en: "2 single beds", es: "2 camas individuales", pt: "2 camas de solteiro" },
    },
    {
      kind: "bed" as const,
      name: { en: "Bedroom 2", es: "Dormitorio 2", pt: "Quarto 2" },
      beds: { en: "2 single beds", es: "2 camas individuales", pt: "2 camas de solteiro" },
    },
    {
      kind: "bed" as const,
      name: { en: "Bedroom 3", es: "Dormitorio 3", pt: "Quarto 3" },
      beds: { en: "2 single beds", es: "2 camas individuales", pt: "2 camas de solteiro" },
    },
    {
      kind: "sofa" as const,
      name: { en: "Living room", es: "Salón", pt: "Sala de estar" },
      beds: { en: "1 sofa bed", es: "1 sofá cama", pt: "1 sofá-cama" },
    },
  ],
  sleepingNote: {
    en: "Ideal for groups who prefer single beds.",
    es: "Ideal para grupos que prefieren camas individuales.",
    pt: "Ideal para grupos que preferem camas de solteiro.",
  },

  amenities: [
    { icon: ChefHat as LucideIcon, label: { en: "Full kitchen", es: "Cocina completa", pt: "Cozinha completa" } },
    { icon: Wifi as LucideIcon, label: { en: "Fast Wi-Fi", es: "Wi-Fi rápido", pt: "Wi-Fi rápido" } },
    {
      icon: Briefcase as LucideIcon,
      label: { en: "Dedicated workspace", es: "Zona de trabajo", pt: "Espaço de trabalho" },
    },
    { icon: Tv as LucideIcon, label: { en: "TV", es: "Televisión", pt: "TV" } },
    {
      icon: Shirt as LucideIcon,
      label: { en: "Washing machine", es: "Lavadora", pt: "Máquina de lavar" },
    },
    {
      icon: AirVent as LucideIcon,
      label: { en: "Air-conditioning", es: "Aire acondicionado", pt: "Ar-condicionado" },
    },
    {
      icon: BellRing as LucideIcon,
      label: { en: "Smoke alarm", es: "Detector de humo", pt: "Detector de fumaça" },
    },
  ],

  location: {
    area: {
      en: "Jewish Quarter, Córdoba",
      es: "Judería, Córdoba",
      pt: "Judiaria, Córdoba",
    },
    /** Approximate centre of the area (not the exact address). */
    lat: 37.8796,
    lng: -4.7812,
    radiusMeters: 260,
    zoom: 16,
    region: "Andalusia",
    country: "ES",
    nearby: [
      {
        icon: Landmark as LucideIcon,
        label: { en: "Mosque-Cathedral", es: "Mezquita-Catedral", pt: "Mesquita-Catedral" },
        detail: { en: "A few minutes' walk", es: "A pocos minutos a pie", pt: "A poucos minutos a pé" },
      },
      {
        icon: MoonStar as LucideIcon,
        label: { en: "Historic alleys", es: "Callejuelas históricas", pt: "Vielas históricas" },
        detail: { en: "Right outside the door", es: "Nada más salir", pt: "Logo na porta" },
      },
      {
        icon: Hotel as LucideIcon,
        label: { en: "Flower patios", es: "Patios cordobeses", pt: "Pátios floridos" },
        detail: { en: "All around the quarter", es: "Por todo el barrio", pt: "Por todo o bairro" },
      },
      {
        icon: UtensilsCrossed as LucideIcon,
        label: { en: "Local taverns", es: "Tabernas locales", pt: "Tabernas locais" },
        detail: { en: "Salmorejo around the corner", es: "Salmorejo a la vuelta de la esquina", pt: "Salmorejo na esquina" },
      },
    ],
  },

  reviews: {
    overall: 8.8,
    count: 211,
    // Scale 0-10 (Booking). Only "Location" (9.9) comes from the real listing;
    // the others are the old placeholders doubled — replace with the real subscores.
    categories: [
      { label: { en: "Cleanliness", es: "Limpieza", pt: "Limpeza" }, score: 9.6 },
      { label: { en: "Accuracy", es: "Veracidad", pt: "Precisão" }, score: 9.0 },
      { label: { en: "Check-in", es: "Llegada", pt: "Check-in" }, score: 9.4 },
      { label: { en: "Communication", es: "Comunicación", pt: "Comunicação" }, score: 9.2 },
      { label: { en: "Location", es: "Ubicación", pt: "Localização" }, score: 9.9 },
      { label: { en: "Value", es: "Calidad-precio", pt: "Custo-benefício" }, score: 9.6 },
    ],
    quotes: [
      {
        author: "Meghan",
        text: {
          en: "Unbeatable location. Really comfortable sofas.",
          es: "Ubicación inmejorable. Los sofás son comodísimos.",
          pt: "Localização imbatível. Sofás muito confortáveis.",
        },
      },
      {
        author: "Samuel",
        text: {
          en: "Spacious, clean and comfortable.",
          es: "Amplio, limpio y cómodo.",
          pt: "Espaçoso, limpo e confortável.",
        },
      },
    ],
  },

  goodToKnow: [
    {
      icon: Clock as LucideIcon,
      title: { en: "Check-in after 3:00 PM", es: "Entrada a partir de las 15:00", pt: "Check-in a partir das 15h" },
      text: {
        en: "Arrive any time from 3:00 PM onwards.",
        es: "Puedes llegar a cualquier hora a partir de las 15:00.",
        pt: "Você pode chegar a qualquer hora a partir das 15h.",
      },
    },
    {
      icon: KeyRound as LucideIcon,
      title: {
        en: "Keys at Hotel Marisa",
        es: "Llaves en el Hotel Marisa",
        pt: "Chaves no Hotel Marisa",
      },
      text: {
        en: "Collect your keys at the nearby Hotel Marisa. Their staff are also on hand to help during your stay.",
        es: "Recoges las llaves en el cercano Hotel Marisa, cuyo personal también te ayuda con lo que necesites durante la estancia.",
        pt: "Você retira as chaves no Hotel Marisa, bem pertinho. A equipe do hotel também ajuda no que precisar durante a estadia.",
      },
    },
    {
      icon: LogOut as LucideIcon,
      title: { en: "Quick check-out", es: "Salida sencilla", pt: "Check-out rápido" },
      text: {
        en: "No complicated checklists — just leave the keys and go.",
        es: "Sin listas complicadas: dejas las llaves y listo.",
        pt: "Sem complicação: é só deixar as chaves e pronto.",
      },
    },
    {
      icon: Car as LucideIcon,
      title: {
        en: "Pedestrian historic area",
        es: "Zona histórica peatonal",
        pt: "Área histórica de pedestres",
      },
      text: {
        en: "Cars can't reach the door (authorised vehicles only). A garage is a short walk away.",
        es: "Los coches no llegan hasta la puerta (solo vehículos autorizados). Hay un garaje a un paseo corto.",
        pt: "Carros não chegam até a porta (só veículos autorizados). Há uma garagem a uma curta caminhada.",
      },
    },
    {
      icon: MoonStar as LucideIcon,
      title: { en: "Some street noise at night", es: "Algo de ruido por la noche", pt: "Algum barulho à noite" },
      text: {
        en: "As in any central historic location, you may hear the street in the evening.",
        es: "Como en cualquier zona céntrica e histórica, por la noche puede oírse algo de la calle.",
        pt: "Como em qualquer região central e histórica, à noite dá para ouvir um pouco da rua.",
      },
    },
  ],

  host: {
    name: "Manuel",
    superhost: true,
    yearsHosting: 10,
    reviewCount: 211,
    rating: 8.8,
    responseRate: 98,
    responseTime: {
      en: "within 1 hour",
      es: "en menos de 1 hora",
      pt: "em até 1 hora",
    },
    bio: {
      en: "I've been welcoming guests to Córdoba for ten years. I'm happy to share my favourite taverns, the best time to visit the Mezquita and the patios most visitors miss.",
      es: "Llevo diez años recibiendo huéspedes en Córdoba. Te cuento encantado mis tabernas favoritas, la mejor hora para visitar la Mezquita y los patios que casi nadie conoce.",
      pt: "Recebo hóspedes em Córdoba há dez anos. Adoro indicar minhas tabernas favoritas, o melhor horário para visitar a Mesquita e os pátios que quase ninguém conhece.",
    },
  },

  pricing: {
    currency: "EUR",
    /** Starting nightly price in euros. */
    pricePerNight: 140,
    /** One-off cleaning fee in euros. */
    cleaningFee: 60,
  },

  contact: {
    email: "hello@sunshinemezquita.com",
    /** WhatsApp number in international format, digits only. */
    whatsapp: "34600000000",
    phoneDisplay: "+34 600 000 000",
    whatsappMessage: {
      en: "Hi Manuel! I found Sunshine Mezquita and I'd like to check availability for my dates.",
      es: "¡Hola Manuel! He visto Sunshine Mezquita y me gustaría consultar disponibilidad para mis fechas.",
      pt: "Oi, Manuel! Vi o Sunshine Mezquita e gostaria de consultar a disponibilidade para as minhas datas.",
    },
  },

  legal: {
    regional: "VFT/CO/02548",
    national: "ESFCTU0000140210002190110000000000000000VUT/CO/025486",
  },
};

export type SiteConfig = typeof siteConfig;
