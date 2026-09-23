import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/lib/store-config";
import { useCart } from "./cart";

const money = (n: number) => `${store.currency} ${n.toLocaleString("es-PE")}`;

export function CartSheet() {
  const { lines, total, count, setQty, remove, open, setOpen } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"Recojo en tienda" | "Delivery / envío">("Recojo en tienda");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const link = () => {
    const body = [
      `¡Hola ${store.name}! Quiero concretar esta compra:`,
      "",
      ...lines.map(
        (l) => `• ${l.qty} x ${l.product.name} — ${money(l.qty * l.product.price)}`,
      ),
      "",
      `Total referencial: ${money(total)}`,
      name.trim() ? `Cliente: ${name.trim()}` : null,
      `Entrega: ${mode}`,
      mode === "Delivery / envío" && address.trim() ? `Dirección: ${address.trim()}` : null,
      notes.trim() ? `Comentario: ${notes.trim()}` : null,
      "",
      "¿Me confirman stock y forma de pago (Yape, Plin, transferencia o efectivo)?",
    ].filter(Boolean);
    return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(body.join("\n"))}`;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-display text-xl">Tu pedido</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Todavía no agregaste productos."
              : "Revisá las cantidades y enviá el pedido por WhatsApp."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {lines.map((l) => (
            <div key={l.product.id} className="flex gap-3">
              <img
                src={l.product.image}
                alt={l.product.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-20 w-20 shrink-0 rounded-lg border border-border bg-card object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{l.product.name}</p>
                <p className="text-xs text-muted-foreground">{l.product.brand}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 rounded-lg border border-border">
                    <button
                      type="button"
                      aria-label={`Quitar una unidad de ${l.product.name}`}
                      onClick={() => setQty(l.product.id, l.qty - 1)}
                      className="px-2 py-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm">{l.qty}</span>
                    <button
                      type="button"
                      aria-label={`Agregar una unidad de ${l.product.name}`}
                      onClick={() => setQty(l.product.id, l.qty + 1)}
                      className="px-2 py-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold">{money(l.qty * l.product.price)}</span>
                  <button
                    type="button"
                    aria-label={`Eliminar ${l.product.name}`}
                    onClick={() => remove(l.product.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {count > 0 && (
            <div className="space-y-3 border-t border-border pt-4">
              <Input
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-2">
                {(["Recojo en tienda", "Delivery / envío"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      m === mode
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {mode === "Delivery / envío" && (
                <Input
                  placeholder="Dirección y distrito"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              )}
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Comentario (ej: necesito boleta / factura)"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
              />
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-border bg-card px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total referencial</span>
            <span className="font-display text-xl">{money(total)}</span>
          </div>
          <Button asChild size="lg" className="w-full" disabled={count === 0}>
            <a
              href={count === 0 ? undefined : link()}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={count === 0}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Concretar compra por WhatsApp
            </a>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Se abre WhatsApp con tu pedido escrito. El pago se coordina ahí, sin comisiones.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
