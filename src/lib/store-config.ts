/**
 * CONFIGURACIÓN DE LA TIENDA — EDITÁ ACÁ
 * WhatsApp en formato internacional, solo dígitos (Perú: 51 + número).
 */
export const store = {
  name: "Compueconomía",
  tagline: "Tecnología al mejor precio",
  claim: "Laptops, computadoras, componentes y accesorios con garantía y soporte técnico.",
  whatsapp: "51999888777",
  phone: "+51 999 888 777",
  email: "ventas@compueconomia.pe",
  address: "Av. Los Próceres 123, Lima, Perú",
  mapsUrl: "https://maps.google.com/?q=Av.+Los+Proceres+123+Lima+Peru",
  instagram: "https://instagram.com/compueconomia",
  facebook: "https://facebook.com/compueconomia",
  currency: "S/",
  hours: [
    { days: "Lunes a Viernes", time: "9:00 a.m. – 8:00 p.m." },
    { days: "Sábados", time: "9:00 a.m. – 6:00 p.m." },
    { days: "Domingos", time: "10:00 a.m. – 2:00 p.m." },
  ],
  benefits: [
    { title: "Pago sin comisiones", text: "Coordinás por WhatsApp: Yape, Plin, transferencia o efectivo." },
    { title: "Garantía real", text: "Todos los equipos con garantía y comprobante de compra." },
    { title: "Envíos a todo el Perú", text: "Delivery en Lima el mismo día y envíos por agencia a provincias." },
    { title: "Soporte técnico", text: "Mantenimiento, upgrades y reparación con técnicos propios." },
  ],
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  specs: string[];
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  stock?: boolean;
};

export const categories = [
  "Todo",
  "Laptops",
  "PC de escritorio",
  "Monitores",
  "Componentes",
  "Accesorios",
  "Impresoras",
];
