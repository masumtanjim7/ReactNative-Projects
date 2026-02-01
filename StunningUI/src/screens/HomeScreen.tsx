import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import GlassCard from '../components/GlassCard';
import SpendCard from '../components/SpendCard';
import { spend } from '../data/mock';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#070A12', '#070A12', '#0A0F22']} style={StyleSheet.absoluteFill} />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.springify().damping(14)}>
                    <Text style={styles.kicker}>Welcome back</Text>
                    <Text style={styles.title}>Nightly Spend</Text>
                    <Text style={styles.sub}>A premium UI demo to prove React Native adaptation.</Text>
                </Animated.View>

                <View style={{ height: 14 }} />

                <GlassCard intensity={18}>
                    <Text style={styles.cardTitle}>Monthly Overview</Text>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.big}>৳ 12,480</Text>
                            <Text style={styles.muted}>Total spend (UI only)</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>+12%</Text>
                        </View>
                    </View>

                    <View style={{ height: 14 }} />
                    <View style={styles.miniRow}>
                        <View style={styles.mini}>
                            <Text style={styles.miniLabel}>Food</Text>
                            <Text style={styles.miniValue}>৳ 3,200</Text>
                        </View>
                        <View style={styles.mini}>
                            <Text style={styles.miniLabel}>Home</Text>
                            <Text style={styles.miniValue}>৳ 4,900</Text>
                        </View>
                        <View style={styles.mini}>
                            <Text style={styles.miniLabel}>Travel</Text>
                            <Text style={styles.miniValue}>৳ 1,650</Text>
                        </View>
                    </View>
                </GlassCard>

                <View style={{ height: 18 }} />
                <Text style={styles.section}>Recent</Text>
                <View style={{ height: 10 }} />

                {spend.map((it, idx) => (
                    <SpendCard
                        key={it.id}
                        item={it}
                        index={idx}
                        onPress={() => navigation.navigate('Details', { item: it })}
                    />
                ))}

                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
        paddingTop: 66,
        paddingHorizontal: theme.spacing(3),
    },
    kicker: {
        color: theme.colors.muted,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    title: {
        marginTop: 8,
        color: theme.colors.text,
        fontSize: 34,
        fontWeight: '900',
    },
    sub: {
        marginTop: 10,
        color: theme.colors.subtext,
        fontWeight: '600',
        lineHeight: 22,
    },
    cardTitle: {
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: 16,
    },
    row: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    big: {
        color: theme.colors.text,
        fontSize: 28,
        fontWeight: '900',
    },
    muted: {
        marginTop: 6,
        color: theme.colors.muted,
        fontWeight: '700',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: 'rgba(44,229,155,0.18)',
        borderWidth: 1,
        borderColor: 'rgba(44,229,155,0.35)',
    },
    badgeText: {
        color: theme.colors.text,
        fontWeight: '900',
    },
    miniRow: {
        flexDirection: 'row',
        gap: 10,
    },
    mini: {
        flex: 1,
        padding: 12,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: theme.colors.stroke,
    },
    miniLabel: {
        color: theme.colors.muted,
        fontWeight: '800',
        fontSize: 12,
    },
    miniValue: {
        marginTop: 6,
        color: theme.colors.text,
        fontWeight: '900',
    },
    section: {
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: 18,
    },
});
