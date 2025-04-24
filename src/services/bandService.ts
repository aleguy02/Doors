import { getDoc, addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import { FirestoreBandType } from '../types/FirestoreBandType';

export async function createNewBandService(
  fireStoreDB: any,
  user: User,
  bandName: string
): Promise<string> {
  if (!user || !user.email) {
    throw new Error('User is invalid');
  }
  if (!bandName) {
    throw new Error('Band name required');
  }

  // Get user document
  const docRef = doc(fireStoreDB, 'users', user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('User doc not found');
  }

  // Check if name is taken
  const bands: Record<string, string> = docSnap.data().bands;
  if (bandName in bands) {
    throw new Error(
      'You already have a band by that name. Please enter a different name'
    );
  }

  // Create new band document
  const bandPayload: FirestoreBandType = {
    name: bandName,
    owner: user.email,
    members: [],
  };
  const bandDoc = await addDoc(collection(fireStoreDB, 'bands'), {
    name: bandPayload.name,
    owner: bandPayload.owner,
    members: bandPayload.members,
  });

  await updateDoc(docRef, {
    // band_names: arrayUnion(...userPayload.band_names),
    // band_ids: arrayUnion(...userPayload.band_ids),
    [`bands.${bandName}`]: bandDoc.id,
  });

  return bandDoc.id;
}
