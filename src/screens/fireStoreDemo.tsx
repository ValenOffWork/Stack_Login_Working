import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const fireStoreDemo = () => {
  useEffect(() => {
    // Optional: Check if Firebase is initialized
    console.log('Firestore initialized:', firestore().app.name);
  }, []);

  const addPost = async () => {
    console.log('addPost function called'); // Check if function is called
    try {
      console.log('Attempting to add post...'); // Check if code reaches this point
      await firestore().collection('posts').add({
        title: 'My First Post',
        content: 'This is the content of my first post.',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Post added!'); // Check if post is added
    } catch (error) {
      console.error('Error adding post: ', error); // Check for errors
    }
  };

  const getPosts = async () => {
    try {
      const postsSnapshot = await firestore().collection('posts').get();
      if (postsSnapshot.empty) {
        console.log('No posts found'); // Check if collection is empty
      } else {
        postsSnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data()); // Log each document
        });
      }
    } catch (error) {
      console.error('Error getting posts: ', error);
    }
  };

  return (
    <View>
      <Text>Firestore Integration</Text>
      <Button title="Add Post" onPress={addPost} />
      <Button title="Get Posts" onPress={getPosts} />
    </View>
  );
};

export default fireStoreDemo;