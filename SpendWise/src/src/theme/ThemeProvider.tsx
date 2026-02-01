import React, { createContext, useContext, useMemo, useState } from 'react';
import { DarkTheme, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';
import { dark, light } from './colors';

type Mode = 'light' | 'dark';
type Colors = typeof light;

type ThemeCtxType = {
    mode: Mode;
    colors: Colors;
    toggle: () => void;
    navTheme: NavTheme;
};

const ThemeCtx = createContext<ThemeCtxType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>('light');

    const value = useMemo(() => {
        const colors = (mode === 'dark' ? dark : light) as Colors;

        const navTheme: NavTheme =
            mode === 'dark'
                ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.bg, card: colors.card, text: colors.text, border: colors.border, primary: colors.primary } }
                : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.bg, card: colors.card, text: colors.text, border: colors.border, primary: colors.primary } };

        return {
            mode,
            colors,
            toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
            navTheme,
        };
    }, [mode]);

    return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeCtx);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
