import React, { useState, useCallback } from 'react';
import { View, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

// Simple email regex for basic validation (not exhaustive)
const EMAIL_RE = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = useCallback(() => {
    const nextErrors = { email: '', password: '' };
    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!EMAIL_RE.test(email.trim())) {
      nextErrors.email = 'Invalid email format';
    }
    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Minimum 6 characters';
    }
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  }, [email, password]);

  const onSubmit = useCallback(async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      // Simulate network call
      await new Promise(r => setTimeout(r, 1200));
      // Placeholder auth logic
      if (email === 'user@example.com' && password === 'password123') {
        Alert.alert('Login Successful', 'Welcome back!');
        router.replace('/'); // navigate to home tab
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (e) {
      Alert.alert('Error', 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [email, password, validate]);

  return (
    <ThemedView style={{ flex: 1 }} className="px-6 pt-16 bg-background">
      <View className="mb-10">
        <ThemedText type="title" className="mb-2">Sign In</ThemedText>
        <ThemedText type="subtitle">Access your Bongipay account</ThemedText>
      </View>

      <View className="gap-5">
        <View>
          <ThemedText type="defaultSemiBold" className="mb-2">Email</ThemedText>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-3 text-base bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholderTextColor="#888"
            returnKeyType="next"
            onSubmitEditing={() => validate()}
          />
          {errors.email ? <ThemedText className="text-red-500 mt-1">{errors.email}</ThemedText> : null}
        </View>

        <View>
          <ThemedText type="defaultSemiBold" className="mb-2">Password</ThemedText>
          <View className="flex-row items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2">
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#888"
              className="flex-1 py-3 px-2 text-base text-black dark:text-white"
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowPassword(p => !p)}
              className="px-3 py-1"
            >
              <ThemedText type="link">{showPassword ? 'Hide' : 'Show'}</ThemedText>
            </Pressable>
          </View>
          {errors.password ? <ThemedText className="text-red-500 mt-1">{errors.password}</ThemedText> : null}
        </View>

        <Pressable
          disabled={loading}
            accessibilityRole="button"
          onPress={onSubmit}
          className={`mt-2 rounded-md py-4 items-center ${loading ? 'bg-gray-400' : 'bg-blue-600'} active:opacity-80`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText type="defaultSemiBold" className="text-white">Sign In</ThemedText>
          )}
        </Pressable>

        <View className="flex-row justify-center mt-4">
          <ThemedText>Forgot password? </ThemedText>
          <Pressable onPress={() => Alert.alert('Info', 'Reset password flow not implemented yet.')}>
            <ThemedText type="link" className="text-blue-600 dark:text-blue-400">Reset</ThemedText>
          </Pressable>
        </View>

        <View className="flex-row justify-center mt-2">
          <ThemedText>Need an account? </ThemedText>
          <Pressable onPress={() => Alert.alert('Info', 'Registration flow not implemented yet.')}>
            <ThemedText type="link" className="text-blue-600 dark:text-blue-400">Create one</ThemedText>
          </Pressable>
        </View>
      </View>

      <View className="flex-1" />
      <View className="items-center mb-8">
        <ThemedText className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Bongipay</ThemedText>
      </View>
    </ThemedView>
  );
}

