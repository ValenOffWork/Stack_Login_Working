import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
// import {colors} from '../utils/Colors';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User Created Successfully!');
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        Alert.alert(error);
      });
  };
  const onBackButtonPress = () => {
    // navigation.popToTop();
    navigation.goBack();
  };
  const alreadyUser = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.containerMain}>
          <TouchableOpacity
            onPress={onBackButtonPress}
            style={styles.touchableBack}>
            <View style={styles.viewImage}>
              <Image
                style={styles.backImage}
                source={require('../assets/backicon.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.signUpTxt}>Hello! Register to get started</Text>
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.inputBoxEmail}
                placeholder="Enter your email"
                value={email}
                onChangeText={emailValue => setEmail(emailValue)}
              />
            </View>
            <View style={styles.textInputContainer2}>
              <TextInput
                style={styles.inputBoxEmail}
                secureTextEntry={true}
                placeholder="Enter your password"
                value={password}
                onChangeText={passwordValue => setPassword(passwordValue)}
              />
            </View>
            {/* <View style={styles.forgetPasswordView}>
              <Text style={styles.forgetPasswordTxt}>Forget Password?</Text>
            </View> */}
            <TouchableOpacity
              style={styles.toubleableRegTxtContainer}
              onPress={onRegister}>
              <Text style={styles.loginTxtButton}>Login</Text>
            </TouchableOpacity>

            <View style={styles.horizonLine} />
            <Text style={styles.orLoginWith}>Or register with</Text>

            <View style={styles.viewPhoneGoogleContainer}>
              <TouchableOpacity>
                <View style={styles.viewPhone}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../assets/phone.png')}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.viewGoogle}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../assets/google.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.createUserTouable}>
            <Text style={styles.dontHaveAcc}>Already have an account?</Text>
            <TouchableOpacity onPress={alreadyUser}>
              <Text style={styles.registerTxtButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    padding: 16,
  },
  touchableBack: {
    alignSelf: 'flex-start', // Ensures it's aligned to the left
  },
  viewImage: {
    borderRadius: 10,
    paddingStart: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  backImage: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  signUpTxt: {
    alignSelf: 'flex-start', // Ensures it's aligned to the left
    marginTop: 50,
    fontSize: 19,
    fontWeight: 'bold',
  },
  textInputContainer: {
    marginInline: 20,
    height: 45,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 0.8,
    paddingLeft: 10,
  },
  textInputContainer2: {
    marginTop: 20,
    marginInline: 20,
    height: 45,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 0.8,
    paddingLeft: 10,
  },
  inputBoxEmail: {
    // borderColor:'grey',
    // borderRadius:10,
    // borderWidth:0.5,
    // width:"100%",
    // height:"100%"
    // fontWeight:'bold',
    color: 'black',
    fontSize: 15,
    flex: 1,
  },
  forgetPasswordView: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgetPasswordTxt: {
    fontWeight: 'bold',
  },
  toubleableRegTxtContainer: {
    width: '100%',
    height: 45,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 50,
  },
  loginTxtButton: {
    fontWeight: 'bold',
    color: 'white',
  },
  horizonLine: {
    backgroundColor: 'black',
    width: '100%',
    height: 0.8,
  },
  orLoginWith: {
    position: 'absolute',
    top: 205,
    backgroundColor: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  viewPhoneGoogleContainer: {flex: 1, flexDirection: 'row', marginTop: 40},
  viewPhone: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
  },
  viewGoogle: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    marginStart: 10,
  },
  createUserTouable: {
    fontSize: 18,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
  },
  dontHaveAcc: {
    fontWeight: 'bold',
  },
  registerTxtButton: {
    fontWeight: 'bold',
    color: 'blue',
    marginStart: 5,
  },
});

export default SignUpScreen;
