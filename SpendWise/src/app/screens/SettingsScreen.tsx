import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { GlassCard } from '../../components/GlassCard';

export default function SettingsScreen() {
    const { colors, toggle, mode } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
            <Text style={{ color: colors.text, fontSize: 22, fontWeight: '900', marginBottom: 12 }}>Settings</Text>

            <GlassCard>
                <Text style={{ color: colors.sub, fontWeight: '700' }}>Appearance</Text>

                <Pressable
                    onPress={toggle}
                    style={{
                        marginTop: 12,
                        padding: 14,
                        borderRadius: 16,
                        backgroundColor: colors.chip,
                        borderWidth: 1,
                        borderColor: colors.border,
                    }}
                >
                    <Text style={{ color: colors.text, fontWeight: '900' }}>
                        Toggle Theme (current: {mode})
                    </Text>
                </Pressable>
            </GlassCard>
        </View>
    );
}

