/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';

/**
 * @format
 */

 
 import App from './source/App';
 
 import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
 import React from 'react';
 
 const theme = {
   ...DefaultTheme,
   colors: {
     ...DefaultTheme.colors,
     primary: '#283593',
     accent: '#7E57C2',
   },
 };
 
 function Root() {
   return (
     <PaperProvider theme={theme}>
       <App />
     </PaperProvider>
   );
 }
 
 AppRegistry.registerComponent(appName, () => Root);
 
