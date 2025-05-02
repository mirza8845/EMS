import {View, Text, Touchable, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Home from './Home';
import Attendance from '../tabs/Attendance';
import Leaves from '../tabs/Leaves';
import AddEmployee from '../tabs/AddEmployee';
import Settings from '../tabs/Settings';
import Activity from '../tabs/Activity';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={{flex: 1}}>
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Attendance />
      ) : selectedTab == 2 ? (
        <AddEmployee />
      ): selectedTab == 3 ? (
        <Activity />
      ) : (
        <Settings />
      )}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          elevation: 4,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderTopWidth: 1,
          borderColor: 'gray'
        }}>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={
              selectedTab == 0
                ? require('../images/home_color.png')
                : require('../images/home.png')
            }
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={
              selectedTab == 1
                ? require('../images/attendance_color.png')
                : require('../images/attendance.png')
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={
              selectedTab == 2
                ? require('../images/plus.png')
                : require('../images/plus-simple.png')
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={
              selectedTab == 3
                ? require('../images/leave_color.png')
                : require('../images/leave.png')
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '32%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={
              selectedTab == 4
                ? require('../images/gear.png')
                : require('../images/gear-simple.png')
            }
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
