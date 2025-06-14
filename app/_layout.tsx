import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

import './globals.css';
import { AuthProvider } from '@/src/contexts/AuthContext';

// Display the sign in screen until user signs in
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
      <Toast />
    </>
  );
}
