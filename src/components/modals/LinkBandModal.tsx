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

import { linkBandService } from '../../services/bandService';
import CustomButton from '../buttons/CustomButton';
import { useAuth } from '../../contexts/AuthContext';

const LinkBandModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const { fireStoreDB, authState } = useAuth();
  const [bandID, setBandID] = useState<string>('');
  const [view, setView] = useState<'default' | 'success'>('default');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLinkBand = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!authState.user) {
        throw new Error('User is not authenticated');
      }
      await linkBandService(fireStoreDB, authState.user, bandID);
      setView('success');
    } catch (error: any) {
      console.error('Error creating band:', error.message);
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (view == 'default') {
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
              Band ID
            </Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              maxLength={50}
              placeholder="Band name"
              value={bandID}
              onChangeText={setBandID}
            />

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <CustomButton text="Confirm" onPress={handleLinkBand} />
            )}

            <Button
              title="Cancel"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }

  if (view == 'success') {
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
            <Text className="text-xl font-bold mb-4 text-center">
              TIME TO START ROCKING
            </Text>

            <Text className="text-base mb-4 text-center text-gray-700">
              Band was joined successfully! You can close this modal now.
            </Text>

            <Button
              title="Close"
              onPress={() => {
                setModalVisible(!modalVisible);
                setBandID('');
                setView('default');
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
};

export default LinkBandModal;
