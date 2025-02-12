import React from 'react';
import { View, Pressable, Text, ScrollView } from 'react-native';

/* The array type is an object containing information about the specific payment platform
 * such as name and redirect link
 */
interface Platform {
  name: string;
  link?: string;
}
const platform_info_arr: Platform[] = [
  { name: 'Venmo', link: 'www.google.com' },
  { name: 'Apple Cash' },
  { name: 'Zelle' },
  { name: 'Cash App' },
];

const PaymentScreen = () => {
  // Map platform_info_arr to custom button components
  const platform_list = platform_info_arr.map((platform_info) => {
    return (
      <Pressable
        className="rounded-sm w-48 py-3 bg-blue-500"
        key={platform_info.name}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-white font-semibold">{`Set up ${platform_info.name}`}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <ScrollView>
      <View className="flex-1 gap-8 justify-start items-center py-10">
        {platform_list}
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
