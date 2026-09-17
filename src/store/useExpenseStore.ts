import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Expense, ExpenseFormData, Category } from '@/types';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

interface ExpenseState {
  expenses: Expense[];
  customCategories: Category[];
  addExpense: (data: ExpenseFormData) => void;
  updateExpense: (id: string, data: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  addCustomCategory: (category: Omit<Category, 'id'>) => Category;
  clearAll: () => void;
}

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      customCategories: [],

      addExpense: (data) => {
        const newExpense: Expense = {
          ...data,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ expenses: [newExpense, ...state.expenses] }));
      },

      updateExpense: (id, data) => {
        set((state) => ({
          expenses: state.expenses.map((exp) =>
            exp.id === id ? { ...exp, ...data } : exp
          ),
        }));
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((exp) => exp.id !== id),
        }));
      },

      addCustomCategory: (category) => {
        const newCategory: Category = {
          ...category,
          id: `custom-${generateId()}`,
        };
        set((state) => ({
          customCategories: [...state.customCategories, newCategory],
        }));
        return newCategory;
      },

      clearAll: () => set({ expenses: [], customCategories: [] }),
    }),
    {
      name: 'expense-tracker-storage',
      version: 1,
    }
  )
);

export const useAllCategories = (): Category[] => {
  const customCategories = useExpenseStore((s) => s.customCategories);
  return [...DEFAULT_CATEGORIES, ...customCategories];
};