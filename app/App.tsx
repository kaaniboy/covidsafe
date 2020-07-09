import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import MapScreen from './src/screens/MapScreen';
import ReviewScreen from './src/screens/ReviewScreen';

const Stack = createStackNavigator();
const ScreenOptions = ({ route }: { route: Route<string> }) => ({
  headerShown: route.name === 'review',
});

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={ScreenOptions}>
          <Stack.Screen
            name="map"
            component={MapScreen}
            options={{ title: 'Map' }}
          />
          <Stack.Screen
            name="review"
            component={ReviewScreen}
            options={{ title: 'Write a Review' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}