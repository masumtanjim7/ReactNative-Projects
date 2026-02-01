import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { theme } from '../theme/theme';

type Props = {
    title: string;
    onPress?: () => void;
    small?: boolean;
};

export default function PrimaryButton({ title, onPress, small }: Props) {
    const s = useSharedValue(1);

    const aStyle = useAnimatedStyle(() => ({
        transform: [{ scale: s.value }],
    }));

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => (s.value = withSpring(0.98, { damping: 14 }))}
            onPressOut={() => (s.value = withSpring(1, { damping: 14 }))}
        >
            <Animated.View style={[aStyle]}>
                <LinearGradient
                    colors={[theme.colors.accent, theme.colors.accent2]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.btn, small && styles.small]}
                >
                    <View style={styles.glow} />
                    <Text style={[styles.text, small && styles.textSmall]}>{title}</Text>
                </LinearGradient>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        height: 54,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    small: {
        height: 44,
        borderRadius: 16,
    },
    text: {
        color: '#0B0F1C',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.2,
    },
    textSmall: {
        fontSize: 14,
    },
    glow: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 999,
        opacity: 0.25,
        backgroundColor: 'white',
        transform: [{ translateY: -110 }],
    },
});
