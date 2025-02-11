import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
// import {colors} from '../utils/Colors';
//   import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alreadyAUser = () => {
    navigation.navigate('LoginScreen');
  };

  // const onRegister = () => {
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       Alert.alert('User Created Successfully!');
  //       navigation.navigate('LoginScreen');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         Alert.alert('That email address is already in use!');
  //       }
  //       if (error.code === 'auth/invalid-email') {
  //         Alert.alert('That email address is invalid!');
  //       }
  //       Alert.alert(error);
  //     });
  // };
  return (
    <View style={styles.containerMain}>
      <Text style={styles.signUpTxt}>SignUp Screen</Text>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputBoxEmail}
            placeholder="Email"
            value={email}
            onChangeText={emailValue => setEmail(emailValue)}
          />
        </View>
        <View style={styles.textInputContainer2}>
          <TextInput
            style={styles.inputBoxEmail}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={passwordValue => setPassword(passwordValue)}
          />
        </View>
        <TouchableOpacity
          style={styles.toubleableRegTxtContainer}
          // onPress={onRegister}
        >
          <Text style={styles.regTxtButton}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createUser} onPress={alreadyAUser}>
          <Text style={[styles.registerTxtButton]}>
            Already a user? Click here.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    padding: 16,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 150,
  },
  signUpTxt: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  textInputContainer: {
    marginInline: 20,
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 10,
  },
  textInputContainer2: {
    marginTop: 20,
    marginInline: 20,
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 10,
  },
  inputBoxEmail: {
    // borderColor:'grey',
    // borderRadius:10,
    // borderWidth:0.5,
    // width:"100%",
    // height:"100%"
    fontSize: 19,
    flex: 1,
  },
  toubleableRegTxtContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffaa1d',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 50,
  },
  regTxtButton: {
    fontWeight: 'bold',
  },
  registerTxtButton: {
    fontWeight: 'bold',
    marginTop: 200,
  },
  createUser: {
    fontSize: 18,
  },
});

export default SignUpScreen;
