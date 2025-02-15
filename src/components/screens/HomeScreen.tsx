import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';

// TODO: rename this
interface Foo {
  has_scheduled_shows: Boolean;
}

const HomeScreen = (props: Foo) => {
  return (
    <ScrollView>
      <View className="flex-1 gap-8 justify-start items-center py-10">
        {!props.has_scheduled_shows && (
          <Text>
            Looks like you haven’t done any shows yet. Schedule a new show to
            get started.
          </Text>
        )}
        <Pressable className="text-center bg-blue-500 px-5 py-3">
          <Text className="text-xl text-white font-semibold">New Show</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
