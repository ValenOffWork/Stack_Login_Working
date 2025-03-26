import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleLogin = () => {
  const webClientId =
    '367201123946-cadu9n0fu6h3ist8rptgd4ov1q0bh2ta.apps.googleusercontent.com';
  const navigation = useNavigation(); // Get navigation object

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: webClientId,
  //     offlineAccess: true, // Ensures refresh token is available
  //   });
  // }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    // Try the new style of google-sign in result, from v13+ of that module
    let  idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.viewGoogle}>
     <TouchableOpacity onPress={onGoogleButtonPress}>

        <Image
          style={{ width: 40, height: 40 }}
          source={require('../assets/google.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  viewGoogle: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    marginStart: 10,
  },
});
