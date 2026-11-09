import { MAX_GUESTS, siteConfig, type Lang } from "@/config/site";

export type LegalKind = "privacy" | "cookies" | "terms";
type LegalDoc = { title: string; sections: { heading: string; body: string }[] };

const email = siteConfig.contact.email;
const name = siteConfig.name;

export const legal: Record<LegalKind, Record<Lang, LegalDoc>> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Who we are",
          body: `${name} is a holiday apartment in Córdoba, Spain, managed by its host. For any privacy question, write to ${email}.`,
        },
        {
          heading: "What we collect",
          body: "When you send a booking request we receive your name, email, phone or WhatsApp number, travel dates, number of guests and any message you add.",
        },
        {
          heading: "Why we use it",
          body: "Only to answer your request, arrange your stay and meet the guest registration duties required by Spanish law. We never sell your data or use it for advertising.",
        },
        {
          heading: "How long we keep it",
          body: "Requests that don't become a booking are deleted within 12 months. Booking records are kept for as long as the law requires.",
        },
        {
          heading: "Your rights",
          body: `You can ask to access, correct or delete your data at any time by writing to ${email}. You may also contact the Spanish Data Protection Agency (AEPD).`,
        },
      ],
    },
    es: {
      title: "Política de privacidad",
      sections: [
        {
          heading: "Quiénes somos",
          body: `${name} es un apartamento turístico en Córdoba gestionado por su anfitrión. Para cualquier duda sobre privacidad, escribe a ${email}.`,
        },
        {
          heading: "Qué datos recogemos",
          body: "Al enviar una solicitud de reserva recibimos tu nombre, email, teléfono o WhatsApp, fechas del viaje, número de huéspedes y el mensaje que añadas.",
        },
        {
          heading: "Para qué los usamos",
          body: "Solo para responder a tu solicitud, organizar tu estancia y cumplir con el registro de viajeros que exige la ley española. Nunca vendemos tus datos ni los usamos para publicidad.",
        },
        {
          heading: "Cuánto tiempo los guardamos",
          body: "Las solicitudes que no acaban en reserva se eliminan en un plazo de 12 meses. Los datos de reservas se conservan el tiempo que exige la ley.",
        },
        {
          heading: "Tus derechos",
          body: `Puedes pedir acceso, rectificación o supresión de tus datos en cualquier momento escribiendo a ${email}. También puedes dirigirte a la Agencia Española de Protección de Datos (AEPD).`,
        },
      ],
    },
    pt: {
      title: "Política de privacidade",
      sections: [
        {
          heading: "Quem somos",
          body: `O ${name} é um apartamento de temporada em Córdoba, na Espanha, administrado pelo anfitrião. Para qualquer dúvida sobre privacidade, escreva para ${email}.`,
        },
        {
          heading: "O que coletamos",
          body: "Ao enviar um pedido de reserva, recebemos seu nome, email, telefone ou WhatsApp, datas da viagem, número de hóspedes e a mensagem que você incluir.",
        },
        {
          heading: "Para que usamos",
          body: "Apenas para responder ao seu pedido, organizar sua estadia e cumprir o registro de hóspedes exigido pela lei espanhola. Nunca vendemos seus dados nem os usamos para publicidade.",
        },
        {
          heading: "Por quanto tempo guardamos",
          body: "Pedidos que não viram reserva são apagados em até 12 meses. Os dados de reservas são mantidos pelo tempo exigido por lei.",
        },
        {
          heading: "Seus direitos",
          body: `Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo email ${email}. Também pode recorrer à Agência Espanhola de Proteção de Dados (AEPD).`,
        },
      ],
    },
  },
  cookies: {
    en: {
      title: "Cookie notice",
      sections: [
        {
          heading: "No tracking cookies",
          body: "This website doesn't use advertising or analytics cookies.",
        },
        {
          heading: "What we store on your device",
          body: "We remember your preferred language in your browser's local storage so the site opens in it next time. You can clear it from your browser settings at any time.",
        },
        {
          heading: "Third-party content",
          body: "The location map is provided by OpenStreetMap, and the WhatsApp button opens WhatsApp. These services have their own privacy policies.",
        },
      ],
    },
    es: {
      title: "Aviso de cookies",
      sections: [
        {
          heading: "Sin cookies de seguimiento",
          body: "Esta web no utiliza cookies publicitarias ni analíticas.",
        },
        {
          heading: "Qué guardamos en tu dispositivo",
          body: "Recordamos tu idioma preferido en el almacenamiento local del navegador para que la web se abra en él la próxima vez. Puedes borrarlo desde los ajustes del navegador cuando quieras.",
        },
        {
          heading: "Contenido de terceros",
          body: "El mapa lo proporciona OpenStreetMap y el botón de WhatsApp abre WhatsApp. Estos servicios tienen sus propias políticas de privacidad.",
        },
      ],
    },
    pt: {
      title: "Aviso de cookies",
      sections: [
        {
          heading: "Sem cookies de rastreamento",
          body: "Este site não usa cookies de publicidade nem de análise.",
        },
        {
          heading: "O que guardamos no seu dispositivo",
          body: "Guardamos o idioma preferido no armazenamento local do navegador para que o site abra nele da próxima vez. Você pode apagar isso nas configurações do navegador quando quiser.",
        },
        {
          heading: "Conteúdo de terceiros",
          body: "O mapa é fornecido pelo OpenStreetMap e o botão do WhatsApp abre o WhatsApp. Esses serviços têm suas próprias políticas de privacidade.",
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms",
      sections: [
        {
          heading: "Booking requests",
          body: "Sending the form is a request, not a confirmed booking. Your stay is confirmed only when the host replies to confirm dates and price.",
        },
        {
          heading: "Prices",
          body: "Prices shown are starting prices in euros and the total is an estimate. The final price is confirmed by the host before you book.",
        },
        {
          heading: "House rules",
          body: `The apartment accepts up to ${MAX_GUESTS} guests. Check-in is from 3:00 PM. Guests must provide ID for the registration required by Spanish law.`,
        },
        {
          heading: "Contact",
          body: `Questions about these terms? Write to ${email}.`,
        },
      ],
    },
    es: {
      title: "Condiciones",
      sections: [
        {
          heading: "Solicitudes de reserva",
          body: "Enviar el formulario es una solicitud, no una reserva confirmada. Tu estancia queda confirmada solo cuando el anfitrión te responde confirmando fechas y precio.",
        },
        {
          heading: "Precios",
          body: "Los precios mostrados son precios desde, en euros, y el total es orientativo. El anfitrión confirma el precio final antes de reservar.",
        },
        {
          heading: "Normas de la casa",
          body: `El apartamento admite hasta ${MAX_GUESTS} huéspedes. La entrada es a partir de las 15:00. Es obligatorio presentar documento de identidad para el registro de viajeros.`,
        },
        {
          heading: "Contacto",
          body: `¿Dudas sobre estas condiciones? Escribe a ${email}.`,
        },
      ],
    },
    pt: {
      title: "Termos",
      sections: [
        {
          heading: "Pedidos de reserva",
          body: "Enviar o formulário é um pedido, não uma reserva confirmada. Sua estadia só é confirmada quando o anfitrião responde confirmando datas e preço.",
        },
        {
          heading: "Preços",
          body: "Os preços exibidos são valores a partir de, em euros, e o total é uma estimativa. O anfitrião confirma o preço final antes da reserva.",
        },
        {
          heading: "Regras da casa",
          body: `O apartamento recebe até ${MAX_GUESTS} hóspedes. O check-in é a partir das 15h. É obrigatório apresentar documento de identidade para o registro de hóspedes exigido pela lei espanhola.`,
        },
        {
          heading: "Contato",
          body: `Dúvidas sobre estes termos? Escreva para ${email}.`,
        },
      ],
    },
  },
};
