import { View, ScrollView } from 'react-native';

import CustomButton from '@/src/components/buttons/CustomButton';

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
      <CustomButton
        key={platform_info.name}
        variant={'long'}
        text={`Set up ${platform_info.name}`}
        onPress={() => {}}
      />
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
