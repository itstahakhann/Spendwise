import { useMemo, useState } from 'react';
import { Search, Trash2, Pencil, X } from 'lucide-react';
import { useExpenseStore, useAllCategories } from '@/store/useExpenseStore';
import { useCurrency } from '@/context/CurrencyContext';
import { formatDate } from '@/utils/format';
import { EmptyState } from './ui/EmptyState';
import { Button } from './ui/Button';
import type { Expense } from '@/types';
import toast from 'react-hot-toast';

interface ExpenseListProps {
  onEdit: (expense: Expense) => void;
  onAddNew: () => void;
}

export const ExpenseList = ({ onEdit, onAddNew }: ExpenseListProps) => {
  const expenses = useExpenseStore((s) => s.expenses);
  const deleteExpense = useExpenseStore((s) => s.deleteExpense);
  const categories = useAllCategories();
  const { format } = useCurrency();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return expenses
      .filter((exp) => {
        if (filterCategory !== 'all' && exp.category !== filterCategory) return false;
        if (!q) return true;
        const cat = categories.find((c) => c.id === exp.category);
        return (
          exp.description?.toLowerCase().includes(q) ||
          cat?.name.toLowerCase().includes(q) ||
          String(exp.amount).includes(q)
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, search, filterCategory, categories]);

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setConfirmDelete(null);
    toast.success('Expense deleted');
  };

  const inputCls =
    'w-full h-10 pl-9 pr-8 rounded-lg border border-brand-100 bg-white text-ink-900 placeholder:text-ink-300 ' +
    'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none text-sm transition-all';

  return (
    <div className="bg-white rounded-xl border border-brand-100 shadow-sm animate-slide-up">
      <div className="px-5 py-4 border-b border-brand-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-ink-900">Recent Transactions</h3>
            <p className="text-xs text-ink-500 mt-0.5">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expenses..."
              className={inputCls}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-brand-500 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-10 px-3 rounded-lg border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none text-sm bg-white text-ink-700 cursor-pointer transition-all"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-h-[520px] overflow-y-auto">
        {filtered.length === 0 ? (
          expenses.length === 0 ? (
            <EmptyState
              title="No expenses yet"
              description="Start tracking your spending by adding your first expense."
              action={<Button onClick={onAddNew}>Add your first expense</Button>}
            />
          ) : (
            <EmptyState
              title="No results found"
              description="Try adjusting your search or filters."
            />
          )
        ) : (
          <ul className="divide-y divide-brand-50">
            {filtered.map((exp) => {
              const cat = categories.find((c) => c.id === exp.category);
              return (
                <li
                  key={exp.id}
                  className="group flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-brand-50/50 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-xs shadow-sm"
                    style={{ backgroundColor: cat?.color ?? '#94A3B8' }}
                  >
                    {(cat?.name ?? '?').slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-ink-900 truncate">
                      {exp.description || cat?.name || 'Expense'}
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5 flex items-center gap-1.5">
                      <span>{cat?.name ?? 'Uncategorized'}</span>
                      <span className="text-ink-300">•</span>
                      <span>{formatDate(exp.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-ink-900 tabular-nums">
                      -{format(exp.amount)}
                    </span>

                    {confirmDelete === exp.id ? (
                      <div className="flex items-center gap-1 animate-fade-in">
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="h-8 px-2.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="h-8 px-2.5 text-xs font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-600 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(exp)}
                          className="w-8 h-8 rounded-md flex items-center justify-center text-ink-500 hover:bg-brand-100 hover:text-brand-600 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(exp.id)}
                          className="w-8 h-8 rounded-md flex items-center justify-center text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};1