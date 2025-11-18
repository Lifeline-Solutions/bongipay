// Ensure `React` is available as a global in the browser runtime for packages
// that assume the classic JSX runtime (i.e. reference an unscoped `React`).
import * as ReactNamespace from 'react';
import * as ReactDOMNamespace from 'react-dom';
if (typeof globalThis !== 'undefined') {
  // Only assign if not already present to avoid clobbering existing values
  if (!(globalThis as any).React) {
    (globalThis as any).React = ReactNamespace;
  }
  if (!(globalThis as any).ReactDOM) {
    (globalThis as any).ReactDOM = ReactDOMNamespace;
  }
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
