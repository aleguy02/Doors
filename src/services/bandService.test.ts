import { User } from 'firebase/auth';
import { createNewBandService } from './bandService';
import { getDoc, addDoc, collection, doc, updateDoc } from 'firebase/firestore';

/* ==== SETUP ==== */
jest.mock('firebase/auth', () => ({
  User: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));
const mockFirestoreDB = {};
const mockUser = { uid: 'user123', email: 'fake@gmail.com' } as User;
const mockBandName = 'Test Band';

/* ==== TESTS ==== */
describe('createNewBandService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Create new band and store band data in Firestore', async () => {
    const mockUserDoc = {
      exists: jest.fn().mockReturnValue(true),
      // data: jest.fn().mockReturnValue({ band_names: [] }),
      data: jest.fn().mockReturnValue({ bands: {} }),
    };
    const mockBandsCollection = {};
    const mockBandDoc = { id: 'band123' };

    (doc as jest.Mock).mockReturnValue('mockDocRef');
    (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);
    (collection as jest.Mock).mockResolvedValue(mockBandsCollection);
    (addDoc as jest.Mock).mockResolvedValue(mockBandDoc);

    await createNewBandService(mockFirestoreDB, mockUser, mockBandName);

    expect(doc).toHaveBeenCalledWith(mockFirestoreDB, 'users', mockUser.uid);
    expect(getDoc).toHaveBeenCalledWith('mockDocRef');
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: mockBandName,
      members: [mockUser.email],
    });
    expect(updateDoc).toHaveBeenCalledWith('mockDocRef', {
      [`bands.${mockBandName}`]: mockBandDoc.id,
    });
  });

  test('Throws error if userId is invalid', async () => {
    const mockInvalidUser = {} as User;
    await expect(
      createNewBandService(mockFirestoreDB, mockInvalidUser, mockBandName)
    ).rejects.toThrow('User is invalid');
  });

  test('Throws error if bandName is missing', async () => {
    await expect(
      createNewBandService(mockFirestoreDB, mockUser, '')
    ).rejects.toThrow('Band name required');
  });

  test('Throws error if user document does not exist', async () => {
    const mockUserDoc = {
      exists: jest.fn().mockReturnValue(false),
    };

    (doc as jest.Mock).mockReturnValue('mockDocRef');
    (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);

    await expect(
      createNewBandService(mockFirestoreDB, mockUser, mockBandName)
    ).rejects.toThrow('User doc not found');
  });

  test('Throws error if band name is already taken', async () => {
    const mockUserDoc = {
      exists: jest.fn().mockReturnValue(true),
      data: jest
        .fn()
        .mockReturnValue({ bands: { [mockBandName]: 'bandID123' } }),
    };

    (doc as jest.Mock).mockReturnValue('mockDocRef');
    (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);

    await expect(
      createNewBandService(mockFirestoreDB, mockUser, mockBandName)
    ).rejects.toThrow(
      'You already have a band by that name. Please enter a different name'
    );
    expect(addDoc).not.toHaveBeenCalled();
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
