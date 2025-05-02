import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import firestore from '@react-native-firebase/firestore';
  import Loader from '../common/Loader';
  import uuid from 'react-native-uuid';
  
  const AddEmployee = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
  
    const saveDataOnFirestore = async () => {
      let userId = uuid.v4();
      const newUser = {
        name,
        email,
        password,
        designation,
        phone,
        role,
        userId,
      };
  
      setModalVisible(true);
  
      try {
        // Try to update (append to array)
        await firestore()
          .collection('employees')
          .doc('users')
          .update({
            employeeList: firestore.FieldValue.arrayUnion(newUser),
          }).then((res)=> {
            alert('Employee Added Successfully')
          }).catch((e)=> {
            alert('Something went wrong!')
          })
  
        setModalVisible(false);
        navigation.goBack();
      } catch (e) {
        if (e.code === 'firestore/not-found') {
          // Create doc if it doesn't exist
          await firestore()
            .collection('employees')
            .doc('users')
            .set({
              employeeList: [newUser],
            });
  
          setModalVisible(false);
          navigation.goBack();
        } else {
          console.log('User add error', e);
          setModalVisible(false);
        }
      }
    };
  
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
            Add Employee
          </Text>
        </View>
        <View style={{width: '90%'}}>
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
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
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
                if (name && email && password) {
                  saveDataOnFirestore();
                } else {
                  alert('Please Enter All Data');
                }
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  
  export default AddEmployee;
  