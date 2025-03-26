import {
  View,
  BackHandler,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


const HomeScreen = ({navigation}) => {
  useEffect(() => {
    const onBackPress = () => {
      Alert.alert('Exit', 'Do you want to go back?', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]);
      return true; // Prevent default back action
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      //  BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.popToTop();
      })
      .catch(() => {
        Alert.alert('Not able to logout');
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.containerMain}>
          <TouchableOpacity
            onPress={() => logOut()}
            style={styles.touchableBack}>
            <View style={styles.viewImage}>
              <Image
                style={styles.backImage}
                source={require('../assets/logout.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddUsersScreen')}>
            <View style={styles.viewImage}>
              <Image
                style={styles.backImage}
                source={require('../assets/add.png')}
              />
            </View>
          </TouchableOpacity>
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
    alignSelf: 'flex-end', // Ensures it's aligned to the left
  },
  viewImage: {
    borderRadius: 10,
    paddingStart: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingEnd: 10,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  backImage: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
});
export default HomeScreen;
