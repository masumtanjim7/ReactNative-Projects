import React from 'react';
import { View, Text } from 'react-native';

export default function ProgressBar({
    label,
    value,
    max,
}: {
    label: string;
    value: number;
    max: number;
}) {
    const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
    const danger = pct >= 0.9;

    return (
        <View className="mt-3">
            <View className="flex-row items-center justify-between">
                <Text className="text-text font-semibold">{label}</Text>
                <Text className="text-muted">{`$${value.toFixed(0)} / $${max.toFixed(0)}`}</Text>
            </View>

            <View className="mt-2 h-3 rounded-full bg-line overflow-hidden">
                <View
                    style={{ width: `${pct * 100}%` }}
                    className={`h-3 ${danger ? 'bg-red' : 'bg-green'}`}
                />
            </View>
        </View>
    );
}
