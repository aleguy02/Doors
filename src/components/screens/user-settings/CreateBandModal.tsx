import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Alert } from 'react-native';
import CustomButton from '@/src/components/buttons/CustomButton';

const CreateBandModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const [bandName, setBandName] = useState('');

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

          <CustomButton
            text="Confirm"
            onPress={() => {
              if (!bandName) {
                Alert.alert('Band name required');
              } else {
                // generate band object with unique band ID (define custom class for Band?)
                // link band object to user
              }
            }}
          />

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
