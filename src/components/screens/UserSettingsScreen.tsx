import { View, Pressable, Text, Button, ScrollView } from 'react-native';

const UserSettingsScreen = () => {
  return (
    <ScrollView>
      <View className="flex-1 gap-8 justify-start items-center py-10">
        <Pressable className="text-center bg-blue-500 px-5 py-3">
          <Text className="text-xl text-white font-semibold">Create Band</Text>
        </Pressable>
        <Pressable className="text-center bg-blue-500 px-5 py-3">
          <Text className="text-xl text-white font-semibold">
            Link Existing Band
          </Text>
        </Pressable>
        <Button title="Sign out" />
      </View>
    </ScrollView>
  );
};

export default UserSettingsScreen;
