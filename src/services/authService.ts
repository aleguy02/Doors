import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, fireStoreDB } from '../configs/firebaseConfig';
import { FirestoreUserType } from '../types/FirestoreUserType';

export async function loginExistingUserService(
  email: string,
  password: string
): Promise<User> {
  const response = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  console.log('signInWithEmailAndPassword_response', response);
  return response.user;
}

export async function createNewUserService(
  email: string,
  password: string
): Promise<User> {
  const response = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  console.log('createUserWithEmailAndPassword_response', response);
  const user_data: FirestoreUserType = {
    band_ids: [],
    band_names: [],
  };
  await setDoc(doc(fireStoreDB, 'users', response.user.uid), user_data);
  return response.user;
}

export async function signOutUserService(): Promise<void> {
  const response = await signOut(firebaseAuth);
  console.log('signOut_response', response);
}
