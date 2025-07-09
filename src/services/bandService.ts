import {
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
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
  if (bandName.length > 25) {
    throw new Error('Band name must be 25 characters or less');
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
    shows: [],
  };
  const bandDoc = await addDoc(collection(fireStoreDB, 'bands'), {
    name: bandPayload.name,
    owner: bandPayload.owner,
    members: bandPayload.members,
    shows: bandPayload.shows,
  });

  await updateDoc(docRef, {
    [`bands.${bandName}`]: bandDoc.id,
  });

  return bandDoc.id;
}

export async function linkBandService(
  fireStoreDB: any,
  user: User,
  id: string
): Promise<void> {
  if (!user || !user.email) {
    throw new Error('User is invalid');
  }
  if (!id) {
    throw new Error('Band ID required');
  }

  // Add user to band document. We don't have to check for duplication because firestore::arrayUnion handles that already (https://firebase.google.com/docs/firestore/manage-data/add-data)
  const bandDocRef = doc(fireStoreDB, 'bands', id);
  const bandDocSnap = await getDoc(bandDocRef);
  if (!bandDocSnap.exists()) {
    throw new Error('Band not found');
  }
  // save bandName for later
  const bandName = bandDocSnap.get('name');

  // Get user document
  const userDocRef = doc(fireStoreDB, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new Error('User doc not found');
  }

  // Check if name is taken (this also checks if I am the owner of a band)
  if (bandName in userDocSnap.get('bands')) {
    throw new Error(`You already have a band by that name (${bandName}).`);
  }
  if (bandDocSnap.get('members').length >= 6) {
    throw new Error('This band is full');
  }

  // Do all writes at the end
  await updateDoc(bandDocRef, { members: arrayUnion(user.email) });
  await updateDoc(userDocRef, { [`bands.${bandName}`]: id });
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
      throw new Error('Band doc not found');
    }
    return {
      name: docSnap.get('name'),
      owner: docSnap.get('owner'),
      members: docSnap.get('members'),
      shows: docSnap.get('shows'),
    } as FirestoreBandType;
  });
}

// Delete band service
export async function deleteBandService(
  fireStoreDB: any,
  user: User,
  code: string
): Promise<void> {
  if (!user || !user.email) {
    throw new Error('User is invalid');
  }
  if (!code) {
    throw new Error('Band ID required');
  }

  // Get the band document
  const bandDocRef = doc(fireStoreDB, 'bands', code);
  const bandDocSnap = await getDoc(bandDocRef);
  if (!bandDocSnap.exists()) {
    throw new Error('Band not found');
  }

  // Only allow the owner to delete the band
  const bandOwner = bandDocSnap.get('owner');
  if (bandOwner !== user.email) {
    throw new Error('Only the band owner can delete the band');
  }

  const bandName = bandDocSnap.get('name');
  const members: string[] = bandDocSnap.get('members') || [];
  members.push(bandDocSnap.get('owner'));

  // Remove band from each member's user document
  for (const memberEmail of members) {
    // Query user by email
    const usersCollection = collection(fireStoreDB, 'users');
    const q = query(usersCollection, where('email', '==', memberEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (userDocSnap) => {
      const userBands = userDocSnap.data().bands || {};
      if (userBands && bandName in userBands && userBands[bandName] === code) {
        const updatedBands = { ...userBands };
        delete updatedBands[bandName];
        await updateDoc(userDocSnap.ref, { bands: updatedBands });
      }
    });
  }

  // Delete the band document
  await deleteDoc(bandDocRef);
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
