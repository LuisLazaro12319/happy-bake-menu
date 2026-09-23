import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { store } from "@/lib/store-config";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl">{store.name}</p>
          <p className="mt-3 text-sm text-ink-foreground/70">{store.claim}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={store.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={store.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider">Secciones</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/70">
            <li><Link to="/" className="hover:text-ink-foreground">Tienda</Link></li>
            <li><Link to="/servicios" className="hover:text-ink-foreground">Servicio técnico</Link></li>
            <li><Link to="/nosotros" className="hover:text-ink-foreground">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-ink-foreground">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${store.email}`}>{store.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
                {store.address}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider">Horario</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/70">
            {store.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-3">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-ink-foreground/60">
        © {new Date().getFullYear()} {store.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
