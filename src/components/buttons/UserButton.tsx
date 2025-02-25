import { Image, Pressable, Text } from 'react-native';

const UserButton = () => {
  return (
    <Pressable
      onPress={() => {
        console.log('Pressed!');
      }}
    >
      {/* <Image source={require('../../../assets/icons/User_Cirle.png')} /> */}
      <Image source={require('../../../assets/icons/User_Circle.png')} />
    </Pressable>
  );
};

export default UserButton;
