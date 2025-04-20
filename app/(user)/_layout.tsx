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
        /* Disable back button visibility
         * It's my opinion that having a visible back button will cause confusion if ManageBands is a single-page.
         * Also, it clashes with the rest of the apps established UI.
         */
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="managebands/index"
        options={{
          headerTitle: 'My Bands',
        }}
      />
    </Stack>
  );
}
