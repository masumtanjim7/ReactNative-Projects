import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export function GlassCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
    const { colors } = useTheme();
    return (
        <View
            style={[
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 18,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOpacity: 0.12,
                    shadowRadius: 18,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 6,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}
