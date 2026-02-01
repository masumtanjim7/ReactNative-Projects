import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../theme/theme';
import type { SpendItem } from '../data/mock';

type Props = {
    item: SpendItem;
    index: number;
    onPress?: () => void;
};

export default function SpendCard({ item, index, onPress }: Props) {
    return (
        <Animated.View entering={FadeInDown.delay(120 * index).springify().damping(14)}>
            <Pressable onPress={onPress} style={styles.press}>
                <LinearGradient
                    colors={[item.colorA, item.colorB]}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.grad}
                >
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.meta}>{item.merchant}</Text>
                            <Text style={styles.meta2}>{item.date}</Text>
                        </View>

                        <View style={styles.right}>
                            <Text style={styles.amount}>৳ {item.amount}</Text>
                            <View style={styles.pill}>
                                <Text style={styles.pillText}>{item.category}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    press: {
        marginBottom: theme.spacing(1.5),
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
    },
    grad: {
        padding: theme.spacing(2),
        borderRadius: theme.radius.xl,
    },
    row: {
        flexDirection: 'row',
        gap: theme.spacing(1.5),
        alignItems: 'center',
    },
    title: {
        color: '#0B0F1C',
        fontSize: 18,
        fontWeight: '900',
    },
    meta: {
        marginTop: 4,
        color: 'rgba(11,15,28,0.82)',
        fontWeight: '700',
    },
    meta2: {
        marginTop: 2,
        color: 'rgba(11,15,28,0.65)',
        fontWeight: '600',
    },
    right: {
        alignItems: 'flex-end',
    },
    amount: {
        color: '#0B0F1C',
        fontSize: 18,
        fontWeight: '900',
    },
    pill: {
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.28)',
    },
    pillText: {
        color: 'rgba(11,15,28,0.9)',
        fontWeight: '900',
        fontSize: 12,
    },
});
