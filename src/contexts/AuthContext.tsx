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
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

import { firebaseAuth, fireStoreDB } from '@/src/configs/firebaseConfig';
import { AuthContextType } from '../types/AuthContextType';
import { FirestoreUserType } from '../types/FirestoreUserType';

// Functions are required by AuthContextType, so default them to empty functions
const AuthContext = createContext<AuthContextType>({
  authState: { user: null, sessionActive: false },
  registerUser: async () => {},
  loginUser: async () => {},
  signoutUser: async () => {},
  isLoading: false,
  // TODO: I'm not sure if this is the best/most secure way to do this. Should it start as null?
  fireStoreDB: fireStoreDB,
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
  useEffect(() => {
    if (loading) return;

    if (authState.sessionActive) {
      router.replace('/(tabs)');
    } else {
      /* Ensure complete navigation reset before directing to auth screen.
       * Issue: Signing out replaced (user) with (auth), allowing users to swipe
       * back to home while signed out. This forces a full reset to prevent that.
       */
      while (router.canGoBack()) {
        router.back();
      }
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

      const user_data: FirestoreUserType = {
        band_ids: [],
        band_names: [],
      };
      await setDoc(doc(fireStoreDB, 'users', response.user.uid), user_data);
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
  /*
   */

  const value = {
    authState: authState,
    registerUser: createNewUser,
    loginUser: loginExistingUser,
    signoutUser: signOutUser,
    isLoading: loading,
    fireStoreDB: fireStoreDB,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
