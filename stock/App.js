import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Depan from './src/screen/Depan';
import SplashScreen from './src/screen/SplashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName="Splash"
       defaultScreenOptions={{HeaderShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Depan" component={Depan} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}