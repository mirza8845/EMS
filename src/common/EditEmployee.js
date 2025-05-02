import React from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'

const EditEmployee = ({editModalVisible, setEditModalVisible, setEditedUser, editedUser, handleEditSave}) => {
  return (
   <Modal visible={editModalVisible} transparent={true} animationType="slide">
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
               <TextInput
                 placeholder="Designation"
                 value={editedUser.designation}
                 onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                 style={{ borderBottomWidth: 1, marginBottom: 20 }}
               />
               <TextInput
                 placeholder="Phone"
                 value={editedUser.phone}
                 onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                 style={{ borderBottomWidth: 1, marginBottom: 20 }}
               />
               <TextInput
                 placeholder="Role"
                 value={editedUser.role}
                 onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                 style={{ borderBottomWidth: 1, marginBottom: 20 }}
               />
                <TextInput
                 placeholder="Password"
                 value={editedUser.password}
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
         </Modal>
  )
}

export default EditEmployee