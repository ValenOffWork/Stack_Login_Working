import {View, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const App = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
      setLoading(false); // Set loading to false when auth state is determined
    });
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (loading) {
    // Show loading indicator until Firebase determines auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator user={user} />
    </NavigationContainer>
  );
};

export default App;


/*

This useEffect runs only once ([] as dependency array) when the app starts.
auth().onAuthStateChanged:
Listens for authentication changes (e.g., user logs in or out).
If logged in, it updates user with user details.
If logged out, it sets user to null.
Once done, it sets loading to false, so the app can proceed.
return subscriber;: Ensures the listener unsubscribes when the component unmounts to prevent memory leaks.

*/