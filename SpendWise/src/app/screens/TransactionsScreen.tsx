import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useTransactions } from '../store/TransactionsStore';
import type { Transaction } from '../store/TransactionsStore';

export default function TransactionsScreen() {
    const { colors } = useTheme();
    const { transactions, isHydrated } = useTransactions();

    if (!isHydrated) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ color: colors.sub }}>Loading…</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {transactions.map((t: Transaction) => (
                    <View
                        key={t.id}
                        style={{
                            backgroundColor: colors.card,
                            borderRadius: 18,
                            padding: 14,
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: colors.border,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <Text style={{ color: colors.text, fontWeight: '900' }}>
                                {t.category}
                            </Text>

                            {!!t.note && (
                                <Text style={{ color: colors.sub, marginTop: 4 }}>{t.note}</Text>
                            )}

                            <Text style={{ color: colors.sub, marginTop: 6, fontSize: 12 }}>
                                {new Date(t.createdAt).toLocaleString()}
                            </Text>
                        </View>

                        <Text
                            style={{
                                fontWeight: '900',
                                color: t.type === 'income' ? '#4ade80' : '#fb7185',
                            }}
                        >
                            {t.type === 'income' ? '+' : '-'}৳{t.amount.toLocaleString()}
                        </Text>
                    </View>
                ))}

                {transactions.length === 0 && (
                    <Text style={{ color: colors.sub, textAlign: 'center', marginTop: 40 }}>
                        No transactions yet. Tap + to add one.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
}
