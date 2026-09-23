import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/store-config";

export type CartLine = { product: Product; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (p: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "compueconomia-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add: (p, qty = 1) => {
        setLines((prev) => {
          const found = prev.find((l) => l.product.id === p.id);
          if (found) {
            return prev.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { product: p, qty }];
        });
        setOpen(true);
      },
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.product.id !== id)
            : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.product.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
