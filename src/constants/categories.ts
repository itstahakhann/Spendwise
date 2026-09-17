import type { Category } from '@/types';

export const DEFAULT_CATEGORIES: Category[] = [
  // Teal — the star category, matches brand
  { id: 'food',          name: 'Food & Dining',     color: '#14B8A6', icon: 'UtensilsCrossed' },
  // Harmonious complements
  { id: 'transport',     name: 'Transport',         color: '#0EA5E9', icon: 'Car' },
  { id: 'shopping',      name: 'Shopping',          color: '#8B5CF6', icon: 'ShoppingBag' },
  { id: 'entertainment', name: 'Entertainment',     color: '#EC4899', icon: 'Film' },
  { id: 'bills',         name: 'Bills & Utilities', color: '#F59E0B', icon: 'Receipt' },
  { id: 'health',        name: 'Health',            color: '#10B981', icon: 'Heart' },
  { id: 'education',     name: 'Education',         color: '#6366F1', icon: 'GraduationCap' },
  { id: 'other',         name: 'Other',             color: '#94A3B8', icon: 'MoreHorizontal' },
];