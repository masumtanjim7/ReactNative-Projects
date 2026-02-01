import React, { createContext, useContext, useMemo, useState } from 'react';

export type SpendingPoint = { day: string; amount: number };

export type ExpenseItem = {
    id: string;
    title: string;
    amount: number;
    category: 'Fixed' | 'Variable';
};

export type Budget = {
    key: 'Fixed' | 'Variable';
    limit: number;
};

type Profile = {
    name: string;
    avatarId: string; // mocked selected image id
};

type FinanceState = {
    profile: Profile;
    setProfile: (p: Partial<Profile>) => void;

    balance: number;
    spending: SpendingPoint[];

    budgets: Record<'Fixed' | 'Variable', number>;
    expenses: ExpenseItem[];

    addExpense: (item: Omit<ExpenseItem, 'id'>) => void;
};

const FinanceContext = createContext<FinanceState | null>(null);

const initialSpending: SpendingPoint[] = [
    { day: 'Mon', amount: 24 },
    { day: 'Tue', amount: 18 },
    { day: 'Wed', amount: 31 },
    { day: 'Thu', amount: 12 },
    { day: 'Fri', amount: 44 },
    { day: 'Sat', amount: 28 },
    { day: 'Sun', amount: 20 },
];

const initialExpenses: ExpenseItem[] = [
    { id: '1', title: 'Rent', amount: 220, category: 'Fixed' },
    { id: '2', title: 'Internet', amount: 25, category: 'Fixed' },
    { id: '3', title: 'Groceries', amount: 46, category: 'Variable' },
    { id: '4', title: 'Transport', amount: 12, category: 'Variable' },
];

export function FinanceProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfileState] = useState<Profile>({ name: 'Masum', avatarId: 'a1' });
    const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);

    const budgets = useMemo(() => ({ Fixed: 400, Variable: 180 }), []);

    const fixedSpend = expenses.filter(e => e.category === 'Fixed').reduce((s, e) => s + e.amount, 0);
    const variableSpend = expenses.filter(e => e.category === 'Variable').reduce((s, e) => s + e.amount, 0);

    // mock “balance”: income baseline - spending (frontend only)
    const balance = useMemo(() => 1200 - (fixedSpend + variableSpend), [fixedSpend, variableSpend]);

    const setProfile = (p: Partial<Profile>) => setProfileState(prev => ({ ...prev, ...p }));

    const addExpense = (item: Omit<ExpenseItem, 'id'>) => {
        const id = String(Date.now());
        setExpenses(prev => [{ id, ...item }, ...prev]);
    };

    const value: FinanceState = {
        profile,
        setProfile,
        balance,
        spending: initialSpending,
        budgets,
        expenses,
        addExpense,
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
    const ctx = useContext(FinanceContext);
    if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
    return ctx;
}
