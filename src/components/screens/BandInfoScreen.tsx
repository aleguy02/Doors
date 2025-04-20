import React from 'react';
import { ScrollView, View } from 'react-native';

import CustomButton from '../buttons/CustomButton';

interface BandInfoScreenType {
  onButtonPress: (bandName: string) => void;
  name: string;
  id: string;
}

const BandInfoScreen = ({ onButtonPress, name, id }: BandInfoScreenType) => {
  return (
    <ScrollView>
      <View className="bg-red-300 flex-1 gap-8 justify-start items-center py-10">
        <CustomButton key={name} text={name} onPress={() => console.log(id)} />
        <CustomButton
          text="All Bands"
          variant="long"
          onPress={() => onButtonPress('')}
        />
      </View>
    </ScrollView>
  );
};

export default BandInfoScreen;
