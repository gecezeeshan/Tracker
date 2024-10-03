import React from 'react'
import NamazTracker from './NamazTracker'
import HomeScreen from './HomeScreen'; // Example screen
import DetailsScreen from './DetailScreen'; // Another screen
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() : JSX.Element{
  return (
    // <><NamazTracker></NamazTracker>
    // </>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Namaz" component={NamazTracker} />      
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}
export default App; 