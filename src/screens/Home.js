import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import banner from '../images/Banner.png'
import TimeModal from '../common/TimeModal';
let emailId = '',
  userId = '';
let attendanceList = [];
const Home = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkOutEnable, setCheckOutEnable] = useState(false);
  const [attendanceListData, setAttendanceListData] = useState([]);
  useEffect(() => {
    setCurrentDate(
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear(),
    );

    getSavedDate();
  }, []);
  const saveDate = async () => {
    await AsyncStorage.setItem(
      'DATE',
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear(),
    );
  };

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem('DATE');
    const status = await AsyncStorage.getItem('STATUS');
    emailId = await AsyncStorage.getItem('EMAIL');
    userId = await AsyncStorage.getItem('USERID');
    if (
      date ==
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear() &&
      status == 'CIN'
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(true);
    } else if (
      date ==
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear() &&
      status == 'COUT'
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(false);
    }
    console.log(date);
    attendanceList = [];
    firestore()
      .collection('employees')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().attendance);
        setAttendanceListData()
        if (documentSnapshot.data().attendance !== undefined) {
          documentSnapshot.data().attendance.map(item => {
            if(item.checkIn && item.checkOut){
              attendanceList.push(item);
            } 
          });
          setAttendanceListData(attendanceList)
        }
      });
  };
  const saveCheckin = async () => {
    await AsyncStorage.setItem('STATUS', 'CIN');
  };
  const saveCheckout = async () => {
    await AsyncStorage.setItem('STATUS', 'COUT');
  };
  const uploadCheckIn = () => {
    let currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    attendanceList.push({
      checkIn: currentTime,
      checkOut: '',
      date: currentDate,
    });
    firestore()
      .collection('employees')
      .doc(userId)
      .update({
        attendance: attendanceList,
      })
      .then(() => {
        console.log('User updated!');
      });
    attendanceList = [];
    firestore()
      .collection('employees')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().attendance);

        if (documentSnapshot.data().attendance !== undefined) {
          documentSnapshot.data().attendance.map(item => {
            attendanceList.push(item);
          });
        }
      });
  };

  console.log(" attendanceList>>>>>>>>>>>", attendanceList)

  const uploadCheckOut = () => {
    let currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    console.log(attendanceList);
    attendanceList[attendanceList.length - 1].checkIn =
      attendanceList[attendanceList.length - 1].checkIn;
    attendanceList[attendanceList.length - 1].checkOut = currentTime;
    attendanceList[attendanceList.length - 1].date = currentDate;
    firestore()
      .collection('employees')
      .doc(userId)
      .update({
        attendance: attendanceList,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 60,
          elevation: 4,
          backgroundColor: '#5B2ED4',
          justifyContent: 'center',
          paddingLeft: 20,
        }}>
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
          Home
        </Text>
      </View>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Image source={banner} height={100} width={370} style={{height: 100, width: 380, margin: 15}} />
      <Text style={{ color: '#000', fontWeight: '700', fontSize: 16, padding: 10 }}>
          Employee Status
        </Text>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 15,
            padding: 20,
            margin: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 6, // for Android shadow
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#000',
              marginBottom: 20,
            }}>
            {'Today Date: ' + currentDate}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              disabled={!checkInEnable}
              style={{
                flex: 1,
                height: 50,
                backgroundColor: checkInEnable ? '#5B2ED4' : '#BDBDBD',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
              onPress={() => {
                saveDate();
                saveCheckin();
                setCheckInEnable(false);
                setCheckOutEnable(true);
                uploadCheckIn();
              }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Check In</Text>
            </TouchableOpacity>


            <TouchableOpacity
              disabled={!checkOutEnable}
              style={{
                flex: 1,
                height: 50,
                backgroundColor: checkOutEnable ? '#5B2ED4' : '#BDBDBD',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginLeft: 10,
              }}
              onPress={() => {
                saveCheckout();
                setCheckInEnable(false);
                setCheckOutEnable(false);
                uploadCheckOut();
              }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Check Out</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: '#5B2ED4',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                margin: 10,
              }}
              onPress={() => {
                setModalVisible(true)
              }}>
              <Text style={{ color: 'white', fontWeight: '600' }}>See Record</Text>
            </TouchableOpacity>
        </View>

      </View>
      <TimeModal data={attendanceListData} modalVisible={modalVisible} setModalVisible={setModalVisible}  />
    </View>
  );
};

export default Home;
