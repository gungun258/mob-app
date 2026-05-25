import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFBFE',
    card: '#FFFFFF',
    text: '#1A1A2E',
    border: '#F1F0FB',
    primary: '#8B5CF6',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={LightTheme}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FAFBFE' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="signup" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="seller-profile" options={{ headerShown: false }} />
        <Stack.Screen name="listing-detail" options={{ headerShown: false }} />
        <Stack.Screen name="view-all-sellers" options={{ headerShown: false }} />
        <Stack.Screen name="generated-result" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen name="referrals" options={{ headerShown: false }} />
        <Stack.Screen name="credits" options={{ headerShown: false }} />
        <Stack.Screen name="wishlist" options={{ headerShown: false }} />
        <Stack.Screen name="seller-dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="add-listing" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
