export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string; // ISO string
  description?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type ExpenseFormData = Omit<Expense, 'id' | 'createdAt'>;