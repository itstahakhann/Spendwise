import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useExpenseStore, useAllCategories } from '@/store/useExpenseStore';
import { useCurrency } from '@/context/CurrencyContext';
import { getCurrentMonthKey, getMonthKey } from '@/utils/format';
import { EmptyState } from './ui/EmptyState';

interface ChartDatum {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export const CategoryChart = () => {
  const expenses = useExpenseStore((s) => s.expenses);
  const categories = useAllCategories();
  const { format } = useCurrency();

  const data = useMemo<ChartDatum[]>(() => {
    const currentMonth = getCurrentMonthKey();
    const totals = new Map<string, number>();
    let grandTotal = 0;

    for (const exp of expenses) {
      if (getMonthKey(exp.date) !== currentMonth) continue;
      totals.set(exp.category, (totals.get(exp.category) ?? 0) + exp.amount);
      grandTotal += exp.amount;
    }

    if (grandTotal === 0) return [];

    return Array.from(totals.entries())
      .map(([categoryId, value]) => {
        const cat = categories.find((c) => c.id === categoryId);
        return {
          name: cat?.name ?? categoryId,
          value,
          color: cat?.color ?? '#94A3B8',
          percentage: (value / grandTotal) * 100,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [expenses, categories]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-brand-100 shadow-sm">
        <div className="px-5 py-4 border-b border-brand-100">
          <h3 className="font-semibold text-ink-900">Spending by Category</h3>
          <p className="text-xs text-ink-500 mt-0.5">This month</p>
        </div>
        <EmptyState
          title="No spending yet"
          description="Add your first expense to see the breakdown."
        />
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl border border-brand-100 shadow-sm animate-slide-up">
      <div className="px-5 py-4 border-b border-brand-100">
        <h3 className="font-semibold text-ink-900">Spending by Category</h3>
        <p className="text-xs text-ink-500 mt-0.5">This month</p>
      </div>

      <div className="p-5">
        <div className="relative h-52 mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid #CCFBF1',
                  fontSize: 12,
                  boxShadow: '0 8px 24px rgba(20, 184, 166, 0.15)',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => format(value)}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-ink-500">Total</span>
            <span className="text-lg font-bold text-ink-900">
              {format(total)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {data.slice(0, 6).map((entry) => (
            <div key={entry.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-ink-700 truncate">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-ink-500">
                    {entry.percentage.toFixed(0)}%
                  </span>
                  <span className="text-sm font-semibold text-ink-900 tabular-nums">
                    {format(entry.value)}
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-brand-50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${entry.percentage}%`,
                    background: `linear-gradient(90deg, ${entry.color}AA, ${entry.color})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};