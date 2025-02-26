import { Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const UserHeaderButton = () => {
  const router = useRouter();
  const redirectToUserScreen = () => {
    router.push('/(user)');
  };

  return (
    <Pressable className="flex" onPress={redirectToUserScreen}>
      <Image
        className="w-12 h-12"
        source={require('../../../assets/icons/User_Circle.png')}
      />
    </Pressable>
  );
};

export default UserHeaderButton;
