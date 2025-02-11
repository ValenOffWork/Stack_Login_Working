import {View, Text, BackHandler, Alert} from 'react-native';
import React from 'react';
import { useEffect } from 'react';

const HomeScreen = ({navigation}) => {
    useEffect(() => {
        const onBackPress = () => {
          Alert.alert('Exit', 'Do you want to go back?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ]);
          return true; // Prevent default back action
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
      }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};
export default HomeScreen;
