import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

/* Initialize firebaseApp only if it isn't already intialized
 *
 * We do this to avoid the following error:
 * FirebaseError: Firebase: Firebase App named '[DEFAULT]' already exists with different options or config (app/duplicate-app).
 */
export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
export const firebaseAuth = getAuth(firebaseApp);
