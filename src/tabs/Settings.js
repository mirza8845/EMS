import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import firestore from '@react-native-firebase/firestore';
  import Loader from '../common/Loader';
  import uuid from 'react-native-uuid';
  import profilePic from '../images/Profile.png'
  import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const Settings = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation()

  
    useEffect(() => {
        getUserData()
        // setCurrentDate(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
      }, []);

    //   const getUserData = async () => {
    //     const userData = await AsyncStorage.getItem('USERDATA');
    //     console.log('userData///////', userData)
    //     setUserData(JSON.parse(userData))
    //   }

    const getUserData = async () => {
        let tries = 0;
        let data = null;
        while (tries < 3 && !data) {
          const stored = await AsyncStorage.getItem('USERDATA');
          if (stored) {
            data = JSON.parse(stored);
            setUserData(data);
          } else {
            tries++;
            await new Promise(res => setTimeout(res, 300)); // wait 300ms
          }
        }
        if (!data) console.warn('USERDATA still null after retry');
      };
      

      const handleLogout = () => {
        AsyncStorage.clear()
        navigation.navigate('Login');
      }
    
     

    console.log('usersList>>>>>>>>>>>', userData)

    useEffect(()=> {
        if(userData){
            setName(userData.name || 'N/A')
            setEmail(userData.email || 'N/A')
            setDesignation(userData.designation || 'N/A')
            setPhone(userData.phone || 'N/A')
            setRole(userData.role || 'N/A')

        }
    }, [userData])

  
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <View
          style={{
            width: '100%',
            height: 60,
            elevation: 4,
            backgroundColor: '#5B2ED4',
            justifyContent: 'center',
            paddingLeft: 20,
          }}>
          <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
            Settings
          </Text>
        </View>
        <ScrollView style={{width: '90%'}}>
            <Image source={profilePic} style={{height: 100, width: 100, marginLeft: '38%', marginTop: 50}} />
          <View>
            <TextInput
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Designation"
              value={designation}
              onChangeText={setDesignation}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Role"
              value={role}
              onChangeText={setRole}
              style={styles.input}
            />
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: '#5B2ED4',
                borderRadius: 10,
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                  handleLogout();
               
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    );
  };
  
  const styles = {
    input: {
      height: 50,
      borderBottomWidth: 1,
      borderRadius: 10,
      paddingLeft: 20,
      marginTop: 20,
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
  };
  
  export default Settings;
  