import React from 'react'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/Screens/SignIn';
import Profile from './src/Screens/ProfilePage';
import MenuBar from './src/Components/MenuBar';
import Search from './src/Screens/SearchPage';
import MapPage from './src/Screens/MapPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={MenuBar}/>
        <Stack.Screen name="SearchScreen" component={Search}/>
        <Stack.Screen name="Map" component={MapPage}/>
        <Stack.Screen name="Log in" component={SignInScreen}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
