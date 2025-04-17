import { loginExistingUserService, createNewUserService } from './authService';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

/* ==== SETUP ==== */
/* First, jest parses this file and sees that we're mocking firebase auth.
 * Then, when the file is compiled/executed, the import from firebase auth gets overriden to resolve to this mock object
 * So, our tests call a service function that calls these Firebase functions, but the ACTUAL function is replaced with
 * this here implementation of the function
 */
jest.mock('firebase/auth', () => {
  return {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(() => {
      return true;
    }),
  };
});
jest.mock('firebase/firestore', () => {
  return {
    doc: jest.fn(),
    setDoc: jest.fn(),
    getFirestore: jest.fn(() => {
      return true;
    }),
  };
});

// This prevents different tests from interfering with eachother
afterEach(() => {
  jest.clearAllMocks();
});

const mock_user = { uid: '123' };
const mockument = {};

/* ==== TESTS ==== */
describe('createNewUserService', () => {
  test('Create new user and store user data in Firestore', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mock_user,
    });
    (doc as jest.Mock).mockReturnValue(mockument); // I'm so funny
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

  test('Throws error if email or password is invalid', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error('Invalid email')
    );

    await expect(createNewUserService('badEmail', 'password')).rejects.toThrow(
      Error('Invalid email')
    );
    expect(doc).not.toHaveBeenCalled();
    expect(setDoc).not.toHaveBeenCalled();
  });
});

describe('loginExistingUserService', () => {
  test('Login user', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mock_user,
    });

    const service_response = await loginExistingUserService(
      'test@gmail.com',
      'password1'
    );

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // firebase Auth
      'test@gmail.com',
      'password1'
    );
    expect(service_response).toBe(mock_user);
  });

  test('Throws error if email or password is invalid', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error('Invalid email')
    );

    await expect(
      loginExistingUserService('badEmail', 'password')
    ).rejects.toThrow(Error('Invalid email'));
  });
});
