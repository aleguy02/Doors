import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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
