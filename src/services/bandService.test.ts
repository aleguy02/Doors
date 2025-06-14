import { User } from 'firebase/auth';
import { createNewBandService, getBandIDs, getBandInfo } from './bandService';
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
      owner: mockUser.email,
      members: [],
    });
    expect(updateDoc).toHaveBeenCalledWith('mockDocRef', {
      [`bands.${mockBandName}`]: mockBandDoc.id,
    });
  });

  test('Throws error if userId is invalid', async () => {
    expect.assertions(1);
    const mockInvalidUser = {} as User;
    await expect(
      createNewBandService(mockFirestoreDB, mockInvalidUser, mockBandName)
    ).rejects.toThrow('User is invalid');
  });

  test('Throws error if bandName is missing', async () => {
    expect.assertions(1);
    await expect(
      createNewBandService(mockFirestoreDB, mockUser, '')
    ).rejects.toThrow('Band name required');
  });

  test('Throws error if user document does not exist', async () => {
    expect.assertions(1);
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
    expect.assertions(3);
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

describe('Manage Bands suite', () => {
  describe('getBandIDs', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('Get user band IDs', async () => {
      const mockUserDoc = {
        exists: jest.fn().mockReturnValue(true),
        data: jest.fn().mockReturnValue({
          bands: { 'The Gnomies': 'id123', 'Idle Hands': 'another123' },
          email: mockUser.email,
        }),
      };
      (doc as jest.Mock).mockReturnValue('mockDocRef');
      (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);

      const service_response = await getBandIDs(mockFirestoreDB, mockUser);

      expect(doc).toHaveBeenCalledWith(mockFirestoreDB, 'users', mockUser.uid);
      expect(getDoc).toHaveBeenCalledWith('mockDocRef');
      expect(service_response).toStrictEqual({
        'The Gnomies': 'id123',
        'Idle Hands': 'another123',
      });
    });

    test('User is not a part of any bands', async () => {
      const mockUserDoc = {
        exists: jest.fn().mockReturnValue(true),
        data: jest.fn().mockReturnValue({
          bands: {},
          email: mockUser.email,
        }),
      };
      (doc as jest.Mock).mockReturnValue('mockDocRef');
      (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);

      const service_response = await getBandIDs(mockFirestoreDB, mockUser);

      expect(doc).toHaveBeenCalledWith(mockFirestoreDB, 'users', mockUser.uid);
      expect(getDoc).toHaveBeenCalledWith('mockDocRef');
      expect(service_response).toStrictEqual({});
    });

    test('Throws error if userId is invalid', async () => {
      expect.assertions(1);
      const mockInvalidUser = {} as User;
      await expect(
        getBandIDs(mockFirestoreDB, mockInvalidUser)
      ).rejects.toThrow('User is invalid');
    });

    test('Throws error if user document does not exist', async () => {
      expect.assertions(1);
      const mockUserDoc = {
        exists: jest.fn().mockReturnValue(false),
      };
      (doc as jest.Mock).mockReturnValue('mockDocRef');
      (getDoc as jest.Mock).mockResolvedValue(mockUserDoc);
      await expect(getBandIDs(mockFirestoreDB, mockUser)).rejects.toThrow(
        'User doc not found'
      );
    });
  });

  describe('getBandInfo', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('Populate band info object', async () => {
      const mockBandDoc1 = {
        exists: jest.fn().mockReturnValue(true),
        get: jest.fn().mockImplementation((field: string) => {
          const data: Record<string, any> = {
            name: 'The Gnomies',
            members: ['foo@gmail.com', 'bar@gmail.com'],
            owner: mockUser.email,
          };
          return data[field];
        }),
      };
      const mockBandDoc2 = {
        exists: jest.fn().mockReturnValue(true),
        get: jest.fn().mockImplementation((field: string) => {
          const data: Record<string, any> = {
            name: 'Idle Hands',
            members: [],
            owner: mockUser.email,
          };
          return data[field];
        }),
      };

      (getDoc as jest.Mock)
        .mockResolvedValueOnce(mockBandDoc1)
        .mockReturnValueOnce(mockBandDoc2);

      const expected = {
        band123: {
          owner: mockUser.email,
          members: ['foo@gmail.com', 'bar@gmail.com'],
          name: 'The Gnomies',
        },
        another123: {
          owner: mockUser.email,
          members: [],
          name: 'Idle Hands',
        },
      };
      const service_response = await getBandInfo(mockFirestoreDB, [
        'band123',
        'another123',
      ]);

      expect(service_response).toStrictEqual(expected);
    });
  });
});
