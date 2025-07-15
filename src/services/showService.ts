import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

import { FirestoreShowType } from '../types/FirestoreShowType';

export async function createNewShowService(
  fireStoreDB: any,
  user: User,
  showName: string,
  showDate: string,
  showLocation: string,
  bandId: string
): Promise<string> {
  if (!user || !user.email) {
    throw new Error('User is invalid');
  }
  if (!showName) {
    throw new Error('Show name is required');
  }
  if (!showDate) {
    throw new Error('Show date is required');
  }
  if (!showLocation) {
    throw new Error('Show location is required');
  }
  if (!bandId) {
    throw new Error('Band selection is required');
  }
  if (showName.length > 50) {
    throw new Error('Show name must be 50 characters or less');
  }
  if (showLocation.length > 100) {
    throw new Error('Show location must be 100 characters or less');
  }

  // Validate date format (basic check)
  const dateObj = new Date(showDate);
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date format');
  }

  // Check if date is in the future
  if (dateObj < new Date()) {
    throw new Error('Show date must be in the future');
  }

  // Verify band exists and user has access to it
  const bandDocRef = doc(fireStoreDB, 'bands', bandId);
  const bandDocSnap = await getDoc(bandDocRef);
  
  if (!bandDocSnap.exists()) {
    throw new Error('Band not found');
  }

  // Check if user is owner or member of the band
  const bandData = bandDocSnap.data();
  const isOwner = bandData.owner === user.email;
  const isMember = bandData.members.includes(user.email);
  
  if (!isOwner && !isMember) {
    throw new Error('You do not have permission to create shows for this band');
  }

  // Create new show document
  const showPayload: FirestoreShowType = {
    name: showName,
    date: showDate,
    location: showLocation,
    bandId: bandId,
  };

  const showDoc = await addDoc(collection(fireStoreDB, 'shows'), {
    name: showPayload.name,
    date: showPayload.date,
    location: showPayload.location,
    bandId: showPayload.bandId,
    owner: user.email,
    createdAt: new Date().toISOString(),
  });
  
  // Add show ID to band's shows array
  try {
    await updateDoc(bandDocRef, {
      shows: arrayUnion(showDoc.id),
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update band with show information');
  }

  return showDoc.id;
}

export async function getBandShowsService(
  fireStoreDB: any,
  bandId: string
): Promise<FirestoreShowType[]> {
  if (!bandId) {
    throw new Error('Band ID is required');
  }

  // Get band document to get show IDs
  const bandDocRef = doc(fireStoreDB, 'bands', bandId);
  const bandDocSnap = await getDoc(bandDocRef);
  
  if (!bandDocSnap.exists()) {
    throw new Error('Band not found');
  }

  const bandData = bandDocSnap.data();
//   const showIds = bandData.shows || [];
  const showIds = bandData.shows;

  if (showIds.length === 0) {
    return [];
  }

  // Fetch each show document
  const shows: FirestoreShowType[] = [];
  for (const showId of showIds) {
    try {
      const showDocRef = doc(fireStoreDB, 'shows', showId);
      const showDocSnap = await getDoc(showDocRef);
      
      if (showDocSnap.exists()) {
        const showData = showDocSnap.data();
        shows.push({
          name: showData.name,
          date: showData.date,
          location: showData.location,
          bandId: showData.bandId,
        });
      }
    } catch (error) {
      console.log(`Error fetching show ${showId}:`, error);
    }
  }

  // Sort shows by date (most recent first)
  shows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return shows;
}
