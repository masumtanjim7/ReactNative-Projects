import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { theme } from '../theme/theme';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';

export default function DetailsScreen({ route, navigation }: any) {
    const item = route?.params?.item;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#070A12', '#0A0F22']} style={StyleSheet.absoluteFill} />

            <Animated.View entering={FadeInDown.springify().damping(14)} style={styles.header}>
                <Text style={styles.kicker}>Transaction</Text>
                <Text style={styles.title}>{item?.title ?? 'Details'}</Text>
                <Text style={styles.sub}>{item?.merchant ?? 'Merchant'} • {item?.date ?? '—'}</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(120).springify().damping(14)} style={styles.body}>
                <GlassCard intensity={20}>
                    <Text style={styles.blockTitle}>Summary</Text>

                    <View style={{ height: 10 }} />
                    <View style={styles.line}>
                        <Text style={styles.left}>Amount</Text>
                        <Text style={styles.right}>৳ {item?.amount ?? 0}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.line}>
                        <Text style={styles.left}>Category</Text>
                        <Text style={styles.right}>{item?.category ?? '—'}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.line}>
                        <Text style={styles.left}>Status</Text>
                        <Text style={styles.right}>Completed</Text>
                    </View>
                </GlassCard>

                <View style={{ height: 18 }} />
                <PrimaryButton title="Back to Home" onPress={() => navigation.goBack()} />
                <View style={{ height: 14 }} />
                <PrimaryButton title="Preview Another UI Action" small onPress={() => { }} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: 70,
        paddingHorizontal: theme.spacing(3),
    },
    kicker: {
        color: theme.colors.muted,
        fontWeight: '800',
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
    body: {
        paddingHorizontal: theme.spacing(3),
        paddingTop: 18,
    },
    blockTitle: {
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: 16,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    left: {
        color: theme.colors.muted,
        fontWeight: '800',
    },
    right: {
        color: theme.colors.text,
        fontWeight: '900',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.stroke,
    },
});
