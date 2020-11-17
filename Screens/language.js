import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LanguageSelectorScreen({navigation}){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LANGUAGE</Text>
        <View style={{ flexDirection:'row'}} >
            <Button title='Camera'
                onPress={()=>navigation.navigate('Camera')} />
            <Button title='Another'
                onPress={()=>navigation.navigate('Another')} />
        </View>
            
        
        
      </View>
      
    )
  }

export default LanguageSelectorScreen;