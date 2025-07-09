import { createNewShowService } from './showService';

// Mock Firestore functions
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
}));

const mockFireStoreDB = {};
const mockUser = {
  uid: 'test-uid',
  email: 'test@example.com',
};

describe('createNewShowService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if user is invalid', async () => {
    await expect(
      createNewShowService(mockFireStoreDB, null as any, 'Test Show', '2025-12-31 20:00', 'Test Location', 'test-bandid')
    ).rejects.toThrow('User is invalid');
  });

  it('should throw error if show name is missing', async () => {
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, '', '2025-12-31 20:00', 'Test Location', 'test-bandid')
    ).rejects.toThrow('Show name is required');
  });

  it('should throw error if show date is missing', async () => {
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, 'Test Show', '', 'Test Location', 'test-bandid')
    ).rejects.toThrow('Show date is required');
  });

  it('should throw error if show location is missing', async () => {
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, 'Test Show', '2025-12-31 20:00', '', 'test-bandid')
    ).rejects.toThrow('Show location is required');
  });

  it('should throw error if show name is too long', async () => {
    const longName = 'a'.repeat(51);
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, longName, '2025-12-31 20:00', 'Test Location', 'test-bandid')
    ).rejects.toThrow('Show name must be 50 characters or less');
  });

  it('should throw error if show location is too long', async () => {
    const longLocation = 'a'.repeat(101);
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, 'Test Show', '2025-12-31 20:00', longLocation, 'test-bandid')
    ).rejects.toThrow('Show location must be 100 characters or less');
  });

  it('should throw error if band ID is missing', async () => {
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, 'Test Show', '2025-12-31 20:00','Test Location', '')
    ).rejects.toThrow('Band selection is required');
  });

  it('should throw error if date format is invalid', async () => {
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, 'Test Show', 'invalid-date', 'Test Location', 'test-bandid')
    ).rejects.toThrow('Invalid date format');
  });

  it('should throw error if date is in the past', async () => {
    const pastDate = '2020-01-01 12:00';
    await expect(
      createNewShowService(mockFireStoreDB, mockUser as any, 'Test Show', pastDate, 'Test Location', 'test-bandid')
    ).rejects.toThrow('Show date must be in the future');
  });
});
