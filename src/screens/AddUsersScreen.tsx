import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';


const AddUsersScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [uploading, setUploading] = useState(false);

  // Get current user's UID
  const getCurrentUserUid = () => {
    const user = auth().currentUser;
    return user ? user.uid : null;
  };

  // Select Image
  const selectImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        if (response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
        }
      }
    });
  };

  // Upload Image to Firebase Storage
  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image first');
      return null;
    }

    const userId = getCurrentUserUid();
    if (!userId) {
      Alert.alert('User not logged in!');
      return null;
    }

    setUploading(true);
    const filename = `users/${userId}/${Date.now()}.jpg`;
    const storageRef = storage().ref(filename);

    try {
      await storageRef.putFile(imageUri);
      const downloadURL = await storageRef.getDownloadURL();
      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error('Image upload failed:', error);
      setUploading(false);
      return null;
    }
  };

  // Save User Data to Firebase
  const saveUser = async () => {
    const userId = getCurrentUserUid();
    if (!userId) {
      Alert.alert('User not logged in!');
      return;
    }

    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    const newRef = database().ref(`/users/${userId}`).push();
    newRef
      .set({
        id: newRef.key,
        name: name,
        email: email,
        phone: phone,
        imageUrl: imageUrl,
      })
      .then(() => console.log('User data saved successfully!'))
      .catch(error => console.error('Error saving user:', error));
  };

  return (
    <View style={styles.container}>
      <Text >Realtime Database Firebase</Text>
      <View style={styles.nestedContainer}>
        <TextInput style={styles.textInput} placeholder="Enter Name" onChangeText={setName} />
        <TextInput style={styles.textInput} placeholder="Enter Email" onChangeText={setEmail} />
        <TextInput style={styles.textInput} placeholder="Enter Phone" onChangeText={setPhone} />

        {/* Image Picker */}
        <TouchableOpacity onPress={selectImage} style={styles.imagePickerButton}>
          <Text style={{ color: '#fff' }}>Select Image</Text>
        </TouchableOpacity>

        {/* Display Selected Image */}
        {imageUri ? <Image source={{ uri: imageUri }}  /> : null}

        {/* Submit Button */}
        <TouchableOpacity onPress={saveUser} style={styles.submitButton} disabled={uploading}>
          <Text style={{ color: '#fff' }}>{uploading ? 'Uploading...' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 800,
    marginTop: 30,
  },
  nestedContainer: {
    flex: 1,
    justifyContent: 'center' as 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  imagePickerButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center' as const,
    margin: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
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
