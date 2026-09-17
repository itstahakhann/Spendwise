import { useEffect, useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { useExpenseStore, useAllCategories } from '@/store/useExpenseStore';
import { useCurrency } from '@/context/CurrencyContext';
import { getCurrencySymbol } from '@/utils/currency';
import type { Expense, ExpenseFormData } from '@/types';
import toast from 'react-hot-toast';

interface ExpenseFormProps {
  expense?: Expense | null;
  onSuccess: () => void;
}

const todayISO = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().split('T')[0];
};

const inputCls =
  'w-full h-11 px-3 rounded-lg border border-brand-100 bg-white text-ink-900 placeholder:text-ink-300 ' +
  'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none text-sm transition-all';

export const ExpenseForm = ({ expense, onSuccess }: ExpenseFormProps) => {
  const { addExpense, updateExpense, addCustomCategory } = useExpenseStore();
  const categories = useAllCategories();
  const { currency } = useCurrency();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]?.id ?? '');
  const [date, setDate] = useState(todayISO());
  const [description, setDescription] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customColor, setCustomColor] = useState('#14B8A6');

  useEffect(() => {
    if (expense) {
      setAmount(String(expense.amount));
      setCategory(expense.category);
      setDate(expense.date.split('T')[0]);
      setDescription(expense.description ?? '');
    } else {
      setAmount('');
      setCategory(categories[0]?.id ?? '');
      setDate(todayISO());
      setDescription('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expense]);

  const handleAddCustom = () => {
    const trimmed = customName.trim();
    if (!trimmed) {
      toast.error('Category name is required');
      return;
    }
    const newCat = addCustomCategory({
      name: trimmed,
      color: customColor,
      icon: 'Tag',
    });
    setCategory(newCat.id);
    setShowCustom(false);
    setCustomName('');
    toast.success('Category added');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = parseFloat(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      toast.error('Please enter a valid amount greater than 0');
      return;
    }
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    const payload: ExpenseFormData = {
      amount: Math.round(parsed * 100) / 100,
      category,
      date: new Date(date + 'T12:00:00').toISOString(),
      description: description.trim() || undefined,
    };

    if (expense) {
      updateExpense(expense.id, payload);
      toast.success('Expense updated');
    } else {
      addExpense(payload);
      toast.success('Expense added successfully');
    }
    onSuccess();
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-600 font-semibold text-sm">
            {symbol}
          </span>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            autoFocus
            style={{ paddingLeft: symbol.length > 1 ? '3.25rem' : '2rem' }}
            className="w-full h-12 pr-3 rounded-lg border border-brand-100 bg-white text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none text-lg font-semibold transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-ink-700">Category</label>
          <button
            type="button"
            onClick={() => setShowCustom((v) => !v)}
            className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 transition-colors"
          >
            <Sparkles size={12} />
            {showCustom ? 'Cancel' : 'Add custom'}
          </button>
        </div>

        {showCustom ? (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-brand-100 cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Category name"
              className={inputCls}
            />
            <Button type="button" size="sm" onClick={handleAddCustom}>
              <Plus size={14} />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => {
              const selected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 h-10 rounded-lg border text-sm font-medium transition-all ${
                    selected
                      ? 'border-brand-500 bg-[linear-gradient(to_right,#6EE7B7,#14B8A6)] text-white shadow-sm shadow-brand-500/30'
                      : 'border-brand-100 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: selected ? '#ffffff' : cat.color }}
                  />
                  <span className="truncate">{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-1.5">
          Description <span className="text-ink-300 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Lunch with team"
          maxLength={120}
          className={inputCls}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {expense ? 'Save Changes' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
};2