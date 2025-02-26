import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

import './globals.css';
import { firebaseAuth } from '@/src/configs/firebaseConfig';

// Display the sign in screen until user signs in
export default function RootLayout() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/');
    }
  }, [user]);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
    </Stack>
  );
}
