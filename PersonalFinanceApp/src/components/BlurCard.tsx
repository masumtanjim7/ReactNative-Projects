import React from 'react';
import { View, ViewProps, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = ViewProps & {
    intensity?: number;
    className?: string;
};

export default function BlurCard({ intensity = 30, style, className, children, ...rest }: Props) {
    if (Platform.OS === 'ios') {
        return (
            <BlurView
                intensity={intensity}
                tint="dark"
                style={[
                    { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
                    style,
                ]}
                {...rest}
            >
                <View className={className}>{children}</View>
            </BlurView>
        );
    }

    return (
        <View
            className={`bg-card border border-line rounded-2xl ${className ?? ''}`}
            style={[{ borderRadius: 20 }, style]}
            {...rest}
        >
            {children}
        </View>
    );
}
