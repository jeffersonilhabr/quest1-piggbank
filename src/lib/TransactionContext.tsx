"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Transaction } from "@/types";
import { mockTransactions } from "@/data/mock";

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  isLoading: boolean;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

const STORAGE_KEY = "piggbank_transactions";

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage + mock data
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedTransactions = JSON.parse(stored).map(
          (t: Transaction) => ({
            ...t,
            date: new Date(t.date),
          })
        );
        setTransactions([...mockTransactions, ...parsedTransactions]);
      } else {
        setTransactions(mockTransactions);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions(mockTransactions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `${Date.now()}`,
    };

    const updated = [newTransaction, ...transactions];
    setTransactions(updated);

    try {
      // Only save new transactions, not mock data
      const newTransactions = updated.filter(
        (t) => !mockTransactions.find((m) => m.id === t.id)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, isLoading }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }
  return context;
}
