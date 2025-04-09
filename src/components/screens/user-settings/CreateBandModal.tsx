import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';

import CustomButton from '@/src/components/buttons/CustomButton';
import { useAuth } from '@/src/contexts/AuthContext';

const CreateBandModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const { fireStoreDB } = useAuth();
  const [bandName, setBandName] = useState('');
  // const [modalState, setModalState] = useState('default');

  const createNewBand = async () => {
    try {
      if (!bandName) {
        throw new Error('Band name required');
      } else {
        /* TODO: create schema/type for 'bands' object
         * each band should have a unique ID, a name, and maybe a list of the uid's with "access" to that band
         */

        /* TODO: logic */
        // check that band name is not taken already
        // if taken, throw error, serve message to user, and abort

        // band id = createBandDocument(band name, uid)
        const band_doc = await addDoc(collection(fireStoreDB, 'bands'), {
          bandName: bandName,
        });
        console.log(band_doc.id);
        // add band name to taken-band-names
      }
    } catch (error: any) {
      console.error('Error creating band:', error.message);
      Alert.alert(error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
        console.log('on request close');
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="w-3/4 p-10 bg-white rounded-lg shadow-lg items-center">
          <Text className="text-lg font-semibold mb-2 self-start">
            Band Name
          </Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            maxLength={50}
            placeholder="Band name"
            value={bandName}
            onChangeText={setBandName}
          />

          <CustomButton text="Confirm" onPress={createNewBand} />

          {/* Close modal */}
          <Button
            title="Cancel"
            onPress={() => {
              setBandName('');
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateBandModal;
