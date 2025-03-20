import { Pressable, Text } from 'react-native';

type variant_type = 'default' | 'long';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  variant?: variant_type;
}

// different styles are applied depending on the `variant` prop passed in
const variant_styles: Record<variant_type, string> = {
  default: 'bg-blue-500 px-5 py-3',
  long: 'w-64 bg-blue-500 px-5 py-3',
};

const CustomButton = ({
  text,
  onPress,
  variant = 'default',
}: CustomButtonProps) => {
  return (
    <Pressable className={variant_styles[variant]} onPress={onPress}>
      <Text className="text-xl text-center text-white font-semibold">
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
