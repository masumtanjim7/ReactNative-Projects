import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../store/AuthStore';
import type { AuthStackParamList } from '../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const { colors } = useTheme();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.bg }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900' }}>Welcome back</Text>
                <Text style={{ color: colors.sub, marginTop: 8 }}>
                    Login to continue using SpendWise.
                </Text>

                <View style={{ marginTop: 18 }}>
                    <Text style={{ color: colors.sub, fontWeight: '700', marginBottom: 8 }}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        placeholderTextColor={colors.sub}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            color: colors.text,
                        }}
                    />
                </View>

                <View style={{ marginTop: 14 }}>
                    <Text style={{ color: colors.sub, fontWeight: '700', marginBottom: 8 }}>Password</Text>
                    <TextInput
                        value={pass}
                        onChangeText={setPass}
                        placeholder="••••••••"
                        placeholderTextColor={colors.sub}
                        secureTextEntry
                        style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            color: colors.text,
                        }}
                    />
                </View>

                <Pressable
                    onPress={() => login()} // demo login
                    style={{
                        marginTop: 18,
                        backgroundColor: colors.primary,
                        paddingVertical: 14,
                        borderRadius: 16,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Signup')} style={{ marginTop: 14, alignItems: 'center' }}>
                    <Text style={{ color: colors.sub }}>
                        Don’t have an account? <Text style={{ color: colors.text, fontWeight: '900' }}>Sign up</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}
