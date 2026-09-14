import { Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { telegramCheckoutUrl, type Product } from "@/data/products";
import { useI18n, type Language } from "@/i18n";

export function BuyNowDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang } = useI18n();

  const uiTexts: Record<Language, { title: string; desc: string; product: string; price: string; button: string; notice: string }> = {
    en: {
      title: "Checkout",
      desc: "Contact our team on Telegram to ask about available payment methods and complete your order.",
      product: "Product",
      price: "Price",
      button: "Continue on Telegram",
      notice: "No payment is processed on this site.",
    },
    pt: {
      title: "Finalizar Pedido",
      desc: "Entre em contato com a nossa equipe no Telegram para saber as formas de pagamento disponíveis e finalizar o pedido.",
      product: "Produto",
      price: "Preço",
      button: "Continuar no Telegram",
      notice: "Nenhum pagamento é processado neste site.",
    },
    ar: {
      title: "إتمام الطلب",
      desc: "تواصل مع فريقنا على تليجرام للاستفسار عن طرق الدفع المتاحة وإكمال طلبك.",
      product: "المنتج",
      price: "السعر",
      button: "المتابعة عبر تليجرام",
      notice: "لا يتم معالجة أي مدفوعات على هذا الموقع.",
    },
    es: {
      title: "Finalizar Compra",
      desc: "Póngase en contacto con nuestro equipo en Telegram para consultar los métodos de pago disponibles y completar su pedido.",
      product: "Producto",
      price: "Precio",
      button: "Continuar en Telegram",
      notice: "No se procesa ningún pago en este sitio web.",
    },
  };

  const t = uiTexts[lang] ?? uiTexts.en;

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl border-border bg-popover sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {t.title}
          </DialogTitle>
          <DialogDescription>
            {t.desc}
          </DialogDescription>
        </DialogHeader>

        {product ? (
          <div className="space-y-4">
            <div className="space-y-4 rounded-2xl border border-primary/40 bg-gradient-card p-4 shadow-glow">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t.product}</dt>
                  <dd className="truncate font-medium">{product.name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t.price}</dt>
                  <dd className="font-medium text-primary">
                    ${product.price.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <Button asChild size="lg" className="w-full shadow-glow">
                <a
                  href={telegramCheckoutUrl(product, "Perguntar Formas de Pagamento", lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="size-4" />
                  {t.button}
                </a>
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                {t.notice}
              </p>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
