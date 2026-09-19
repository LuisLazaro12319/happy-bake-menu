import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { OrderDialog } from "@/components/OrderDialog";
import { categories, shop, type Product } from "@/lib/shop-config";
import { products } from "@/lib/products";
import hero from "@/assets/hero-pasteleria.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${shop.name} — Carta de pastelería artesanal` },
      {
        name: "description",
        content:
          "Tortas, tartas, porciones y postres artesanales. Elegí tu pastel y encargalo por WhatsApp para coordinar pago y envío.",
      },
      { property: "og:title", content: `${shop.name} — Carta de pastelería artesanal` },
      {
        property: "og:description",
        content:
          "Elegí tu torta o postre artesanal y encargalo por WhatsApp en un toque.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Carta,
});

const money = (n: number) => `${shop.currency}${n.toLocaleString("es-AR")}`;

function Carta() {
  const [category, setCategory] = useState("Todo");
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(
    () => (category === "Todo" ? products : products.filter((p) => p.category === category)),
    [category],
  );

  const generalLink = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(
    `¡Hola ${shop.name}! Quiero hacer una consulta sobre la carta.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="font-serif text-xl leading-none tracking-tight">{shop.name}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Artesanal
            </p>
          </div>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#carta" className="hover:text-foreground">Carta</a>
            <a href="#entregas" className="hover:text-foreground">Entregas</a>
            <a href="#nosotros" className="hover:text-foreground">Nosotros</a>
          </nav>
          <Button asChild size="sm">
            <a href={generalLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <img
          src={hero}
          alt="Pastelera decorando una torta artesanal"
          width={1920}
          height={1088}
          className="h-[62vh] min-h-[380px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{shop.tagline}</p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
              Dulces hechos a mano, uno por uno
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Elegí el pastel que te guste y en un toque coordinamos por WhatsApp el sabor,
              la fecha, el pago y la entrega.
            </p>
            <Button asChild size="lg" className="mt-7">
              <a href="#carta">Ver la carta</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Carta */}
      <section id="carta" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl">Nuestra carta</h2>
        <p className="mt-2 text-muted-foreground">
          Tocá cualquier producto para elegir tamaño y sabor.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                c === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setSelected(p)}
                className="relative block aspect-square overflow-hidden"
                aria-label={`Pedir ${p.name}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-xl">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                {p.sizes && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {p.sizes.map((s) => s.label).join(" · ")}
                  </p>
                )}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-serif text-lg">
                    desde {money(p.sizes?.[0]?.price ?? p.price)}
                  </span>
                  <Button onClick={() => setSelected(p)}>Pedir</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Entregas y horarios */}
      <section id="entregas" className="border-y border-border/60 bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">Entregas y pagos</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {shop.policies.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl">Horarios</h2>
            <dl className="mt-5 space-y-3 text-sm">
              {shop.hours.map((h) => (
                <div key={h.days} className="flex justify-between border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-muted-foreground">{shop.address}</p>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl">El oficio artesanal</h2>
        <p className="mt-5 text-muted-foreground">
          Trabajamos en pequeñas tandas, con manteca de verdad, frutas de estación y
          dulce de leche repostero. Nada se congela ni se produce en serie: cada torta se
          arma el día anterior a la entrega para que llegue fresca a tu mesa.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href={generalLink} target="_blank" rel="noopener noreferrer">
            Escribinos por WhatsApp
          </a>
        </Button>
      </section>

      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        <p className="font-serif text-lg text-foreground">{shop.name}</p>
        <p className="mt-2">
          {shop.instagram} · {shop.email}
        </p>
        <p className="mt-1">{shop.address}</p>
      </footer>

      <OrderDialog product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
