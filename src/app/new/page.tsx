"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransactions } from "@/lib/TransactionContext";
import type { Transaction } from "@/types";

export default function NewTransactionPage() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<"entrada" | "saida">(
    "entrada"
  );
  const [value, setValue] = useState<string>("0.00");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("Vendas");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !date || !category) return;

    setIsSubmitting(true);
    try {
      const newTransaction: Omit<Transaction, "id"> = {
        type: transactionType === "entrada" ? "income" : "expense",
        amount: parseFloat(value),
        date: new Date(date),
        category,
        description: description || `${transactionType === "entrada" ? "Receita" : "Despesa"} - ${category}`,
      };

      addTransaction(newTransaction as Omit<Transaction, "id">);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      {/* Background Dashboard (Blurred) */}
      <div className="fixed inset-0 z-0 overflow-y-auto filter blur-sm grayscale pointer-events-none">
        {/* TopAppBar (Simulated) */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 w-full bg-white dark:bg-black border-b border-slate-950/10 dark:border-white/10">
          <div className="font-black text-xl tracking-tighter text-slate-950 dark:text-white uppercase">
            Capital Control
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
        </header>
        <main className="p-6 md:p-12 space-y-10">
          {/* Hero Stats Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="md:col-span-2 border border-black/10 dark:border-white/10 p-6 space-y-4">
              <p className="font-label-caps text-label-caps text-on-primary-container">
                Total Balance
              </p>
              <h2 className="font-metric-lg text-metric-lg">$142,850.00</h2>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold">
                  +12% vs last month
                </span>
              </div>
            </div>
            <div className="border border-black/10 dark:border-white/10 p-6 flex flex-col justify-between">
              <p className="font-label-caps text-label-caps text-on-primary-container">
                Burn Rate
              </p>
              <h2 className="font-display-table text-display-table">
                $12,400
              </h2>
            </div>
          </div>
          {/* Table Placeholder */}
          <div className="border border-black/10 dark:border-white/10">
            <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
              <h3 className="font-label-caps text-label-caps">
                Recent Transactions
              </h3>
            </div>
            <div className="divide-y divide-black/10 dark:divide-white/10">
              <div className="h-12 w-full flex items-center px-4 justify-between bg-surface-container-low/20">
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 bg-black dark:bg-white"></div>
                  <div className="w-32 h-2 bg-black/10 dark:bg-white/10"></div>
                </div>
                <div className="w-16 h-2 bg-black/10 dark:bg-white/10"></div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Transaction Modal */}
        <div className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-950/20 dark:border-white/20 shadow-2xl relative overflow-hidden">
          {/* Modal Header */}
          <div className="px-8 pt-8 pb-6 border-b border-black/5 dark:border-white/5 flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="font-display-table text-display-table text-slate-950 dark:text-white">
                Nova Transação
              </h2>
              <p className="font-label-caps text-label-caps text-on-secondary-container">
                Insira os detalhes do fluxo financeiro
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Modal Content (Form) */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Toggle Entrada/Saída */}
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

            {/* Input Valor (Currency) */}
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

            {/* Input Descrição */}
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

            {/* Split Grid: Data & Categoria */}
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

            {/* Footer Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <button
                className="w-full py-5 bg-black dark:bg-white text-white dark:text-black font-label-caps text-label-caps hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar Transação"}
              </button>
              <button
                onClick={handleClose}
                className="w-full py-4 border border-black/10 dark:border-white/10 text-on-surface font-label-caps text-label-caps hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>

          {/* Decorative Asset */}
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

      {/* Persistent Bottom Nav (Suppressing because modal is active focus) */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 h-20 pb-safe bg-white dark:bg-black border-t border-slate-950/10 dark:border-white/10 opacity-50 grayscale pointer-events-none">
        <div className="flex flex-col items-center justify-center text-slate-950 dark:text-white border-t-2 border-slate-950 dark:border-white pt-2">
          <span className="material-symbols-outlined" data-icon="dashboard">
            dashboard
          </span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">
            Dashboard
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2">
          <span className="material-symbols-outlined" data-icon="receipt_long">
            receipt_long
          </span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">
            Ledger
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2">
          <span className="material-symbols-outlined" data-icon="query_stats">
            query_stats
          </span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">
            Insights
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 pt-2">
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
          <span className="font-['Inter'] font-bold text-[10px] tracking-widest uppercase">
            Settings
          </span>
        </div>
      </nav>
    </>
  );
}
