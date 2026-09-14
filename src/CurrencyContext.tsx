import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Currency = "USD" | "BRL";

export const currencies = {
  USD: { code: "USD", symbol: "$", rate: 1 },
  BRL: { code: "BRL", symbol: "R$", rate: 3.0 }, // 1 USD = 3 BRL
};

const CurrencyContext = createContext({
  currency: "USD" as Currency,
  setCurrency: (c: Currency) => {},
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("hotshop-currency") as Currency;
    if (saved && saved in currencies) setCurrency(saved);
  }, []);

  const value = useMemo(() => {
    return {
      currency,
      setCurrency: (c: Currency) => {
        setCurrency(c);
        localStorage.setItem("hotshop-currency", c);
      },
      formatPrice: (priceInUSD: number) => {
        const details = currencies[currency];
        return `${details.symbol}${(priceInUSD * details.rate).toFixed(2)}`;
      },
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
