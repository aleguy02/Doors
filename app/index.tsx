import React from 'react';
import { View } from 'react-native';

/* Empty screen
 * The app redirects to (tabs) or (auth) depending on if a user is signed in, so this screen doesn't matter and is never seen
 */
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></View>
  );
}
