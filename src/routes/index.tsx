import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Minus,
  Mountain,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/machupicchu-hero.jpg";
import broasterImage from "@/assets/pollo-broaster.jpg";
import tallarinesImage from "@/assets/tallarines-verdes.jpg";
import ajiImage from "@/assets/aji-gallina.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Machupicchu Restaurant | Comida peruana en Villa Celina" },
      {
        name: "description",
        content:
          "Pollo broaster, milanesas, tallarines y platos peruanos en Villa Celina. Armá tu pedido y envialo por WhatsApp.",
      },
      { property: "og:title", content: "Machupicchu Restaurant | Auténtica comida peruana" },
      {
        property: "og:description",
        content: "Sabor peruano casero en Villa Celina. Pedí para retirar o por delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestaurantPage,
});

const WHATSAPP = "5491139083385";
const PHONE_DISPLAY = "011 3908-3385";
const ADDRESS = "Olavarría 2835, Villa Celina";

type Category = "TODO" | "POLLOS Y CARNES" | "PASTAS" | "SOPAS Y CALDOS";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "TODO">;
  image?: string;
  popular?: boolean;
};

type CartItem = MenuItem & { quantity: number };

const categories: Category[] = ["TODO", "POLLOS Y CARNES", "PASTAS", "SOPAS Y CALDOS"];

const menu: MenuItem[] = [
  { id: "pollo-broaster", name: "Pollo Broaster", description: "Con papas doradas, ensalada fresca y arroz.", price: 5200, category: "POLLOS Y CARNES", image: broasterImage, popular: true },
  { id: "bife-plancha", name: "Bife a la Plancha", description: "Con papas, ensalada y arroz.", price: 5600, category: "POLLOS Y CARNES" },
  { id: "pollo-plancha", name: "Pollo a la Plancha", description: "Con papas, ensalada y arroz.", price: 5200, category: "POLLOS Y CARNES" },
  { id: "milanesa-carne", name: "Milanesa de Carne", description: "Crocante, con papas, ensalada y arroz.", price: 5400, category: "POLLOS Y CARNES" },
  { id: "milanesa-pollo", name: "Milanesa de Pollo", description: "Con papas, ensalada y arroz.", price: 5200, category: "POLLOS Y CARNES" },
  { id: "salchipapa", name: "Salchipapa", description: "Salchichas doradas y papas fritas.", price: 3800, category: "POLLOS Y CARNES" },
  { id: "mostrito-brasa", name: "Mostrito a la Brasa", description: "Cerdo a la brasa, receta de la casa.", price: 5600, category: "POLLOS Y CARNES" },
  { id: "mostrito-broaster", name: "Mostrito Broaster", description: "Cerdo crocante estilo broaster.", price: 5600, category: "POLLOS Y CARNES" },
  { id: "tallarines-bife", name: "Tallarines Verdes con Bife", description: "Salsa verde cremosa y bife a la plancha.", price: 5800, category: "PASTAS", image: tallarinesImage, popular: true },
  { id: "tallarines-pollo", name: "Tallarines Verdes con Pollo", description: "Salsa verde a la huancaína con pollo.", price: 5400, category: "PASTAS" },
  { id: "huancaina-lomo", name: "Tallarines a la Huancaína", description: "Con lomo salteado y salsa de ají amarillo.", price: 6000, category: "PASTAS" },
  { id: "caldo-gallina", name: "Caldo de Gallina", description: "Caldo casero, abundante y bien caliente.", price: 4200, category: "SOPAS Y CALDOS" },
  { id: "caldo-mote", name: "Caldo de Mote", description: "Con mote y presa de gallina.", price: 4200, category: "SOPAS Y CALDOS" },
  { id: "sopa-sustancia", name: "Sopa Sustancia", description: "Sopa criolla bien reconfortante.", price: 3900, category: "SOPAS Y CALDOS" },
  { id: "sopa-minuta", name: "Sopa a la Minuta", description: "Fideos, carne y verduras al momento.", price: 3900, category: "SOPAS Y CALDOS" },
];

