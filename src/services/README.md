## Services

This directory contains files intended to separate the "business logic" of my app from the rendering.
The React Native documentation suggests writing "[testable code](https://reactnative.dev/docs/testing-overview#writing-testable-code)", so I'm going to be trying to migrate as much logic as I can into this directory WHILE ALSO trying to avoid spaghettifying my code base.
One thing to note is that the files in this directory will be pure `ts` files, since no rendering should take place here.

### Mocks

After writing the first iteration of tests, I was getting an error with ReactNativeAsyncStorage, then getReactNativePersistence and other firebase functions, similar to this [stackoverflow post](https://stackoverflow.com/questions/77203604/jest-tests-failing-with-typeerror-0-auth-getreactnativepersistence-is). Following the [React Native Async Storage Jest implementation docs](https://react-native-async-storage.github.io/async-storage/docs/advanced/jest) did not work, I am not sure why exactly, but I was able to achieve a workaround by mocking out the aformentioned functions fixes the issue.
