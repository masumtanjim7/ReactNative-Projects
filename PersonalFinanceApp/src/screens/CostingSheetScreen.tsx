import React, { useMemo, useState } from 'react';
import { View, Text, SectionList, Pressable, TextInput } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import BlurCard from '../components/BlurCard';
import ProgressBar from '../components/ProgressBar';
import { useFinance } from '../store/FinanceStore';
import { hapticLight, hapticSuccess } from '../components/Haptics';

type SectionKey = 'Fixed' | 'Variable';

export default function CostingSheetScreen() {
    const { expenses, budgets, addExpense } = useFinance();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('12');
    const [category, setCategory] = useState<SectionKey>('Variable');

    const spendBy = useMemo(() => {
        const fixed = expenses.filter(e => e.category === 'Fixed').reduce((s, e) => s + e.amount, 0);
        const variable = expenses.filter(e => e.category === 'Variable').reduce((s, e) => s + e.amount, 0);
        return { Fixed: fixed, Variable: variable };
    }, [expenses]);

    const sections = useMemo(() => {
        const fixed = expenses.filter(e => e.category === 'Fixed');
        const variable = expenses.filter(e => e.category === 'Variable');
        return [
            { title: 'Fixed Expenses', key: 'Fixed' as const, data: fixed },
            { title: 'Variable Expenses', key: 'Variable' as const, data: variable },
        ];
    }, [expenses]);

    return (
        <View className="flex-1 bg-bg">
            <View className="px-6 pt-16 pb-3">
                <Animated.View entering={FadeInDown.duration(450).springify()}>
                    <Text className="text-text text-2xl font-semibold">Costing Sheet</Text>
                    <Text className="text-muted text-sm mt-1">Fixed vs Variable budgeting</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(90).duration(450).springify()} className="mt-5">
                    <BlurCard intensity={40} className="p-5">
                        <Text className="text-text font-semibold">Budgets</Text>
                        <ProgressBar label="Fixed" value={spendBy.Fixed} max={budgets.Fixed} />
                        <ProgressBar label="Variable" value={spendBy.Variable} max={budgets.Variable} />
                    </BlurCard>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(150).duration(450).springify()} className="mt-4">
                    <BlurCard intensity={35} className="p-5">
                        <Text className="text-text font-semibold">Add Item (frontend)</Text>

                        <View className="mt-3 flex-row gap-3">
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder="e.g., Coffee"
                                placeholderTextColor="rgba(234,240,255,0.35)"
                                className="flex-1 bg-card2 border border-line rounded-2xl px-4 py-3 text-text"
                            />
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="numeric"
                                placeholder="12"
                                placeholderTextColor="rgba(234,240,255,0.35)"
                                className="w-24 bg-card2 border border-line rounded-2xl px-4 py-3 text-text"
                            />
                        </View>

                        <View className="mt-3 flex-row gap-3">
                            <Pressable
                                onPress={async () => {
                                    await hapticLight();
                                    setCategory('Fixed');
                                }}
                                className={`flex-1 rounded-2xl border py-3 items-center ${category === 'Fixed' ? 'bg-card2 border-accent' : 'bg-card border-line'
                                    }`}
                            >
                                <Text className="text-text font-semibold">Fixed</Text>
                            </Pressable>

                            <Pressable
                                onPress={async () => {
                                    await hapticLight();
                                    setCategory('Variable');
                                }}
                                className={`flex-1 rounded-2xl border py-3 items-center ${category === 'Variable' ? 'bg-card2 border-accent' : 'bg-card border-line'
                                    }`}
                            >
                                <Text className="text-text font-semibold">Variable</Text>
                            </Pressable>
                        </View>

                        <Pressable
                            onPress={async () => {
                                const amt = Number(amount);
                                if (!title.trim() || !Number.isFinite(amt) || amt <= 0) {
                                    await hapticLight();
                                    return;
                                }
                                await hapticSuccess();
                                addExpense({ title: title.trim(), amount: amt, category });
                                setTitle('');
                            }}
                            className="mt-4 bg-accent rounded-2xl py-4 items-center"
                        >
                            <Text className="text-text font-semibold">Add</Text>
                        </Pressable>
                    </BlurCard>
                </Animated.View>
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
                renderSectionHeader={({ section }) => (
                    <Text className="text-muted mt-5 mb-2 font-semibold">{section.title}</Text>
                )}
                renderItem={({ item }) => (
                    <Animated.View layout={Layout.springify()} entering={FadeInDown.duration(220)}>
                        <View className="bg-card2 border border-line rounded-2xl p-4 mb-3 flex-row items-center justify-between">
                            <View>
                                <Text className="text-text font-semibold">{item.title}</Text>
                                <Text className="text-muted text-xs mt-1">{item.category}</Text>
                            </View>
                            <Text className="text-text font-semibold">${item.amount.toFixed(0)}</Text>
                        </View>
                    </Animated.View>
                )}
                ListFooterComponent={<View className="h-20" />}
            />
        </View>
    );
}
