import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import GlassCard from '../components/GlassCard';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#070A12', '#0A0F22']} style={StyleSheet.absoluteFill} />
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.sub}>Frontend demo page (UI only)</Text>

                <View style={{ height: 14 }} />

                <GlassCard>
                    <Text style={styles.row}>• Theme: Dark Glass</Text>
                    <Text style={styles.row}>• Animations: Reanimated</Text>
                    <Text style={styles.row}>• Navigation: React Navigation</Text>
                </GlassCard>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
        paddingTop: 70,
        paddingHorizontal: theme.spacing(3),
    },
    title: {
        color: theme.colors.text,
        fontSize: 34,
        fontWeight: '900',
    },
    sub: {
        marginTop: 8,
        color: theme.colors.subtext,
        fontWeight: '600',
    },
    row: {
        color: theme.colors.text,
        fontWeight: '800',
        marginBottom: 10,
    },
});
