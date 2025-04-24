import React from 'react';
import { ScrollView, View } from 'react-native';

import CustomButton from '../buttons/CustomButton';

interface ManageBandsScreenType {
  onButtonPress: (bandName: string) => void;
  bandsData: Record<string, string>;
}

const ManageBandsScreen = ({
  onButtonPress,
  bandsData,
}: ManageBandsScreenType) => {
  const button_map = Object.entries(bandsData).map(([name, id]) => {
    return (
      <CustomButton
        key={name}
        variant={'long'}
        text={name}
        onPress={() => onButtonPress(id)}
      />
    );
  });

  return (
    <ScrollView>
      <View className="flex-1 gap-8 justify-start items-center py-10">
        {button_map}
      </View>
    </ScrollView>
  );
};

export default ManageBandsScreen;
