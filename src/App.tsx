import { useState, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/Navbar';
import { Modal } from '@/components/ui/Modal';
import { SummaryCards } from '@/components/SummaryCards';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseForm } from '@/components/ExpenseForm';
import { Plus } from 'lucide-react';
import type { Expense } from '@/types';

const CategoryChart = lazy(() =>
  import('@/components/CategoryChart').then((m) => ({ default: m.CategoryChart }))
);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddNew = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#0F172A',
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            borderRadius: 10,
            padding: '10px 14px',
          },
          success: { iconTheme: { primary: '#14B8A6', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      <Navbar onAddExpense={handleAddNew} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="bg-white rounded-xl border border-brand-100 shadow-sm h-[420px] animate-pulse" />
              }
            >
              <CategoryChart />
            </Suspense>
          </div>

          <div className="lg:col-span-3">
            <ExpenseList onEdit={handleEdit} onAddNew={handleAddNew} />
          </div>
        </div>

        <footer className="text-center text-xs text-ink-400 pt-4 pb-2">
          <span className="font-semibold text-brand-500">Spendwise</span>
          {' '}· Track. Analyze. Save. · Data stored locally in your browser
        </footer>
      </main>

      <button
        onClick={handleAddNew}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[linear-gradient(135deg,#9CE6C9_0%,#14B8A6_100%)] text-white shadow-lg shadow-brand-500/40 flex items-center justify-center z-20 active:scale-95 transition-transform animate-brand-pulse"
        aria-label="Add expense"
      >
        <Plus size={22} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
      >
        <ExpenseForm expense={editingExpense} onSuccess={handleClose} />
      </Modal>
    </div>
  );
}

export default App;