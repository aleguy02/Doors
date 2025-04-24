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
    [`bands.${bandName}`]: bandDoc.id,
  });

  return bandDoc.id;
}

export async function getBandIDs(
  fireStoreDB: any,
  user: User
): Promise<Record<string, string>> {
  if (!user || !user.email) {
    throw new Error('User is invalid');
  }

  // Get user document
  const docRef = doc(fireStoreDB, 'users', user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('User doc not found');
  }

  // getIDs
  const bands: Record<string, string> = docSnap.data().bands;
  return bands;
}

export async function getBandInfo(
  fireStoreDB: any,
  ids: string[]
): Promise<Record<string, FirestoreBandType>> {
  return await arrayToRecordAsync<FirestoreBandType>(ids, async (id) => {
    const docRef = doc(fireStoreDB, 'bands', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('User doc not found');
    }
    return {
      name: docSnap.get('name'),
      owner: docSnap.get('owner'),
      members: docSnap.get('members'),
    } as FirestoreBandType;
  });
}

// helper function
// function arrayToRecord<T>(
//   keys: string[],
//   callback: (key: string) => T
// ): Record<string, T> {
//   return keys.reduce((acc, curr) => {
//     acc[curr] = callback(curr);
//     return acc;
//   }, {} as Record<string, T>);
// }

async function arrayToRecordAsync<T>(
  keys: string[],
  callback: (key: string) => Promise<T>
): Promise<Record<string, T>> {
  const entries = await Promise.all(
    keys.map(async (key) => [key, await callback(key)] as const)
  );

  return Object.fromEntries(entries) as Record<string, T>;
}
