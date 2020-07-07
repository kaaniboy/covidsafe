import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import MapScreen from './src/screens/MapScreen';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <MapScreen />
    </ApplicationProvider>
  );
}