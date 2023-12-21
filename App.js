import React from 'react'
import { GlobalStateProvider } from './src/Context/GlobalStateContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/Screens/SignIn';
import Profile from './src/Screens/ProfilePage';
import MenuBar from './src/Components/MenuBar';
import Search from './src/Screens/SearchPage';
import MapPage from './src/Screens/MapPage';
import Favorites from './src/Screens/FavoritesPage';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Log in" component={SignInScreen}/>
          <Stack.Screen name="HomeScreen" component={MenuBar}/>
          <Stack.Screen name="SearchScreen" component={Search}/>
          <Stack.Screen name="Map" component={MapPage}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Favorites" component={Favorites}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}
