import { createNewBandService } from './bandService';
import {
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

/* ==== SETUP ==== */
jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
}));
const mockFirestoreDB = {};
const mockUserId = 'user123';
const mockBandName = 'Test Band';

/* ==== TESTS ==== */
describe('createNewBandService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Create new band and store band data in Firestore', async () => {
    const mockUserDoc = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue({ band_names: [] }),
    };
    const mockBandsCollection = {};

    (doc as jest.Mock).mockReturnValue('mockDocRef');
    (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);
    (addDoc as jest.Mock).mockResolvedValue({ id: 'band123' });
    (collection as jest.Mock).mockResolvedValue(mockBandsCollection);
    (arrayUnion as jest.Mock).mockImplementation((...args) => args);

    await createNewBandService(mockFirestoreDB, mockUserId, mockBandName);

    expect(doc).toHaveBeenCalledWith(mockFirestoreDB, 'users', mockUserId);
    expect(getDoc).toHaveBeenCalledWith('mockDocRef');
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: mockBandName,
      members: [mockUserId],
    });
    expect(updateDoc).toHaveBeenCalledWith('mockDocRef', {
      band_names: [mockBandName],
      band_ids: ['band123'],
    });
  });

  test('Throws error if userId is invalid', async () => {
    await expect(
      createNewBandService(mockFirestoreDB, '', mockBandName)
    ).rejects.toThrow('User is invalid');
  });

  test('Throws error if bandName is missing', async () => {
    await expect(
      createNewBandService(mockFirestoreDB, mockUserId, '')
    ).rejects.toThrow('Band name required');
  });

  test('Throws error if user document does not exist', async () => {
    const mockUserDoc = {
      exists: jest.fn().mockReturnValue(false),
    };

    (doc as jest.Mock).mockReturnValue('mockDocRef');
    (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);

    await expect(
      createNewBandService(mockFirestoreDB, mockUserId, mockBandName)
    ).rejects.toThrow('User doc not found');
  });

  test('Throws error if band name is already taken', async () => {
    const mockUserDoc = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue({ band_names: [mockBandName] }),
    };

    (doc as jest.Mock).mockReturnValue('mockDocRef');
    (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);

    await expect(
      createNewBandService(mockFirestoreDB, mockUserId, mockBandName)
    ).rejects.toThrow(
      'You already have a band by that name. Please enter a different name'
    );
    expect(addDoc).not.toHaveBeenCalled();
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
