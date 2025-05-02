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
import uuid from 'react-native-uuid';
import bgImage from '../images/background.png'; // Update path if necessary

const Signup = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveDataOnFirestore = () => {
    let userId = uuid.v4();
    setModalVisible(true);
    firestore()
      .collection('employees')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        userId: userId,
      })
      .then(() => {
        setModalVisible(false);
        navigation.goBack();
      })
      .catch(e => {
        console.log('User add error', e);
        setModalVisible(false);
      });
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
                  Register
                </Text>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={{
            height: 50,
            borderBottomWidth: 1,
            borderRadius: 5,
            paddingLeft: 20,
            marginTop: 20,
            borderColor: 'white',
            backgroundColor: 'transparent',
          }}
        />
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
            if (name && email && password) {
              saveDataOnFirestore();
            } else {
              alert('Please Enter All Data');
            }
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Sign up</Text>
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
          onPress={() => navigation.goBack()}>
          Already have account
        </Text>
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ImageBackground>
  );
};

export default Signup;
