import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

import './globals.css';
import { firebaseAuth } from '@/src/configs/firebaseConfig';

// Display the sign in screen until user signs in
export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
