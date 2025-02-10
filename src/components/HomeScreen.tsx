import React from 'react';
import { Text, View, Button } from 'react-native';

// TODO: rename this
type Foo = {
  has_scheduled_shows: Boolean;
};

const HomeScreen = (props: Foo) => {
  if (!props.has_scheduled_shows) {
    return (
      <View className="flex-1 gap-8 justify-start items-center py-10">
        <Text>
          Looks like you haven’t done any shows yet. Schedule a new show to get
          started.
        </Text>
        <Button title="New Show" />
      </View>
    );
  }

  return (
    <View className="flex-1 gap-8 justify-start items-center py-10">
      <Button title="New Show" />
    </View>
  );
};

export default HomeScreen;
