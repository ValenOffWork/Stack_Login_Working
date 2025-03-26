import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


const AddUsersScreen = () => {
//Firebase
// Save user data to Firebase Realtime Database

  // Get current user's UID
const getCurrentUserUid = () => {
  const user = auth().currentUser;
  return user ? user.uid : null;
};
  const saveUser = ( name: string, email: string, phone: string) => {
    // database()
    //   .ref(`/users/${userId}`)
    //   .set({
    //     name: name,
    //     email: email,
    //     phone: phone,
    //   })
    const userId = getCurrentUserUid(); // Get logged-in user's UID
    const newRef = database().ref(`/users/${userId}`).push(); // Generates a unique key
    newRef
      .set({
        id: newRef.key, // Store the key inside the object
        name: name,
        email: email,
        phone: phone,
      })
      .then(() => console.log('User data saved successfully!'))
      .catch(error => console.error('Error saving user:', error));
  };
  //Firebase Ends Here

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center', fontSize : 24, fontWeight:"800", marginTop:30}}>Realtime Database Firebase</Text>
        <View style={styles.nestedContainer}>
      <TextInput style={styles.textInput}  placeholder="Enter Name" onChangeText={nameValue => setName(nameValue)}/>
      <TextInput style={styles.textInput} placeholder="Enter Email" onChangeText={emailValue => setEmail(emailValue)}/>
      <TextInput style={styles.textInput} placeholder="Enter Phone" onChangeText={phoneValue => setPhone(phoneValue)}/>

      <TouchableOpacity onPress={()=>saveUser(name, email, phone)} style={styles.submitButton}>
        <Text style={{color:'#fff'}}>Submit</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = {
  container: {  // Add this style object
    flex: 1,    // Takes up the full screen 
    },
    nestedContainer:{
        flex : 1,
         justifyContent: 'center' as 'center',
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 10,
        padding: 15,
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center' as const,
        margin: 10,
    },
};

export default AddUsersScreen;