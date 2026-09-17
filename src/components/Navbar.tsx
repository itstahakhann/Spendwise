import { Plus, Coins } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, type CurrencyCode } from '@/utils/currency';

interface NavbarProps {
  onAddExpense: () => void;
}

const CURRENCY_OPTIONS = Object.values(CURRENCIES);

export const Navbar = ({ onAddExpense }: NavbarProps) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* LEFT: Brand (handles its own asset path + fallback) */}
        <Logo size="md" />

        {/* RIGHT: Currency + Add Expense */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Coins
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-500 pointer-events-none"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Select currency"
              className="h-10 pl-7 pr-8 rounded-lg border border-brand-100 bg-white text-sm font-medium text-ink-700
                         hover:border-brand-300 hover:bg-brand-50
                         focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none
                         cursor-pointer transition-all appearance-none"
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <Button onClick={onAddExpense} size="md">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Expense</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </header>
  );
};