"use client";

import { useRouter } from "next/navigation";
import { useTransactions } from "@/lib/TransactionContext";
import { useMemo, useState, FormEvent } from "react";
import type { Transaction } from "@/types";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export default function DashboardPage() {
  const router = useRouter();
  const { transactions, isLoading, deleteTransaction, editTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [transactionType, setTransactionType] = useState<"entrada" | "saida">("entrada");
  const [value, setValue] = useState<string>("0.00");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("Vendas");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setTransactionType(transaction.type === "income" ? "entrada" : "saida");
    setValue(transaction.amount.toFixed(2));
    setDate(transaction.date.toISOString().slice(0, 10));
    setCategory(transaction.category);
    setDescription(transaction.description);
    setIsSubmitting(false);
  };

  const closeEditModal = () => {
    setEditingTransaction(null);
    setIsSubmitting(false);
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTransaction || !date || !category || !value) return;

    setIsSubmitting(true);
    try {
      editTransaction({
        ...editingTransaction,
        type: transactionType === "entrada" ? "income" : "expense",
        amount: parseFloat(value),
        date: new Date(date),
        category,
        description:
          description ||
          `${transactionType === "entrada" ? "Receita" : "Despesa"} - ${category}`,
      });
      closeEditModal();
    } catch (error) {
      console.error("Error editing transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const metrics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;
    const totalBalance = transactions.reduce(
      (sum, t) => sum + ((t.type === "income" ? 1 : -1) * t.amount),
      0
    );

    return { income, expenses, balance, totalBalance };
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 3);
  }, [transactions]);

  return (
    <>
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 w-full bg-white dark:bg-black border-b border-slate-950/10 dark:border-white/10 shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <img className="w-full h-full object-cover" alt="professional portrait of a business owner in a modern corporate setting with soft ambient lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI8gZLkezPN8X9xbj5Ygaj5fDpcvh7Zfqn4jUTshb_FyqNTBpw8LGp7Iz3X-mNfYEKtR1Zcbwk7Xr2dIVv_nYxzfoH9869q-3-tsnDUO6J1nYtwa0jSWbul80fJDs1ynk3xA7BB5Py_fhKV8KSh6b_PmihvrLyU4CwV_Y_tiuK20U9UFsymmF-SMdASV1RE21LKGnC7wOvpCvTN9i4e2MXOfe2uINxFgLDbUL1OpTDh_-6iRgTZqJb1oD2QKBJMzHlw1Oqv5UMUw"/>
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-950 dark:text-white uppercase">Capital Control</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/new")}
            className="bg-white text-black px-4 py-2 rounded font-label-caps text-label-caps active:scale-95 transition-transform duration-75"
          >
            + NOVO
          </button>
          <span className="material-symbols-outlined text-slate-950 dark:text-white cursor-pointer" data-icon="notifications">notifications</span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6 md:p-12 mb-24">
        {/* Dashboard Header */}
        <div className="mb-10">
          <h1 className="font-label-caps text-label-caps text-on-primary-container mb-2">RESUMO DA CONTA</h1>
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <span className="font-metric-lg text-metric-lg text-white">
              {formatCurrency(metrics.totalBalance)}
            </span>
            <span
              className={`font-label-caps text-label-caps mb-1 ${
                metrics.balance >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {metrics.balance >= 0 ? "+" : ""}
              {formatCurrency(metrics.balance)} ESTE MÊS
            </span>
          </div>
        </div>
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Monthly Revenue Card */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg group hover:border-white/30 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-caps text-label-caps text-on-primary-container">RECEITA MENSAL</span>
              <span className="material-symbols-outlined text-green-500" data-icon="trending_up">trending_up</span>
            </div>
            <div className="font-display-table text-display-table text-white mb-4">
              {formatCurrency(metrics.income)}
            </div>
            <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: `${metrics.income > 0 ? Math.min(100, (metrics.income / 100000) * 100) : 0}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 font-label-caps text-[10px] text-slate-500">
              {metrics.income > 0 ? "Receita registrada" : "Sem receitas"}
            </div>
          </div>
          {/* Monthly Expense Card */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg group hover:border-white/30 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-caps text-label-caps text-on-primary-container">DESPESA MENSAL</span>
              <span className="material-symbols-outlined text-red-500" data-icon="trending_down">trending_down</span>
            </div>
            <div className="font-display-table text-display-table text-white mb-4">
              {formatCurrency(metrics.expenses)}
            </div>
            <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: `${metrics.expenses > 0 ? Math.min(100, (metrics.expenses / 50000) * 100) : 0}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 font-label-caps text-[10px] text-slate-500">
              {metrics.expenses > 0 ? "Despesas registradas" : "Sem despesas"}
            </div>
          </div>
          {/* Cash Flow Sparkline */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg">
            <span className="font-label-caps text-label-caps text-on-primary-container block mb-4">FLUXO DE CAIXA</span>
            <div className="flex items-end gap-1 h-20">
              <div className="flex-1 bg-white/10 h-[40%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[60%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[45%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[80%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[95%] rounded-t-sm"></div>
              <div className="flex-1 bg-white/10 h-[70%] rounded-t-sm"></div>
              <div className="flex-1 bg-white h-[100%] rounded-t-sm"></div>
            </div>
            <div className="flex justify-between mt-2 font-label-caps text-[10px] text-slate-500">
              <span>SEG</span>
              <span>DOM</span>
            </div>
          </div>
          {/* Transactions Export Table */}
          <div className="md:col-span-8 p-6 bg-black border border-white/10 rounded-lg">
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-label-caps text-label-caps text-white">Transações</h2>
                <p className="text-slate-500 text-sm">Exporte as transações visíveis em formato CSV.</p>
              </div>
              <ExportCsvButton transactions={transactions} />
            </div>
            {isLoading ? (
              <div className="text-slate-500 text-center py-4">Carregando...</div>
            ) : (
              <TransactionsTable
                transactions={transactions}
                onDelete={deleteTransaction}
                onEdit={openEditModal}
              />
            )}
          </div>
          {/* Insights Card */}
          <div className="md:col-span-4 p-6 bg-black border border-white/10 rounded-lg flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-on-primary-container block mb-6">INSIGHTS IA</span>
              <p className="text-slate-400 font-body-main text-sm leading-relaxed mb-6">
                Suas despesas com fornecedores aumentaram 12% em comparação ao mês passado. Recomendamos revisar os contratos de infraestrutura.
              </p>
            </div>
            <button className="w-full border border-white/20 py-3 rounded font-label-caps text-label-caps hover:bg-white hover:text-black transition-colors">
              ANALISAR GASTOS
            </button>
          </div>
        </div>
      </main>
      {editingTransaction ? (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-950/20 dark:border-white/20 shadow-2xl relative overflow-hidden">
            <div className="px-8 pt-8 pb-6 border-b border-black/5 dark:border-white/5 flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="font-display-table text-display-table text-slate-950 dark:text-white">
                  Editar Transação
                </h2>
                <p className="font-label-caps text-label-caps text-on-secondary-container">
                  Atualize os detalhes do lançamento
                </p>
              </div>
              <button
                onClick={closeEditModal}
                className="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-8 space-y-8">
              <div className="flex p-1 bg-surface-container-low dark:bg-white/5 border border-black/5 dark:border-white/5">
                <label className="flex-1">
                  <input
                    checked={transactionType === "entrada"}
                    onChange={() => setTransactionType("entrada")}
                    className="sr-only peer"
                    name="type"
                    type="radio"
                  />
                  <div className="text-center py-3 font-label-caps text-label-caps cursor-pointer transition-all peer-checked:bg-white dark:peer-checked:bg-white peer-checked:text-black peer-checked:shadow-sm">
                    Entrada
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    checked={transactionType === "saida"}
                    onChange={() => setTransactionType("saida")}
                    className="sr-only peer"
                    name="type"
                    type="radio"
                  />
                  <div className="text-center py-3 font-label-caps text-label-caps cursor-pointer transition-all peer-checked:bg-white dark:peer-checked:bg-white peer-checked:text-black peer-checked:shadow-sm">
                    Saída
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                <label className="font-label-caps text-label-caps text-on-secondary-container block">
                  Valor da Transação
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-metric-lg text-metric-lg text-on-primary-container">
                    R$
                  </span>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white outline-none pl-14 py-4 font-metric-lg text-metric-lg text-slate-950 dark:text-white transition-colors appearance-none"
                    min="0.01"
                    required
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-label-caps text-label-caps text-on-secondary-container block">
                  Descrição (Opcional)
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-low dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 font-body-main text-on-surface focus:border-black dark:focus:border-white outline-none transition-all"
                  placeholder="Ex: Venda para cliente XYZ"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-gutter">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-secondary-container block">
                    Data
                  </label>
                  <div className="relative">
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-surface-container-low dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 font-body-main text-on-surface focus:border-black dark:focus:border-white outline-none transition-all"
                      type="date"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-secondary-container block">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-container-low dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 font-body-main text-on-surface focus:border-black dark:focus:border-white outline-none transition-all appearance-none"
                  >
                    <option>Vendas</option>
                    <option>Marketing</option>
                    <option>Operacional</option>
                    <option>Impostos</option>
                    <option>Folha de Pagamento</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  className="w-full py-5 bg-black dark:bg-white text-white dark:text-black font-label-caps text-label-caps hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar alterações"}
                </button>
                <button
                  onClick={closeEditModal}
                  className="w-full py-4 border border-black/10 dark:border-white/10 text-on-surface font-label-caps text-label-caps hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </form>

            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
              <span
                className="material-symbols-outlined text-[200px]"
                style={{ fontVariationSettings: "'wght' 100" }}
              >
                payments
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 h-20 pb-safe bg-white dark:bg-black border-t border-slate-950/10 dark:border-white/10 shadow-none">
        {/* Dashboard (Active) */}
        <a className="flex flex-col items-center justify-center text-slate-950 dark:text-white border-t-2 border-slate-950 dark:border-white pt-2 transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Dashboard</span>
        </a>
        {/* Ledger */}
        <a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2 hover:text-slate-950 dark:hover:text-white transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Ledger</span>
        </a>
        {/* Insights */}
        <a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2 hover:text-slate-950 dark:hover:text-white transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="query_stats">query_stats</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Insights</span>
        </a>
        {/* Settings */}
        <a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2 hover:text-slate-950 dark:hover:text-white transition-all duration-200 ease-in-out" href="#">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">Settings</span>
        </a>
      </nav>
    </>
  );
}
