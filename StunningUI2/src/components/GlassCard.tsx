import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '../theme/theme';

type Props = ViewProps & {
    intensity?: number;
};

export default function GlassCard({ style, intensity = 22, children, ...rest }: Props) {
    return (
        <View style={[styles.wrap, style]} {...rest}>
            <BlurView intensity={intensity} tint="dark" style={styles.blur}>
                <View style={styles.inner}>{children}</View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.stroke,
        backgroundColor: theme.colors.card2,
    },
    blur: {
        width: '100%',
    },
    inner: {
        padding: theme.spacing(2),
    },
});
