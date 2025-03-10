import { User } from 'firebase/auth';

export interface AuthContextType {
  authState: { user: User | null; sessionActive: boolean };
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  signoutUser: () => Promise<void>;
  isLoading: boolean;
}
