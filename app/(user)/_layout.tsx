import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#C91517',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: 'User Settings',
      }}
    >
      <Stack.Screen
        name="managebands"
        options={{
          headerTitle: 'My Bands',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
