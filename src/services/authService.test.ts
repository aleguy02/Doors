import { createNewUserService } from './authService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  setDoc,
  doc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';

/* First, jest parses this file and sees that we're mocking firebase auth.
 * Then, when the file is compiled/executed, the import from firebase auth gets overriden to resolve to this mock object
 */
jest.mock('firebase/auth', () => {
  return { createUserWithEmailAndPassword: jest.fn() };
});
jest.mock('firebase/firestore', () => {
  return {
    doc: jest.fn(),
    setDoc: jest.fn(),
  };
});

const mock_user = { uid: '123' };
const mockument = {}; // as DocumentReference<DocumentData, DocumentData>;

describe('createNewUserService', () => {
  test('Create a new user and store user data in Firestore', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mock_user,
    });
    (doc as jest.Mock).mockReturnValue(mockument);
    (setDoc as jest.Mock).mockResolvedValue(null);

    const service_response = await createNewUserService(
      'test@gmail.com',
      'password1'
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // firebase Auth
      'test@gmail.com',
      'password1'
    );
    expect(doc).toHaveBeenCalledWith(
      expect.anything(), // firebase Auth
      'users',
      mock_user.uid
    );
    expect(setDoc).toHaveBeenCalledWith(mockument, {
      band_ids: [],
      band_names: [],
    });
    expect(service_response).toBe(mock_user);
  });
});
