import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const Footer = () => {
  return (
    <View className="bg-red-600">
      <Link href="/payment">
        <View>
          <Text>PAYMENT</Text>
        </View>
      </Link>
    </View>
  );
};

export default Footer;
