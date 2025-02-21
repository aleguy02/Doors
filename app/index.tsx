import { useState } from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { firebaseAuth } from '@/src/configs/firebaseConfig';

// credit to Simon Grimm's "Super Easy React Native AUTHENTICATION with Firebase 🔒" on YouTube for template code
export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

  /* Signing in and creating users
   * These two functions create or sign in a user using firebase authentication
   */
  const signInExistingUser = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('signInWithEmailAndPassword_response', response);
    } catch (error: any) {
      console.log(error);
      alert(
        'Error signing in user: ' +
          error.message +
          '\n\nPlease send a description and screenshot of this error to a.villate@ufl.edu'
      );
    } finally {
      setLoading(false);
    }
  };
  const createNewUser = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert(
        'Error creating new user: ' +
          error.message +
          '\n\nPlease send a description and screenshot of this error to a.villate@ufl.edu'
      );
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <ActivityIndicator size="large"></ActivityIndicator>
        ) : (
          <>
            <Button title="Log In" onPress={signInExistingUser}></Button>
            <Button title="Sign Up" onPress={createNewUser}></Button>
          </>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
