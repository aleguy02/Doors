import { Stack } from 'expo-router';
import './globals.css';

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
