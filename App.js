import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';

export default function App() {

  // Permission Variables
  const [hasPermission, setHasPermission] = useState(null);

  // Camera Starting Variable Type - Set to back camera initially
  const [type, setType] = useState(Camera.Constants.Type.back);

  // This is the camera reference object which will be initialized when view is started with correct camera permissions.
  var camera; 

  // Variable to translate to and read out loud! We would change this with our voice recognition.
  // ISO639 form is required by our endpoint - https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  // BCP47 form is required by our text to speech front end function - https://appmakers.dev/bcp-47-language-codes-list/
  var desiredLanguageISO639 = "hi";
  var desiredLanguageBCP47 = "hi-IN";

  // Called at the Launch of App to Request Permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Returns an error screen assuming no permissions
  if (hasPermission === null || hasPermission === false) {return <View><Text>Camera Permission Issue</Text></View>;}

  // The function to flip camera
  var flipCameraFunction = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  // This function takes the picture then calls the onPictureSaved function
  var takePicture = () => {
      camera.takePictureAsync({ onPictureSaved: onPictureSaved });
  };

  // This function contains the photo data which is passed to our  image parser endpoint to parse text.
  // Then calls the translator endpoint to translate text.
  // Then reads out the text!
  var onPictureSaved = async photo => {
      
      Speech.speak("Scanning please wait!");
      // Load image from filesystem in string Base64 form
      console.log("Scanning!");
      var fileBase64String = await FileSystem
      .readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType.Base64 })
      .catch((error)=> {console.log("Could not load file:\n"+error);});

      // Construct JSON body with our Base64 string and send it to our text parsing endpoint
      var imageParserEndPoint = "https://us-central1-lend-an-ear-295120.cloudfunctions.net/image_to_text";
      var textParserHeaders = new Headers();
      textParserHeaders.append("Content-Type", "application/json");
      var jsonBody = JSON.stringify({"image_string":fileBase64String})
      var requestOptions = {method: 'POST', headers: textParserHeaders, body: jsonBody, redirect: 'follow'};
      var response = await fetch(imageParserEndPoint, requestOptions).catch(error => {console.log('Failed to call Image Parse Endpoint:', error); return;});
      var parsed_text = await response.text();

      // Construct JSON body with our parsed text to translate to our desired language
      var translatorEndPoint = "https://us-central1-lend-an-ear-295120.cloudfunctions.net/translate_text";
      var translatorParserHeaders = new Headers();
      translatorParserHeaders.append("Content-Type", "application/json");
      var jsonBody = JSON.stringify({"text":parsed_text, "target": desiredLanguageISO639})
      var requestOptions = {method: 'POST', headers: translatorParserHeaders, body: jsonBody, redirect: 'follow'};
      var response = await fetch(translatorEndPoint, requestOptions).catch(error => {console.log('Failed to call Translation Endpoint:', error); return;});
      var translated_text = await response.text();
      
      // Now we speak!
      console.log(translated_text);
      Speech.speak(translated_text,{language: desiredLanguageBCP47});
  } 

  // The function triggered on scan button press
  var scanButtonFunction = () => {
    takePicture();
  }
  
  // The function triggered on Language Selection button press
  var languageSelectionButtonFunction = () => {
    flipCameraFunction();
  }

  // Styles for this function
  const styles = StyleSheet.create({
    buttonContainer: {
      flex:0.1, 
      justifyContent: 'center'
    }
  });

  // Main View that is returned assuming we get correct camera permissions.
  return (
    <View style={{ flex: 1 }}>
      <Button mode="contained" style={styles.buttonContainer} onPress={() => {languageSelectionButtonFunction();}}>
        Language Select 
      </Button>
      
      <Camera style={{ flex: 0.8 }} type={type} ref={(ref) => { camera = ref }}></Camera>

      <Button style={styles.buttonContainer} mode="contained" onPress={() => {scanButtonFunction();}}>
        SCAN
      </Button>
    </View>
  );
}

