import {View, Text, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import bgImage from '../images/background.png'; // Make sure this is a valid image path
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = ({navigation}) => {
  useEffect(() => {
    checkAuth()
  }, []);

  const checkAuth = async () => {
    const authState = await AsyncStorage.getItem('USERID');
    setTimeout(() => {
      if(authState) {
      navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    }, 3000);
  }

  return (
    <ImageBackground
    source={bgImage}
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    resizeMode="cover">
    <View style={{width: '90%'}}>
     
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 30,
          fontSize: 48,
          fontWeight: 'bold',
          color: 'white',
        }}
        onPress={() => navigation.navigate('Signup')}>
        EMS
      </Text>
    </View>
  </ImageBackground>
  );
};

export default Splash;
