import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Override window property definition to avoid "Cannot redefine property: window" error
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = (obj, prop, descriptor) => {
  if (prop === 'window' && Object.getOwnPropertyDescriptor(obj, prop)) {
    return obj;
  }
  return originalDefineProperty(obj, prop, descriptor);
};
