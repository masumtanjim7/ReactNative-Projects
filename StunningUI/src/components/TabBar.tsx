import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { theme } from '../theme/theme';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const x = useSharedValue(0);

    useEffect(() => {
        x.value = withSpring(state.index, { damping: 16 });
    }, [state.index]);

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value * 120 }],
    }));

    return (
        <View style={styles.wrap}>
            <View style={styles.bar}>
                <Animated.View style={[styles.indicator, indicatorStyle]} />
                {state.routes.map((route, i) => {
                    const isFocused = state.index === i;
                    const { options } = descriptors[route.key];

                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={() => navigation.navigate(route.name)}
                            activeOpacity={0.85}
                            style={styles.item}
                        >
                            <Text style={[styles.text, isFocused && styles.textActive]}>{String(label)}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 18,
        alignItems: 'center',
    },
    bar: {
        width: 360,
        height: 56,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: theme.colors.stroke,
        flexDirection: 'row',
        overflow: 'hidden',
        padding: 6,
    },
    indicator: {
        position: 'absolute',
        left: 6,
        top: 6,
        width: 108,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(124,92,255,0.28)',
    },
    item: {
        width: 120,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: theme.colors.subtext,
        fontWeight: '800',
    },
    textActive: {
        color: theme.colors.text,
    },
});
