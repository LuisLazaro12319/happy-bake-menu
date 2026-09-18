/**
 * CONFIGURACIÓN DE LA TIENDA
 * Cambiá estos datos por los de tu pastelería.
 * El número de WhatsApp va en formato internacional, solo dígitos (sin +, sin espacios).
 * Ejemplo Argentina: 5491122334455
 */
export const shop = {
  name: "Dulce Arte",
  tagline: "Pastelería y repostería artesanal",
  whatsapp: "5491122334455",
  currency: "$",
  instagram: "@dulcearte",
  email: "hola@dulcearte.com",
  address: "Av. Siempreviva 742, Barrio Centro",
  hours: [
    { days: "Martes a Viernes", time: "10:00 – 19:00" },
    { days: "Sábados", time: "10:00 – 14:00" },
    { days: "Domingos y lunes", time: "Cerrado" },
  ],
  policies: [
    "Pedidos de tortas enteras con 48 h de anticipación.",
    "Retiro en el local o envío a domicilio (costo según zona).",
    "Seña del 50 % para confirmar el pedido; el resto al retirar o recibir.",
    "Aceptamos transferencia y efectivo.",
  ],
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  sizes?: { label: string; price: number }[];
  flavors?: string[];
};

export const categories = [
  "Todo",
  "Tortas enteras",
  "Porciones",
  "Tartas dulces",
  "Postres individuales",
  "Personalizadas",
];
