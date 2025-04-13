import { User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

// TODO: I can make some stuff readonly, that would be sweeeet if I learn how to write better Types
export interface AuthContextType {
  authState: { user: User | null; sessionActive: boolean };
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  signoutUser: () => Promise<void>;
  isLoading: boolean;
  fireStoreDB: Firestore;
}
