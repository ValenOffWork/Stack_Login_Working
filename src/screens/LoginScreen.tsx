import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
//   import {colors} from '../utils/Colors';
  import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('response : ', response);
        Alert.alert("Logged In Successfully!");
        navigation.navigate("HomeScreen");
      })
      .catch(error => {
          Alert.alert('error : ',error );
      });
  };

  const notAUser = () => {
    navigation.navigate("SignUpScreen");
  };
  return (
    <View style={styles.containerMain}>
      <Text style={styles.signUpTxt}>Login Screen</Text>
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
           onPress={onLogin}
        >
          <Text style={styles.loginTxtButton}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createUser} onPress={notAUser}>
          <Text style={styles.registerTxtButton}>
            Not a User? Register Here.
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
  loginTxtButton: {
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

export default LoginScreen;
