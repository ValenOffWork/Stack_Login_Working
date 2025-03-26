import {View, Image, TouchableOpacity} from 'react-native';
// import React from 'react';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';

const PhoneLogin = () => {
    const [confirm, setConfirm] = useState(null);
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
  return (
    <View>
        <TouchableOpacity onPress={() => signInWithPhoneNumber('7517770046')}>
      <Image
        style={{width: 40, height: 40}}
        source={require('../assets/phone.png')}
      />
      </TouchableOpacity>
    </View>
  );
};

export default PhoneLogin;
