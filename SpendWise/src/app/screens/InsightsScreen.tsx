// src/app/screens/InsightsScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeProvider';
import { useTransactions, type Transaction } from '../store/TransactionsStore';

type RangeKey = 'week' | 'month' | 'year';

function startOfWeek(d: Date) {
    const x = new Date(d);
    const day = x.getDay(); // 0 Sun
    const diff = (day + 6) % 7; //week strat from Monday
    x.setDate(x.getDate() - diff);
    x.setHours(0, 0, 0, 0);
    return x.getTime();
}
function startOfMonth(d: Date) {
    const x = new Date(d.getFullYear(), d.getMonth(), 1);
    x.setHours(0, 0, 0, 0);
    return x.getTime();
}
function startOfYear(d: Date) {
    const x = new Date(d.getFullYear(), 0, 1);
    x.setHours(0, 0, 0, 0);
    return x.getTime();
}

function formatMoney(n: number) {
    return `৳${Math.round(n).toLocaleString()}`;
}

function Segmented({
    value,
    onChange,
}: {
    value: RangeKey;
    onChange: (v: RangeKey) => void;
}) {
    const { colors } = useTheme();
    const items: { key: RangeKey; label: string }[] = [
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
        { key: 'year', label: 'Year' },
    ];

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.card,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 6,
                gap: 6,
                marginTop: 10,
            }}
        >
            {items.map((it) => {
                const active = value === it.key;
                return (
                    <Pressable
                        key={it.key}
                        onPress={() => onChange(it.key)}
                        style={{
                            flex: 1,
                            paddingVertical: 8,
                            borderRadius: 14,
                            backgroundColor: active ? colors.primary : 'transparent',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: active ? 'white' : colors.sub, fontWeight: '900' }}>
                            {it.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

function Donut({
    size = 120,
    stroke = 14,
    progress, // 0..1
    label,
    sublabel,
}: {
    size?: number;
    stroke?: number;
    progress: number;
    label: string;
    sublabel: string;
}) {
    const { colors } = useTheme();
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const p = Math.max(0, Math.min(1, progress));
    const dash = c * p;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke={colors.border}
                    strokeWidth={stroke}
                    fill="transparent"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke={colors.primary}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${c - dash}`}
                    rotation={-90}
                    originX={size / 2}
                    originY={size / 2}
                />
            </Svg>

            <View style={{ position: 'absolute', alignItems: 'center' }}>
                <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18 }}>{label}</Text>
                <Text style={{ color: colors.sub, fontWeight: '800', fontSize: 12, marginTop: 2 }}>
                    {sublabel}
                </Text>
            </View>
        </View>
    );
}

export default function InsightsScreen() {
    const { colors } = useTheme();
    const { transactions, isHydrated } = useTransactions();
    const [range, setRange] = useState<RangeKey>('week');

    const now = new Date();

    const rangeStart = useMemo(() => {
        if (range === 'week') return startOfWeek(now);
        if (range === 'month') return startOfMonth(now);
        return startOfYear(now);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [range]);

    const stats = useMemo(() => {
        const inRange = transactions.filter((t: Transaction) => t.createdAt >= rangeStart);

        let income = 0;
        let expense = 0;

        const expByCat = new Map<string, number>();
        for (const t of inRange) {
            if (t.type === 'income') income += t.amount;
            else {
                expense += t.amount;
                expByCat.set(t.category, (expByCat.get(t.category) ?? 0) + t.amount);
            }
        }

        const breakdown = [...expByCat.entries()].sort((a, b) => b[1] - a[1]);
        const topCat = breakdown[0]?.[0] ?? '—';
        const topCatAmt = breakdown[0]?.[1] ?? 0;

        const budget = Math.max(1, Math.round(expense * 1.35)); // 35% headroom on donut chart
        const budgetUsed = expense / budget;

        return {
            inRange,
            income,
            expense,
            balance: income - expense,
            breakdown,
            topCat,
            topCatAmt,
            budget,
            budgetUsed,
        };
    }, [transactions, rangeStart]);

    if (!isHydrated) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.sub }}>Loading…</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>Insights</Text>

                <Segmented value={range} onChange={setRange} />

                {/* Top summary card showing */}
                <View
                    style={{
                        marginTop: 12,
                        backgroundColor: colors.card,
                        borderRadius: 18,
                        padding: 14,
                        borderWidth: 1,
                        borderColor: colors.border,
                    }}
                >
                    <Text style={{ color: colors.sub, fontWeight: '800' }}>
                        {range === 'week' ? 'Week Summary' : range === 'month' ? 'Month Summary' : 'Year Summary'}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'center' }}>
                        <Donut
                            progress={stats.budgetUsed}
                            label={`${Math.min(100, Math.round(stats.budgetUsed * 100))}%`}
                            sublabel="Budget used"
                        />

                        <View style={{ flex: 1, gap: 10 }}>
                            <View
                                style={{
                                    backgroundColor: colors.bg,
                                    borderRadius: 16,
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                }}
                            >
                                <Text style={{ color: colors.sub, fontWeight: '800' }}>Total Spend</Text>
                                <Text style={{ color: colors.text, fontWeight: '900', fontSize: 16, marginTop: 4 }}>
                                    {formatMoney(stats.expense)}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: colors.bg,
                                        borderRadius: 16,
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                    }}
                                >
                                    <Text style={{ color: colors.sub, fontWeight: '800' }}>Top Cat</Text>
                                    <Text style={{ color: colors.text, fontWeight: '900', marginTop: 4 }}>
                                        {stats.topCat}
                                    </Text>
                                    <Text style={{ color: colors.sub, fontWeight: '800', marginTop: 2 }}>
                                        {formatMoney(stats.topCatAmt)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        width: 92,
                                        backgroundColor: colors.bg,
                                        borderRadius: 16,
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ color: colors.sub, fontWeight: '800' }}>Avg/day</Text>
                                    <Text style={{ color: colors.text, fontWeight: '900', marginTop: 4 }}>
                                        {formatMoney(range === 'week' ? stats.expense / 7 : range === 'month' ? stats.expense / 30 : stats.expense / 365)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Breakdown */}
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: '900', marginTop: 18 }}>
                    Breakdown
                </Text>

                {stats.breakdown.map(([name, value]) => {
                    const p = stats.expense > 0 ? value / stats.expense : 0;
                    return (
                        <View
                            key={name}
                            style={{
                                marginTop: 10,
                                backgroundColor: colors.card,
                                borderRadius: 18,
                                padding: 14,
                                borderWidth: 1,
                                borderColor: colors.border,
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: colors.text, fontWeight: '900' }}>{name}</Text>
                                <Text style={{ color: colors.text, fontWeight: '900' }}>{formatMoney(value)}</Text>
                            </View>

                            <View
                                style={{
                                    height: 10,
                                    borderRadius: 999,
                                    backgroundColor: colors.bg,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    marginTop: 10,
                                    overflow: 'hidden',
                                }}
                            >
                                <View
                                    style={{
                                        height: '100%',
                                        width: `${Math.min(100, Math.round(p * 100))}%`,
                                        backgroundColor: colors.primary,
                                        borderRadius: 999,
                                    }}
                                />
                            </View>

                            <Text style={{ color: colors.sub, fontWeight: '800', marginTop: 6 }}>
                                {Math.round(p * 100)}% of spend
                            </Text>
                        </View>
                    );
                })}

                {stats.breakdown.length === 0 && (
                    <Text style={{ color: colors.sub, textAlign: 'center', marginTop: 40 }}>
                        Add some expenses to see insights.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
}
