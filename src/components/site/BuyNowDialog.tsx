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
import { useI18n } from "@/i18n";

export function BuyNowDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang } = useI18n();

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl border-border bg-popover sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Checkout
          </DialogTitle>
          <DialogDescription>
            Contact our team on Telegram to ask about available payment methods and complete your order.
          </DialogDescription>
        </DialogHeader>

        {product ? (
          <div className="space-y-4">
            <div className="space-y-4 rounded-2xl border border-primary/40 bg-gradient-card p-4 shadow-glow">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Product</dt>
                  <dd className="truncate font-medium">{product.name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Price</dt>
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
                  Continue on Telegram
                </a>
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                No payment is processed on this site.
              </p>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
