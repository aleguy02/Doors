import { Tabs } from 'expo-router';

import UserHeaderButton from '@/src/components/buttons/UserHeaderButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#C91517',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#C91517',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: 'none', borderTopWidth: 0 },
        headerRight: () => <UserHeaderButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: 'Payment',
        }}
      />
    </Tabs>
  );
}
