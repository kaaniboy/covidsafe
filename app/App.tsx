import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import MapScreen from './src/screens/MapScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import { Place } from './src/services/PlaceService';
import { default as theme } from './assets/covidTheme.json';

export type StackParamList = {
  Map: undefined,
  Review: { place: Place }
};

const Stack = createStackNavigator<StackParamList>();

const ScreenOptions = ({ route }: { route: Route<string> }) => ({
  headerShown: route.name === 'Review',
});

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
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