import { TrendingDown, Wallet, Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { useExpenseStore } from '@/store/useExpenseStore';
import { useCurrency } from '@/context/CurrencyContext';
import { getCurrentMonthKey, getMonthKey } from '@/utils/format';

export const SummaryCards = () => {
  const expenses = useExpenseStore((s) => s.expenses);
  const { format } = useCurrency();

  const { total, monthTotal, monthCount } = useMemo(() => {
    const currentMonth = getCurrentMonthKey();
    let totalSum = 0;
    let monthSum = 0;
    let count = 0;

    for (const exp of expenses) {
      totalSum += exp.amount;
      if (getMonthKey(exp.date) === currentMonth) {
        monthSum += exp.amount;
        count += 1;
      }
    }
    return { total: totalSum, monthTotal: monthSum, monthCount: count };
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {/* Total Spent — teal gradient hero card */}
      <div className="relative overflow-hidden rounded-xl p-5 shadow-lg shadow-brand-500/20 bg-[linear-gradient(135deg,#9CE6C9_0%,#14B8A6_100%)] text-white animate-slide-up">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15" />
        <div className="absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-white/10" />

        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">
              Total Spent
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Wallet size={16} className="text-white" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight">
            {format(total)}
          </div>
          <div className="text-xs text-white/85 mt-1">All time</div>
        </div>
      </div>

      {/* This Month */}
      <div
        className="bg-white rounded-xl p-5 border border-brand-100 shadow-sm hover:shadow-md hover:shadow-brand-500/10 hover:border-brand-200 transition-all animate-slide-up"
        style={{ animationDelay: '50ms' }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-ink-500 uppercase tracking-wide">
            This Month
          </span>
          <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center">
            <TrendingDown size={16} className="text-brand-500" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
          {format(monthTotal)}
        </div>
        <div className="text-xs text-ink-500 mt-1">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Transactions */}
      <div
        className="bg-white rounded-xl p-5 border border-brand-100 shadow-sm hover:shadow-md hover:shadow-brand-500/10 hover:border-brand-200 transition-all animate-slide-up"
        style={{ animationDelay: '100ms' }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-ink-500 uppercase tracking-wide">
            Transactions
          </span>
          <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center">
            <Calendar size={16} className="text-brand-500" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
          {monthCount}
        </div>
        <div className="text-xs text-ink-500 mt-1">This month</div>
      </div>
    </div>
  );
};