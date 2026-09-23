import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store-config";
import { useCart } from "./cart";

const nav = [
  { to: "/", label: "Tienda" },
  { to: "/servicios", label: "Servicio técnico" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="hidden bg-ink px-5 py-2 text-center text-xs text-ink-foreground md:block">
        Compras 100% por WhatsApp · Sin comisiones · Envíos a todo el Perú · {store.phone}
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display text-lg text-primary-foreground">
            C
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg tracking-tight">{store.name}</span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {store.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground font-medium" }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={`tel:${store.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-2 h-4 w-4" />
              Llamar
            </a>
          </Button>
          <Button size="sm" onClick={() => setOpen(true)} className="relative">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Pedido
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-highlight px-1 text-[11px] font-semibold text-ink">
                {count}
              </span>
            )}
          </Button>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenu((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border md:hidden"
          >
            {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMenu(false)}
              className="block py-2 text-sm text-muted-foreground"
              activeProps={{ className: "block py-2 text-sm text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
