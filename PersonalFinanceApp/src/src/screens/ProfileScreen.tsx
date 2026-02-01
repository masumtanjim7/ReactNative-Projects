import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import BlurCard from '../components/BlurCard';
import AvatarPicker from '../components/AvatarPicker';
import { useFinance } from '../store/FinanceStore';
import { hapticLight, hapticSuccess } from '../components/Haptics';

export default function ProfileScreen() {
    const { profile, setProfile } = useFinance();
    const [name, setName] = useState(profile.name);

    return (
        <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 120 }}>
            <View className="px-6 pt-16">
                <Animated.View entering={FadeInDown.duration(450).springify()}>
                    <Text className="text-text text-2xl font-semibold">Profile</Text>
                    <Text className="text-muted text-sm mt-1">Update your personal details</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(90).duration(450).springify()} className="mt-5">
                    <BlurCard intensity={40} className="p-5">
                        <Text className="text-muted text-xs mb-2">Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                            placeholderTextColor="rgba(234,240,255,0.35)"
                            className="bg-card2 border border-line rounded-2xl px-4 py-3 text-text"
                        />

                        <View className="mt-5">
                            <AvatarPicker
                                value={profile.avatarId}
                                onChange={(id) => setProfile({ avatarId: id })}
                            />
                        </View>

                        <Pressable
                            onPress={async () => {
                                await hapticSuccess();
                                setProfile({ name: name.trim() || 'User' });
                            }}
                            className="mt-6 bg-accent rounded-2xl py-4 items-center"
                        >
                            <Text className="text-text font-semibold">Save Changes</Text>
                        </Pressable>

                        <Pressable
                            onPress={async () => {
                                await hapticLight();
                                setName(profile.name);
                            }}
                            className="mt-3 border border-line rounded-2xl py-4 items-center bg-card2"
                        >
                            <Text className="text-text font-semibold">Reset</Text>
                        </Pressable>
                    </BlurCard>
                </Animated.View>
            </View>
        </ScrollView>
    );
}
