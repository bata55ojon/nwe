import { useCurrency, type Currency } from "@/CurrencyContext";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
    >
      <option value="USD">$ USD</option>
      <option value="BRL">R$ BRL</option>
    </select>
  );
}
