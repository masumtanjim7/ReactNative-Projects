import React, { useMemo } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import type { SpendingPoint } from '../store/FinanceStore';

export default function SpendingChart({ data }: { data: SpendingPoint[] }) {
    const { width } = useWindowDimensions();

    const chartW = Math.min(360, Math.max(280, width - 64));
    const chartH = 140;
    const padX = 18;
    const padY = 16;

    const max = useMemo(() => Math.max(...data.map(d => d.amount), 1), [data]);

    const barW = (chartW - padX * 2) / data.length - 8;

    return (
        <View>
            <View className="flex-row items-baseline justify-between">
                <Text className="text-text font-semibold text-base">Spending Analytics</Text>
                <Text className="text-muted text-xs">Last 7 days</Text>
            </View>

            <View className="mt-3">
                <Svg width={chartW} height={chartH}>
                    <Line
                        x1={padX}
                        y1={chartH - padY}
                        x2={chartW - padX}
                        y2={chartH - padY}
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth={1}
                    />

                    {data.map((d, i) => {
                        const x = padX + i * (barW + 8);
                        const barH = ((chartH - padY * 2) * d.amount) / max;
                        const y = chartH - padY - barH;

                        return (
                            <React.Fragment key={d.day}>
                                <Rect
                                    x={x}
                                    y={y}
                                    width={barW}
                                    height={barH}
                                    rx={8}
                                    fill="rgba(124,92,255,0.85)"
                                />
                                <SvgText
                                    x={x + barW / 2}
                                    y={chartH - 2}
                                    fontSize="10"
                                    fill="rgba(234,240,255,0.65)"
                                    textAnchor="middle"
                                >
                                    {d.day}
                                </SvgText>
                            </React.Fragment>
                        );
                    })}
                </Svg>
            </View>
        </View>
    );
}
