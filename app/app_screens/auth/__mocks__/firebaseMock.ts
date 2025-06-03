/**
 * This mock file uses jest functions but jest is not defined in the runtime environment causing errors.
 * To fix this, replace jest.fn() with plain functions to avoid jest dependency in runtime.
 */

const mockConfirm = () => Promise.resolve('mock-confirmation-result');
const mockSignInWithPhoneNumber = () => Promise.resolve({ confirm: mockConfirm });

const mockAuth = {
  signInWithPhoneNumber: mockSignInWithPhoneNumber,
  onAuthStateChanged: () => {},
  currentUser: { uid: 'mock-user-id' },
};

const firebaseMock = {
  auth: () => mockAuth,
};

export default firebaseMock;
