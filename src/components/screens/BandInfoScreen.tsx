import React from 'react';
import { ScrollView, View, Text, Pressable, Button, Alert } from 'react-native';

import CustomButton from '../buttons/CustomButton';
import { FirestoreBandType } from '../../types/FirestoreBandType';

interface BandInfoScreenType {
  onButtonPress: (bandName: string) => void;
  code: string;
  info: FirestoreBandType;
}

// const dummy_band_member_data: Record<string, FirestoreBandType> = {
//   band123: {
//     owner: 'darthaleguy@gmail.com',
//     members: ['fake@gmail.com'],
//     name: 'The Gnomies',
//   },
//   another123: {
//     owner: 'darthaleguy@gmail.com',
//     members: [],
//     name: 'Idle Hands',
//   },
// };
const BandInfoScreen = ({ onButtonPress, code, info }: BandInfoScreenType) => {
  const members_list = info.members.map((email) => {
    return (
      <View
        className="flex flex-row justify-between items-center self-stretch"
        key={email}
      >
        <Text className="text-xl">{email}</Text>
        <Pressable
          onPress={() => {
            console.log(`removed ${email}`);
          }}
        >
          <Text>TRASH</Text>
        </Pressable>
      </View>
    );
  });
  return (
    <View
      id="main-content"
      className="flex flex-col h-full items-center justify-between px-2 pt-5 pb-32"
    >
      <View className="flex flex-col w-full items-center gap-6">
        <View
          id="band-name"
          className="flex justify-center items-start self-stretch px-2"
        >
          <Text className="text-5xl">{info.name}</Text>
        </View>
        <View
          id="members"
          className="flex flex-col px-2 justify-center items-start gap-2 self-stretch"
        >
          <Text className="font-semibold text-4xl">Members</Text>
          <Text className="text-xl">{info.owner}</Text>
          {members_list}
        </View>
        <CustomButton
          text="View Code"
          variant="long"
          onPress={() => {
            Alert.alert(code);
          }}
        />
        <Button
          title="Delete Band"
          color="#ED0000"
          onPress={() => Alert.alert('Delete band')}
        />
      </View>

      <CustomButton
        text="All Bands"
        variant="long"
        onPress={() => onButtonPress('')}
      />
    </View>
  );
};

export default BandInfoScreen;
