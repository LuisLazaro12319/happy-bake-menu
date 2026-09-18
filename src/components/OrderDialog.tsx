import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { shop, type Product } from "@/lib/shop-config";

const money = (n: number) => `${shop.currency}${n.toLocaleString("es-AR")}`;

export function OrderDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [flavor, setFlavor] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<"Retiro en el local" | "Envío a domicilio">("Retiro en el local");

  useEffect(() => {
    setSizeIndex(0);
    setFlavor(product?.flavors?.[0] ?? "");
    setNotes("");
    setMode("Retiro en el local");
  }, [product]);

  if (!product) return null;

  const size = product.sizes?.[sizeIndex];
  const price = size?.price ?? product.price;

  const buildLink = () => {
    const lines = [
      `¡Hola ${shop.name}! Quiero encargar:`,
      "",
      `🍰 ${product.name}`,
      size ? `Tamaño: ${size.label}` : null,
      flavor ? `Sabor / relleno: ${flavor}` : null,
      `Precio de referencia: ${money(price)}`,
      `Entrega: ${mode}`,
      notes.trim() ? `Notas: ${notes.trim()}` : null,
      "",
      "¿Me confirmás disponibilidad, forma de pago y envío?",
    ].filter(Boolean);
    return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {product.sizes && (
            <div>
              <p className="mb-2 text-sm font-medium">Tamaño</p>
              <div className="grid gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSizeIndex(i)}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      i === sizeIndex
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="font-medium">{money(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.flavors && (
            <div>
              <p className="mb-2 text-sm font-medium">Sabor o relleno</p>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFlavor(f)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      f === flavor ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-medium">Entrega</p>
            <div className="flex gap-2">
              {(["Retiro en el local", "Envío a domicilio"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    m === mode ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="notas" className="mb-2 block text-sm font-medium">
              Notas (fecha, dedicatoria, alergias…)
            </label>
            <textarea
              id="notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Ej: la necesito para el sábado 12, dedicatoria “Feliz cumple Sol”"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
            <span className="text-sm text-muted-foreground">Total estimado</span>
            <span className="font-serif text-xl">{money(price)}</span>
          </div>

          <Button asChild size="lg" className="w-full">
            <a href={buildLink()} target="_blank" rel="noopener noreferrer">
              Pedir por WhatsApp
            </a>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Se abre WhatsApp con tu pedido escrito para coordinar pago y envío.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
