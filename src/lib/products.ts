import tortaChocolate from "@/assets/torta-chocolate.jpg";
import tortaPersonalizada from "@/assets/torta-personalizada.jpg";
import porcionRedVelvet from "@/assets/porcion-red-velvet.jpg";
import tartaFrutilla from "@/assets/tarta-frutilla.jpg";
import lemonPie from "@/assets/lemon-pie.jpg";
import postreIndividual from "@/assets/postre-individual.jpg";
import alfajores from "@/assets/alfajores.jpg";
import type { Product } from "./shop-config";

export const products: Product[] = [
  {
    id: "torta-chocolate",
    name: "Torta de chocolate intenso",
    category: "Tortas enteras",
    description:
      "Bizcochuelo húmedo de cacao puro, relleno de ganache y terminada con virutas de chocolate semiamargo.",
    price: 18000,
    image: tortaChocolate,
    sizes: [
      { label: "8 porciones (16 cm)", price: 18000 },
      { label: "12 porciones (20 cm)", price: 25000 },
      { label: "20 porciones (24 cm)", price: 36000 },
    ],
    flavors: ["Ganache clásico", "Con dulce de leche", "Con frambuesa"],
  },
  {
    id: "lemon-pie",
    name: "Lemon pie con merengue",
    category: "Tartas dulces",
    description:
      "Masa sablée crocante, curd de limón natural y merengue italiano tostado a mano.",
    price: 14500,
    image: lemonPie,
    sizes: [
      { label: "Tarta chica (6 porciones)", price: 14500 },
      { label: "Tarta grande (10 porciones)", price: 21000 },
    ],
  },
  {
    id: "tarta-frutilla",
    name: "Tarta de frutillas y crema pastelera",
    category: "Tartas dulces",
    description:
      "Frutillas frescas glaseadas sobre crema pastelera de vainilla y base de masa quebrada.",
    price: 16000,
    image: tartaFrutilla,
    sizes: [
      { label: "Tarta chica (6 porciones)", price: 16000 },
      { label: "Tarta grande (10 porciones)", price: 23000 },
    ],
  },
  {
    id: "porcion-red-velvet",
    name: "Porción de red velvet",
    category: "Porciones",
    description:
      "Capas de bizcocho red velvet con frosting de queso crema. Lista para llevar.",
    price: 3800,
    image: porcionRedVelvet,
    sizes: [
      { label: "1 porción", price: 3800 },
      { label: "Pack de 4 porciones", price: 14000 },
    ],
  },
  {
    id: "postre-individual",
    name: "Postre en frasco de dulce de leche",
    category: "Postres individuales",
    description:
      "Capas de crumble, crema batida y dulce de leche repostero en frasco de vidrio.",
    price: 4200,
    image: postreIndividual,
    sizes: [
      { label: "1 frasco", price: 4200 },
      { label: "Pack de 6", price: 23000 },
    ],
    flavors: ["Dulce de leche", "Chocolate", "Maracuyá"],
  },
  {
    id: "alfajores",
    name: "Caja de alfajores y mini pastelería",
    category: "Postres individuales",
    description:
      "Selección de alfajores de maicena, tartaletas y bocaditos artesanales para compartir.",
    price: 12000,
    image: alfajores,
    sizes: [
      { label: "Caja de 6", price: 12000 },
      { label: "Caja de 12", price: 21000 },
    ],
  },
  {
    id: "torta-personalizada",
    name: "Torta personalizada",
    category: "Personalizadas",
    description:
      "Diseñamos tu torta para cumpleaños, casamientos o eventos: colores, flores naturales y sabores a elección.",
    price: 30000,
    image: tortaPersonalizada,
    sizes: [
      { label: "12 porciones", price: 30000 },
      { label: "20 porciones", price: 42000 },
      { label: "2 pisos (35 porciones)", price: 68000 },
    ],
    flavors: ["Vainilla y frutos rojos", "Chocolate y dulce de leche", "Limón y merengue", "A definir juntos"],
  },
];
