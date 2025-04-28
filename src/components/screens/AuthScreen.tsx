import { useState } from 'react';
import {
  TextInput,
  Text,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import { useAuth } from '../../contexts/AuthContext';

/* I recommend Simon Grimm's "Super Easy React Native AUTHENTICATION with Firebase 🔒" on YouTube to get started
 * with authentication in React Native
 */
const AuthScreen = () => {
  const { registerUser, loginUser, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView>
      <KeyboardAvoidingView
        id="main-content"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex px-6 py-10 gap-6"
      >
        <Text className="font-semibold text-3xl">Welcome 🤘</Text>
        <View
          id="form"
          className="flex flex-col justify-center items-end gap-4 self-stretch"
        >
          <View className="flex flex-col items-start gap-2 self-stretch">
            <Text>Email</Text>
            <TextInput
              className="bg-gray-200 p-4 border border-gray-300 rounded-md self-stretch"
              placeholder="example@email.com"
              placeholderTextColor="#8897AD"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View className="flex flex-col items-start gap-2 self-stretch">
            <Text className="mb-2 text-gray-700">Password</Text>
            <TextInput
              className="bg-gray-200 p-4 border border-gray-300 rounded-md self-stretch"
              placeholder="CapitalSomewhere123"
              placeholderTextColor="#8897AD"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button title="Log In" onPress={() => loginUser(email, password)} />
            <Button
              title="Sign Up"
              onPress={() => registerUser(email, password)}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AuthScreen;
