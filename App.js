import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { Camera } from 'expo-camera';

import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageSelectorScreen from './Screens/language'
import CameraScreen from './Screens/camera'
import AnotherScreen from './Screens/another'



const Stack = createStackNavigator();

export default function App() {


  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Language Selector' >
          <Stack.Screen name='Language Selector' component={LanguageSelectorScreen} />
          <Stack.Screen name='Camera' component={CameraScreen} />
          <Stack.Screen name='Another' component={AnotherScreen} />


        </Stack.Navigator>

      </NavigationContainer>



  );
}

