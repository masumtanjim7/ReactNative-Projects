// src/app/store/TransactionsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TxType = 'income' | 'expense';

export type Transaction = {
    id: string;
    type: TxType;
    amount: number;
    category: string;
    note?: string;
    createdAt: number;
};

export type NewTx = Omit<Transaction, 'id' | 'createdAt'>;

type Store = {
    transactions: Transaction[];
    isHydrated: boolean;

    addTransaction: (tx: NewTx) => void;
    removeTransaction: (id: string) => void;
    clearAll: () => void;
    setHydrated: (v: boolean) => void;
};

export const useTransactions = create<Store>()(
    persist(
        (set, get) => ({
            transactions: [],
            isHydrated: false,

            setHydrated: (v) => set({ isHydrated: v }),

            addTransaction: (tx) => {
                const newItem: Transaction = {
                    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                    createdAt: Date.now(),
                    ...tx,
                };
                set({ transactions: [newItem, ...get().transactions] });
            },

            removeTransaction: (id) =>
                set({ transactions: get().transactions.filter((t) => t.id !== id) }),

            clearAll: () => set({ transactions: [] }),
        }),
        {
            name: 'spendwise_transactions',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
