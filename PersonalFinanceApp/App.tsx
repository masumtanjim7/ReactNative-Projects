import 'react-native-reanimated';
import './global.css';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppTabs from './src/app/AppTabs';
import { FinanceProvider } from './src/store/FinanceStore';

const NavTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#0B0D12',
        card: '#0B0D12',
        text: '#EAF0FF',
        border: 'rgba(255,255,255,0.10)',
        primary: '#7C5CFF',
    },
};

export default function App() {
    return (
        <FinanceProvider>
            <NavigationContainer theme={NavTheme}>
                <StatusBar style="light" />
                <AppTabs />
            </NavigationContainer>
        </FinanceProvider>
    );
}
