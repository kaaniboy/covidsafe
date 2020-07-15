import React, { useState, useEffect } from 'react';
import { SplashScreen } from 'expo';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import MapScreen from './src/screens/MapScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import { Place } from './src/services/PlaceService';

const SPLASH_DURATION_MS = 2000;

export type StackParamList = {
  Map: undefined,
  Review: { place: Place }
};

const Stack = createStackNavigator<StackParamList>();

const ScreenOptions = ({ route }: { route: Route<string> }) => ({
  headerShown: route.name === 'Review',
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHide();
    setTimeout(() => {
      SplashScreen.hide();
      setIsLoading(false);
    }, SPLASH_DURATION_MS);
  });

  if (isLoading) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={ScreenOptions}>
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ title: 'Map' }}
          />
          <Stack.Screen
            name="Review"
            component={ReviewScreen}
            options={{ title: 'Write a Review' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}