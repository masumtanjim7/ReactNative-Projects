import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import {
    View,
    Pressable,
    Modal,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import InsightsScreen from '../screens/InsightsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../../theme/ThemeProvider';
import { useTransactions } from '../store/TransactionsStore';
import type { TxType, NewTx } from '../store/TransactionsStore';

const Tab = createBottomTabNavigator();

function AddModal({
    visible,
    onClose,
    onSave,
}: {
    visible: boolean;
    onClose: () => void;
    onSave: (tx: NewTx) => void;
}) {
    const { colors } = useTheme();

    const [type, setType] = useState<TxType>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const reset = () => {
        setType('expense');
        setAmount('');
        setCategory('');
        setNote('');
        setError('');
    };

    const close = () => {
        reset();
        onClose();
    };

    const save = () => {
        const cleanAmount = Number(String(amount).replace(/[^\d.]/g, ''));
        if (!cleanAmount || cleanAmount <= 0) {
            setError('Enter a valid amount');
            return;
        }
        if (!category.trim()) {
            setError('Category is required');
            return;
        }

        setError('');
        onSave({
            type,
            amount: cleanAmount,
            category: category.trim(),
            note: note.trim() ? note.trim() : undefined,
        });
        close();
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
            <Pressable onPress={close} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.40)' }} />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View
                    style={{
                        backgroundColor: colors.card,
                        borderTopLeftRadius: 22,
                        borderTopRightRadius: 22,
                        borderWidth: 1,
                        borderColor: colors.border,
                        overflow: 'hidden',
                    }}
                >
                    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 18, paddingBottom: 22 }}>
                        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>Add Transaction</Text>
                        <Text style={{ color: colors.sub, marginTop: 6 }}>Quickly log income or expense.</Text>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                            <Pressable
                                onPress={() => setType('expense')}
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    borderRadius: 16,
                                    borderWidth: 1,
                                    borderColor: type === 'expense' ? colors.primary : colors.border,
                                    backgroundColor: type === 'expense' ? colors.primary : colors.bg,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: type === 'expense' ? 'white' : colors.text, fontWeight: '900' }}>
                                    Expense
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setType('income')}
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    borderRadius: 16,
                                    borderWidth: 1,
                                    borderColor: type === 'income' ? colors.primary : colors.border,
                                    backgroundColor: type === 'income' ? colors.primary : colors.bg,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: type === 'income' ? 'white' : colors.text, fontWeight: '900' }}>
                                    Income
                                </Text>
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: colors.sub, fontWeight: '700', marginBottom: 8 }}>Amount</Text>
                                <TextInput
                                    value={amount}
                                    onChangeText={setAmount}
                                    placeholder="৳ 0"
                                    placeholderTextColor={colors.sub}
                                    keyboardType="numeric"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        backgroundColor: colors.bg,
                                        borderRadius: 16,
                                        paddingHorizontal: 14,
                                        paddingVertical: 12,
                                        color: colors.text,
                                        fontWeight: '800',
                                    }}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ color: colors.sub, fontWeight: '700', marginBottom: 8 }}>Category</Text>
                                <TextInput
                                    value={category}
                                    onChangeText={setCategory}
                                    placeholder="Food, Travel…"
                                    placeholderTextColor={colors.sub}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        backgroundColor: colors.bg,
                                        borderRadius: 16,
                                        paddingHorizontal: 14,
                                        paddingVertical: 12,
                                        color: colors.text,
                                        fontWeight: '800',
                                    }}
                                />
                            </View>
                        </View>

                        <Text style={{ color: colors.sub, fontWeight: '700', marginTop: 12, marginBottom: 8 }}>Note</Text>
                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            placeholder="Optional note"
                            placeholderTextColor={colors.sub}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.border,
                                backgroundColor: colors.bg,
                                borderRadius: 16,
                                paddingHorizontal: 14,
                                paddingVertical: 12,
                                color: colors.text,
                            }}
                        />

                        {!!error && <Text style={{ color: '#ff6b6b', marginTop: 10, fontWeight: '800' }}>{error}</Text>}

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                            <Pressable
                                onPress={close}
                                style={{
                                    flex: 1,
                                    padding: 14,
                                    borderRadius: 16,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    backgroundColor: colors.bg,
                                }}
                            >
                                <Text style={{ color: colors.text, fontWeight: '900' }}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={save}
                                style={{
                                    flex: 1,
                                    backgroundColor: colors.primary,
                                    padding: 14,
                                    borderRadius: 16,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: '900' }}>Save</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default function AppTabs() {
    const { colors } = useTheme();
    const [open, setOpen] = useState(false);

    const addTransaction = useTransactions((s) => s.addTransaction);

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        height: 68,
                        paddingBottom: 12,
                        paddingTop: 10,
                        backgroundColor: colors.card,
                        borderTopColor: colors.border,
                    },
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.sub,
                    tabBarIcon: ({ color, size }) => {
                        const s = size ?? 22;
                        if (route.name === 'Home') return <Ionicons name="home-outline" size={s} color={color} />;
                        if (route.name === 'Transactions') return <Ionicons name="receipt-outline" size={s} color={color} />;
                        if (route.name === 'Insights') return <Ionicons name="pie-chart-outline" size={s} color={color} />;
                        if (route.name === 'Settings') return <Ionicons name="settings-outline" size={s} color={color} />;
                        return null;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Transactions" component={TransactionsScreen} />

                <Tab.Screen
                    name="Add"
                    component={HomeScreen}
                    options={{
                        tabBarButton: () => (
                            <View style={{ width: 70, alignItems: 'center' }}>
                                <Pressable
                                    onPress={() => setOpen(true)}
                                    style={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: 20,
                                        backgroundColor: colors.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: -30,
                                        shadowColor: '#000',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 12,
                                        shadowOffset: { width: 0, height: 8 },
                                        elevation: 8,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 26, fontWeight: '900' }}>+</Text>
                                </Pressable>
                            </View>
                        ),
                    }}
                />

                <Tab.Screen name="Insights" component={InsightsScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>

            <AddModal visible={open} onClose={() => setOpen(false)} onSave={addTransaction} />
        </>
    );
}
