import { Receipt } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
    <div className="relative w-20 h-20 mb-5">
      {/* Soft teal halo */}
      <div className="absolute inset-0 rounded-full bg-brand-100 blur-xl opacity-70" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-mint-200 to-brand-200 border border-brand-200 flex items-center justify-center">
        <Receipt className="text-brand-600" size={32} />
      </div>
    </div>
    <h3 className="text-base font-semibold text-ink-900 mb-1">{title}</h3>
    <p className="text-sm text-ink-500 max-w-xs mb-5">{description}</p>
    {action}
  </div>
);