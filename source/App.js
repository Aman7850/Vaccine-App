import React from 'react';
import {Text, StyleSheet, View,Image, ImageBackground} from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Login from './Login';
import New_Beneficiary from './New Beneficiary';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Add_Vaccination from './Add Vaccination';
import { openDatabase } from 'react-native-sqlite-storage';
import Beneficiary_list from './Beneficiary_list';
import Reset from './Reset';
import Generate_New_Password from './Generate_New_Password';

const App = () => {
    return(
      
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Add Vaccination" component={Add_Vaccination} />
      <Stack.Screen name="Beneficiary_list" component={Beneficiary_list} />
      <Stack.Screen name="Generate_New_Password" component={Generate_New_Password} />
      <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="New Beneficiary" component={New_Beneficiary} />
        </Stack.Navigator>
     </NavigationContainer>
    )
}
const Stack = createStackNavigator();


export default App;