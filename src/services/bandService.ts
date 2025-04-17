import {
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { FirestoreUserType } from '../types/FirestoreUserType';
import { FirestoreBandType } from '../types/FirestoreBandType';

export async function createNewBandService(
  fireStoreDB: any,
  userId: string,
  bandName: string
): Promise<void> {
  if (!userId) {
    throw new Error('User is invalid');
  }
  if (!bandName) {
    throw new Error('Band name required');
  }

  // Get user document
  const docRef = doc(fireStoreDB, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('User doc not found');
  }

  // Check if name is taken
  const bandNames: string[] = docSnap.data().band_names;
  if (bandNames.includes(bandName)) {
    throw new Error(
      'You already have a band by that name. Please enter a different name'
    );
  }

  // Create new band document
  const bandPayload: FirestoreBandType = {
    name: bandName,
    members: [userId],
  };
  const bandDoc = await addDoc(collection(fireStoreDB, 'bands'), {
    name: bandPayload.name,
    members: bandPayload.members,
  });

  // Update user document
  const userPayload: FirestoreUserType = {
    band_names: [bandName],
    band_ids: [bandDoc.id],
  };
  await updateDoc(docRef, {
    band_names: arrayUnion(...userPayload.band_names),
    band_ids: arrayUnion(...userPayload.band_ids),
  });
}
