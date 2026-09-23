import { MessageCircle } from "lucide-react";
import { store } from "@/lib/store-config";

export function WhatsAppFab() {
  const href = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
    `¡Hola ${store.name}! Quiero hacer una consulta.`,
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[oklch(0.65_0.17_150)] px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
