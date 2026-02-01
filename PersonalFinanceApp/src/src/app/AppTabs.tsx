import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';

import HomeScreen from '../screens/HomeScreen';
import CostingSheetScreen from '../screens/CostingSheetScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootTabParamList = {
    Home: undefined;
    Costing: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#0B0D12',
                    borderTopColor: 'rgba(255,255,255,0.1)',
                    height: 80,
                    paddingBottom: 20,
                },
                tabBarBackground: () =>
                    Platform.OS === 'ios' ? (
                        <BlurView intensity={40} tint="dark" style={{ flex: 1 }} />
                    ) : null,
                tabBarActiveTintColor: '#EAF0FF',
                tabBarInactiveTintColor: 'rgba(234,240,255,0.6)',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Costing" component={CostingSheetScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
