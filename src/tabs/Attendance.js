import {
  View, Text, TouchableOpacity, ScrollView, TextInput, Modal
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import EditEmployee from '../common/EditEmployee';

let emailId = '', userId = '';
let attendanceList = [];

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [checkOutEnable, setCheckOutEnable] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    setCurrentDate(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
    getSavedDate();
  }, []);

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem('DATE');
    const status = await AsyncStorage.getItem('STATUS');
    emailId = await AsyncStorage.getItem('EMAIL');
    userId = await AsyncStorage.getItem('USERID');

    if (date === currentDate && status === 'CIN') {
      setCheckInEnable(false);
      setCheckOutEnable(true);
    } else if (date === currentDate && status === 'COUT') {
      setCheckInEnable(false);
      setCheckOutEnable(false);
    }

    firestore()
      .collection('employees')
      .doc('users')
      .onSnapshot(documentSnapshot => {
        const list = documentSnapshot.data()?.employeeList || [];
        setUsersList(list);
        attendanceList = [...list];
      });
  };

  const updateUserList = async (updatedList) => {
    await firestore().collection('employees').doc('users').update({
      employeeList: updatedList,
    });
  };

  const handleEdit = (index) => {
    setSelectedUserIndex(index);
    setEditedUser(usersList[index]);
    setEditModalVisible(true);
  };

  const handleEditSave = () => {
    const updatedList = [...usersList];
    updatedList[selectedUserIndex] = editedUser;
    updateUserList(updatedList);
    setEditModalVisible(false);
  };

  const handleDelete = (index) => {
    const updatedList = usersList.filter((_, i) => i !== index);
    updateUserList(updatedList);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ height: 60, backgroundColor: '#5B2ED4', justifyContent: 'center', paddingLeft: 20 }}>
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Employees</Text>
      </View>

      {/* Employee List */}
      <ScrollView style={{ backgroundColor: 'white', padding: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 16, paddingVertical: 10 }}>Employee List</Text>

        {usersList.map((item, index) => (
          <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, elevation: 6 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>{'Name: ' + item?.name}</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>{'Email: ' + item?.email}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ flex: 1, height: 50, backgroundColor: '#5B2ED4', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 10 }}
                onPress={() => handleEdit(index)}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1, height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => handleDelete(index)}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <EditEmployee
      editModalVisible={editModalVisible}
      setEditedUser={setEditedUser}
      editedUser={editedUser}
      handleEditSave={handleEditSave}
      setEditModalVisible={setEditModalVisible}
      />
      {/* <Modal visible={editModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Edit Employee</Text>
            <TextInput
              placeholder="Name"
              value={editedUser.name}
              onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
              placeholder="Email"
              value={editedUser.email}
              onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
              style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ flex: 1, marginRight: 10, padding: 15, backgroundColor: '#5B2ED4', borderRadius: 5 }}
                onPress={handleEditSave}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, padding: 15, backgroundColor: 'gray', borderRadius: 5 }}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default Attendance;
