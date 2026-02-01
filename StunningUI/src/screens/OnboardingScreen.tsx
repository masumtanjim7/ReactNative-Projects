import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, useSharedValue, withSpring } from 'react-native-reanimated';
import { theme } from '../theme/theme';
import PrimaryButton from '../components/PrimaryButton';

const W = Dimensions.get('window').width;

const slides = [
    {
        title: 'Build stunning UIs',
        desc: 'Modern glassmorphism + gradients + micro animations.',
    },
    {
        title: 'Clean components',
        desc: 'Reusable design system: cards, buttons, typography.',
    },
    {
        title: 'Navigation ready',
        desc: 'A real app structure that scales for production.',
    },
];

export default function OnboardingScreen({ navigation }: any) {
    const [index, setIndex] = useState(0);
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withSpring(index, { damping: 16 });
    }, [index]);

    const dots = useMemo(() => slides.map((_, i) => i), []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0A0F22', '#070A12', '#060812']}
                style={StyleSheet.absoluteFill}
            />

            <Animated.View entering={FadeIn.duration(700)} style={styles.hero}>
                <LinearGradient
                    colors={[theme.colors.accent, theme.colors.accent2]}
                    start={{ x: 0.1, y: 0.2 }}
                    end={{ x: 0.9, y: 0.8 }}
                    style={styles.orb}
                />
                <View style={styles.orb2} />
            </Animated.View>

            <View style={styles.content}>
                <Animated.Text key={`t-${index}`} entering={FadeInDown.springify().damping(14)} style={styles.title}>
                    {slides[index].title}
                </Animated.Text>

                <Animated.Text key={`d-${index}`} entering={FadeInDown.delay(80).springify().damping(14)} style={styles.desc}>
                    {slides[index].desc}
                </Animated.Text>

                <View style={styles.dots}>
                    {dots.map((i) => (
                        <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
                    ))}
                </View>

                <View style={{ height: 14 }} />

                <PrimaryButton
                    title={index < slides.length - 1 ? 'Next' : 'Enter App'}
                    onPress={() => {
                        if (index < slides.length - 1) setIndex((p) => p + 1);
                        else navigation.replace('Main');
                    }}
                />

                <View style={{ height: 10 }} />
                <Text
                    onPress={() => navigation.replace('Main')}
                    style={styles.skip}
                >
                    Skip
                </Text>
            </View>

            <View style={styles.footerHint}>
                <Text style={styles.hintText}>Frontend only • Dummy data • Smooth animations</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    hero: {
        height: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orb: {
        width: W * 0.72,
        height: W * 0.72,
        borderRadius: 999,
        opacity: 0.9,
    },
    orb2: {
        position: 'absolute',
        width: W * 0.55,
        height: W * 0.55,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: theme.colors.stroke,
        transform: [{ translateY: 28 }],
    },
    content: {
        paddingHorizontal: theme.spacing(3),
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        color: theme.colors.text,
        fontSize: 34,
        fontWeight: '900',
        letterSpacing: 0.3,
    },
    desc: {
        marginTop: 12,
        color: theme.colors.subtext,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    dots: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 18,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        backgroundColor: 'rgba(234,240,255,0.25)',
    },
    dotActive: {
        width: 26,
        backgroundColor: theme.colors.accent2,
    },
    skip: {
        textAlign: 'center',
        color: theme.colors.muted,
        fontWeight: '800',
        marginTop: 6,
    },
    footerHint: {
        paddingBottom: 18,
        alignItems: 'center',
    },
    hintText: {
        color: 'rgba(234,240,255,0.42)',
        fontWeight: '700',
    },
});
