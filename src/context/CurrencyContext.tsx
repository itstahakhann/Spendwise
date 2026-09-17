import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  CURRENCIES,
  formatCurrency as formatCurrencyUtil,
  type CurrencyCode,
  type CurrencyMeta,
} from '@/utils/currency';

interface CurrencyContextValue {
  /** Currently active currency code. */
  currency: CurrencyCode;
  /** Metadata for the active currency (symbol, label, locale). */
  meta: CurrencyMeta;
  /** Change the active currency. Persists to localStorage. */
  setCurrency: (code: CurrencyCode) => void;
  /** Convenience formatter bound to the active currency. */
  format: (value: number) => string;
}

const STORAGE_KEY = 'spendwise-currency';
const DEFAULT_CURRENCY: CurrencyCode = 'USD';

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const readStoredCurrency = (): CurrencyCode => {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'USD' || stored === 'PKR') return stored;
  return DEFAULT_CURRENCY;
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(readStoredCurrency);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
  }, []);

  const format = useCallback(
    (value: number) => formatCurrencyUtil(value, currency),
    [currency]
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      meta: CURRENCIES[currency],
      setCurrency,
      format,
    }),
    [currency, setCurrency, format]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Access the active currency + formatter anywhere in the tree.
 * Throws if used outside of <CurrencyProvider>.
 */
export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used inside <CurrencyProvider>');
  }
  return ctx;
};