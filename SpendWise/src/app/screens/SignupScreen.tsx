import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../store/AuthStore';
import type { AuthStackParamList } from '../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
    const { colors } = useTheme();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.bg }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900' }}>Create account</Text>
                <Text style={{ color: colors.sub, marginTop: 8 }}>
                    Sign up to start tracking your money.
                </Text>

                <View style={{ marginTop: 18 }}>
                    <Text style={{ color: colors.sub, fontWeight: '700', marginBottom: 8 }}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Your name"
                        placeholderTextColor={colors.sub}
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
                    onPress={() => login()}
                    style={{
                        marginTop: 18,
                        backgroundColor: colors.primary,
                        paddingVertical: 14,
                        borderRadius: 16,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>Create account</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 14, alignItems: 'center' }}>
                    <Text style={{ color: colors.sub }}>
                        Already have an account? <Text style={{ color: colors.text, fontWeight: '900' }}>Login</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}
