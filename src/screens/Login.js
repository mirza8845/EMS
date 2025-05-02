import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loader from '../common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bgImage from '../images/background.png'; // Make sure this is a valid image path

const Login = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    setModalVisible(true);
    firestore()
      .collection('employees')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setModalVisible(false);
        if (querySnapshot.empty) {
          alert('No user found');
          return;
        }
        const userData = querySnapshot.docs[0].data();
        if (password === userData.password) {
          goToNextScreen(userData);
        } else {
          alert('Wrong Password');
        }
      })
      .catch(error => {
        setModalVisible(false);
        alert('Login failed');
        console.error(error);
      });
  };

  // const goToNextScreen = async data => {
  //   console.log('login.>>>>>>>>>', data)
  //   await AsyncStorage.setItem('USERDATA', JSON.stringify(data));
  //   await AsyncStorage.setItem('EMAIL', email);
  //   await AsyncStorage.setItem('USERID', data.userId);
  //   navigation.navigate('Main');
  // };

  const goToNextScreen = async data => {
    try {
      await AsyncStorage.setItem('USERDATA', JSON.stringify(data));
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('USERID', data.userId);
  
      // Just to be sure, read it back and confirm:
      const check = await AsyncStorage.getItem('USERDATA');
      if (check !== null) {
        navigation.navigate('Main');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error saving to AsyncStorage:', err);
    }
  };

  return (
    <ImageBackground
      source={bgImage}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      resizeMode="cover">
      <View style={{width: '90%'}}>
      <Text
          style={{
            alignSelf: 'flex-start',
            marginBottom: '30%',
            fontSize: 38,
            fontWeight: '600',
            color: 'black',
          }}
          onPress={() => navigation.navigate('Signup')}>
          Login
        </Text>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          style={{
            height: 50,
            borderBottomWidth: 1,
            borderRadius: 10,
            paddingLeft: 20,
            marginTop: 20,
            borderColor: 'white',
            backgroundColor: 'transparent',
                    }}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            height: 50,
            borderBottomWidth: 1,
            borderRadius: 10,
            paddingLeft: 20,
            marginTop: 20,
            borderColor: 'white',
            backgroundColor: 'transparent',
                    }}
        />
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#000',
            borderRadius: 10,
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (email && password) {
              checkLogin();
            } else {
              alert('Please Enter Data');
            }
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Login</Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 30,
            textDecorationLine: 'underline',
            fontSize: 18,
            fontWeight: '600',
            color: 'white',
          }}
          onPress={() => navigation.navigate('Signup')}>
          Create New Account
        </Text>
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ImageBackground>
  );
};

export default Login;
