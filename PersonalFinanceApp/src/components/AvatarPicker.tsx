import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { hapticLight, hapticSuccess } from './Haptics';

const AVATARS = [
    { id: 'a1', label: 'A' },
    { id: 'a2', label: 'M' },
    { id: 'a3', label: 'S' },
    { id: 'a4', label: 'T' },
    { id: 'a5', label: 'X' },
];

export default function AvatarPicker({
    value,
    onChange,
}: {
    value: string;
    onChange: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);

    const current = useMemo(() => AVATARS.find(a => a.id === value) ?? AVATARS[0], [value]);

    return (
        <View>
            <Text className="text-muted text-xs mb-2">Profile Image (mock)</Text>

            <Pressable
                onPress={async () => {
                    await hapticLight();
                    setOpen(true);
                }}
                className="flex-row items-center justify-between bg-card2 border border-line rounded-2xl px-4 py-3"
            >
                <View className="flex-row items-center">
                    <View className="h-12 w-12 rounded-full bg-accent items-center justify-center">
                        <Text className="text-text text-lg font-bold">{current.label}</Text>
                    </View>
                    <View className="ml-3">
                        <Text className="text-text font-semibold">Selected Avatar</Text>
                        <Text className="text-muted text-xs">Tap to change</Text>
                    </View>
                </View>
                <Text className="text-muted">›</Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Animated.View entering={FadeIn.duration(140)} exiting={FadeOut.duration(140)} className="flex-1 bg-black/60 justify-end">
                    <View className="bg-bg border-t border-line rounded-t-3xl px-6 pt-4 pb-10">
                        <View className="items-center">
                            <View className="h-1.5 w-12 rounded-full bg-line mb-4" />
                            <Text className="text-text text-lg font-semibold">Choose an avatar</Text>
                            <Text className="text-muted text-xs mt-1">No real upload — UI-only selection</Text>
                        </View>

                        <View className="flex-row flex-wrap mt-6 justify-between">
                            {AVATARS.map(a => (
                                <Pressable
                                    key={a.id}
                                    onPress={async () => {
                                        await hapticSuccess();
                                        onChange(a.id);
                                        setOpen(false);
                                    }}
                                    className={`w-[48%] mb-4 rounded-2xl border p-4 ${a.id === value ? 'border-accent bg-card2' : 'border-line bg-card'
                                        }`}
                                >
                                    <View className="h-14 w-14 rounded-full bg-accent items-center justify-center">
                                        <Text className="text-text text-xl font-bold">{a.label}</Text>
                                    </View>
                                    <Text className="text-text font-semibold mt-3">Avatar {a.label}</Text>
                                    <Text className="text-muted text-xs mt-1">{a.id === value ? 'Selected' : 'Tap to select'}</Text>
                                </Pressable>
                            ))}
                        </View>

                        <Pressable
                            onPress={async () => {
                                await hapticLight();
                                setOpen(false);
                            }}
                            className="mt-2 rounded-2xl border border-line bg-card2 py-4 items-center"
                        >
                            <Text className="text-text font-semibold">Close</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </Modal>
        </View>
    );
}
