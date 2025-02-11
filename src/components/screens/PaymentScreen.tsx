import React from 'react';
import { View, Button } from 'react-native';

/* The array type is an object containing information about the specific payment platform
 * such as name and redirect link
 */
interface Platform {
  name: string;
  link?: string;
}

const PaymentScreen = () => {
  const platform_info_arr: Platform[] = [
    { name: 'Venmo', link: 'www.google.com' },
    { name: 'Apple Cash' },
    { name: 'Zelle' },
    { name: 'Cash App' },
  ];

  return (
    <View className="flex-1 gap-8 justify-start items-center py-10">
      <Button title="Set up" />
    </View>
  );
};

export default PaymentScreen;
