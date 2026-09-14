import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Currency = "USD" | "BRL";

export const currencies: Record<Currency, { code: Currency; symbol: string; rate: number }> = {
  USD: { code: "USD", symbol: "$", rate: 1 },
  BRL: { code: "BRL", symbol: "R$", rate: 3.0 },
};

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
}>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (price) => `$${price.toFixed(2)}`,
});

const STORAGE_KEY = "hotshop-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (saved && (saved === "USD" || saved === "BRL")) {
      setCurrencyState(saved);
    }
  }, []);

  const value = useMemo(() => {
    const setCurrency = (c: Currency) => {
      setCurrencyState(c);
      localStorage.setItem(STORAGE_KEY, c);
    };

    const formatPrice = (priceInUSD: number) => {
      const details = currencies[currency] ?? currencies.USD;
      const converted = priceInUSD * details.rate;
      return `${details.symbol}${converted.toFixed(2)}`;
    };

    return { currency, setCurrency, formatPrice };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