const dailyMenu = [
  { name: "Parihuela", description: "Sopa de mariscos bien caliente, estilo casa.", price: 6500 },
  { name: "Arroz con Pollo", description: "Arroz verde con pollo y su toque de cerveza negra.", price: 5800 },
  { name: "Lomo Saltado", description: "Bife salteado con cebolla, tomate, papas y arroz.", price: 6200 },
  { name: "Ají de Gallina", description: "Pollo en crema de ají amarillo, con arroz y papa.", price: 5900 },
  { name: "Seco de Res", description: "Carne a fuego lento con cilantro, frejoles y arroz.", price: 6100 },
  { name: "Escabeche de Pollo", description: "Pollo frito con salsa de cebolla, ají y camote.", price: 5900 },
  { name: "Cau Cau", description: "Guiso peruano con papas, arvejas y hierbabuena.", price: 6000 },
];

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const formatPrice = (price: number) => `$${price.toLocaleString("es-AR")}`;

function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("TODO");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [delivery, setDelivery] = useState<"Retiro" | "Delivery">("Retiro");
  const [dayIndex, setDayIndex] = useState(5);

  useEffect(() => setDayIndex(new Date().getDay()), []);

  const visibleMenu = useMemo(
    () => activeCategory === "TODO" ? menu : menu.filter((item) => item.category === activeCategory),
    [activeCategory],
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const today = dailyMenu[dayIndex] ?? dailyMenu[5];

  const addItem = (item: MenuItem) => {
    setCart((current) => {
      const found = current.find((entry) => entry.id === item.id);
      if (found) return current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry);
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const subtractItem = (id: string) => {
    setCart((current) => current.flatMap((entry) => {
      if (entry.id !== id) return [entry];
      return entry.quantity > 1 ? [{ ...entry, quantity: entry.quantity - 1 }] : [];
    }));
  };

  const dailyItem: MenuItem = {
    id: `daily-${dayIndex}`,
    name: `Menú del día: ${today.name}`,
    description: today.description,
    price: today.price,
    category: "POLLOS Y CARNES",
    image: dayIndex === 3 ? ajiImage : undefined,
  };

  const sendOrder = () => {
    if (!cart.length) return;
    const lines = cart.map((item) => `• ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}`).join("\n");
    const message = [
      "*NUEVO PEDIDO — MACHUPICCHU RESTAURANT*",
      "",
      lines,
      "",
      `*TOTAL: ${formatPrice(total)}*`,
      "",
      `Nombre: ${name.trim() || "-"}`,
      `Modalidad: ${delivery}`,
      notes.trim() ? `Notas / dirección: ${notes.trim()}` : "",
      "",
      "Quisiera confirmar disponibilidad, pago y horario. ¡Gracias!",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Machupicchu Restaurant, inicio">
            <span className="flex size-9 items-center justify-center rounded-sm bg-primary text-primary-foreground"><Mountain className="size-5" /></span>
            <span className="font-display text-lg font-semibold leading-none sm:text-xl">Machupicchu <span className="hidden text-primary sm:inline">Restaurant</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#dia" className="transition-colors hover:text-foreground">Menú del día</a>
            <a href="#carta" className="transition-colors hover:text-foreground">Carta</a>
            <a href="#pedido" className="transition-colors hover:text-foreground">Tu pedido</a>
            <a href="#contacto" className="transition-colors hover:text-foreground">Contacto</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="relative" aria-label="Ver pedido">
              <a href="#pedido"><ShoppingBag />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{itemCount}</span>}</a>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="tel:+541139083385"><Phone /> Llamar</a>
            </Button>
          </div>
        </div>
      </header>

      <section id="inicio" className="relative flex min-h-[92svh] items-end pt-18">
        <img src={heroImage} alt="Mesa con platos peruanos de Machupicchu Restaurant" width={1920} height={1080} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-20">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-highlight"><Sparkles className="size-4" /> Cocina peruana en Villa Celina</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.96] text-hero-foreground sm:text-7xl lg:text-8xl">Sabor de Perú,<br /><em className="font-normal text-highlight">cerca de casa.</em></h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-hero-muted sm:text-lg">Platos abundantes, recetas caseras y ese sabor que te hace volver. Pedí para retirar o recibir en tu casa.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-6">
                <a href="#carta">Ver la carta <ArrowDown /></a>
              </Button>
              <Button asChild variant="hero" size="lg" className="h-12 px-6">
                <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, quiero hacer un pedido")}`} target="_blank" rel="noreferrer">Pedir por WhatsApp <ChevronRight /></a>
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-3 text-sm text-hero-muted sm:flex-row sm:gap-7">
              <span className="flex items-center gap-2"><Clock3 className="size-4 text-highlight" /> Abierto hasta las 23:00</span>
              <span className="flex items-center gap-2"><MapPin className="size-4 text-highlight" /> {ADDRESS}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="dia" className="border-b border-border bg-secondary py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="section-kicker">Especial de hoy · {dayNames[dayIndex]}</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Un plato distinto<br />cada día.</h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Cocinado en el día, hasta agotar stock. Consultanos por WhatsApp para confirmar disponibilidad.</p>
            </div>
            <article className="grid overflow-hidden rounded-md border border-border bg-card shadow-editorial sm:grid-cols-[220px_1fr]">
              <img src={ajiImage} alt="Plato peruano casero del día" loading="lazy" width={1024} height={1024} className="h-56 w-full object-cover sm:h-full" />
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{new Date(2026, 8, 18).getDate()} · {dayNames[dayIndex]}</span>
                <h3 className="mt-3 font-display text-3xl font-semibold">{today.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{today.description}</p>
                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <strong className="font-display text-2xl">{formatPrice(today.price)}</strong>
                  <Button onClick={() => addItem(dailyItem)}><Plus /> Agregar</Button>
                </div>
              </div>
            </article>
          </div>
          <p className="mt-4 text-right text-xs text-muted-foreground">Menú y precios de demostración sujetos a disponibilidad.</p>
        </div>
      </section>

      <section id="carta" className="py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="section-kicker">La carta</p>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Elegí tu favorito</h2>
              <p className="mt-3 text-muted-foreground">Tocá el precio para sumarlo a tu pedido.</p>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-2" aria-label="Categorías del menú">
              {categories.map((category) => (
                <Button key={category} variant={activeCategory === category ? "default" : "outline"} size="sm" className="shrink-0" onClick={() => setActiveCategory(category)}>{category}</Button>
              ))}
            </div>
          </div>

          {activeCategory === "TODO" && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {menu.filter((item) => item.popular).map((item) => (
                <article key={item.id} className="group grid min-h-72 overflow-hidden rounded-md border border-border bg-card sm:grid-cols-[0.9fr_1.1fr]">
                  <img src={item.image} alt={item.name} loading="lazy" width={1024} height={1024} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-full" />
                  <div className="flex flex-col justify-between p-6">
                    <div><span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Favorito de la casa</span><h3 className="mt-3 font-display text-2xl font-semibold">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>
                    <div className="mt-6 flex items-center justify-between"><strong className="font-display text-xl">{formatPrice(item.price)}</strong><Button size="sm" onClick={() => addItem(item)}><Plus /> Agregar</Button></div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 divide-y divide-border border-y border-border">
            {visibleMenu.map((item) => {
              const quantity = cart.find((entry) => entry.id === item.id)?.quantity ?? 0;
              return (
                <article key={item.id} className="grid items-center gap-4 py-5 sm:grid-cols-[1fr_auto] sm:py-6">
                  <div>
                    <div className="flex items-center gap-3"><h3 className="font-display text-xl font-semibold sm:text-2xl">{item.name}</h3>{item.popular && <span className="rounded-sm bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">Popular</span>}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <strong className="font-display text-xl">{formatPrice(item.price)}</strong>
                    {quantity ? (
                      <div className="flex h-10 items-center rounded-md border border-border bg-card">
                        <Button variant="ghost" size="icon" onClick={() => subtractItem(item.id)} aria-label={`Quitar ${item.name}`}><Minus /></Button>
                        <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => addItem(item)} aria-label={`Agregar ${item.name}`}><Plus /></Button>
                      </div>
                    ) : <Button variant="outline" size="sm" onClick={() => addItem(item)}><Plus /> Agregar</Button>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pedido" className="bg-ink py-18 text-ink-foreground sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <p className="section-kicker text-highlight">Casi listo</p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Tu pedido,<br />directo a cocina.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-muted">Revisá los platos, completá tus datos y envialos por WhatsApp. Ahí coordinamos el horario, pago y entrega.</p>
            <div className="mt-8 space-y-3 text-sm text-ink-muted">
              <p className="flex items-center gap-3"><Check className="size-4 text-highlight" /> Confirmación personalizada</p>
              <p className="flex items-center gap-3"><Check className="size-4 text-highlight" /> Retiro en el local o delivery</p>
              <p className="flex items-center gap-3"><Check className="size-4 text-highlight" /> Pago coordinado por WhatsApp</p>
            </div>
          </div>

          <div className="rounded-md border border-ink-border bg-ink-card p-5 sm:p-8">
            <div className="flex items-center justify-between border-b border-ink-border pb-5"><h3 className="font-display text-2xl font-semibold">Detalle del pedido</h3><span className="text-sm text-ink-muted">{itemCount} {itemCount === 1 ? "plato" : "platos"}</span></div>
            <div className="min-h-32 py-5">
              {!cart.length ? <p className="py-6 text-center text-sm text-ink-muted">Todavía no agregaste ningún plato.</p> : cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-2 text-sm">
                  <div className="flex items-center gap-3"><Button variant="ink" size="icon-sm" onClick={() => subtractItem(item.id)} aria-label={`Quitar ${item.name}`}><Minus /></Button><span><b>{item.quantity}x</b> {item.name}</span></div>
                  <span className="shrink-0 font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-y border-ink-border py-5"><span className="text-ink-muted">Total estimado</span><strong className="font-display text-3xl text-highlight">{formatPrice(total)}</strong></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-ink-muted">Nombre<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" className="h-11 border-b border-ink-border bg-transparent text-base font-normal normal-case tracking-normal text-ink-foreground outline-none transition-colors placeholder:text-ink-muted focus:border-highlight" /></label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-ink-muted">Notas o dirección<input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Dirección, sin ají..." className="h-11 border-b border-ink-border bg-transparent text-base font-normal normal-case tracking-normal text-ink-foreground outline-none transition-colors placeholder:text-ink-muted focus:border-highlight" /></label>
            </div>
            <div className="mt-6 grid grid-cols-2 rounded-md border border-ink-border p-1">
              {(["Retiro", "Delivery"] as const).map((option) => <Button key={option} type="button" variant={delivery === option ? "hero" : "ink"} onClick={() => setDelivery(option)}>{option === "Retiro" ? "Retiro en local" : "Delivery"}</Button>)}
            </div>
            <Button className="mt-5 h-12 w-full" size="lg" disabled={!cart.length} onClick={sendOrder}>Enviar por WhatsApp <ChevronRight /></Button>
            <p className="mt-3 text-center text-xs text-ink-muted">El restaurante confirmará disponibilidad y total final.</p>
          </div>
        </div>
      </section>

      <footer id="contacto" className="border-t border-border bg-secondary py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
          <div><div className="flex items-center gap-3 font-display text-xl font-semibold"><span className="flex size-9 items-center justify-center rounded-sm bg-primary text-primary-foreground"><Mountain className="size-5" /></span> Machupicchu Restaurant</div><p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">Comida peruana casera, preparada con generosidad y sazón de siempre.</p></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Visitanos</h3><a className="mt-4 flex items-start gap-2 text-sm hover:text-primary" href="https://www.google.com/maps/search/?api=1&query=Olavarr%C3%ADa%202835%2C%20Villa%20Celina%2C%20Buenos%20Aires" target="_blank" rel="noreferrer"><MapPin className="mt-0.5 size-4 shrink-0" /> Olavarría 2835<br />Villa Celina, Buenos Aires</a></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Contacto</h3><a className="mt-4 flex items-center gap-2 text-sm hover:text-primary" href="tel:+541139083385"><Phone className="size-4" /> {PHONE_DISPLAY}</a><p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="size-4" /> Abierto hasta las 23:00</p></div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-border px-5 pt-6 text-xs text-muted-foreground lg:px-8">© 2026 Machupicchu Restaurant · Sitio de demostración</div>
      </footer>

      <Button asChild size="icon-lg" className="fixed bottom-5 right-5 z-40 rounded-full shadow-xl" aria-label="Abrir WhatsApp">
        <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, quiero hacer un pedido")}`} target="_blank" rel="noreferrer"><Phone /></a>
      </Button>
    </main>
  );
}