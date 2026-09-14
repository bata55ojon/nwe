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
  USD: { code: "USD" as Currency, symbol: "$", rate: 1 },
  BRL: { code: "BRL" as Currency, symbol: "R$", rate: 3.0 },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (price) => `$${price.toFixed(2)}`,
});

const STORAGE_KEY = "hotshop-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "BRL" || saved === "USD") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  };

  const formatPrice = (priceInUSD: number) => {
    const details = currencies[currency] || currencies.USD;
    return `${details.symbol}${(priceInUSD * details.rate).toFixed(2)}`;
  };

  const value = useMemo(
    () => ({ currency, setCurrency, formatPrice }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
