import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { GlassCard } from '../../components/GlassCard';

export default function HomeScreen() {
    const { colors, toggle, mode } = useTheme();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <View>
                    <Text style={{ color: colors.sub, fontSize: 13, fontWeight: '700' }}>SpendWise</Text>
                    <Text style={{ color: colors.text, fontSize: 26, fontWeight: '900' }}>Dashboard</Text>
                </View>

                <Pressable
                    onPress={toggle}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.card,
                    }}
                >
                    <Text style={{ color: colors.text, fontWeight: '800' }}>{mode === 'dark' ? '🌙' : '☀️'}</Text>
                </Pressable>
            </View>

            <GlassCard style={{ marginBottom: 14 }}>
                <Text style={{ color: colors.sub, fontWeight: '700' }}>Total Balance</Text>
                <Text style={{ color: colors.text, fontSize: 34, fontWeight: '900', marginTop: 6 }}>৳ 28,450</Text>

                <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                    <View style={{ flex: 1, padding: 12, borderRadius: 16, backgroundColor: 'rgba(34,197,94,0.12)' }}>
                        <Text style={{ color: colors.sub, fontWeight: '700' }}>Income</Text>
                        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 6 }}>৳ 42,900</Text>
                    </View>
                    <View style={{ flex: 1, padding: 12, borderRadius: 16, backgroundColor: 'rgba(239,68,68,0.12)' }}>
                        <Text style={{ color: colors.sub, fontWeight: '700' }}>Expense</Text>
                        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 6 }}>৳ 14,450</Text>
                    </View>
                </View>
            </GlassCard>

            <Text style={{ color: colors.text, fontSize: 16, fontWeight: '900', marginBottom: 10 }}>Quick Insights</Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
                <GlassCard style={{ flex: 1 }}>
                    <Text style={{ color: colors.sub, fontWeight: '700' }}>This Week</Text>
                    <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 6 }}>৳ 3,120</Text>
                    <Text style={{ color: colors.sub, marginTop: 6 }}>Spending is ↓ 12%</Text>
                </GlassCard>
                <GlassCard style={{ flex: 1 }}>
                    <Text style={{ color: colors.sub, fontWeight: '700' }}>Top Category</Text>
                    <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 6 }}>Food</Text>
                    <Text style={{ color: colors.sub, marginTop: 6 }}>৳ 1,540</Text>
                </GlassCard>
            </View>
        </ScrollView>
    );
}
