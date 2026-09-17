export type CurrencyCode = 'USD' | 'PKR';

export interface CurrencyMeta {
  code: CurrencyCode;
  label: string;       // "USD ($)"
  shortLabel: string;  // "USD"
  symbol: string;      // "$" or "Rs."
  locale: string;      // for Intl.NumberFormat
  decimals: number;    // 2 for USD, 0 for PKR
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: {
    code: 'USD',
    label: 'USD ($)',
    shortLabel: 'USD',
    symbol: '$',
    locale: 'en-US',
    decimals: 2,
  },
  PKR: {
    code: 'PKR',
    label: 'PKR (Rs)',
    shortLabel: 'PKR',
    symbol: 'Rs.',
    locale: 'en-PK',
    decimals: 0,
  },
};

/**
 * Format a numeric value for display, based on the active currency.
 *   USD → "$1,234.56"
 *   PKR → "Rs. 1,234"
 */
export const formatCurrency = (value: number, code: CurrencyCode): string => {
  const meta = CURRENCIES[code];

  // Format the number with grouping + decimal handling, then prefix the symbol.
  // We do NOT use Intl's `style: 'currency'` because PKR's default output
  // varies across browsers (e.g. "PKR 1,234" vs "₨1,234"). This gives us
  // a consistent, controlled result everywhere.
  const formatted = new Intl.NumberFormat(meta.locale, {
    minimumFractionDigits: meta.decimals,
    maximumFractionDigits: meta.decimals,
  }).format(value);

  return `${meta.symbol} ${formatted}`.replace('$ ', '$'); // no space after $
};

/**
 * Just the symbol for a currency (used in form inputs like "$" / "Rs.").
 */
export const getCurrencySymbol = (code: CurrencyCode): string =>
  CURRENCIES[code].symbol;