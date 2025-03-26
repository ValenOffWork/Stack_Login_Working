import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const FirstScreen = ({navigation}) => {
  const goToLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  const goToSignUpScreen = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <ImageBackground
      source={require('../assets/bgfirstscreen.jpg')}
      style={styles.containerMain}
      resizeMode="cover">
      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToLoginScreen}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}  onPress={goToSignUpScreen}>
          <Text style={styles.buttonText2}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10, // Moves buttons slightly up from bottom
    width: '100%',
    alignItems: 'center', // Centers buttons
    paddingBottom: 20,
  },
  button: {
    width: '90%', // Adjust button width
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // Adds space between buttons
    borderRadius: 10,
  },
  button2: {
    width: '90%', // Adjust button width
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // Adds space between buttons
    borderRadius: 10,
    borderWidth:1.4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  buttonText2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
});
export default FirstScreen;
