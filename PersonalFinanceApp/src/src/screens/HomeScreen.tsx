import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import BlurCard from '../components/BlurCard';
import SpendingChart from '../components/SpendingChart';
import { useFinance } from '../store/FinanceStore';
import { hapticLight } from '../components/Haptics';

export default function HomeScreen() {
    const { balance, spending, profile } = useFinance();

    return (
        <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 120 }}>
            <View className="px-6 pt-16">
                <Animated.View entering={FadeInDown.duration(450).springify()}>
                    <Text className="text-muted text-sm">Welcome</Text>
                    <Text className="text-text text-2xl font-semibold mt-1">{profile.name}</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(80).duration(450).springify()} className="mt-5">
                    <BlurCard intensity={40} className="p-5">
                        <Text className="text-muted text-sm">Total Balance</Text>
                        <Text className="text-text text-4xl font-semibold mt-2">
                            ${balance.toFixed(0)}
                        </Text>

                        <View className="flex-row gap-10 mt-4">
                            <View>
                                <Text className="text-muted text-xs">Monthly Income</Text>
                                <Text className="text-text font-semibold mt-1">$1200</Text>
                            </View>
                            <View>
                                <Text className="text-muted text-xs">Spent</Text>
                                <Text className="text-text font-semibold mt-1">
                                    ${(1200 - balance).toFixed(0)}
                                </Text>
                            </View>
                        </View>
                    </BlurCard>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(150).duration(450).springify()} className="mt-5">
                    <BlurCard intensity={35} className="p-5">
                        <SpendingChart data={spending} />
                    </BlurCard>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(220).duration(450).springify()} className="mt-5">
                    <View className="flex-row gap-12">
                        <Pressable
                            onPress={async () => {
                                await hapticLight();
                                // frontend-only: no real action, just UI polish
                            }}
                            className="flex-1 bg-card2 border border-line rounded-2xl p-4"
                        >
                            <Text className="text-text font-semibold">Add Expense</Text>
                            <Text className="text-muted text-xs mt-1">Quick entry (mock)</Text>
                        </Pressable>

                        <Pressable
                            onPress={async () => {
                                await hapticLight();
                            }}
                            className="flex-1 bg-card2 border border-line rounded-2xl p-4"
                        >
                            <Text className="text-text font-semibold">Insights</Text>
                            <Text className="text-muted text-xs mt-1">Weekly trends</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        </ScrollView>
    );
}