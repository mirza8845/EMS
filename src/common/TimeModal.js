import { View, Text, Modal, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

const TimeModal = ({ modalVisible, setModalVisible, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
          <Text style={{color: 'black', borderWidth:1, padding: 7, borderRadius: 50, backgroundColor: 'white'}}>X</Text>
          </TouchableOpacity>
        <View
          style={{
            width: '90%',
            height: '90%',
            borderRadius: 10,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <ScrollView style={{ height: '90%', width: '100%' }}>
            {data?.map((item) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 20, borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>Check In: {item?.checkIn}</Text>
                <Text style={{ fontWeight: 'bold' }}>Check Out:  {item?.checkOut}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TimeModal;
