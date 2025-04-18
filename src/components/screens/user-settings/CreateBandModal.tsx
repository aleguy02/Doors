import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { createNewBandService } from '../../../services/bandService';

import CustomButton from '../../buttons/CustomButton';
import { useAuth } from '../../../contexts/AuthContext';

const CreateBandModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const { fireStoreDB, authState } = useAuth();
  const [bandName, setBandName] = useState<string>('');
  // I'm handling loading a little different here than I do in AuthScreen.tsx
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateBand = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!authState.user) {
        throw new Error('User is not authenticated');
      }
      await createNewBandService(fireStoreDB, authState.user?.uid, bandName);
    } catch (error: any) {
      console.error('Error creating band:', error.message);
      Alert.alert(error.message);
    } finally {
      setLoading(false);
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

          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <CustomButton text="Confirm" onPress={handleCreateBand} />
          )}

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
