import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../store/AuthStore';

export default function LoginScreen({ navigation }: any) {
    const { colors } = useTheme();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const can = useMemo(() => email.trim() && password.trim(), [email, password]);

    const onLogin = () => {
        login(email.trim(), password);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.bg }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={{ flex: 1, padding: 18, justifyContent: 'center' }}>
                <View
                    style={{
                        backgroundColor: colors.card,
                        borderRadius: 22,
                        borderWidth: 1,
                        borderColor: colors.border,
                        padding: 18,
                    }}
                >
                    <Text style={{ color: colors.text, fontSize: 26, fontWeight: '900' }}>Welcome back</Text>
                    <Text style={{ color: colors.sub, marginTop: 6 }}>
                        Login to continue managing your money.
                    </Text>

                    <Text style={{ color: colors.sub, marginTop: 16, fontWeight: '800' }}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        placeholderTextColor={colors.sub}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{
                            marginTop: 8,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.bg,
                            borderRadius: 16,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            color: colors.text,
                        }}
                    />

                    <Text style={{ color: colors.sub, marginTop: 12, fontWeight: '800' }}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        placeholderTextColor={colors.sub}
                        secureTextEntry
                        style={{
                            marginTop: 8,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.bg,
                            borderRadius: 16,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            color: colors.text,
                        }}
                    />

                    {!!err && <Text style={{ color: '#fb7185', marginTop: 10, fontWeight: '800' }}>{err}</Text>}

                    <Pressable
                        onPress={onLogin}
                        disabled={!can}
                        style={{
                            marginTop: 14,
                            backgroundColor: can ? colors.primary : colors.border,
                            paddingVertical: 14,
                            borderRadius: 16,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '900', fontSize: 16 }}>Login</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Signup')} style={{ marginTop: 14 }}>
                        <Text style={{ color: colors.sub, textAlign: 'center' }}>
                            New here? <Text style={{ color: colors.primary, fontWeight: '900' }}>Create account</Text>
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
