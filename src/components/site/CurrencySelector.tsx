import { useCurrency, type Currency } from "@/CurrencyContext";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Currency;
    setCurrency(selected);
  };

  return (
    <select
      value={currency}
      onChange={handleChange}
      className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
    >
      <option value="USD">$ USD</option>
      <option value="BRL">R$ BRL</option>
    </select>
  );
}
