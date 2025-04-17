import { Text, View, ScrollView } from 'react-native';

import CustomButton from '../buttons/CustomButton';

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
        <CustomButton text="New Show" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
