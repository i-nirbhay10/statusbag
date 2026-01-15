import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'black'}}
        edges={['top', 'right', 'left', 'bottom']}>
        <RootNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
