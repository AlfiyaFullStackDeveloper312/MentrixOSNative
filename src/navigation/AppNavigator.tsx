import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import InstituteListScreen from '../screens/InstituteScreen';
import RolesScreen from '../screens/RoleScreen';
import DashboardScreen from '../screens/DashboardScreen';

//  Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  InstituteList: {institutes: any[]};
  Roles: {institute: any};
  Dashboard: {role: any};
};
const Stack = createNativeStackNavigator<RootStackParamList>();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        {/*  Existing */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/*  ADD THESE (IMPORTANT) */}
        <Stack.Screen name="InstituteList" component={InstituteListScreen} />
        <Stack.Screen name="SelectRole" component={RolesScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
