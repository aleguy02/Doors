import { useState } from 'react';
import {
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 gap-8 justify-start items-center py-10"
      >
        <TextInput
          className="w-4/5 p-4 border border-gray-300 rounded-md"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          className="w-4/5 p-4 border border-gray-300 rounded-md"
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />

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
