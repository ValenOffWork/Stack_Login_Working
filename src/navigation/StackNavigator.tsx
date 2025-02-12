/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import FirstScreen from '../screens/FirstScreen';
import fireStoreDemo from '../screens/fireStoreDemo';

const Stack = createStackNavigator();

interface StackNavigatorProps {
  user: any;
}

const StackNavigator: React.FC<StackNavigatorProps> = ({user}) => {
  return (
    <Stack.Navigator
      // initialRouteName="FirstScreen"
      screenOptions={{headerShown: false}}>
      {user ? (
        // If the user is authenticated, show the HomeScreen and other protected screens
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          {/* <Stack.Screen name="fireStoreDemo" component={fireStoreDemo} /> */}
        </>
      ) : (
        // If the user is not authenticated, show login/signup screens
        <>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
