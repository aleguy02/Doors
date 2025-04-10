import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Alert } from 'react-native';
import {
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import CustomButton from '@/src/components/buttons/CustomButton';
import { useAuth } from '@/src/contexts/AuthContext';
import { FirestoreUserType } from '@/src/types/FirestoreUserType';
import { FirestoreBandType } from '@/src/types/FirestoreBandType';

const CreateBandModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const { fireStoreDB, authState } = useAuth();
  const [bandName, setBandName] = useState('');
  // const [modalState, setModalState] = useState('default');

  const createNewBand = async () => {
    try {
      if (!authState.user) {
        throw new Error('User is not authenticated.');
      }
      if (!bandName) {
        throw new Error('Band name required');
      } else {
        /* TODO: create schema/type for 'bands' object
         * each band should have a unique ID, a name, and maybe a list of the uid's with "access" to that band
         */

        // get user document
        const doc_ref = doc(fireStoreDB, 'users', authState.user.uid);
        const doc_snap = await getDoc(doc_ref);
        if (!doc_snap.exists()) {
          throw new Error('User doc not found');
        }

        // check if name is taken
        const band_names: string[] = doc_snap.data().band_names;
        if (band_names.includes(bandName)) {
          throw new Error(
            'You already have a band by that name. Please enter a different name'
          );
        }

        // create new band document with name. This is done first so we can update user in one go
        const band_payload: FirestoreBandType = {
          name: bandName,
          members: [authState.user.uid],
        };
        const band_doc = await addDoc(collection(fireStoreDB, 'bands'), {
          name: band_payload.name,
          members: band_payload.members,
        });

        // update user document with band name and band id
        const user_payload: FirestoreUserType = {
          band_names: [bandName],
          band_ids: [band_doc.id],
        };
        await updateDoc(doc_ref, {
          band_names: arrayUnion(...user_payload.band_names),
          band_ids: arrayUnion(...user_payload.band_ids),
        });
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
