import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'expo-router';

import { firebaseAuth } from '@/src/configs/firebaseConfig';
import { AuthContextType } from '../types/AuthContextType';

// Functions are required by AuthContextType, so default them to empty functions
const AuthContext = createContext<AuthContextType>({
  authState: { user: null, sessionActive: false },
  registerUser: async () => {},
  loginUser: async () => {},
  signoutUser: async () => {},
  isLoading: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [authState, setAuthState] = useState<{
    user: User | null;
    sessionActive: boolean;
  }>({ user: null, sessionActive: false });
  const [loading, setLoading] = useState(true);

  const auth = firebaseAuth;

  // occurs on component mount
  useEffect(() => {
    const unsubscribeFunc = onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user', user);

      // Auth state persists between sessions (see @/src/configs/firebaseConfig), so sessionActive does NOT default to false
      setAuthState({ user: user, sessionActive: user ? true : false });
      setLoading(false);
    });
    return unsubscribeFunc;
  }, []);
  // TODO: signing out still lets me swipe back to home screen. Fix
  useEffect(() => {
    if (loading) return;

    if (authState.sessionActive) {
      router.replace('/(tabs)');
    } else {
      console.log('FROM USEEFFECT');
      router.back();
      router.replace('/(auth)');
    }
  }, [authState]);

  /* Auth Functions
   */
  const loginExistingUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('signInWithEmailAndPassword_response', response);
      setAuthState({ user: response.user, sessionActive: true });
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
  const createNewUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('createUserWithEmailAndPassword_response', response);
      setAuthState({ user: response.user, sessionActive: true });
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
  const signOutUser = async () => {
    setLoading(true);
    try {
      const response = await signOut(auth);
      console.log('signOut_response', response);
      setAuthState({ user: null, sessionActive: false });
    } catch (error: any) {
      console.log(error);
      alert(
        'Error signing out user: ' +
          error.message +
          '\n\nPlease send a description and screenshot of this error to a.villate@ufl.edu'
      );
    } finally {
      setLoading(false);
    }
  };

  const value = {
    authState: authState,
    registerUser: createNewUser,
    loginUser: loginExistingUser,
    signoutUser: signOutUser,
    isLoading: loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
