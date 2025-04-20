import React from 'react';
import { ScrollView, View } from 'react-native';

import CustomButton from '../buttons/CustomButton';

const dummy_data = { gnomefest: 'band123', 'Idle Hands': 'another123' };

const button_map = Object.entries(dummy_data).map(([name, id]) => {
  return (
    <CustomButton key={name} variant={'long'} text={name} onPress={() => {}} />
  );
});

export default function ManageBandsScreen() {
  return (
    <ScrollView>
      <View className="flex-1 gap-8 justify-start items-center py-10">
        {button_map}
      </View>
    </ScrollView>
  );
}
